import fs from 'fs';
let content = fs.readFileSync('src/pages/free-invoice-generator.astro', 'utf8');
content = content.replace(
  'import InvoiceGenerator from "../components/InvoiceGenerator";',
  'import InvoiceGenerator from "../components/InvoiceGenerator";\nimport ComparisonTable from "../components/ComparisonTable.astro";'
);
content = content.replace(
  '<h2>How It Compares to Paid Invoice Software</h2>',
  '<h2>How It Compares to Paid Invoice Software</h2>\n    <div class="not-prose my-12">\n      <ComparisonTable />\n    </div>'
);
fs.writeFileSync('src/pages/free-invoice-generator.astro', content);
