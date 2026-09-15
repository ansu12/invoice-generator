import fs from 'fs';
let content = fs.readFileSync('src/pages/index.astro', 'utf8');

// Add imports
if (!content.includes('useTranslations')) {
  content = content.replace(
    'import InvoiceGenerator from "../components/InvoiceGenerator";',
    `import InvoiceGenerator from "../components/InvoiceGenerator";\nimport { useTranslations } from "../i18n/utils";`
  );
  
  // Add t inside the frontmatter
  content = content.replace(
    'const schemas = [',
    `const lang = Astro.currentLocale || 'en';\nconst t = useTranslations(lang as any);\n\nconst schemas = [`
  );

  // Replace text
  content = content.replace(
    'title="Invoice Generator — Free, No Signup, Instant PDF"',
    'title={t("title")}'
  );
  content = content.replace(
    'description="Free invoice generator with no signup, no watermarks, no limits. US sales tax fields, WhatsApp sharing, instant PDF download. Create your invoice now."',
    'description={t("subtitle")}'
  );
  content = content.replace(
    'Free Invoice Generator',
    '{t("title")}'
  );
  content = content.replace(
    'Create professional invoices in seconds. No signup, no watermarks, no limits.',
    '{t("subtitle")}'
  );
  content = content.replace(
    'No Signup Required',
    '{t("hero.badge.signup")}'
  );
  content = content.replace(
    'Unlimited Invoices',
    '{t("hero.badge.unlimited")}'
  );
  content = content.replace(
    'Instant PDF Download',
    '{t("hero.badge.pdf")}'
  );
  content = content.replace(
    'Create Your Invoice Now',
    '{t("hero.cta")}'
  );
  content = content.replace(
    'See a sample invoice',
    '{t("hero.sample")}'
  );
  content = content.replace(
    '<InvoiceGenerator client:load />',
    '<InvoiceGenerator client:load lang={lang} />'
  );
  
  fs.writeFileSync('src/pages/index.astro', content);
  console.log('index.astro localized');
}
