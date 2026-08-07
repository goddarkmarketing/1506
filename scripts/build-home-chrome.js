/**
 * Build shared homepage chrome (header HTML + inline CSS) for IA pages.
 * Usage: node scripts/build-home-chrome.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const html = fs.readFileSync(indexPath, "utf8");

function extractStyleBlocks(doc) {
  const blocks = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(doc))) blocks.push(m[1]);
  return blocks;
}

const styles = extractStyleBlocks(html);
if (styles.length < 7) {
  console.warn("Expected multiple style blocks in index.html, found", styles.length);
}

// RN utils (block with stylesheet-group) + stable header/hero fixes + lucide
const chromeCssParts = styles.filter((body) =>
  /stylesheet-group|dg-anchor|r-bztko3|dg-brand-logo|dg-marquee|dg-lucide/.test(body)
);

const chromeCss = `/* Auto-extracted homepage chrome styles for shared header parity */\n${chromeCssParts.join(
  "\n\n"
)}\n`;

fs.writeFileSync(path.join(root, "css", "dg-home-chrome.css"), chromeCss);
console.log(
  "wrote css/dg-home-chrome.css",
  chromeCss.length,
  "bytes from",
  chromeCssParts.length,
  "blocks"
);

const start = html.indexOf('<div class="css-1dbjc4n r-bztko3');
const offsetMark = html.indexOf('id="navbar-offset"');
if (start < 0 || offsetMark < 0) {
  console.error("Could not locate homepage sticky header");
  process.exit(1);
}
const offsetDivStart = html.lastIndexOf("<div", offsetMark);
const headerHtml = html.slice(start, offsetDivStart).trim() + "\n";

fs.mkdirSync(path.join(root, "includes"), { recursive: true });
fs.writeFileSync(path.join(root, "includes", "site-header.html"), headerHtml);
console.log("wrote includes/site-header.html", headerHtml.length, "bytes");

// Smoke checks
for (const needle of ["dg-mega", "dg-brand-link", "My Tours", "dg-marquee", "Log In"]) {
  if (!headerHtml.includes(needle)) console.warn("WARN missing", needle);
}
