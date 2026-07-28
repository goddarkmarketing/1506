const fs = require("fs");
const path = "d:/1506-new/index.html";
let html = fs.readFileSync(path, "utf8");

const BASE = "https://goddarkmarketing.github.io/1506";

// Replace Traveloka OG image
html = html.replace(
  /property="og:image" content="[^"]*"/g,
  `property="og:image" content="${BASE}/images/dg-og.png"`
);

// Ensure twitter image if present
html = html.replace(
  /name="twitter:image" content="[^"]*"/g,
  `name="twitter:image" content="${BASE}/images/dg-og.png"`
);

// Replace favicon link
html = html.replace(
  /<link rel="icon" href="[^"]*">/g,
  `<link rel="icon" href="${BASE}/images/dg-favicon.png" type="image/png"><link rel="apple-touch-icon" href="${BASE}/images/dg-og.png">`
);

// Add og tags if missing twitter
if (!html.includes('property="og:title"')) {
  html = html.replace(
    `property="og:image" content="${BASE}/images/dg-og.png">`,
    `property="og:image" content="${BASE}/images/dg-og.png"><meta property="og:title" content="D&G Holiday Thailand"><meta property="og:description" content="บริการท่องเที่ยวครบวงจร"><meta property="og:type" content="website"><meta name="twitter:card" content="summary"><meta name="twitter:image" content="${BASE}/images/dg-og.png">`
  );
}

// Also fix any leftover traveloka favicon references
html = html.replace(/images\/favicon\.ico/g, "images/dg-favicon.png");

fs.writeFileSync(path, html);
console.log("index updated");
console.log("og:", (html.match(/og:image[^>]*>/) || [])[0]);
console.log("icon:", (html.match(/rel="icon"[^>]*>/) || [])[0]);
