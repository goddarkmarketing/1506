/**
 * Generate static IA pages + homepage mega-menu from data/site-nav.json
 * Usage: node scripts/generate-site-ia.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const navPath = path.join(root, "data", "site-nav.json");
const nav = JSON.parse(fs.readFileSync(navPath, "utf8"));
const {
  renderTravelServicePage,
  hasTravelServicePage,
} = require("./lib/travel-service-pages");
const {
  renderMiceServicePage,
  hasMiceServicePage,
  renderMiceHubPage,
} = require("./lib/mice-service-pages");
const {
  renderWeddingServicePage,
  hasWeddingServicePage,
  renderWeddingHubPage,
} = require("./lib/wedding-service-pages");
const {
  renderDestinationPage,
  hasDestinationPage,
  renderDestinationHubPage,
} = require("./lib/destination-pages");
const { renderBlogHubPage } = require("./lib/blog-page");
const { renderAboutPage } = require("./lib/about-page");
const { renderGalleryPage, galleryFilterScript } = require("./lib/gallery-page");
const { renderPageHero } = require("./lib/page-hero");
const { renderPageCta } = require("./lib/page-cta");

// Keep Next copy in sync
fs.mkdirSync(path.join(root, "web", "src", "data"), { recursive: true });
fs.copyFileSync(navPath, path.join(root, "web", "src", "data", "site-nav.json"));

function revealScript(selector) {
  if (!selector) return "";
  return `<script>
(function(){
  var nodes=document.querySelectorAll(${JSON.stringify(selector)});
  if(!nodes.length) return;
  if(!('IntersectionObserver' in window)){
    nodes.forEach(function(n){ n.classList.add('is-in'); });
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  },{ threshold:0.16, rootMargin:'0px 0px -8% 0px' });
  nodes.forEach(function(n){ io.observe(n); });
})();
</script>`;
}

const PAGE_CHROME = {
  "company-profile": {
    css: ["css/dg-company-profile.css?v=4"],
    reveal: ".dg-cp-reveal",
  },
  "vision-mission": {
    css: ["css/dg-vision-mission.css?v=2"],
    reveal: ".dg-vm-reveal",
  },
  "why-choose": {
    css: ["css/dg-why-choose.css?v=8"],
    reveal: ".dg-wc-reveal",
  },
  "our-team": {
    css: ["css/dg-our-team.css?v=2"],
    reveal: ".dg-ot-reveal",
  },
  "partners-certifications": {
    css: ["css/dg-partners.css?v=4"],
    reveal: ".dg-pc-reveal",
  },
};

const TRAVEL_CHROME = {
  css: ["css/dg-travel-service.css?v=6"],
  reveal: ".dg-ts-reveal",
};

const MICE_CHROME = {
  css: ["css/dg-travel-service.css?v=6"],
  reveal: ".dg-ts-reveal",
};

const WEDDING_CHROME = {
  css: ["css/dg-travel-service.css?v=6", "css/dg-wedding-service.css?v=3"],
  reveal: ".dg-ts-reveal",
};

const DEST_CHROME = {
  css: ["css/dg-travel-service.css?v=6", "css/dg-destination-page.css?v=1"],
  reveal: ".dg-ts-reveal",
};

const BLOG_CHROME = {
  css: ["css/dg-travel-service.css?v=6", "css/dg-blog.css?v=2"],
  reveal: ".dg-ts-reveal",
};

const ABOUT_CHROME = {
  css: ["css/dg-about.css?v=2"],
  reveal: ".dg-ab-reveal",
};

const GALLERY_CHROME = {
  css: ["css/dg-gallery.css?v=3"],
  reveal: ".dg-gal-reveal",
};

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rel(depth, p) {
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  return prefix + p.replace(/^\//, "");
}

function pageHref(href, depth) {
  if (href === "/" || href === "/index.html") return rel(depth, "index.html");
  // Convert /about/foo/ -> about/foo/ (relative)
  const clean = href.replace(/^\//, "");
  return rel(depth, clean);
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function chromeCss(depth, extraCss = []) {
  const base = `
<link rel="stylesheet" href="${rel(depth, "css/dg-home-chrome.css")}?v=2" />
<link rel="stylesheet" href="${rel(depth, "css/dg-chrome.css")}" />
<link rel="stylesheet" href="${rel(depth, "css/dg-home-edits.css")}?v=ia2" />
<link rel="stylesheet" href="${rel(depth, "css/dg-ia-pages.css")}?v=13" />
<link rel="stylesheet" href="${rel(depth, "css/dg-mega-menu.css")}?v=9" />
<link rel="stylesheet" href="${rel(depth, "css/dg-page-hero.css")}?v=2" />
<link rel="stylesheet" href="${rel(depth, "css/dg-internal-system.css")}?v=3" />
<link rel="stylesheet" href="${rel(depth, "css/dg-mobile.css")}?v=5" />
`.trim();
  const extras = (extraCss || [])
    .map((href) => `<link rel="stylesheet" href="${rel(depth, href)}" />`)
    .join("\n");
  return extras ? `${base}\n${extras}` : base;
}

function megaPanelSize(count) {
  if (count <= 6) return "sm";
  if (count <= 10) return "md";
  return "lg";
}

function megaNavHtml(depth) {
  const FEATURED = 6;
  const items = nav.items
    .filter((item) => item.showInNav !== false && item.kind !== "cta")
    .map((item) => {
      const href = pageHref(item.href || "/", depth);
      const megaKids = item.navChildren || item.children || [];
      if (!megaKids.length) {
        return `<a class="dg-mega__link" href="${href}">${esc(item.label)}</a>`;
      }
      const featured = megaKids.slice(0, FEATURED);
      const kids = featured
        .map(
          (c) =>
            `<li><a href="${pageHref(c.href, depth)}">${esc(c.label)}</a></li>`
        )
        .join("");
      const size = megaPanelSize(megaKids.length);
      return `<div class="dg-mega__item">
  <div class="dg-mega__row">
    <a class="dg-mega__link" href="${href}">${esc(item.label)}</a>
    <button type="button" class="dg-mega__expand" aria-expanded="false" aria-label="Show ${esc(item.label)} links"><span aria-hidden="true">▾</span></button>
  </div>
  <div class="dg-mega__panel dg-mega__panel--${size}">
    <div class="dg-mega__panel-card">
      <a class="dg-mega__panel-all" href="${href}">View all ${esc(item.label)}</a>
      <ul>${kids}</ul>
    </div>
  </div>
</div>`;
    })
    .join("\n");

  return `<nav class="dg-mega" aria-label="Primary">
<button type="button" class="dg-mega__toggle" aria-expanded="false" aria-controls="dg-mega-drawer">Menu</button>
<div class="dg-mega__desktop">${items}</div>
<div class="dg-mega__backdrop" id="dg-mega-backdrop" hidden></div>
<div class="dg-mega__drawer" id="dg-mega-drawer" hidden>
  <div class="dg-mega__sheet-head">
    <a class="dg-mega__brand" href="${pageHref("/", depth)}" aria-label="D&amp;G Holiday">
      <img src="${rel(depth, "images/dg-logo.png")}?v=10" alt="D&amp;G Holiday (Thailand) Co., Ltd." width="180" height="48" decoding="async" />
    </a>
    <button type="button" class="dg-mega__sheet-close" aria-label="Close menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  </div>
  <div class="dg-mega__sheet-body">
${items}
  </div>
  <div class="dg-mega__sheet-foot">
    <a class="dg-mega__auth-btn dg-mega__auth-btn--login" href="#" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg> Log In</a>
    <a class="dg-mega__auth-btn dg-mega__auth-btn--signup" href="#" role="button">Sign Up</a>
  </div>
</div>
</nav>`;
}

/** Prefix relative href/src for nested IA pages so they match homepage header paths. */
function rewriteAssetPaths(html, depth) {
  if (!depth) return html;
  const prefix = "../".repeat(depth);
  return html.replace(
    /\b(href|src)="(?!https?:|mailto:|tel:|#|\/)([^"]+)"/g,
    (_, attr, url) => `${attr}="${prefix}${url}"`
  );
}

let sharedHeaderHtml = null;
function headerHtml(depth) {
  if (!sharedHeaderHtml) {
    const p = path.join(root, "includes", "site-header.html");
    if (!fs.existsSync(p)) {
      throw new Error("Missing includes/site-header.html — run homepage mega sync + build-home-chrome first");
    }
    sharedHeaderHtml = fs.readFileSync(p, "utf8");
  }
  return rewriteAssetPaths(sharedHeaderHtml, depth);
}

function paymentImgs(depth) {
  const files = [
    "1736409068278-213734dd376baa9642331bf4620bcb41.png",
    "1736479220958-0c6dae87da47bf1bbf6ae51ab5150617.webp",
    "1736479521542-46cd24bde2c3910f5fa4e2d653eb6c23.webp",
    "1736480785634-7bd7a1c50dc24a0853b644f46c8b01df.png",
    "1736479507703-3399918fb9e71924ef2dddd4f8ccd947.png",
    "1736479511814-8264416bfb67d4a902623644c401b394.png",
    "1736480762727-aef62311a0107a1e58dac9b3492b4f4c.png",
    "1736480766464-76cce31dad31e2f72b89f4aea6c934b3.png",
    "1736480772015-8e13294a9e031c44af797d68c3a36299.png",
    "1736480775437-d4b01a73d59cf9b29a2197aaf6a8d26f.png",
    "1736480778815-598c66ec3869ba9cd2275e123b9aaaac.png",
    "1736409268808-110a2a25fce25ddc7943d10b4f0edde4.png",
  ];
  return files
    .map(
      (f) =>
        `<img src="${rel(depth, "images/payments/" + f)}" alt="" width="84" height="28" loading="lazy" />`
    )
    .join("\n          ");
}

function ctaDockHtml(depth) {
  return `<nav class="dg-cta-dock" aria-label="Quick contact">
  <a href="${pageHref("/", depth)}">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <span>Home</span>
  </a>
  <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <span>LINE</span>
  </a>
  <a href="https://wa.me/66821479553?text=Hello%20D%26G%20Holiday%2C%20I%20would%20like%20a%20quote." target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <span>WhatsApp</span>
  </a>
  <a href="${pageHref("/proposal/", depth)}">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    <span>Quote</span>
  </a>
  <a href="tel:+66821479553">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <span>Call</span>
  </a>
</nav>`;
}

function footerHtml(depth) {
  const L = (h, label) =>
    `<li><a href="${pageHref(h, depth)}">${esc(label)}</a></li>`;
  return `${ctaDockHtml(depth)}
<footer class="dg-chrome-footer">
  <div class="dg-chrome-footer__inner">
    <div class="dg-chrome-footer__grid">
      <div>
        <img class="dg-chrome-footer__logo" src="${rel(depth, "images/dg-holiday-logo.svg")}" alt="D&amp;G Holiday" width="200" height="90" loading="lazy" />
        <div class="dg-chrome-footer__block-title">ข้อมูลติดต่อ</div>
        <p class="dg-chrome-footer__contact">
          D&amp;G Holiday (Thailand) Co., Ltd.<br />
          852/7 พฤกษาวิลล์ 60/2 ถนนหลวงแพ่ง<br />
          แขวงทับยาว เขตลาดกระบัง กรุงเทพฯ 10520<br />
          โทร: <a href="tel:+66821479553">+66 82 147 9553</a><br />
          อีเมล: <a href="mailto:dgholidaythailand@gmail.com">dgholidaythailand@gmail.com</a><br />
          LINE: <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">@354ejhoo</a><br />
          Facebook: <a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">dgholidaythailand</a>
        </p>
        <p class="dg-chrome-footer__creds">
          <strong>ใบอนุญาต / Tourism Business License No.:</strong> 11/12868<br />
          <strong>Company Registration No.:</strong> 0105561154132<br />
          <strong>ATTA Member:</strong> 05614
        </p>
        <div class="dg-chrome-footer__block-title">ช่องทางชำระเงิน</div>
        <div class="dg-chrome-payments">
          ${paymentImgs(depth)}
        </div>
      </div>
      <div class="dg-chrome-footer__right">
        <div class="dg-chrome-footer__about">
          <div class="dg-chrome-footer__col-title">เกี่ยวกับ D&amp;G Holiday</div>
          <ul class="dg-chrome-footer__links">
            ${L("/travel-services/", "Travel Services")}
            ${L("/contact/", "ติดต่อเรา")}
            ${L("/proposal/", "Request a Proposal")}
            ${L("/about/", "เกี่ยวกับ D&G Holiday")}
          </ul>
          <div class="dg-chrome-footer__col-title dg-chrome-footer__col-title--spaced">ติดตามเราได้ทาง</div>
          <ul class="dg-chrome-social" aria-label="Social media">
            <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="${rel(depth, "images/social/facebook.svg")}" alt="" width="22" height="22" loading="lazy" /></a></li>
            <li><a href="https://www.instagram.com/dg.holiday" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="${rel(depth, "images/social/instagram.svg")}" alt="" width="22" height="22" loading="lazy" /></a></li>
            <li><a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer" aria-label="LINE"><img src="${rel(depth, "images/social/line.png")}" alt="" width="22" height="22" loading="lazy" /></a></li>
          </ul>
          <div class="dg-chrome-qr">
            <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer" aria-label="SCAN QR LINE">
              <span class="dg-chrome-qr__label">SCAN QR</span>
              <div class="dg-chrome-qr__frame">
                <img src="${rel(depth, "images/dg-line-qr.png")}" alt="LINE QR Code" width="140" height="140" loading="lazy" />
              </div>
            </a>
          </div>
        </div>
        <div class="dg-chrome-footer__menus">
          <div class="dg-chrome-footer__cols dg-chrome-footer__cols--two">
            <div>
              <div class="dg-chrome-footer__col-title">EXPLORE</div>
              <ul class="dg-chrome-footer__links">
                ${L("/about/", "About Us")}
                ${L("/travel-services/", "Travel Services")}
                ${L("/destinations/", "Destinations")}
                ${L("/gallery/", "Gallery")}
                ${L("/articles/", "Blog & Travel Guide")}
              </ul>
            </div>
            <div>
              <div class="dg-chrome-footer__col-title">BUSINESS</div>
              <ul class="dg-chrome-footer__links">
                ${L("/mice/", "MICE & Corporate")}
                ${L("/events/", "Event Management")}
                ${L("/india-market/", "India Market")}
                ${L("/destination-weddings/", "Weddings")}
                ${L("/proposal/", "Request a Proposal")}
              </ul>
            </div>
          </div>
          <div class="dg-chrome-newsletter">
            <div class="dg-chrome-newsletter__title">รับข่าวสารและโปรโมชัน</div>
            <form class="dg-chrome-newsletter__form" action="mailto:dgholidaythailand@gmail.com" method="get">
              <label class="sr-only" for="dg-footer-email-${depth}">อีเมล</label>
              <input id="dg-footer-email-${depth}" type="email" name="email" required autocomplete="email" placeholder="กรอกอีเมลของคุณ" />
              <button type="submit">สมัครรับข่าวสาร</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dg-chrome-footer__copy">Copyright © 2026 D&amp;G Holiday. All rights reserved</div>
</footer>`;
}

function hubBody(section) {
  const cards = (section.children || [])
    .map(
      (c) => `<a class="dg-ia-card" href="${c.href.replace(/^\//, "")}">
  <h2>${esc(c.label)}</h2>
  <p>${esc(c.description || "")}</p>
  <span>Learn more →</span>
</a>`
    )
    .join("\n");
  const title = section.heroTitle || section.label;
  return `${renderPageHero({
    title,
    subtitle: section.description || "",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: title },
    ],
    rel: "../",
  })}
<section class="dg-ia-wrap dg-ia-grid">${cards}</section>
${renderPageCta({
  rel: "../",
  variant: "dg-page",
  title: "Ready to Plan Your Journey?",
  text: "Tell us about your program — our partner desk will prepare a tailored proposal.",
})}`;
}

function leafBody(section, leaf, depth) {
  const bullets = (leaf.bullets || [])
    .map((b) => `<li>${esc(b)}</li>`)
    .join("");
  const gallery = leaf.gallery
    ? `<div class="dg-ia-gallery">${Array.from({ length: 6 })
        .map(() => `<div class="dg-ia-gallery__tile"></div>`)
        .join("")}</div>`
    : "";
  const sectionHref = pageHref(section.href, depth);
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  const title = leaf.heroTitle || leaf.label;
  const sectionPath = section.href.replace(/^\//, "");
  return `${renderPageHero({
    title,
    subtitle: leaf.description || "",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: section.label, href: sectionPath },
      { label: title },
    ],
    rel: prefix,
  })}
<section class="dg-ia-wrap dg-ia-leaf">
  <div>
    <h2>What we deliver</h2>
    <ul class="dg-ia-bullets">${bullets}</ul>
    ${gallery}
  </div>
  <aside class="dg-ia-aside">
    <h3>Plan with our partner desk</h3>
    <p>Share dates, group size, and goals — we will prepare a tailored proposal.</p>
    <a class="dg-ia-btn dg-ia-btn--primary" href="${pageHref("/proposal/", depth)}">Request a Proposal</a>
    <a class="dg-ia-btn" href="${pageHref("/contact/", depth)}">Contact Us</a>
    <a class="dg-ia-back" href="${sectionHref}">← Back to ${esc(section.label)}</a>
  </aside>
</section>
${renderPageCta({
  rel: prefix,
  variant: "dg-page",
  title: "Ready to Plan Your Journey?",
  text: "Share dates, group size, and goals — we will prepare a tailored proposal.",
})}`;
}

function customPageBody(pageId, depth) {
  const file = path.join(root, "content", "pages", `${pageId}.html`);
  if (!fs.existsSync(file)) return null;
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  return fs
    .readFileSync(file, "utf8")
    .replace(/\{\{REL\}\}/g, prefix);
}

function megaInitScript() {
  return `(function(){
  var btn=document.querySelector('.dg-mega__toggle');
  var drawer=document.getElementById('dg-mega-drawer');
  var backdrop=document.getElementById('dg-mega-backdrop');
  function isMobileNav(){ return window.matchMedia('(max-width: 1100px)').matches; }

  function closeAllSubs(){
    drawer.querySelectorAll('.dg-mega__item.is-open').forEach(function(n){
      n.classList.remove('is-open');
      var exp=n.querySelector('.dg-mega__expand');
      if(exp) exp.setAttribute('aria-expanded','false');
    });
  }

  var closeBtn=document.querySelector('.dg-mega__sheet-close');
  var closeTimer=null;

  function setOpen(open){
    if(!btn||!drawer) return;
    btn.setAttribute('aria-expanded', open?'true':'false');
    btn.classList.toggle('is-active', !!open);
    document.documentElement.classList.toggle('dg-mega-open', !!open);
    document.body.classList.toggle('dg-mega-open', !!open);
    if(closeTimer){ clearTimeout(closeTimer); closeTimer=null; }
    if(open){
      drawer.hidden=false;
      if(backdrop) backdrop.hidden=false;
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          drawer.classList.add('is-open');
          if(backdrop) backdrop.classList.add('is-open');
        });
      });
    } else {
      drawer.classList.remove('is-open');
      if(backdrop) backdrop.classList.remove('is-open');
      closeAllSubs();
      closeTimer=setTimeout(function(){
        drawer.hidden=true;
        if(backdrop) backdrop.hidden=true;
      }, 280);
    }
  }

  if(btn&&drawer){
    btn.addEventListener('click',function(){
      setOpen(btn.getAttribute('aria-expanded')!=='true');
    });
  }
  if(backdrop){
    backdrop.addEventListener('click',function(){ setOpen(false); });
  }
  if(closeBtn){
    closeBtn.addEventListener('click',function(){ setOpen(false); });
  }
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') setOpen(false);
  });

  /* Individual accordion toggle — label or chevron */
  document.querySelectorAll('.dg-mega__drawer .dg-mega__item').forEach(function(item){
    var row=item.querySelector(':scope > .dg-mega__row');
    var expand=item.querySelector(':scope > .dg-mega__row > .dg-mega__expand');
    var link=item.querySelector(':scope > .dg-mega__row > .dg-mega__link');
    if(!expand||!link) return;
    function toggle(e){
      if(!isMobileNav()) return;
      e.preventDefault();
      e.stopPropagation();
      var isOpen=item.classList.contains('is-open');
      drawer.querySelectorAll('.dg-mega__item.is-open').forEach(function(n){
        if(n===item) return;
        n.classList.remove('is-open');
        var other=n.querySelector(':scope > .dg-mega__row > .dg-mega__expand');
        if(other) other.setAttribute('aria-expanded','false');
      });
      item.classList.toggle('is-open', !isOpen);
      expand.setAttribute('aria-expanded', (!isOpen)?'true':'false');
    }
    expand.addEventListener('click', toggle);
    link.addEventListener('click', toggle);
    if(row) row.addEventListener('click', function(e){
      if(!isMobileNav()) return;
      if(e.target.closest('a,button')) return;
      toggle(e);
    });
  });

  var header=document.querySelector('.r-bztko3.r-ipm5af.r-fgfhv.r-8ny0jo')
    || document.querySelector('.r-bztko3.r-ipm5af.r-fgfhv');
  if(header){
    function sync(){ header.classList.add('dg-header-scrolled'); }
    sync();
    window.addEventListener('scroll', sync, { passive: true });
  }
})();`;
}

function lucideBootstrap() {
  return `<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js" defer></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  function paint() {
    if (window.lucide && typeof lucide.createIcons === "function") {
      try { lucide.createIcons({ icons: lucide.icons }); } catch (e) {}
    }
  }
  paint();
  setTimeout(paint, 200);
  setTimeout(paint, 800);
});
</script>`;
}

function wrapPage({ title, description, depth, body, extraCss = [], extraScript = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)} | D&amp;G Holiday</title>
<meta name="description" content="${esc(description || "")}" />
${chromeCss(depth, extraCss)}
</head>
<body class="dg-ia-body">
${headerHtml(depth)}
<main>${body}</main>
${footerHtml(depth)}
${lucideBootstrap()}
<script>
${megaInitScript()}
</script>
${extraScript}
</body>
</html>
`;
}

function writePage(relPath, html) {
  const full = path.join(root, relPath);
  ensureDir(full);
  fs.writeFileSync(full, html);
  console.log("wrote", relPath.replace(/\\/g, "/"));
}

// --- Sync homepage mega FIRST, then extract that exact header for every IA page ---
const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");

const homeMega = megaNavHtml(0)
  .replace(/class="dg-mega"/, 'class="dg-mega dg-top-menu"')
  .replace(/class="dg-mega__desktop"/, 'class="dg-mega__desktop dg-top-menu__desktop"');

const megaNavOpen = index.indexOf('<nav class="dg-mega');
if (megaNavOpen >= 0) {
  const close = index.indexOf("</nav>", megaNavOpen);
  if (close < 0) throw new Error("Unclosed dg-mega nav in index.html");
  index = index.slice(0, megaNavOpen) + homeMega + index.slice(close + 6);
  console.log("updated homepage mega menu");
} else {
  console.warn("WARN: could not locate homepage mega menu to replace");
}

if (!index.includes("dg-ia-pages.css")) {
  index = index.replace(
    /href="css\/dg-home-edits\.css\?v=[^"]+"/,
    (m) => `${m} /><link rel="stylesheet" href="css/dg-ia-pages.css?v=13" /><link rel="stylesheet" href="css/dg-mega-menu.css?v=9"`
  );
} else {
  index = index.replace(/dg-ia-pages\.css\?v=\d+/g, "dg-ia-pages.css?v=13");
}
if (!index.includes("dg-mega-menu.css")) {
  index = index.replace(
    /href="css\/dg-ia-pages\.css\?v=[^"]+"/,
    (m) => `${m} /><link rel="stylesheet" href="css/dg-mega-menu.css?v=9"`
  );
} else {
  index = index.replace(/dg-mega-menu\.css\?v=\d+/g, "dg-mega-menu.css?v=9");
}

if (!index.includes("dg-mobile.css")) {
  index = index.replace(
    /(<link rel="stylesheet" href="css\/dg-destinations\.css\?v=\d+" \/>)/,
    '$1<link rel="stylesheet" href="css/dg-mobile.css?v=5" />'
  );
} else {
  index = index.replace(/dg-mobile\.css\?v=\d+/g, "dg-mobile.css?v=5");
}

const megaJs = `<script id="dg-mega-toggle-js">${megaInitScript()}</script>`;
if (index.includes('id="dg-mega-toggle-js"')) {
  index = index.replace(/<script id="dg-mega-toggle-js">[\s\S]*?<\/script>/, megaJs);
} else if (index.includes("</body>")) {
  index = index.replace("</body>", megaJs + "</body>");
}

fs.writeFileSync(indexPath, index);

// Extract shared header HTML + homepage chrome CSS from the updated index
require("child_process").execFileSync(process.execPath, [path.join(__dirname, "build-home-chrome.js")], {
  stdio: "inherit",
  cwd: root,
});
sharedHeaderHtml = null;

// --- Generate section hubs + leaves ---
let count = 0;
for (const item of nav.items) {
  if (item.kind !== "section") continue;
  const sectionSlug = item.id;
  const hubDepth = 1;
  // Fix card hrefs in hub to be relative without leading ../ for same folder children
  const hubCards = (item.children || [])
    .map(
      (c) => `<a class="dg-ia-card" href="${c.id}/">
  <h2>${esc(c.label)}</h2>
  <p>${esc(c.description || "")}</p>
  <span>Learn more →</span>
</a>`
    )
    .join("\n");

  let hubBodyHtml;
  let hubExtraCss = [];
  let hubExtraScript = "";

  if (item.id === "india-market" && hasTravelServicePage("india-market")) {
    hubBodyHtml = renderTravelServicePage("india-market", "../");
    hubExtraCss = TRAVEL_CHROME.css;
    hubExtraScript = revealScript(TRAVEL_CHROME.reveal);
  } else if (item.id === "about") {
    hubBodyHtml = renderAboutPage("../");
    hubExtraCss = ABOUT_CHROME.css;
    hubExtraScript = revealScript(ABOUT_CHROME.reveal);
  } else if (item.id === "gallery") {
    hubBodyHtml = renderGalleryPage("../");
    hubExtraCss = GALLERY_CHROME.css;
    hubExtraScript =
      revealScript(GALLERY_CHROME.reveal) + galleryFilterScript();
  } else if (item.id === "events" && hasMiceServicePage("event-management")) {
    hubBodyHtml = renderMiceServicePage("event-management", "../");
    hubExtraCss = MICE_CHROME.css;
    hubExtraScript = revealScript(MICE_CHROME.reveal);
  } else if (item.id === "mice") {
    hubBodyHtml = renderMiceHubPage({
      title: "MICE & Events",
      sub: "Meetings, incentives, conferences, exhibitions, corporate travel, and destination events — delivered by a luxury Thailand DMC.",
      heroKey: "partner",
      children: item.children || [],
      rel: "../",
      eventsLink: true,
    });
    hubExtraCss = MICE_CHROME.css;
    hubExtraScript = revealScript(MICE_CHROME.reveal);
  } else if (item.id === "destination-weddings") {
    hubBodyHtml = renderWeddingHubPage({
      children: item.children || [],
      rel: "../",
    });
    hubExtraCss = WEDDING_CHROME.css;
    hubExtraScript = revealScript(WEDDING_CHROME.reveal);
  } else if (item.id === "destinations") {
    hubBodyHtml = renderDestinationHubPage({
      children: item.children || [],
      rel: "../",
    });
    hubExtraCss = DEST_CHROME.css;
    hubExtraScript = revealScript(DEST_CHROME.reveal);
  } else if (item.id === "travel-services") {
    const hubIcons = {
      "inbound-travel": "plane-landing",
      "outbound-travel": "plane-takeoff",
      "domestic-travel": "map-pinned",
      "group-tours": "users",
      "private-tours": "user-round",
      "luxury-travel": "gem",
      "hotel-reservations": "hotel",
      "transportation-transfers": "car",
      "visa-travel-support": "file-check",
    };
    const tsCards = (item.children || [])
      .map((c, i) => {
        const href = `${c.id}/`;
        const icon = hubIcons[c.id] || "sparkles";
        return `<a class="dg-ts-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${href}">
  <div class="dg-ts-card__body" style="padding-top:28px">
    <div class="dg-ts-card__top"><span class="dg-ts-ico" aria-hidden="true"><i data-lucide="${esc(icon)}" class="dg-lucide"></i></span></div>
    <h3>${esc(c.label)}</h3>
    <p>${esc(c.description || "")}</p>
    <span class="dg-ts-card__cta">Explore <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
      })
      .join("\n");
    const indiaCard = `<a class="dg-ts-card dg-ts-reveal" href="../india-market/">
  <div class="dg-ts-card__body" style="padding-top:28px">
    <div class="dg-ts-card__top"><span class="dg-ts-ico" aria-hidden="true"><i data-lucide="landmark" class="dg-lucide"></i></span></div>
    <h3>India Market</h3>
    <p>Specialist desk for Indian travelers, corporates, weddings, catering, and Hindi-speaking support.</p>
    <span class="dg-ts-card__cta">Explore <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    hubBodyHtml = `<article class="dg-ts dg-theme--travel">
  ${renderPageHero({
    title: "Travel Services",
    subtitle:
      "Inbound, outbound, domestic, private, luxury, and India-market programs — delivered by a luxury Thailand DMC.",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: "Travel Services" },
    ],
    rel: "../",
  })}
  <section class="dg-ts-hub">
    <div class="dg-ts__wrap">
      <div class="dg-ts-section__head dg-ts-reveal">
        <span class="dg-ts-ico dg-ts-ico--lg" aria-hidden="true"><i data-lucide="briefcase-business" class="dg-lucide"></i></span>
        <p class="dg-ts__eyebrow">Our Services</p>
        <h2>Choose a travel desk</h2>
        <p class="dg-ts__lead">Same premium layout on every page — clear proof and conversion-ready next steps.</p>
      </div>
      <div class="dg-ts-hub__grid">${tsCards}${indiaCard}</div>
    </div>
  </section>
  ${renderPageCta({
    rel: "../",
    title: "Ready to plan your journey?",
    text: "Share your travelers, dates, and goals — our travel desk will prepare a tailored proposal.",
  })}
</article>`;
    hubExtraCss = TRAVEL_CHROME.css;
    hubExtraScript = revealScript(TRAVEL_CHROME.reveal);
  } else {
    const hubTitle = item.heroTitle || item.label;
    const hubPrefix = hubDepth > 0 ? "../".repeat(hubDepth) : "";
    hubBodyHtml = `${renderPageHero({
      title: hubTitle,
      subtitle: item.description || "",
      breadcrumb: [
        { label: "Home", href: "index.html" },
        { label: hubTitle },
      ],
      rel: hubPrefix,
    })}
<section class="dg-ia-wrap dg-ia-grid">${hubCards}</section>
${renderPageCta({
  rel: hubPrefix,
  variant: "dg-page",
  title: "Ready to Plan Your Journey?",
  text: "Tell us about your program — our partner desk will prepare a tailored proposal.",
})}`;
  }

  writePage(
    path.join(sectionSlug, "index.html"),
    wrapPage({
      title: item.heroTitle || item.label,
      description: item.description,
      depth: hubDepth,
      body: hubBodyHtml,
      extraCss: hubExtraCss,
      extraScript: hubExtraScript,
    })
  );
  count++;

  for (const child of item.children || []) {
    const leafDepth = 2;
    const prefix = "../".repeat(leafDepth);
    const custom = customPageBody(child.id, leafDepth);
    const travelHtml = hasTravelServicePage(child.id)
      ? renderTravelServicePage(child.id, prefix)
      : null;
    const miceHtml =
      !travelHtml && hasMiceServicePage(child.id)
        ? renderMiceServicePage(child.id, prefix)
        : null;
    const weddingHtml =
      !travelHtml && !miceHtml && hasWeddingServicePage(child.id)
        ? renderWeddingServicePage(child.id, prefix)
        : null;
    const destHtml =
      !travelHtml && !miceHtml && !weddingHtml && hasDestinationPage(child.id)
        ? renderDestinationPage(child.id, prefix)
        : null;
    const pageChrome = travelHtml
      ? TRAVEL_CHROME
      : miceHtml
        ? MICE_CHROME
        : weddingHtml
          ? WEDDING_CHROME
          : destHtml
            ? DEST_CHROME
            : PAGE_CHROME[child.id];

    const extraCss = pageChrome ? pageChrome.css : [];
    const extraScript = pageChrome ? revealScript(pageChrome.reveal) : "";

    writePage(
      path.join(sectionSlug, child.id, "index.html"),
      wrapPage({
        title: child.heroTitle || child.label,
        description: child.description,
        depth: leafDepth,
        body:
          custom ||
          travelHtml ||
          miceHtml ||
          weddingHtml ||
          destHtml ||
          leafBody(item, child, leafDepth),
        extraCss,
        extraScript,
      })
    );
    count++;
  }
}

// Proposal page
const proposalDepth = 1;
const DESK_CHROME = { css: ["css/dg-contact-pages.css?v=5"], reveal: ".dg-ts-reveal" };
const proposalBody = `${renderPageHero({
  title: "Request a Proposal",
  subtitle:
    "Share your travel, MICE, event, India-market, or wedding brief. Our partner desk replies within one business day.",
  breadcrumb: [
    { label: "Home", href: "index.html" },
    { label: "Request a Proposal" },
  ],
  primaryButton: null,
  secondaryButton: { label: "Contact Us", href: "contact/" },
  rel: "../",
})}
<article class="dg-desk">
  <section class="dg-desk-main" aria-labelledby="dg-desk-proposal-title">
    <div class="dg-desk__wrap">
      <div class="dg-desk-main__layout">
        <aside class="dg-desk-aside">
          <p class="dg-desk__eyebrow">Partner Desk</p>
          <h2 id="dg-desk-proposal-title" class="dg-desk__title">Tell us the brief. We shape the program.</h2>
          <p class="dg-desk__lead">Clear inputs help us return a practical quotation — dates, group size, destination, and service focus.</p>
          <ol class="dg-desk-steps" aria-label="How proposal requests work">
            <li>
              <span class="dg-desk-steps__num" aria-hidden="true">1</span>
              <div><strong>Share the essentials</strong><span>Company, contacts, service type, and dates.</span></div>
            </li>
            <li>
              <span class="dg-desk-steps__num" aria-hidden="true">2</span>
              <div><strong>We review within 1 business day</strong><span>Our desk checks inventory, venues, and logistics.</span></div>
            </li>
            <li>
              <span class="dg-desk-steps__num" aria-hidden="true">3</span>
              <div><strong>Receive a tailored proposal</strong><span>Options, inclusions, and next steps for booking.</span></div>
            </li>
          </ol>
          <div class="dg-desk-quick" aria-label="Prefer chat">
            <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
              <span class="dg-desk-quick__ico" aria-hidden="true"><img src="../images/social/line-app.png?v=1" alt="" width="36" height="36" /></span>
              <span><strong>LINE @dgholiday</strong><span>Official Account chat</span></span>
            </a>
            <a href="https://wa.me/66821479553?text=Hello%20D%26G%20Holiday%2C%20I%20would%20like%20a%20proposal." target="_blank" rel="noopener noreferrer">
              <span class="dg-desk-quick__ico" aria-hidden="true"><img src="../images/social/whatsapp-app.png?v=1" alt="" width="36" height="36" /></span>
              <span><strong>WhatsApp</strong><span>+66 82 147 9553</span></span>
            </a>
            <a href="tel:+66821479553">
              <span class="dg-desk-quick__ico" aria-hidden="true"><i data-lucide="phone" class="dg-lucide"></i></span>
              <span><strong>Call Desk</strong><span>Mon – Fri, 9:00 – 18:00</span></span>
            </a>
          </div>
        </aside>
        <form class="dg-desk-form" id="dg-proposal-form" action="mailto:partners@dgholidaythailand.com" method="get">
          <div class="dg-desk-form__head">
            <h2>Proposal form</h2>
            <p>Fields marked required help us quote accurately the first time.</p>
          </div>
          <div class="dg-desk-form__grid">
            <label>Company / Agency<input name="company" required placeholder="Agency or company name" autocomplete="organization" /></label>
            <label>Contact Name<input name="name" required placeholder="Full name" autocomplete="name" /></label>
            <label>Work Email<input type="email" name="email" required placeholder="name@company.com" autocomplete="email" /></label>
            <label>Phone / WhatsApp<input name="phone" placeholder="+66 XX XXX XXXX" autocomplete="tel" /></label>
            <label>Service Interest
              <select name="service" required>
                <option value="">Select a service</option>
                <option>Travel Services</option>
                <option>MICE &amp; Corporate</option>
                <option>Event Management</option>
                <option>India Market</option>
                <option>Destination Weddings</option>
                <option>Other</option>
              </select>
            </label>
            <label>Estimated Group Size<input name="group_size" placeholder="e.g. 40 pax" /></label>
            <label>Travel / Event Dates<input name="dates" placeholder="e.g. Oct 2026" /></label>
            <label>Destination<input name="destination" placeholder="e.g. Bangkok, Phuket" /></label>
          </div>
          <label class="dg-desk-form__full">Project Details<textarea name="body" rows="5" required placeholder="Goals, budget range, and any special requirements"></textarea></label>
          <input type="hidden" name="subject" value="Proposal Request" />
          <div class="dg-desk-form__actions">
            <button type="submit" class="dg-desk-btn dg-desk-btn--primary">Send Inquiry <span aria-hidden="true">→</span></button>
            <a class="dg-desk-btn dg-desk-btn--ghost" href="../contact/">Talk to Contact Desk</a>
          </div>
          <p class="dg-desk-form__note" style="margin-top:14px">Submitting opens your email client with the brief ready to send to our partner desk.</p>
        </form>
      </div>
    </div>
  </section>
</article>
${renderPageCta({
  rel: "../",
  variant: "dg-page",
  title: "Prefer to talk first?",
  text: "Call or message our partner desk — we are ready to shape your next program.",
  primaryLabel: "Contact Us",
  primaryHref: "contact/",
  secondaryLabel: "Back to Home",
  secondaryHref: "index.html",
})}`;
writePage(
  path.join("proposal", "index.html"),
  wrapPage({
    title: "Request a Proposal",
    description: nav.items.find((i) => i.id === "proposal")?.description,
    depth: proposalDepth,
    body: proposalBody,
    extraCss: DESK_CHROME.css,
    extraScript: revealScript(DESK_CHROME.reveal),
  })
);
count++;

// Contact page
const contactDepth = 1;
const contactBody = `${renderPageHero({
  title: "Contact Us",
  subtitle: "Reach the D&G Holiday partner desk by phone, email, LINE, or WhatsApp — we reply within one business day.",
  breadcrumb: [
    { label: "Home", href: "index.html" },
    { label: "Contact Us" },
  ],
  rel: "../",
  primaryButton: { label: "Request A Proposal", href: "proposal/" },
  secondaryButton: { label: "Back to Home", href: "index.html" },
})}
<article class="dg-desk">
  <section class="dg-desk-channels" aria-labelledby="dg-desk-channels-title">
    <div class="dg-desk__wrap">
      <p class="dg-desk__eyebrow">Direct Channels</p>
      <h2 id="dg-desk-channels-title" class="dg-desk__title">Choose how you want to reach us</h2>
      <div class="dg-desk-channels__grid" style="margin-top:28px">
        <a class="dg-desk-channel" href="tel:+66821479553">
          <span class="dg-desk-channel__ico" aria-hidden="true"><i data-lucide="phone" class="dg-lucide"></i></span>
          <strong>Call</strong>
          <span>Speak with our Bangkok desk during business hours.</span>
          <em>+66 82 147 9553</em>
        </a>
        <a class="dg-desk-channel" href="mailto:dgholidaythailand@gmail.com">
          <span class="dg-desk-channel__ico" aria-hidden="true"><i data-lucide="mail" class="dg-lucide"></i></span>
          <strong>Email</strong>
          <span>Send program details and documents anytime.</span>
          <em>dgholidaythailand@gmail.com</em>
        </a>
        <a class="dg-desk-channel" href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
          <span class="dg-desk-channel__ico" aria-hidden="true"><img src="../images/social/line-app.png?v=1" alt="" width="44" height="44" /></span>
          <strong>LINE</strong>
          <span>Chat with our Official Account for quick replies.</span>
          <em>@dgholiday</em>
        </a>
        <a class="dg-desk-channel" href="https://wa.me/66821479553?text=Hello%20D%26G%20Holiday%2C%20I%20would%20like%20assistance." target="_blank" rel="noopener noreferrer">
          <span class="dg-desk-channel__ico" aria-hidden="true"><img src="../images/social/whatsapp-app.png?v=1" alt="" width="44" height="44" /></span>
          <strong>WhatsApp</strong>
          <span>Message our desk for itineraries and quotations.</span>
          <em>+66 82 147 9553</em>
        </a>
      </div>
    </div>
  </section>

  <section class="dg-desk-office" aria-labelledby="dg-desk-office-title">
    <div class="dg-desk__wrap">
      <div class="dg-desk-office__layout">
        <div class="dg-desk-office__card">
          <p class="dg-desk__eyebrow">Office</p>
          <h2 id="dg-desk-office-title">Bangkok operations desk</h2>
          <ul class="dg-desk-office__meta">
            <li>
              <span class="dg-desk-quick__ico" aria-hidden="true"><i data-lucide="map-pin" class="dg-lucide"></i></span>
              <div>
                <strong>Address</strong>
                <span>852/7 Pruksa Ville 60/2, Luang Phaeng Rd,<br />Thap Yao, Lat Krabang, Bangkok 10520</span>
              </div>
            </li>
            <li>
              <span class="dg-desk-quick__ico" aria-hidden="true"><i data-lucide="clock" class="dg-lucide"></i></span>
              <div>
                <strong>Hours</strong>
                <span>Monday – Friday, 09:00 – 18:00 (ICT)</span>
              </div>
            </li>
            <li>
              <span class="dg-desk-quick__ico" aria-hidden="true"><i data-lucide="badge-check" class="dg-lucide"></i></span>
              <div>
                <strong>Credentials</strong>
                <span>Tourism Business License 11/12868 · ATTA 05614</span>
              </div>
            </li>
          </ul>
          <div class="dg-desk-form__actions" style="margin-top:22px">
            <a class="dg-desk-btn dg-desk-btn--primary" href="../proposal/">Request a Quote</a>
            <a class="dg-desk-btn dg-desk-btn--ghost" href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
        <figure class="dg-desk-office__media">
          <img src="../images/services/business-meeting.jpg" alt="D&amp;G Holiday partner desk" width="900" height="700" loading="lazy" decoding="async" />
          <figcaption>Partner desk for agencies, corporates, MICE, and destination weddings.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="dg-desk-main" aria-labelledby="dg-desk-contact-form-title" style="padding-top:8px">
    <div class="dg-desk__wrap">
      <div class="dg-desk-main__layout">
        <aside class="dg-desk-aside">
          <p class="dg-desk__eyebrow">Message Us</p>
          <h2 id="dg-desk-contact-form-title" class="dg-desk__title">Send a short note</h2>
          <p class="dg-desk__lead">For a full MICE or wedding quotation, use the proposal form. For general questions, this note is enough.</p>
        </aside>
        <form class="dg-desk-form" id="dg-contact-form" action="mailto:dgholidaythailand@gmail.com" method="get">
          <div class="dg-desk-form__head">
            <h2>Contact form</h2>
            <p>We reply within one business day.</p>
          </div>
          <div class="dg-desk-form__grid">
            <label>Full Name<input name="name" required placeholder="Your name" autocomplete="name" /></label>
            <label>Email<input type="email" name="email" required placeholder="you@email.com" autocomplete="email" /></label>
            <label>Phone / WhatsApp<input name="phone" placeholder="+66 XX XXX XXXX" autocomplete="tel" /></label>
            <label>Topic
              <select name="topic">
                <option>General inquiry</option>
                <option>Travel Services</option>
                <option>MICE &amp; Events</option>
                <option>Weddings</option>
                <option>Partnership</option>
              </select>
            </label>
          </div>
          <label class="dg-desk-form__full">Message<textarea name="body" rows="5" required placeholder="How can we help?"></textarea></label>
          <input type="hidden" name="subject" value="Contact Inquiry" />
          <div class="dg-desk-form__actions">
            <button type="submit" class="dg-desk-btn dg-desk-btn--primary">Send Message <span aria-hidden="true">→</span></button>
            <a class="dg-desk-btn dg-desk-btn--ghost" href="../proposal/">Need a full proposal?</a>
          </div>
        </form>
      </div>
    </div>
  </section>
</article>
${renderPageCta({
  rel: "../",
  variant: "dg-page",
  title: "Ready to plan your journey?",
  text: "Share your brief with our partner desk — we reply with a tailored proposal.",
  primaryLabel: "Request A Proposal",
  primaryHref: "proposal/",
  secondaryLabel: "Back to Home",
  secondaryHref: "index.html",
})}`;
writePage(
  path.join("contact", "index.html"),
  wrapPage({
    title: "Contact Us",
    description: "Contact D&G Holiday Thailand by phone, email, LINE, or WhatsApp.",
    depth: contactDepth,
    body: contactBody,
    extraCss: DESK_CHROME.css,
    extraScript: revealScript(DESK_CHROME.reveal),
  })
);
count++;

// Articles folder index
writePage(
  path.join("articles", "index.html"),
  wrapPage({
    title: "Travel Blog & Destination Guide",
    description:
      "Expert travel tips, destination inspiration, event insights, and luxury travel experiences from D&G Holiday Thailand.",
    depth: 1,
    body: renderBlogHubPage("../"),
    extraCss: BLOG_CHROME.css,
    extraScript: revealScript(BLOG_CHROME.reveal),
  })
);
count++;
console.log("wrote articles/index.html");

// Update root redirect stubs to folder URLs
for (const [file, dest] of [
  ["about.html", "about/"],
  ["services.html", "travel-services/"],
  ["articles.html", "articles/"],
  ["contact.html", "contact/"],
]) {
  const full = path.join(root, file);
  const html = `<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8" />
<meta http-equiv="refresh" content="0;url=${dest}" />
<link rel="canonical" href="${dest}" />
<title>Redirecting…</title>
<script>location.replace(${JSON.stringify(dest)});</script>
</head><body><p><a href="${dest}">Continue to ${dest}</a></p></body></html>
`;
  fs.writeFileSync(full, html);
  console.log("redirect stub", file, "->", dest);
}

// --- Shared footer include ---
const includeFooter = footerHtml(0);
fs.writeFileSync(
  path.join(root, "includes", "site-footer.html"),
  `<!-- Shared site footer (matches Next.js SiteFooter / IA generator) -->\n${includeFooter}\n`
);
console.log("updated includes/site-footer.html");

console.log(`\nDone. Generated ${count} IA pages with shared homepage header.`);
