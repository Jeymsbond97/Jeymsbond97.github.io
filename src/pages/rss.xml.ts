import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = await getPosts('en');
  return rss({
    title: 'Tokhirbek Aminjonov · Blog',
    description: 'Robotics exhibitions, engineering notes and life in Korea from a robot software engineer in Seoul.',
    site: context.site!,
    items: posts.map(({ entry, slug }) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.summary,
      link: `/blog/${slug}/`,
    })),
  });
}
