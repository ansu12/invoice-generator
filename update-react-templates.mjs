import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

// 1. Add TEMPLATES array right before the component definition
const templatesCode = `
const TEMPLATES = [
  { id: 'freelancer', label: 'Freelancer', data: {
      toName: "Acme Agency",
      items: [
        { id: "t1", description: "Design services", quantity: 1, rate: 1500 },
        { id: "t2", description: "Development hours", quantity: 10, rate: 75 },
        { id: "t3", description: "Revisions", quantity: 2, rate: 50 },
      ],
      notes: "Payment due within 14 days. Thank you for your business!",
      paymentTerms: "Net 14"
  }},
  { id: 'contractor', label: 'Contractor', data: {
      toName: "Smith Construction",
      items: [
        { id: "t4", description: "Labor (hours)", quantity: 40, rate: 45 },
        { id: "t5", description: "Materials", quantity: 1, rate: 850 },
        { id: "t6", description: "Equipment rental", quantity: 2, rate: 125 },
      ],
      notes: "Payment due upon receipt. Please make checks payable to my business name.",
      paymentTerms: "Due on Receipt"
  }},
  { id: 'consultant', label: 'Consultant', data: {
      toName: "Global Corp LLC",
      items: [
        { id: "t7", description: "Consulting hours", quantity: 15, rate: 120 },
        { id: "t8", description: "Travel expenses", quantity: 1, rate: 350 },
      ],
      notes: "Net 30 terms. Late payments subject to 1.5% monthly fee.",
      paymentTerms: "Net 30"
  }},
  { id: 'business', label: 'Small Business', data: {
      toName: "Retail Customer",
      items: [
        { id: "t9", description: "Product Name", quantity: 5, rate: 45 },
        { id: "t10", description: "Shipping", quantity: 1, rate: 15 },
      ],
      notes: "Thank you for your business! Return policy: 30 days with receipt.",
      paymentTerms: "Due on Receipt"
  }}
];

export default function InvoiceGenerator({ lang = defaultLang, initialData }: { lang?: string; initialData?: Partial<InvoiceData> }) {`;

content = content.replace('export default function InvoiceGenerator', templatesCode);

// 2. Add applyTemplate function inside the component
const fnTarget = `  const [activeStep, setActiveStep] = useState(1);`;
const fnCode = `  const [activeStep, setActiveStep] = useState(1);

  const applyTemplate = (tplId: string) => {
    if (tplId === 'blank') {
      if (confirm("Clear all fields and start blank?")) {
        setData({ ...getBlankData(), activeTemplate: 'blank' });
        setActiveStep(1);
      }
      return;
    }
    
    const tpl = TEMPLATES.find(t => t.id === tplId);
    if (!tpl) return;
    
    setData(prev => ({
      ...prev,
      ...tpl.data,
      activeTemplate: tplId
    }));
    setToast({ message: "Template loaded. Edit any field to customize.", type: "success" });
    setActiveStep(4); // Open line items so they see the change
  };`;
content = content.replace(fnTarget, fnCode);

// 3. Add the UI block above the form sections
// Let's find the start of the form:
// <div className="md:col-span-7 space-y-8">
//   {/* Header controls */}
const oldFormStart = `<div className="md:col-span-7 space-y-8">
            {/* Header controls */}`;

const templateUI = `<div className="md:col-span-7 space-y-8">
            {/* Template Selector */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-8">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Start with a template</h3>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map(tpl => (
                  <button 
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl.id)}
                    className={\`px-4 py-2 text-sm font-medium rounded-full transition-colors \${data.activeTemplate === tpl.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}\`}
                  >
                    {tpl.label}
                  </button>
                ))}
                <button 
                  onClick={() => applyTemplate('blank')}
                  className={\`px-4 py-2 text-sm font-medium rounded-full transition-colors \${data.activeTemplate === 'blank' ? 'bg-slate-800 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}\`}
                >
                  Start blank
                </button>
              </div>
            </div>

            {/* Header controls */}`;

content = content.replace(oldFormStart, templateUI);

// Remove the old 'Clear and start fresh' button from Header controls since we have "Start blank" now, or keep it. Let's remove it to avoid clutter, as requested "Add a 'Start blank' option that clears the form". 
// Wait, the user said "Add a 'Start blank' option that clears the form." so they might want both or one. Keeping both is okay, but replacing is cleaner. Let's just remove the old one.
const oldHeaderControls = `              <button 
                onClick={() => { if(confirm("Clear all fields and start fresh?")) setData(getBlankData()) }}
                className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 font-semibold transition-colors px-3 py-2 rounded-lg border border-transparent hover:border-red-200 whitespace-nowrap"
              >
                Clear and start fresh
              </button>`;
content = content.replace(oldHeaderControls, '');

fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('Templates added');
