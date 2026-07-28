const fs = require("fs");
const path = require("path");
const indexPath = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

console.log("Theme Parks", html.includes("Theme Parks"));
console.log("dg-why", html.includes('id="dg-why"'));
console.log("hero brand", html.includes("D&amp;G HOLIDAY THAILAND"));
console.log("TRAVEL footer", html.includes('col-title">TRAVEL<'));
console.log("footer creds class", html.includes("dg-chrome-footer__creds"));

const marker =
  'Facebook: <a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">dgholidaythailand</a>\n        </p>\n        <div class="dg-chrome-footer__block-title">ช่องทางชำระเงิน</div>';

const withCreds =
  `Facebook: <a href="https://www.facebook.com/dgholidaythailand" target="_blank" rel="noopener noreferrer">dgholidaythailand</a>
        </p>
        <p class="dg-chrome-footer__creds">
          <strong>ใบอนุญาต / Tourism Business License No.:</strong> 11/12868<br />
          <strong>Company Registration No.:</strong> 0105561154132<br />
          <strong>ATTA Member:</strong> 05614
        </p>
        <div class="dg-chrome-footer__block-title">ช่องทางชำระเงิน</div>`;

if (html.includes("dg-chrome-footer__creds")) {
  console.log("footer creds already in index");
} else if (html.includes(marker)) {
  html = html.replace(marker, withCreds);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("inserted footer creds");
} else {
  console.log("MARKER NOT FOUND");
  const i = html.indexOf("dgholidaythailand</a>");
  console.log(html.slice(i, i + 280));
}
