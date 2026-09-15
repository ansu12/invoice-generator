import fs from 'fs';
import path from 'path';

const blogDir = 'src/pages/blog';
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.astro'));

blogFiles.forEach(f => {
  const p = path.join(blogDir, f);
  let content = fs.readFileSync(p, 'utf-8');
  
  // Re-fix the JSON syntax error (the regex replaced ?" with — in JSON strings)
  // Example bad: "name":"Why is invoice template pdf important?—,
  // Example good: "name":"Why is invoice template pdf important?","
  
  content = content.replace(/important?—,/g, 'important?","');
  content = content.replace(/up?—,/g, 'up?","');
  content = content.replace(/software?—,/g, 'software?","');
  content = content.replace(/started?—,/g, 'started?","');
  content = content.replace(/—,/g, '",'); // generic fix if they end with ?
  
  fs.writeFileSync(p, content);
  console.log(`Fixed JSON in ${f}`);
});
