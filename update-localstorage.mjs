import fs from 'fs';
let content = fs.readFileSync('src/components/InvoiceGenerator.tsx', 'utf8');

const oldInit = `  const [data, setData] = useState<InvoiceData>(() => {
    const def = getDefaultData();
    return initialData
      ? {
          ...def,
          ...initialData,
          items: initialData.items?.length ? initialData.items : def.items,
        }
      : def;
  });`;

const newInit = `  const [data, setData] = useState<InvoiceData>(() => {
    const def = getDefaultData();
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('invoicegen_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...def, ...parsed, items: parsed.items?.length ? parsed.items : def.items };
        }
      } catch (e) {}
    }
    return initialData
      ? {
          ...def,
          ...initialData,
          items: initialData.items?.length ? initialData.items : def.items,
        }
      : def;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('invoicegen_data', JSON.stringify(data));
    }
  }, [data]);`;

content = content.replace(oldInit, newInit);
fs.writeFileSync('src/components/InvoiceGenerator.tsx', content);
console.log('localStorage updated');
