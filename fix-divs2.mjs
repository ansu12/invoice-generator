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
  // I know that the <div class="max-w-3xl mx-auto px-6 prose prose-slate prose-lg"> is open.
  // It needs a closing </div> before </article>
  
  // Strip out any </div> right before </article> just to be safe
  content = content.replace(/<\/div>\s*<\/article>/, '</article>');
  // Add it back
  content = content.replace(/<\/article>/, '  </div>\n</article>');
  
  fs.writeFileSync(file, content);
}
console.log('Fixed divs accurately');
