import fs from 'fs';
let content = fs.readFileSync('src/lib/pdf-generator.ts', 'utf8');

const oldFmt = `  const sym = CURRENCIES.find((c) => c.code === data.currency)?.symbol ?? '$';
  const fmt = (n: number) =>
    \`\${sym}\${n.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}\`;`;

const newFmt = `  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency || 'USD',
    }).format(n);`;

content = content.replace(oldFmt, newFmt);
fs.writeFileSync('src/lib/pdf-generator.ts', content);
console.log('pdf-generator updated');
