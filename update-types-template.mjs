import fs from 'fs';
let content = fs.readFileSync('src/lib/types.ts', 'utf8');

if (!content.includes('activeTemplate')) {
  content = content.replace(
    '  taxRate: number;\n}',
    '  taxRate: number;\n  activeTemplate?: string;\n}'
  );
  fs.writeFileSync('src/lib/types.ts', content);
  console.log('types.ts updated');
}
