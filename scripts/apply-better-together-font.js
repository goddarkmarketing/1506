const fs = require("fs");

const files = [
  "d:/1506-new/index.html",
  "d:/1506-new/css/dg-home-edits.css",
  "d:/1506-new/css/dg-site.css",
  "d:/1506-new/css/dg-chrome.css",
  "d:/1506-new/css/dg-about.css",
  "d:/1506-new/web/src/app/globals.css",
  "d:/1506-new/web/src/app/layout.tsx",
];

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log("missing", f);
    continue;
  }
  let s = fs.readFileSync(f, "utf8");
  const before = s;

  s = s.split('"IBM Plex Sans Thai", "Noto Sans Thai", "Prompt", sans-serif').join('"Better Together", "Godwit", sans-serif');
  s = s.split('"IBM Plex Sans Thai", "Godwit", sans-serif').join('"Better Together", "Godwit", sans-serif');
  s = s.split("'IBM Plex Sans Thai', 'Noto Sans Thai', 'Prompt', sans-serif").join("'Better Together', 'Godwit', sans-serif");
  s = s.split("'IBM Plex Sans Thai', 'Godwit', sans-serif").join("'Better Together', 'Godwit', sans-serif");

  s = s.replace(
    /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>\s*/g,
    ""
  );
  s = s.replace(
    /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin \/>\s*/g,
    ""
  );
  s = s.replace(
    /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=IBM\+Plex\+Sans\+Thai:[^"]+" rel="stylesheet" \/>\s*/g,
    ""
  );

  if (s !== before) {
    fs.writeFileSync(f, s);
    console.log("updated", f);
  } else {
    console.log("no change", f);
  }
}
