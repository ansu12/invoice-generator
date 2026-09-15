import fs from 'fs';

// 1. Update astro.config.mjs
let astroConfig = fs.readFileSync('astro.config.mjs', 'utf8');
astroConfig = astroConfig.replace(
  'locales: ["en", "es", "hi"],',
  'locales: ["en", "es", "hi", "fr", "de", "pt"],'
);
fs.writeFileSync('astro.config.mjs', astroConfig);

// 2. Update BaseLayout.astro
let baseLayout = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');
const oldPathRegex = /const pathWithoutLang = Astro\.url\.pathname\.replace\(\/\^\\\/.*?\/, '\/'\)\.replace\(\/\^\\\/.*?\/, '\/'\);/;
// The old one was: const pathWithoutLang = Astro.url.pathname.replace(/^\/(es|hi)\//, '/').replace(/^\/(es|hi)$/, '/');
baseLayout = baseLayout.replace(
  /const pathWithoutLang = Astro\.url\.pathname\.replace\(\/.*?\/, '\/'\)\.replace\(\/.*?\/, '\/'\);/,
  `const pathWithoutLang = Astro.url.pathname.replace(/^\\/(es|hi|fr|de|pt)\\//, '/').replace(/^\\/(es|hi|fr|de|pt)$/, '/');`
);
baseLayout = baseLayout.replace(
  "const urlHi = new URL('/hi' + pathWithoutLang.replace(/\\/$/, '') + '/', siteBase).href;",
  "const urlHi = new URL('/hi' + pathWithoutLang.replace(/\\/$/, '') + '/', siteBase).href;\nconst urlFr = new URL('/fr' + pathWithoutLang.replace(/\\/$/, '') + '/', siteBase).href;\nconst urlDe = new URL('/de' + pathWithoutLang.replace(/\\/$/, '') + '/', siteBase).href;\nconst urlPt = new URL('/pt' + pathWithoutLang.replace(/\\/$/, '') + '/', siteBase).href;"
);
baseLayout = baseLayout.replace(
  '<link rel="alternate" hreflang="hi" href={urlHi.replace(/\\/\\/$/, \'/\')} />',
  '<link rel="alternate" hreflang="hi" href={urlHi.replace(/\\/\\/$/, \'/\')} />\n    <link rel="alternate" hreflang="fr" href={urlFr.replace(/\\/\\/$/, \'/\')} />\n    <link rel="alternate" hreflang="de" href={urlDe.replace(/\\/\\/$/, \'/\')} />\n    <link rel="alternate" hreflang="pt" href={urlPt.replace(/\\/\\/$/, \'/\')} />'
);
fs.writeFileSync('src/layouts/BaseLayout.astro', baseLayout);

// 3. Update ComparisonTable.astro
let compTable = fs.readFileSync('src/components/ComparisonTable.astro', 'utf8');
const oldMapRows = `        ["Signup required",      "No",          "No (basic)",      "Yes"],`;
const newMapRows = `        ["Languages",            "6",           "1 (English)",     "1 (English)"],
        ["Currencies",           "10+",         "1 (USD)",         "3"],
        ["Tax systems",          "7",           "1 (US)",          "2"],
        ["Signup required",      "No",          "No (basic)",      "Yes"],`;
compTable = compTable.replace(oldMapRows, newMapRows);
fs.writeFileSync('src/components/ComparisonTable.astro', compTable);

// 4. Update index.astro
let indexAstro = fs.readFileSync('src/pages/index.astro', 'utf8');
const oldPrivacy = `<div class="text-center max-w-2xl mx-auto pb-10">
          <h2 class="text-lg font-bold text-slate-900 mb-2">Our Privacy Promise</h2>`;

const globalSection = `
        <div class="mb-20 text-center">
          <h2 class="text-3xl font-bold text-slate-900 mb-8">Built for Freelancers Worldwide</h2>
          <div class="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
            <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 class="font-bold text-slate-900 mb-2">🌍 Multi-language</h3>
              <p class="text-slate-600 text-sm">Supports 6 languages: English, Spanish, French, German, Portuguese, and Hindi.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 class="font-bold text-slate-900 mb-2">💱 Multi-currency</h3>
              <p class="text-slate-600 text-sm">Works with 10+ currencies including USD, EUR, GBP, INR, CAD, AUD and more.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 class="font-bold text-slate-900 mb-2">🏛 Regional Taxes</h3>
              <p class="text-slate-600 text-sm">Tax fields for US Sales Tax, EU VAT, UK VAT, India GST, Canada GST/HST, Australia GST, and UAE VAT.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 class="font-bold text-slate-900 mb-2">📅 Smart Dates</h3>
              <p class="text-slate-600 text-sm">Date formats intelligently adapt to your locale automatically (MM/DD/YYYY, DD/MM/YYYY, etc).</p>
            </div>
          </div>
        </div>
`;

indexAstro = indexAstro.replace(oldPrivacy, globalSection + oldPrivacy);
fs.writeFileSync('src/pages/index.astro', indexAstro);

console.log('All files updated');
