const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const manifest = require('../images/customers/manifest.json');

const slides = manifest.map((f) => `      <button type="button" class="dg-gate-customers__slide" data-lightbox-src="images/customers/${f}" data-lightbox-alt="D&amp;G Holiday customer tour moment">
        <img src="images/customers/${f}" alt="" loading="lazy" decoding="async" width="960" height="960" />
      </button>`).join('\n');

let html = fs.readFileSync(indexPath, 'utf8');
const start = html.indexOf('<div class="dg-gate-customers__track">');
const end = html.indexOf('</div>\r\n      </div>\r\n      <button type="button" class="dg-gate-customers__nav dg-gate-customers__nav--next"');
const endLf = html.indexOf('</div>\n      </div>\n      <button type="button" class="dg-gate-customers__nav dg-gate-customers__nav--next"');
if (start === -1) {
  console.error('Track start not found');
  process.exit(1);
}
const endIdx = end !== -1 ? end : endLf;
if (endIdx === -1) {
  console.error('Track end not found');
  process.exit(1);
}
html = html.slice(0, start + '<div class="dg-gate-customers__track">'.length) + '\n' + slides + '\n        ' + html.slice(endIdx);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Fixed customer slides encoding');
