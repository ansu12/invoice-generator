import fs from 'fs';
let content = fs.readFileSync('astro.config.mjs', 'utf8');

const i18nConfig = `  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "hi"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {`;

content = content.replace('  vite: {', i18nConfig);
fs.writeFileSync('astro.config.mjs', content);
console.log('astro.config.mjs updated');
