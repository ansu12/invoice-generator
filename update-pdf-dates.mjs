import fs from 'fs';
let content = fs.readFileSync('src/lib/pdf-generator.ts', 'utf8');

// Add import
content = content.replace(
  "import { TAX_SYSTEMS } from './taxes';",
  "import { TAX_SYSTEMS } from './taxes';\nimport { formatDate } from './date-helper';"
);

// Replace date outputs
content = content.replace(
  "doc.text(data.invoiceDate || '\\u2014', RIGHT_X, y, { align: 'right' });",
  "doc.text(formatDate(data.invoiceDate, data.dateFormat) || '\\u2014', RIGHT_X, y, { align: 'right' });"
);

content = content.replace(
  "doc.text(data.dueDate || '\\u2014', RIGHT_X, y, { align: 'right' });",
  "doc.text(formatDate(data.dueDate, data.dateFormat) || '\\u2014', RIGHT_X, y, { align: 'right' });"
);

fs.writeFileSync('src/lib/pdf-generator.ts', content);
console.log('pdf-generator date integration complete');
