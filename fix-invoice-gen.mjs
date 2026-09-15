import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

if (!content.includes('fill-sample-invoice')) {
  // Add useEffect import if not present
  if (!content.includes('useEffect')) {
    content = content.replace('useState, useRef, useCallback', 'useState, useRef, useCallback, useEffect');
  }

  const sampleDataEffect = `
  useEffect(() => {
    const handleSample = () => {
      setData({
        fromName: "Acme Web Design",
        fromEmail: "hello@acmeweb.com",
        fromAddress: "123 Tech Lane\\nSan Francisco, CA 94105",
        fromPhone: "(555) 123-4567",
        fromEIN: "XX-XXXXXXX",
        logoUrl: "https://www.w3.org/Icons/w3c_home",
        toName: "Globex Corporation",
        toEmail: "billing@globex.com",
        toAddress: "456 Corporate Blvd\\nNew York, NY 10001",
        invoiceNumber: "INV-2026",
        date: today(),
        dueDate: dueIn30(),
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
`;
  
  content = content.replace('const [data, setData] = useState<InvoiceData>(() => {', sampleDataEffect + '\n  const [data, setData] = useState<InvoiceData>(() => {');
  fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
  console.log('InvoiceGenerator patched with sample data listener.');
}
