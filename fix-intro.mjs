import fs from 'fs';
let content = fs.readFileSync('src/pages/index.astro', 'utf8');
content = content.replace(
  'No signup. No watermarks. No limits. Fill in your details, add line items,\n        and download a clean PDF invoice&nbsp;&mdash;&nbsp;instantly.',
  'Welcome to the best free online invoice generator. No signup, no watermarks, and no limits. Fill in your details, add line items, and download a clean PDF invoice instantly.'
);
fs.writeFileSync('src/pages/index.astro', content);
