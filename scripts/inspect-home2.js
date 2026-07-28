const fs = require("fs");
const h = fs.readFileSync("d:/1506-new/index.html", "utf8");

const start = h.indexOf('<h1 aria-level="1"');
console.log("h1 start", start);
console.log(h.slice(start, start + 1800));

// Find hero bg images near navbar-offset
const heroStart = h.indexOf('id="navbar-offset"');
console.log("\nhero block start", heroStart);
console.log(h.slice(heroStart, heroStart + 2500).replace(/srcset="[^"]+"/g, 'srcset="..."'));

// Find insertion point: after hero section before merchandising
const merch = h.indexOf('id="merchandising"');
console.log("\nbefore merch:", h.slice(merch - 500, merch + 100));

// Tabs near budget section
const budget = h.indexOf("ออกแบบทริปตามงบคุณได้เลย");
console.log("\nbudget tabs area:");
const chunk = h.slice(budget, budget + 3500);
const labels = [...chunk.matchAll(/font-weight:600[^>]*>([^<]+)</g)].map((m) => m[1]);
console.log(labels);

// Product titles under playground
const mallika = h.indexOf("Mallika");
console.log("\nproduct alts:");
const prodChunk = h.slice(mallika - 200, mallika + 8000);
const alts = [...prodChunk.matchAll(/alt="([^"]+)"/g)].map((m) => m[1]);
console.log(alts.slice(0, 15));
