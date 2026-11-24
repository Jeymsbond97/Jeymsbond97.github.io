import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postMedia, postText, postHtml } from '../lib/content';

export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = await getPosts('en');
  return rss({
    title: 'Tokhirbek Aminjonov · Blog',
    description: 'Robotics exhibitions, engineering notes and life in Korea from a robot software engineer in Seoul.',
    site,
    items: posts.map(({ entry, slug, translated }) => {
      const { images, video } = postMedia(slug, entry.data);
      const media = video
        ? (video.poster ? [`<p><img src="${new URL(video.poster.src, site)}" alt="" /></p>`] : [])
        : images.map((im) => `<p><img src="${new URL(im.src, site)}" alt="" width="${im.width}" height="${im.height}" /></p>`);
      return {
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.summary,
        content: postHtml(postText(slug, entry, translated).text) + media.join(''),
        categories: [entry.data.category],
        link: `/blog/${slug}/`,
      };
    }),
  });
}
