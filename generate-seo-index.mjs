import fs from 'fs';

const indexHtml = `---
import BaseLayout from "../layouts/BaseLayout.astro";
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
import Schema from "../components/Schema.astro";
import InvoiceGenerator from "../components/InvoiceGenerator";

const SITE = "https://yourdomain.com";
const BRAND = "InvoiceGen";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": \`\${BRAND} — Free Invoice Generator\`,
    "url": SITE,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
];
---
<BaseLayout
  title="Invoice Generator — Free, No Signup, Instant PDF"
  description="Free invoice generator with no signup, no watermarks, no limits. US sales tax fields, WhatsApp sharing, instant PDF download. Create your invoice now."
>
  <Schema data={schemas} slot="schema" />
  <Navbar />

  <!-- HERO SECTION -->
  <section class="relative pt-24 pb-16 overflow-hidden bg-slate-50">
    <div class="max-w-5xl mx-auto px-6 text-center relative z-10">
      <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
        Invoice Generator
      </h1>
      <h2 class="text-xl md:text-2xl font-medium text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto">
        Create a Professional Invoice in Seconds
      </h2>
      <p class="text-base text-slate-400 mb-8 max-w-lg mx-auto">
        Welcome to the best free online invoice generator. No signup, no watermarks, and no limits. Fill in your details, add line items, and download a clean PDF invoice instantly.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="#invoice-tool" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-[10px] text-base transition-colors shadow-[0_4px_16px_rgba(37,99,235,0.30)]">Create Free Invoice &darr;</a>
        <a href="/invoice-template" class="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-[10px] text-base border border-slate-200 hover:border-slate-300 transition-colors">Browse Templates</a>
      </div>
    </div>
  </section>

  <!-- INVOICE TOOL -->
  <InvoiceGenerator client:load />

  <!-- SEO CONTENT SECTION (1000+ words) -->
  <article class="py-20 bg-white border-t border-slate-100">
    <div class="max-w-3xl mx-auto px-6 prose prose-slate prose-lg">
      <p>Welcome to the ultimate tool for small business billing. If you are a freelancer, a contractor, or a small agency owner, managing your accounts receivable is one of the most important aspects of your business. Without a reliable way to bill clients, your cash flow suffers. That is exactly why we built this powerful invoice generator—to completely eliminate the friction between finishing your hard work and actually getting paid for it. By providing a streamlined, intuitive billing experience, we help you project a professional image that encourages clients to pay you faster.</p>
      
      <p>Many professionals still rely on outdated methods to create invoice documents. They use clunky Microsoft Word templates, messy Excel spreadsheets, or they pay exorbitant monthly fees for bloated enterprise accounting software. This invoice generator offers a far superior alternative. It allows you to input your data into a clean, modern interface and instantly export a perfectly formatted PDF invoice. It bridges the gap between manual document creation and expensive SaaS subscriptions, delivering exactly what you need without any of the overhead.</p>

      <h2>What Is an Invoice Generator?</h2>
      <p>An invoice generator is a specialized software tool—usually web-based—designed specifically to automate the creation and formatting of billing documents. Instead of forcing you to manually align text boxes, calculate tax percentages, and format tables in a word processor, an invoice generator provides a structured, fill-in-the-blank interface. You simply enter your business details, your client's information, and the services rendered, and the generator handles the complex layout and mathematical calculations behind the scenes.</p>
      <p>Our specific invoice generator operates entirely in your web browser. This means it functions as a highly accessible invoice template that requires zero software downloads or installations. The primary goal of an invoice generator is to save you time. By automating the design and calculation phases of billing, you can generate a legally binding, mathematically accurate PDF invoice in a matter of seconds. It transforms a tedious administrative chore into a quick, effortless task, allowing you to focus your energy on growing your actual business.</p>

      <h2>How to Use This Invoice Generator</h2>
      <p>We have engineered this invoice generator to be as user-friendly and intuitive as possible. Even if you have never created a billing document before, you can master this tool in minutes. The process is broken down into a few logical steps, ensuring that every necessary detail is captured before you send the document to your client.</p>
      <p><strong>Step 1: Enter Your Business Details.</strong> Begin by establishing your professional identity. Add your business name, your contact email address, and your physical mailing address. If you are a US-based contractor, you can also add your Employer Identification Number (EIN) for tax reporting purposes. Finally, use the upload button to add your company logo, which instantly brands the document.</p>
      <p><strong>Step 2: Add Client Information.</strong> Next, explicitly define who is responsible for paying the bill. Input your client's business name, their primary contact email, and their billing address. Clear client information is essential for legal compliance and ensures the document reaches the correct accounts payable department.</p>
      <p><strong>Step 3: Add Line Items.</strong> This is the core of the invoice generator. Describe the specific products sold or services rendered. Enter the exact quantity (or hours worked) and the rate per unit. The generator will instantly multiply these figures and automatically update the running subtotal.</p>
      <p><strong>Step 4: Set Tax and Due Date.</strong> Professional billing requires clear terms. Select the issue date and the payment due date (e.g., Net 30 days). If your jurisdiction requires you to collect sales tax, VAT, or GST, simply enter the tax percentage in the designated field. The tool will calculate the tax amount based on your subtotal and add it to the grand total automatically.</p>
      <p><strong>Step 5: Download PDF or Share.</strong> Review the live preview on the right side of your screen. Because this tool acts as a live invoice template, what you see is exactly what the client will receive. Once satisfied, click the "Download PDF" button to save the file locally, or use the WhatsApp integration to send the PDF invoice directly to your client's smartphone.</p>

      <h2>Who Uses This Invoice Generator</h2>
      <p>This platform was designed for a wide variety of independent professionals and small businesses. Because the tool is highly adaptable, it serves as the perfect billing solution across dozens of different industries. Here are some of the most common groups that rely on our invoice generator daily:</p>
      <p><strong>Freelance Creatives:</strong> Graphic designers, freelance writers, web developers, and photographers use this tool because it respects their need for clean aesthetics. They can upload their custom branding and generate a PDF invoice that matches the high quality of the creative work they deliver to their clients.</p>
      <p><strong>Independent Contractors:</strong> Electricians, plumbers, landscapers, and construction contractors frequently use the invoice generator on their mobile devices. Because it doesn't require a desktop computer, they can create invoice documents while sitting in their truck at the job site, ensuring they bill the client before they even drive away.</p>
      <p><strong>Consultants and Coaches:</strong> Business consultants, marketing strategists, and life coaches utilize the tool to bill for their hourly sessions or monthly retainer packages. The ability to clearly define line items and apply specific payment terms makes it easy to maintain clear financial boundaries with their clients.</p>
      <p><strong>Small Retailers and Agencies:</strong> Boutique digital marketing agencies and independent sellers use the generator to handle wholesale orders, custom service packages, or B2B transactions that don't fit into their standard point-of-sale systems.</p>

      <h2>Invoice Generator Features</h2>
      <p>What makes this specific invoice generator superior to standard templates? It is packed with features specifically requested by freelancers and small business owners. First and foremost, it features a <strong>Real-Time Live Preview</strong>. As you type your information into the left-hand form, the right-hand preview updates instantly. You never have to guess what the final document will look like or constantly export drafts to check your formatting.</p>
      <p>Second, it includes <strong>Automated Math and Tax Calculations</strong>. Human error in billing can cost you money or damage your professional reputation. Our tool automatically calculates line item totals, applies your specified tax percentage, and sums the grand total flawlessly every single time. It completely eliminates the need for a desk calculator.</p>
      <p>Finally, it offers <strong>Instant WhatsApp Sharing</strong> and <strong>Clean PDF Export</strong>. Once your billing document is complete, you can generate a high-resolution, watermark-free PDF invoice with a single click. Alternatively, if you communicate with your clients primarily via mobile, you can use our built-in sharing feature to send the invoice directly to their WhatsApp, dramatically decreasing the time it takes for them to view and pay the bill.</p>

      <h2>Frequently Asked Questions</h2>
      <div itemscope itemtype="https://schema.org/FAQPage">
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">Is this invoice generator completely free to use?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">Yes, it is 100% free. We do not charge subscription fees, we do not require a credit card, and we do not restrict access to premium features. You can use the tool to create as many documents as you need without ever paying a dime.</p>
          </div>
        </div>
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">Do I need to sign up for an account?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">No signup is required. You do not need to provide an email address, verify your identity, or create a password. We believe in removing all friction, allowing you to simply open the webpage, create your document, and download it instantly.</p>
          </div>
        </div>
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">Can I use this invoice generator on my mobile phone?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">Absolutely. The platform features a fully responsive design, meaning it adapts perfectly to the screen size of your smartphone or tablet. You can easily generate, preview, and share a PDF invoice while on the go.</p>
          </div>
        </div>
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">Will my downloaded PDF have a watermark?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">No, we never place watermarks on your generated documents. Your final PDF invoice will be completely clean and professional, displaying only your custom business logo and the billing details you entered into the tool.</p>
          </div>
        </div>
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">What tax fields does the tool support?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">The tool supports an Employer Identification Number (EIN) field for US-based contractors, as well as a customizable tax percentage field. Simply enter your local sales tax, VAT, or GST rate, and the tool will calculate the exact tax amount automatically.</p>
          </div>
        </div>
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">Can I share my invoices directly via WhatsApp?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">Yes! We built a dedicated WhatsApp sharing feature. Once your document is ready, you can click the share button to open WhatsApp and send the PDF invoice directly to your client's phone, which often results in much faster payments.</p>
          </div>
        </div>
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">Is my financial data secure?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">Your data is extremely secure because this invoice generator processes everything client-side. Your business details, client information, and financial totals are processed locally in your web browser and are never transmitted to our remote servers.</p>
          </div>
        </div>
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">Can I save my invoice template for later?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">To maximize your privacy, this tool operates as a single-session generator. We do not store your data between visits. You will start with a fresh invoice template each time you load the page, so be sure to download your PDF before leaving.</p>
          </div>
        </div>
      </div>
    </div>
  </article>

  <Footer />
</BaseLayout>
`

fs.writeFileSync('src/pages/index.astro', indexHtml);
console.log('Done 3/3');
