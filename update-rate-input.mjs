import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

const oldInput = `<input className={\`\${inputCls} text-right\`} type="number" min="0" step="0.01"
                        placeholder="0.00" value={item.rate || ""}
                        onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)} />`;

const newInput = `<div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400 font-medium text-sm">
                          {sym}
                        </div>
                        <input className={\`\${inputCls} text-right pl-7\`} type="number" min="0" step="0.01"
                          placeholder="0.00" value={item.rate || ""}
                          onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)} />
                      </div>`;

content = content.replace(oldInput, newInput);
fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('Rate input updated');
