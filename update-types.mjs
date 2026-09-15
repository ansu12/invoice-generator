import fs from 'fs';
let content = fs.readFileSync('src/lib/types.ts', 'utf8');

const newCurrencies = `export const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AED', symbol: 'د.إ' },
  { code: 'SGD', symbol: 'S$' },
  { code: 'ZAR', symbol: 'R' }
];`;

content = content.replace(/export const CURRENCIES = \[\s*[\s\S]*?\];/, newCurrencies);
fs.writeFileSync('src/lib/types.ts', content);
console.log('Types updated');
