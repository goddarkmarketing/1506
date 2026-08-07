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
        </div>
        <div class="dg-chrome-footer__right">
          <div class="dg-chrome-footer__about">
            <div class="dg-chrome-footer__col-title">เกี่ยวกับ D&amp;G Holiday</div>
            <ul class="dg-chrome-footer__links">
              <li><a href="travel-services/">Travel Services</a></li>
              <li><a href="contact/">ติดต่อเรา</a></li>
              <li><a href="proposal/">Request a Proposal</a></li>
              <li><a href="about/">เกี่ยวกับ D&amp;G Holiday</a></li>
            </ul>
          </div>
          <div class="dg-chrome-footer__menus">
            <div class="dg-chrome-footer__cols dg-chrome-footer__cols--two">
              <div>
                <div class="dg-chrome-footer__col-title">EXPLORE</div>
                <ul class="dg-chrome-footer__links">
                  <li><a href="about/">About Us</a></li>
                  <li><a href="travel-services/">Travel Services</a></li>
                  <li><a href="destinations/">Destinations</a></li>
                  <li><a href="gallery/">Gallery</a></li>
                  <li><a href="articles/">Blog &amp; Travel Guide</a></li>
                </ul>
              </div>
              <div>
                <div class="dg-chrome-footer__col-title">BUSINESS</div>
                <ul class="dg-chrome-footer__links">
                  <li><a href="mice/">MICE &amp; Corporate</a></li>
                  <li><a href="events/">Event Management</a></li>
                  <li><a href="india-market/">India Market</a></li>
                  <li><a href="destination-weddings/">Destination Weddings</a></li>
                  <li><a href="proposal/">Request a Proposal</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dg-chrome-footer__copy">Copyright © 2026 D&amp;G Holiday. All rights reserved</div>
  </footer>`
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
