import fs from 'fs';
let content = fs.readFileSync('src/components/Footer.astro', 'utf8');

content = content.replace(
  '<a href="/sitemap-index.xml" class="hover:text-blue-600 transition-colors">Sitemap</a>',
  '<a href="/sitemap" class="hover:text-blue-600 transition-colors">Sitemap</a>'
);

fs.writeFileSync('src/components/Footer.astro', content);
