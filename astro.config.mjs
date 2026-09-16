import cloudflare from '@astrojs/cloudflare';
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  site: 'https://invoice-generator.pages.dev',
  output: 'server',
  adapter: cloudflare(),
  trailingSlash: 'never',
  compressHTML: true,
  integrations: [
    react(),
    
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "hi", "fr", "de", "pt"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
