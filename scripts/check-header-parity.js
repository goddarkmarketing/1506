const fs = require("fs");
const path = require("path");

const home = fs.readFileSync("d:/1506-new/includes/site-header.html", "utf8");
const about = fs.readFileSync("d:/1506-new/about/index.html", "utf8");
const leaf = fs.readFileSync(
  "d:/1506-new/about/company-profile/index.html",
  "utf8"
);

function extractHeader(doc) {
  const start = doc.indexOf('<div class="css-1dbjc4n r-bztko3');
  const end = doc.indexOf("<main>");
  if (start < 0 || end < 0) return null;
  return doc.slice(start, end);
}

function stripDepth(html, depth) {
  if (!depth) return html;
  const prefix = "../".repeat(depth);
  return html.split(prefix).join("");
}

function norm(s) {
  return s.replace(/\s+/g, " ").trim();
}

const aHead = extractHeader(about);
const lHead = extractHeader(leaf);
const nh = norm(home);
const na = norm(stripDepth(aHead, 1));
const nl = norm(stripDepth(lHead, 2));

console.log("about uses home header DOM:", nh === na);
console.log("leaf uses home header DOM:", nh === nl);
console.log("about has My Tours:", about.includes("My Tours"));
console.log("about has dg-home-chrome:", about.includes("dg-home-chrome.css"));
console.log("about still has dg-site-header:", about.includes('class="dg-site-header"'));
console.log(
  "chrome css size:",
  fs.statSync("d:/1506-new/css/dg-home-chrome.css").size
);

if (nh !== na) {
  for (let i = 0; i < Math.min(nh.length, na.length); i++) {
    if (nh[i] !== na[i]) {
      console.log("first about diff @", i);
      console.log("home ", JSON.stringify(nh.slice(i, i + 100)));
      console.log("about", JSON.stringify(na.slice(i, i + 100)));
      break;
    }
  }
  console.log("len home/about", nh.length, na.length);
}
