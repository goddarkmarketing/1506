const fs = require("fs");
const path = require("path");

const xmlPath = path.join(process.env.TEMP, "edit-web-docx", "word", "document.xml");
const outPath = path.join(process.env.TEMP, "edit-web-text.txt");
const xml = fs.readFileSync(xmlPath, "utf8");

function decode(text) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

const paras = [...xml.matchAll(/<w:p[\s\S]*?<\/w:p>/g)]
  .map((m) => {
    const texts = [...m[0].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((t) =>
      decode(t[1])
    );
    return texts.join("").trim();
  })
  .filter(Boolean);

fs.writeFileSync(outPath, paras.join("\n"), "utf8");
console.log(paras.join("\n"));
