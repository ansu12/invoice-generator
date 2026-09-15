import type { InvoiceData } from './types';
import { CURRENCIES } from './types';

// ── Page constants (US Letter, inches) ─────────────────────────────────
const MARGIN = 0.75;
const PAGE_W = 8.5;
const CONTENT_W = PAGE_W - MARGIN * 2; // 7"
const RIGHT_X = PAGE_W - MARGIN;        // 7.75"

// ── Helpers ─────────────────────────────────────────────────────────────
function sanitizeFilename(s: string): string {
  return s.replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function getImageDimensions(dataUrl: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
}

function detectImgFormat(dataUrl: string): string {
  if (dataUrl.startsWith('data:image/png')) return 'PNG';
  if (dataUrl.startsWith('data:image/webp')) return 'WEBP';
  return 'JPEG';
}

// ── Main export ─────────────────────────────────────────────────────────
export async function generateInvoicePDF(
  data: InvoiceData
): Promise<{ blob: Blob; filename: string }> {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');
  const doc = new jsPDF({ unit: 'in', format: 'letter' });

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency || 'USD',
    }).format(n);

  let y = MARGIN;

  // ── LEFT: Business Info ────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(data.fromName || 'Your Business', MARGIN, y);
  y += 0.25;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);

  const fromLines: string[] = [
    ...(data.fromAddress ? data.fromAddress.split('\n') : []),
    data.fromEmail,
    data.fromPhone,
    data.fromEIN ? `EIN: ${data.fromEIN}` : '',
  ].filter(Boolean) as string[];

  for (const line of fromLines) {
    doc.text(line, MARGIN, y);
    y += 0.18;
  }

  // ── RIGHT: Logo + INVOICE title + Meta ────────────────────────────────
  let rightY = MARGIN;

  // Logo (top-right, max 1" tall)
  if (data.logoUrl) {
    try {
      const { w, h } = await getImageDimensions(data.logoUrl);
      const logoH = Math.min(1.0, h / 96);
      const logoW = logoH * (w / h);
      doc.addImage(
        data.logoUrl,
        detectImgFormat(data.logoUrl),
        RIGHT_X - logoW,
        rightY,
        logoW,
        logoH
      );
      rightY += logoH + 0.15;
    } catch {
      // Logo failed silently — continue without it
    }
  }

  // "INVOICE" heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text('INVOICE', RIGHT_X, rightY, { align: 'right' });
  rightY += 0.4;

  // Invoice metadata (right-aligned)
  const metaRows: [string, string][] = [
    ['Invoice #', data.invoiceNumber || '\u2014'],
    ['Date', data.invoiceDate || '\u2014'],
    ['Due Date', data.dueDate || '\u2014'],
    ...(data.paymentTerms ? [['Terms', data.paymentTerms] as [string, string]] : []),
  ];

  const metaLabelX = RIGHT_X - 1.3;
  for (const [label, value] of metaRows) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`${label}:`, metaLabelX, rightY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(value, RIGHT_X, rightY, { align: 'right' });
    rightY += 0.19;
  }

  // Advance y past the taller column
  y = Math.max(y, rightY) + 0.25;

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.008);
  doc.line(MARGIN, y, RIGHT_X, y);
  y += 0.3;

  // ── BILL TO ────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('BILL TO', MARGIN, y);
  y += 0.18;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(data.toName || 'Client Name', MARGIN, y);
  y += 0.21;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  const toLines: string[] = [
    data.toEmail,
    ...(data.toAddress ? data.toAddress.split('\n') : []),
  ].filter(Boolean) as string[];

  for (const line of toLines) {
    doc.text(line, MARGIN, y);
    y += 0.18;
  }

  y += 0.3;

  // ── LINE ITEMS TABLE ───────────────────────────────────────────────────
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [['Description', 'Qty', 'Rate', 'Amount']],
    body: data.items.map((item) => [
      item.description || '\u2014',
      String(item.quantity),
      fmt(item.rate),
      fmt(item.quantity * item.rate),
    ]),
    headStyles: {
      fillColor: [26, 26, 46],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: { top: 0.1, bottom: 0.1, left: 0.12, right: 0.12 },
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [15, 23, 42],
      cellPadding: { top: 0.09, bottom: 0.09, left: 0.12, right: 0.12 },
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 0.55, halign: 'center' },
      2: { cellWidth: 1.05, halign: 'right' },
      3: { cellWidth: 1.05, halign: 'right' },
    },
    styles: {
      lineColor: [226, 232, 240],
      lineWidth: 0.005,
    },
    theme: 'grid',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 0.35;

  // ── TOTALS (right-aligned) ─────────────────────────────────────────────
  const subtotal = data.items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const taxAmt = subtotal * (data.taxRate / 100);
  const total = subtotal + taxAmt;

  const tLabelX = RIGHT_X - 1.55;

  const renderTotalRow = (
    label: string,
    value: string,
    bold = false,
    color: [number, number, number] = [15, 23, 42]
  ) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(bold ? 11 : 9);
    doc.setTextColor(100, 116, 139);
    doc.text(label, tLabelX, y);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(...color);
    doc.text(value, RIGHT_X, y, { align: 'right' });
    y += bold ? 0.26 : 0.22;
  };

  renderTotalRow('Subtotal', fmt(subtotal));
  if (data.taxRate > 0) {
    renderTotalRow(`Sales Tax (${data.taxRate}%)`, fmt(taxAmt));
  }

  // Divider before total
  doc.setDrawColor(226, 232, 240);
  doc.line(tLabelX, y - 0.06, RIGHT_X, y - 0.06);

  renderTotalRow('Total', fmt(total), true, [16, 185, 129]);

  // ── NOTES ──────────────────────────────────────────────────────────────
  if (data.paymentTerms || data.notes) {
    y += 0.1;
    doc.setDrawColor(226, 232, 240);
    doc.line(MARGIN, y, RIGHT_X, y);
    y += 0.22;

    if (data.paymentTerms) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('PAYMENT TERMS', MARGIN, y);
      y += 0.17;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(data.paymentTerms, MARGIN, y);
      y += 0.28;
    }

    if (data.notes) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('NOTES', MARGIN, y);
      y += 0.17;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      const lines = doc.splitTextToSize(data.notes, CONTENT_W);
      doc.text(lines, MARGIN, y);
    }
  }

  // ── Output ─────────────────────────────────────────────────────────────
  const blob = doc.output('blob');
  const filename = `invoice-${sanitizeFilename(data.invoiceNumber || 'draft')}-${sanitizeFilename(data.toName || 'client')}.pdf`;

  return { blob, filename };
}
