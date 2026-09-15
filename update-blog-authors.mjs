import fs from 'fs';
import path from 'path';

const blogDir = 'src/pages/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

const authorBio = `
      <div class="mt-16 pt-8 border-t border-slate-100 flex items-start gap-6 bg-slate-50 p-8 rounded-2xl">
        <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
          JD
        </div>
        <div>
          <h4 class="text-lg font-bold text-slate-900 mb-2">About Jane Doe</h4>
          <p class="text-slate-600 leading-relaxed text-sm">Jane Doe is a certified financial consultant and small business advocate with over a decade of experience helping freelancers streamline their accounting. She regularly writes about invoicing best practices, cash flow management, and tax compliance.</p>
        </div>
      </div>
`;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // The 10 topical blogs have: <p class="text-slate-500 font-medium">By Jane Doe | Published Sept 15, 2026</p>
  // Let's replace it with a proper structured byline with <time>
  const structuredByline = `
      <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-500 font-medium mt-6">
        <span>By <a href="/about" class="text-blue-600 hover:underline">Jane Doe</a></span>
        <span class="hidden sm:inline">•</span>
        <span>Published: <time datetime="2026-09-15">Sept 15, 2026</time></span>
        <span class="hidden sm:inline">•</span>
        <span>Updated: <time datetime="2026-09-15">Sept 15, 2026</time></span>
      </div>
`;

  if (content.includes('<p class="text-slate-500 font-medium">By Jane Doe | Published Sept 15, 2026</p>')) {
    content = content.replace('<p class="text-slate-500 font-medium">By Jane Doe | Published Sept 15, 2026</p>', structuredByline);
  } else if (!content.includes('Jane Doe')) {
    // For the 2 comparison blogs, they have: <p class="text-lg text-slate-500">An in-depth, unbiased comparison for freelancers and small businesses.</p>
    content = content.replace(
      '<p class="text-lg text-slate-500">An in-depth, unbiased comparison for freelancers and small businesses.</p>',
      `<p class="text-lg text-slate-500 mb-4">An in-depth, unbiased comparison for freelancers and small businesses.</p>\n${structuredByline}`
    );
  }

  // Inject the author bio before the CTA or before </article>
  if (!content.includes('About Jane Doe')) {
    if (content.includes('<div class="mt-12 p-8 bg-blue-50')) {
      content = content.replace('<div class="mt-12 p-8 bg-blue-50', `${authorBio}\n      <div class="mt-12 p-8 bg-blue-50`);
    } else {
      content = content.replace('    </div>\n  </article>', `${authorBio}\n    </div>\n  </article>`);
    }
  }

  fs.writeFileSync(filePath, content);
}

console.log('Blog authors updated!');
