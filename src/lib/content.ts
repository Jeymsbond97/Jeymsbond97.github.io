import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Lang } from '../i18n/ui';
import linkedin from '../data/linkedin.json';

export const slugOf = (id: string) => id.split('/').slice(1).join('/');
export const langOf = (id: string) => id.split('/')[0] as Lang;

/** Entries for a language; falls back to English for any slug without a translation. */
async function localized<C extends 'projects' | 'blog'>(name: C, lang: Lang) {
  const all = (await getCollection(name)) as CollectionEntry<C>[];
  const en = all.filter((e) => langOf(e.id) === 'en');
  if (lang === 'en') return en.map((e) => ({ entry: e, slug: slugOf(e.id), translated: true }));
  const byslug = new Map(all.filter((e) => langOf(e.id) === lang).map((e) => [slugOf(e.id), e]));
  return en.map((e) => {
    const slug = slugOf(e.id);
    const local = byslug.get(slug);
    return { entry: (local ?? e) as CollectionEntry<C>, slug, translated: Boolean(local) };
  });
}

export async function getProjects(lang: Lang) {
  const list = await localized('projects', lang);
  return list.sort((a, b) => a.entry.data.order - b.entry.data.order);
}

export async function getPosts(lang: Lang) {
  const list = await localized('blog', lang);
  return list.sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}

// ---------------------------------------------------------------------------
// Blog: the original LinkedIn post (text, photos, video, reactions) lives in
// src/data/linkedin.json, written by scripts/sync-linkedin.mjs. The English page
// renders that text verbatim; a Korean entry's Markdown body holds its translation
// as plain text (same paragraph rules as the original, not rendered as Markdown).

export interface LinkedInPost {
  id?: string;
  text?: string;
  images?: string[];
  video?: string;
  poster?: string;
  reactions?: number;
  comments?: number;
  syncedAt?: string;
}

const linkedinData = linkedin as Record<string, LinkedInPost>;
export const linkedinOf = (slug: string): LinkedInPost => linkedinData[slug] ?? {};

export interface PostImage { src: string; width: number; height: number }

/** Pixel size of a JPEG or PNG under public/, read from the file header at build time. */
export function imageSize(src: string): { width: number; height: number } | undefined {
  const file = join(process.cwd(), 'public', src);
  if (!src.startsWith('/') || !existsSync(file)) return undefined;
  const b = readFileSync(file);
  if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  let i = 2;
  while (i + 9 < b.length && b[i] === 0xff) {
    const marker = b[i + 1];
    // SOF0..SOF15 carry the frame size; C4 (DHT), C8 (JPG) and CC (DAC) share the range but do not.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return undefined;
}

const sized = (src: string): PostImage => ({ src, ...(imageSize(src) ?? { width: 1200, height: 900 }) });

/** Everything visual a post has: its LinkedIn photos (or the frontmatter cover), video and card cover. */
export function postMedia(slug: string, data: CollectionEntry<'blog'>['data']) {
  const li = linkedinOf(slug);
  const photos = (li.images ?? []).map(sized);
  const images = photos.length ? photos : !li.video && data.cover ? [sized(data.cover)] : [];
  const video = li.video ? { src: li.video, poster: li.poster ? sized(li.poster) : undefined } : undefined;
  const cover = images[0] ?? video?.poster;
  return { images, video, cover };
}

/** The post text in the page language and, for a translated page, the original it came from. */
export function postText(slug: string, entry: CollectionEntry<'blog'>, translated: boolean) {
  const original = linkedinOf(slug).text ?? (langOf(entry.id) === 'en' ? entry.body : undefined) ?? '';
  const local = langOf(entry.id) !== 'en' && translated ? entry.body?.trim() : undefined;
  if (!local) return { text: original, original: undefined, lang: 'en' as Lang };
  return { text: local, original: original || undefined, lang: langOf(entry.id) };
}

export interface KstParts { date: string; time: string; year: number }

/** "2026.11.22" and "20:17" in Korea time, for the HUD meta line. */
export function kst(date: Date): KstParts {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(date)
      .map((x) => [x.type, x.value]),
  );
  return { date: `${p.year}.${p.month}.${p.day}`, time: `${p.hour}:${p.minute}`, year: Number(p.year) };
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const HASHTAG = /^#\p{L}[\p{L}\p{N}_]*$/u;
// A URL stops before trailing punctuation; a hashtag must start with a letter ("Dev Korea #5" is not a tag).
const TOKEN = /(https?:\/\/[^\s<>"]+?)(?=[.,;:!?)\]'"’”…]*(?:\s|$))|(?<![\p{L}\p{N}_&])#(\p{L}[\p{L}\p{N}_]*)/gu;

function inline(line: string): string {
  let out = '';
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    out += escapeHtml(line.slice(last, m.index));
    if (m[1]) {
      const href = escapeHtml(m[1]);
      out += `<a href="${href}" target="_blank" rel="noopener">${escapeHtml(m[1].replace(/^https?:\/\//, ''))}</a>`;
    } else {
      out += `<span class="htag">#${escapeHtml(m[2])}</span>`;
    }
    last = m.index + m[0].length;
  }
  return out + escapeHtml(line.slice(last));
}

/**
 * Post text as HTML, exactly as written: blank lines start a paragraph, single line breaks
 * stay, emoji stay, links become anchors and hashtags become chips. A paragraph made only
 * of hashtags becomes a chip row.
 */
export function postHtml(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .trim()
    .split(/\n[ \t]*\n+/)
    .map((para, i) => {
      const lines = para.split('\n').map((l) => l.trim()).filter(Boolean);
      const words = lines.join(' ').split(/\s+/);
      if (words.every((w) => HASHTAG.test(w))) return `<p class="htags">${words.map(inline).join(' ')}</p>`;
      // A short single-line opener ("SMATEC 2026 📍") reads as the post's own headline.
      const lede = i === 0 && lines.length === 1 && lines[0].length <= 80;
      return `<p${lede ? ' class="lede"' : ''}>${lines.map(inline).join('<br>')}</p>`;
    })
    .join('\n');
}
