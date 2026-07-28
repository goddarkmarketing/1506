const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "index.html");
let h = fs.readFileSync(file, "utf8");

const innerStart = h.indexOf('<div class="dg-tour-search" id="dg-tour-search">');
if (innerStart < 0) {
  console.error("Could not find #dg-tour-search");
  process.exit(1);
}

// Prefer removing the wrapping empty <div> around it when present
let removeStart = innerStart;
const maybeWrap = h.lastIndexOf("<div>", innerStart);
if (maybeWrap >= 0 && h.slice(maybeWrap, innerStart).trim() === "<div>") {
  removeStart = maybeWrap;
}

const formClose = h.indexOf("</form>", innerStart);
if (formClose < 0) {
  console.error("Could not find </form>");
  process.exit(1);
}
const searchClose = h.indexOf("</div>", formClose);
if (searchClose < 0) {
  console.error("Could not find search closing </div>");
  process.exit(1);
}
let removeEnd = searchClose + "</div>".length;

// If we started at outer <div>, also consume its closing </div> right after
if (removeStart < innerStart) {
  const after = h.slice(removeEnd, removeEnd + 10);
  if (after.startsWith("</div>")) {
    removeEnd += "</div>".length;
  }
}

const searchBlock = h.slice(innerStart, searchClose + "</div>".length);
console.log("searchBlock head:", JSON.stringify(searchBlock.slice(0, 80)));
console.log("searchBlock tail:", JSON.stringify(searchBlock.slice(-40)));

const without =
  h.slice(0, removeStart) + "<!-- dg-tour-search moved -->" + h.slice(removeEnd);

const spacer =
  '<div class="css-1dbjc4n r-1kihuf0 r-ywje51 r-1fnihl3" style="padding-top:8px;padding-bottom:8px"></div>';
const insertAt = without.indexOf(spacer);
if (insertAt < 0) {
  console.error("Could not find spacer after hero");
  process.exit(1);
}
const spacerEnd = insertAt + spacer.length;

const wrap =
  '\n<div class="dg-tour-overlap" id="dg-tour-overlap">\n' +
  searchBlock +
  "\n</div>\n";

const out = without.slice(0, spacerEnd) + wrap + without.slice(spacerEnd);
fs.writeFileSync(file, out, "utf8");
console.log("OK — moved search between hero and WHY");
