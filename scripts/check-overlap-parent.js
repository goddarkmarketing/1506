const fs = require("fs");
const h = fs.readFileSync("d:/1506-new/index.html", "utf8");
const i = h.indexOf('id="dg-tour-overlap"');
const before = h.slice(Math.max(0, i - 500), i);
const after = h.slice(i, i + 200);
console.log("BEFORE:\n", before.slice(-400));
console.log("\nAT:\n", after);

// Is overlap inside r-13awgt0?
const open13 = h.indexOf('class="css-1dbjc4n r-13awgt0"');
const closeBody = h.lastIndexOf("</div></body>");
console.log("\nr-13awgt0 at", open13, "overlap at", i, "overlap after awgt0 start?", i > open13);

// Count div depth roughly from awgt0 to overlap
let depth = 0;
let pos = open13;
while (pos < i && pos !== -1) {
  const nextOpen = h.indexOf("<div", pos + 1);
  const nextClose = h.indexOf("</div>", pos + 1);
  if (nextOpen === -1 && nextClose === -1) break;
  if (nextClose !== -1 && (nextOpen === -1 || nextClose < nextOpen)) {
    depth--;
    pos = nextClose;
  } else {
    depth++;
    pos = nextOpen;
  }
}
console.log("approx depth from r-13awgt0 to overlap:", depth);
