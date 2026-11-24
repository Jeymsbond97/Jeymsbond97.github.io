import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    outcome: z.string(),
    order: z.number(),
    group: z.enum(['robotics', 'physical-ai']),
    featured: z.boolean().default(false),
    role: z.string(),
    period: z.string(),
    team: z.string(),
    platform: z.string(),
    status: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    /** CSS object-position for the card crop, e.g. "0% 50%" for a wide side-by-side frame. */
    coverPos: z.string().optional(),
    client: z.string().optional(),
    /** Self-hosted landscape clip (under public/projects/) shown when there is no YouTube video. */
    clip: z.object({ src: z.string(), poster: z.string(), caption: z.string() }).optional(),
    youtube: z.array(z.object({ id: z.string(), title: z.string() })).default([]),
    gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    repo: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    tags: z.array(z.string()),
    results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    diagram: z
      .object({
        lanes: z.array(z.object({ label: z.string(), nodes: z.array(z.string()) })),
        sink: z.string(),
      })
      .optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    place: z.string().optional(),
    category: z.enum(['Exhibition', 'Tech', 'Event', 'Career', 'Certificate', 'Life']),
    summary: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    youtube: z.string().optional(),
    linkedin: z.string().url(),
  }),
});

export const collections = { projects, blog };
