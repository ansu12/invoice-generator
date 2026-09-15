import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

// The original preview dates look like:
// <span className="text-slate-700">{data.invoiceDate || "\u2014"}</span></p>
// Let's use regex to be safe

content = content.replace(
  /<span className="text-slate-700">\{data\.invoiceDate \|\| [^}]+\}<\/span><\/p>/,
  '<span className="text-slate-700">{formatDate(data.invoiceDate, data.dateFormat) || "—"}</span></p>'
);

content = content.replace(
  /<span className="font-semibold text-slate-900">\{data\.dueDate \|\| [^}]+\}<\/span><\/p>/,
  '<span className="font-semibold text-slate-900">{formatDate(data.dueDate, data.dateFormat) || "—"}</span></p>'
);

fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('Preview dates fixed');
