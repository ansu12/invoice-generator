import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

if (!content.includes('../i18n/translations')) {
  // Add imports
  content = content.replace(
    'import { CURRENCIES } from "../lib/types";',
    'import { CURRENCIES } from "../lib/types";\nimport { ui, defaultLang } from "../i18n/translations";'
  );

  // Add lang prop
  content = content.replace(
    'interface ComponentProps {\n  initialData?: Partial<InvoiceData>;\n}',
    'interface ComponentProps {\n  initialData?: Partial<InvoiceData>;\n  lang?: string;\n}'
  );

  content = content.replace(
    'export default function InvoiceGenerator({ initialData }: ComponentProps = {}) {',
    'export default function InvoiceGenerator({ initialData, lang = defaultLang }: ComponentProps = {}) {\n  const t = (key: keyof typeof ui["en"]) => (ui as any)[lang]?.[key] || (ui as any)[defaultLang][key];'
  );

  // Replace text in JSX
  const replacements = [
    ['"Invoice Details"', 't("tool.invoiceDetails")'],
    ['"Invoice #"', 't("tool.invoiceNum")'],
    ['"Currency"', 't("tool.currency")'],
    ['"Invoice Date"', 't("tool.date")'],
    ['"Due Date"', 't("tool.dueDate")'],
    ['"Line Items"', 't("tool.lineItems")'],
    ['"Description"', 't("tool.desc")'],
    ['"Qty"', 't("tool.qty")'],
    ['"Rate"', 't("tool.rate")'],
    ['"Amount"', 't("tool.amount")'],
    ['"Add Line Item"', 't("tool.addItem")'],
    ['"Sales Tax %"', 't("tool.taxRate")'],
    ['"Notes & Terms"', 't("tool.notesTerms")'],
    ['"Payment Terms"', 't("tool.paymentTerms")'],
    ['"Notes"', 't("tool.notes")'],
    ['"Subtotal"', 't("tool.subtotal")'],
    ['"Total"', 't("tool.total")'],
    ['"Download PDF"', 't("tool.downloadPdf")'],
    ['"Share via WhatsApp"', 't("tool.whatsapp")'],
    ['"Bill To"', 't("tool.billTo")'],
    ['"INVOICE"', 't("pdf.invoice")']
  ];

  replacements.forEach(([oldStr, newStr]) => {
    // Escape regex characters just in case, though none here have them
    const safeOld = oldStr.replace(/"/g, '');
    content = content.replace(new RegExp(`>${safeOld}<`, 'g'), `>{${newStr}}<`);
  });
  
  // Specific replacements
  content = content.replace(/>Invoice #<\/label>/g, `>{t("tool.invoiceNum")}</label>`);
  content = content.replace(/>Currency<\/label>/g, `>{t("tool.currency")}</label>`);
  content = content.replace(/>Invoice Date<\/label>/g, `>{t("tool.date")}</label>`);
  content = content.replace(/>Due Date<\/label>/g, `>{t("tool.dueDate")}</label>`);
  content = content.replace(/>Payment Terms<\/label>/g, `>{t("tool.paymentTerms")}</label>`);
  content = content.replace(/>Notes<\/label>/g, `>{t("tool.notes")}</label>`);
  content = content.replace(/>Sales Tax %<\/label>/g, `>{t("tool.taxRate")}</label>`);
  
  content = content.replace(/<span>Sales Tax \(\{data\.taxRate\}%\)<\/span>/, '<span>{t("tool.tax")} ({data.taxRate}%)</span>');

  // Update getPDFBlob
  content = content.replace(
    'return generateInvoicePDF(data);',
    'return generateInvoicePDF(data, lang);'
  );

  fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
  console.log('InvoiceGenerator i18n applied');
}
