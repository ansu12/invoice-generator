import fs from "fs";
const files = [
  "src/pages/freelancer-invoice-template.astro",
  "src/pages/consulting-invoice-template.astro"
];

for (const file of files) {
  try {
    let content = fs.readFileSync(file);
    if (content.length >= 3 && content[0] === 0xef && content[1] === 0xbb && content[2] === 0xbf) {
      content = content.slice(3);
    }
    fs.writeFileSync(file, content.toString('utf8'), 'utf8');
    console.log("Fixed: " + file);
  } catch (e) {
    console.error("Error", e);
  }
}
