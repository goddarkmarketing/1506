const fs = require("fs");
const p = "d:/1506-new/index.html";
let i = fs.readFileSync(p, "utf8");
i = i
  .split("dg-home-edits.css?v=band73")
  .join("dg-home-edits.css?v=band74")
  .split("dg-ia-pages.css?v=2")
  .join("dg-ia-pages.css?v=3");
fs.writeFileSync(p, i);
console.log("cache bumped");
