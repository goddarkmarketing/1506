const fs = require("fs");
const p = "d:/1506-new/index.html";
let s = fs.readFileSync(p, "utf8");

// Avoid double-prefixing stacks that already include Better Together
s = s.replace(/(?<!Better Together",)"Godwit",sans-serif/g, '"Better Together","Godwit",sans-serif');
s = s.replace(
  /font-family:\s*"Godwit",\s*sans-serif/g,
  'font-family: "Better Together", "Godwit", sans-serif'
);
// Clean accidental doubles
s = s.split('"Better Together","Better Together","Godwit"').join('"Better Together","Godwit"');
s = s.split('"Better Together", "Better Together", "Godwit"').join('"Better Together", "Godwit"');

fs.writeFileSync(p, s);
console.log("done");
