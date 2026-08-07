const fs = require("fs");
const path = require("path");

const root = "d:/1506-new";
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const start = html.indexOf('<div class="css-1dbjc4n r-bztko3');
const offsetMark = html.indexOf('id="navbar-offset"');
if (start < 0 || offsetMark < 0) {
  console.error("Could not find header bounds", { start, offsetMark });
  process.exit(1);
}

// Include sticky header up to (but not including) navbar-offset wrapper start
// Find the opening of the navbar-offset div
const offsetDivStart = html.lastIndexOf("<div", offsetMark);
const headerHtml = html.slice(start, offsetDivStart);

console.log("header bytes", headerHtml.length);
console.log("starts with", headerHtml.slice(0, 120));
console.log("ends with", headerHtml.slice(-200));

// Count key pieces
for (const needle of ["dg-mega", "dg-brand-link", "My Tours", "dg-marquee", "Log In", "Sign Up"]) {
  console.log(needle, (headerHtml.match(new RegExp(needle, "g")) || []).length);
}

fs.writeFileSync(path.join(root, "includes", "site-header.raw.html"), headerHtml);
console.log("wrote includes/site-header.raw.html");
