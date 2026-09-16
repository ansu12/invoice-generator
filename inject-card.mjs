import fs from 'fs';
const file = 'src/components/InvoiceGenerator.tsx';
let code = fs.readFileSync(file, 'utf8');

const cardCode = `
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-[12px] p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600"><path d="M12 2L2 22h20L12 2z"/></svg>
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-600"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    Need to automate your invoicing?
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    For recurring clients and automatic payment reminders, freelancers love FreshBooks.
                  </p>
                  <a href="https://www.freshbooks.com/" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 font-semibold py-2.5 px-4 rounded-[8px] transition-colors text-center text-sm shadow-sm">
                    Try FreshBooks Free
                  </a>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    We may earn a commission if you sign up. This keeps our tool free.
                  </p>
                </div>
              </div>
            </div>{/* end LEFT */}`;

code = code.replace('            </div>{/* end LEFT */}', cardCode);

fs.writeFileSync(file, code);
console.log('Injected Recommendation Card!');
