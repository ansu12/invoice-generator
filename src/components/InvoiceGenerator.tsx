import SubscribeHook from "./SubscribeHook";
import { useState, useRef, useCallback, useEffect } from "react";
import type { InvoiceData, LineItem } from "../lib/types";
import { CURRENCIES } from "../lib/types";
import { ui, defaultLang } from "../i18n/translations";
import { TAX_SYSTEMS, US_STATES, EU_COUNTRIES, CA_PROVINCES, IN_RATES } from "../lib/taxes";
import { formatDate } from "../lib/date-helper";

// ── Helpers ────────────────────────────────────────────────────────────
const newItem = (): LineItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0,
});

const today = () => new Date().toISOString().split("T")[0]!;
const dueIn30 = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0]!;
};

const getBlankData = (): InvoiceData => ({
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
  fromAddress: "123 Creative Blvd\nSan Francisco, CA 94110",
  fromPhone: "(555) 123-4567",
  fromEIN: "XX-XXXXXXX",
  taxIdLabel: "Tax ID",
  taxId: "",
  logoUrl: "",
  toName: "Sample Client Inc.",
  toEmail: "billing@sampleclient.com",
  toAddress: "456 Market St\nNew York, NY 10001",
  invoiceNumber: "INV-001",
  invoiceDate: today(),
  dueDate: dueIn30(),
  dateFormat: "auto",
  currency: "USD",
  items: [
    { id: crypto.randomUUID(), description: "Website design — homepage", quantity: 1, rate: 1500 },
    { id: crypto.randomUUID(), description: "Logo design", quantity: 1, rate: 500 },
    { id: crypto.randomUUID(), description: "Revisions", quantity: 3, rate: 75 },
  ],
  notes: "Thank you for your business. Payment due within 30 days.",
  paymentTerms: "Net 30",
  taxSystem: "US",
  taxRegion: "California",
  taxLabel: "Sales Tax",
  taxRate: 7.25,
});

// ── Toast ─────────────────────────────────────────────────────────────
interface ToastState { msg: string; type: "error" | "success" }

function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-[12px] shadow-lg text-sm font-medium text-white transition-all ${
        toast.type === "error" ? "bg-red-500" : "bg-emerald-600"
      }`}
    >
      {toast.type === "error" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      )}
      <span>{toast.msg}</span>
      <button onClick={onDismiss} aria-label="Dismiss" className="ml-2 opacity-70 hover:opacity-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────
interface ComponentProps {
  initialData?: Partial<InvoiceData>;
  lang?: string;
}


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

export default function InvoiceGenerator({ lang = defaultLang, initialData }: { lang?: string; initialData?: Partial<InvoiceData> }) {
  const t = (key: keyof typeof ui["en"]) => (ui as any)[lang]?.[key] || (ui as any)[defaultLang][key];
  
  useEffect(() => {
    const handleSample = () => {
      setData({
        fromName: "Acme Web Design",
        fromEmail: "hello@acmeweb.com",
        fromAddress: "123 Tech Lane\nSan Francisco, CA 94105",
        fromPhone: "(555) 123-4567",
        fromEIN: "XX-XXXXXXX",
        logoUrl: "https://www.w3.org/Icons/w3c_home",
        toName: "Globex Corporation",
        toEmail: "billing@globex.com",
        toAddress: "456 Corporate Blvd\nNew York, NY 10001",
        invoiceNumber: "INV-2026",
        invoiceDate: today(),
        dueDate: dueIn30(),
        dateFormat: "auto",
        currency: "USD",
        taxRate: 8.5,
        notes: "Thank you for your business! Please make payment within 30 days.",
        items: [
          { id: crypto.randomUUID(), description: "Website Redesign", quantity: 1, rate: 3500 },
          { id: crypto.randomUUID(), description: "Monthly SEO Retainer", quantity: 1, rate: 850 },
          { id: crypto.randomUUID(), description: "Hosting (Annual)", quantity: 12, rate: 25 }
        ]
      });
      // Scroll to tool
      document.getElementById('invoice-tool')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('fill-sample-invoice', handleSample);
    return () => window.removeEventListener('fill-sample-invoice', handleSample);
  }, []);

  const [data, setData] = useState<InvoiceData>(() => {
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
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('invoicegen_data', JSON.stringify(data));
    }
  }, [data]);

  const [toast, setToast] = useState<ToastState | null>(null);

  const activeTaxSystem = TAX_SYSTEMS.find(ts => ts.id === data.taxSystem) || TAX_SYSTEMS[0];
  const activeTaxLabel = activeTaxSystem.label;

  const [loading, setLoading] = useState<"pdf" | "share" | null>(null);
  const [activeStep, setActiveStep] = useState(1);

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
    showToast("Template loaded! Edit any field to customize.", "success");
    setActiveStep(4); // Open line items so they see the change
  };
  const [showFullPreview, setShowFullPreview] = useState(false);

  const StepHeader = ({ step, title }: { step: number, title: string }) => {
    const isActive = activeStep === step;
    const isCompleted = activeStep > step;
    return (
      <div 
        className={`md:hidden flex items-center justify-between pb-3 mb-4 border-b cursor-pointer ${isActive ? 'border-blue-500' : 'border-slate-100'}`}
        onClick={() => setActiveStep(isActive ? 0 : step)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
            {isCompleted ? '✓' : step}
          </div>
          <h3 className={`font-semibold ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>{title}</h3>
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
  );
  const previewRef = useRef<HTMLDivElement>(null);

  const sym = CURRENCIES.find((c) => c.code === data.currency)?.symbol ?? "$";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currency || "USD",
    }).format(n);

  const subtotal = data.items.reduce((s, i) => s + i.quantity * i.rate, 0);
  const taxAmt = subtotal * (data.taxRate / 100);
  const total = subtotal + taxAmt;

  // ── State helpers ──────────────────────────────────────────────────
  const set = useCallback(<K extends keyof InvoiceData>(k: K, v: InvoiceData[K]) => {
    setData((p) => ({ ...p, [k]: v }));
  }, []);

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setData((p) => ({
      ...p,
      items: p.items.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }));
  };

  const addItem = () => setData((p) => ({ ...p, items: [...p.items, newItem()] }));
  const removeItem = (id: string) =>
    setData((p) => ({ ...p, items: p.items.filter((it) => it.id !== id) }));

  const showToast = (msg: string, type: ToastState["type"] = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4500);
  };

  // ── Logo upload ────────────────────────────────────────────────────
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("Logo must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => set("logoUrl", (ev.target?.result as string) ?? "");
    reader.readAsDataURL(file);
  };

  // ── PDF generation helper ──────────────────────────────────────────
  const getPDFBlob = async (): Promise<{ blob: Blob; filename: string }> => {
    const { generateInvoicePDF } = await import("../lib/pdf-generator");
    return generateInvoicePDF(data, lang);
  };

  // ── Download PDF ───────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    setLoading("pdf");
    try {
      const { blob, filename } = await getPDFBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Invoice downloaded!", "success");
    } catch (err) {
      console.error(err);
      showToast("PDF generation failed. Please try Print instead.");
    } finally {
      setLoading(null);
    }
  };

  // ── WhatsApp share ─────────────────────────────────────────────────
  const handleWhatsAppShare = async () => {
    setLoading("share");
    try {
      const { blob, filename } = await getPDFBlob();
      const file = new File([blob], filename, { type: "application/pdf" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Invoice ${data.invoiceNumber}`,
          text: `Here is your invoice #${data.invoiceNumber}.`,
        });
      } else {
        // Fallback: download PDF then open WhatsApp
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        const text = encodeURIComponent(
          `Hi, please find your invoice #${data.invoiceNumber} attached. Total: ${fmt(total)}`
        );
        window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
        showToast("PDF downloaded. Opening WhatsApp...", "success");
      }
    } catch (err: unknown) {
      const isAbort =
        err instanceof Error && err.name === "AbortError";
      if (!isAbort) {
        console.error(err);
        showToast("Share failed. PDF has been downloaded as fallback.");
      }
    } finally {
      setLoading(null);
    }
  };

  // ── Print ──────────────────────────────────────────────────────────
  const handlePrint = () => window.print();

  // ── Shared class strings ───────────────────────────────────────────
  const inputCls =
    "w-full bg-white border border-slate-200 rounded-[10px] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors";
  const labelCls = "block text-sm font-semibold text-slate-700 mb-1.5";
  const cardCls =
    "bg-white rounded-[16px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-6";

  return (
    <section id="invoice-tool" className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-start">

          {/* ── LEFT: FORM ─────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Your Details */}
            <div className={cardCls}>
              <StepHeader step={1} title="Your Business" />
              <div className={activeStep === 1 ? "md:block" : "hidden md:block"}>

              {/* Logo upload */}
              <div className="mb-4">
                <label className={labelCls}>Business Logo</label>
                <div className="flex items-center gap-3">
                  {data.logoUrl && (
                    <img
                      src={data.logoUrl}
                      alt="Logo preview"
                      className="h-12 w-auto max-w-[120px] object-contain rounded-lg border border-slate-200"
                    />
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-[10px] transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    {data.logoUrl ? "Change Logo" : "Upload Logo"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="sr-only"
                      onChange={handleLogoUpload}
                    />
                  </label>
                  {data.logoUrl && (
                    <button
                      onClick={() => set("logoUrl", "")}
                      className="text-slate-400 hover:text-red-500 transition-colors text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1.5">PNG, JPEG or WebP, max 2 MB</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Business / Name</label>
                  <input className={inputCls} placeholder="Acme Inc." value={data.fromName}
                    onChange={(e) => set("fromName", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Email</label>
                    <input className={inputCls} type="email" placeholder="you@example.com" value={data.fromEmail}
                      onChange={(e) => set("fromEmail", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input className={inputCls} type="tel" placeholder="+1 (555) 000-0000" value={data.fromPhone}
                      onChange={(e) => set("fromPhone", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Address</label>
                  <textarea className={`${inputCls} resize-none`} rows={2} placeholder="123 Main St, City, Country"
                    value={data.fromAddress} onChange={(e) => set("fromAddress", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>EIN / Tax ID <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input className={inputCls} placeholder="12-3456789" value={data.fromEIN}
                    onChange={(e) => set("fromEIN", e.target.value)} />
                </div>
              </div>
              <NextButton step={1} />
              </div>
            </div>

            {/* Bill To */}
            <div className={cardCls}>
              <StepHeader step={2} title="Client" />
              <div className={activeStep === 2 ? "md:block" : "hidden md:block"}>
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Client Name / Company</label>
                  <input className={inputCls} placeholder="Client Corp." value={data.toName}
                    onChange={(e) => set("toName", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Client Email</label>
                  <input className={inputCls} type="email" placeholder="client@example.com" value={data.toEmail}
                    onChange={(e) => set("toEmail", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Client Address</label>
                  <textarea className={`${inputCls} resize-none`} rows={2} placeholder="456 Client Ave, City"
                    value={data.toAddress} onChange={(e) => set("toAddress", e.target.value)} />
                </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className={cardCls}>
              <StepHeader step={3} title="Invoice Details" />
              <div className={activeStep === 3 ? "md:block" : "hidden md:block"}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>{t("tool.invoiceNum")}</label>
                  <input className={inputCls} value={data.invoiceNumber}
                    onChange={(e) => set("invoiceNumber", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>{t("tool.currency")}</label>
                  <select className={inputCls} value={data.currency} onChange={(e) => set("currency", e.target.value)}>
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>{t("tool.date")}</label>
                  <input className={inputCls} type="date" value={data.invoiceDate}
                    onChange={(e) => set("invoiceDate", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>{t("tool.dueDate")}</label>
                  <input className={inputCls} type="date" value={data.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)} />
                </div>
              </div>
              <NextButton step={3} />
              </div>
            </div>

            {/* Line Items */}
            <div className={cardCls}>
              <StepHeader step={4} title="Line Items" />
              <div className={activeStep === 4 ? "md:block" : "hidden md:block"}>
              <div className="space-y-3">
                <div className="grid grid-cols-[1fr_72px_96px_36px] gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
                  <span>{t("tool.desc")}</span>
                  <span className="text-center">{t("tool.qty")}</span>
                  <span className="text-right">{t("tool.rate")}</span>
                  <span />
                </div>
                {data.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1fr_72px_96px_36px] gap-2 items-center">
                    <input className={inputCls} placeholder="Service or product"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)} />
                    <input className={`${inputCls} text-center`} type="number" inputMode="decimal" min="0" step="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)} />
                    <input className={`${inputCls} text-right`} type="number" inputMode="decimal" min="0" step="0.01"
                      placeholder="0.00" value={item.rate || ""}
                      onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)} />
                    <button onClick={() => removeItem(item.id)} disabled={data.items.length === 1}
                      aria-label="Remove line item"
                      className="text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors p-1 rounded-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={addItem}
                  className="mt-4 w-full md:w-auto justify-center md:justify-start flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                Add Line Item
              </button>

              {/* Tax */}
              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{t("tool.taxRate")}</label>
                <input className={`${inputCls} w-28`} type="number" inputMode="decimal" min="0" max="100" step="0.5"
                  value={data.taxRate || ""} placeholder="0"
                  onChange={(e) => set("taxRate", parseFloat(e.target.value) || 0)} />
                <NextButton step={4} />
              </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className={cardCls}>
              <StepHeader step={5} title="Notes & Terms" />
              <div className={activeStep === 5 ? "md:block" : "hidden md:block"}>
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>{t("tool.paymentTerms")}</label>
                  <input className={inputCls} placeholder="Net 30" value={data.paymentTerms}
                    onChange={(e) => set("paymentTerms", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>{t("tool.notes")}</label>
                  <textarea className={`${inputCls} resize-none`} rows={3}
                    placeholder="Thank you for your business!"
                    value={data.notes} onChange={(e) => set("notes", e.target.value)} />
                </div>
              </div>
              <NextButton step={5} />
              </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="space-y-3">
              {/* Primary: Download PDF */}
              <button onClick={handleDownloadPDF} disabled={loading !== null}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-4 rounded-[10px] transition-colors shadow-[0_4px_16px_rgba(37,99,235,0.30)] flex items-center justify-center gap-2 text-base">
                {loading === "pdf" ? (
                  <><Spinner /> Generating PDF…</>
                ) : (
                  <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Download PDF</>
                )}
              </button>

              {/* Secondary row */}
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp */}
                <button onClick={handleWhatsAppShare} disabled={loading !== null}
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22be5c] disabled:opacity-60 text-white font-semibold py-3.5 rounded-[10px] transition-colors text-sm">
                  {loading === "share" ? (
                    <><Spinner size={16} /> Sharing…</>
                  ) : (
                    <><WhatsAppIcon /> Share via WhatsApp</>
                  )}
                </button>

                {/* Print */}
                <button onClick={handlePrint} disabled={loading !== null}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 disabled:opacity-60 text-slate-800 font-semibold py-3.5 rounded-[10px] border border-slate-200 hover:border-slate-300 transition-colors text-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                  Print Invoice
                </button>
              </div>
            </div>

          </div>{/* end LEFT */}

          {/* ── RIGHT: LIVE PREVIEW ────────────────────────────────── */}
          <div className="md:sticky md:top-24">
            <div className="bg-slate-200 rounded-[16px] p-4 overflow-auto max-h-[88vh] min-h-[800px]">
              <div
                id="invoice-preview"
                ref={previewRef}
                className="bg-white rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-10 min-w-[540px]"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                  <div className="max-w-[55%]">
                    {data.logoUrl && (
                      <img src={data.logoUrl} alt="Business logo" width="160" height="48"
                        className="h-12 w-auto max-w-[160px] object-contain mb-3" />
                    )}
                    <p className="font-bold text-slate-900 text-lg leading-tight">
                      {data.fromName || "Your Business"}
                    </p>
                    {data.fromEmail && <p className="text-slate-500 text-sm">{data.fromEmail}</p>}
                    {data.fromPhone && <p className="text-slate-500 text-sm">{data.fromPhone}</p>}
                    {data.fromAddress && (
                      <p className="text-slate-500 text-sm whitespace-pre-line">{data.fromAddress}</p>
                    )}
                    {data.fromEIN && activeTaxSystem.idLabel === "EIN" && (
                      <p className="text-slate-500 text-sm">EIN: {data.fromEIN}</p>
                    )}
                    {data.taxId && activeTaxSystem.idLabel !== "EIN" && (
                      <p className="text-slate-500 text-sm">{activeTaxSystem.idLabel}: {data.taxId}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">{t("pdf.invoice")}</h1>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-slate-400 text-xs uppercase tracking-wider">{t("tool.invoiceNum")}</span><br />
                        <span className="font-semibold text-slate-900">{data.invoiceNumber}</span></p>
                      <p className="mt-2"><span className="text-slate-400 text-xs uppercase tracking-wider">Date</span><br />
                        <span className="text-slate-700">{formatDate(data.invoiceDate, data.dateFormat) || "—"}</span></p>
                      <p className="mt-2"><span className="text-slate-400 text-xs uppercase tracking-wider">{t("tool.dueDate")}</span><br />
                        <span className="font-semibold text-slate-900">{formatDate(data.dueDate, data.dateFormat) || "—"}</span></p>
                      {data.paymentTerms && (
                        <p className="mt-2"><span className="text-slate-400 text-xs uppercase tracking-wider">Terms</span><br />
                          <span className="text-slate-700">{data.paymentTerms}</span></p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bill To */}
                <div className="mb-8 pb-6 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t("tool.billTo")}</p>
                  <p className="font-semibold text-slate-900">{data.toName || "Client Name"}</p>
                  {data.toEmail && <p className="text-slate-500 text-sm">{data.toEmail}</p>}
                  {data.toAddress && (
                    <p className="text-slate-500 text-sm whitespace-pre-line">{data.toAddress}</p>
                  )}
                </div>

                {/* Line Items Table */}
                <div className="border border-slate-200 rounded-[10px] overflow-hidden mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "#1a1a2e" }}>
                        <th className="text-left px-4 py-3 font-semibold text-white w-1/2">{t("tool.desc")}</th>
                        <th className="text-center px-4 py-3 font-semibold text-white">{t("tool.qty")}</th>
                        <th className="text-right px-4 py-3 font-semibold text-white">{t("tool.rate")}</th>
                        <th className="text-right px-4 py-3 font-semibold text-white">{t("tool.amount")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.map((item, idx) => (
                        <tr key={item.id} style={{ backgroundColor: idx % 2 !== 0 ? "#f9fafb" : "white" }}>
                          <td className="px-4 py-3 text-slate-800">{item.description || "—"}</td>
                          <td className="px-4 py-3 text-center text-slate-600">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{fmt(item.rate)}</td>
                          <td className="px-4 py-3 text-right font-medium text-slate-900">{fmt(item.quantity * item.rate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>{t("tool.subtotal")}</span>
                      <span>{fmt(subtotal)}</span>
                    </div>
                    {data.taxRate > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>{data.taxLabel || t("tool.tax")} ({data.taxRate}%)</span>
                        <span>{fmt(taxAmt)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-base border-t border-slate-200 pt-2 mt-2">
                      <span className="text-slate-900">{t("tool.total")}</span>
                      <span className="text-emerald-600">{fmt(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {data.notes && (
                  <div className="border-t border-slate-100 pt-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t("tool.notes")}</p>
                    <p className="text-slate-500 text-sm whitespace-pre-line">{data.notes}</p>
                  </div>
                )}
              </div>{/* end #invoice-preview */}
            </div>
            <p className="text-center text-xs text-slate-400 mt-3">Live preview - updates as you type</p>
              <SubscribeHook />
          </div>

        </div>
      </div>

      
      {/* Mobile Fixed Download Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex gap-3 pb-safe">
        <button
          onClick={handleDownloadPDF}
          disabled={loading !== null}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-[10px] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading === "pdf" ? <Spinner /> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>}
          {t("tool.downloadPdf")}
        </button>
        <button
          onClick={handleWhatsAppShare}
          disabled={loading !== null}
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-[10px] transition-colors flex items-center justify-center disabled:opacity-70 shadow-sm"
          aria-label="Share via WhatsApp"
        >
          {loading === "share" ? <Spinner /> : <WhatsAppIcon />}
        </button>
      </div>

      {/* Toast */}
      {toast && <Toast toast={toast} onDismiss={() => setToast(null)} />}
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────
function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
