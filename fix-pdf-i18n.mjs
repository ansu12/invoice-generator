import fs from 'fs';
let content = fs.readFileSync('src/lib/pdf-generator.ts', 'utf8');

if (!content.includes('../i18n/translations')) {
  content = content.replace(
    "import { CURRENCIES } from './types';",
    "import { CURRENCIES } from './types';\nimport { ui, defaultLang } from '../i18n/translations';"
  );
  
  content = content.replace(
    'export async function generateInvoicePDF(',
    'export async function generateInvoicePDF(\n  data: InvoiceData,\n  lang: string = defaultLang\n): Promise<{ blob: Blob; filename: string }> {\n  const t = (key: keyof typeof ui["en"]) => (ui as any)[lang]?.[key] || (ui as any)[defaultLang][key];\n'
  );
  
  // Remove the old signature
  content = content.replace(
    '  data: InvoiceData\n): Promise<{ blob: Blob; filename: string }> {',
    ''
  );

  content = content.replace("'INVOICE'", 't("pdf.invoice")');
  content = content.replace("'Invoice #'", 't("pdf.invoiceNum")');
  content = content.replace("'Date'", 't("pdf.date")');
  content = content.replace("'Due Date'", 't("pdf.dueDate")');
  content = content.replace("'Terms'", 't("pdf.terms")');
  content = content.replace("'Bill To'", 't("pdf.billTo")');
  content = content.replace("'Subtotal'", 't("pdf.subtotal")');
  content = content.replace("'Total'", 't("pdf.total")');
  content = content.replace('`Sales Tax (${data.taxRate}%)`', '`${t("pdf.tax")} (${data.taxRate}%)`');

  fs.writeFileSync('src/lib/pdf-generator.ts', content);
  console.log('pdf-generator i18n applied');
}
