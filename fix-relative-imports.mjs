import fs from 'fs';
import path from 'path';

['es', 'hi'].forEach(lang => {
  const filePath = path.join('src/pages', lang, 'index.astro');
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/\.\.\/layouts\//g, '../../layouts/');
  content = content.replace(/\.\.\/components\//g, '../../components/');
  content = content.replace(/\.\.\/i18n\//g, '../../i18n/');
  
  fs.writeFileSync(filePath, content);
});
console.log('Fixed relative imports');
