/* Mobile bottom dock — raised active indicator */
(function () {
  function init(nav) {
    var items = Array.prototype.slice.call(nav.querySelectorAll(".dg-cta-dock__item"));
    if (!items.length) return;

    function setActive(item) {
      items.forEach(function (li) {
        li.classList.toggle("is-active", li === item);
      });
    }

    // Initial active from URL
    var path = (location.pathname || "").replace(/\\/g, "/").toLowerCase();
    var initial = items[0];
    items.forEach(function (li) {
      var key = li.getAttribute("data-dock");
      var a = li.querySelector("a");
      var href = ((a && a.getAttribute("href")) || "").toLowerCase();
      if (key === "quote" && path.indexOf("/proposal") !== -1) initial = li;
      if (key === "home" && (path === "/" || /\/index\.html$/.test(path) || path.endsWith("/1506/") || path.endsWith("/1506"))) {
        initial = li;
      }
      if (key === "home" && (href === "index.html" || href === "./" || href === "/" || href === "./index.html")) {
        if (/index\.html$/.test(path) || /\/$/.test(path)) initial = li;
      }
    });
    setActive(initial);

    items.forEach(function (li) {
      var a = li.querySelector("a");
      if (!a) return;
      a.addEventListener("click", function () {
        setActive(li);
      });
    });
  }

  function boot() {
    document.querySelectorAll(".dg-cta-dock").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
