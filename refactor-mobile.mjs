import fs from 'fs';

let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

// 1. Add activeStep state and helper components
const stateTarget = `const [loading, setLoading] = useState<"pdf" | "share" | null>(null);`;
const stateInjection = `${stateTarget}
  const [activeStep, setActiveStep] = useState(1);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const StepHeader = ({ step, title }: { step: number, title: string }) => {
    const isActive = activeStep === step;
    const isCompleted = activeStep > step;
    return (
      <div 
        className={\`md:hidden flex items-center justify-between pb-3 mb-4 border-b cursor-pointer \${isActive ? 'border-blue-500' : 'border-slate-100'}\`}
        onClick={() => setActiveStep(isActive ? 0 : step)}
      >
        <div className="flex items-center gap-3">
          <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold \${isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}\`}>
            {isCompleted ? '✓' : step}
          </div>
          <h3 className={\`font-semibold \${isActive ? 'text-blue-900' : 'text-slate-800'}\`}>{title}</h3>
        </div>
      </div>
    );
  };

  const NextButton = ({ step }: { step: number }) => (
    <button 
      onClick={() => setActiveStep(step + 1)}
      className="mt-6 w-full py-3 bg-blue-50 text-blue-700 font-semibold rounded-[10px] hover:bg-blue-100 transition-colors md:hidden"
    >
      {step === 6 ? 'View Preview' : 'Next'}
    </button>
  );`;

content = content.replace(stateTarget, stateInjection);

// 2. Adjust Grid classes (lg -> md) for Tablet support
content = content.replace(/lg:grid-cols-12/g, 'md:grid-cols-12');
content = content.replace(/lg:gap-12/g, 'md:gap-8 lg:gap-12');
content = content.replace(/lg:col-span-7/g, 'md:col-span-7');
content = content.replace(/lg:col-span-5/g, 'md:col-span-5');
content = content.replace(/lg:sticky/g, 'md:sticky');
content = content.replace(/lg:top-24/g, 'md:top-24');

// 3. Wrap sections in Accordion Logic
const sections = [
  { id: 1, comment: '{/* Business Info */}', title: '{t("tool.businessInfo")}' },
  { id: 2, comment: '{/* Client Info */}', title: '{t("tool.clientInfo")}' },
  { id: 3, comment: '{/* Invoice Details */}', title: '{t("tool.invoiceDetails")}' },
  { id: 4, comment: '{/* Line Items */}', title: '{t("tool.lineItems")}' },
  { id: 5, comment: '{/* Tax */}', title: 'Tax System' },
  { id: 6, comment: '{/* Notes & Terms */}', title: '{t("tool.notesTerms")}' }
];

sections.forEach(sec => {
  const targetRegex = new RegExp(`(${sec.comment.replace(/[.*+?^$\/{}()|[\\]\\\\]/g, '\\\\$&')}\\s*<div className={cardCls}>\\s*<h3 className="font-semibold text-slate-900 mb-4">.*?<\\/h3>)`);
  content = content.replace(targetRegex, `$1`.replace('<div className={cardCls}>', `<div className={\`\${cardCls} \${activeStep === ${sec.id} ? 'block' : 'hidden md:block'}\`}><StepHeader step={${sec.id}} title={${sec.title}} />`).replace('<h3 className="font-semibold', '<h3 className="hidden md:block font-semibold'));
});

// Add NextButton to end of each section
content = content.replace(/(<\/div>\s*<\/div>\s*{\/\* Client Info \*\/})/g, '  <NextButton step={1} />\n              $1');
content = content.replace(/(<\/div>\s*<\/div>\s*{\/\* Invoice Details \*\/})/g, '  <NextButton step={2} />\n              $1');
content = content.replace(/(<\/div>\s*<\/div>\s*{\/\* Line Items \*\/})/g, '  <NextButton step={3} />\n              $1');
content = content.replace(/(<\/div>\s*{\/\* Tax \*\/})/g, '  <NextButton step={4} />\n              $1');
content = content.replace(/(<\/div>\s*<\/div>\s*{\/\* Notes & Terms \*\/})/g, '  <NextButton step={5} />\n              $1');
content = content.replace(/(<\/div>\s*<\/div>\s*<\/div>\s*<div className="md:col-span-5)/g, '  <NextButton step={6} />\n              $1');

// 4. InputMode decimal and Full Width Buttons
content = content.replace(/type="number"/g, 'type="number" inputMode="decimal"');
content = content.replace(/<button onClick={addItem}\s*className="mt-4 flex items-center/g, '<button onClick={addItem}\n                  className="mt-4 w-full md:w-auto justify-center md:justify-start flex items-center');

// 5. Sticky Mobile Download Bar
const mobileDownloadBar = `
      {/* Mobile Fixed Download Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex gap-3 pb-safe">
        <button
          onClick={getPDFBlob}
          disabled={loading !== null}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-[10px] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading === "pdf" ? <Spinner /> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>}
          {t("tool.downloadPdf")}
        </button>
        <button
          onClick={getPDFBlob}
          disabled={loading !== null}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-[10px] transition-colors flex items-center justify-center disabled:opacity-70 shadow-sm"
          aria-label="Share via WhatsApp"
        >
          {loading === "share" ? <Spinner /> : <WhatsAppIcon />}
        </button>
      </div>`;

content = content.replace('{/* Toast */}', `${mobileDownloadBar}\n\n      {/* Toast */}`);

// 6. Preview Modal / Summary logic on Mobile
const oldPreviewStart = `{/* Preview */}`;
const newPreviewStart = `{/* Preview */}
          {/* Mobile Preview Overlay */}
          {showFullPreview && (
            <div className="md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setShowFullPreview(false)}>
              <div className="bg-white rounded-2xl shadow-xl w-full min-h-[500px] mb-24 relative overflow-hidden" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowFullPreview(false)} className="absolute top-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 z-10">✕</button>
                <div className="transform scale-[0.6] origin-top-left w-[166.66%] p-8">
                  {/* We duplicate the #invoice-preview id content here natively if we want, but simpler to just show the same div */}
                </div>
              </div>
            </div>
          )}`;
// Actually, it's easier to just scale the preview down on mobile, or hide the actual preview div behind a toggle.
// Let's modify the preview wrapper to apply a scale transform on mobile, or just make it a summary.
const scalePreview = `
            {/* Mobile Summary */}
            <div className="md:hidden bg-white rounded-[12px] p-6 shadow-sm border border-slate-200 mb-24">
              <h3 className="font-bold text-slate-900 mb-4">Invoice Summary</h3>
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>{data.toName || "Client"}</span>
                <span>{formatDate(data.invoiceDate, data.dateFormat) || "—"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-slate-900 border-t border-slate-100 pt-4 mt-4">
                <span>{t("tool.total")}</span>
                <span className="text-emerald-600">{fmt(total)}</span>
              </div>
            </div>

            {/* Desktop Full Preview */}
            <div className="hidden md:block">
`;

const previewEnd = `            <p className="text-center text-xs text-slate-400 mt-3">Live preview — updates as you type</p>
          </div>
        </div>`;

const newPreviewEnd = `            <p className="hidden md:block text-center text-xs text-slate-400 mt-3">Live preview — updates as you type</p>
            </div>
          </div>
        </div>`;

content = content.replace('{/* Preview */}', `{/* Preview */}${scalePreview}`);
content = content.replace(previewEnd, newPreviewEnd);

fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('Mobile layout injected');
