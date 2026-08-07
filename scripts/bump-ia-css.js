const fs = require("fs");
const p = "d:/1506-new/index.html";
let i = fs.readFileSync(p, "utf8");
i = i.split("dg-ia-pages.css?v=1").join("dg-ia-pages.css?v=2");
fs.writeFileSync(p, i);
console.log(i.includes("dg-ia-pages.css?v=2") ? "bumped" : "not found");
