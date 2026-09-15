import fs from 'fs';
let content = fs.readFileSync('src/components/Navbar.astro', 'utf8');

const importStatement = `import LanguageSwitcher from './LanguageSwitcher.astro';\nconst currentPath = Astro.url.pathname;`;
content = content.replace('const currentPath = Astro.url.pathname;', importStatement);

const ctaAndLang = `<div class="flex items-center gap-3">
      <LanguageSwitcher />
      <a
        href="#invoice-tool"
        class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
      >Create Invoice</a>
    </div>`;

content = content.replace(/<a\s*href="#invoice-tool"[\s\S]*?>Create Invoice<\/a>/, ctaAndLang);

fs.writeFileSync('src/components/Navbar.astro', content);
console.log('Navbar updated');
