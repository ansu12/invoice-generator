import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

const lockNote = `<p className="text-xs text-slate-500 text-center mt-3 mt-4">
              🔒 Your invoice is generated in your browser. Nothing is uploaded to any server.
            </p>`;

// We want it near the download button in the preview column.
// Look for where the download / whatsapp buttons are.
// In the current file, the buttons are below the preview.
const target = `{/* Preview Header */}`;
const replaceWith = `${lockNote}\n\n            {/* Preview Header */}`;

if (content.includes('{/* Preview Header */}')) {
    content = content.replace('{/* Preview Header */}', replaceWith);
} else {
    // Maybe they are placed somewhere else, let's just append to the buttons
    const buttonsTarget = `Share via WhatsApp"}</>\n                  )}\n                </button>\n              </div>`;
    const buttonsReplace = `${buttonsTarget}\n              ${lockNote}`;
    content = content.replace(buttonsTarget, buttonsReplace);
}

fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('InvoiceGenerator.tsx updated with lock note');
