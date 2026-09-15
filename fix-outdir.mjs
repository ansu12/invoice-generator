import fs from 'fs';
let astroConfig = fs.readFileSync('astro.config.mjs', 'utf8');
astroConfig = astroConfig.replace(/outDir: '\.\/build',\s*/, '');
fs.writeFileSync('astro.config.mjs', astroConfig);
console.log('outDir removed');
