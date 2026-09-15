import fs from 'fs';

function updatePage(file, title, desc, h1) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<BaseLayout[\s\S]*?>/, `<BaseLayout\n  title="${title}"\n  description="${desc}"\n>`);
  content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">\n        ${h1}\n      </h1>`);
  fs.writeFileSync(file, content);
}

// 1. Update pages
updatePage('src/pages/index.astro', 
  "Invoice Generator — Free, No Signup, Instant PDF", 
  "Free invoice generator with no signup, no watermarks, no limits. US sales tax fields, WhatsApp sharing, instant PDF download. Create your invoice now.", 
  "Invoice Generator"
);

updatePage('src/pages/free-invoice-generator.astro', 
  "Free Invoice Generator — No Signup Required", 
  "Use this free invoice generator to create professional PDFs instantly. No signup, no watermarks, no limits. Fast, secure, and ready to download or share.", 
  "Free Invoice Generator"
);

updatePage('src/pages/invoice-generator-free.astro', 
  "Invoice Generator Free — Unlimited Invoices", 
  "Looking for an invoice generator free of charge? Create unlimited invoices with our tool. No hidden limits, no paywalls, no watermarks, no signup needed.", 
  "Invoice Generator Free"
);

updatePage('src/pages/online-invoice-generator.astro', 
  "Online Invoice Generator — Create in Browser", 
  "A powerful online invoice generator that works entirely in your browser. Create, preview, and download PDF invoices instantly. No software installation.", 
  "Online Invoice Generator"
);

// 2. Create the new page
let basePage = fs.readFileSync('src/pages/free-invoice-generator.astro', 'utf8');
basePage = basePage.replace(/<BaseLayout[\s\S]*?>/, `<BaseLayout\n  title="Free Online Invoice Generator — No Signup"\n  description="The best free online invoice generator. Create, format, and download beautiful PDF invoices directly from your browser without creating an account."\n  canonical="https://yourdomain.com/free-online-invoice-generator"\n>`);
basePage = basePage.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">\n        Free Online Invoice Generator\n      </h1>`);
fs.writeFileSync('src/pages/free-online-invoice-generator.astro', basePage);

// 3. Update Footer
let footer = fs.readFileSync('src/components/Footer.astro', 'utf8');
footer = footer.replace(/<h3 class="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Tools<\/h3>[\s\S]*?<\/ul>/, `<h3 class="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Tools</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="/" class="hover:text-white transition-colors">invoice generator</a></li>
        <li><a href="/free-invoice-generator" class="hover:text-white transition-colors">free invoice generator</a></li>
        <li><a href="/invoice-generator-free" class="hover:text-white transition-colors">invoice generator free</a></li>
        <li><a href="/online-invoice-generator" class="hover:text-white transition-colors">online invoice generator</a></li>
        <li><a href="/free-online-invoice-generator" class="hover:text-white transition-colors">free online invoice generator</a></li>
      </ul>`);
fs.writeFileSync('src/components/Footer.astro', footer);
console.log("SEO updates complete!");
