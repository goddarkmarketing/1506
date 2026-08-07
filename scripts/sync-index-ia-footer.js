const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const footer = fs
  .readFileSync(path.join(root, "includes", "site-footer.html"), "utf8")
  .replace(/^<!--[\s\S]*?-->\s*/, "")
  .trim();

const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
const re = /<footer class="dg-chrome-footer">[\s\S]*?<\/footer>/;
if (!re.test(index)) throw new Error("no chrome footer in index.html");
index = index.replace(re, footer);

if (!index.includes("dg-mega-toggle-js")) {
  index = index.replace(
    "</body>",
    `<script id="dg-mega-toggle-js">(function(){var btn=document.querySelector(".dg-mega__toggle");var drawer=document.getElementById("dg-mega-drawer");if(!btn||!drawer)return;btn.addEventListener("click",function(){var open=btn.getAttribute("aria-expanded")==="true";btn.setAttribute("aria-expanded",open?"false":"true");drawer.hidden=open;});})();</script></body>`
  );
}

fs.writeFileSync(indexPath, index);
console.log("index footer synced; localhost count:", (index.match(/localhost:3000/g) || []).length);
