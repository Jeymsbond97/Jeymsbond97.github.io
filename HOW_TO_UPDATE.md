# How to update the site

Every change is a file edit followed by a push to `main`. GitHub Actions builds the site and deploys it
to GitHub Pages in about 2 minutes.

```sh
git add .
git commit -m "post: robot world"
git push
```

Before you push, check the site locally:

```sh
npm run dev          # http://localhost:4321
npx astro check      # type check, must report 0 errors (needs Node 22)
npm run build        # the same build CI runs
```

## Node version

Use Node 22. CI builds with Node 22, and `astro check` fails on older versions. With Homebrew:

```sh
brew install node@22
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
node -v              # v22.x
```

## Add a blog post (from LinkedIn)

The English page shows the LinkedIn post itself: its text, photos or video and its reaction count.
They are copied from LinkedIn by `scripts/sync-linkedin.mjs` and saved in the repository, so the site
never loads anything from LinkedIn.

1. Create `src/content/blog/en/<date>-<name>.md`, for example `2026-12-05-robot-world.md`.
   The file name is the URL: `/blog/2026-12-05-robot-world/`. Write only the frontmatter; leave the body empty.

   ```yaml
   ---
   title: "Robot World 2026"
   date: 2026-12-05T18:30:00+09:00     # date and time of the LinkedIn post (Seoul time)
   place: "KINTEX, Goyang"             # optional
   category: Exhibition                # Exhibition | Tech | Event | Career | Certificate | Life
   summary: "One sentence for the card and the search preview."
   linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7530227959044050944/"
   ---
   ```

   The `linkedin` URL must have the form `https://www.linkedin.com/feed/update/urn:li:activity:<id>/`.
   The script reads the number after `urn:li:activity:`; a post with any other URL shape (for example a
   `/posts/...` share link) is skipped. To get the right URL, open the post on LinkedIn, click the `...`
   menu, choose **Copy link to post** and open that link: the address bar then shows the `feed/update` form.

   Optional fields: `cover` and `coverAlt` (an image for a post without photos) and `youtube`
   (a YouTube video ID; see [Add a video](#add-a-video)).

2. Pull the post from LinkedIn:

   ```sh
   npm run sync:linkedin
   ```

   It prints one line per post, for example `ok   2026-12-05-robot-world  reactions=19  images=5`.
   A post that cannot be fetched prints `skip` and keeps the data it had before.

3. Review what it wrote:
   - `src/data/linkedin.json`: the post text, the photo and video paths and the reaction count.
   - `public/blog/<slug>/`: the photos (`01.jpg`, `02.jpg`, ...) or `video.mp4` and `poster.jpg`.

   Delete photos you do not want and remove them from the `images` list in `linkedin.json`.

4. Add the Korean page: create `src/content/blog/ko/` with the **same file name**. Copy the frontmatter,
   translate `title`, `summary` and `place`, and write the Korean translation of the post as the body.
   The body is plain text, not Markdown: a blank line starts a paragraph, a single line break stays,
   and links and `#hashtags` are picked up automatically. The Korean page shows this text, with the
   English original under a **Show original** toggle.
   Without a Korean file the Korean site shows the English text with a note that it is in English.

5. Commit `src/content/blog/`, `src/data/linkedin.json` and `public/blog/<slug>/`, then push.

Posts are sorted by `date`, newest first.

### Reaction counts and the daily build

The workflow (`.github/workflows/deploy.yml`) runs on every push and once a day at 06:17 Seoul time.
Each run first calls `node scripts/sync-linkedin.mjs --counts`, which refreshes only the reaction counts,
then builds. The refreshed counts are used for that build but are not committed, so run
`npm run sync:linkedin` locally now and then to keep the committed numbers close.

GitHub pauses scheduled workflows in a public repository after 60 days without activity in the
repository. When that happens the daily refresh stops until you push a commit or re-enable the workflow
in the **Actions** tab.

## Add a certificate

1. Put the image files in `public/certificates/`: the certificate itself and, if there is one, the badge
   (for example the Credly PNG). Use JPEG for photos and scans, PNG for badges.
2. Open `src/data/profile.ts` and add an object to the `certificates` list:

   ```ts
   {
     id: 'my-cert',                                   // unique, used in element ids
     name: { en: 'Certificate name', ko: '자격증 이름' },
     issuer: 'Issuer',
     issued: { en: 'Jan 2027', ko: '2027년 1월' },
     detail: { en: 'One or two sentences about it.', ko: '한두 문장 설명.' },
     verify: 'https://www.credly.com/...' as string | undefined,   // or undefined
     post: '/blog/<post-file-name>/',                 // the blog post about it
     accent: 'google',                                // colour of the card: see existing entries
     images: [
       {
         src: '/certificates/my-cert.jpg', width: 1600, height: 1190, kind: 'certificate',
         alt: { en: 'What the image shows, in English', ko: '이미지 설명 (한국어)' },
       },
       {
         src: '/certificates/my-cert-badge.png', width: 672, height: 352, kind: 'badge',
         alt: { en: 'Badge for ...', ko: '... 배지' },
       },
     ] as CertImage[],
   },
   ```

   - `width` and `height` are the real pixel size of the file. Check it with `sips -g pixelWidth -g pixelHeight <file>`
     on macOS. The card never shows an image larger than this size, and the numbers reserve its space while it loads.
   - `kind` is `certificate` for the main image (shown large on the card) or `badge` (shown as a small
     button under the text). Every image opens full size on click.
   - `alt` describes the image in both languages.

Language tests (TOPIK, IELTS) are in `languageTests` in the same file.

## Add a video

Field videos are served from this site, not from YouTube. Each video is named by its YouTube ID and has
three files in `public/video/`:

| File | What it is |
| --- | --- |
| `<YouTubeID>.mp4` | The full video, H.264, with `+faststart` so it starts playing before it is fully downloaded |
| `<YouTubeID>.jpg` | The poster, one frame of the video |
| `<YouTubeID>.preview.mp4` | A 4 s silent clip (480 px wide, about 200 KB) that plays when the mouse is over the card |

Without the `.mp4` and `.jpg` the card falls back to a YouTube embed. Without the preview the card shows
only the poster on hover.

Make the files with ffmpeg (`brew install ffmpeg`), one command at a time:

```sh
cd public/video
ID=NT1QNNQaFak

# 1. full video: H.264, AAC audio, metadata at the start of the file
ffmpeg -i source.mov -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart $ID.mp4

# 2. poster: the frame at 1.5 s
ffmpeg -ss 1.5 -i $ID.mp4 -frames:v 1 -q:v 3 $ID.jpg

# 3. hover preview: 4 s from 1.5 s in, 480 px wide, 30 fps, no audio
ffmpeg -ss 1.5 -i $ID.mp4 -t 4 -an -vf "scale=480:-2,fps=30" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart $ID.preview.mp4
```

The preview should stay under 400 KB; if it does not, raise `-crf` to 32.
Then list the video where it should appear:

- on the home page: add `{ id, title: { en, ko }, project }` to `videos` in `src/data/profile.ts`;
- on a project page: add `{ id, title }` to `youtube` in the project's frontmatter;
- on a blog post: set `youtube: "<YouTubeID>"` in the post's frontmatter.

## Update the resume

Replace the two PDFs in `public/resume/` and keep their names:

- `public/resume/Tokhirbek_Aminjonov_Resume_EN.pdf`
- `public/resume/Tokhirbek_Aminjonov_Resume_KO.pdf`

The resume page, the hero download button and the file sizes shown on the page all read these files,
so nothing else needs to change.

## Add a project

1. Copy a file in `src/content/projects/en/`, for example `jaka-lumi.md`, to `<slug>.md`. The file name is the URL
   (`/projects/<slug>/`); do not rename a published project, or add a redirect in `astro.config.mjs` (`redirects`) if you must.
2. Edit the frontmatter. Required: `title`, `outcome` (one sentence), `order` (position in the list),
   `group` (`robotics` or `physical-ai`), `role`, `period`, `team`, `platform`, `status`, `cover`, `coverAlt`, `tags`.
   Optional: `client`, `featured`, `youtube` (list of `{ id, title }`), `clip` (a self-hosted landscape clip
   under `public/projects/`), `gallery`, `repo`, `links`, `results` (list of `{ value, label }`) and `diagram`.
   The full list with types is in `src/content.config.ts`.
3. Write the case study in Markdown below the frontmatter.
4. Put images in `public/projects/<slug>/`. `cover: "svg:default"` draws a generated cover instead of an image
   (`svg:llm` and `svg:humanoid` are the two special drawings, see `src/components/CoverArt.astro`).
5. Add the Korean copy in `src/content/projects/ko/` with the same file name. Without it the Korean site shows the English page.

## Contact form

Messages are sent through FormSubmit to the email in `src/data/profile.ts` (`formEndpoint`).
The very first message sends an **activation email** to that inbox; click **Activate** once and every
later message arrives directly.
