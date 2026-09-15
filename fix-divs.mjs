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
  // Check if it's missing the closing div
  if (content.includes('</script>\n  \n      </article>')) {
    content = content.replace('</script>\n  \n      </article>', '</script>\n    </div>\n  </article>');
  } else if (content.includes('</script>\n  \n          </article>')) {
    content = content.replace('</script>\n  \n          </article>', '</script>\n    </div>\n  </article>');
  }
  fs.writeFileSync(file, content);
}
console.log('Fixed divs');
