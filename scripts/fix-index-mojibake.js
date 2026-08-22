const fs = require("fs");

/** Encode a JS string to Windows-1252 bytes (inverse of typical mojibake). */
const WIN1252_EXTRA = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a,
  0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92,
  0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c,
  0x017e: 0x9e, 0x0178: 0x9f,
};

function encodeWindows1252(str) {
  const out = Buffer.alloc(str.length);
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c <= 0xff && !(c >= 0x80 && c <= 0x9f)) {
      out[i] = c;
    } else if (WIN1252_EXTRA[c] != null) {
      out[i] = WIN1252_EXTRA[c];
    } else if (c <= 0xff) {
      out[i] = c;
    } else {
      // Unmappable — keep as '?'
      out[i] = 0x3f;
    }
  }
  return out;
}

function fixMojibake(str) {
  return encodeWindows1252(str).toString("utf8");
}

const path = "D:/1506-new/index.html";
const raw = fs.readFileSync(path, "utf8");
const fixed = fixMojibake(raw);

const thai = fixed.match(/[\u0E00-\u0E7F]/g);
console.log("Thai chars after fix:", thai ? thai.length : 0);
console.log("block titles:", [...fixed.matchAll(/dg-chrome-footer__block-title">([^<]+)/g)].map((m) => m[1]));
console.log("col titles sample:", [...fixed.matchAll(/dg-chrome-footer__col-title[^"]*">([^<]+)/g)].slice(0, 4).map((m) => m[1]));
console.log("copyright:", fixed.match(/Copyright [^<]+/)?.[0]);
console.log("still mojibake à¸?", /à¸/.test(fixed));
console.log("chars >255 unmapped as ?:", (fixed.match(/\?/g) || []).length - (raw.match(/\?/g) || []).length);

// sanity: doctype and scripts still there
console.log("has hero slider js:", fixed.includes("dg-hero-slider-js"));
console.log("has cta dock:", fixed.includes("dg-cta-dock"));

if (/à¸|à¹/.test(fixed) || !(thai && thai.length > 100)) {
  console.error("FIX LOOKS BAD — abort write");
  process.exit(1);
}

fs.writeFileSync(path, fixed, "utf8");
console.log("wrote", path);
