const fs = require("fs");
const path = require("path");

const bad = [
  "dg-hero-egypt",
  "destinations/dubai.jpg",
  "destinations/europe.jpg",
  "destinations/switzerland.jpg",
  "destinations/japan.jpg",
  "destinations/korea.jpg",
];
const roots = [
  "travel-services",
  "mice",
  "events",
  "destination-weddings",
  "india-market",
  "about",
  "gallery",
  "articles",
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "index.html") acc.push(p);
  }
  return acc;
}

const issues = [];
for (const r of roots) {
  for (const f of walk(r)) {
    const html = fs.readFileSync(f, "utf8");
    for (const b of bad) {
      if (html.includes(b)) issues.push(`${f}: ${b}`);
    }
  }
}
console.log("landmark/homepage issues on service hubs:", issues.length);
issues.forEach((i) => console.log(" ", i));

function listImgs(file) {
  const html = fs.readFileSync(file, "utf8");
  return [...html.matchAll(/src="([^"]*images[^"]+)"/g)].map((m) => m[1]);
}

console.log("\nHotel Reservations:");
listImgs("travel-services/hotel-reservations/index.html").forEach((i) =>
  console.log(" ", i)
);
console.log("\nTransportation:");
listImgs("travel-services/transportation-transfers/index.html").forEach((i) =>
  console.log(" ", i)
);
console.log("\nMeetings:");
listImgs("mice/meetings/index.html").forEach((i) => console.log(" ", i));
console.log("\nHomepage still has egypt?", fs.readFileSync("index.html", "utf8").includes("dg-hero-egypt"));
