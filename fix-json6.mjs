import fs from 'fs';
import path from 'path';

const blogDir = 'src/pages/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

blogFiles.forEach(f => {
  const p = path.join(blogDir, f);
  let content = fs.readFileSync(p, 'utf-8');
  
  // Strip anything that looks like a <script> block completely to fix all these AST errors
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  
  fs.writeFileSync(p, content);
  console.log(`Nuked ALL scripts from ${f}`);
});
