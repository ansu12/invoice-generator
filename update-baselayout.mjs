import fs from 'fs';
let content = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

const hreflangLogic = `const canonicalURL = canonical
  ? new URL(canonical, siteBase).href
  : new URL(Astro.url.pathname, siteBase).href;

const pathWithoutLang = Astro.url.pathname.replace(/^\\/(es|hi)\\//, '/').replace(/^\\/(es|hi)$/, '/');
const urlEn = new URL(pathWithoutLang, siteBase).href;
const urlEs = new URL('/es' + pathWithoutLang.replace(/\\/$/, '') + '/', siteBase).href;
const urlHi = new URL('/hi' + pathWithoutLang.replace(/\\/$/, '') + '/', siteBase).href;
`;

const hreflangTags = `<link rel="canonical" href={canonicalURL} />
    
    <!-- Hreflang Tags -->
    <link rel="alternate" hreflang="en" href={urlEn} />
    <link rel="alternate" hreflang="es" href={urlEs.replace(/\\/\\/$/, '/')} />
    <link rel="alternate" hreflang="hi" href={urlHi.replace(/\\/\\/$/, '/')} />
    <link rel="alternate" hreflang="x-default" href={urlEn} />`;

content = content.replace(/const canonicalURL = canonical[\s\S]*?: new URL\(Astro\.url\.pathname, siteBase\)\.href;/, hreflangLogic);
content = content.replace('<link rel="canonical" href={canonicalURL} />', hreflangTags);

fs.writeFileSync('src/layouts/BaseLayout.astro', content);
console.log('BaseLayout updated');
