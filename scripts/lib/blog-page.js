/**
 * Luxury Travel Blog hub — content + HTML renderer
 * Shares DMC design system (dg-ts) with dg-blog accents.
 */
const { renderPageHero } = require("./page-hero");
const { renderPageCta } = require("./page-cta");
const { buildImagesMap } = require("./service-images");

const IMAGES = buildImagesMap();


function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function img(rel, key) {
  return `${rel}${IMAGES[key] || IMAGES.story}`;
}

const FEATURED = [
  {
    category: "Luxury Travel",
    date: "12 Jun 2026",
    title: "How luxury travelers experience Thailand differently",
    excerpt:
      "Private pacing, villa hospitality, and destination moments that feel exclusive — without losing authentic Thai culture.",
    image: "luxResort",
    href: "#latest",
  },
  {
    category: "Destination Weddings",
    date: "28 May 2026",
    title: "Planning a multi-day Indian wedding in Phuket",
    excerpt:
      "Ceremony spaces, guest room blocks, and resort operations that protect tradition and comfort.",
    image: "wedBeach",
    href: "destination-weddings/indian-weddings/",
  },
  {
    category: "MICE",
    date: "10 May 2026",
    title: "What makes a Thailand incentive program feel premium",
    excerpt:
      "From VIP transfers to recognition nights — the details corporate partners notice first.",
    image: "meetConf",
    href: "mice/incentive-travel/",
  },
];

const CATEGORIES = [
  { label: "Travel Guides", hint: "Destination plans & routes", href: "#latest" },
  { label: "Luxury Travel", hint: "Premium stays & private journeys", href: "travel-services/luxury-travel/" },
  { label: "Thailand", hint: "Local expertise nationwide", href: "destinations/thailand/" },
  { label: "MICE", hint: "Meetings & incentives", href: "mice/" },
  { label: "Events", hint: "Galas, launches & production", href: "events/" },
  { label: "Destination Weddings", hint: "Beach, Indian & luxury weddings", href: "destination-weddings/" },
  { label: "Corporate Travel", hint: "Business groups & executives", href: "mice/corporate-group-travel/" },
  { label: "Indian Market", hint: "Specialist India desk insights", href: "india-market/" },
  { label: "Travel Tips", hint: "Practical luxury advice", href: "#latest" },
  { label: "Visa", hint: "Entry & document guidance", href: "travel-services/visa-travel-support/" },
  { label: "Transportation", hint: "Transfers & private fleets", href: "travel-services/transportation-transfers/" },
  { label: "Hotels", hint: "Resorts & hotel reservations", href: "travel-services/hotel-reservations/" },
];

const LATEST = [
  {
    category: "Thailand",
    date: "18 Jun 2026",
    title: "Bangkok for first-time luxury visitors",
    excerpt: "A calm first itinerary covering culture, shopping, and rooftop evenings.",
    author: "D&G Travel Desk",
    image: "meetConf",
    href: "destinations/thailand/",
  },
  {
    category: "Travel Guides",
    date: "14 Jun 2026",
    title: "Chiang Mai in three refined days",
    excerpt: "Temples, wellness, and northern hospitality with unhurried pacing.",
    author: "Destination Editors",
    image: "teamBuild",
    href: "destinations/thailand/",
  },
  {
    category: "Hotels",
    date: "02 Jun 2026",
    title: "How to choose the right resort for your group",
    excerpt: "Matching room blocks, event space, and guest comfort for every trip style.",
    author: "Hospitality Advisors",
    image: "thCity",
    href: "travel-services/hotel-reservations/",
  },
  {
    category: "Events",
    date: "22 May 2026",
    title: "Gala dinner production cues that elevate corporate nights",
    excerpt: "Lighting, guest flow, and entertainment timing for polished recognition evenings.",
    author: "Events Studio",
    image: "visaPass",
    href: "events/gala-dinner/",
  },
  {
    category: "Europe",
    date: "08 May 2026",
    title: "Classic Europe circuits designed for Asian travelers",
    excerpt: "Hotel quality, realistic pacing, and seasonal advice for outbound journeys.",
    author: "Outbound Desk",
    image: "destEurope",
    href: "destinations/europe/",
  },
  {
    category: "Visa",
    date: "30 Apr 2026",
    title: "Visa checkpoints before your next overseas trip",
    excerpt: "Document timing and entry essentials travelers often overlook.",
    author: "Travel Support",
    image: "thBeach",
    href: "travel-services/visa-travel-support/",
  },
];

const DESTINATIONS = [
  { title: "Thailand", text: "Home destination expertise across city, beach, and culture.", image: "thBeach", href: "destinations/thailand/" },
  { title: "Phuket", text: "Andaman luxury, yachts, and beach wedding settings.", image: "wedBeach", href: "destination-weddings/beach-weddings/" },
  { title: "Krabi", text: "Limestone coasts and calm resort escapes.", image: "thCity", href: "destinations/thailand/" },
  { title: "Bangkok", text: "Palaces, dining, shopping, and corporate venues.", image: "meetConf", href: "destinations/thailand/" },
  { title: "Chiang Mai", text: "Temples, mountains, and wellness pacing.", image: "teamBuild", href: "destinations/thailand/" },
  { title: "Asia", text: "Japan, Korea, Vietnam, Bali, and regional circuits.", image: "luxResort", href: "destinations/asia/" },
  { title: "Europe", text: "Classic luxury routes and alpine journeys.", image: "destEurope", href: "destinations/europe/" },
  { title: "Middle East", text: "Dubai and Gulf city luxury experiences.", image: "destDubai", href: "destinations/middle-east/" },
];

const INSPIRATION = [
  { title: "Luxury Holidays", text: "Five-star stays and private touring.", image: "luxResort", href: "travel-services/luxury-travel/" },
  { title: "Honeymoon", text: "Romantic beaches, villas, and quiet luxury.", image: "wedBeach", href: "destination-weddings/beach-weddings/" },
  { title: "Family Travel", text: "Comfort pacing for multi-generational trips.", image: "thCity", href: "travel-services/domestic-travel/" },
  { title: "Corporate Retreat", text: "Strategy days in resort settings.", image: "meetConf", href: "mice/corporate-retreats/" },
  { title: "Adventure", text: "Islands, parks, and soft adventure days.", image: "teamBuild", href: "travel-services/private-tours/" },
  { title: "Wellness", text: "Spa resorts and restorative itineraries.", image: "thBeach", href: "mice/corporate-retreats/" },
];

const FAQS = [
  {
    q: "What kind of articles does the D&G Holiday blog publish?",
    a: "Destination guides, luxury travel ideas, MICE and event insights, wedding planning notes, visa tips, and practical advice for corporate and leisure partners.",
  },
  {
    q: "Are the guides useful for travel agencies and corporate planners?",
    a: "Yes. Many articles are written for B2B partners who need destination clarity, venue thinking, and operational considerations — not only leisure inspiration.",
  },
  {
    q: "Can I request a custom destination brief?",
    a: "Absolutely. Use Request a Proposal or Contact Us with your dates, traveler profile, and goals — our desk will prepare a tailored plan.",
  },
  {
    q: "Do you cover destination weddings and Indian market topics?",
    a: "Yes. Wedding and India-market articles sit alongside travel and MICE content because they are core D&G Holiday specialties.",
  },
  {
    q: "How often is new content published?",
    a: "We add seasonal destination updates and planning guides regularly. Subscribe to the newsletter to receive new inspiration.",
  },
  {
    q: "Can blog ideas be turned into a booked itinerary?",
    a: "Yes — every guide is designed to convert into a real proposal through our travel, MICE, events, or wedding desks.",
  },
];

function renderBlogHubPage(rel) {
  const [lead, ...side] = FEATURED;

  const featuredSide = side
    .map(
      (a) => `<a class="dg-ts-card dg-ts-reveal" href="${rel}${a.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, a.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <p class="dg-blog-meta"><span class="dg-blog-meta__cat">${esc(a.category)}</span><span class="dg-blog-meta__date">${esc(a.date)}</span></p>
    <h3>${esc(a.title)}</h3>
    <p>${esc(a.excerpt)}</p>
    <span class="dg-ts-card__cta">Read More →</span>
  </div>
</a>`
    )
    .join("\n");

  const categories = CATEGORIES.map(
    (c, i) => `<a class="dg-blog-cat dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i % 4, 3)}` : ""}" href="${rel}${c.href}">
  <div>
    <p class="dg-blog-cat__label">${esc(c.label)}</p>
    <p class="dg-blog-cat__hint">${esc(c.hint)}</p>
  </div>
  <span class="dg-blog-cat__arrow">Browse →</span>
</a>`
  ).join("\n");

  const latest = LATEST.map(
    (a, i) => `<a class="dg-ts-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${a.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, a.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <p class="dg-blog-meta"><span class="dg-blog-meta__cat">${esc(a.category)}</span><span class="dg-blog-meta__date">${esc(a.date)}</span></p>
    <h3>${esc(a.title)}</h3>
    <p>${esc(a.excerpt)}</p>
    <p class="dg-blog-author">By ${esc(a.author)}</p>
    <span class="dg-ts-card__cta">Read More →</span>
  </div>
</a>`
  ).join("\n");

  const destinations = DESTINATIONS.map(
    (d, i) => `<a class="dg-ts-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${d.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, d.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <h3>${esc(d.title)}</h3>
    <p>${esc(d.text)}</p>
    <span class="dg-ts-card__cta">Explore →</span>
  </div>
</a>`
  ).join("\n");

  const inspiration = INSPIRATION.map(
    (d, i) => `<a class="dg-ts-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${d.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, d.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <h3>${esc(d.title)}</h3>
    <p>${esc(d.text)}</p>
    <span class="dg-ts-card__cta">Get inspired →</span>
  </div>
</a>`
  ).join("\n");

  const faqs = FAQS.map(
    (f) => `<details class="dg-ts-faq__item">
  <summary>${esc(f.q)}</summary>
  <p>${esc(f.a)}</p>
</details>`
  ).join("\n");

  return `<article class="dg-ts dg-blog dg-theme--blog">
  ${renderPageHero({
    title: "Travel Blog & Destination Guide",
    subtitle:
      "Expert travel tips, destination inspiration, event insights, and luxury travel experiences.",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: "Travel Blog" },
    ],
    primaryButton: { label: "Request A Proposal", href: "proposal/" },
    secondaryButton: { label: "Contact Us", href: "contact/" },
    rel,
  })}

  <section class="dg-blog-featured" id="featured">
    <div class="dg-ts__wrap">
      <div class="dg-ts-reveal">
        <p class="dg-ts__eyebrow">Featured Articles</p>
        <h2>Stories worth reading first</h2>
        <p class="dg-ts__lead">Editorial highlights from our destination, MICE, and wedding specialists.</p>
      </div>
      <div class="dg-blog-featured__grid">
        <a class="dg-blog-featured__lead dg-ts-reveal" href="${rel}${lead.href}">
          <div class="dg-blog-featured__lead-media" aria-hidden="true"><img src="${img(rel, lead.image)}" alt="" /></div>
          <div class="dg-blog-featured__lead-shade" aria-hidden="true"></div>
          <div class="dg-blog-featured__lead-body">
            <p class="dg-blog-meta"><span class="dg-blog-meta__cat">${esc(lead.category)}</span><span class="dg-blog-meta__date">${esc(lead.date)}</span></p>
            <h3>${esc(lead.title)}</h3>
            <p>${esc(lead.excerpt)}</p>
            <span class="dg-ts-card__cta">Read More →</span>
          </div>
        </a>
        <div class="dg-blog-featured__side">${featuredSide}</div>
      </div>
    </div>
  </section>

  <section class="dg-blog-cats" id="categories">
    <div class="dg-ts__wrap">
      <div class="dg-ts-reveal">
        <p class="dg-ts__eyebrow">Browse by Category</p>
        <h2>Find ideas by interest</h2>
        <p class="dg-ts__lead">A content map across travel, corporate, weddings, and practical planning topics.</p>
      </div>
      <div class="dg-blog-cats__grid">${categories}</div>
    </div>
  </section>

  <section class="dg-blog-latest" id="latest">
    <div class="dg-ts__wrap">
      <div class="dg-ts-reveal">
        <p class="dg-ts__eyebrow">Latest Articles</p>
        <h2>Fresh guides from the desk</h2>
        <p class="dg-ts__lead">CMS-ready article cards — ready to connect to individual story pages.</p>
      </div>
      <div class="dg-ts-highlights__grid" style="margin-top:36px">${latest}</div>
    </div>
  </section>

  <section class="dg-ts-highlights" id="destinations" style="background:var(--ts-mist)">
    <div class="dg-ts__wrap">
      <div class="dg-ts-reveal">
        <p class="dg-ts__eyebrow">Popular Destinations</p>
        <h2>Where readers explore next</h2>
        <p class="dg-ts__lead">Jump from inspiration into destination expertise.</p>
      </div>
      <div class="dg-ts-highlights__grid">${destinations}</div>
    </div>
  </section>

  <section class="dg-ts-related" id="inspiration">
    <div class="dg-ts__wrap">
      <div class="dg-ts-reveal">
        <p class="dg-ts__eyebrow">Travel Inspiration</p>
        <h2>Choose a travel mood</h2>
      </div>
      <div class="dg-ts-related__grid">${inspiration}</div>
    </div>
  </section>

  <section class="dg-blog-news" id="newsletter">
    <div class="dg-ts__wrap">
      <div class="dg-blog-news__panel dg-ts-reveal">
        <div class="dg-blog-news__bg" aria-hidden="true"><img src="${img(rel, "dest")}" alt="" /></div>
        <div class="dg-blog-news__shade" aria-hidden="true"></div>
        <div class="dg-blog-news__inner">
          <div>
            <p class="dg-ts__eyebrow" style="color:#e4c889">Newsletter</p>
            <h2>Stay Inspired</h2>
            <p>Receive destination ideas, seasonal tips, and luxury travel notes from D&amp;G Holiday Thailand.</p>
          </div>
          <form class="dg-blog-news__form" action="mailto:dgholidaythailand@gmail.com" method="get">
            <input type="hidden" name="subject" value="Newsletter Subscription" />
            <label class="visually-hidden" for="dg-blog-email">Email</label>
            <input id="dg-blog-email" type="email" name="body" required placeholder="Your email address" autocomplete="email" />
            <button type="submit" class="dg-ts-btn dg-ts-btn--gold">Subscribe</button>
            <p class="dg-blog-news__note" style="grid-column:1/-1">By subscribing you agree to receive occasional inspiration from D&amp;G Holiday.</p>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="dg-ts-faq" id="faq">
    <div class="dg-ts__wrap">
      <div class="dg-ts-reveal">
        <p class="dg-ts__eyebrow">FAQ</p>
        <h2>Frequently asked questions</h2>
      </div>
      <div class="dg-ts-faq__list dg-ts-reveal dg-ts-reveal-d1">${faqs}</div>
    </div>
  </section>

  ${renderPageCta({
    rel,
    title: "Ready to Plan Your Journey?",
    text: "Turn inspiration into an itinerary — our partner desk prepares tailored proposals for travel, MICE, events, and weddings.",
  })}
</article>
<style>.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}</style>`;
}

module.exports = {
  renderBlogHubPage,
};
