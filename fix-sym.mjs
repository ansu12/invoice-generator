import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

const fmtRegex = /const fmt = \(n: number\) =>\s*new Intl\.NumberFormat\("en-US", {\s*style: "currency",\s*currency: data\.currency \|\| "USD",\s*}\)\.format\(n\);/;

const withSym = `const sym = CURRENCIES.find((c) => c.code === data.currency)?.symbol ?? "$";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currency || "USD",
    }).format(n);`;

content = content.replace(fmtRegex, withSym);
fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('sym added back');
