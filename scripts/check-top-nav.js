const fs = require("fs");
const i = fs.readFileSync("d:/1506-new/index.html", "utf8");
const start = i.indexOf('<nav class="dg-mega');
const end = i.indexOf("</nav>", start);
const nav = i.slice(start, end);
const desktop = nav.split("dg-mega__drawer")[0];
const labels = [];
const re = /class="dg-mega__(?:link|cta)[^"]*">([^<]+)/g;
let m;
while ((m = re.exec(desktop))) {
  // skip panel-all links which use different class
  labels.push(m[1].replace(/\s*▾\s*$/, "").trim());
}
console.log(labels.join(" | "));
console.log("has India top?", /href="india-market\/"[^>]*>India Market</.test(desktop.split("dg-mega__panel")[0]));
