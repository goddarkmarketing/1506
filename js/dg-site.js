/* Header / footer chrome + page helpers */
(function () {
  var header = document.getElementById("dg-chrome-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reveals = document.querySelectorAll(".dg-about-reveal");
  if (reveals.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  var form = document.getElementById("dg-contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = (form.name && form.name.value) || "";
    var phone = (form.phone && form.phone.value) || "";
    var email = (form.email && form.email.value) || "";
    var topic = (form.topic && form.topic.value) || "";
    var message = (form.message && form.message.value) || "";
    var lines = [
      "ติดต่อจากเว็บ D&G Holiday",
      name ? ("ชื่อ: " + name) : "",
      phone ? ("โทร: " + phone) : "",
      email ? ("อีเมล: " + email) : "",
      topic ? ("เรื่อง: " + topic) : "",
      message ? ("รายละเอียด: " + message) : ""
    ].filter(Boolean).join("\n");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lines);
      }
    } catch (err) {}
    window.open("https://page.line.me/354ejhoo", "_blank", "noopener");
    var note = document.getElementById("dg-form-note");
    if (note) {
      note.hidden = false;
      note.textContent = "เปิด LINE Official Account แล้ว และคัดลอกข้อความของคุณไว้แล้ว กรุณาวางในแชทเพื่อส่งให้ทีม";
    }
  });
})();
