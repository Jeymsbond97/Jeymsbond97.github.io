// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jeymsbond97.github.io',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', ko: 'ko' } },
    }),
  ],
  // GitHub Pages cannot send HTTP redirects, so Astro writes a small meta-refresh page at each old URL
  redirects: {
    '/projects/principia-book-palletizing/': '/projects/prinpia-book-palletizing/',
    '/ko/projects/principia-book-palletizing/': '/ko/projects/prinpia-book-palletizing/',
    '/blog/2025-03-22-comeback/': '/blog/',
    '/ko/blog/2025-03-22-comeback/': '/ko/blog/',
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { format: 'directory' },
});
