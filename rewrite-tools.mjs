import fs from 'fs';
import path from 'path';

const toolPages = [
  'index.astro',
  'free-invoice-generator.astro',
  'invoice-generator-free.astro',
  'online-invoice-generator.astro',
  'free-online-invoice-generator.astro',
  'ai-invoice-generator.astro',
  'paypal-invoice-generator.astro',
  'invoice-generator-online.astro',
  'invoice-template.astro'
];

toolPages.forEach(file => {
  const filepath = path.join('src/pages', file);
  if (!fs.existsSync(filepath)) return;
  
  let h1 = "";
  let sub = "";
  let cta = "";
  
  if (file === 'index.astro') {
    h1 = "Create a professional invoice in 30 seconds.";
    sub = "No signup. Free forever. Works on your phone.";
    cta = "Create My Invoice";
  } else {
    // Generate action from filename
    let name = file.replace('.astro', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    h1 = `Generate ${name}s in 30 seconds. No signup. Free forever.`;
    sub = "Works on your phone. No account needed.";
    cta = `Generate ${name}s Now`;
  }
  
  const trustLine = "No account. No watermark. Your data stays in your browser.";
  
  const content = `---
import BaseLayout from "../layouts/BaseLayout.astro";
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
import InvoiceGenerator from "../components/InvoiceGenerator";
---

<BaseLayout title="Free Invoice Generator" description="Create professional invoices in seconds. No signup required.">
  <Navbar />
  
  <!-- HERO SECTION AT TOP -->
  <header class="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto">
    <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">${h1}</h1>
    <p class="text-xl text-slate-600 mb-8 font-medium">${sub}</p>
    
    <div class="mb-4">
      <a href="#invoice-generator" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto min-h-[44px]">
        ${cta}
      </a>
    </div>
    
    <p class="text-sm text-slate-500 font-medium flex items-center justify-center gap-1.5 flex-wrap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      ${trustLine}
    </p>
  </header>

  <!-- HOW IT WORKS SECTION -->
  <section class="max-w-4xl mx-auto px-6 mb-16">
    <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
      <h2 class="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider text-center">How it works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col items-center text-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg">1</div>
          <h3 class="font-bold text-slate-900">Enter your business and client details.</h3>
        </div>
        <div class="flex flex-col items-center text-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg">2</div>
          <h3 class="font-bold text-slate-900">Add line items and tax.</h3>
        </div>
        <div class="flex flex-col items-center text-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg">3</div>
          <h3 class="font-bold text-slate-900">Download your PDF invoice.</h3>
        </div>
      </div>
    </div>
  </section>

  <div id="invoice-generator" class="w-full">
    <InvoiceGenerator client:load />
  </div>

  <Footer />
</BaseLayout>
`;
  
  fs.writeFileSync(filepath, content);
  console.log(`Rewrote ${file}`);
});
