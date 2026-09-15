import fs from 'fs';
let footer = fs.readFileSync('src/components/Footer.astro', 'utf8');

// The footer currently has links for the 5 tools. Let's add a new section for E-E-A-T links.
// I'll just append it before the final copyright </div>
const eeatLinks = `
      <div class="mt-8 border-t border-slate-200 pt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
        <a href="/about" class="hover:text-blue-600 transition-colors">About Us</a>
        <a href="/privacy" class="hover:text-blue-600 transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-blue-600 transition-colors">Terms of Service</a>
        <a href="mailto:support@invoicegen.com" class="hover:text-blue-600 transition-colors">Contact</a>
        <a href="/sitemap-index.xml" class="hover:text-blue-600 transition-colors">Sitemap</a>
      </div>
`;

if (!footer.includes('/privacy')) {
  footer = footer.replace('</p>\n    </div>\n  </div>\n</footer>', `</p>\n    </div>\n${eeatLinks}  </div>\n</footer>`);
  fs.writeFileSync('src/components/Footer.astro', footer);
  console.log('Footer updated!');
} else {
  console.log('Footer already updated.');
}
