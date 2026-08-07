/**
 * Gallery hub — premium DMC portfolio
 * Lucide icons · balanced sections · single-line heads
 * Only used for /gallery/
 */
const { renderPageHero } = require("./page-hero");
const { renderPageCta } = require("./page-cta");

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ico(name, size) {
  const cls = size === "lg" ? "dg-gal-ico dg-gal-ico--lg" : "dg-gal-ico";
  return `<span class="${cls}" aria-hidden="true"><i data-lucide="${esc(name)}" class="dg-lucide"></i></span>`;
}

function sectionHead({ eyebrow, title, lead, icon, id }) {
  return `<div class="dg-gal-section__head dg-gal-reveal">
  ${icon ? ico(icon, "lg") : ""}
  <p class="dg-gal__eyebrow">${esc(eyebrow)}</p>
  <h2${id ? ` id="${esc(id)}"` : ""}>${esc(title)}</h2>
  ${lead ? `<p class="dg-gal__lead">${esc(lead)}</p>` : ""}
</div>`;
}

function renderGalleryPage(rel) {
  const img = (path) => `${rel}${path}`;

  const collections = [
    {
      title: "Travel Experiences",
      text: "Private journeys, cultural days, and luxury leisure across Thailand and Asia.",
      image: "images/services/thailand-city.jpg",
      alt: "Luxury travel experience across scenic destinations",
      href: "gallery/tours/",
      icon: "plane",
    },
    {
      title: "MICE & Corporate",
      text: "Meetings, incentives, conferences, and corporate programs with polished delivery.",
      image: "images/services/meeting-conference.jpg",
      alt: "Corporate MICE meeting and incentive program atmosphere",
      href: "gallery/mice/",
      icon: "briefcase-business",
    },
    {
      title: "Destination Weddings",
      text: "Indian, Thai, beach, and luxury celebrations planned with white-glove care.",
      image: "images/services/wedding-indian.jpg",
      alt: "Luxury destination wedding celebration setting",
      href: "gallery/weddings/",
      icon: "heart",
    },
    {
      title: "Events & Celebrations",
      text: "Galas, launches, themed nights, and production-led brand moments.",
      image: "images/services/gala-dinner.jpg",
      alt: "Corporate gala and celebration event production",
      href: "gallery/events/",
      icon: "sparkles",
    },
  ]
    .map(
      (c, i) => `<a class="dg-gal-collection dg-gal-reveal${i ? ` dg-gal-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${c.href}">
  <div class="dg-gal-collection__media" aria-hidden="true"><img src="${img(c.image)}" alt="" loading="lazy" /></div>
  <div class="dg-gal-collection__shade" aria-hidden="true"></div>
  <div class="dg-gal-collection__body">
    ${ico(c.icon)}
    <h3>${esc(c.title)}</h3>
    <p>${esc(c.text)}</p>
    <span class="dg-gal-collection__cta">View Collection <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`
    )
    .join("\n");

  const tabs = [
    ["all", "All", "layout-grid"],
    ["tours", "Tours", "map"],
    ["luxury", "Luxury", "gem"],
    ["mice", "MICE", "presentation"],
    ["corporate", "Corporate", "building-2"],
    ["weddings", "Weddings", "heart"],
    ["indian-weddings", "Indian Weddings", "flower-2"],
    ["hotels", "Hotels", "hotel"],
    ["transport", "Transport", "car"],
    ["team-building", "Team Building", "users"],
    ["exhibitions", "Exhibitions", "store"],
    ["beach-weddings", "Beach Weddings", "palmtree"],
  ]
    .map(
      ([id, label, icon], i) =>
        `<button type="button" class="dg-gal-tab${i === 0 ? " is-active" : ""}" data-filter="${esc(id)}">
  <i data-lucide="${esc(icon)}" class="dg-lucide" aria-hidden="true"></i>
  <span>${esc(label)}</span>
</button>`
    )
    .join("\n");

  const masonry = [
    { cat: "tours", size: "tall", title: "Chiang Mai Cultural Day", loc: "Chiang Mai, Thailand", image: "images/services/thailand-temple.jpg", alt: "Cultural travel day in northern Thailand" },
    { cat: "luxury", size: "wide", title: "Resort Pool Sanctuary", loc: "Phuket, Thailand", image: "images/services/luxury-resort.jpg", alt: "Luxury resort pool and premium hospitality" },
    { cat: "mice", size: "square", title: "Executive Meeting Setup", loc: "Bangkok", image: "images/services/meeting-boardroom.jpg", alt: "Executive meeting room prepared for corporate clients" },
    { cat: "weddings", size: "tall", title: "Seaside Vow Setting", loc: "Phuket", image: "images/services/wedding-beach.jpg", alt: "Romantic destination wedding traveler moment" },
    { cat: "indian-weddings", size: "wide", title: "Celebration Evening", loc: "Phuket", image: "images/services/wedding-decor.jpg", alt: "Indian destination wedding celebration details" },
    { cat: "hotels", size: "square", title: "Five-Star Hospitality", loc: "Thailand", image: "images/services/hotel-lobby.jpg", alt: "Luxury hotel hospitality atmosphere in Thailand" },
    { cat: "transport", size: "tall", title: "VIP Arrival Transfer", loc: "Bangkok", image: "images/services/transport-pickup.jpg", alt: "VIP travel transfer and guest logistics" },
    { cat: "team-building", size: "wide", title: "Team Energy Outdoors", loc: "Hua Hin", image: "images/services/team-building.jpg", alt: "Corporate team building outdoor activity" },
    { cat: "exhibitions", size: "square", title: "Brand Exhibition Floor", loc: "Bangkok", image: "images/services/meeting-conference.jpg", alt: "Exhibition and brand showcase environment" },
    { cat: "beach-weddings", size: "tall", title: "Sunset Beach Ceremony", loc: "Koh Samui", image: "images/services/wedding-indian.jpg", alt: "Sunset beach wedding ceremony setting" },
    { cat: "corporate", size: "wide", title: "Gala Dinner Production", loc: "Bangkok", image: "images/services/gala-dinner.jpg", alt: "Corporate gala dinner stage and production" },
    { cat: "luxury", size: "square", title: "Private City Touring", loc: "Tokyo", image: "images/destinations/japan.jpg", alt: "Private luxury city touring experience" },
  ]
    .map(
      (m) => `<a class="dg-gal-masonry__item dg-gal-masonry__item--${esc(m.size)}" href="${rel}proposal/" data-cats="${esc(m.cat)}">
  <img src="${img(m.image)}" alt="${esc(m.alt)}" loading="lazy" width="800" height="1000" />
  <div class="dg-gal-masonry__shade" aria-hidden="true"></div>
  <div class="dg-gal-masonry__meta">
    <p class="dg-gal-masonry__cat">${esc(m.cat.replace(/-/g, " "))}</p>
    <h3>${esc(m.title)}</h3>
    <p>${esc(m.loc)}</p>
    <span>View Details <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`
    )
    .join("\n");

  const projects = [
    {
      title: "Luxury Incentive Trip",
      dest: "Phuket · Thailand",
      text: "A high-energy reward journey with VIP transfers, resort hospitality, and a recognition evening.",
      image: "images/services/luxury-resort.jpg",
      alt: "Luxury incentive travel program in a premium destination",
      href: "mice/incentive-travel/",
      icon: "trophy",
    },
    {
      title: "Indian Destination Wedding",
      dest: "Phuket · Thailand",
      text: "Multi-day celebration with ceremony styling, guest care, and resort coordination.",
      image: "images/services/wedding-indian.jpg",
      alt: "Indian destination wedding celebration in Thailand",
      href: "destination-weddings/indian-weddings/",
      icon: "heart",
    },
    {
      title: "Corporate Retreat",
      dest: "Chiang Mai · Thailand",
      text: "Strategy sessions balanced with wellness and private dining in a calm resort setting.",
      image: "images/services/thailand-temple.jpg",
      alt: "Corporate retreat in a Thailand resort setting",
      href: "mice/corporate-retreats/",
      icon: "leaf",
    },
    {
      title: "Beach Wedding",
      dest: "Koh Samui · Thailand",
      text: "Sunset vows with contingency planning, floral styling, and polished guest flow.",
      image: "images/services/wedding-beach.jpg",
      alt: "Beach wedding ceremony on a Thailand coastline",
      href: "destination-weddings/beach-weddings/",
      icon: "palmtree",
    },
    {
      title: "International Conference",
      dest: "Bangkok · Thailand",
      text: "Multi-track conference support covering venues, AV, registration, and delegate care.",
      image: "images/services/meeting-conference.jpg",
      alt: "International conference venue and delegate hospitality",
      href: "mice/seminars-conferences/",
      icon: "mic",
    },
    {
      title: "Luxury Private Tour",
      dest: "Japan Circuit",
      text: "Private pacing, refined hotels, and signature experiences designed for discerning travelers.",
      image: "images/destinations/japan.jpg",
      alt: "Luxury private tour across premium Asian destinations",
      href: "travel-services/private-tours/",
      icon: "compass",
    },
  ]
    .map(
      (p, i) => `<a class="dg-gal-project dg-gal-reveal${i ? ` dg-gal-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${p.href}">
  <div class="dg-gal-project__media"><img src="${img(p.image)}" alt="${esc(p.alt)}" loading="lazy" width="800" height="500" /></div>
  <div class="dg-gal-project__body">
    <div class="dg-gal-project__top">
      ${ico(p.icon)}
      <p class="dg-gal-project__dest">${esc(p.dest)}</p>
    </div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.text)}</p>
    <span class="dg-gal-project__cta">View Project <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`
    )
    .join("\n");

  const videos = [
    { title: "Corporate Events", image: "images/services/gala-dinner.jpg", alt: "Corporate event video highlight thumbnail", icon: "clapperboard" },
    { title: "Destination Weddings", image: "images/services/wedding-indian.jpg", alt: "Destination wedding video highlight thumbnail", icon: "heart" },
    { title: "Luxury Tours", image: "images/services/luxury-resort.jpg", alt: "Luxury tour video highlight thumbnail", icon: "plane" },
    { title: "MICE Events", image: "images/services/meeting-conference.jpg", alt: "MICE event video highlight thumbnail", icon: "presentation" },
  ]
    .map(
      (v, i) => `<a class="dg-gal-video dg-gal-reveal${i ? ` dg-gal-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}contact/" aria-label="Play ${esc(v.title)} highlight">
  <img src="${img(v.image)}" alt="${esc(v.alt)}" loading="lazy" width="640" height="400" />
  <span class="dg-gal-video__play" aria-hidden="true"><i data-lucide="play" class="dg-lucide"></i></span>
  <span class="dg-gal-video__label">
    ${ico(v.icon)}
    <strong>${esc(v.title)}</strong>
  </span>
</a>`
    )
    .join("\n");

  const moments = [
    { image: "images/services/hotel-lobby.jpg", alt: "Happy travelers enjoying a luxury Thailand journey", label: "Luxury stays" },
    { image: "images/services/team-building.jpg", alt: "Corporate group celebrating a successful program", label: "Team programs" },
    { image: "images/services/wedding-decor.jpg", alt: "Wedding couple destination celebration moment", label: "Celebrations" },
  ]
    .map(
      (m, i) => `<figure class="dg-gal-moments__item dg-gal-reveal${i ? ` dg-gal-reveal-d${Math.min(i, 3)}` : ""}">
  <img src="${img(m.image)}" alt="${esc(m.alt)}" loading="lazy" width="1000" height="800" />
  <figcaption>${esc(m.label)}</figcaption>
</figure>`
    )
    .join("\n");

  const quotes = [
    { initials: "AK", name: "Aya K.", country: "Japan", text: "The gallery reflects exactly what we experienced — precise operations and beautiful destination moments." },
    { initials: "SR", name: "Sanjay R.", country: "India", text: "Our wedding week looked as elegant as these images. Guest care and ceremony flow were outstanding." },
    { initials: "ML", name: "Marcus L.", country: "Germany", text: "From incentive days to the gala night, every frame feels like the premium service we received." },
  ]
    .map(
      (q, i) => `<article class="dg-gal-quote dg-gal-reveal${i ? ` dg-gal-reveal-d${Math.min(i, 3)}` : ""}">
  <div class="dg-gal-quote__mark" aria-hidden="true">${ico("quote")}</div>
  <p class="dg-gal-quote__text">“${esc(q.text)}”</p>
  <div class="dg-gal-quote__top">
    <div class="dg-gal-quote__avatar" aria-hidden="true">${esc(q.initials)}</div>
    <div>
      <p class="dg-gal-quote__name">${esc(q.name)}</p>
      <p class="dg-gal-quote__country">${esc(q.country)}</p>
    </div>
  </div>
</article>`
    )
    .join("\n");

  const social = [
    "images/services/thailand-city.jpg",
    "images/services/luxury-resort.jpg",
    "images/services/wedding-indian.jpg",
    "images/services/meeting-conference.jpg",
    "images/services/thailand-temple.jpg",
    "images/services/gala-dinner.jpg",
  ]
    .map(
      (src, i) => `<figure class="dg-gal-social__item dg-gal-reveal">
  <img src="${img(src)}" alt="D&amp;G Holiday inspiration gallery image ${i + 1}" loading="lazy" width="400" height="400" />
</figure>`
    )
    .join("\n");

  return `<article class="dg-gal dg-theme--gallery">
  ${renderPageHero({
    title: "Gallery",
    subtitle:
      "Travel, MICE, events, and destination weddings — captured across Thailand and beyond.",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: "Gallery" },
    ],
    rel,
  })}

  <section class="dg-gal-intro" id="overview">
    <div class="dg-gal__wrap">
      <div class="dg-gal-intro__layout">
        <div class="dg-gal-intro__copy dg-gal-reveal">
          <p class="dg-gal__eyebrow">Portfolio</p>
          <h2>Proof of craft for every brief</h2>
          <p class="dg-gal__lead">A curated gallery of journeys, corporate programs, and celebrations — built for partners who need proof of craft and delivery.</p>
          <ul class="dg-gal-trust" aria-label="Gallery strengths">
            <li>
              ${ico("images")}
              <div><strong>Four collections</strong><span>Travel · MICE · Weddings · Events</span></div>
            </li>
            <li>
              ${ico("camera")}
              <div><strong>Real program moments</strong><span>On-ground delivery, not stock filler</span></div>
            </li>
            <li>
              ${ico("globe")}
              <div><strong>Thailand &amp; Asia</strong><span>Destinations partners book every season</span></div>
            </li>
          </ul>
        </div>
        <figure class="dg-gal-intro__media dg-gal-reveal dg-gal-reveal-d1">
          <img src="${img("images/services/luxury-resort.jpg")}" alt="Luxury destination atmosphere from the D&amp;G Holiday gallery" width="800" height="960" loading="lazy" decoding="async" />
          <figcaption class="dg-gal-intro__caption">
            <span>D&amp;G Holiday</span>
            <strong>Proof of place. Proof of polish.</strong>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="dg-gal-collections" id="collections" aria-labelledby="gal-collections-title">
    <div class="dg-gal__wrap">
      ${sectionHead({
        eyebrow: "Featured Collections",
        title: "Four ways to explore our work",
        lead: "Curated portfolios for travel, corporate, and celebration programs.",
        icon: "layout-grid",
        id: "gal-collections-title",
      })}
      <div class="dg-gal-collections__grid">${collections}</div>
    </div>
  </section>

  <section class="dg-gal-filters" id="categories" aria-labelledby="gal-filter-title">
    <div class="dg-gal__wrap">
      ${sectionHead({
        eyebrow: "Browse",
        title: "Filter by experience",
        lead: "Narrow the portfolio to the journeys and events that match your brief.",
        icon: "sliders-horizontal",
        id: "gal-filter-title",
      })}
      <div class="dg-gal-filters__tabs" role="tablist" aria-label="Gallery categories">${tabs}</div>
    </div>
  </section>

  <section class="dg-gal-masonry-wrap" id="masonry" aria-label="Masonry gallery">
    <div class="dg-gal__wrap">
      <div class="dg-gal-masonry" id="dg-gal-masonry">${masonry}</div>
    </div>
  </section>

  <section class="dg-gal-projects" id="projects" aria-labelledby="gal-projects-title">
    <div class="dg-gal__wrap">
      ${sectionHead({
        eyebrow: "Featured Projects",
        title: "Selected portfolio stories",
        lead: "Signature programs that show destination craft and operational control.",
        icon: "folder-open",
        id: "gal-projects-title",
      })}
      <div class="dg-gal-projects__grid">${projects}</div>
    </div>
  </section>

  <section class="dg-gal-videos" id="videos" aria-labelledby="gal-videos-title">
    <div class="dg-gal__wrap">
      ${sectionHead({
        eyebrow: "Video Highlights",
        title: "Moments in motion",
        lead: "A cinematic look at events, weddings, tours, and MICE delivery.",
        icon: "film",
        id: "gal-videos-title",
      })}
      <div class="dg-gal-videos__grid">${videos}</div>
    </div>
  </section>

  <section class="dg-gal-moments" id="moments" aria-labelledby="gal-moments-title">
    <div class="dg-gal__wrap">
      ${sectionHead({
        eyebrow: "Guest Moments",
        title: "Authentic guest experiences",
        lead: "Travelers, corporate groups, and celebrations — captured with quiet confidence.",
        icon: "smile",
        id: "gal-moments-title",
      })}
      <div class="dg-gal-moments__strip">${moments}</div>
    </div>
  </section>

  <section class="dg-gal-quotes" id="testimonials" aria-labelledby="gal-quotes-title">
    <div class="dg-gal__wrap">
      ${sectionHead({
        eyebrow: "Testimonials",
        title: "Trusted by partners",
        lead: "International agencies and guests who recognized the same polish on the ground.",
        icon: "message-circle-heart",
        id: "gal-quotes-title",
      })}
      <div class="dg-gal-quotes__grid">${quotes}</div>
    </div>
  </section>

  <section class="dg-gal-social" id="inspiration" aria-labelledby="gal-social-title">
    <div class="dg-gal__wrap">
      ${sectionHead({
        eyebrow: "Inspiration",
        title: "Follow the journey",
        lead: "Destination atmosphere and celebration details — without clutter.",
        icon: "instagram",
        id: "gal-social-title",
      })}
      <div class="dg-gal-social__grid">${social}</div>
    </div>
  </section>

  ${renderPageCta({
    rel,
    variant: "dg-gal",
    title: "Ready to plan your journey?",
    text: "Tell us about your travel, MICE, event, or wedding vision — our partner desk will prepare a tailored proposal.",
  })}
</article>`;
}

function galleryFilterScript() {
  return `<script>
(function(){
  var tabs=document.querySelectorAll('.dg-gal-tab');
  var items=document.querySelectorAll('#dg-gal-masonry .dg-gal-masonry__item');
  if(!tabs.length||!items.length) return;
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      var filter=tab.getAttribute('data-filter')||'all';
      tabs.forEach(function(t){ t.classList.toggle('is-active', t===tab); });
      items.forEach(function(item){
        var cats=(item.getAttribute('data-cats')||'').split(/\\s+/);
        var show=filter==='all'||cats.indexOf(filter)!==-1;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });
})();
</script>`;
}

module.exports = {
  renderGalleryPage,
  galleryFilterScript,
};
