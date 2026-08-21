const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "..", "index.html");
let h = fs.readFileSync(indexPath, "utf8");

const slides = Array.from({ length: 8 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const active = i === 0 ? " is-active" : "";
  const eager =
    i === 0
      ? 'loading="eager" fetchpriority="high"'
      : 'loading="lazy"';
  return `    <img class="dg-hero-slider__slide${active}" src="images/hero/slide-${n}.png?v=3" alt="" ${eager} decoding="async" width="2048" height="768" />`;
}).join("\n");

const slider = `<div class="css-1dbjc4n r-1pi2tsx r-82yag r-1udh08x r-u8s1d r-13qz1uu dg-hero-slider" aria-hidden="true"><div class="dg-hero-slider__track">
${slides}
  </div></div>`;

const re =
  /<div class="css-1dbjc4n r-1pi2tsx r-82yag r-1udh08x r-u8s1d r-13qz1uu"><img loading="eager"[^>]*class="[^"]*dg-hero-bg"[^>]*><\/div>/;

if (!re.test(h)) {
  console.error("NO MATCH for hero bg img");
  process.exit(1);
}

h = h.replace(re, slider);
h = h.replace(
  'class="css-1dbjc4n r-6koalj r-1wtj0ep r-bnwqim r-13qz1uu r-tqpus0" style="background-color:rgba(28,41,48,1.00)"',
  'class="css-1dbjc4n r-6koalj r-1wtj0ep r-bnwqim r-13qz1uu r-tqpus0" style="background-color:#f4f1ec"'
);

const js = `<script id="dg-hero-slider-js">
(function(){
  var slides=document.querySelectorAll('.dg-hero-slider__slide');
  if(slides.length<2) return;
  var i=0;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(function(){
    slides[i].classList.remove('is-active');
    i=(i+1)%slides.length;
    slides[i].classList.add('is-active');
  }, 5500);
})();
</script>`;

if (h.includes('id="dg-hero-slider-js"')) {
  h = h.replace(/<script id="dg-hero-slider-js">[\s\S]*?<\/script>/, js);
} else if (h.includes('id="dg-hero-pills-js"')) {
  h = h.replace('<script id="dg-hero-pills-js">', js + "\n<script id=\"dg-hero-pills-js\">");
} else {
  h = h.replace("</body>", js + "\n</body>");
}

fs.writeFileSync(indexPath, h);
console.log("ok", h.includes("dg-hero-slider"), h.includes("slide-08.jpg"), h.includes("dg-hero-slider-js"));
