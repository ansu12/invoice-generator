import fs from 'fs';
let content = fs.readFileSync('src/lib/types.ts', 'utf8');

content = content.replace(
  'invoiceDate: string;',
  'invoiceDate: string;\n  dueDate: string;\n  dateFormat: string;'
);

// We had dueDate: string; already, let's just make sure we don't duplicate it.
// Actually, let's do an exact replace:
let cleanContent = fs.readFileSync('src/lib/types.ts', 'utf8');
cleanContent = cleanContent.replace(
  '  dueDate: string;\n',
  '  dueDate: string;\n  dateFormat: string;\n'
);

fs.writeFileSync('src/lib/types.ts', cleanContent);
console.log('types.ts updated');
