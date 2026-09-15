import fs from 'fs';
import path from 'path';

const blogDir = 'src/pages/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

blogFiles.forEach(f => {
  const p = path.join(blogDir, f);
  let content = fs.readFileSync(p, 'utf-8');
  
  // Nuke ALL <script type="application/ld+json"... from blog pages to avoid build errors from corrupted JSON
  content = content.replace(/<script type="application\/ld\+json"[^>]*>.*?<\/script>/s, '');
  content = content.replace(/<Fragment slot="schema">\s*<\/Fragment>/s, '');
  
  fs.writeFileSync(p, content);
  console.log(`Nuked JSON from ${f}`);
});
