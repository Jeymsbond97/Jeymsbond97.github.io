# How to update the site

Every change is a file edit followed by a push. GitHub Actions rebuilds the site in about 1–2 minutes.

```sh
git add .
git commit -m "post: robot world"
git push
```

## Add a blog post (from LinkedIn)

1. Create `src/content/blog/en/2026-12-05-my-post.md`. The file name starts with the date.

   ```yaml
   ---
   title: "Robot World 2026"
   date: 2026-12-05T18:30:00+09:00     # date and time (Seoul)
   place: "KINTEX, Goyang"             # optional
   category: Exhibition                # Exhibition | Tech | Event | Career | Certificate | Life
   summary: "One sentence that appears on the card."
   cover: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg"   # optional image URL
   coverAlt: "What the image shows"    # needed when cover is set
   youtube: "VIDEO_ID"                 # optional: shows the video instead of the cover
   linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:..../"
   ---
   Post text in Markdown...
   ```

2. Optional: add the Korean version with the **same file name** in `src/content/blog/ko/`.
   Without it, the Korean site shows the English text.
3. Posts are sorted automatically: the newest is first, the oldest is last.

## Add a certificate

Open `src/data/profile.ts` and add an object to the `certificates` list:

```ts
{
  id: 'my-cert',
  name: { en: 'Certificate name', ko: '자격증 이름' },
  issuer: 'Issuer',
  issued: { en: 'Jan 2027', ko: '2027년 1월' },
  detail: { en: 'One sentence about it.', ko: '한 문장 설명.' },
  verify: 'https://www.credly.com/...',   // or undefined
  post: '/blog/<post-file-name>/',          // a blog post about it
  accent: 'google',
},
```

Language tests (TOPIK, IELTS) are in `languageTests` in the same file.

## Add a project

Copy any file in `src/content/projects/en/`, change the text, and set `order` (position) and
`group` (`robotics` or `physical-ai`). Add the Korean copy in `src/content/projects/ko/` with the same name.

## Update the resume PDFs

The PDFs in `public/resume/` are printed from the `/resume/` and `/ko/resume/` pages.
After changing experience or skills, run `npm run build && npm run preview`, open each page in Chrome,
choose **Print → Save as PDF** (no headers and footers), and replace the two files.

## Contact form

Messages are sent through FormSubmit to the email in `src/data/profile.ts` (`formEndpoint`).
The very first message sends an **activation email** to that inbox; click **Activate** once and every
later message arrives directly.
