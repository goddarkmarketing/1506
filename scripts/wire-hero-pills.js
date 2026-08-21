/**
 * Wire homepage hero product pills (inert Traveloka divs) to service pages.
 */
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const script = `<script id="dg-hero-pills-js">
(function(){
  var map={
    "Hotels & Stays":"travel-services/hotel-reservations/",
    "Tour Packages":"travel-services/group-tours/",
    "Land Tours":"travel-services/domestic-travel/",
    "รถไฟ":"travel-services/domestic-travel/",
    "Airport Transfer":"travel-services/transportation-transfers/",
    "Private Car":"travel-services/private-tours/",
    "Other Services":"travel-services/"
  };
  function wire(){
    document.querySelectorAll('[data-testid^="product-pill-"]').forEach(function(el){
      if(el.getAttribute("data-dg-wired")==="1") return;
      var key=(el.getAttribute("data-testid")||"").replace(/^product-pill-/,"");
      var label=(el.textContent||"").replace(/\\s+/g," ").replace(/New!/g,"").trim();
      var href=map[key]||map[label];
      if(!href) return;
      el.setAttribute("data-dg-wired","1");
      el.setAttribute("role","link");
      el.setAttribute("aria-label", label||key);
      el.style.cursor="pointer";
      el.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href=href;
      });
      el.addEventListener("keydown", function(e){
        if(e.key==="Enter"||e.key===" "){
          e.preventDefault();
          window.location.href=href;
        }
      });
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();
})();
</script>`;

if (html.includes('id="dg-hero-pills-js"')) {
  html = html.replace(/<script id="dg-hero-pills-js">[\s\S]*?<\/script>/, script);
} else if (html.includes('id="dg-mega-toggle-js"')) {
  html = html.replace(
    /(<script id="dg-mega-toggle-js">)/,
    script + "\n$1"
  );
} else {
  html = html.replace("</body>", script + "\n</body>");
}

fs.writeFileSync(indexPath, html);
console.log("injected dg-hero-pills-js");
