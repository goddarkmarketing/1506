/**
 * About Us hub — premium DMC corporate page renderer
 * Only used for /about/ — does not affect leaf pages.
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

function renderAboutPage(rel) {
  const img = (path) => `${rel}${path}`;

  const stats = [
    { value: "10+", label: "Years of Experience", text: "Destination operations rooted in Thailand." },
    { value: "30+", label: "Countries Served", text: "Partners and travelers across key source markets." },
    { value: "5,000+", label: "Happy Travelers", text: "Leisure, VIP, and group guests hosted with care." },
    { value: "200+", label: "Corporate Clients", text: "Agencies and companies who trust our desk." },
    { value: "150+", label: "Events Organized", text: "Meetings, incentives, and corporate productions." },
    { value: "80+", label: "Wedding Projects", text: "Destination celebrations planned end to end." },
    { value: "120+", label: "Luxury Tours", text: "Private and premium journeys delivered yearly." },
    { value: "24/7", label: "Program Support", text: "Duty coverage when travelers need us most." },
  ]
    .map(
      (s, i) => `<article class="dg-ab-stat dg-ab-reveal${i ? ` dg-ab-reveal-d${Math.min(i, 3)}` : ""}">
  <p class="dg-ab-stat__value">${esc(s.value)}</p>
  <h3>${esc(s.label)}</h3>
  <p>${esc(s.text)}</p>
</article>`
    )
    .join("\n");

  const story = [
    {
      year: "Beginning",
      title: "A Thailand-focused DMC is founded",
      text: "D&G Holiday began with a clear purpose: deliver reliable on-ground travel operations that international agencies and corporate buyers could present with confidence.",
      image: "images/about/why-bg.png",
      alt: "Professional hospitality foundations of D&amp;G Holiday",
      flip: false,
    },
    {
      year: "Growth",
      title: "Capabilities expand across travel desks",
      text: "Inbound, outbound, and domestic programs matured alongside private luxury touring — supported by vetted hotels, transport, and guide networks.",
      image: "images/about/dream-trip-traveler.png",
      alt: "Travelers embarking on a carefully planned journey",
      flip: true,
    },
    {
      year: "Expansion",
      title: "MICE, events, and weddings join the portfolio",
      text: "Corporate meetings, incentive travel, gala productions, and destination weddings became dedicated desks — with project managers accountable from brief to close-out.",
      image: "images/about/dream-trip-suitcase.png",
      alt: "Luxury travel preparation and premium journey details",
      flip: false,
    },
    {
      year: "Today",
      title: "A trusted partner for global organizers",
      text: "Today we serve agencies, corporates, wedding planners, and luxury travelers across Asia, Europe, the Middle East, and the India market — with multilingual guest care.",
      image: "images/services/group-tourists.jpg",
      alt: "International destination experiences for global organizers",
      flip: true,
    },
    {
      year: "Future Vision",
      title: "Raising the standard of destination excellence",
      text: "We continue investing in partner relationships, service design, and destination craftsmanship so every journey feels precise, elegant, and unmistakably premium.",
      image: "images/about/partner-bg.png",
      alt: "Premium partner hospitality representing future vision",
      flip: false,
    },
  ]
    .map(
      (s, i) => `<article class="dg-ab-story__item${s.flip ? " dg-ab-story__item--flip" : ""} dg-ab-reveal${i ? " dg-ab-reveal-d1" : ""}">
  <figure class="dg-ab-story__media">
    <img src="${img(s.image)}" alt="${esc(s.alt)}" loading="lazy" width="960" height="660" />
  </figure>
  <div class="dg-ab-story__copy">
    <p class="dg-ab-story__year">${esc(s.year)}</p>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.text)}</p>
  </div>
</article>`
    )
    .join("\n");

  const services = [
    {
      title: "Inbound Travel",
      text: "Ground handling for international guests — hotels, transfers, guides, and tours.",
      image: "images/services/thailand-city.jpg",
      alt: "Inbound travel experience welcoming international guests",
      href: "travel-services/inbound-travel/",
    },
    {
      title: "Outbound Travel",
      text: "Overseas journeys for Thai travelers with clear planning and trusted partners.",
      image: "images/services/group-tourists.jpg",
      alt: "Outbound luxury travel across European destinations",
      href: "travel-services/outbound-travel/",
    },
    {
      title: "Luxury Travel",
      text: "Private touring, five-star stays, and elevated experiences across destinations.",
      image: "images/services/luxury-resort.jpg",
      alt: "Luxury resort and premium travel experience",
      href: "travel-services/luxury-travel/",
    },
    {
      title: "MICE",
      text: "Meetings, incentives, conferences, and exhibitions with operational precision.",
      image: "images/services/meeting-boardroom.jpg",
      alt: "Corporate MICE and business travel setting",
      href: "mice/",
    },
    {
      title: "Corporate Events",
      text: "Galas, awards, product launches, and full entertainment production.",
      image: "images/services/gala-dinner.jpg",
      alt: "Corporate event and luxury gala atmosphere",
      href: "events/",
    },
    {
      title: "Destination Weddings",
      text: "Indian, Thai, beach, and luxury weddings planned with white-glove care.",
      image: "images/services/wedding-ceremony.jpg",
      alt: "Elegant destination wedding hospitality setting",
      href: "destination-weddings/",
    },
    {
      title: "India Market",
      text: "Specialist desk for Indian groups, corporates, weddings, and Hindi support.",
      image: "images/services/thailand-city.jpg",
      alt: "Specialist India market travel and guest hospitality",
      href: "india-market/",
    },
  ]
    .map(
      (s, i) => `<a class="dg-ab-card dg-ab-reveal${i ? ` dg-ab-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${s.href}">
  <div class="dg-ab-card__media"><img src="${img(s.image)}" alt="${esc(s.alt)}" loading="lazy" width="640" height="400" /></div>
  <div class="dg-ab-card__body">
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.text)}</p>
    <span class="dg-ab-card__cta">Learn More →</span>
  </div>
</a>`
    )
    .join("\n");

  const why = [
    { title: "Professional Team", text: "Specialists across travel, MICE, events, and weddings who protect brand standards." },
    { title: "Tailor-made Experiences", text: "Every program is built around your brief — never a rigid template." },
    { title: "Luxury Service", text: "Elevated hospitality for VIP guests, executives, and celebration parties." },
    { title: "Reliable Partners", text: "Vetted hotels, transport, venues, and production suppliers." },
    { title: "24/7 Support", text: "Duty coverage when flights shift or guests need immediate help." },
    { title: "Global Standards", text: "Operations shaped for international agencies and corporate compliance." },
  ]
    .map(
      (w, i) => `<article class="dg-ab-why__item dg-ab-reveal${i ? ` dg-ab-reveal-d${Math.min(i, 3)}` : ""}">
  <span class="dg-ab-why__num">${String(i + 1).padStart(2, "0")}</span>
  <h3>${esc(w.title)}</h3>
  <p>${esc(w.text)}</p>
</article>`
    )
    .join("\n");

  const team = [
    { initials: "SK", name: "Somchai K.", role: "Managing Director", bio: "Leads strategy and long-term partnerships with agencies and corporates." },
    { initials: "NP", name: "Naruemon P.", role: "Director of Operations", bio: "Owns delivery standards, supplier networks, and on-ground excellence." },
    { initials: "AL", name: "Ananya L.", role: "Commercial Director", bio: "Guides B2B growth, proposals, and partner relationships." },
    { initials: "RT", name: "Ravi T.", role: "India Market Consultant", bio: "Supports India-market programs with cultural fluency and guest care." },
  ]
    .map(
      (m, i) => `<article class="dg-ab-member dg-ab-reveal${i ? ` dg-ab-reveal-d${Math.min(i, 3)}` : ""}">
  <div class="dg-ab-member__photo" aria-hidden="true">${esc(m.initials)}</div>
  <h3>${esc(m.name)}</h3>
  <p class="dg-ab-member__role">${esc(m.role)}</p>
  <p>${esc(m.bio)}</p>
</article>`
    )
    .join("\n");

  const partners = [
    { title: "Luxury Resorts", sub: "Hotels" },
    { title: "City & MICE Hotels", sub: "Hotels" },
    { title: "Full-service Airlines", sub: "Airlines" },
    { title: "Regional Carriers", sub: "Airlines" },
    { title: "Event Venues", sub: "Event Partners" },
    { title: "Production Houses", sub: "Event Partners" },
    { title: "Tourism Partners", sub: "Organizations" },
    { title: "Licensed Operator", sub: "Certifications" },
  ]
    .map(
      (p) => `<div class="dg-ab-logo dg-ab-reveal">
  <strong>${esc(p.title)}</strong>
  <span>${esc(p.sub)}</span>
</div>`
    )
    .join("\n");

  const quotes = [
    {
      initials: "HM",
      name: "Hiroshi M.",
      country: "Japan",
      text: "Flawless inbound coordination for our agency groups. Hotels, guides, and timing were consistently premium.",
    },
    {
      initials: "PR",
      name: "Priya R.",
      country: "India",
      text: "Our multi-day Phuket wedding felt calm and beautifully managed. Guest care and ceremony flow were exceptional.",
    },
    {
      initials: "EL",
      name: "Elena L.",
      country: "Germany",
      text: "Incentive program delivery was precise — from VIP transfers to the recognition night. A true DMC partner.",
    },
  ]
    .map(
      (q, i) => `<article class="dg-ab-quote dg-ab-reveal${i ? ` dg-ab-reveal-d${Math.min(i, 3)}` : ""}">
  <div class="dg-ab-quote__top">
    <div class="dg-ab-quote__avatar" aria-hidden="true">${esc(q.initials)}</div>
    <div>
      <p class="dg-ab-quote__name">${esc(q.name)}</p>
      <p class="dg-ab-quote__country">${esc(q.country)}</p>
    </div>
  </div>
  <p class="dg-ab-quote__stars" aria-label="5 out of 5 stars">★★★★★</p>
  <p class="dg-ab-quote__text">“${esc(q.text)}”</p>
</article>`
    )
    .join("\n");

  return `<article class="dg-ab dg-theme--about">
  ${renderPageHero({
    title: "About D&G Holiday Thailand",
    subtitle:
      "A luxury Destination Management Company crafting travel, MICE, corporate events, and destination weddings with international standards and Thai hospitality.",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: "About Us" },
    ],
    rel,
  })}

  <section class="dg-ab-intro" id="who-we-are" aria-labelledby="ab-who-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Company Introduction</p>
        <h2 id="ab-who-title">Who We Are</h2>
      </div>
      <div class="dg-ab-intro__grid">
        <figure class="dg-ab-intro__media dg-ab-reveal dg-ab-reveal-d1">
          <img src="${img("images/about/dest-band-bg.png")}" alt="D&amp;G Holiday Thailand destination expertise across Thailand landscapes" loading="lazy" width="800" height="1000" />
        </figure>
        <div class="dg-ab-intro__copy dg-ab-reveal dg-ab-reveal-d2">
          <p>D&amp;G Holiday Thailand is a licensed Destination Management Company built for international travelers, corporate clients, travel agencies, event organizers, and wedding planners who expect precision.</p>
          <p>Our mission is simple: design and deliver journeys that feel effortless — from first proposal to on-ground execution — with luxury service standards partners can trust.</p>
          <p>With deep Thailand expertise and dedicated desks for travel, MICE, events, destination weddings, and the India market, we combine local knowledge with global operating discipline.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="dg-ab-glance" id="at-a-glance" aria-labelledby="ab-glance-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Company At A Glance</p>
        <h2 id="ab-glance-title">Credibility in quiet numbers</h2>
        <p class="dg-ab__lead">A snapshot of the scale and trust behind every D&amp;G Holiday program.</p>
      </div>
      <div class="dg-ab-glance__grid">${stats}</div>
    </div>
  </section>

  <section class="dg-ab-story" id="our-story" aria-labelledby="ab-story-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Our Story</p>
        <h2 id="ab-story-title">From foundation to future vision</h2>
        <p class="dg-ab__lead">An editorial timeline of how D&amp;G Holiday grew into a full-service luxury DMC.</p>
      </div>
      ${story}
    </div>
  </section>

  <section class="dg-ab-services" id="what-we-do" aria-labelledby="ab-services-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">What We Do</p>
        <h2 id="ab-services-title">Full-service destination expertise</h2>
        <p class="dg-ab__lead">Travel, corporate, celebrations, and specialist market desks — one accountable partner.</p>
      </div>
      <div class="dg-ab-services__grid">${services}</div>
    </div>
  </section>

  <section class="dg-ab-why" id="why-choose" aria-labelledby="ab-why-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Why Choose D&amp;G Holiday</p>
        <h2 id="ab-why-title">Reasons partners stay with us</h2>
      </div>
      <div class="dg-ab-why__grid">${why}</div>
      <div class="dg-ab-team__actions dg-ab-reveal" style="margin-top:36px">
        <a class="dg-ab-btn dg-ab-btn--outline" href="${rel}about/why-choose/">Explore Why Choose D&amp;G →</a>
      </div>
    </div>
  </section>

  <section class="dg-ab-team" id="team" aria-labelledby="ab-team-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Meet Our Team</p>
        <h2 id="ab-team-title">The experts behind every journey</h2>
        <p class="dg-ab__lead">Leadership and specialists who bring calm coordination to complex destination programs.</p>
      </div>
      <figure class="dg-ab-team__banner dg-ab-reveal dg-ab-reveal-d1">
        <img src="${img("images/services/group-tourists.jpg")}" alt="D&amp;G Holiday Thailand professional hospitality and destination operations" loading="lazy" width="1320" height="504" />
      </figure>
      <div class="dg-ab-team__grid">${team}</div>
      <div class="dg-ab-team__actions dg-ab-reveal">
        <a class="dg-ab-btn dg-ab-btn--outline" href="${rel}about/our-team/">Meet Our Team</a>
      </div>
    </div>
  </section>

  <section class="dg-ab-partners" id="partners" aria-labelledby="ab-partners-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Partners &amp; Certifications</p>
        <h2 id="ab-partners-title">A network built for reliability</h2>
        <p class="dg-ab__lead">Hotels, airlines, event partners, tourism organizations, and licensed operating standards.</p>
      </div>
      <div class="dg-ab-partners__grid">${partners}</div>
      <div class="dg-ab-partners__actions dg-ab-reveal">
        <a class="dg-ab-btn dg-ab-btn--outline" href="${rel}about/partners-certifications/">View Partners &amp; Certifications</a>
      </div>
    </div>
  </section>

  <section class="dg-ab-quotes" id="testimonials" aria-labelledby="ab-quotes-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Customer Testimonials</p>
        <h2 id="ab-quotes-title">Trusted by international partners</h2>
      </div>
      <div class="dg-ab-quotes__grid">${quotes}</div>
    </div>
  </section>

  <section class="dg-ab-global" id="global-presence" aria-labelledby="ab-global-title">
    <div class="dg-ab__wrap">
      <div class="dg-ab-reveal">
        <p class="dg-ab__eyebrow">Global Presence</p>
        <h2 id="ab-global-title">Thailand at the center. Partners worldwide.</h2>
        <p class="dg-ab__lead">Destination strength at home, with collaboration across Asia, Europe, the Middle East, and beyond.</p>
      </div>
      <div class="dg-ab-global__panel dg-ab-reveal dg-ab-reveal-d1">
        <div class="dg-ab-map" role="img" aria-label="World map highlighting Thailand, Asia, Europe, Middle East, and worldwide partners">
          <svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="400" cy="210" rx="310" ry="150" fill="none" stroke="#0b2e59" stroke-width="1.2" opacity="0.25"/>
            <ellipse cx="400" cy="210" rx="230" ry="110" fill="none" stroke="#b8954a" stroke-width="1" opacity="0.35"/>
            <path d="M120 200 C180 120, 260 140, 320 180 S420 120, 500 160 S620 140, 700 200" fill="none" stroke="#0b2e59" stroke-width="1.5" opacity="0.2"/>
            <path d="M140 240 C220 300, 340 280, 420 250 S560 300, 680 240" fill="none" stroke="#0b2e59" stroke-width="1.2" opacity="0.15"/>
          </svg>
          <div class="dg-ab-map__pins">
            <div class="dg-ab-map__pin" style="left:62%;top:58%"><span class="dg-ab-map__dot"></span><span class="dg-ab-map__label">Thailand</span></div>
            <div class="dg-ab-map__pin" style="left:70%;top:42%"><span class="dg-ab-map__dot"></span><span class="dg-ab-map__label">Asia</span></div>
            <div class="dg-ab-map__pin" style="left:48%;top:36%"><span class="dg-ab-map__dot"></span><span class="dg-ab-map__label">Europe</span></div>
            <div class="dg-ab-map__pin" style="left:56%;top:48%"><span class="dg-ab-map__dot"></span><span class="dg-ab-map__label">Middle East</span></div>
            <div class="dg-ab-map__pin" style="left:28%;top:44%"><span class="dg-ab-map__dot"></span><span class="dg-ab-map__label">Worldwide</span></div>
          </div>
        </div>
        <ul class="dg-ab-global__list">
          <li><strong>Thailand</strong><span>Home operations across city, beach, and culture destinations.</span></li>
          <li><strong>Asia</strong><span>Regional programs with trusted destination partners.</span></li>
          <li><strong>Europe</strong><span>Outbound luxury circuits for discerning travelers.</span></li>
          <li><strong>Middle East</strong><span>Gulf city experiences and stopover hosting.</span></li>
          <li><strong>Worldwide Partners</strong><span>Global FIT and special-interest journeys via vetted network.</span></li>
        </ul>
      </div>
    </div>
  </section>

  ${renderPageCta({
    rel,
    variant: "dg-ab",
    title: "Ready to Plan Your Journey?",
    text: "Tell us about your travelers, event, or wedding vision — our partner desk will prepare a tailored proposal.",
  })}
</article>`;
}

module.exports = {
  renderAboutPage,
};
