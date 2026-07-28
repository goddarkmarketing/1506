const fs = require("fs");
const h = fs.readFileSync("d:/1506-new/index.html", "utf8");

function around(needle, before = 80, after = 600) {
  const i = h.indexOf(needle);
  console.log("\n====", needle, "@", i, "====");
  if (i < 0) return;
  console.log(h.slice(Math.max(0, i - before), i + after));
}

around("dg-hero-heading");
around("ออกแบบทริปตามงบคุณได้เลย");
around("สนามเด็กเล่น");
around("Mallika");
around('id="merchandising"');
around("dg-chrome-footer");
around("dg-line-oa");
around("ทัวร์ครบวงจร");

// list local destination images
const imgs = fs.readdirSync("d:/1506-new/images").filter((f) =>
  /\.(jpg|jpeg|png|webp)$/i.test(f)
);
console.log("\nimages count", imgs.length);
console.log(imgs.filter((f) => /dg-|phuket|songkhla|chiang|bangkok|beach|island/i.test(f)).join("\n"));
