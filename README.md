# Tokhirbek Aminjonov · Portfolio

Personal portfolio and blog of **Tokhirbek Aminjonov**, robot software engineer in Seoul.
Live at **https://jeymsbond97.github.io/** (English) and **https://jeymsbond97.github.io/ko/** (Korean).

## What is inside

- **Home** with a three.js hero: the JAKA Lumi service robot in its home scene, ported from the Lumi app
  ([Jeymsbond97/lumi-app](https://github.com/Jeymsbond97/lumi-app), `web/home3d.html`). Visitors can drag to
  rotate it. three.js and the model load only after the page has painted, never on a
  data-saver or slow connection unless the visitor asks, and a static panel replaces the scene without WebGL.
- **Projects**: case studies for the robots at work (JAKA Lumi, factory vision line, Prinpia book palletizing,
  AI drawing robot, LLM block-code tool, MiniCobo demo) and independent Physical AI projects
  (PiCar apple picker, Lumi digital twin, Booster K1 humanoid).
- **Blog**: LinkedIn posts with their original text, photos, video and reaction count, and a Korean translation.
- **Certificates**, **Resume** (EN and KO PDF) and **Contact** with a form that delivers to email.
- Self-hosted field videos with a hover preview and a theater player.
- English and Korean, light and dark theme, scroll motion that respects `prefers-reduced-motion`.

## Stack

- Astro 5, static output, content collections in Markdown
- three.js for the hero scene
- Plain CSS with custom properties
- Fonts: Unbounded (display), Hanken Grotesk (body), JetBrains Mono (labels), Doto (dot-matrix numbers)
  and Pretendard (Korean), all self-hosted from npm packages
- `@astrojs/sitemap` and `@astrojs/rss`
- GitHub Actions to GitHub Pages

## Run locally

Node 22 is required (`astro check` does not run on older versions).

```sh
npm install
npm run dev             # http://localhost:4321
npx astro check         # type check
npm run build           # static site in dist/
npm run preview         # serve the build
npm run sync:linkedin   # pull post text, photos and reaction counts from LinkedIn
```

## Structure

```
scripts/
  sync-linkedin.mjs    copies each blog post's LinkedIn text, media and reactions into the repo
src/
  components/          Header, Hero, ProjectCard, PostCard, CertCard, VideoCard, ...
    blog/              Gallery, PostVideo, PostText, LikeButton
    home/              home page sections
  content/             projects/{en,ko}/*.md and blog/{en,ko}/*.md
  data/                profile.ts (experience, skills, certificates, videos, links)
                       linkedin.json (written by sync-linkedin.mjs)
  i18n/                ui.ts: every UI string in English and Korean
  layouts/             BaseLayout
  lib/                 content.ts: localized collections, post media and text helpers
  pages/               routes (/ and /ko/), RSS feed
  scripts/             client scripts: motion.ts (site motion), lumi3d.ts and lumi3d/ (hero scene), blog/
  styles/              global.css
  views/               page templates shared by both languages
public/
  models/              lumi.glb, the robot model for the hero
  video/               <YouTubeID>.mp4, .jpg and .preview.mp4 field videos
  blog/<slug>/         photos and videos copied from LinkedIn
  certificates/        certificate and badge images
  projects/<slug>/     project images and clips
  resume/              Tokhirbek_Aminjonov_Resume_EN.pdf and _KO.pdf
```

## Deploy

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, on demand, and every day at
06:17 Seoul time. Each run refreshes the LinkedIn reaction counts first (best effort, it never fails the build).
GitHub pauses the daily schedule after 60 days without repository activity.

See [HOW_TO_UPDATE.md](HOW_TO_UPDATE.md) for adding posts, certificates, videos, projects and the resume.
