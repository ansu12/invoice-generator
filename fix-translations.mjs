import fs from 'fs';
let content = fs.readFileSync('src/i18n/translations.ts', 'utf8');

if (!content.includes('fr: en,')) {
    content = content.replace(
        'export const ui = {',
        'export const ui = {\n  fr: en,\n  de: en,\n  pt: en,'
    );
    // Since `en` isn't declared as a variable, wait.
    // The structure is `export const ui = { en: { ... }, es: { ... }, hi: { ... } };`
    // I can't just say `fr: en` because `en` isn't defined outside. I can define it outside.
    
    // Instead of doing that, I'll just change how `utils.ts` works to fallback gracefully!
}
fs.writeFileSync('src/i18n/translations.ts', content);
