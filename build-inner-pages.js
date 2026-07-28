const fs = require("fs");
const path = require("path");

const marquee =
  "D&G Holiday (Thailand) Co., Ltd. — B2B travel partner in Thailand | Group Tours | FIT Tours | Events | Visa Services";

function header(active) {
  const nav = [
    ["index.html", "Home"],
    ["services.html", "Services"],
    ["about.html", "About Us"],
    ["articles.html", "Articles"],
    ["contact.html", "Contact"],
  ];
  const links = nav
    .map(([href, label]) => {
      const cls = href === active ? ' class="is-active"' : "";
      return `        <a href="${href}"${cls}>${label}</a>`;
    })
    .join("\n");

  return `  <header class="dg-chrome-header" id="dg-chrome-header">
    <div class="dg-chrome-header__shade" aria-hidden="true"></div>
    <div class="dg-chrome-header__inner">
      <div class="dg-chrome-header__row">
        <a class="dg-chrome-brand" href="index.html" aria-label="D&amp;G Holiday">
          <span class="dg-chrome-brand__text">D&amp;G Holiday</span>
        </a>
        <nav class="dg-chrome-nav" aria-label="Main menu">
${links}
        </nav>
        <div class="dg-chrome-actions">
          <div class="dg-chrome-lang">
            <img src="images/flags/th.svg" alt="" width="20" height="14" />
            <span>THB | TH</span>
          </div>
          <span class="dg-chrome-btn dg-chrome-btn--login">Log In</span>
          <span class="dg-chrome-btn dg-chrome-btn--signup">Sign Up</span>
        </div>
      </div>
    </div>
    <div class="dg-chrome-marquee-wrap">
      <div class="dg-chrome-marquee" aria-label="Company announcement">
        <div class="dg-chrome-marquee__track">
          <span class="dg-chrome-marquee__item">${marquee}</span>
          <span class="dg-chrome-marquee__item" aria-hidden="true">${marquee}</span>
        </div>
      </div>
    </div>
  </header>`;
}

const footer = `  <footer class="dg-chrome-footer">
    <div class="dg-chrome-footer__inner">
      <div class="dg-chrome-footer__grid">
        <div>
          <img class="dg-chrome-footer__logo" src="images/dg-holiday-logo.svg" alt="D&amp;G Holiday" width="200" height="90" loading="lazy" />
          <div class="dg-chrome-footer__block-title">ข้อมูลติดต่อ</div>
          <p class="dg-chrome-footer__contact">
            D&amp;G Holiday Thailand Co., Ltd.<br />
            852/7 พฤกษาวิลล์ 60/2 ถนนหลวงแพ่ง<br />
            แขวงทับยาว เขตลาดกระบัง กรุงเทพฯ 10520<br />
            โทร: <a href="tel:+66821479553">+66 82 147 9553</a><br />
            อีเมล: <a href="mailto:dgholidaythailand@gmail.com">dgholidaythailand@gmail.com</a><br />
            LINE: <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">@354ejhoo</a><br />
            Facebook: <a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">dgholidaythailand</a>
          </p>
          <div class="dg-chrome-footer__block-title">ช่องทางชำระเงิน</div>
          <div class="dg-chrome-payments">
            <img src="images/payments/1736409068278-213734dd376baa9642331bf4620bcb41.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736479220958-0c6dae87da47bf1bbf6ae51ab5150617.webp" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736479521542-46cd24bde2c3910f5fa4e2d653eb6c23.webp" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736480785634-7bd7a1c50dc24a0853b644f46c8b01df.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736479507703-3399918fb9e71924ef2dddd4f8ccd947.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736479511814-8264416bfb67d4a902623644c401b394.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736480762727-aef62311a0107a1e58dac9b3492b4f4c.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736480766464-76cce31dad31e2f72b89f4aea6c934b3.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736480772015-8e13294a9e031c44af797d68c3a36299.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736480775437-d4b01a73d59cf9b29a2197aaf6a8d26f.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736480778815-598c66ec3869ba9cd2275e123b9aaaac.png" alt="" width="84" height="28" loading="lazy" />
            <img src="images/payments/1736409268808-110a2a25fce25ddc7943d10b4f0edde4.png" alt="" width="84" height="28" loading="lazy" />
          </div>
        </div>
  
        <div class="dg-chrome-footer__right">
          <div class="dg-chrome-footer__about">
            <div class="dg-chrome-footer__col-title">เกี่ยวกับ D&amp;G Holiday</div>
            <ul class="dg-chrome-footer__links">
              <li><a href="http://localhost:3000/services">วิธีจองทัวร์</a></li>
              <li><a href="http://localhost:3000/contact">ติดต่อเรา</a></li>
              <li><a href="http://localhost:3000/contact">สอบถามบริการ</a></li>
              <li><a href="http://localhost:3000/about">เกี่ยวกับ D&amp;G Holiday</a></li>
            </ul>
            <div class="dg-chrome-footer__col-title dg-chrome-footer__col-title--spaced">ติดตามเราได้ทาง</div>
            <ul class="dg-chrome-social" aria-label="Social media">
              <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="images/social/facebook.svg" alt="" width="22" height="22" loading="lazy" /></a></li>
              <li><a href="https://www.instagram.com/dg.holiday" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="images/social/instagram.svg" alt="" width="22" height="22" loading="lazy" /></a></li>
              <li><a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer" aria-label="LINE"><img src="images/social/line.png" alt="" width="22" height="22" loading="lazy" /></a></li>
            </ul>
            <div class="dg-chrome-qr">
              <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer" aria-label="SCAN QR LINE">
                <span class="dg-chrome-qr__label">SCAN QR</span>
                <div class="dg-chrome-qr__frame">
                  <img src="images/dg-line-qr.png" alt="LINE QR Code" width="140" height="140" loading="lazy" />
                </div>
              </a>
            </div>
          </div>
  
          <div class="dg-chrome-footer__menus">
            <div class="dg-chrome-footer__cols dg-chrome-footer__cols--two">
              <div>
                <div class="dg-chrome-footer__col-title">ผลิตภัณฑ์</div>
                <ul class="dg-chrome-footer__links">
                  <li><a href="http://localhost:3000/services">จองที่พัก</a></li>
                  <li><a href="http://localhost:3000/services">แพ็กเกจทัวร์</a></li>
                  <li><a href="http://localhost:3000/services">รับ-ส่งสนามบิน</a></li>
                  <li><a href="http://localhost:3000/services">รถพร้อมคนขับ</a></li>
                  <li><a href="http://localhost:3000/services">อีเวนต์ &amp; MICE</a></li>
                  <li><a href="http://localhost:3000/services">ล่องเรือ</a></li>
                  <li><a href="http://localhost:3000/services">ทัวร์ VIP</a></li>
                  <li><a href="http://localhost:3000/services">ทัวร์ FIT</a></li>
                </ul>
              </div>
              <div>
                <div class="dg-chrome-footer__col-title">บริการเสริม</div>
                <ul class="dg-chrome-footer__links">
                  <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">D&amp;G Holiday Affiliate</a></li>
                  <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">ชวนเพื่อน</a></li>
                  <li><a href="http://localhost:3000/articles">บล็อก</a></li>
                  <li><a href="http://localhost:3000/contact">ประกาศความเป็นส่วนตัว</a></li>
                  <li><a href="http://localhost:3000/contact">ข้อกำหนดและเงื่อนไข</a></li>
                  <li><a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">ห้องข่าว D&amp;G Holiday</a></li>
                </ul>
              </div>
            </div>
  
            <div class="dg-chrome-newsletter">
              <div class="dg-chrome-newsletter__title">รับข่าวสารและโปรโมชัน</div>
              <form class="dg-chrome-newsletter__form" action="mailto:dgholidaythailand@gmail.com" method="get">
                <label class="sr-only" for="dg-footer-email">อีเมล</label>
                <input id="dg-footer-email" type="email" name="email" required autocomplete="email" placeholder="กรอกอีเมลของคุณ" />
                <button type="submit">สมัครรับข่าวสาร</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dg-chrome-footer__copy">Copyright © 2026 D&amp;G Holiday. All rights reserved</div>
  </footer>`

function wrap(meta, active, main) {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <meta name="theme-color" content="#FF5E1F" />
  <link rel="stylesheet" href="css/dg-site.css" />
  <link rel="stylesheet" href="css/dg-chrome.css" />
</head>
<body class="dg-inner">
${header(active)}
${main}
${footer}
  <script src="js/dg-site.js"></script>
</body>
</html>
`;
}

const pages = {
  "services.html": wrap(
    {
      title: "บริการ | D&amp;G Holiday",
      description:
        "บริการทัวร์ครบวงจร แพ็กเกจทัวร์ แลนด์ทัวร์ รับ-ส่งสนามบิน อีเวนต์ &amp; MICE และวีซ่า โดย D&amp;G Holiday Thailand",
    },
    "services.html",
    `  <section class="dg-page-hero" aria-label="บริการ">
    <div class="dg-page-hero__bg" style="background-image:url('images/dg-phuket.jpg')"></div>
    <div class="dg-wrap dg-page-hero__content">
      <span class="dg-page-hero__brand">D&amp;G Holiday</span>
      <h1>บริการของเรา</h1>
      <p>ทัวร์ครบวงจร ออกแบบตามงบและความต้องการ รองรับลูกค้าบุคคล กรุ๊ป องค์กร และอีเวนต์</p>
    </div>
  </section>

  <main>
    <section class="dg-section">
      <div class="dg-wrap">
        <div class="dg-section__head">
          <span class="dg-eyebrow">Tour Services</span>
          <h2>บริการด้านท่องเที่ยวแบบครบวงจร</h2>
          <p>จากแพ็กเกจทัวร์มาตรฐานถึงโปรแกรมสั่งทำพิเศษ เราดูแลตั้งแต่การวางแผน การเดินทาง จนถึงระหว่างทริป</p>
        </div>

        <article class="dg-service">
          <div class="dg-service__media"><img src="images/dg-phuket.jpg" alt="แพ็กเกจทัวร์ทะเล" loading="lazy" /></div>
          <div class="dg-service__body">
            <h3>แพ็กเกจทัวร์</h3>
            <p>ทัวร์ในประเทศและต่างประเทศ ปรับโปรแกรมได้ตามงบประมาณ วันที่เดินทาง และสไตล์การเที่ยว</p>
            <ul class="dg-service__list">
              <li>ทัวร์ในประเทศ (Thailand Inbound)</li>
              <li>ทัวร์ต่างประเทศ (Outbound)</li>
              <li>ทัวร์หมู่คณะ / ทัวร์ส่วนตัว / VIP</li>
              <li>ทัวร์ FIT และ Customized Program</li>
            </ul>
          </div>
        </article>

        <article class="dg-service dg-service--flip">
          <div class="dg-service__media"><img src="images/dg-krabi.jpg" alt="แลนด์โอเปอเรเตอร์" loading="lazy" /></div>
          <div class="dg-service__body">
            <h3>แลนด์โอเปอเรเตอร์ (DMC)</h3>
            <p>รับกรุ๊ปจากต่างประเทศและดูแลทั้งทริปตั้งแต่ถึงไทยจนเดินทางกลับ พร้อมไกด์หลายภาษา</p>
            <ul class="dg-service__list">
              <li>วางแผนเส้นทาง Logistics และ Timeline</li>
              <li>ดูแล Arrival – Departure</li>
              <li>ไกด์ภาษาไทย อังกฤษ และภาษาอื่นตามคำขอ</li>
              <li>ประสานที่พัก ร้านอาหาร และกิจกรรม</li>
            </ul>
          </div>
        </article>

        <article class="dg-service">
          <div class="dg-service__media"><img src="images/dg-samui.jpg" alt="รับส่งสนามบิน" loading="lazy" /></div>
          <div class="dg-service__body">
            <h3>รถรับ-ส่ง &amp; การเดินทาง</h3>
            <p>บริการรถรับส่งสนามบินและรถตู้สำหรับกรุ๊ป ทัวร์ หรือองค์กร</p>
            <ul class="dg-service__list">
              <li>Airport Transfer</li>
              <li>รถตู้ VIP / รถบัสกรุ๊ป</li>
              <li>จัดสรรคนขับและเส้นทางตามโปรแกรม</li>
            </ul>
          </div>
        </article>

        <article class="dg-service dg-service--flip">
          <div class="dg-service__media"><img src="images/dg-trang.jpg" alt="อีเวนต์และ MICE" loading="lazy" /></div>
          <div class="dg-service__body">
            <h3>อีเวนต์ &amp; MICE</h3>
            <p>จัดงานสัมมนา ทริปองค์กร Incentive และงานอีเวนต์ที่ผสานการท่องเที่ยว</p>
            <ul class="dg-service__list">
              <li>Meeting / Incentive / Conference / Exhibition</li>
              <li>ทริปบริษัทและ Team Building</li>
              <li>จัดสถานที่ อาหาร และกิจกรรมเสริม</li>
            </ul>
          </div>
        </article>

        <article class="dg-service">
          <div class="dg-service__media"><img src="images/dg-songkhla.jpg" alt="บริการวีซ่า" loading="lazy" /></div>
          <div class="dg-service__body">
            <h3>บริการขอวีซ่า</h3>
            <p>ช่วยเตรียมเอกสารและประสานงานขอวีซ่าสำหรับทัวร์ต่างประเทศ ตามเงื่อนไขของแต่ละประเทศ</p>
            <ul class="dg-service__list">
              <li>ให้คำปรึกษาประเภทวีซ่า</li>
              <li>ตรวจเช็คเอกสารเบื้องต้น</li>
              <li>ประสานร่วมกับโปรแกรมทัวร์</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section class="dg-cta">
      <div class="dg-cta__bg" aria-hidden="true"></div>
      <div class="dg-wrap dg-cta__inner">
        <div>
          <h2>อยากได้โปรแกรมที่ใช่สำหรับทริปคุณ?</h2>
          <p>บอกปลายทาง งบ และจำนวนผู้เดินทาง แล้วให้ทีมเราออกแบบแพ็กเกจให้</p>
        </div>
        <div class="dg-cta__actions">
          <a class="dg-btn" href="https://page.line.me/354ejhoo" target="_blank" rel="noopener">ปรึกษาผ่าน LINE</a>
          <a class="dg-btn dg-btn--ghost" href="contact.html">หน้าติดต่อ</a>
        </div>
      </div>
    </section>
  </main>`
  ),

  // about.html is hand-maintained (css/dg-about.css)

  "articles.html": wrap(
    {
      title: "บทความ | D&amp;G Holiday",
      description:
        "บทความท่องเที่ยว เคล็ดลับวางแผนทริป และไอเดียจุดหมายในไทยจาก D&amp;G Holiday",
    },
    "articles.html",
    `  <section class="dg-page-hero" aria-label="บทความ">
    <div class="dg-page-hero__bg" style="background-image:url('images/dg-trang.jpg')"></div>
    <div class="dg-wrap dg-page-hero__content">
      <span class="dg-page-hero__brand">D&amp;G Holiday</span>
      <h1>บทความท่องเที่ยว</h1>
      <p>ไอเดียจุดหมาย เคล็ดลับจัดทริป และแนวทางเลือกแพ็กเกจให้คุ้มกับงบของคุณ</p>
    </div>
  </section>

  <main>
    <section class="dg-section">
      <div class="dg-wrap">
        <div class="dg-section__head">
          <span class="dg-eyebrow">Travel Notes</span>
          <h2>อ่านก่อนวางแผนทริป</h2>
          <p>รวบรวมบทความสั้นที่ช่วยให้ตัดสินใจได้ง่ายขึ้น ทั้งทริปทะเล ทริปกรุ๊ป และทริปองค์กร</p>
        </div>
        <div class="dg-articles">
          <a class="dg-article" href="contact.html">
            <div class="dg-article__media"><img src="images/dg-phuket.jpg" alt="ภูเก็ต" loading="lazy" /></div>
            <div class="dg-article__body">
              <span class="dg-article__meta">ทะเลใต้ · 3–4 วัน</span>
              <h3>ภูเก็ตแบบไม่เร่ง: เกาะ หาด และอาหารทะเลในทริปสั้น</h3>
              <p>โครงทริปที่บาลานซ์ระหว่างพักผ่อนและกิจกรรมน้ำ เหมาะกับครอบครัวและคู่รัก</p>
            </div>
          </a>
          <a class="dg-article" href="contact.html">
            <div class="dg-article__media"><img src="images/dg-krabi.jpg" alt="กระบี่" loading="lazy" /></div>
            <div class="dg-article__body">
              <span class="dg-article__meta">กระบี่ · ทัวร์ส่วนตัว</span>
              <h3>กระบี่แบบ Private: เมื่อไหร่ควรเลือกทัวร์ส่วนตัว</h3>
              <p>เหมาะเมื่ออยากคุมเวลาเอง มีผู้สูงอายุ หรืออยากโฟกัสจุดหมายเฉพาะ</p>
            </div>
          </a>
          <a class="dg-article" href="contact.html">
            <div class="dg-article__media"><img src="images/dg-samui.jpg" alt="สมุย" loading="lazy" /></div>
            <div class="dg-article__body">
              <span class="dg-article__meta">สมุย · พักผ่อน</span>
              <h3>สมุยสำหรับคนอยากพักจริง ๆ ไม่ต้องวิ่งทั้งวัน</h3>
              <p>เลือกที่พัก หาด และกิจกรรมเบา ๆ ให้ทริปรู้สึกผ่อนคลายตั้งแต่วันแรก</p>
            </div>
          </a>
          <a class="dg-article" href="contact.html">
            <div class="dg-article__media"><img src="images/dg-songkhla.jpg" alt="ทริปองค์กร" loading="lazy" /></div>
            <div class="dg-article__body">
              <span class="dg-article__meta">MICE · องค์กร</span>
              <h3>วางทริปบริษัทให้ได้ทั้งงานและบรรยากาศ</h3>
              <p>เช็คลิสต์สั้น ๆ สำหรับ Incentive และ Team Building ที่จัดการได้จริง</p>
            </div>
          </a>
          <a class="dg-article" href="contact.html">
            <div class="dg-article__media"><img src="images/dg-trang.jpg" alt="ตรัง" loading="lazy" /></div>
            <div class="dg-article__body">
              <span class="dg-article__meta">ตรัง · ทะเลเงียบ</span>
              <h3>ตรังและหมู่เกาะใกล้เคียง สำหรับคนอยากหนีฝูงชน</h3>
              <p>ไอเดียเส้นทางทะเลที่เงียบกว่า แต่ยังครบทั้งเรือ เกาะ และวิว</p>
            </div>
          </a>
          <a class="dg-article" href="contact.html">
            <div class="dg-article__media"><img src="images/dg-footer-bg.png" alt="วางแผนงบทัวร์" loading="lazy" /></div>
            <div class="dg-article__body">
              <span class="dg-article__meta">เคล็ดลับ · งบประมาณ</span>
              <h3>บอกงบยังไงให้ได้โปรแกรมที่ตรงความต้องการ</h3>
              <p>ข้อมูลที่ควรเตรียมก่อนคุยกับเอเจนซี เพื่อให้ได้ใบเสนอราคาที่ชัดและเปรียบเทียบได้</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="dg-cta">
      <div class="dg-cta__bg" aria-hidden="true"></div>
      <div class="dg-wrap dg-cta__inner">
        <div>
          <h2>อยากได้บทความเฉพาะจุดหมายของคุณ?</h2>
          <p>บอกปลายทางและจำนวนวัน ทีมเราช่วยสรุปโครงทริปให้ได้ทันที</p>
        </div>
        <div class="dg-cta__actions">
          <a class="dg-btn" href="https://page.line.me/354ejhoo" target="_blank" rel="noopener">ถามผ่าน LINE</a>
          <a class="dg-btn dg-btn--ghost" href="contact.html">ส่งข้อความ</a>
        </div>
      </div>
    </section>
  </main>`
  ),

  "contact.html": wrap(
    {
      title: "ติดต่อ | D&amp;G Holiday",
      description:
        "ติดต่อ D&amp;G Holiday Thailand โทร อีเมล LINE และแบบฟอร์มสอบถามแพ็กเกจทัวร์",
    },
    "contact.html",
    `  <section class="dg-page-hero" aria-label="ติดต่อ">
    <div class="dg-page-hero__bg" style="background-image:url('images/dg-songkhla.jpg')"></div>
    <div class="dg-wrap dg-page-hero__content">
      <span class="dg-page-hero__brand">D&amp;G Holiday</span>
      <h1>ติดต่อเรา</h1>
      <p>สอบถามแพ็กเกจ ขอใบเสนอราคา หรือคุยออกแบบทริปกับทีมได้โดยตรง</p>
    </div>
  </section>

  <main>
    <section class="dg-section">
      <div class="dg-wrap">
        <div class="dg-contact-grid">
          <div>
            <div class="dg-section__head" style="margin-bottom:1.5rem">
              <span class="dg-eyebrow">Get in touch</span>
              <h2>ช่องทางติดต่อ</h2>
              <p>เลือกช่องทางที่สะดวกที่สุด ทีมเราพร้อมช่วยวางแผนทริปให้</p>
            </div>
            <div class="dg-contact-cards">
              <a class="dg-contact-card" href="tel:+66821479553"><strong>โทรศัพท์</strong><span>+66 82 147 9553</span></a>
              <a class="dg-contact-card" href="mailto:dgholidaythailand@gmail.com"><strong>อีเมล</strong><span>dgholidaythailand@gmail.com</span></a>
              <a class="dg-contact-card" href="https://page.line.me/354ejhoo" target="_blank" rel="noopener"><strong>LINE Official</strong><span>@354ejhoo</span></a>
              <a class="dg-contact-card" href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener"><strong>Facebook</strong><span>dgholidaythailand</span></a>
            </div>
            <div class="dg-contact-address">
              <h3>ที่อยู่สำนักงาน</h3>
              <p>D&amp;G Holiday Thailand Co., Ltd.<br />
              852/7 พฤกษาวิลล์ 60/2 ถนนหลวงแพ่ง<br />
              แขวงทับยาว เขตลาดกระบัง<br />
              กรุงเทพมหานคร 10520</p>
            </div>
            <div class="dg-contact-qr">
              <img src="images/dg-line-qr.png" alt="QR Code LINE Official Account D&amp;G Holiday" width="140" height="140" />
              <div>
                <strong>SCAN QR</strong>
                <p>สแกนเพื่อเพิ่มเพื่อน LINE Official Account และสอบถามทัวร์ได้ทันที</p>
              </div>
            </div>
          </div>
          <div class="dg-contact-form-wrap">
            <h2>ส่งข้อความหาเรา</h2>
            <p class="dg-contact-form-lead">กรอกข้อมูลแล้วกดส่ง ระบบจะเปิด LINE และคัดลอกข้อความของคุณไว้ให้วางในแชท</p>
            <form id="dg-contact-form" class="dg-contact-form" novalidate>
              <label><span>ชื่อ-นามสกุล</span><input type="text" name="name" required placeholder="ชื่อของคุณ" autocomplete="name" /></label>
              <label><span>เบอร์โทร</span><input type="tel" name="phone" required placeholder="08x xxx xxxx" autocomplete="tel" /></label>
              <label><span>อีเมล</span><input type="email" name="email" placeholder="you@email.com" autocomplete="email" /></label>
              <label>
                <span>เรื่องที่สนใจ</span>
                <select name="topic">
                  <option value="แพ็กเกจทัวร์">แพ็กเกจทัวร์</option>
                  <option value="ทัวร์ส่วนตัว / Custom">ทัวร์ส่วนตัว / Custom</option>
                  <option value="แลนด์ทัวร์ / DMC">แลนด์ทัวร์ / DMC</option>
                  <option value="รับ-ส่งสนามบิน">รับ-ส่งสนามบิน</option>
                  <option value="อีเวนต์ / MICE">อีเวนต์ / MICE</option>
                  <option value="วีซ่า">วีซ่า</option>
                  <option value="อื่น ๆ">อื่น ๆ</option>
                </select>
              </label>
              <label class="dg-contact-form__full">
                <span>รายละเอียด</span>
                <textarea name="message" rows="5" required placeholder="บอกปลายทาง วันที่ จำนวนผู้เดินทาง และงบโดยประมาณ"></textarea>
              </label>
              <div class="dg-contact-form__actions">
                <button type="submit" class="dg-btn">ส่งผ่าน LINE</button>
              </div>
              <p id="dg-form-note" class="dg-form-note" hidden></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>`
  ),
};

for (const [file, html] of Object.entries(pages)) {
  fs.writeFileSync(path.join(__dirname, file), html, "utf8");
  console.log("Wrote", file);
}
