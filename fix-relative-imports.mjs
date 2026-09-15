import fs from 'fs';
import path from 'path';

['es', 'hi', 'fr', 'de', 'pt'].forEach(lang => {
  const filePath = path.join('src/pages', lang, 'index.astro');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\.\.\/layouts\//g, '../../layouts/');
    content = content.replace(/\.\.\/components\//g, '../../components/');
    content = content.replace(/\.\.\/i18n\//g, '../../i18n/');
    fs.writeFileSync(filePath, content);
  }
});
console.log('Fixed relative imports for all languages');
