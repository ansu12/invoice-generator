import fs from 'fs';
let content = fs.readFileSync('src/i18n/utils.ts', 'utf8');

content = content.replace(
  'return ui[lang][key] || ui[defaultLang][key];',
  'return (ui[lang] && ui[lang][key]) || ui[defaultLang][key];'
);

fs.writeFileSync('src/i18n/utils.ts', content);
console.log('utils.ts fixed');
