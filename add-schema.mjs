import fs from 'fs';

const data = {
  'src/pages/free-invoice-generator.astro': [
    {q: "Is this free invoice generator really free?", a: "Yes, this tool is completely and genuinely free to use. Unlike other platforms that lock you out after creating a single document, we never hide your finished PDF invoice behind a surprise paywall. You can create as many professional billing documents as you need without ever entering a credit card or paying a monthly subscription fee."},
    {q: "Do I need to create an account to use it?", a: "No, you absolutely do not need to create an account to use this free invoice generator. We respect your privacy and your time, which is why we removed all mandatory registration walls. You can simply open the website, fill out your invoice template, and immediately download the final PDF without handing over your email address."},
    {q: "Are there watermarks on the PDF?", a: "No, there are absolutely zero watermarks added to your generated PDF invoice. We believe that your business documents should look 100% professional, which is why we never stamp our branding onto your work. The only logo that appears on the final document is the custom business logo that you choose to upload yourself."},
    {q: "How many invoices can I create for free?", a: "You can create an unlimited number of invoices for free. Whether you need to generate one simple billing document a month or process fifty detailed PDF invoices a week, our platform imposes no arbitrary usage caps or monthly limitations. It remains entirely free no matter how frequently your business requires professional invoicing."},
    {q: "What payment methods can I list on the invoice?", a: "You have complete freedom to list any payment methods you accept in the 'Notes' or 'Payment Terms' section of the invoice generator. Whether you prefer clients to pay via bank transfer, PayPal, Stripe, credit card, or physical check, you can clearly specify your preferred payment instructions and due dates directly on the document."},
    {q: "Can I use this for my small business?", a: "Absolutely. This free invoice generator is specifically designed to meet the rigorous billing requirements of small businesses, freelancers, and independent contractors. It includes essential features like customizable sales tax fields, currency selection, and EIN input, ensuring your generated PDF invoice is both legally compliant and highly professional."}
  ],
  'src/pages/invoice-generator-free.astro': [
    {q: "Is there a free invoice generator with no signup?", a: "Yes, our platform is a premium invoice generator free of all mandatory signup requirements. You do not need to register for an account, verify an email address, or provide any personal contact information. You can start creating your professional billing documents the moment the webpage loads, ensuring a frictionless and efficient workflow."},
    {q: "What's the catch with free invoice generators?", a: "The typical catch with other tools is that they limit your usage or force watermarks on your documents to upsell a paid plan. We operate differently. Our invoice generator free platform runs entirely client-side in your web browser, which keeps our server costs near zero. This allows us to provide a genuinely unlimited tool without deceptive practices."},
    {q: "Can I create unlimited invoices for free?", a: "Yes, you can generate as many billing documents as your business requires. Our invoice generator free service does not impose daily, weekly, or monthly usage caps. You are fully empowered to create unlimited professional PDF invoices without ever hitting a paywall or being asked to upgrade your account."},
    {q: "Does the free version include US sales tax fields?", a: "Yes, the tool fully supports advanced tax calculations. You can easily enter your specific US sales tax, VAT, or GST percentage into the designated field. The invoice generator will automatically calculate the correct tax amount based on your line item subtotal and instantly append it to your final grand total."},
    {q: "Can I download my invoice as a PDF?", a: "Yes, the primary output of this tool is a high-resolution, print-ready PDF invoice. Once you have finished entering your client details and line items into the invoice template, simply click the download button. The PDF is generated locally on your device in seconds, ready to be emailed or printed."},
    {q: "Is my data stored on your servers?", a: "No, your financial data is never transmitted to or stored on our remote servers. Because this invoice generator free tool operates entirely within your local web browser, all of your sensitive business information and client details remain completely private and secure on your own device."}
  ],
  'src/pages/online-invoice-generator.astro': [
    {q: "Can I create an invoice online without downloading software?", a: "Yes, this online invoice generator is completely web-based, meaning you do not need to download or install any software. You can access the full suite of billing tools directly through your preferred web browser, saving valuable hard drive space and eliminating the need for frustrating software updates."},
    {q: "Does the online invoice generator work on mobile?", a: "Absolutely. The platform features a highly responsive design that automatically adapts to the screen size of any device. Whether you are using an iPhone, an iPad, or an Android smartphone, the online invoice generator provides a seamless, touch-friendly interface for creating professional PDF invoices on the go."},
    {q: "Do I need to install an app?", a: "No, there is no need to visit an app store or install a dedicated mobile application. Our online invoice generator functions perfectly as a progressive web application. You simply navigate to the website URL in your mobile browser, and you instantly have access to all the features required to build a customized invoice template."},
    {q: "Is my invoice data secure?", a: "Yes, your billing information is exceptionally secure. Unlike many cloud platforms, our online invoice generator processes your data client-side. This means the actual document compilation happens locally within your web browser, and your sensitive client details and financial totals are never sent across the internet to our servers."},
    {q: "Can I share the invoice via WhatsApp or email?", a: "Yes, once your document is complete, you have multiple sharing options. You can download the PDF invoice locally and attach it to a standard email, or you can use our integrated WhatsApp sharing button to send the document directly to your client's smartphone, which often expedites the payment process."},
    {q: "Does it work offline?", a: "While you must have an active internet connection to initially load the online invoice generator webpage, the actual creation and mathematical calculations happen locally in your browser. However, you should remain online to utilize advanced features like direct WhatsApp sharing and to ensure your final PDF downloads correctly."}
  ],
  'src/pages/free-online-invoice-generator.astro': [
    {q: "What is the best free online invoice generator?", a: "The best free online invoice generator is one that offers unlimited usage, requires no mandatory account registration, and produces watermark-free documents. Our platform meets all of these criteria, providing small businesses and freelancers with a premium billing solution that operates entirely in the browser without any hidden fees or deceptive trial periods."},
    {q: "Do I need to sign up for the free online invoice generator?", a: "No, you do not need to sign up or create an account. We designed this free online invoice generator to be completely frictionless. You can immediately access the tool, fill out your invoice template, and download your final PDF without ever providing an email address or creating a password."},
    {q: "Can I create an invoice online for free without watermarks?", a: "Yes, every single document you produce using our free online invoice generator is completely free of watermarks. We know that maintaining a professional image is vital for your business, so the final PDF invoice will only contain the text and custom business logo that you choose to upload."},
    {q: "How do I send the invoice to my client?", a: "Sending your billing document is incredibly easy. Once you generate the final PDF invoice, you can download it to your device and attach it to a professional email. Alternatively, if you communicate with your clients via mobile, you can use our built-in one-click WhatsApp sharing feature for instant delivery."},
    {q: "Does it support US sales tax?", a: "Yes, the tool is fully equipped to handle US sales tax requirements. You can easily input your state's specific sales tax percentage, and the free online invoice generator will automatically calculate the exact tax amount based on your line item subtotal, adding it seamlessly to the grand total."},
    {q: "Is there a limit on invoices?", a: "There is absolutely no limit on the number of invoices you can create. Whether you need to generate one document a month or a hundred, our free online invoice generator imposes no daily, weekly, or monthly usage caps. You have unrestricted access to professional billing tools 24/7."}
  ],
  'src/pages/index.astro': [
    {q: "What is an invoice generator?", a: "An invoice generator is a specialized online tool designed to automate the creation of professional billing documents. Instead of manually formatting a complex word processor file, you simply fill your business details into a pre-structured invoice template. The generator handles all mathematical calculations, tax additions, and layout design automatically."},
    {q: "Is this invoice generator free to use?", a: "Yes, this tool is 100% free for both personal and commercial use. We do not charge subscription fees, we do not require a credit card, and we do not hide premium features behind a paywall. You can generate unlimited professional PDF invoices without ever paying a single cent."},
    {q: "Do I need to sign up?", a: "No signup is required whatsoever. We believe in providing a frictionless billing experience. You can access the invoice generator instantly, enter your client's details, and download the finished document without ever needing to register an account, verify an email, or remember a password."},
    {q: "Can I use it on my phone?", a: "Absolutely. The invoice generator features a fully responsive, mobile-first design. It adapts perfectly to the screen size of any smartphone or tablet, allowing contractors, freelancers, and small business owners to easily create, preview, and send professional billing documents while away from their desktop computers."},
    {q: "Does it add watermarks?", a: "No, we never add watermarks to your generated documents. Your final PDF invoice will be entirely clean and professional. The only branding that will appear on the document is the custom business logo that you choose to upload via the invoice template settings."},
    {q: "What tax fields does it support?", a: "The invoice generator fully supports advanced tax calculations. You can input an Employer Identification Number (EIN) for official reporting, and you can apply any custom sales tax, VAT, or GST percentage. The tool will automatically calculate the exact tax amount and seamlessly add it to your grand total."},
    {q: "Can I share invoices via WhatsApp?", a: "Yes, we have integrated a dedicated WhatsApp sharing feature. Once your PDF invoice is complete, you can simply click the share button to open WhatsApp and send the document directly to your client's smartphone, making the delivery process faster and often resulting in quicker payments."},
    {q: "Is my data safe?", a: "Your financial and client data is exceptionally safe because this invoice generator processes everything client-side. The actual compilation of the PDF invoice happens entirely within your local web browser. Your sensitive business information is never transmitted to, stored on, or analyzed by our remote servers."}
  ]
};

for (const [file, questions] of Object.entries(data)) {
  let content = fs.readFileSync(file, 'utf8');

  // Generate HTML for FAQs
  let faqHtml = `<div class="space-y-6">\n`;
  questions.forEach(q => {
    faqHtml += `      <div class="bg-slate-50 p-6 rounded-xl border border-slate-100">\n        <h3 class="font-bold text-slate-900 text-lg mb-2">${q.q}</h3>\n        <p class="text-slate-600 leading-relaxed">${q.a}</p>\n      </div>\n`;
  });
  faqHtml += `    </div>`;

  // Generate JSON-LD
  let jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  };

  let schemaScript = `\n  <script type="application/ld+json" set:html={JSON.stringify(${JSON.stringify(jsonLd)})} />\n`;

  // Replace existing FAQ section or append to end of article
  // All pages currently have "<h2>Frequently Asked Questions...</h2>\n    <div itemscope itemtype..."
  const regex = /<h2>Frequently Asked Questions[\s\S]*?<\/div>\s*<\/div>/;
  if (content.match(regex)) {
    content = content.replace(regex, `<h2>Frequently Asked Questions</h2>\n    ${faqHtml}`);
  } else {
    // Just in case
    console.log(`Warning: Regex missed on ${file}`);
  }

  // Inject schema into <head> via BaseLayout or direct
  // BaseLayout is used. We can inject the schemaScript right before </BaseLayout> since Astro hoists scripts, OR we can put it right below the FAQ HTML. Let's put it right below the FAQ HTML to guarantee it's on the page.
  content = content.replace(`    ${faqHtml}`, `    ${faqHtml}${schemaScript}`);

  fs.writeFileSync(file, content);
}
console.log('Schemas added!');
