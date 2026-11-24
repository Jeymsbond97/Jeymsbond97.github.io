import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

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
