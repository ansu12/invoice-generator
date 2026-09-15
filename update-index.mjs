import fs from 'fs';
let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// 1. ADD ORGANIZATION SCHEMA
const orgSchema = `
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InvoiceGen",
    "url": "https://invoice-generator.pages.dev",
    "description": "Free online invoice generator with no signup required.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@invoicegen.com"
    }
  }
`;

if (!content.includes('Organization')) {
  // Insert it into the schemas array
  content = content.replace('const schemas = [\n  {', `const schemas = [\n  ${orgSchema},\n  {`);
}

// 2. ADD TRUST BADGES
const trustBadges = `
      <div class="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          No signup required
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          No watermarks
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          Your data never leaves your browser
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          Unlimited invoices
        </div>
      </div>
`;

if (!content.includes('Your data never leaves your browser')) {
  content = content.replace('Browse Templates</a>\n      </div>', `Browse Templates</a>\n      </div>\n${trustBadges}`);
}

fs.writeFileSync('src/pages/index.astro', content);
console.log('Index updated!');
