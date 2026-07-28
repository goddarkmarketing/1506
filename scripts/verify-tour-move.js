const fs = require("fs");
const h = fs.readFileSync("d:/1506-new/index.html", "utf8");
const i = h.indexOf("dg-tour-overlap");
console.log("overlap at", i);
console.log(h.slice(Math.max(0, i - 180), i + 420));
console.log("---");
console.log("moved comment", h.includes("dg-tour-search moved"));
console.log("search ids", (h.match(/id="dg-tour-search"/g) || []).length);
