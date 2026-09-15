import fs from 'fs';
import path from 'path';

const pages = [
  {
    slug: 'index.astro',
    title: 'Invoice Generator — Free, Unlimited & No Signup',
    desc: 'The best free invoice generator online. Create, download, and send professional PDF invoices in seconds. No watermarks, no signup, 100% free forever.',
    h1: 'Free Invoice Generator',
    sub: 'Create professional invoices in seconds. No signup required.',
    kw: 'invoice generator'
  },
  {
    slug: 'free-invoice-generator.astro',
    title: 'Free Invoice Generator — No Signup, No Watermarks',
    desc: 'Use our 100% free invoice generator to create professional PDFs instantly. No limits, no watermarks, no email required. Start invoicing now.',
    h1: 'Free Invoice Generator',
    sub: '100% Free. No hidden fees. No credit card required.',
    kw: 'free invoice generator'
  },
  {
    slug: 'invoice-generator-free.astro',
    title: 'Invoice Generator Free — Unlimited Professional Invoices',
    desc: 'Looking for an invoice generator free of charge? Create unlimited invoices with our tool. No paywalls, no watermarks, no signup needed.',
    h1: 'Invoice Generator Free',
    sub: 'Unlimited professional invoices, completely free of charge.',
    kw: 'invoice generator free'
  },
  {
    slug: 'online-invoice-generator.astro',
    title: 'Online Invoice Generator — Create Invoices in Your Browser',
    desc: 'A powerful online invoice generator that works entirely in your browser. Create, preview, and download PDF invoices instantly. No software needed.',
    h1: 'Online Invoice Generator',
    sub: 'Create invoices directly in your browser. Fast, secure, and easy.',
    kw: 'online invoice generator'
  },
  {
    slug: 'free-online-invoice-generator.astro',
    title: 'Free Online Invoice Generator — Instant PDF Download',
    desc: 'The top free online invoice generator. Create beautiful invoices online and download them as PDFs instantly. No registration or watermarks.',
    h1: 'Free Online Invoice Generator',
    sub: 'The fastest way to create invoices online for free.',
    kw: 'free online invoice generator'
  },
  {
    slug: 'ai-invoice-generator.astro',
    title: 'AI Invoice Generator — Smart, Automated Billing',
    desc: 'Use our AI invoice generator to create professional invoices faster. Smart formatting, auto-calculations, and beautiful templates.',
    h1: 'AI Invoice Generator',
    sub: 'Smart invoicing powered by modern technology.',
    kw: 'ai invoice generator'
  },
  {
    slug: 'paypal-invoice-generator.astro',
    title: 'PayPal Invoice Generator — Bill Clients Easily',
    desc: 'Create professional invoices and get paid via PayPal. Our PayPal invoice generator makes it easy to add your payment link and get paid faster.',
    h1: 'PayPal Invoice Generator',
    sub: 'Create invoices ready for PayPal payments instantly.',
    kw: 'paypal invoice generator'
  },
  {
    slug: 'invoice-generator-online.astro',
    title: 'Invoice Generator Online — Fast & Free PDF Invoices',
    desc: 'The most reliable invoice generator online. Generate custom PDF invoices instantly with our powerful online tool. No downloads or signup required.',
    h1: 'Invoice Generator Online',
    sub: 'Generate custom PDF invoices directly online.',
    kw: 'invoice generator online'
  }
];

const template = (p) => `---
import BaseLayout from "../layouts/BaseLayout.astro";
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
import InvoiceGenerator from "../components/InvoiceGenerator";

const title = "${p.title}";
const description = "${p.desc}";
const canonical = "https://invoice-generator.purohitansu7.workers.dev/${p.slug === 'index.astro' ? '' : p.slug.replace('.astro', '')}";
---

<BaseLayout title={title} description={description} canonical={canonical}>
  <Navbar />
  
  <div class="bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 text-center px-6">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-5 leading-tight">
        ${p.h1}
      </h1>
      <p class="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
        ${p.sub}
      </p>
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <span class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full shadow-sm">? No Signup</span>
        <span class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full shadow-sm">? No Watermarks</span>
        <span class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full shadow-sm">? 100% Free</span>
      </div>
    </div>
  </div>

  <InvoiceGenerator client:load />

  <article class="py-20 bg-white border-t border-slate-100">
    <div class="max-w-3xl mx-auto px-6 prose prose-slate prose-lg">
      <h2>The Best ${p.kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h2>
      <p>If you are looking for a reliable <strong>${p.kw}</strong>, you have found the right tool. Our platform allows freelancers, contractors, and small businesses to create professional PDF invoices in seconds. Unlike other tools, we do not require you to sign up, and we never place watermarks on your documents.</p>
      
      <h2>Why Choose Our Tool?</h2>
      <ul>
        <li><strong>Instant PDF Download:</strong> Create your invoice and download it immediately.</li>
        <li><strong>Completely Free:</strong> No hidden fees, no subscriptions, no paywalls.</li>
        <li><strong>Professional Design:</strong> Impress your clients with clean, modern templates.</li>
        <li><strong>Secure and Private:</strong> Your data never leaves your browser.</li>
      </ul>
      
      <h2>How to Use This ${p.kw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h2>
      <p>Using our tool is incredibly simple. Just fill in your business details, add your client's information, and list the services or products you provided. The live preview updates instantly. Once you are satisfied, click download to get your high-quality PDF invoice.</p>
    </div>
  </article>

  <Footer />
</BaseLayout>
`;

pages.forEach(p => {
  fs.writeFileSync(path.join('src/pages', p.slug), template(p));
  console.log(`Wrote ${p.slug}`);
});

const blogDir = 'src/pages/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

blogFiles.forEach(f => {
  const p = path.join(blogDir, f);
  let content = fs.readFileSync(p, 'utf-8');
  
  content = content.replace(/â€"/g, '—').replace(/â€¢/g, '|').replace(/\?"/g, '—');
  
  if (!content.includes('<Navbar />')) {
    content = content.replace(/<BaseLayout[^>]*>/, match => `${match}\n  <Navbar />`);
    
    // check if it needs imports
    if (!content.includes('import Navbar')) {
       content = content.replace(/---/, '---\nimport Navbar from "../../components/Navbar.astro";\nimport Footer from "../../components/Footer.astro";');
    }
  }
  
  if (!content.includes('<Footer />')) {
    content = content.replace(/<\/BaseLayout>/, '  <Footer />\n</BaseLayout>');
  }
  
  if (content.includes('<script type="application/ld+json"') && !content.includes('slot="schema"')) {
    content = content.replace(/<script type="application\/ld\+json"[^>]*>.*?<\/script>/s, match => `<Fragment slot="schema">\n    ${match}\n  </Fragment>`);
  }
  
  fs.writeFileSync(p, content);
  console.log(`Fixed blog/${f}`);
});

console.log("All pages fixed and SEO optimized!");
