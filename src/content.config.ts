import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    outcome: z.string(),
    order: z.number(),
    group: z.enum(['robotics', 'physical-ai']),
    featured: z.boolean().default(false),
    /* Facts table at the top of the case study. */
    period: z.string(),
    status: z.string(),
    /** External client, "Cutshion (in-house)" or "Independent / open source". */
    client: z.string(),
    /** What I did, concretely. */
    role: z.string(),
    /** Only for real team work; solo projects leave it out. */
    team: z.string().optional(),
    cover: z.string(),
    coverAlt: z.string(),
    /** CSS object-position for the card crop, e.g. "0% 50%" for a wide side-by-side frame. */
    coverPos: z.string().optional(),
    /** Self-hosted landscape clip (under public/projects/) shown when there is no YouTube video. */
    clip: z.object({ src: z.string(), poster: z.string(), caption: z.string() }).optional(),
    youtube: z.array(z.object({ id: z.string(), title: z.string() })).default([]),
    gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    /** Kept for the record only: source access is restricted, so these URLs are never rendered. */
    repo: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    /** Short chips on the project cards. */
    tags: z.array(z.string()),
    /** Metric tiles: a short value (number or 1-2 words) and a label of about 6 words. */
    results: z.array(z.object({ value: z.string().max(10), label: z.string().max(48) })).max(4).default([]),
    /** "How it works": 3 to 5 plain-language steps. */
    flow: z.array(z.string().max(72)).min(3).max(5),
    /** Everything used, grouped by kind (Languages, Frameworks, AI / Vision, ...). */
    stack: z.array(z.object({ group: z.string(), items: z.array(z.string()).min(1) })).min(1),
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
