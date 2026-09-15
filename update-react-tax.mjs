import fs from 'fs';

let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  'import { ui, defaultLang } from "../i18n/translations";',
  'import { ui, defaultLang } from "../i18n/translations";\nimport { TAX_SYSTEMS, US_STATES, EU_COUNTRIES, CA_PROVINCES, IN_RATES } from "../lib/taxes";'
);

// 2. Update getDefaultData()
const oldGetDefaultData = `const getDefaultData = (): InvoiceData => ({
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  fromPhone: "",
  fromEIN: "",
  logoUrl: "",`;

const newGetDefaultData = `const getDefaultData = (): InvoiceData => ({
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  fromPhone: "",
  fromEIN: "",
  taxIdLabel: "Tax ID",
  taxId: "",
  logoUrl: "",`;

content = content.replace(oldGetDefaultData, newGetDefaultData);

const oldGetDefaultData2 = `  items: [newItem()],
  notes: "",
  paymentTerms: "Net 30",
  taxRate: 0,
});`;

const newGetDefaultData2 = `  items: [newItem()],
  notes: "",
  paymentTerms: "Net 30",
  taxSystem: "Custom",
  taxRegion: "",
  taxLabel: "Tax",
  taxRate: 0,
});`;

content = content.replace(oldGetDefaultData2, newGetDefaultData2);

// 3. Update active tax label logic in the component
content = content.replace(
  'const [toast, setToast] = useState<ToastState | null>(null);',
  'const [toast, setToast] = useState<ToastState | null>(null);\n\n  const activeTaxSystem = TAX_SYSTEMS.find(ts => ts.id === data.taxSystem) || TAX_SYSTEMS[0];\n  const activeTaxLabel = activeTaxSystem.label;\n'
);

// 4. Update Business Info to show dynamic Tax ID
const oldBusinessInfo = `{/* Business Info */}
              <div className={cardCls}>
                <h3 className="font-semibold text-slate-900 mb-4">{t("tool.businessInfo")}</h3>
                <div className="space-y-3">
                  <input className={inputCls} placeholder="Your business name" value={data.fromName}
                    onChange={(e) => set("fromName", e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputCls} placeholder="Email" value={data.fromEmail}
                      onChange={(e) => set("fromEmail", e.target.value)} />
                    <input className={inputCls} placeholder="Phone" value={data.fromPhone}
                      onChange={(e) => set("fromPhone", e.target.value)} />
                  </div>
                  <textarea className={\`\${inputCls} resize-none\`} rows={2} placeholder="Address" value={data.fromAddress}
                    onChange={(e) => set("fromAddress", e.target.value)} />
                </div>
              </div>`;

const newBusinessInfo = `{/* Business Info */}
              <div className={cardCls}>
                <h3 className="font-semibold text-slate-900 mb-4">{t("tool.businessInfo")}</h3>
                <div className="space-y-3">
                  <input className={inputCls} placeholder="Your business name" value={data.fromName}
                    onChange={(e) => set("fromName", e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputCls} placeholder="Email" value={data.fromEmail}
                      onChange={(e) => set("fromEmail", e.target.value)} />
                    <input className={inputCls} placeholder="Phone" value={data.fromPhone}
                      onChange={(e) => set("fromPhone", e.target.value)} />
                  </div>
                  <textarea className={\`\${inputCls} resize-none\`} rows={2} placeholder="Address" value={data.fromAddress}
                    onChange={(e) => set("fromAddress", e.target.value)} />
                  {activeTaxSystem.idLabel && activeTaxSystem.idLabel !== "EIN" && (
                    <input className={inputCls} placeholder={activeTaxSystem.idLabel} value={data.taxId}
                      onChange={(e) => { set("taxId", e.target.value); set("taxIdLabel", activeTaxSystem.idLabel); }} />
                  )}
                  {activeTaxSystem.idLabel === "EIN" && (
                    <input className={inputCls} placeholder="EIN (optional)" value={data.fromEIN}
                      onChange={(e) => set("fromEIN", e.target.value)} />
                  )}
                </div>
              </div>`;

content = content.replace(oldBusinessInfo, newBusinessInfo);

// 5. Update Tax Section in the Form
const oldTaxSection = `{/* Tax */}
                <div className="mt-4 flex items-center gap-3">
                  <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{t("tool.taxRate")}</label>
                  <input className={\`\${inputCls} w-28\`} type="number" min="0" max="100" step="0.5"
                    value={data.taxRate || ""} placeholder="0"
                    onChange={(e) => set("taxRate", parseFloat(e.target.value) || 0)} />
                </div>`;

const newTaxSection = `{/* Tax */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                    <label className="text-sm font-semibold text-slate-700 whitespace-nowrap min-w-[120px]">Tax System</label>
                    <select className={inputCls} value={data.taxSystem} onChange={(e) => {
                      const sys = e.target.value;
                      set("taxSystem", sys);
                      const tsys = TAX_SYSTEMS.find(t => t.id === sys);
                      set("taxLabel", tsys?.label || "Tax");
                      if (sys === 'UK') set("taxRate", 20);
                      else if (sys === 'AU') set("taxRate", 10);
                      else if (sys === 'UAE') set("taxRate", 5);
                      else if (sys !== 'Custom' && sys !== 'IN' && sys !== 'US' && sys !== 'EU' && sys !== 'CA') set("taxRate", 0);
                    }}>
                      {TAX_SYSTEMS.map(ts => <option key={ts.id} value={ts.id}>{ts.name}</option>)}
                    </select>
                  </div>
                  
                  {data.taxSystem === 'US' && (
                    <div className="flex items-center gap-3 mb-3">
                      <label className="text-sm font-semibold text-slate-700 whitespace-nowrap min-w-[120px]">State</label>
                      <select className={inputCls} value={data.taxRegion} onChange={(e) => {
                        set("taxRegion", e.target.value);
                        const s = US_STATES.find(st => st.name === e.target.value);
                        if (s) set("taxRate", s.rate);
                      }}>
                        <option value="">Select State...</option>
                        {US_STATES.map(s => <option key={s.name} value={s.name}>{s.name} ({s.rate}%)</option>)}
                      </select>
                    </div>
                  )}

                  {data.taxSystem === 'EU' && (
                    <div className="flex items-center gap-3 mb-3">
                      <label className="text-sm font-semibold text-slate-700 whitespace-nowrap min-w-[120px]">Country</label>
                      <select className={inputCls} value={data.taxRegion} onChange={(e) => {
                        set("taxRegion", e.target.value);
                        const c = EU_COUNTRIES.find(co => co.name === e.target.value);
                        if (c) set("taxRate", c.rate);
                      }}>
                        <option value="">Select Country...</option>
                        {EU_COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name} ({c.rate}%)</option>)}
                      </select>
                    </div>
                  )}

                  {data.taxSystem === 'CA' && (
                    <div className="flex items-center gap-3 mb-3">
                      <label className="text-sm font-semibold text-slate-700 whitespace-nowrap min-w-[120px]">Province</label>
                      <select className={inputCls} value={data.taxRegion} onChange={(e) => {
                        set("taxRegion", e.target.value);
                        const p = CA_PROVINCES.find(pr => pr.name === e.target.value);
                        if (p) set("taxRate", p.rate);
                      }}>
                        <option value="">Select Province...</option>
                        {CA_PROVINCES.map(p => <option key={p.name} value={p.name}>{p.name} ({p.rate}%)</option>)}
                      </select>
                    </div>
                  )}

                  {data.taxSystem === 'IN' && (
                    <div className="flex items-center gap-3 mb-3">
                      <label className="text-sm font-semibold text-slate-700 whitespace-nowrap min-w-[120px]">GST Rate</label>
                      <select className={inputCls} value={data.taxRate.toString()} onChange={(e) => {
                        set("taxRate", parseFloat(e.target.value));
                      }}>
                        <option value="0">Select Rate...</option>
                        {IN_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                      </select>
                    </div>
                  )}

                  {['Custom', 'UK', 'AU', 'UAE'].includes(data.taxSystem) && (
                    <div className="flex items-center gap-3 mb-3">
                      <label className="text-sm font-semibold text-slate-700 whitespace-nowrap min-w-[120px]">{activeTaxLabel} %</label>
                      <input className={\`\${inputCls} w-28\`} type="number" min="0" max="100" step="0.1"
                        value={data.taxRate || ""} placeholder="0"
                        onChange={(e) => set("taxRate", parseFloat(e.target.value) || 0)} />
                    </div>
                  )}
                </div>`;

content = content.replace(oldTaxSection, newTaxSection);

// 6. Update Preview Total Section (Sales Tax -> dynamic label)
const oldPreviewTax = `{data.taxRate > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>{t("tool.tax")} ({data.taxRate}%)</span>
                        <span>{fmt(taxAmt)}</span>
                      </div>
                    )}`;

const newPreviewTax = `{data.taxRate > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>{data.taxLabel || t("tool.tax")} ({data.taxRate}%)</span>
                        <span>{fmt(taxAmt)}</span>
                      </div>
                    )}`;
content = content.replace(oldPreviewTax, newPreviewTax);

// 7. Update EIN logic in preview
const oldPreviewEIN = `{data.fromEIN && (
                      <p className="text-slate-500 text-sm">EIN: {data.fromEIN}</p>
                    )}`;

const newPreviewEIN = `{data.fromEIN && activeTaxSystem.idLabel === "EIN" && (
                      <p className="text-slate-500 text-sm">EIN: {data.fromEIN}</p>
                    )}
                    {data.taxId && activeTaxSystem.idLabel !== "EIN" && (
                      <p className="text-slate-500 text-sm">{activeTaxSystem.idLabel}: {data.taxId}</p>
                    )}`;

content = content.replace(oldPreviewEIN, newPreviewEIN);

fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('InvoiceGenerator tax integration complete');
