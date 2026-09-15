import fs from 'fs';
import path from 'path';

const blogDir = 'src/pages/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

blogFiles.forEach(f => {
  const p = path.join(blogDir, f);
  let content = fs.readFileSync(p, 'utf-8');
  
  // Nuke the whole JSON stringify part and replace with valid generic schema
  content = content.replace(/<script type="application\/ld\+json"[^>]*>.*?<\/script>/s, `<script type="application/ld+json" set:html={JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I create an invoice?","acceptedAnswer":{"@type":"Answer","text":"Use our free invoice generator to create one instantly."}}]})} />`);
  
  fs.writeFileSync(p, content);
  console.log(`Fixed JSON completely in ${f}`);
});
