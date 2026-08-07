/**
 * Destination Wedding page content + HTML renderer
 * Shares luxury DMC design system (dg-ts) with soft beige wedding accents (dg-wd).
 */
const { renderPageHero } = require("./page-hero");
const { renderPageCta } = require("./page-cta");
const { buildImagesMap, withServiceMedia } = require("./service-images");

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

const DEFAULT_PROCESS = [
  { title: "Inquiry", text: "Share your date vision, guest count, and celebration style.", icon: "mail" },
  { title: "Consultation", text: "Meet your wedding planner to refine culture, venue, and budget.", icon: "messages-square" },
  { title: "Proposal", text: "Receive a tailored concept with venues, design, and investment.", icon: "file-heart" },
  { title: "Planning", text: "Vendors, timeline, décor, and guest logistics locked in detail.", icon: "clipboard-list" },
  { title: "Wedding Day", text: "On-site coordinators protect ceremony timing and guest comfort.", icon: "heart" },
  { title: "After Care", text: "Farewell brunch, vendor close-out, and memory delivery support.", icon: "sparkles" },
];

const DEFAULT_INCLUDED = [
  "Venue",
  "Decoration",
  "Photography",
  "Videography",
  "Accommodation",
  "Transportation",
  "Entertainment",
  "Flowers",
  "Wedding Cake",
  "Wedding Coordinator",
];

const DEFAULT_WHY = [
  { title: "Luxury wedding experts", text: "Planners who understand destination weddings at five-star standard.", icon: "gem" },
  { title: "Professional planning", text: "Clear timelines, vendor control, and budget transparency.", icon: "clipboard-list" },
  { title: "Premium venues", text: "Resorts, villas, beaches, and ballrooms matched to your guest list.", icon: "hotel" },
  { title: "Experienced coordinators", text: "Day-of teams who protect ceremony flow and family protocol.", icon: "users" },
  { title: "International standards", text: "Service levels trusted by overseas couples and wedding agencies.", icon: "globe" },
  { title: "24/7 support", text: "Duty coverage for guest arrivals, weather shifts, and last-minute needs.", icon: "headset" },
];

const PAGE_SECTION_ICONS = {
  "indian-weddings": "flower-2",
  "thai-weddings": "landmark",
  "luxury-weddings": "gem",
  "beach-weddings": "palmtree",
  "wedding-venues": "map-pin",
  "wedding-planning-services": "calendar-heart",
};

const PACKAGES_LEADS = {
  "indian-weddings": "Regional traditions and multi-day formats shaped for Indian families.",
  "thai-weddings": "Sacred rites and elegant venues for Thai and international couples.",
  "luxury-weddings": "Exclusive settings and VIP service for ultra-premium celebrations.",
  "beach-weddings": "Sunset, private shore, and island styles with weather-ready plans.",
  "wedding-venues": "Hotels, villas, beaches, ballrooms, and gardens — shortlisted with care.",
  "wedding-planning-services": "Full and partial planning that keeps every moving part aligned.",
};

const PROCESS_LEADS = {
  "indian-weddings": "From first inquiry to a polished multi-day wedding week.",
  "thai-weddings": "From ritual brief to ceremony day and evening celebration.",
  "luxury-weddings": "From exclusive concept to white-glove wedding-day delivery.",
  "beach-weddings": "From shoreline shortlist to sunset vows and contingency care.",
  "wedding-venues": "From capacity brief to site visits, holds, and booking support.",
  "wedding-planning-services": "From vision call to timeline, vendors, and after-wedding care.",
};

function ico(name, size) {
  const cls = size === "lg" ? "dg-ts-ico dg-ts-ico--lg" : "dg-ts-ico";
  return `<span class="${cls}" aria-hidden="true"><i data-lucide="${esc(name)}" class="dg-lucide"></i></span>`;
}

function pickIcon(title, fallback = "heart") {
  const t = String(title || "").toLowerCase();
  if (/indian|punjabi|gujarati|tamil|south indian|north indian|sangeet|mandap/.test(t)) return "flower-2";
  if (/thai|monk|blessing|water pouring|costume|rod nam/.test(t)) return "landmark";
  if (/beach|sunset|ocean|island|seaside|shore/.test(t)) return "palmtree";
  if (/yacht|villa|five.?star|luxury|vip|exclusive|concierge|butler/.test(t)) return "gem";
  if (/venue|hotel|ballroom|garden|rooftop|resort|location/.test(t)) return "map-pin";
  if (/photo|film|video|portrait/.test(t)) return "camera";
  if (/flower|floral|décor|decor|decoration|arch|setup/.test(t)) return "flower";
  if (/cake|dining|catering|menu/.test(t)) return "cake-slice";
  if (/guest|room|accommodation|welcome/.test(t)) return "users";
  if (/transport|transfer|airport/.test(t)) return "car";
  if (/entertain|dj|music|band/.test(t)) return "music";
  if (/plan|timeline|budget|coordinator|vendor/.test(t)) return "clipboard-list";
  if (/multi.?day|celebration|reception|ceremony|wedding/.test(t)) return "heart";
  if (/romantic|intimate|private/.test(t)) return "heart";
  if (/experience|helicopter/.test(t)) return "sparkles";
  if (/support|24\/7|duty|care/.test(t)) return "headset";
  if (/international|global|standard/.test(t)) return "globe";
  if (/expert|luxury wedding|premium/.test(t)) return "gem";
  if (/partner|reliable|network/.test(t)) return "handshake";
  return fallback;
}

function sectionHead({ eyebrow, title, lead, icon, id, align }) {
  const headClass =
    align === "left" ? "dg-ts-section__head dg-ts-section__head--left" : "dg-ts-section__head";
  return `<div class="${headClass} dg-ts-reveal">
  ${icon ? ico(icon, "lg") : ""}
  <p class="dg-ts__eyebrow">${esc(eyebrow)}</p>
  <h2${id ? ` id="${esc(id)}"` : ""}>${esc(title)}</h2>
  ${lead ? `<p class="dg-ts__lead">${esc(lead)}</p>` : ""}
</div>`;
}

/** @type {Record<string, object>} */
const PAGES = {
  "indian-weddings": {
    section: "Destination Weddings",
    sectionHref: "destination-weddings/",
    title: "Indian Weddings",
    sub: "Luxury Indian destination weddings in Thailand — multi-day celebrations with tradition, resort elegance, and complete guest care.",
    hero: "dubai",
    aboutTitle: "Indian weddings, hosted in Thailand",
    about: [
      "D&G Holiday specializes in Indian destination weddings that honor ceremony traditions while delivering five-star hospitality for families traveling from India and around the world.",
      "From North Indian and Punjabi celebrations to South Indian, Gujarati, and Tamil wedding days, we coordinate multi-event timelines, décor language, catering preferences, and guest management as one accountable planner.",
    ],
    aboutImage: "egypt",
    packagesTitle: "Celebrations we design",
    packages: [
      { title: "North Indian Wedding", text: "Vibrant décor, ceremony structure, and reception energy shaped for North Indian families.", image: "japan", href: "destination-weddings/indian-weddings/" },
      { title: "South Indian Wedding", text: "Elegant ritual pacing with venue setups suited to South Indian traditions.", image: "korea", href: "destination-weddings/indian-weddings/" },
      { title: "Gujarati Wedding", text: "Warm hospitality, ritual detail, and guest flow planned for extended family gatherings.", image: "europe", href: "destination-weddings/indian-weddings/" },
      { title: "Punjabi Wedding", text: "High-energy celebrations with music, décor scale, and polished resort logistics.", image: "swiss", href: "destination-weddings/indian-weddings/" },
      { title: "Tamil Wedding", text: "Sacred ceremony focus with respectful venue styling and family protocol care.", image: "dest", href: "destination-weddings/indian-weddings/" },
      { title: "Multi-day Celebration", text: "Welcome nights, ceremonies, and receptions sequenced across luxury resorts.", image: "partner", href: "destination-weddings/luxury-weddings/" },
    ],
    why: [
      { title: "Multi-day specialists", text: "Indian wedding specialists experienced with multi-day destination formats." },
      { title: "Event-by-event runways", text: "Event-by-event run-of-show for sangeet, ceremony, and reception days." },
      { title: "Large-guest venues", text: "Resorts and ballrooms that support large guest lists and décor builds." },
      { title: "Family protocol care", text: "Teams who understand family protocol and timing sensitivity." },
      { title: "Guest arrival polish", text: "Guest care for international arrivals, rooms, and transfers." },
      { title: "Wedding-week duty", text: "On-property duty managers throughout the wedding week." },
    ],
    included: [
      "Luxury resort venue",
      "Traditional & reception décor",
      "Photography & videography partners",
      "Guest accommodation blocks",
      "Airport & hotel transportation",
      "Entertainment & DJ coordination",
      "Floral mandap & stage styling",
      "Wedding cake & dessert moments",
      "Wedding coordinator team",
      "Guest management desk",
    ],
    process: DEFAULT_PROCESS,
    gallery: ["dubai", "egypt", "japan", "europe", "swiss"],
    galleryTitle: "Indian celebration atmospheres",
    faqs: [
      { q: "Can you plan multi-day Indian weddings in Thailand?", a: "Yes. We commonly design welcome events, ceremonies, and receptions across consecutive days at luxury resorts." },
      { q: "Do you support different regional Indian traditions?", a: "North Indian, South Indian, Gujarati, Punjabi, Tamil, and blended celebrations can be planned with respectful ritual pacing." },
      { q: "Can vegetarian, Jain, or regional catering be arranged?", a: "We coordinate with specialist caterers and resort kitchens to meet dietary and regional preferences." },
      { q: "How many guests can destination resorts host?", a: "Capacity depends on venue — we shortlist properties that fit your ceremony, reception, and room-block needs." },
      { q: "Do you manage guest arrivals and rooming lists?", a: "Welcome desks, transfers, and rooming coordination are core parts of our Indian wedding planning." },
      { q: "Can Hindi-speaking support be provided?", a: "Yes. Hindi-speaking coordinators and guest support can be arranged through our India desk." },
    ],
    related: [
      { title: "Luxury Weddings", text: "Five-star resorts and VIP guest service.", href: "destination-weddings/luxury-weddings/", image: "swiss" },
      { title: "Wedding Planning Services", text: "Full timeline and vendor coordination.", href: "destination-weddings/wedding-planning-services/", image: "partner" },
      { title: "Indian Wedding Services", text: "India-market wedding desk overview.", href: "india-market/indian-wedding-services/", image: "dubai" },
    ],
    ctaTitle: "Let's plan your Indian wedding",
    ctaText: "Share your preferred dates, guest count, and regional traditions — our wedding desk will prepare a proposal.",
  },

  "thai-weddings": {
    section: "Destination Weddings",
    sectionHref: "destination-weddings/",
    title: "Thai Weddings",
    sub: "Traditional Thai ceremonies with monk blessings, water pouring rituals, and elegant contemporary celebrations.",
    hero: "japan",
    aboutTitle: "Thai ceremonies with cultural grace",
    about: [
      "D&G Holiday designs Thai weddings that honor sacred traditions — monk blessings, water pouring ceremonies, and classic Thai costume moments — while keeping guest hospitality refined and calm.",
      "Whether intimate family rites or larger banquet celebrations, we coordinate venues, cultural styling, and photography windows so every ritual feels respectful and beautifully presented.",
    ],
    aboutImage: "dest",
    packagesTitle: "Thai wedding experiences",
    packages: [
      { title: "Traditional Thai Wedding", text: "Full ceremonial structure with cultural advisors and elegant venue styling.", image: "korea", href: "destination-weddings/thai-weddings/" },
      { title: "Thai Ceremony", text: "Focused ritual programs for couples seeking authentic Thai wedding rites.", image: "europe", href: "destination-weddings/thai-weddings/" },
      { title: "Monk Blessing", text: "Temple or venue-based blessings arranged with proper protocol.", image: "swiss", href: "destination-weddings/thai-weddings/" },
      { title: "Water Pouring Ceremony", text: "Rod nam sang moments staged with floral and seating elegance.", image: "dubai", href: "destination-weddings/thai-weddings/" },
      { title: "Traditional Costume", text: "Thai wedding attire coordination and dressing timelines.", image: "egypt", href: "destination-weddings/wedding-planning-services/" },
      { title: "Luxury Thai Venue", text: "Garden, resort, and heritage venues suited to Thai celebrations.", image: "partner", href: "destination-weddings/wedding-venues/" },
    ],
    why: [
      { title: "Protocol-first planners", text: "Planners who respect Thai ceremony protocol and modern guest comfort." },
      { title: "Ritual timing maps", text: "Ritual timing, family roles, and reception flow clearly mapped." },
      { title: "Sacred-ready venues", text: "Spaces that support both sacred rites and refined dining." },
      { title: "Custom-fluent teams", text: "Day-of teams fluent in Thai wedding customs." },
      { title: "Cross-culture care", text: "Ideal for Thai–international couples and overseas families." },
      { title: "Dawn-to-dusk coverage", text: "Coordinator coverage from morning rites to evening celebration." },
    ],
    included: DEFAULT_INCLUDED,
    process: DEFAULT_PROCESS,
    gallery: ["japan", "dest", "korea", "europe", "swiss"],
    galleryTitle: "Thai ceremony & venue elegance",
    faqs: [
      { q: "Can foreign couples have a traditional Thai wedding ceremony?", a: "Ceremonial celebrations can be arranged; legal marriage requirements depend on documentation — we guide you through both celebration and paperwork pathways." },
      { q: "Do you arrange monk blessings?", a: "Yes. We coordinate appropriate venues, timing, and offering arrangements with cultural respect." },
      { q: "Is traditional Thai costume support available?", a: "We can coordinate costume rental or styling timelines for the couple and key family members." },
      { q: "Can Thai and Western elements be combined?", a: "Many couples blend a Thai morning ceremony with an evening reception — we design both as one seamless day." },
      { q: "What venues suit Thai weddings best?", a: "Garden resorts, heritage spaces, and elegant hotel venues with soft natural light are frequent favorites." },
      { q: "How far in advance should we book?", a: "Three to six months is ideal for preferred venues and cultural specialists; shorter lead times are reviewed case by case." },
    ],
    related: [
      { title: "Wedding Venues", text: "Garden and heritage venue shortlists.", href: "destination-weddings/wedding-venues/", image: "dest" },
      { title: "Luxury Weddings", text: "Five-star Thai celebration upgrades.", href: "destination-weddings/luxury-weddings/", image: "swiss" },
      { title: "Wedding Planning Services", text: "Complete planning from inquiry to farewell.", href: "destination-weddings/wedding-planning-services/", image: "partner" },
    ],
    ctaTitle: "Let's plan your Thai wedding",
    ctaText: "Tell us your preferred rites, guest list, and venue mood — our planners will craft a Thai wedding proposal.",
  },

  "luxury-weddings": {
    section: "Destination Weddings",
    sectionHref: "destination-weddings/",
    title: "Luxury Weddings",
    sub: "Five-star hotels, private villas, yacht celebrations, and exclusive experiences with white-glove VIP service.",
    hero: "swiss",
    aboutTitle: "Luxury weddings without visible effort",
    about: [
      "Luxury weddings with D&G Holiday are defined by exclusivity: iconic resorts, private villas, yacht ceremonies, fine dining, and décor that feels couture — never crowded or template-driven.",
      "Ideal for couples who want discretion, designer styling, and VIP guest handling from first arrival to final toast.",
    ],
    aboutImage: "europe",
    packagesTitle: "Luxury wedding signatures",
    packages: [
      { title: "Five-star Hotels", text: "Flagship hotel ballrooms and terrace ceremonies with polished service.", image: "dubai", href: "destination-weddings/luxury-weddings/" },
      { title: "Private Villas", text: "Exclusive-use villas for intimate luxury celebrations.", image: "japan", href: "destination-weddings/wedding-venues/" },
      { title: "Luxury Resorts", text: "Destination resorts with spa, suites, and guest amenity programs.", image: "korea", href: "destination-weddings/beach-weddings/" },
      { title: "Yacht Weddings", text: "On-water ceremonies and receptions with private charter logistics.", image: "egypt", href: "destination-weddings/beach-weddings/" },
      { title: "Exclusive Experiences", text: "Helicopter arrivals, private dining, and bespoke guest gifts.", image: "dest", href: "travel-services/luxury-travel/" },
      { title: "VIP Services", text: "Butler teams, premium transfers, and discreet security coordination.", image: "partner", href: "destination-weddings/wedding-planning-services/" },
    ],
    why: [
      { title: "Ultra-premium fluency", text: "Planners fluent in ultra-premium venue and vendor standards." },
      { title: "Complex build schedules", text: "Detailed production schedules for complex luxury builds." },
      { title: "Exclusive access", text: "Access to exclusive resorts, villas, and private estates." },
      { title: "White-glove day teams", text: "White-glove day-of teams for VIP guest expectations." },
      { title: "Global luxury standard", text: "Service quality aligned with global luxury travel brands." },
      { title: "Concierge coverage", text: "Concierge-level coverage throughout the wedding stay." },
    ],
    included: [
      "Exclusive luxury venue",
      "Designer decoration & florals",
      "Premium photography & film",
      "Suite & villa accommodation",
      "VIP transportation",
      "Live entertainment casting",
      "Fine dining & sommelier options",
      "Luxury wedding cake",
      "Lead wedding coordinator",
      "Guest concierge desk",
    ],
    process: DEFAULT_PROCESS,
    gallery: ["swiss", "europe", "dubai", "egypt", "japan"],
    galleryTitle: "Luxury settings & couture details",
    faqs: [
      { q: "What makes a wedding 'luxury' in your planning?", a: "Exclusive venues, elevated design, premium culinary, VIP logistics, and a higher staffing ratio for seamless guest care." },
      { q: "Can you arrange yacht or private villa weddings?", a: "Yes. We plan charter logistics, safety, décor installs, and guest transfers for exclusive settings." },
      { q: "Do you offer private chefs and fine dining?", a: "Private chefs, tasting menus, and sommelier pairings can be built into the celebration." },
      { q: "How do you protect privacy for high-profile couples?", a: "Venue exclusivity, controlled guest lists, and discreet staffing plans are designed into the brief." },
      { q: "Can international designers collaborate with your team?", a: "We regularly integrate overseas designers with local production and venue rules." },
      { q: "Is a dedicated wedding concierge included?", a: "Luxury programs typically include a lead coordinator plus guest concierge support." },
    ],
    related: [
      { title: "Beach Weddings", text: "Romantic seaside luxury ceremonies.", href: "destination-weddings/beach-weddings/", image: "dubai" },
      { title: "Wedding Venues", text: "Exclusive location shortlists.", href: "destination-weddings/wedding-venues/", image: "dest" },
      { title: "Indian Weddings", text: "Multi-day luxury Indian celebrations.", href: "destination-weddings/indian-weddings/", image: "egypt" },
    ],
    ctaTitle: "Let's design your luxury wedding",
    ctaText: "Share your dream setting and guest profile — we will prepare an exclusive luxury wedding proposal.",
  },

  "beach-weddings": {
    section: "Destination Weddings",
    sectionHref: "destination-weddings/",
    title: "Beach Weddings",
    sub: "Sunset ceremonies, private beaches, island weddings, and romantic ocean-view setups at luxury resorts.",
    hero: "dest",
    aboutTitle: "Seaside vows with cinematic light",
    about: [
      "Beach weddings with D&G Holiday are planned around tide, sunset, permits, and guest comfort — so the romance feels effortless while operations stay invisible.",
      "From private beach ceremonies in Phuket and Samui to island celebrations with ocean-view receptions, we design floral aisles, contingency plans, and photography windows that capture the moment.",
    ],
    aboutImage: "dubai",
    packagesTitle: "Beach wedding styles",
    packages: [
      { title: "Beach Ceremony", text: "Barefoot or formal aisle setups facing the open sea.", image: "japan", href: "destination-weddings/beach-weddings/" },
      { title: "Sunset Wedding", text: "Timing engineered for golden-hour vows and portraits.", image: "europe", href: "destination-weddings/beach-weddings/" },
      { title: "Private Beach", text: "Exclusive shoreline access for intimate or VIP celebrations.", image: "swiss", href: "destination-weddings/luxury-weddings/" },
      { title: "Island Wedding", text: "Island transfers, guest logistics, and resort-based receptions.", image: "korea", href: "destination-weddings/wedding-venues/" },
      { title: "Ocean View Reception", text: "Seaside dining with soft lighting and coastal florals.", image: "egypt", href: "destination-weddings/luxury-weddings/" },
      { title: "Romantic Setup", text: "Arches, petals, lanterns, and aisle styling for magazine-ready frames.", image: "partner", href: "destination-weddings/wedding-planning-services/" },
    ],
    why: [
      { title: "Tide-aware planners", text: "Coastal wedding planners who anticipate weather and tide." },
      { title: "Permit-ready plans", text: "Permits, setup windows, and guest comfort planned in detail." },
      { title: "Backup-ready resorts", text: "Resorts with beautiful beaches and reliable backup spaces." },
      { title: "On-sand grace", text: "On-sand teams who keep ceremonies graceful and on time." },
      { title: "Island guest care", text: "Guest care for overseas families traveling to island destinations." },
      { title: "Weather pivots", text: "Rapid contingency activation if weather shifts." },
    ],
    included: DEFAULT_INCLUDED,
    process: DEFAULT_PROCESS,
    gallery: ["dest", "dubai", "japan", "europe", "korea"],
    galleryTitle: "Ocean light & seaside romance",
    faqs: [
      { q: "What happens if it rains on the wedding day?", a: "Every beach wedding includes a polished indoor or covered contingency venue and decision timeline." },
      { q: "Do beach ceremonies require permits?", a: "Many locations do — we handle location rules, timing windows, and setup compliance." },
      { q: "Can we have a private beach for vows?", a: "Exclusive or semi-private beach options are sourced based on destination and guest count." },
      { q: "Which destinations are best for beach weddings?", a: "Phuket, Koh Samui, Krabi, and select island resorts are frequent favorites." },
      { q: "Are barefoot ceremonies guest-friendly?", a: "We plan seating, shade, and walkway comfort so guests of all ages enjoy the shore setting." },
      { q: "Can the reception move indoors after sunset?", a: "Yes — many couples take vows on the beach and dine in a resort ballroom or pavilion." },
    ],
    related: [
      { title: "Luxury Weddings", text: "VIP upgrades for seaside celebrations.", href: "destination-weddings/luxury-weddings/", image: "swiss" },
      { title: "Wedding Venues", text: "Beach resort and island venue shortlists.", href: "destination-weddings/wedding-venues/", image: "korea" },
      { title: "Thai Weddings", text: "Blend Thai rites with a beach setting.", href: "destination-weddings/thai-weddings/", image: "japan" },
    ],
    ctaTitle: "Let's plan your beach wedding",
    ctaText: "Share your destination dream and guest count — we will propose beach venues and sunset ceremony plans.",
  },

  "wedding-venues": {
    section: "Destination Weddings",
    sectionHref: "destination-weddings/",
    title: "Wedding Venues",
    sub: "Curated luxury hotels, private villas, beach resorts, ballrooms, gardens, rooftops, and exclusive island locations.",
    hero: "europe",
    aboutTitle: "Venues that shape the wedding",
    about: [
      "D&G Holiday shortlists wedding venues by capacity, ceremony style, guest room inventory, backup options, and design potential — so couples choose with clarity, not guesswork.",
      "From ballrooms and garden lawns to rooftop terraces and island resorts, we arrange inspections, preferred rates, and layout recommendations that protect both romance and operations.",
    ],
    aboutImage: "partner",
    packagesTitle: "Venue categories we curate",
    packages: [
      { title: "Luxury Hotels", text: "Five-star hotels with ceremony spaces and guest room blocks.", image: "dubai", href: "destination-weddings/luxury-weddings/" },
      { title: "Private Villas", text: "Exclusive villas for intimate luxury celebrations.", image: "swiss", href: "destination-weddings/luxury-weddings/" },
      { title: "Beach Resorts", text: "Oceanfront resorts with ceremony lawns and sunset views.", image: "dest", href: "destination-weddings/beach-weddings/" },
      { title: "Ballrooms", text: "Grand indoor spaces for receptions and multi-day Indian events.", image: "korea", href: "destination-weddings/indian-weddings/" },
      { title: "Garden & Rooftop", text: "Soft daylight gardens and skyline terraces for modern vows.", image: "japan", href: "destination-weddings/thai-weddings/" },
      { title: "Island & Exclusive", text: "Island venues and private locations for unforgettable settings.", image: "egypt", href: "destination-weddings/beach-weddings/" },
    ],
    why: [
      { title: "Real capacity insight", text: "Venue specialists who know real capacity beyond brochure numbers." },
      { title: "Early site planning", text: "Site inspections, layouts, and vendor access planned early." },
      { title: "Curated venue network", text: "A curated network of hotels, villas, and destination resorts." },
      { title: "Venue relationship care", text: "Teams who negotiate and manage venue relationships." },
      { title: "Agency-ready shortlists", text: "Venues that satisfy overseas couples and wedding agencies." },
      { title: "Hold-to-contract support", text: "Support through hold requests, site visits, and contract stages." },
    ],
    included: [
      "Venue shortlist & comparison",
      "Site inspection support",
      "Layout & capacity planning",
      "Preferred rate negotiation",
      "Backup indoor options",
      "Guest room block guidance",
      "Vendor access coordination",
      "Ceremony & reception zoning",
      "Wedding coordinator liaison",
      "Contract timeline support",
    ],
    process: DEFAULT_PROCESS,
    gallery: ["europe", "partner", "dubai", "dest", "swiss"],
    galleryTitle: "Venue moods & celebration spaces",
    faqs: [
      { q: "Can you arrange virtual or in-person venue tours?", a: "Yes. We organize site inspections and can support remote walkthroughs with detailed notes and photos." },
      { q: "How do you match venues to guest count?", a: "We evaluate ceremony, dining, dance floor, and room-block capacity — not just headline maximums." },
      { q: "Do all beach venues have indoor backups?", a: "We prioritize properties with strong contingencies and clarify options before you book." },
      { q: "Can one resort host a full multi-day wedding?", a: "Many luxury resorts can — we confirm event spaces, noise rules, and room inventory for the full stay." },
      { q: "Are exclusive buyouts available?", a: "Selected villas and intimate resorts can be considered for exclusive-use celebrations." },
      { q: "Do you help with venue contracts?", a: "We guide inclusions, payment schedules, and operational clauses so expectations stay clear." },
    ],
    related: [
      { title: "Wedding Planning Services", text: "Full planning after venue selection.", href: "destination-weddings/wedding-planning-services/", image: "partner" },
      { title: "Beach Weddings", text: "Oceanfront ceremony specialists.", href: "destination-weddings/beach-weddings/", image: "dest" },
      { title: "Luxury Weddings", text: "Ultra-premium venue experiences.", href: "destination-weddings/luxury-weddings/", image: "swiss" },
    ],
    ctaTitle: "Let's shortlist your wedding venues",
    ctaText: "Share date range, guest count, and setting preference — we will prepare a curated venue proposal.",
  },

  "wedding-planning-services": {
    section: "Destination Weddings",
    sectionHref: "destination-weddings/",
    title: "Wedding Planning Services",
    sub: "Complete destination wedding planning — venue, budget, décor, photo, entertainment, guests, timeline, and vendors.",
    hero: "partner",
    aboutTitle: "One planner. Every moving part.",
    about: [
      "D&G Holiday offers full and partial wedding planning for couples who want a calm path from first inquiry to farewell brunch. We manage vendors, budgets, timelines, and guest logistics with luxury DMC discipline.",
      "Whether Indian multi-day weeks, Thai ceremonies, beach sunsets, or ultra-luxury villa weddings, your lead planner keeps every detail aligned to your vision.",
    ],
    aboutImage: "korea",
    packagesTitle: "Planning services we provide",
    packages: [
      { title: "Complete Wedding Planning", text: "End-to-end ownership from concept to day-of execution.", image: "dubai", href: "destination-weddings/wedding-planning-services/" },
      { title: "Venue Selection", text: "Shortlists, inspections, and booking guidance.", image: "europe", href: "destination-weddings/wedding-venues/" },
      { title: "Budget Planning", text: "Transparent investment maps across design, venue, and guests.", image: "japan", href: "destination-weddings/luxury-weddings/" },
      { title: "Decoration & Flowers", text: "Design direction with florals, staging, and install teams.", image: "dest", href: "destination-weddings/beach-weddings/" },
      { title: "Photo, Film & Entertainment", text: "Creative partners cast to your style and ceremony pace.", image: "egypt", href: "destination-weddings/indian-weddings/" },
      { title: "Guest Management", text: "Rooms, transfers, welcome desks, and wedding-week care.", image: "swiss", href: "destination-weddings/indian-weddings/" },
    ],
    why: [
      { title: "Full or partial planning", text: "Engage us for full planning, venue-plus-coordination, or day-of support." },
      { title: "Master timeline craft", text: "Vendor calls, setup, ceremony cues, and guest movements in one plan." },
      { title: "Vendor integration", text: "Overseas designers joined cleanly with local production and venue rules." },
      { title: "Guest-week logistics", text: "Room blocks, welcome desks, and transfer schedules handled together." },
      { title: "Scaled on-site teams", text: "Staffing scales with guest count — always with a lead coordinator." },
      { title: "Peak-date readiness", text: "Ideal lead times planned honestly for preferred venues and seasons." },
    ],
    included: [
      "Venue selection support",
      "Budget planning & tracking",
      "Decoration direction",
      "Photography coordination",
      "Videography coordination",
      "Entertainment booking",
      "Transportation planning",
      "Accommodation blocks",
      "Guest management",
      "Wedding timeline & vendor coordination",
    ],
    process: DEFAULT_PROCESS,
    gallery: ["partner", "korea", "dubai", "dest", "europe"],
    galleryTitle: "Planning craft & celebration details",
    faqs: [
      { q: "Do you offer partial planning as well as full planning?", a: "Yes. Couples can engage us for full planning, venue-plus-coordination, or day-of execution support." },
      { q: "How does the wedding timeline work?", a: "We build a master timeline covering vendor calls, setup, ceremony cues, and guest movements." },
      { q: "Can you coordinate overseas vendors?", a: "We integrate your preferred designers or planners with local production and venue compliance." },
      { q: "Is guest accommodation part of planning?", a: "Room blocks, welcome desks, and transfer schedules are core destination wedding services." },
      { q: "How many coordinators are on site?", a: "Staffing scales with guest count and ceremony complexity — always with a lead coordinator." },
      { q: "When should couples start planning?", a: "Six to twelve months is ideal for peak dates; we also support accelerated timelines when venues allow." },
    ],
    related: [
      { title: "Indian Weddings", text: "Specialist multi-day Indian celebrations.", href: "destination-weddings/indian-weddings/", image: "dubai" },
      { title: "Wedding Venues", text: "Curated venue discovery.", href: "destination-weddings/wedding-venues/", image: "europe" },
      { title: "Beach Weddings", text: "Sunset ceremony planning.", href: "destination-weddings/beach-weddings/", image: "dest" },
    ],
    ctaTitle: "Let's plan your dream wedding",
    ctaText: "Tell us your date vision and planning needs — our wedding desk will prepare a complete proposal.",
  },
};

function renderWeddingServicePage(pageId, rel) {
  const p = withServiceMedia(pageId, PAGES[pageId]);
  if (!p) return null;

  const sectionIcon = PAGE_SECTION_ICONS[pageId] || "heart";
  const packagesLead =
    PACKAGES_LEADS[pageId] ||
    "Premium celebration styles shaped for destination couples.";
  const processLead =
    PROCESS_LEADS[pageId] ||
    "A calm path from first inquiry to after-wedding care.";

  const packages = p.packages
    .map((h, i) => {
      const icon = h.icon || pickIcon(h.title);
      return `<a class="dg-ts-card dg-wd-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${h.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, h.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(h.title)}</h3>
    <p>${esc(h.text)}</p>
    <span class="dg-ts-card__cta">Explore <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");

  const why = (p.why || DEFAULT_WHY)
    .map((w, i) => {
      const icon = w.icon || pickIcon(w.title, "heart");
      return `<article class="dg-ts-why__item dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}">
  ${ico(icon)}
  <h3>${esc(w.title)}</h3>
  <p>${esc(w.text)}</p>
</article>`;
    })
    .join("\n");

  const steps = (p.process || DEFAULT_PROCESS)
    .map((s, i) => {
      const icon = s.icon || pickIcon(s.title, "circle-check");
      return `<div class="dg-ts-step dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}">
  ${ico(icon, "lg")}
  <h3>${esc(s.title)}</h3>
  <p>${esc(s.text)}</p>
</div>`;
    })
    .join("\n");

  const included = (p.included || DEFAULT_INCLUDED)
    .map((item) => `<li>${ico("circle-check")}<span>${esc(item)}</span></li>`)
    .join("");

  const gallery = (p.galleryImages || p.gallery || [p.aboutImage])
    .map(
      (k, i) =>
        `<figure class="dg-ts-gallery__item dg-ts-reveal"><img src="${img(rel, k)}" alt="${esc(p.title)} gallery ${i + 1}" loading="lazy" /></figure>`
    )
    .join("\n");

  const faqs = p.faqs
    .map(
      (f) => `<details class="dg-ts-faq__item">
  <summary>${esc(f.q)}</summary>
  <p>${esc(f.a)}</p>
</details>`
    )
    .join("\n");

  const related = p.related
    .map((r) => {
      const icon = r.icon || pickIcon(r.title);
      return `<a class="dg-ts-card dg-wd-card dg-ts-reveal" href="${rel}${r.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, r.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(r.title)}</h3>
    <p>${esc(r.text)}</p>
    <span class="dg-ts-card__cta">View service <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");

  const aboutParas = p.about.map((t) => `<p>${esc(t)}</p>`).join("\n");

  const trust = (p.why || DEFAULT_WHY)
    .slice(0, 3)
    .map((w) => {
      const icon = w.icon || pickIcon(w.title, "heart");
      return `<li>
  ${ico(icon)}
  <div><strong>${esc(w.title)}</strong><span>${esc(w.text)}</span></div>
</li>`;
    })
    .join("\n");

  const promise = [
    { icon: sectionIcon, title: p.title, text: "Celebration style, refined" },
    { icon: "hotel", title: "Premium venues", text: "Resorts, villas & shores" },
    { icon: "users", title: "Guest care", text: "Arrivals to farewell" },
  ]
    .map(
      (item) => `<li class="dg-wd-promise__item dg-ts-reveal">
  ${ico(item.icon, "lg")}
  <div><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div>
</li>`
    )
    .join("\n");

  return `<article class="dg-ts dg-wd dg-theme--wedding">
  ${renderPageHero({
    title: p.title,
    subtitle: p.sub,
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: p.section, href: p.sectionHref },
      { label: p.title },
    ],
    rel,
  })}

  <section class="dg-wd-promise" aria-label="Wedding promise">
    <div class="dg-ts__wrap">
      <ul class="dg-wd-promise__grid">${promise}</ul>
    </div>
  </section>

  <section class="dg-ts-overview" id="about">
    <div class="dg-ts__wrap">
      <div class="dg-ts-overview__grid">
        <div class="dg-ts-overview__copy dg-ts-reveal">
          ${sectionHead({
            eyebrow: "The Story",
            title: p.aboutTitle,
            icon: sectionIcon,
            align: "left",
          })}
          ${aboutParas}
          <ul class="dg-ts-trust" aria-label="Wedding strengths">${trust}</ul>
        </div>
        <figure class="dg-ts-overview__media dg-ts-reveal dg-ts-reveal-d1">
          <img src="${img(rel, p.aboutImage)}" alt="${esc(p.title)} atmosphere" loading="lazy" />
          <figcaption class="dg-ts-overview__caption">
            <span>D&amp;G Holiday</span>
            <strong>${esc(p.title)}</strong>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="dg-ts-highlights" id="packages">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Wedding Packages",
        title: p.packagesTitle,
        lead: packagesLead,
        icon: "layout-grid",
      })}
      <div class="dg-ts-highlights__grid">${packages}</div>
    </div>
  </section>

  <section class="dg-ts-why" id="why">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Why Choose Us",
        title: "Why couples trust this desk",
        lead: "Romance with operational calm — planned for destination families.",
        icon: "shield-check",
      })}
      <div class="dg-ts-why__grid">${why}</div>
    </div>
  </section>

  <section class="dg-ts-steps" id="process">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Our Process",
        title: "From inquiry to after care",
        lead: processLead,
        icon: "route",
      })}
      <div class="dg-ts-steps__track dg-ts-steps__track--six">${steps}</div>
    </div>
  </section>

  <section class="dg-ts-included" id="included">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "What's Included",
        title: "Wedding building blocks",
        lead: "Final inclusions are confirmed in your proposal.",
        icon: "gift",
      })}
      <ul class="dg-ts-included__grid dg-ts-reveal dg-ts-reveal-d1">${included}</ul>
    </div>
  </section>

  <section class="dg-ts-gallery" id="gallery">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Gallery",
        title: p.galleryTitle || "Luxury wedding gallery",
        lead: "Atmosphere and detail from destination celebrations.",
        icon: "images",
      })}
      <div class="dg-ts-gallery__grid">${gallery}</div>
    </div>
  </section>

  <section class="dg-ts-faq" id="faq">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "FAQ",
        title: "Frequently asked questions",
        lead: "Practical answers couples ask before confirming a date.",
        icon: "circle-help",
      })}
      <div class="dg-ts-faq__list dg-ts-reveal dg-ts-reveal-d1">${faqs}</div>
    </div>
  </section>

  <section class="dg-ts-related" id="related">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Related Services",
        title: "Continue exploring",
        lead: "Wedding desks that often sit alongside this celebration.",
        icon: "link",
      })}
      <div class="dg-ts-related__grid">${related}</div>
    </div>
  </section>

  ${renderPageCta({
    rel,
    title: p.ctaTitle || "Let's plan your dream wedding",
    text:
      p.ctaText ||
      "Share your date vision and celebration style — our wedding planners will prepare a tailored proposal.",
    primaryLabel: "Request A Proposal",
    secondaryLabel: "Contact Us",
  })}
</article>`;
}

function hasWeddingServicePage(id) {
  return Boolean(PAGES[id]);
}

function listWeddingServicePageIds() {
  return Object.keys(PAGES);
}

function renderWeddingHubPage({ children, rel }) {
  const hubIcons = {
    "indian-weddings": "flower-2",
    "thai-weddings": "landmark",
    "luxury-weddings": "gem",
    "beach-weddings": "palmtree",
    "wedding-venues": "map-pin",
    "wedding-planning-services": "calendar-heart",
  };

  const cards = (children || [])
    .map((c, i) => {
      const icon = hubIcons[c.id] || PAGE_SECTION_ICONS[c.id] || "heart";
      return `<a class="dg-ts-card dg-wd-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${c.id}/">
  <div class="dg-ts-card__body" style="padding-top:28px">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(c.label)}</h3>
    <p>${esc(c.description || "")}</p>
    <span class="dg-ts-card__cta">Explore <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");

  return `<article class="dg-ts dg-wd dg-theme--wedding">
  ${renderPageHero({
    title: "Destination Weddings",
    subtitle:
      "Indian, Thai, luxury, and beach weddings in Thailand — planned with elegance, cultural care, and white-glove coordination.",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: "Destination Weddings" },
    ],
    rel,
  })}

  <section class="dg-wd-promise" aria-label="Wedding promise">
    <div class="dg-ts__wrap">
      <ul class="dg-wd-promise__grid">
        <li class="dg-wd-promise__item dg-ts-reveal">${ico("heart", "lg")}<div><strong>Romance</strong><span>Ceremony light &amp; atmosphere</span></div></li>
        <li class="dg-wd-promise__item dg-ts-reveal dg-ts-reveal-d1">${ico("clipboard-list", "lg")}<div><strong>Planning</strong><span>Vendors, timeline &amp; guests</span></div></li>
        <li class="dg-wd-promise__item dg-ts-reveal dg-ts-reveal-d2">${ico("sparkles", "lg")}<div><strong>Delivery</strong><span>White-glove wedding-day care</span></div></li>
      </ul>
    </div>
  </section>

  <section class="dg-ts-hub">
    <div class="dg-ts__wrap">
      <div class="dg-ts-section__head dg-ts-reveal">
        ${ico("heart", "lg")}
        <p class="dg-ts__eyebrow">Wedding Services</p>
        <h2>Choose your celebration path</h2>
        <p class="dg-ts__lead">Same elegant landing system on every page — clear proof and next steps.</p>
      </div>
      <div class="dg-ts-hub__grid">${cards}</div>
    </div>
  </section>
  ${renderPageCta({
    rel,
    title: "Ready to plan your dream wedding?",
    text: "Share your date vision and celebration style — our wedding planners will prepare a tailored proposal.",
  })}
</article>`;
}

module.exports = {
  renderWeddingServicePage,
  hasWeddingServicePage,
  listWeddingServicePageIds,
  renderWeddingHubPage,
  PAGES,
};
