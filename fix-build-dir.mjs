import fs from 'fs';
let content = fs.readFileSync('astro.config.mjs', 'utf8');

if (!content.includes('outDir')) {
  content = content.replace("output: 'static',", "output: 'static',\n  outDir: './build',");
  fs.writeFileSync('astro.config.mjs', content);
  console.log('outDir added!');
}
