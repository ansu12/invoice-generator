import fs from 'fs';
let content = fs.readFileSync('src/components/LanguageSwitcher.astro', 'utf8');

// Fix the path regex
content = content.replace(
  /const pathWithoutLang = currentPath\.replace\(\/\^\\\/.*?\/, '\/'\)\.replace\(\/\^\\\/.*?\/, '\/'\);/,
  "const pathWithoutLang = currentPath.replace(/^\\/(es|hi|fr|de|pt)\\//, '/').replace(/^\\/(es|hi|fr|de|pt)$/, '/');"
);

// Fix the map filter
content = content.replace(
  "['en', 'es', 'hi'].includes(code)",
  "['en', 'es', 'hi', 'fr', 'de', 'pt'].includes(code)"
);

fs.writeFileSync('src/components/LanguageSwitcher.astro', content);
console.log('Language switcher updated');
