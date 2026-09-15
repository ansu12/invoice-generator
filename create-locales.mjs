import fs from 'fs';
import path from 'path';

const locales = ['es', 'hi', 'fr', 'de', 'pt'];
const srcFile = 'src/pages/index.astro';
const srcContent = fs.readFileSync(srcFile, 'utf8');

locales.forEach(lang => {
    const dir = path.join('src/pages', lang);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.astro'), srcContent);
});

console.log('Locale pages created');
