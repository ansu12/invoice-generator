import fs from 'fs';
let content = fs.readFileSync('src/lib/pdf-generator.ts', 'utf8');

// Remove static imports
content = content.replace(/import jsPDF from 'jspdf';\nimport autoTable from 'jspdf-autotable';\n/g, '');

// Inject dynamic import inside function
content = content.replace('const doc = new jsPDF({ unit: \'in\', format: \'letter\' });', 
`const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');
  const doc = new jsPDF({ unit: 'in', format: 'letter' });`);

fs.writeFileSync('src/lib/pdf-generator.ts', content);
