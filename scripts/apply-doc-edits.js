const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

function mustReplace(label, from, to) {
  if (!html.includes(from)) {
    throw new Error(`Missing target for: ${label}`);
  }
  html = html.replace(from, to);
  console.log("OK:", label);
}

function replaceAll(label, from, to) {
  const count = html.split(from).length - 1;
  if (!count) throw new Error(`Missing target for: ${label}`);
  html = html.split(from).join(to);
  console.log(`OK: ${label} (${count})`);
}

// 1) Link luxury homepage CSS
mustReplace(
  "link home css",
  '<link rel="stylesheet" href="css/dg-chrome.css" />',
  '<link rel="stylesheet" href="css/dg-chrome.css" /><link rel="stylesheet" href="css/dg-home-edits.css" />'
);

// 2) Hero background → destination image, remove blur
mustReplace(
  "hero bg src",
  'src="images/1760028620296-06202d013558f43b27b5d2e702f6c18a.png" srcset="images/1760028620296-06202d013558f43b27b5d2e702f6c18a.png 1x, images/1760028620296-06202d013558f43b27b5d2e702f6c18a_1.png 2x, images/1760028620296-06202d013558f43b27b5d2e702f6c18a_2.png 3x" decoding="async" width="100%" height="100%" class="r-u8s1d r-1wyyakw" style="-webkit-filter:blur(8px);filter:blur(8px);object-fit:cover;object-position:top center"',
  'src="images/dg-phuket.jpg" decoding="async" width="100%" height="100%" class="r-u8s1d r-1wyyakw" style="object-fit:cover;object-position:center center"'
);

// 3) Hero copy + CTAs
mustReplace(
  "hero copy",
  `<h1 aria-level="1" dir="auto" role="heading" class="css-4rbku5 css-901oao r-fdjqy7 dg-hero-heading">ทัวร์ครบวงจร กับ <span class="dg-hero-brand"><span class="dg-hero-brand__text">D&amp;G Holiday</span></span></h1>
<p class="dg-hero-sub">ออกแบบทริปในและต่างประเทศได้ตามงบ พร้อมดูแลกรุ๊ป FIT อีเวนต์ และวีซ่าครบวงจร</p>`,
  `<h1 aria-level="1" dir="auto" role="heading" class="css-4rbku5 css-901oao r-fdjqy7 dg-hero-heading"><span class="dg-hero-kicker">Explore the world with</span><span class="dg-hero-brand"><span class="dg-hero-brand__text">D&amp;G HOLIDAY THAILAND</span></span></h1>
<p class="dg-hero-sub">เหนือกว่าการเดินทาง คือประสบการณ์ที่ออกแบบเพื่อคุณ</p>
<p class="dg-hero-tags">Tailor-Made Travel • Group Tours • Corporate &amp; MICE • VIP Experiences</p>
<div class="dg-hero-ctas">
  <a class="dg-hero-cta dg-hero-cta--primary" href="#merchandising">ค้นหาโปรแกรมทัวร์</a>
  <a class="dg-hero-cta dg-hero-cta--ghost" href="http://localhost:3000/contact">ออกแบบทริปส่วนตัว</a>
</div>`
);

// 4) Insert WHY + audience sections before merchandising
const sections = fs.readFileSync(path.join(root, "includes/home-trust-sections.html"), "utf8").trim();
if (html.includes('id="dg-why"')) {
  console.log("SKIP: trust sections already present");
} else {
  mustReplace(
    "insert trust sections",
    '<div class="css-1dbjc4n" id="merchandising">',
    `${sections}\n<div class="css-1dbjc4n" id="merchandising">`
  );
}

// 5) Experiences section rename
mustReplace(
  "experiences title",
  "ออกแบบทริปตามงบคุณได้เลย",
  "EXPERIENCES &amp; ATTRACTIONS"
);
mustReplace("tab mice", ">อีเวนต์ & MICE<", ">Theme Parks<");
mustReplace("tab tours", ">ทัวร์<", ">Dinner Cruises<");
mustReplace("tab playground", ">สนามเด็กเล่น<", ">Cultural Shows<");

// Add two more category pills after Cultural Shows if the structure allows —
// The current UI only has 3 tabs; leave as 3 primary categories and mention Island/Day in title area via CSS note.
// Soften by adding Island Trips / Day Tours as extra tabs if markup pattern repeats.

const extraTabsNeedle =
  `<div dir="auto" class="css-901oao r-1enofrn r-1w9mtv9 r-1cwl3u0 r-fdjqy7" style="color:rgba(255,94,31,1.00);font-family:"Godwit",sans-serif;font-weight:600"="">Cultural Shows</div></div></div></div></div></div></div></div>`;
const extraTabsInsert =
  `<div dir="auto" class="css-901oao r-1enofrn r-1w9mtv9 r-1cwl3u0 r-fdjqy7" style="color:rgba(255,94,31,1.00);font-family:"Godwit",sans-serif;font-weight:600"="">Cultural Shows</div></div></div></div><div class="css-1dbjc4n" style="padding-right:12px"></div><div tabindex="0" class="css-1dbjc4n r-1loqt21 r-p1pxzi r-1otgn73 r-1i6wzkk r-lrvibr" style="-webkit-transition-duration:0s;transition-duration:0s"><div class="css-1dbjc4n r-cpet4d r-ymttw5 r-5njf8e" style="background-color:rgba(247,249,250,1.00)"><div class="css-1dbjc4n r-1awozwy r-18u37iz"><div dir="auto" class="css-901oao r-1enofrn r-1w9mtv9 r-1cwl3u0 r-fdjqy7" style="color:rgba(255,94,31,1.00);font-family:"Godwit",sans-serif;font-weight:600"="">Island Trips</div></div></div></div><div class="css-1dbjc4n" style="padding-right:12px"></div><div tabindex="0" class="css-1dbjc4n r-1loqt21 r-p1pxzi r-1otgn73 r-1i6wzkk r-lrvibr" style="-webkit-transition-duration:0s;transition-duration:0s"><div class="css-1dbjc4n r-cpet4d r-ymttw5 r-5njf8e" style="background-color:rgba(247,249,250,1.00)"><div class="css-1dbjc4n r-1awozwy r-18u37iz"><div dir="auto" class="css-901oao r-1enofrn r-1w9mtv9 r-1cwl3u0 r-fdjqy7" style="color:rgba(255,94,31,1.00);font-family:"Godwit",sans-serif;font-weight:600"="">Day Tours</div></div></div></div></div></div></div></div>`;

if (html.includes(extraTabsNeedle)) {
  mustReplace("extra experience tabs", extraTabsNeedle, extraTabsInsert);
} else {
  console.log("WARN: could not insert Island/Day tabs — Cultural Shows tab pattern mismatch");
}

// 6) Footer company name + credentials in index.html contact block
mustReplace(
  "footer company name",
  "D&amp;G Holiday Thailand Co., Ltd.<br />\n          852/7",
  "D&amp;G Holiday (Thailand) Co., Ltd.<br />\n          852/7"
);

const credsHtml = `        <p class="dg-chrome-footer__creds">
          <strong>ใบอนุญาต / Tourism Business License No.:</strong> 11/12868<br />
          <strong>Company Registration No.:</strong> 0105561154132<br />
          <strong>ATTA Member:</strong> 05614
        </p>
`;

if (!html.includes("Tourism Business License No.:")) {
  mustReplace(
    "footer credentials",
    `Facebook: <a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">dgholidaythailand</a>
        </p>
        <div class="dg-chrome-footer__block-title">ช่องทางชำระเงิน</div>`,
    `Facebook: <a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">dgholidaythailand</a>
        </p>
${credsHtml}        <div class="dg-chrome-footer__block-title">ช่องทางชำระเงิน</div>`
  );
} else {
  console.log("SKIP: footer credentials already present");
}

// 7) Footer columns → TRAVEL / BUSINESS
mustReplace(
  "footer travel column",
  `<div class="dg-chrome-footer__col-title">ผลิตภัณฑ์</div>
              <ul class="dg-chrome-footer__links">
                <li><a href="http://localhost:3000/services">จองที่พัก</a></li>
                <li><a href="http://localhost:3000/services">แพ็กเกจทัวร์</a></li>
                <li><a href="http://localhost:3000/services">รับ-ส่งสนามบิน</a></li>
                <li><a href="http://localhost:3000/services">รถพร้อมคนขับ</a></li>
                <li><a href="http://localhost:3000/services">อีเวนต์ &amp; MICE</a></li>
                <li><a href="http://localhost:3000/services">ล่องเรือ</a></li>
                <li><a href="http://localhost:3000/services">ทัวร์ VIP</a></li>
                <li><a href="http://localhost:3000/services">ทัวร์ FIT</a></li>
              </ul>`,
  `<div class="dg-chrome-footer__col-title">TRAVEL</div>
              <ul class="dg-chrome-footer__links">
                <li><a href="http://localhost:3000/services">Tours</a></li>
                <li><a href="http://localhost:3000/services">Hotels</a></li>
                <li><a href="http://localhost:3000/services">Private Tours</a></li>
                <li><a href="http://localhost:3000/services">Transfers</a></li>
              </ul>`
);

mustReplace(
  "footer business column",
  `<div class="dg-chrome-footer__col-title">บริการเสริม</div>
              <ul class="dg-chrome-footer__links">
                <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">D&amp;G Holiday Affiliate</a></li>
                <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">ชวนเพื่อน</a></li>
                <li><a href="http://localhost:3000/articles">บล็อก</a></li>
                <li><a href="http://localhost:3000/contact">ประกาศความเป็นส่วนตัว</a></li>
                <li><a href="http://localhost:3000/contact">ข้อกำหนดและเงื่อนไข</a></li>
                <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">ห้องข่าว D&amp;G Holiday</a></li>
              </ul>`,
  `<div class="dg-chrome-footer__col-title">BUSINESS</div>
              <ul class="dg-chrome-footer__links">
                <li><a href="http://localhost:3000/services">B2B Travel Partner</a></li>
                <li><a href="http://localhost:3000/services">Corporate Travel</a></li>
                <li><a href="http://localhost:3000/services">MICE &amp; Events</a></li>
                <li><a href="http://localhost:3000/services">Group Series</a></li>
                <li><a href="http://localhost:3000/services">DMC Thailand</a></li>
                <li><a href="http://localhost:3000/articles">บล็อก</a></li>
                <li><a href="http://localhost:3000/contact">ประกาศความเป็นส่วนตัว</a></li>
              </ul>`
);

// 8) Meta title/description soft upgrade
mustReplace(
  "meta title",
  "<title>D&G Holiday Thailand - ทัวร์ครบวงจร อีเวนต์ และบริการท่องเที่ยว</title>",
  "<title>D&G Holiday Thailand | Explore the World With Tailor-Made Travel</title>"
);

fs.writeFileSync(indexPath, html, "utf8");
console.log("Wrote index.html");
