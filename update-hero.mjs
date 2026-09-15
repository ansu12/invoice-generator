import fs from 'fs';
let content = fs.readFileSync('src/pages/index.astro', 'utf8');

const oldHeroRegex = /<!-- HERO SECTION -->[\s\S]*?<!-- INVOICE TOOL -->/;

const newHero = `<!-- HERO SECTION -->
  <section class="relative pt-20 pb-12 overflow-hidden bg-white">
    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
        Free Invoice Generator
      </h1>
      
      <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        Create professional invoices in seconds. No signup, no watermarks, no limits.
      </p>
      
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          No Signup Required
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          Unlimited Invoices
        </span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          Instant PDF Download
        </span>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="#invoice-tool" class="w-full sm:w-auto bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-[0_4px_14px_rgba(99,102,241,0.39)]">
          Create Your Invoice Now
        </a>
        <button type="button" id="btn-sample-invoice" class="w-full sm:w-auto text-slate-500 hover:text-slate-900 font-medium px-6 py-4 transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-slate-400">
          See a sample invoice
        </button>
      </div>
    </div>
  </section>

  <script is:inline>
    document.getElementById('btn-sample-invoice')?.addEventListener('click', () => {
      window.dispatchEvent(new Event('fill-sample-invoice'));
    });
  </script>

  <!-- INVOICE TOOL -->`;

if (content.match(oldHeroRegex)) {
  content = content.replace(oldHeroRegex, newHero);
  fs.writeFileSync('src/pages/index.astro', content);
  console.log('Hero updated successfully!');
} else {
  console.log('Failed to match old hero section.');
}
