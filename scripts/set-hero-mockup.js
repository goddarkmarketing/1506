const fs = require("fs");
const path = require("path");
const indexPath = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const start = html.indexOf('<div class="css-1dbjc4n r-1awozwy r-6koalj r-1fz3rvf dg-hero-title">');
if (start < 0) {
  console.error("hero title not found");
  process.exit(1);
}
const endMarker = '</div><div tabindex="0" class="css-1dbjc4n r-1wzrnnt r-6yljno r-bnwqim r-pezta">';
const end = html.indexOf(endMarker, start);
if (end < 0) {
  console.error("hero end not found");
  process.exit(1);
}

const newHero = `<div class="css-1dbjc4n r-1awozwy r-6koalj r-1fz3rvf dg-hero-title">
  <h1 class="dg-hero-heading" aria-level="1" role="heading">
    เที่ยวรอบโลก<br />ไปกับ <span class="dg-hero-brand"><span class="dg-hero-brand__text">D&amp;G HOLIDAY</span></span>
  </h1>
  <p class="dg-hero-sub">ประสบการณ์การเดินทาง ที่มากกว่าความประทับใจ</p>
  <ul class="dg-hero-features" aria-label="จุดเด่น">
    <li class="dg-hero-feature">
      <i data-lucide="map-pin" aria-hidden="true"></i>
      <span>
        <strong>ทัวร์คุณภาพ</strong>
        <small>มาตรฐานสูง</small>
      </span>
    </li>
    <li class="dg-hero-feature">
      <i data-lucide="heart" aria-hidden="true"></i>
      <span>
        <strong>บริการด้วยใจ</strong>
        <small>ใส่ใจทุกการเดินทาง</small>
      </span>
    </li>
    <li class="dg-hero-feature">
      <i data-lucide="shield-check" aria-hidden="true"></i>
      <span>
        <strong>ราคาคุ้มค่า</strong>
        <small>คุ้มทุกการลงทุน</small>
      </span>
    </li>
  </ul>
  <div class="dg-hero-ctas">
    <a class="dg-hero-cta dg-hero-cta--primary" href="#merchandising">ดูโปรแกรมทัวร์ทั้งหมด <span aria-hidden="true">→</span></a>
  </div>
</div>`;

html = html.slice(0, start) + newHero + html.slice(end);
fs.writeFileSync(indexPath, html, "utf8");
console.log("hero content replaced");
