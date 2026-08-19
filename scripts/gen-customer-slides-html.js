const manifest = require('../images/customers/manifest.json');
const slides = manifest.map((f) => `      <button type="button" class="dg-gate-customers__slide" data-lightbox-src="images/customers/${f}" data-lightbox-alt="D&amp;G Holiday customer tour moment">
        <img src="images/customers/${f}" alt="" loading="lazy" decoding="async" width="960" height="960" />
      </button>`).join('\n');
console.log(slides);
