import fs from "fs";
const files = [
  "src/pages/blog/index.astro",
  "src/pages/blog/how-to-create-invoice-freelancer.astro",
  "src/pages/blog/invoice-vs-receipt.astro",
  "public/sitemap.xml"
];

for (const file of files) {
  try {
    let content = fs.readFileSync(file);
    
    // Check for UTF-8 BOM and remove if present (EF BB BF)
    if (content.length >= 3 && content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
      content = content.slice(3);
    }
    
    // Ensure the file is valid UTF-8 string, then write back
    const str = content.toString('utf8');
    fs.writeFileSync(file, str, 'utf8');
    console.log("Fixed: " + file);
  } catch (e) {
    console.error("Error with " + file, e);
  }
}
