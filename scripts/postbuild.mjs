import fs from 'fs';

const entryPath = 'dist/server/entry.mjs';
if (fs.existsSync(entryPath)) {
  let content = fs.readFileSync(entryPath, 'utf8');
  if (!content.includes('googlefd9ca7f0ee134f79')) {
    content = content.replace(
      'async function handle(request, env, context) {',
      `async function handle(request, env, context) {
\tconst _url = new URL(request.url);
\tif (_url.pathname === '/googlefd9ca7f0ee134f79.html' || _url.pathname === '/googlefd9ca7f0ee134f79') {
\t\treturn new Response('google-site-verification: googlefd9ca7f0ee134f79.html', {
\t\t\tstatus: 200,
\t\t\theaders: { 'content-type': 'text/html; charset=utf-8' }
\t\t});
\t}`
    );
    fs.writeFileSync(entryPath, content);
    console.log('Successfully patched dist/server/entry.mjs');
  }
}

const wranglerPath = 'dist/server/wrangler.json';
if (fs.existsSync(wranglerPath)) {
  const config = JSON.parse(fs.readFileSync(wranglerPath, 'utf8'));
  if (config.assets) {
    config.assets.html_handling = 'none';
  }
  fs.writeFileSync(wranglerPath, JSON.stringify(config, null, 2));
  console.log('Successfully patched dist/server/wrangler.json');
}

fs.writeFileSync('public/googlefd9ca7f0ee134f79.html', 'google-site-verification: googlefd9ca7f0ee134f79.html');
if (fs.existsSync('dist/client')) {
  fs.writeFileSync('dist/client/googlefd9ca7f0ee134f79.html', 'google-site-verification: googlefd9ca7f0ee134f79.html');
}
console.log('Postbuild verification check complete.');
