export function formatDate(dateStr: string, format: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  const [y, m, d] = parts;

  if (format === 'MM/DD/YYYY') return `${m}/${d}/${y}`;
  if (format === 'DD/MM/YYYY') return `${d}/${m}/${y}`;
  if (format === 'YYYY-MM-DD') return dateStr;
  
  // 'auto' or default
  try {
    // Use the exact date components to avoid timezone shifts
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return new Intl.DateTimeFormat(undefined).format(date);
  } catch (e) {
    return dateStr;
  }
}
