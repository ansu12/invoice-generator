import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

const oldGetDefault = `const getDefaultData = (): InvoiceData => ({
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  fromPhone: "",
  fromEIN: "",
  taxIdLabel: "Tax ID",
  taxId: "",
  logoUrl: "",
  toName: "",
  toEmail: "",
  toAddress: "",
  invoiceNumber: "INV-001",
  invoiceDate: today(),
  dueDate: dueIn30(),
  dateFormat: "auto",
  currency: "USD",
  items: [newItem()],
  notes: "",
  paymentTerms: "Net 30",
  taxSystem: "Custom",
  taxRegion: "",
  taxLabel: "Tax",
  taxRate: 0,
});`;

const newGetDefault = `const getBlankData = (): InvoiceData => ({
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  fromPhone: "",
  fromEIN: "",
  taxIdLabel: "Tax ID",
  taxId: "",
  logoUrl: "",
  toName: "",
  toEmail: "",
  toAddress: "",
  invoiceNumber: "INV-001",
  invoiceDate: today(),
  dueDate: dueIn30(),
  dateFormat: "auto",
  currency: "USD",
  items: [newItem()],
  notes: "",
  paymentTerms: "Net 30",
  taxSystem: "Custom",
  taxRegion: "",
  taxLabel: "Tax",
  taxRate: 0,
});

const getSampleData = (): InvoiceData => ({
  fromName: "Acme Design Studio",
  fromEmail: "hello@acmedesign.com",
  fromAddress: "123 Creative Blvd\\nSan Francisco, CA 94110",
  fromPhone: "(555) 123-4567",
  fromEIN: "XX-XXXXXXX",
  taxIdLabel: "Tax ID",
  taxId: "",
  logoUrl: "",
  toName: "Sample Client Inc.",
  toEmail: "billing@sampleclient.com",
  toAddress: "456 Market St\\nNew York, NY 10001",
  invoiceNumber: "INV-001",
  invoiceDate: today(),
  dueDate: dueIn30(),
  dateFormat: "auto",
  currency: "USD",
  items: [
    { id: crypto.randomUUID(), description: "Website design \u2014 homepage", quantity: 1, rate: 1500 },
    { id: crypto.randomUUID(), description: "Logo design", quantity: 1, rate: 500 },
    { id: crypto.randomUUID(), description: "Revisions", quantity: 3, rate: 75 },
  ],
  notes: "Thank you for your business. Payment due within 30 days.",
  paymentTerms: "Net 30",
  taxSystem: "US",
  taxRegion: "California",
  taxLabel: "Sales Tax",
  taxRate: 7.25,
});`;

content = content.replace(oldGetDefault, newGetDefault);

const oldInit = `  const [data, setData] = useState<InvoiceData>(() => {
    const def = getDefaultData();
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('invoicegen_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...def, ...parsed, items: parsed.items?.length ? parsed.items : def.items };
        }
      } catch (e) {}
    }
    return initialData
      ? {
          ...def,
          ...initialData,
          items: initialData.items?.length ? initialData.items : def.items,
        }
      : def;
  });`;

const newInit = `  const [data, setData] = useState<InvoiceData>(() => {
    const blank = getBlankData();
    const sample = getSampleData();
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('invoicegen_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...blank, ...parsed, items: parsed.items?.length ? parsed.items : blank.items };
        }
      } catch (e) {}
    }
    return initialData
      ? {
          ...blank,
          ...initialData,
          items: initialData.items?.length ? initialData.items : blank.items,
        }
      : sample;
  });`;

content = content.replace(oldInit, newInit);

const oldFormStart = `<div className="space-y-8">
            {/* Business Info */}`;

const newFormStart = `<div className="space-y-8">
            {/* Header controls */}
            <div className="flex justify-between items-start gap-4 mb-2">
              <div className="flex-1">
                {data.fromName === "Acme Design Studio" && (
                  <p className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    💡 Sample data shown. Edit any field to customize your invoice.
                  </p>
                )}
              </div>
              <button 
                onClick={() => { if(confirm("Clear all fields and start fresh?")) setData(getBlankData()) }}
                className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 font-semibold transition-colors px-3 py-2 rounded-lg border border-transparent hover:border-red-200 whitespace-nowrap"
              >
                Clear and start fresh
              </button>
            </div>
            
            {/* Business Info */}`;

content = content.replace(oldFormStart, newFormStart);

fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('Sample data and clear button added');
