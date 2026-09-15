import fs from 'fs';
let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// 1. Add Trust Bar below Hero (before <InvoiceGenerator />)
const trustBar = `
    <!-- Trust Bar -->
    <div class="max-w-5xl mx-auto px-6 mb-12">
      <p class="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Trusted by freelancers, contractors, and small businesses worldwide</p>
      <div class="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-700">
        <span class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">🔒 Your data never leaves your browser</span>
        <span class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100"><span class="text-emerald-500">✓</span> No signup, no email, no account</span>
        <span class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100"><span class="text-emerald-500">✓</span> No watermarks on PDFs</span>
        <span class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100"><span class="text-emerald-500">✓</span> Unlimited invoices, forever free</span>
      </div>
    </div>
    <InvoiceGenerator`;

content = content.replace('<InvoiceGenerator', trustBar);

// 2. Add "How it works" and "Why this tool exists" and "Privacy Promise" BELOW the tool
const belowToolSections = `
    <!-- Trust & How it works sections -->
    <section class="py-20 bg-slate-50 mt-12 border-t border-slate-100">
      <div class="max-w-5xl mx-auto px-6">
        
        <div class="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-8">How it works</h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Enter your details</h3>
                  <p class="text-slate-600 text-sm">Fill in the form with your business information, client details, and line items.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Preview instantly</h3>
                  <p class="text-slate-600 text-sm">See your professional invoice update live as you type. What you see is what you get.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 class="font-bold text-slate-900 mb-1">Download or share</h3>
                  <p class="text-slate-600 text-sm">Get your crisp PDF instantly or send it directly to your client via WhatsApp.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Why this tool exists</h2>
            <p class="text-slate-600 italic leading-relaxed mb-4">"I built this because every 'free' invoice tool either watermarked my PDF, capped me at 3 invoices, or demanded my email. This one doesn't."</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">IG</div>
              <div>
                <p class="font-bold text-slate-900 text-sm">The InvoiceGen Team</p>
                <p class="text-xs text-slate-500">Built for freelancers, by freelancers.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center max-w-2xl mx-auto pb-10">
          <h2 class="text-lg font-bold text-slate-900 mb-2">Our Privacy Promise</h2>
          <p class="text-slate-600 text-sm">Your privacy is our priority. This tool runs entirely in your browser &mdash; your invoice data is never sent to our servers, never stored, never shared.</p>
        </div>

      </div>
    </section>

    <article`;

content = content.replace('<article', belowToolSections);

fs.writeFileSync('src/pages/index.astro', content);
console.log('index.astro updated with trust signals');
