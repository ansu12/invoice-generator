import fs from 'fs';
import path from 'path';

const blogDir = 'src/pages/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

blogFiles.forEach(f => {
  const p = path.join(blogDir, f);
  let content = fs.readFileSync(p, 'utf-8');
  
  // Nuke EVERYTHING between <Fragment slot="schema"> and </Fragment>
  content = content.replace(/<Fragment slot="schema">[\s\S]*?<\/Fragment>/g, '');
  
  // Just in case it's not wrapped in Fragment
  content = content.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '');
  
  fs.writeFileSync(p, content);
  console.log(`Nuked schema from ${f}`);
});
