/**
 * Copy client customer-moment images into images/customers/ for homepage slider.
 * Run: node scripts/import-customer-slider.js
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const imagesRoot = path.join(root, "images");
const outDir = path.join(root, "images", "customers");

function findSourceDir() {
  const direct = path.join(imagesRoot, "รูปจากลูกค้า-20260819T042102Z-1-001", "รูปจากลูกค้า");
  if (fs.existsSync(direct)) return direct;
  for (const name of fs.readdirSync(imagesRoot)) {
    const full = path.join(imagesRoot, name);
    if (!fs.statSync(full).isDirectory()) continue;
    const nested = path.join(full, "รูปจากลูกค้า");
    if (fs.existsSync(nested)) return nested;
  }
  throw new Error("Customer source folder not found under images/");
}

const srcDir = findSourceDir();

const files = [
  "682069628_1485460576708728_3888467049654709532_n.jpg",
  "682098278_1485460543375398_2461342974081947833_n.jpg",
  "682205761_1484406283480824_3923837878105326620_n.jpg",
  "704121074_1503716584883127_7331912605028847424_n.jpg",
  "704427096_1503713871550065_2988675988720604112_n.jpg",
  "707153947_1508919964362789_2601401097102633698_n.jpg",
  "710079262_1511595274095258_2052792142353295229_n.jpg",
  "729437589_2098378790719116_4314353274612251470_n.jpg",
  "729855934_1295824469301217_1157881756153072744_n.jpg",
  "730397864_2248015122629483_2317035885042469318_n.jpg",
  "758778584_1067831675689839_1903088295412664304_n.jpg",
  "759421672_1554711203116804_2230470289579680913_n.jpg",
  "759809881_1005958858975652_6591191195818132133_n.jpg",
  "3488.png",
  "4348.png",
  "764532.png",
  "9344.png",
  "3888888.png",
];

const ps = `
Add-Type -AssemblyName System.Drawing
function Save-WebJpeg([string]$src, [string]$dest, [int]$maxW) {
  $img = [System.Drawing.Image]::FromFile($src)
  try {
    $w = [Math]::Min($maxW, $img.Width)
    $h = [Math]::Max(1, [int]($img.Height * $w / $img.Width))
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $w, $h)
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]82)
    if (!(Test-Path (Split-Path $dest -Parent))) { New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null }
    $bmp.Save($dest, $codec, $ep)
    $g.Dispose(); $bmp.Dispose()
  } finally { $img.Dispose() }
}
`;

const calls = files
  .map((name, i) => {
    const src = path.join(srcDir, name);
    if (!fs.existsSync(src)) throw new Error("Missing: " + src);
    const dest = path.join(outDir, `slide-${String(i + 1).padStart(2, "0")}.jpg`);
    return `Save-WebJpeg -src '${src.replace(/'/g, "''")}' -dest '${dest.replace(/'/g, "''")}' -maxW 960`;
  })
  .join("\n");

const result = spawnSync("powershell", ["-NoProfile", "-Command", ps + "\n" + calls], {
  encoding: "utf8",
});
if (result.status !== 0) {
  console.error(result.stdout);
  console.error(result.stderr);
  process.exit(result.status || 1);
}

const manifest = files.map((_, i) => `slide-${String(i + 1).padStart(2, "0")}.jpg`);
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("imported", manifest.length, "customer slides from", srcDir);
