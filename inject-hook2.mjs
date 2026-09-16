import fs from 'fs';
const file = 'src/components/InvoiceGenerator.tsx';
let code = fs.readFileSync(file, 'utf8');

code = 'import SubscribeHook from "./SubscribeHook";\n' + code;

fs.writeFileSync(file, code);
console.log('Injected import!');
