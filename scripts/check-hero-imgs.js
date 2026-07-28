const fs = require("fs");
const path = require("path");
const indexPath = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const i = html.indexOf('id="navbar-offset"');
console.log(html.slice(i, i + 1200));
console.log("\n--- phuket occurrences ---");
let idx = 0;
while ((idx = html.indexOf("dg-phuket", idx)) !== -1) {
  console.log(idx, html.slice(idx - 40, idx + 80));
  idx += 8;
}
console.log("\n--- wyyakw ---");
idx = 0;
while ((idx = html.indexOf("r-1wyyakw", idx)) !== -1) {
  console.log(idx, html.slice(idx - 100, idx + 120));
  idx += 8;
}
