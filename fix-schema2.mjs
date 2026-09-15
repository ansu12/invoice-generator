import fs from 'fs';
const files = [
  'src/pages/free-invoice-generator.astro',
  'src/pages/invoice-generator-free.astro',
  'src/pages/online-invoice-generator.astro',
  'src/pages/free-online-invoice-generator.astro',
  'src/pages/index.astro'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Just strip out the old microdata block entirely
  content = content.replace(/<div itemscope itemprop="mainEntity"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, '');
  content = content.replace(/<div itemscope itemprop="mainEntity"[\s\S]*?<\/article>/g, '</article>');
  // Also remove `<div itemscope itemtype="https://schema.org/FAQPage">` if it exists naked
  content = content.replace(/<div itemscope itemtype="https:\/\/schema.org\/FAQPage">\s*<\/div>/g, '');
  
  fs.writeFileSync(file, content);
}
console.log('Cleaned old microdata');
