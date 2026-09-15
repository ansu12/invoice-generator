import fs from 'fs';
let content = fs.readFileSync('src/layouts/BaseLayout.astro', 'utf8');

const headEndTarget = `    <!-- Structured data slot — pages inject their own schemas here -->
    <slot name="schema" />
  </head>`;

const adsenseCode = `    <!-- Google AdSense Placeholder -->
    <!-- Replace 'ca-pub-0000000000000000' with your actual AdSense Publisher ID -->
    <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" crossorigin="anonymous"></script> -->

    <!-- Structured data slot — pages inject their own schemas here -->
    <slot name="schema" />
  </head>`;

content = content.replace(headEndTarget, adsenseCode);
fs.writeFileSync('src/layouts/BaseLayout.astro', content);
console.log('AdSense added to BaseLayout');
