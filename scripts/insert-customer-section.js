const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const fragmentPath = path.join(__dirname, 'customer-slides-fragment.txt');

const slides = fs.readFileSync(fragmentPath, 'utf8').trim();
const section = `
<section class="dg-gate dg-gate--flush" id="dg-gate-customers" aria-labelledby="dg-gate-customers-title">
  <div class="dg-gate__panel">
    <header class="dg-gate__head">
      <p class="dg-gate__eyebrow">Our Customers' Moments</p>
      <h2 id="dg-gate-customers-title" class="dg-gate__title">Real groups on the ground</h2>
      <p class="dg-gate__lead">Temple visits, beach days, incentive groups, and family trips — moments shared by travelers we've hosted across Thailand and beyond.</p>
    </header>
    <div class="dg-gate-customers" data-dg-customers-carousel>
      <button type="button" class="dg-gate-customers__nav dg-gate-customers__nav--prev" aria-label="Previous photos"><i data-lucide="chevron-left"></i></button>
      <div class="dg-gate-customers__viewport" tabindex="0" aria-roledescription="carousel" aria-label="Customer photo gallery">
        <div class="dg-gate-customers__track">
${slides}
        </div>
      </div>
      <button type="button" class="dg-gate-customers__nav dg-gate-customers__nav--next" aria-label="Next photos"><i data-lucide="chevron-right"></i></button>
      <div class="dg-gate-customers__dots" role="tablist" aria-label="Slide pages"></div>
    </div>
    <div style="text-align:center">
      <a class="dg-gate__more" href="about/partners-certifications/#reviews">See more reviews <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>
`;

let html = fs.readFileSync(indexPath, 'utf8');
if (html.includes('id="dg-gate-customers"')) {
  console.log('Customer section already present');
  process.exit(0);
}
const marker = 'Read partner reviews <span aria-hidden="true">→</span></a>\r\n    </div>\r\n  </div>\r\n</section>\r\n\r\n<section class="dg-why" id="dg-why"';
const markerLf = marker.replace(/\r\n/g, '\n');
if (!html.includes(marker) && !html.includes(markerLf)) {
  console.error('Marker not found');
  process.exit(1);
}
const replacement = 'Read partner reviews <span aria-hidden="true">→</span></a>\r\n    </div>\r\n  </div>\r\n</section>\r\n' + section + '\r\n<section class="dg-why" id="dg-why"';
const replacementLf = replacement.replace(/\r\n/g, '\n');
if (html.includes(marker)) {
  html = html.replace(marker, replacement);
} else {
  html = html.replace(markerLf, replacementLf);
}
fs.writeFileSync(indexPath, html);
console.log('Inserted customer slider section');
