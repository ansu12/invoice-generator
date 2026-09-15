import fs from 'fs';

// 1. astro.config.mjs
let astroConfig = fs.readFileSync('astro.config.mjs', 'utf8');
astroConfig = `import cloudflare from '@astrojs/cloudflare';\n` + astroConfig;
astroConfig = astroConfig.replace('output: \'static\',', 'output: \'server\',\n  adapter: cloudflare(),');
fs.writeFileSync('astro.config.mjs', astroConfig);

// 2. package.json
let pkg = fs.readFileSync('package.json', 'utf8');
pkg = pkg.replace('"deploy": "npm run build"', '"deploy": "npm run build && wrangler deploy"');
fs.writeFileSync('package.json', pkg);

// 3. wrangler.jsonc
const wranglerJsonc = `{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "invoice-generator",
  "compatibility_date": "2026-09-15",
  "main": "./dist/_worker.js/index.js",
  "assets": {
    "directory": "./dist/client",
    "binding": "ASSETS"
  }
}`;
fs.writeFileSync('wrangler.jsonc', wranglerJsonc);

console.log('Worker config restored');
