const fs = require("fs");
const { execSync } = require("child_process");

execSync("git checkout HEAD -- includes/site-footer.html", { stdio: "inherit" });

const dock = `<nav class="dg-cta-dock" aria-label="Quick contact">
  <ul class="dg-cta-dock__list">
    <li class="dg-cta-dock__item is-active" style="--clr:#FF5E1F" data-dock="home">
      <a href="index.html" aria-label="Home">
        <span class="dg-cta-dock__icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
      </a>
    </li>
    <li class="dg-cta-dock__item" style="--clr:#06C755" data-dock="line">
      <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer" aria-label="LINE">
        <span class="dg-cta-dock__icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
      </a>
    </li>
    <li class="dg-cta-dock__item" style="--clr:#25D366" data-dock="wa">
      <a href="https://wa.me/66821479553?text=Hello%20D%26G%20Holiday%2C%20I%20would%20like%20a%20quote." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <span class="dg-cta-dock__icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
      </a>
    </li>
    <li class="dg-cta-dock__item" style="--clr:#D1913C" data-dock="quote">
      <a href="proposal/" aria-label="Quote">
        <span class="dg-cta-dock__icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
      </a>
    </li>
    <li class="dg-cta-dock__item" style="--clr:#2196F3" data-dock="call">
      <a href="tel:+66821479553" aria-label="Call">
        <span class="dg-cta-dock__icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
      </a>
    </li>
    <li class="dg-cta-dock__indicator" aria-hidden="true"></li>
  </ul>
</nav>`;

const path = "includes/site-footer.html";
let html = fs.readFileSync(path, "utf8");
html = html.replace(/<nav class="dg-cta-dock"[^>]*>[\s\S]*?<\/nav>/, dock);
fs.writeFileSync(path, html);
console.log("ok", html.includes("dg-chrome-footer__inner"), html.includes("dg-cta-dock__indicator"));
