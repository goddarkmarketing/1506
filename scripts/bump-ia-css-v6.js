const fs = require("fs");
const path = require("path");

function bumpFile(file) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("dg-ia-pages.css")) return false;
  const next = html.replace(/dg-ia-pages\.css\?v=\d+/g, "dg-ia-pages.css?v=6");
  if (next !== html) {
    fs.writeFileSync(file, next);
    return true;
  }
  return false;
}

const root = "d:/1506-new";
let n = 0;
if (bumpFile(path.join(root, "index.html"))) n++;

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name === "index.html" && bumpFile(full)) n++;
  }
}

[
  "about",
  "travel-services",
  "mice",
  "destination-weddings",
  "destinations",
  "proposal",
  "contact",
  "articles",
  "events",
  "india-market",
  "gallery",
].forEach((d) => walk(path.join(root, d)));

console.log("bumped", n, "files to v=6");
