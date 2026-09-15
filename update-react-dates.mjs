import fs from 'fs';

let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

// 1. Add import
content = content.replace(
  'import { TAX_SYSTEMS, US_STATES, EU_COUNTRIES, CA_PROVINCES, IN_RATES } from "../lib/taxes";',
  'import { TAX_SYSTEMS, US_STATES, EU_COUNTRIES, CA_PROVINCES, IN_RATES } from "../lib/taxes";\nimport { formatDate } from "../lib/date-helper";'
);

// 2. Add to getDefaultData
content = content.replace(
  '  invoiceDate: today(),\n  dueDate: dueIn30(),\n',
  '  invoiceDate: today(),\n  dueDate: dueIn30(),\n  dateFormat: "auto",\n'
);

// 3. Add to handleSample
content = content.replace(
  '        invoiceDate: today(),\n        dueDate: dueIn30(),\n',
  '        invoiceDate: today(),\n        dueDate: dueIn30(),\n        dateFormat: "auto",\n'
);

// 4. Add dropdown to Invoice Details form section
const oldInvoiceDetails = `                  <div>
                    <label className={labelCls}>{t("tool.currency")}</label>`;

const newInvoiceDetails = `                  <div>
                    <label className={labelCls}>Date Format</label>
                    <select className={inputCls} value={data.dateFormat} onChange={(e) => set("dateFormat", e.target.value)}>
                      <option value="auto">Auto-detect Locale</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (UK/EU)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>{t("tool.currency")}</label>`;

content = content.replace(oldInvoiceDetails, newInvoiceDetails);

// 5. Apply formatDate in the Preview section
content = content.replace(
  '<span className="text-slate-700">{data.invoiceDate || "?""}</span></p>',
  '<span className="text-slate-700">{formatDate(data.invoiceDate, data.dateFormat) || "—"}</span></p>'
);

content = content.replace(
  '<span className="font-semibold text-slate-900">{data.dueDate || "?""}</span></p>',
  '<span className="font-semibold text-slate-900">{formatDate(data.dueDate, data.dateFormat) || "—"}</span></p>'
);

fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('InvoiceGenerator date integration complete');
