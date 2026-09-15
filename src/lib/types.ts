export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromPhone: string;
  fromEIN: string;
  taxIdLabel: string;
  taxId: string;
  logoUrl: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  dateFormat: string;
  currency: string;
  items: LineItem[];
  notes: string;
  paymentTerms: string;
  taxSystem: string;
  taxRegion: string;
  taxLabel: string;
  taxRate: number;
  activeTemplate?: string;
}

export const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AED', symbol: 'د.إ' },
  { code: 'SGD', symbol: 'S$' },
  { code: 'ZAR', symbol: 'R' }
];
