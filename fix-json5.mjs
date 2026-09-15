import fs from 'fs';
import path from 'path';

const blogDir = 'src/pages/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

blogFiles.forEach(f => {
  const p = path.join(blogDir, f);
  const lines = fs.readFileSync(p, 'utf-8').split('\n');
  const fixedLines = lines.filter(l => !l.includes('<script type="application/ld+json"'));
  fs.writeFileSync(p, fixedLines.join('\n'));
  console.log(`Fixed ${f}`);
});
