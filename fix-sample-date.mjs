import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');
content = content.replace('date: today(),', 'invoiceDate: today(),');
fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
