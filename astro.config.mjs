// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://invoice-generator.pages.dev',
  output: 'static',
  outDir: './build',
  trailingSlash: 'never',
  compressHTML: true,
  integrations: [
    react(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "hi"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
