import fs from 'fs';
let code = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

// BUG 1: Toast called with wrong property name {message:} should be {msg:}
code = code.replace(
  `setToast({ message: "Template loaded. Edit any field to customize.", type: "success" });`,
  `showToast("Template loaded! Edit any field to customize.", "success");`
);

// BUG 2: Mobile sticky bar Download button calls getPDFBlob instead of handleDownloadPDF
code = code.replace(
  `      onClick={getPDFBlob}\n          disabled={loading !== null}\n          className="flex-1 bg-blue-600`,
  `      onClick={handleDownloadPDF}\n          disabled={loading !== null}\n          className="flex-1 bg-blue-600`
);

// BUG 3: Mobile sticky bar WhatsApp button calls getPDFBlob instead of handleWhatsAppShare
code = code.replace(
  `      onClick={getPDFBlob}\n          disabled={loading !== null}\n          className="bg-[#25D366]`,
  `      onClick={handleWhatsAppShare}\n          disabled={loading !== null}\n          className="bg-[#25D366]`
);

// BUG 4: NextButton for step 3 is INSIDE the grid div — move it outside
// The grid div wraps invoice number, currency, dates. NextButton should be after the closing </div> of grid
code = code.replace(
  `                <NextButton step={3} />\n              </div>\n            </div>\n\n            {/* Line Items */}`,
  `              </div>\n              <NextButton step={3} />\n            </div>\n\n            {/* Line Items */}`
);

// BUG 5: The sections have no accordion logic — StepHeader is defined but never rendered.
// Wrap each card section with accordion on mobile.

// Wrap "Your Details" section
code = code.replace(
  `            {/* Your Details */}\n            <div className={cardCls}>\n              <h3 className="font-semibold text-slate-900 mb-4">Your Details</h3>`,
  `            {/* Your Details */}\n            <div className={cardCls}>\n              <StepHeader step={1} title="Your Business" />\n              <div className={activeStep === 1 ? "md:block" : "hidden md:block"}>`
);
// Close the wrapper before "Bill To"
code = code.replace(
  `            </div>\n\n            {/* Bill To */}`,
  `              <NextButton step={1} />\n              </div>\n            </div>\n\n            {/* Bill To */}`
);

// Wrap "Bill To" section
code = code.replace(
  `            {/* Bill To */}\n            <div className={cardCls}>\n              <h3 className="font-semibold text-slate-900 mb-4">{t("tool.billTo")}</h3>\n              <div className="space-y-3">`,
  `            {/* Bill To */}\n            <div className={cardCls}>\n              <StepHeader step={2} title="Client" />\n              <div className={activeStep === 2 ? "md:block" : "hidden md:block"}>\n              <div className="space-y-3">`
);
// Fix the Bill To NextButton position - it currently has a NextButton step={2} inside space-y-3
// Remove the existing NextButton inside BillTo and close the extra wrapper
code = code.replace(
  `                <NextButton step={2} />\n              </div>\n            </div>\n\n            {/* Invoice Details */}`,
  `                </div>\n              </div>\n            </div>\n\n            {/* Invoice Details */}`
);

// Wrap "Invoice Details" section
code = code.replace(
  `            {/* Invoice Details */}\n            <div className={cardCls}>\n              <h3 className="font-semibold text-slate-900 mb-4">{t("tool.invoiceDetails")}</h3>\n              <div className="grid grid-cols-2 gap-3">`,
  `            {/* Invoice Details */}\n            <div className={cardCls}>\n              <StepHeader step={3} title="Invoice Details" />\n              <div className={activeStep === 3 ? "md:block" : "hidden md:block"}>\n              <div className="grid grid-cols-2 gap-3">`
);
// Close wrapper after NextButton step 3
code = code.replace(
  `              </div>\n              <NextButton step={3} />\n            </div>\n\n            {/* Line Items */}`,
  `              </div>\n              <NextButton step={3} />\n              </div>\n            </div>\n\n            {/* Line Items */}`
);

// Wrap "Line Items" section
code = code.replace(
  `            {/* Line Items */}\n            <div className={cardCls}>\n              <h3 className="font-semibold text-slate-900 mb-4">{t("tool.lineItems")}</h3>`,
  `            {/* Line Items */}\n            <div className={cardCls}>\n              <StepHeader step={4} title="Line Items" />\n              <div className={activeStep === 4 ? "md:block" : "hidden md:block"}>`
);
// Close after Tax / NextButton step 5
code = code.replace(
  `                <NextButton step={5} />\n              </div>\n            </div>\n\n            {/* Notes & Terms */}`,
  `                <NextButton step={4} />\n              </div>\n              </div>\n            </div>\n\n            {/* Notes & Terms */}`
);

// Wrap "Notes & Terms" section
code = code.replace(
  `            {/* Notes & Terms */}\n            <div className={cardCls}>\n              <h3 className="font-semibold text-slate-900 mb-4">{t("tool.notesTerms")}</h3>\n              <div className="space-y-3">`,
  `            {/* Notes & Terms */}\n            <div className={cardCls}>\n              <StepHeader step={5} title="Notes & Terms" />\n              <div className={activeStep === 5 ? "md:block" : "hidden md:block"}>\n              <div className="space-y-3">`
);
// Close after the notes textarea
code = code.replace(
  `              </div>\n            </div>\n\n            {/* ── Action Buttons ── */}`,
  `              </div>\n              <NextButton step={5} />\n              </div>\n            </div>\n\n            {/* ── Action Buttons ── */}`
);

fs.writeFileSync('src/components/InvoiceGenerator.tsx', code);
console.log('All bugs fixed!');
