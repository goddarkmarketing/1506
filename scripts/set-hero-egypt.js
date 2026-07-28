const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(
  'src="images/dg-phuket.jpg"',
  'src="images/dg-hero-egypt.png?v=hero20260728"'
);

const lazyStart = html.indexOf('class="r-13t5eql r-417010"');
if (lazyStart < 0) {
  console.error("lazy hero img not found");
  process.exit(1);
}
const imgStart = html.lastIndexOf("<img", lazyStart);
const imgEnd = html.indexOf(">", lazyStart) + 1;
const oldLazy = html.slice(imgStart, imgEnd);
const newLazy =
  '<img loading="eager" importance="high" decoding="async" width="100%" height="100%" class="r-13t5eql r-417010 dg-hero-bg" src="images/dg-hero-egypt.png?v=hero20260728" alt="" style="object-fit:cover;object-position:center right">';
html = html.slice(0, imgStart) + newLazy + html.slice(imgEnd);

// Remove secondary hero img (blur/local duplicate)
html = html.replace(
  /<img loading="eager" importance="high" src="images\/dg-hero-egypt\.png" decoding="async" width="100%" height="100%" class="r-u8s1d r-1wyyakw"[^>]*>/,
  ""
);
html = html.replace(
  /<img loading="eager" importance="high" src="images\/dg-phuket\.jpg" decoding="async" width="100%" height="100%" class="r-u8s1d r-1wyyakw"[^>]*>/,
  ""
);

fs.writeFileSync(indexPath, html, "utf8");
console.log({
  egypt: html.includes("dg-hero-egypt.png"),
  phuket: html.includes("dg-phuket.jpg"),
  imagekitOld: html.includes("1760028620296-06202d013558f43b27b5d2e702f6c18a"),
  secondaryLeft: html.includes("r-1wyyakw"),
  oldLazySnippet: oldLazy.slice(0, 120),
});
