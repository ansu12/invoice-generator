import fs from 'fs';

const renderPage = (title, desc, h1, body) => `---
import BaseLayout from "../layouts/BaseLayout.astro";
import Navbar from "../components/Navbar.astro";
import Footer from "../components/Footer.astro";
---
<BaseLayout title="${title}" description="${desc}">
  <Navbar />
  <div class="pt-24 pb-12 bg-slate-50 text-center border-b border-slate-100">
    <div class="max-w-4xl mx-auto px-6">
      <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">${h1}</h1>
      <div class="text-slate-500 font-medium mt-4">
        Last Updated: <time datetime="2026-09-15">September 15, 2026</time>
      </div>
    </div>
  </div>
  <article class="py-16 bg-white">
    <div class="max-w-3xl mx-auto px-6 prose prose-slate prose-lg">
      ${body}
    </div>
  </article>
  <Footer />
</BaseLayout>
`;

const aboutContent = `
<p>Welcome to InvoiceGen, the fastest and most private way to generate professional billing documents online. We built this tool because we experienced firsthand the intense frustration of modern business administration. As freelancers and independent contractors, we spent countless hours fighting with clunky word processors, wrestling with formatting errors in spreadsheet templates, and navigating bloated enterprise accounting software that demanded hefty monthly subscriptions for features we never used.</p>
<h2>Why We Built This Tool</h2>
<p>The core problem with the invoicing software market today is unnecessary friction. Most platforms require you to create an account, verify an email address, and surrender your personal data before you are even allowed to view their template. Once you finally get inside, they hit you with arbitrary usage limits or stamp their own corporate logo as a watermark on your hard work, forcing you to upgrade to a premium tier just to look professional.</p>
<p>We believe that generating a clean, mathematically accurate PDF invoice should be a fundamental utility, completely free of charge and devoid of artificial paywalls. Your time should be spent delivering value to your clients, not managing complex software.</p>
<h2>What Makes Us Different</h2>
<p>What truly sets us apart from competitors like InvoiceSimple or FreshBooks is our absolute commitment to your privacy and our strictly "no signup" philosophy. We engineered InvoiceGen to operate entirely client-side. When you type your business details, client names, and financial line items into our template, that data never touches our remote servers. All the processing and document rendering happens instantly and securely right inside your own web browser.</p>
<p>Furthermore, we offer genuinely unlimited usage. Whether you are generating a single invoice for a freelance gig or processing fifty invoices a week for a busy contracting business, you will never be asked to upgrade, and your PDFs will never bear a watermark.</p>
<h2>Contact Us</h2>
<p>We are always striving to improve the platform. If you have feature requests, bug reports, or simply want to say hello, we would love to hear from you. You can reach our team directly via email at <a href="mailto:support@invoicegen.com">support@invoicegen.com</a>.</p>
`;

const privacyContent = `
<p>At InvoiceGen, we believe that privacy is a fundamental human right, especially when dealing with sensitive financial and business data. This Privacy Policy outlines our strict adherence to data minimization and explains exactly how our application interacts with your information. The short version is simple: <strong>we do not collect, store, or analyze your invoice data on our servers.</strong></p>
<h2>What Data We Collect</h2>
<p>When you use our primary invoice generator tool, we collect absolutely zero personal or financial information. Unlike traditional SaaS applications, our platform operates entirely via client-side processing. This means that when you input your business name, your client's address, your line items, and your tax percentages, that information remains strictly on the device you are using. We do not have a database containing your invoices, nor do we have access to the names of your clients or your revenue numbers. Your business is entirely your own.</p>
<h2>How LocalStorage Works</h2>
<p>To provide a seamless user experience, we may utilize a standard web technology called <code>localStorage</code>. This feature allows your web browser to temporarily remember certain preferences (such as your chosen currency or custom tax rate) so that you do not have to re-enter them every time you load the page. It is crucial to understand that <code>localStorage</code> data is saved locally on your hard drive, not on our servers. You can easily delete this data at any time by clearing your browser's history and site data.</p>
<h2>No Tracking, No Cookies, No Third-Party Analytics</h2>
<p>We actively refuse to participate in the surveillance economy. We do not use intrusive tracking cookies, we do not employ third-party analytics scripts (like Google Analytics) that monitor your keystrokes or mouse movements, and we do not retarget you with advertisements across the internet. You will not find any Facebook Pixel or invasive tracking codes embedded in our website.</p>
<p>Our commitment to privacy ensures that your billing workflow remains completely secure and anonymous. We don't know who you are, and we don't want to know. We just want to provide you with the best possible tool for generating your PDF invoices.</p>
<h2>Changes to This Policy</h2>
<p>Because we collect no data, we do not anticipate needing to make significant changes to this Privacy Policy. However, if any technical updates require a revision, we will post the updated policy on this page with a revised "Last Updated" date at the top.</p>
`;

const termsContent = `
<p>By accessing and using the InvoiceGen website, you agree to comply with and be bound by the following Terms of Service. Please read these terms carefully before using our free online invoice generator. If you do not agree with any part of these terms, you must not use this website.</p>
<h2>Free to Use</h2>
<p>InvoiceGen provides a free, client-side invoice generation utility. You are permitted to use this tool for both personal and commercial purposes without paying any licensing fees or subscription costs. We do not impose limits on the number of invoices you can generate, nor do we require you to create a user account to access the platform's core features.</p>
<h2>No Warranty and No Liability</h2>
<p>This tool is provided strictly on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. While we strive to ensure the mathematical calculations and formatting are accurate, we make no guarantees regarding the legal compliance, tax accuracy, or suitability of the generated documents for your specific jurisdiction.</p>
<p>Because the tool operates entirely locally within your web browser and we do not store your data on our servers, we accept zero liability for any data loss, corrupted files, or unsaved work. If you accidentally close your browser window before downloading your PDF invoice, that data cannot be recovered by our team.</p>
<h2>User Responsibility</h2>
<p>You bear full responsibility for the accuracy of the information entered into the invoice generator. It is your sole responsibility to ensure that your invoices comply with all applicable local, state, and federal laws regarding taxation, business reporting, and financial documentation. You agree to hold InvoiceGen harmless against any claims, damages, or legal issues arising from your use of the documents generated by our platform.</p>
<h2>Modifications to the Service</h2>
<p>We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. By continuing to use the site after such modifications, you accept the updated Terms of Service.</p>
`;

fs.writeFileSync('src/pages/about.astro', renderPage("About Us — InvoiceGen", "Learn who built InvoiceGen, why we created this free tool, and how we protect your privacy.", "About Us", aboutContent));
fs.writeFileSync('src/pages/privacy.astro', renderPage("Privacy Policy — InvoiceGen", "Read our Privacy Policy. We do not store your data, use tracking cookies, or require accounts.", "Privacy Policy", privacyContent));
fs.writeFileSync('src/pages/terms.astro', renderPage("Terms of Service — InvoiceGen", "Terms of Service for using InvoiceGen. Understand your responsibilities and our free usage policy.", "Terms of Service", termsContent));

console.log('E-E-A-T pages created!');
