import fs from 'fs';
import path from 'path';

const posts = [
  { slug: "how-to-create-an-invoice", h1: "How to Create an Invoice", target: "/", anchor: "invoice generator" },
  { slug: "what-is-an-invoice", h1: "What is an Invoice", target: "/", anchor: "invoice generator" },
  { slug: "free-invoice-template", h1: "Free Invoice Template", target: "/free-invoice-generator", anchor: "free invoice generator" },
  { slug: "invoice-template-pdf", h1: "Invoice Template PDF", target: "/online-invoice-generator", anchor: "online invoice generator" },
  { slug: "how-to-send-an-invoice", h1: "How to Send an Invoice", target: "/free-online-invoice-generator", anchor: "free online invoice generator" },
  { slug: "invoice-payment-terms", h1: "Invoice Payment Terms", target: "/", anchor: "invoice generator" },
  { slug: "invoice-numbering", h1: "Invoice Numbering", target: "/free-invoice-generator", anchor: "free invoice generator" },
  { slug: "freelance-invoice-template", h1: "Freelance Invoice Template", target: "/invoice-generator-free", anchor: "invoice generator free" },
  { slug: "small-business-invoice", h1: "Small Business Invoice", target: "/invoice-generator-free", anchor: "invoice generator free" },
  { slug: "invoice-vs-receipt", h1: "Invoice vs Receipt", target: "/online-invoice-generator", anchor: "online invoice generator" }
];

const generateLipsum = (keyword) => `
<p>Understanding ${keyword.toLowerCase()} is crucial for any modern business. When you operate as a freelancer or a small business owner, managing your accounts receivable effectively dictates your cash flow. Without a solid understanding of how to manage these financial documents, you risk delayed payments, frustrated clients, and administrative bottlenecks that steal time away from your actual work.</p>
<p>The concepts surrounding ${keyword.toLowerCase()} may seem complex at first, but breaking them down into manageable steps reveals a straightforward process. In this comprehensive guide, we will explore the nuances of this topic, providing actionable advice that you can implement immediately to streamline your billing operations. We believe that financial administration should never be the hardest part of running your own company.</p>
<p>Furthermore, standardizing your approach to ${keyword.toLowerCase()} creates a professional image. When a client receives a perfectly formatted, legally compliant document, it establishes trust. They recognize that you are a serious professional who values organization, which often translates to faster invoice approval and quicker payments into your bank account. Let's delve into the specific mechanics and best practices.</p>
`;

if (!fs.existsSync('src/pages/blog')) fs.mkdirSync('src/pages/blog', { recursive: true });

posts.forEach((post, index) => {
  const link1 = posts[(index + 1) % posts.length].slug;
  const link2 = posts[(index + 2) % posts.length].slug;
  
  const h2Titles = [
    `The Importance of ${post.h1}`,
    `Best Practices for ${post.h1}`,
    `Common Mistakes to Avoid`,
    `How to Optimize Your Workflow`,
    `Next Steps and Recommendations`
  ];
  
  let bodyContent = ``;
  h2Titles.forEach((h2, i) => {
    bodyContent += `<h2>${h2}</h2>\n`;
    bodyContent += generateLipsum(post.h1);
    
    if (i === 1) {
      bodyContent += `<p>For a seamless experience, we highly recommend using our <a href="${post.target}">${post.anchor}</a>. It automates this entire process for you instantly.</p>\n`;
    }
    if (i === 3) {
      bodyContent += `<p>If you want to learn more, check out our related guides on <a href="/blog/${link1}">${link1.replace(/-/g, ' ')}</a> and <a href="/blog/${link2}">${link2.replace(/-/g, ' ')}</a>.</p>\n`;
    }
  });

  const faqs = [
    {q: `Why is ${post.h1.toLowerCase()} important?`, a: `It is vitally important because it ensures your business remains legally compliant and financially organized. Establishing a clear process guarantees that you are paid accurately and on time.`},
    {q: `How long does it take to set up?`, a: `With the right tools, it takes less than 60 seconds. By utilizing a modern, browser-based billing solution, you can skip the tedious manual formatting and immediately start generating professional documents.`},
    {q: `Do I need expensive software?`, a: `No, you absolutely do not need expensive software. There are powerful free tools available online that handle all the necessary calculations and formatting without requiring a monthly subscription or paid license.`},
    {q: `What is the best way to get started?`, a: `The best way to get started is to use a free online tool to generate your first document. You can input your details, review a live preview, and download a PDF instantly to see how simple the process is.`}
  ];

  let faqHtml = `<div class="space-y-6">\n`;
  faqs.forEach(q => {
    faqHtml += `<div class="bg-slate-50 p-6 rounded-xl border border-slate-100">\n<h3 class="font-bold text-slate-900 text-lg mb-2">${q.q}</h3>\n<p class="text-slate-600 leading-relaxed">${q.a}</p>\n</div>\n`;
  });
  faqHtml += `</div>\n`;

  let jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": { "@type": "Answer", "text": q.a }
    }))
  };

  const schemaScript = `<script type="application/ld+json" set:html={JSON.stringify(${JSON.stringify(jsonLd)})} />`;

  const fileContent = `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Navbar from "../../components/Navbar.astro";
import Footer from "../../components/Footer.astro";
---
<BaseLayout title="${post.h1} — InvoiceGen Blog" description="A comprehensive guide on ${post.h1.toLowerCase()} for freelancers and small businesses.">
  <Navbar />
  <div class="pt-24 pb-12 bg-slate-50 text-center border-b border-slate-100">
    <div class="max-w-4xl mx-auto px-6">
      <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">${post.h1}</h1>
      <p class="text-slate-500 font-medium">By Jane Doe | Published Sept 15, 2026</p>
    </div>
  </div>
  <article class="py-16 bg-white">
    <div class="max-w-3xl mx-auto px-6 prose prose-slate prose-lg">
      ${bodyContent}
      
      <h2>Frequently Asked Questions</h2>
      ${faqHtml}
      ${schemaScript}
      
      <div class="mt-12 p-8 bg-blue-50 rounded-xl text-center border border-blue-100">
        <h3 class="text-2xl font-bold text-slate-900 mb-4">Ready to get paid faster?</h3>
        <p class="text-slate-600 mb-6">Create your free invoice now — no signup required.</p>
        <a href="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-[10px] transition-colors">Start Invoicing Free</a>
      </div>
    </div>
  </article>
  <Footer />
</BaseLayout>
`;

  fs.writeFileSync(path.join('src/pages/blog', post.slug + '.astro'), fileContent);
});

console.log('10 blogs created successfully!');
