/**
 * Rebuild dg-cta-dock: edge bar, Home centered, search-btn orange active.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const ICONS = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  line: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  wa: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  quote: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  call: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
};

/** Home is center (index 2) */
const ORDER = [
  { key: "line", label: "LINE", icon: ICONS.line },
  { key: "wa", label: "WhatsApp", icon: ICONS.wa },
  { key: "home", label: "Home", icon: ICONS.home },
  { key: "quote", label: "Quote", icon: ICONS.quote },
  { key: "call", label: "Call", icon: ICONS.call },
];

function classify(href) {
  const h = (href || "").toLowerCase();
  if (/line\.me|page\.line/.test(h)) return "line";
  if (/wa\.me|whatsapp/.test(h)) return "wa";
  if (/^tel:/.test(h)) return "call";
  if (/proposal/.test(h)) return "quote";
  return "home";
}

function buildDock(byKey) {
  const items = ORDER.map((m) => {
    const a = byKey[m.key] || { href: "#", attrs: "" };
    const active = m.key === "home" ? " is-active" : "";
    return `    <li class="dg-cta-dock__item${active}" data-dock="${m.key}">
      <a href="${a.href}"${a.attrs} aria-label="${m.label}">
        <span class="dg-cta-dock__icon">${m.icon}</span>
      </a>
    </li>`;
  }).join("\n");

  return `<nav class="dg-cta-dock" aria-label="Quick contact">
  <ul class="dg-cta-dock__list">
${items}
    <li class="dg-cta-dock__indicator" aria-hidden="true"></li>
  </ul>
</nav>`;
}

function parseAnchors(oldNav) {
  const re = /<a\s+([^>]*?)>/gi;
  const byKey = {};
  let m;
  while ((m = re.exec(oldNav))) {
    const attrs = m[1];
    const hrefM = attrs.match(/href="([^"]*)"/i);
    const href = hrefM ? hrefM[1] : "#";
    let extra = "";
    if (/target=/i.test(attrs)) {
      const t = attrs.match(/target="([^"]*)"/i);
      const r = attrs.match(/rel="([^"]*)"/i);
      if (t) extra += ` target="${t[1]}"`;
      if (r) extra += ` rel="${r[1]}"`;
    }
    const key = classify(href);
    byKey[key] = { href, attrs: extra };
  }
  return byKey;
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "web") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const dockRe = /<nav class="dg-cta-dock"[^>]*>[\s\S]*?<\/nav>/;
let changed = 0;
for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, "utf8");
  if (!dockRe.test(html)) continue;
  html = html.replace(dockRe, (oldNav) => buildDock(parseAnchors(oldNav)));
  if (!html.includes("dg-cta-dock.js")) {
    const rel = path.relative(ROOT, path.dirname(file));
    const depth = rel === "" ? 0 : rel.split(path.sep).filter(Boolean).length;
    const prefix = depth === 0 ? "" : "../".repeat(depth);
    html = html.replace("</body>", `<script src="${prefix}js/dg-cta-dock.js" defer></script>\n</body>`);
  }
  html = html.replace(/dg-mobile\.css\?v=\d+/g, "dg-mobile.css?v=7");
  fs.writeFileSync(file, html);
  changed++;
}
console.log("done", changed);
