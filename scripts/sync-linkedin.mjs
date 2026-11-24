// Pulls each blog post's original LinkedIn text, photos and reaction count from the public embed page.
// Usage: node scripts/sync-linkedin.mjs            text, photos and counts (run locally, commit the result)
//        node scripts/sync-linkedin.mjs --counts   reaction counts only (CI runs this before every build)
// A post that cannot be fetched keeps its last saved data, so a LinkedIn hiccup never breaks the build.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath decodes %20 and friends, so a checkout under a path with spaces still works
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BLOG = join(ROOT, 'src/content/blog/en');
const OUT = join(ROOT, 'src/data/linkedin.json');
const countsOnly = process.argv.includes('--counts');
// A stalled request must not hang CI: pages get 10 s in --counts mode, media downloads 60 s.
const timeout = () => AbortSignal.timeout(countsOnly ? 10_000 : 60_000);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

const decode = (s) => s
  .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');

const saved = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const posts = readdirSync(BLOG).filter((f) => f.endsWith('.md')).map((f) => {
  const src = readFileSync(join(BLOG, f), 'utf8');
  const id = src.match(/urn:li:activity:(\d+)/)?.[1];
  return { slug: f.replace(/\.md$/, ''), id };
}).filter((p) => p.id);

let ok = 0;
for (const { slug, id } of posts) {
  const prev = saved[slug] ?? {};
  try {
    const res = await fetch(`https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`, { headers: { 'User-Agent': UA }, signal: timeout() });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const reactions = Number(html.match(/data-num-reactions="(\d+)"/)?.[1] ?? html.match(/(\d[\d,]*)\s+Reactions/i)?.[1]?.replace(/,/g, '') ?? NaN);
    const comments = Number(html.match(/data-num-comments="(\d+)"/)?.[1] ?? NaN);
    const entry = { ...prev, id };
    if (Number.isFinite(reactions)) entry.reactions = reactions;
    if (Number.isFinite(comments)) entry.comments = comments;
    if (!countsOnly) {
      const text = html.match(/<p[^>]*attributed-text-segment-list__content[^>]*>([\s\S]*?)<\/p>/)?.[1];
      if (text) entry.text = decode(text).trim();
      const urls = [...new Set([...html.matchAll(/https:\/\/media\.licdn\.com\/dms\/image\/[^"'\s]+feedshare-[^"'\s]+/g)].map((m) => m[0].replace(/&amp;/g, '&')))];
      const dir = join(ROOT, 'public/blog', slug);
      mkdirSync(dir, { recursive: true });
      const images = [];
      for (const [i, u] of urls.entries()) {
        const name = `${String(i + 1).padStart(2, '0')}.jpg`;
        const img = await fetch(u, { headers: { 'User-Agent': UA }, signal: timeout() });
        if (!img.ok) continue;
        writeFileSync(join(dir, name), Buffer.from(await img.arrayBuffer()));
        images.push(`/blog/${slug}/${name}`);
      }
      if (images.length) entry.images = images;
      const video = html.match(/data-sources="([^"]+)"/)?.[1];
      if (video) {
        const sources = JSON.parse(decode(video));
        const best = sources.sort((a, b) => (parseInt(b.type?.match(/\d+/)?.[0]) || 0) - (parseInt(a.type?.match(/\d+/)?.[0]) || 0))[0];
        const poster = html.match(/data-poster-url="([^"]+)"/)?.[1];
        if (best?.src) {
          const v = await fetch(decode(best.src), { headers: { 'User-Agent': UA }, signal: timeout() });
          if (v.ok) { writeFileSync(join(dir, 'video.mp4'), Buffer.from(await v.arrayBuffer())); entry.video = `/blog/${slug}/video.mp4`; }
        }
        if (poster) {
          const p = await fetch(decode(poster), { headers: { 'User-Agent': UA }, signal: timeout() });
          if (p.ok) { writeFileSync(join(dir, 'poster.jpg'), Buffer.from(await p.arrayBuffer())); entry.poster = `/blog/${slug}/poster.jpg`; }
        }
      }
    }
    entry.syncedAt = new Date().toISOString();
    saved[slug] = entry;
    ok++;
    console.log(`ok   ${slug}  reactions=${entry.reactions ?? '?'}${countsOnly ? '' : `  images=${entry.images?.length ?? 0}${entry.video ? ' video' : ''}`}`);
  } catch (e) {
    console.warn(`skip ${slug}: ${e.message} (kept saved data)`);
  }
  await new Promise((r) => setTimeout(r, 600));
}
const sorted = Object.fromEntries(Object.keys(saved).sort().map((k) => [k, saved[k]]));
writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n');
console.log(`${ok}/${posts.length} posts synced`);
