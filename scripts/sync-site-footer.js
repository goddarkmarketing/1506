const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const footer = fs
  .readFileSync(path.join(root, "includes", "site-footer.html"), "utf8")
  .replace(/^<!--[\s\S]*?-->\s*/, "")
  .trim();

function replaceMatchingDiv(html, startMarker) {
  const i0 = html.indexOf(startMarker);
  if (i0 < 0) return null;
  let depth = 0;
  let i = i0;
  let started = false;
  while (i < html.length) {
    if (html.startsWith("<div", i)) {
      depth++;
      started = true;
      const gt = html.indexOf(">", i);
      if (gt < 0) break;
      i = gt + 1;
      continue;
    }
    if (html.startsWith("</div>", i)) {
      depth--;
      const endPos = i + 6;
      if (started && depth === 0) {
        return html.slice(0, i0) + footer + html.slice(endPos);
      }
      i = endPos;
      continue;
    }
    i++;
  }
  return null;
}

function replaceChromeFooter(file) {
  let html = fs.readFileSync(file, "utf8");
  const re = /<footer class="dg-chrome-footer">[\s\S]*?<\/footer>/;
  if (!re.test(html)) {
    console.log("skip (no chrome footer):", file);
    return;
  }
  html = html.replace(re, footer);
  fs.writeFileSync(file, html);
  console.log("updated", path.basename(file));
}

// build-inner-pages.js (optional — template may have been removed)
const buildPath = path.join(root, "build-inner-pages.js");
if (fs.existsSync(buildPath)) {
  let build = fs.readFileSync(buildPath, "utf8");
  const start = build.indexOf("const footer = `");
  const end = build.indexOf("`;", start);
  if (start >= 0 && end >= 0) {
    const indented = footer
      .split("\n")
      .map((line, idx) => (idx === 0 ? "  " + line : "  " + line))
      .join("\n");
    build =
      build.slice(0, start) +
      "const footer = `" +
      indented +
      "`" +
      build.slice(end + 2);
    fs.writeFileSync(buildPath, build);
    console.log("updated build-inner-pages.js");
  } else {
    console.log("skip build-inner-pages.js (no footer template)");
  }
}
replaceChromeFooter(path.join(root, "contact.html"));
replaceChromeFooter(path.join(root, "articles.html"));
if (fs.existsSync(path.join(root, "about.html"))) {
  replaceChromeFooter(path.join(root, "about.html"));
}
if (fs.existsSync(path.join(root, "services.html"))) {
  replaceChromeFooter(path.join(root, "services.html"));
}

// index.html — prefer chrome footer if present, else footer-v2
const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
const chromeRe = /<footer class="dg-chrome-footer">[\s\S]*?<\/footer>/;
if (chromeRe.test(index)) {
  index = index.replace(chromeRe, footer);
  console.log("updated index.html chrome footer");
} else {
  const next = replaceMatchingDiv(index, '<div data-subtree="footer-v2">');
  if (!next) throw new Error("failed to replace footer-v2 in index.html");
  index = next;
  if (!index.includes("dg-chrome.css")) {
    index = index.replace(
      "</head>",
      '<link rel="stylesheet" href="css/dg-chrome.css" /></head>'
    );
  }
  console.log("updated index.html footer-v2");
}
fs.writeFileSync(indexPath, index);
