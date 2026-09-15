import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/pages/index.astro', 'utf8');

['es', 'hi'].forEach(lang => {
  const dir = path.join('src/pages', lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.astro'), content);
});
console.log('Locale pages created');
