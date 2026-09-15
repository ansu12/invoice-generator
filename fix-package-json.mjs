import fs from 'fs';
let content = fs.readFileSync('package.json', 'utf8');

// Change "deploy": "npm run build && wrangler deploy" to "deploy": "npm run build"
content = content.replace(
  '"deploy": "npm run build && wrangler deploy"',
  '"deploy": "npm run build"'
);

fs.writeFileSync('package.json', content);
