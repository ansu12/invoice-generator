export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  // Sender
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromPhone: string;
  fromEIN: string;
  logoUrl: string;
  // Client
  toName: string;
  toEmail: string;
  toAddress: string;
  // Invoice meta
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  // Line items
  items: LineItem[];
  // Footer
  notes: string;
  paymentTerms: string;
  taxRate: number;
}

export const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '\u20ac' },
  { code: 'GBP', symbol: '\u00a3' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'INR', symbol: '\u20b9' },
];
