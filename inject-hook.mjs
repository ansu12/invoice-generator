import fs from 'fs';
const file = 'src/components/InvoiceGenerator.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('import SubscribeHook')) {
  code = code.replace('import React, { useState, useEffect, useRef, useCallback } from "react";', 'import React, { useState, useEffect, useRef, useCallback } from "react";\nimport SubscribeHook from "./SubscribeHook";');
}

code = code.replace(/<p className="text-center text-xs text-slate-400 mt-3">Live preview[^<]+<\/p>/g, '<p className="text-center text-xs text-slate-400 mt-3">Live preview - updates as you type</p>\n              <SubscribeHook />');

fs.writeFileSync(file, code);
console.log('Injected SubscribeHook!');
