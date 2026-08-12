import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// nexusinsight.io — vitrine NexusInsight (packages productisés).
// EN à la racine (x-default), FR sous /fr/ — hreflang géré page par page dans Layout.astro.
export default defineConfig({
  site: 'https://nexusinsight.io',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  // Les pages légales sont en noindex : on les exclut du sitemap (même règle que kaankarabulut).
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/legal') && !page.includes('/mentions-legales'),
    }),
  ],
});
