/**
 * Mobile horizontal overflow audit — run against local serve.
 * Usage: node scripts/test-mobile-overflow.js [baseUrl]
 */
const puppeteer = require("puppeteer");

const BASE = process.argv[2] || "http://localhost:1506";
const WIDTHS = [320, 360, 375, 390, 393, 412, 430];
const PAGES = [
  "/",
  "/contact/",
  "/about/partners-certifications/",
  "/proposal/",
  "/travel-services/",
  "/destinations/thailand/",
];

const OVERFLOW_JS = `(() => {
  const vw = window.innerWidth;
  const offenders = [];
  document.querySelectorAll("*").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 && rect.height < 1) return;
    if (rect.right > vw + 1 || rect.left < -1) {
      const tag = el.tagName.toLowerCase();
      const id = el.id ? "#" + el.id : "";
      const cls = el.className && typeof el.className === "string"
        ? "." + el.className.trim().split(/\\s+/).slice(0, 3).join(".")
        : "";
      offenders.push({
        sel: tag + id + cls,
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        vw,
      });
    }
  });
  return {
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    offenders: offenders.slice(0, 15),
    offenderCount: offenders.length,
  };
})()`;

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  let failures = 0;

  for (const pagePath of PAGES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width, height: 800, deviceScaleFactor: 1 });
      const url = BASE + pagePath;
      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      } catch (e) {
        console.error(`FAIL load ${url} @${width}px:`, e.message);
        failures++;
        await page.close();
        continue;
      }
      const result = await page.evaluate(OVERFLOW_JS);
      const overflow =
        result.scrollWidth > result.clientWidth + 1 || result.offenderCount > 0;
      if (overflow) {
        failures++;
        console.log(`\nOVERFLOW ${pagePath} @${width}px`);
        console.log(`  scrollWidth=${result.scrollWidth} clientWidth=${result.clientWidth}`);
        console.log(`  offenders=${result.offenderCount}`);
        result.offenders.forEach((o) =>
          console.log(`    ${o.sel} left=${o.left} right=${o.right} w=${o.width} vw=${o.vw}`)
        );
      }
      await page.close();
    }
  }

  await browser.close();
  if (failures) {
    console.log(`\n${failures} overflow case(s) found.`);
    process.exit(1);
  }
  console.log("All pages pass mobile overflow check.");
})();
