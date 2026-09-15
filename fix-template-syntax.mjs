import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

// The line is mangled, let's find it. It looks like:
// export default function InvoiceGenerator({ lang = defaultLang, initialData }: { lang?: string; initialData?: Partial<InvoiceData> }) {({ initialData, lang = defaultLang }: ComponentProps = {}) {
// or something similar.

const regex = /export default function InvoiceGenerator\([^)]+\)\s*\{\([^)]+\)\s*\{/;
const simpleRegex = /export default function InvoiceGenerator[^{]+(?:\{[^{]+\})?\s*\{.*?(?=\{)/; 
// Let's just fix it manually by grabbing lines 145-155.
const lines = content.split('\n');
const fix = lines.map(l => {
    if (l.includes('export default function InvoiceGenerator')) {
        return 'export default function InvoiceGenerator({ lang = defaultLang, initialData }: { lang?: string; initialData?: Partial<InvoiceData> }) {';
    }
    return l;
});

fs.writeFileSync('src/components/InvoiceGenerator.tsx', fix.join('\n'));
console.log('Fixed syntax error');
