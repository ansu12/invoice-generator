import fs from 'fs';

let content = fs.readFileSync('src/lib/pdf-generator.ts', 'utf8');

// 1. Add TAX_SYSTEMS import
content = content.replace(
  "import { ui, defaultLang } from '../i18n/translations';",
  "import { ui, defaultLang } from '../i18n/translations';\nimport { TAX_SYSTEMS } from './taxes';"
);

// 2. Add tax system helper
content = content.replace(
  'const doc = new jsPDF({ unit: \'in\', format: \'letter\' });',
  `const doc = new jsPDF({ unit: 'in', format: 'letter' });\n  const activeTaxSystem = TAX_SYSTEMS.find(t => t.id === data.taxSystem) || TAX_SYSTEMS[0];\n  const activeTaxLabel = data.taxLabel || t("pdf.tax");`
);

// 3. Update the sender block for EIN / Tax ID
const oldSender = `if (data.fromAddress) {
      doc.text(data.fromAddress, LEFT_X, y);
      y += getLinesHeight(data.fromAddress) + 0.05;
    }
    if (data.fromEIN) {
      doc.text(\`EIN: \${data.fromEIN}\`, LEFT_X, y);
    }`;

const newSender = `if (data.fromAddress) {
      doc.text(data.fromAddress, LEFT_X, y);
      y += getLinesHeight(data.fromAddress) + 0.05;
    }
    if (data.fromEIN && activeTaxSystem.idLabel === "EIN") {
      doc.text(\`EIN: \${data.fromEIN}\`, LEFT_X, y);
    } else if (data.taxId && activeTaxSystem.idLabel !== "EIN") {
      doc.text(\`\${activeTaxSystem.idLabel}: \${data.taxId}\`, LEFT_X, y);
    }`;

content = content.replace(oldSender, newSender);

// 4. Update the Tax row
content = content.replace(
  "renderTotalRow(`${t(\"pdf.tax\")} (${data.taxRate}%)`, fmt(taxAmt));",
  "renderTotalRow(`${activeTaxLabel} (${data.taxRate}%)`, fmt(taxAmt));"
);

fs.writeFileSync('src/lib/pdf-generator.ts', content);
console.log('pdf-generator tax integration complete');
