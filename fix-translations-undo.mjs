import fs from 'fs';
let content = fs.readFileSync('src/i18n/translations.ts', 'utf8');

content = content.replace(
    'export const ui = {\n  fr: en,\n  de: en,\n  pt: en,',
    'export const ui = {'
);
fs.writeFileSync('src/i18n/translations.ts', content);
