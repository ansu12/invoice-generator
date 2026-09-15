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
  // First, find the newly injected json-ld script to save it
  const jsonMatch = content.match(/<script type="application\/ld\+json"[\s\S]*?<\/script>/);
  const newFaqMatch = content.match(/<div class="space-y-6">[\s\S]*?<\/div>\s*<\/div>/);
  
  if (!jsonMatch || !newFaqMatch) continue;
  
  const script = jsonMatch[0];
  const newFaqs = newFaqMatch[0];
  
  // Cut everything from <h2>Frequently Asked Questions to </article>
  const beforeH2 = content.split('<h2>Frequently Asked Questions')[0];
  const afterArticle = content.split('</article>')[1];
  
  const rebuilt = beforeH2 + '<h2>Frequently Asked Questions</h2>\n    ' + newFaqs + '\n    ' + script + '\n  </div>\n</article>' + afterArticle;
  
  fs.writeFileSync(file, rebuilt);
}
console.log('Fixed FAQs!');
