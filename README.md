# Tokhirbek Aminjonov · Portfolio

Personal portfolio and blog of **Tokhirbek Aminjonov**, robot software engineer in Seoul.
Live at **https://jeymsbond97.github.io/** (English) and **https://jeymsbond97.github.io/ko/** (Korean).

## What is inside

- **Home** with an animated "teach pendant" hero: a 2-link robot arm solved with inverse kinematics runs a pick-and-place program through waypoints P1–P4.
- **Projects**: case studies for the robots at work (JAKA Lumi, factory vision line, Principia book palletizing, AI drawing robot, LLM block-code tool, MiniCobo demo) and independent Physical AI projects (PiCar apple picker, Lumi digital twin, Booster K1 humanoid).
- **Blog**: LinkedIn posts, newest first, with date, time and place.
- **Certificates**, **Resume** (HTML + EN/KO PDF) and **Contact** with a form that delivers to email.
- English and Korean, light and dark theme, scroll motion that respects `prefers-reduced-motion`.

## Stack

Astro 5 (static output), plain CSS with custom properties, content collections in Markdown, Archivo + Pretendard fonts, GitHub Actions → GitHub Pages.

## Run locally

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the build
```

## Structure

```
src/
  components/   Header, Hero, ProjectCard, PostCard, Diagram, Timeline, ...
  content/      projects/{en,ko}/*.md and blog/{en,ko}/*.md
  data/         profile.ts: experience, skills, certificates, videos, links
  i18n/         ui.ts: every UI string in English and Korean
  views/        page templates shared by both languages
  pages/        routes (/ and /ko/)
public/         favicon, OG image, resume PDFs
```

See [HOW_TO_UPDATE.md](HOW_TO_UPDATE.md) for adding posts, certificates and projects.
