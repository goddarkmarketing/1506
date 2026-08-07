/**
 * MICE & Event Management page content + HTML renderer
 * Shares luxury DMC design system (dg-ts) with travel pages.
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
  { title: "Consultation", text: "Clarify objectives, guests, budget, and success criteria.", icon: "messages-square" },
  { title: "Planning", text: "Build venue shortlists, run-of-show, and supplier architecture.", icon: "map" },
  { title: "Proposal", text: "Present transparent options with timelines and investment.", icon: "file-text" },
  { title: "Execution", text: "Confirm contracts, production, F&B, and guest logistics.", icon: "clipboard-check" },
  { title: "On-site Management", text: "Deploy managers to keep timing, quality, and VIPs protected.", icon: "shield-check" },
  { title: "Post Event Support", text: "Wrap reporting, supplier close-out, and lessons learned.", icon: "badge-check" },
];

const DEFAULT_WHY = [
  { title: "Professional Team", text: "Corporate-fluent planners who protect brand standards.", icon: "users" },
  { title: "International Standards", text: "Operations shaped for regional HQs and overseas partners.", icon: "globe" },
  { title: "Customized Solutions", text: "Every program is built around your brief — not a template.", icon: "sparkles" },
  { title: "Experienced Project Managers", text: "Single accountable leads from concept to close-out.", icon: "briefcase-business" },
  { title: "Reliable Partners", text: "Vetted venues, AV, transport, and production suppliers.", icon: "handshake" },
  { title: "24/7 Support", text: "Duty coverage when flights, weather, or guest needs shift.", icon: "headset" },
];

const PAGE_SECTION_ICONS = {
  meetings: "presentation",
  "incentive-travel": "trophy",
  "seminars-conferences": "mic",
  "corporate-group-travel": "bus",
  "team-building": "users",
  exhibitions: "store",
  "corporate-retreats": "trees",
  "event-management": "calendar-days",
  "gala-dinner": "utensils",
  "award-ceremonies": "award",
  "annual-company-parties": "party-popper",
  "product-launches": "rocket",
  "themed-events": "palette",
  "private-parties": "gem",
  "entertainment-production": "clapperboard",
};

const PROCESS_LEADS = {
  meetings: "From venue shortlist to day-of room management for corporate agendas.",
  "incentive-travel": "From reward concept to on-trip VIP hospitality and recognition.",
  "seminars-conferences": "From congress brief to registration, breakouts, and wrap reporting.",
  "corporate-group-travel": "From travel policy to flights, hotels, and group movements.",
  "team-building": "From HR outcomes to facilitated activities and rain-day contingencies.",
  exhibitions: "From booth brief to build, show-floor hospitality, and dismantle.",
  "corporate-retreats": "From resort shortlist to strategy blocks and wellness pacing.",
  "event-management": "From creative concept to production, guest flow, and close-out.",
  "gala-dinner": "From menu and décor brief to cue-perfect evening delivery.",
  "award-ceremonies": "From script and staging to winner cues and show calling.",
  "annual-company-parties": "From party concept to entertainment, F&B, and floor energy.",
  "product-launches": "From reveal storyboard to stage, press flow, and brand moments.",
  "themed-events": "From theme world to décor, casting, and immersive guest journey.",
  "private-parties": "From intimate brief to venue, dining, and white-glove hosting.",
  "entertainment-production": "From tech rider to rehearsals, cue sheets, and show call.",
};

const SERVICES_LEADS = {
  meetings: "Boardrooms, AV, and coordination shaped for decision-ready agendas.",
  "incentive-travel": "Reward pillars that balance wow-factor with operational control.",
  "seminars-conferences": "Congress-ready services for registration, breakouts, and speakers.",
  "corporate-group-travel": "Policy-aware travel logistics for corporate cohorts.",
  "team-building": "Facilitated formats that feel energizing and professionally run.",
  exhibitions: "Show-floor services from booth hospitality to freight timing.",
  "corporate-retreats": "Resort experiences that protect strategy time and restoration.",
  "event-management": "End-to-end pillars for destination corporate events.",
  "gala-dinner": "Dining, décor, and production elements for cinematic evenings.",
  "award-ceremonies": "Stage, script, and guest-flow capabilities for recognition nights.",
  "annual-company-parties": "Party formats built for culture, energy, and brand safety.",
  "product-launches": "Launch services that put the product — and press — center stage.",
  "themed-events": "Building blocks for immersive, on-brand theme worlds.",
  "private-parties": "Intimate celebration services with white-glove discretion.",
  "entertainment-production": "Stage, lighting, LED, and artist packages under one desk.",
};

function ico(name, size) {
  const cls = size === "lg" ? "dg-ts-ico dg-ts-ico--lg" : "dg-ts-ico";
  return `<span class="${cls}" aria-hidden="true"><i data-lucide="${esc(name)}" class="dg-lucide"></i></span>`;
}

function pickIcon(title, fallback = "sparkles") {
  const t = String(title || "").toLowerCase();
  if (/meeting|board|executive|agenda|coordinator/.test(t)) return "presentation";
  if (/seminar|conference|congress|speaker|mic/.test(t)) return "mic";
  if (/incentive|reward|recognition|motivation|trophy|achiever/.test(t)) return "trophy";
  if (/team.?build|engagement|outdoor|indoor|adventure|csr|leadership|facilitat/.test(t)) return "users";
  if (/exhibition|expo|booth|trade|show.?floor|freight/.test(t)) return "store";
  if (/retreat|wellness|spa|yoga|resort/.test(t)) return "trees";
  if (/gala|dinner|dining|catering|f&b|menu/.test(t)) return "utensils";
  if (/award|ceremony|winner/.test(t)) return "award";
  if (/party|celebration|annual/.test(t)) return "party-popper";
  if (/launch|product|reveal|press/.test(t)) return "rocket";
  if (/theme|décor|decor|immersive|palette/.test(t)) return "palette";
  if (/private|vip|intimate|white.?glove/.test(t)) return "gem";
  if (/production|stage|lighting|sound|led|band|performer|technical|av|audio|visual/.test(t)) return "clapperboard";
  if (/registration|badge|document/.test(t)) return "clipboard-list";
  if (/hotel|room|accommodation/.test(t)) return "hotel";
  if (/travel|flight|transfer|coach|bus|logistics|movement/.test(t)) return "bus";
  if (/group|corporate travel|policy/.test(t)) return "users";
  if (/support|24\/7|duty|care/.test(t)) return "headset";
  if (/partner|reliable|trusted|network/.test(t)) return "handshake";
  if (/international|global|standard/.test(t)) return "globe";
  if (/custom|tailor|solution|bespoke/.test(t)) return "sparkles";
  if (/project|manager|professional|team|staff/.test(t)) return "briefcase-business";
  if (/hybrid|tech|screen/.test(t)) return "monitor";
  if (/venue|event management|calendar/.test(t)) return "calendar-days";
  if (/luxury|premium/.test(t)) return "gem";
  if (/experience|tour|cultural/.test(t)) return "compass";
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
  meetings: {
    section: "MICE & Events",
    sectionHref: "mice/",
    title: "Meetings",
    sub: "Boardrooms, executive offsites, and business gatherings delivered with quiet precision.",
    hero: "partner",
    overviewTitle: "Meetings that run on time",
    overview: [
      "D&G Holiday plans corporate meetings across Thailand with venue intelligence, AV readiness, and on-site coordination that lets leadership focus on decisions — not logistics.",
      "From hotel meeting rooms to private board suites, we align facilities, catering, and guest flow to your agenda and corporate standards.",
    ],
    overviewImage: "dubai",
    servicesTitle: "Meeting capabilities",
    services: [
      { title: "Corporate & Board Meetings", text: "Secure rooms, discreet service, and timed agendas for decision-makers.", image: "europe", href: "mice/meetings/" },
      { title: "Executive Meetings", text: "VIP hosting, private dining, and seamless arrival-to-departure care.", image: "swiss", href: "mice/corporate-retreats/" },
      { title: "Hotel Meeting Rooms", text: "Sourced inventory with capacity, daylight, and breakout options matched to your brief.", image: "japan", href: "mice/seminars-conferences/" },
      { title: "Audio Visual Equipment", text: "Screens, microphones, hybrid links, and technician support on cue.", image: "korea", href: "events/entertainment-production/" },
      { title: "Meeting Support", text: "Registration, name badges, F&B breaks, and documentation packs.", image: "dest", href: "mice/corporate-group-travel/" },
      { title: "Professional Coordinators", text: "Dedicated floor managers who keep the room, agenda, and guests aligned.", image: "why", href: "mice/" },
    ],
    why: [
      { title: "Boardroom discretion", text: "Meeting managers who understand corporate protocol and discretion." },
      { title: "Hybrid-ready setups", text: "Setups that meet multinational briefing and hybrid-call expectations." },
      { title: "Agenda-led design", text: "Room layouts, F&B, and AV built around your exact agenda." },
      { title: "Single project lead", text: "One lead owns venue, suppliers, and day-of run-of-show." },
      { title: "Preferred hotel partners", text: "Preferred hotels and AV crews with proven corporate delivery." },
      { title: "Rapid agenda support", text: "Rapid response if agendas, attendees, or tech needs change." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["partner", "dubai", "europe", "swiss", "japan"],
    galleryTitle: "Corporate meeting atmospheres",
    faqs: [
      { q: "Can you arrange hybrid meeting setups?", a: "Yes. We coordinate cameras, mics, screens, and connectivity testing so remote executives join cleanly." },
      { q: "Do you provide bilingual meeting coordinators?", a: "English and Thai coordinators are standard; additional languages can be arranged by request." },
      { q: "How early should venues be booked?", a: "Peak weeks benefit from 4–8 weeks’ notice; we also support shorter lead times when inventory allows." },
      { q: "Can you handle confidential board meetings?", a: "We select discreet venues, limited staff access, and private dining options for sensitive agendas." },
      { q: "Is AV included in every proposal?", a: "AV is scoped to your agenda — from basic projection to full hybrid kits with technicians." },
      { q: "Do you manage hotel room blocks for attendees?", a: "Yes. We can negotiate room blocks and coordinate check-in support alongside the meeting." },
    ],
    related: [
      { title: "Seminars & Conferences", text: "Larger programs with registration and breakouts.", href: "mice/seminars-conferences/", image: "korea" },
      { title: "Corporate Retreats", text: "Strategy days in resort settings.", href: "mice/corporate-retreats/", image: "swiss" },
      { title: "Entertainment & Production", text: "Stage and AV when meetings expand into shows.", href: "events/entertainment-production/", image: "egypt" },
    ],
    ctaTitle: "Ready to brief your next meeting?",
    ctaText: "Share dates, headcount, and agenda priorities — we will return a venue-ready proposal.",
  },

  "incentive-travel": {
    section: "MICE & Events",
    sectionHref: "mice/",
    title: "Incentive Travel",
    sub: "Reward programs that feel exclusive — destination experiences with VIP hospitality.",
    hero: "dubai",
    overviewTitle: "Motivation through memorable destinations",
    overview: [
      "Incentive travel from D&G Holiday turns corporate recognition into journeys people talk about for years — luxury stays, curated experiences, and evening moments that elevate brand culture.",
      "We design reward programs for sales teams, partners, and top performers with clear budgeting, VIP service standards, and destination storytelling across Thailand and beyond.",
    ],
    overviewImage: "swiss",
    servicesTitle: "Incentive program pillars",
    services: [
      { title: "Reward Programs", text: "Tiered itineraries that match achievement levels and budget bands.", image: "japan", href: "mice/incentive-travel/" },
      { title: "Employee Motivation", text: "Experiences designed to energize teams and reinforce company values.", image: "korea", href: "mice/team-building/" },
      { title: "Luxury Travel", text: "Premium hotels, private transfers, and elevated dining throughout.", image: "europe", href: "travel-services/luxury-travel/" },
      { title: "Team Experiences", text: "Shared adventures, cultural immersions, and celebration nights.", image: "dest", href: "mice/team-building/" },
      { title: "VIP Service", text: "Meet & greet, hospitality desks, and white-glove guest care.", image: "partner", href: "mice/corporate-group-travel/" },
      { title: "Corporate Recognition", text: "Award moments, gifting, and branded touchpoints woven into the trip.", image: "egypt", href: "events/award-ceremonies/" },
    ],
    why: [
      { title: "Incentive specialists", text: "Incentive specialists who balance wow-factor with operational control." },
      { title: "HR-ready compliance", text: "Programs that satisfy global HR and compliance expectations." },
      { title: "Tailored reward themes", text: "Themes and destinations tailored to your achiever profile." },
      { title: "End-to-end ownership", text: "End-to-end ownership from concept film to farewell gift." },
      { title: "Luxury supplier network", text: "Luxury hotels, yachts, and exclusive venues with proven delivery." },
      { title: "On-trip duty managers", text: "On-trip duty managers for every flight delay or guest request." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["dubai", "swiss", "japan", "europe", "egypt"],
    galleryTitle: "Incentive journeys in focus",
    faqs: [
      { q: "What group sizes work best for incentives?", a: "We deliver polished programs from intimate VIP groups to large achiever cohorts with multi-hotel logistics." },
      { q: "Can incentives include gala dinners?", a: "Yes — recognition nights, gifting, and entertainment are frequently integrated into incentive itineraries." },
      { q: "Do you support multi-destination incentives?", a: "Thailand circuits and regional add-ons can be planned with realistic pacing and flight coordination." },
      { q: "How do you manage budgets transparently?", a: "Proposals itemize hotels, experiences, F&B, and production so finance teams can approve with clarity." },
      { q: "Can branding appear throughout the trip?", a: "Welcome amenities, photo moments, and stage design can carry your corporate identity tastefully." },
      { q: "Is travel insurance arranged for participants?", a: "We advise and can arrange group insurance support as part of the program package." },
    ],
    related: [
      { title: "Team Building", text: "Engagement activities that complement reward travel.", href: "mice/team-building/", image: "korea" },
      { title: "Gala Dinner", text: "Celebration nights with production polish.", href: "events/gala-dinner/", image: "egypt" },
      { title: "Corporate Group Travel", text: "Business travel logistics for larger cohorts.", href: "mice/corporate-group-travel/", image: "partner" },
    ],
    ctaTitle: "Ready to reward your top performers?",
    ctaText: "Tell us your achiever profile, dates, and destination preference — we will craft an incentive proposal.",
  },

  "seminars-conferences": {
    section: "MICE & Events",
    sectionHref: "mice/",
    title: "Seminars & Conferences",
    sub: "Full-scale conference planning — venues, registration, AV, speakers, and delegate care.",
    hero: "korea",
    overviewTitle: "Conferences with operational discipline",
    overview: [
      "D&G Holiday delivers seminars and conferences with the structure multinational organizers expect: venue strategy, registration flow, simultaneous translation options, and precise speaker logistics.",
      "Whether association congresses or internal leadership forums, we protect the agenda, the brand, and the delegate experience from first registration to closing session.",
    ],
    overviewImage: "europe",
    servicesTitle: "Conference services",
    services: [
      { title: "Conference Planning", text: "Master schedules, breakout maps, and supplier orchestration.", image: "partner", href: "mice/seminars-conferences/" },
      { title: "Registration", text: "Badge systems, check-in desks, and attendee flow design.", image: "dubai", href: "mice/meetings/" },
      { title: "Venue Selection", text: "Hotels and centers matched to capacity, AV, and exhibition needs.", image: "japan", href: "mice/exhibitions/" },
      { title: "AV Equipment", text: "Main hall, breakout, and recording kits with technical crews.", image: "egypt", href: "events/entertainment-production/" },
      { title: "Simultaneous Translation", text: "Booths, headsets, and interpreter coordination when required.", image: "swiss", href: "mice/meetings/" },
      { title: "Speaker Management", text: "Travel, green rooms, cue sheets, and rehearsal support.", image: "dest", href: "events/product-launches/" },
    ],
    why: [
      { title: "Multi-track fluency", text: "Conference leads experienced with multi-track agendas." },
      { title: "Delegate-first flow", text: "Registration and rooming that keep large audiences moving." },
      { title: "Speaker-ready AV", text: "Stages and breakouts scoped to speaker and hybrid needs." },
      { title: "One congress lead", text: "A single owner across venue, AV, and delegate logistics." },
      { title: "Proven venue network", text: "Hotels and centers proven for association and corporate congresses." },
      { title: "Show-week coverage", text: "Duty support across build, open, and wrap days." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["korea", "europe", "partner", "japan", "dubai"],
    galleryTitle: "Conference & seminar settings",
    faqs: [
      { q: "Can you support multi-day conferences?", a: "Yes. We manage room blocks, daily agendas, catering cycles, and overnight production resets." },
      { q: "Do you handle sponsor exhibition zones?", a: "We plan booth layouts, power, and visitor flow as part of the conference footprint." },
      { q: "Is simultaneous translation available?", a: "We can arrange interpreters, booths, and headset distribution for key languages." },
      { q: "How do you manage speaker travel?", a: "Airport transfers, hotel rooms, green rooms, and rehearsal slots are coordinated with the run-of-show." },
      { q: "Can sessions be hybrid or recorded?", a: "Streaming and recording packages can be scoped with your AV requirements." },
      { q: "What about dietary and accessibility needs?", a: "We collect requirements early and brief venues for inclusive service standards." },
    ],
    related: [
      { title: "Meetings", text: "Smaller executive formats with boardroom focus.", href: "mice/meetings/", image: "partner" },
      { title: "Exhibitions", text: "Trade-show and booth production support.", href: "mice/exhibitions/", image: "dubai" },
      { title: "Product Launches", text: "Media-facing unveil moments.", href: "events/product-launches/", image: "egypt" },
    ],
    ctaTitle: "Ready to plan your conference?",
    ctaText: "Share delegate numbers, dates, and session structure — we will propose venues and operations.",
  },

  "corporate-group-travel": {
    section: "MICE & Events",
    sectionHref: "mice/",
    title: "Corporate Group Travel",
    sub: "Business trips and company movements with clear reporting, duty of care, and polished hospitality.",
    hero: "japan",
    overviewTitle: "Corporate travel that stays on policy",
    overview: [
      "D&G Holiday manages corporate group travel for study tours, leadership visits, and company trips — flights coordination support, hotels, transport, and documentation that finance teams can trust.",
      "We balance efficiency with executive comfort so groups move smoothly across Thailand while your travel policy and reporting needs remain intact.",
    ],
    overviewImage: "dest",
    servicesTitle: "Group travel services",
    services: [
      { title: "Business Travel", text: "Itineraries built for meetings, site visits, and partner calls.", image: "partner", href: "mice/corporate-group-travel/" },
      { title: "Company Trips", text: "Staff journeys that mix purpose, culture, and controlled leisure.", image: "korea", href: "mice/incentive-travel/" },
      { title: "Executive Travel", text: "VIP cars, preferred hotels, and discreet scheduling support.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Corporate Transportation", text: "Coaches, vans, and private cars timed to agendas.", image: "dubai", href: "travel-services/transportation-transfers/" },
      { title: "Hotel Booking", text: "Room blocks with corporate rates and invoice clarity.", image: "europe", href: "travel-services/hotel-reservations/" },
      { title: "Travel Management", text: "Manifests, duty-of-care contacts, and change management.", image: "egypt", href: "mice/meetings/" },
    ],
    why: [
      { title: "Policy-fluent desks", text: "Corporate travel desks fluent in policy and guest care." },
      { title: "Finance-ready docs", text: "Documentation and supplier controls suited to global firms." },
      { title: "Purpose-built routes", text: "Routes and hotels matched to purpose — not leisure templates." },
      { title: "Manifest ownership", text: "One owner for manifests, changes, and on-ground issues." },
      { title: "Corporate fleets", text: "Hotels and transport fleets with corporate track records." },
      { title: "Duty-of-care phone", text: "Duty phone for delayed flights and urgent rebookings." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["japan", "dest", "partner", "korea", "dubai"],
    galleryTitle: "Corporate movement & hospitality",
    faqs: [
      { q: "Can you work within our travel policy?", a: "Yes. We align hotel classes, transport types, and approvals with your company guidelines." },
      { q: "Do you provide consolidated invoicing?", a: "We structure billing packages that simplify finance reconciliation for group movements." },
      { q: "How do you handle last-minute changes?", a: "A project manager tracks manifests and executes rebookings with supplier partners quickly." },
      { q: "Is multi-city Thailand travel supported?", a: "Bangkok, resorts, and secondary cities can be linked with realistic buffers and ground plans." },
      { q: "Can executives travel separately from the group?", a: "VIP tracks can run alongside main group logistics when needed." },
      { q: "Do you arrange visas for corporate visitors?", a: "We provide guidance and can coordinate with our visa support desk." },
    ],
    related: [
      { title: "Meetings", text: "On-ground meeting support during company visits.", href: "mice/meetings/", image: "partner" },
      { title: "Incentive Travel", text: "Reward-focused journeys for top teams.", href: "mice/incentive-travel/", image: "dubai" },
      { title: "Transportation & Transfers", text: "Airport and hotel transfer fleets.", href: "travel-services/transportation-transfers/", image: "korea" },
    ],
    ctaTitle: "Ready to move your corporate group?",
    ctaText: "Send traveler counts, cities, and travel policy notes — we will prepare a management proposal.",
  },

  "team-building": {
    section: "MICE & Events",
    sectionHref: "mice/",
    title: "Team Building",
    sub: "Outdoor, indoor, adventure, and CSR programs that strengthen leadership and engagement.",
    hero: "dest",
    overviewTitle: "Engagement with purpose",
    overview: [
      "D&G Holiday designs team-building programs that feel energizing without looking amateur. Activities are facilitated, branded, and paced for corporate cultures that expect both fun and professionalism.",
      "From beach Olympics to leadership challenges and CSR volunteering, we align outcomes with your HR and L&D goals while keeping logistics invisible.",
    ],
    overviewImage: "korea",
    servicesTitle: "Team building formats",
    services: [
      { title: "Outdoor Activities", text: "Beach, park, and resort challenges with full safety briefings.", image: "dubai", href: "mice/team-building/" },
      { title: "Indoor Activities", text: "Hotel ballroom games, creative labs, and problem-solving formats.", image: "partner", href: "mice/meetings/" },
      { title: "Adventure", text: "Guided adventure modules for teams seeking higher energy.", image: "japan", href: "mice/corporate-retreats/" },
      { title: "CSR Programs", text: "Community and environmental projects with meaningful impact.", image: "europe", href: "mice/incentive-travel/" },
      { title: "Leadership & Communication", text: "Facilitated exercises that surface collaboration skills.", image: "swiss", href: "mice/corporate-retreats/" },
      { title: "Employee Engagement", text: "Celebration wrap-ups that reinforce culture and recognition.", image: "egypt", href: "events/annual-company-parties/" },
    ],
    why: [
      { title: "Facilitator-led energy", text: "Facilitators and producers who keep energy high and timing tight." },
      { title: "Inclusive safety briefings", text: "Safety briefings and inclusive formats for diverse teams." },
      { title: "Culture-matched activities", text: "Activities matched to culture, language, and physical comfort." },
      { title: "Site-survey discipline", text: "Site surveys, equipment, and run-of-show under one lead." },
      { title: "Vetted activity partners", text: "Activity suppliers and venues vetted for corporate groups." },
      { title: "Weather-ready pivots", text: "Weather contingencies and rapid program pivots when needed." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["dest", "korea", "dubai", "japan", "swiss"],
    galleryTitle: "Team energy & destination settings",
    faqs: [
      { q: "What group sizes can you facilitate?", a: "From compact leadership teams to large company cohorts with multi-station formats." },
      { q: "Can activities be bilingual?", a: "English and Thai facilitation are common; other languages can be arranged." },
      { q: "Do you offer indoor options for rainy days?", a: "Yes — every outdoor brief includes a polished indoor contingency." },
      { q: "Can branding appear on equipment and props?", a: "Banners, team kits, and photo backdrops can carry your identity." },
      { q: "Are CSR programs available near Bangkok resorts?", a: "We design CSR modules that fit destination schedules without long dead time." },
      { q: "How physically demanding are the activities?", a: "We scale intensity from gentle icebreakers to adventure challenges based on your brief." },
    ],
    related: [
      { title: "Corporate Retreats", text: "Strategy plus wellness in resort settings.", href: "mice/corporate-retreats/", image: "swiss" },
      { title: "Incentive Travel", text: "Reward journeys that pair with engagement days.", href: "mice/incentive-travel/", image: "dubai" },
      { title: "Annual Company Parties", text: "Celebration nights after team days.", href: "events/annual-company-parties/", image: "egypt" },
    ],
    ctaTitle: "Ready to energize your team?",
    ctaText: "Share headcount, location preference, and outcomes — we will design a facilitation-ready proposal.",
  },

  exhibitions: {
    section: "MICE & Events",
    sectionHref: "mice/",
    title: "Exhibitions",
    sub: "Trade shows and expo support — booths, logistics, registration, and on-floor hospitality.",
    hero: "egypt",
    overviewTitle: "Exhibition presence under control",
    overview: [
      "D&G Holiday supports exhibitors and organizers with booth coordination, freight guidance, staffing hospitality, and side-event planning that keeps your brand sharp on the show floor.",
      "From trade expos to public exhibitions, we connect venue rules, production partners, and guest experience into one accountable delivery plan.",
    ],
    overviewImage: "dubai",
    servicesTitle: "Exhibition services",
    services: [
      { title: "Trade Shows & Expo", text: "Exhibitor support across major Thailand venues and circuits.", image: "korea", href: "mice/exhibitions/" },
      { title: "Exhibition Booth", text: "Build coordination, power, and visitor-facing hospitality.", image: "partner", href: "events/product-launches/" },
      { title: "Venue Management", text: "Floor plans, load-in windows, and compliance with venue rules.", image: "japan", href: "mice/seminars-conferences/" },
      { title: "Registration", text: "Badge desks and visitor flow for hosted events.", image: "europe", href: "mice/meetings/" },
      { title: "Logistics", text: "Freight guidance, storage, and timed material movements.", image: "dest", href: "mice/corporate-group-travel/" },
      { title: "Production", text: "Lighting, screens, and demo zones that sell your story.", image: "swiss", href: "events/entertainment-production/" },
    ],
    why: [
      { title: "Show-floor managers", text: "Show-floor managers who keep build and dismantle on schedule." },
      { title: "Exhibitor standards", text: "Practices aligned with global exhibitor expectations." },
      { title: "Brand-led booth care", text: "Booth hospitality tailored to your brand and product demos." },
      { title: "Venue liaison lead", text: "One lead for suppliers, venue liaison, and VIP guests." },
      { title: "Expo-proven crews", text: "Builders, AV, and logistics vendors with expo experience." },
      { title: "Build-night coverage", text: "Coverage across build nights and show open hours." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["egypt", "dubai", "korea", "partner", "japan"],
    galleryTitle: "Show-floor & brand presence",
    faqs: [
      { q: "Do you build booths yourselves?", a: "We coordinate trusted build partners and manage timelines, approvals, and on-site quality." },
      { q: "Can you staff the booth with hosts?", a: "Hospitality staff and interpreters can be arranged to match your brand tone." },
      { q: "How do you handle freight and storage?", a: "We advise on freight windows and coordinate storage options with venue rules." },
      { q: "Can side events be planned during an expo?", a: "Yes — dinners, press moments, and private demos can run alongside show days." },
      { q: "Do you support multi-city exhibition tours?", a: "We can sequence venues and logistics when your show circuit spans destinations." },
      { q: "Is AV for product demos included?", a: "Demo AV is scoped in the proposal based on your product storytelling needs." },
    ],
    related: [
      { title: "Product Launches", text: "High-impact unveil events beyond the booth.", href: "events/product-launches/", image: "egypt" },
      { title: "Seminars & Conferences", text: "Associated congress and seminar support.", href: "mice/seminars-conferences/", image: "korea" },
      { title: "Entertainment & Production", text: "Technical production for branded zones.", href: "events/entertainment-production/", image: "swiss" },
    ],
    ctaTitle: "Ready to elevate your exhibition?",
    ctaText: "Share show dates, booth size, and brand goals — we will return a production-ready plan.",
  },

  "corporate-retreats": {
    section: "MICE & Events",
    sectionHref: "mice/",
    title: "Corporate Retreats",
    sub: "Leadership and company retreats that balance strategy sessions with wellness and luxury resorts.",
    hero: "swiss",
    overviewTitle: "Retreats where strategy meets restoration",
    overview: [
      "D&G Holiday crafts corporate retreats that give leadership space to think — private resorts, clear meeting blocks, and curated downtime that resets teams without losing focus.",
      "From executive strategy retreats to company-wide getaways, we protect confidentiality, wellness pacing, and destination quality worthy of your brand.",
    ],
    overviewImage: "japan",
    servicesTitle: "Retreat experiences",
    services: [
      { title: "Leadership Retreat", text: "Private venues and facilitated sessions for senior teams.", image: "europe", href: "mice/corporate-retreats/" },
      { title: "Executive Retreat", text: "VIP villas, discreet service, and premium dining.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Company Retreat", text: "Scalable resort programs for broader employee cohorts.", image: "korea", href: "mice/team-building/" },
      { title: "Wellness", text: "Spa, yoga, and recovery modules woven into the agenda.", image: "dest", href: "mice/incentive-travel/" },
      { title: "Strategy Meeting", text: "Boardroom-quality spaces inside resort environments.", image: "partner", href: "mice/meetings/" },
      { title: "Luxury Resort", text: "Handpicked properties with privacy and polished F&B.", image: "egypt", href: "travel-services/hotel-reservations/" },
    ],
    why: [
      { title: "Agenda-wellness balance", text: "Retreat planners who balance agenda intensity with recovery." },
      { title: "Confidential settings", text: "Private resorts and villas suited to leadership discussions." },
      { title: "Resort-led strategy days", text: "Meeting blocks designed inside restorative destinations." },
      { title: "One retreat owner", text: "A single lead for hotels, sessions, and wellness modules." },
      { title: "Handpicked resorts", text: "Properties selected for privacy, F&B, and meeting quality." },
      { title: "Quiet-duty support", text: "Discreet on-site support when schedules or guests shift." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["swiss", "japan", "europe", "dest", "dubai"],
    galleryTitle: "Retreat destinations & calm spaces",
    faqs: [
      { q: "Which destinations work best for retreats?", a: "Hua Hin, Phuket, Chiang Mai, and exclusive villa clusters are frequent choices — we match privacy to group size." },
      { q: "Can strategy sessions and wellness share one day?", a: "Yes. We design agendas with focused mornings and restorative afternoons." },
      { q: "Do you provide facilitators?", a: "We can recommend facilitators or work with your internal L&D team." },
      { q: "Are private villas available for executive groups?", a: "Villa and exclusive-use options are sourced when confidentiality is essential." },
      { q: "Can spouses join certain segments?", a: "Companion programs can be planned as optional leisure tracks." },
      { q: "How far in advance should we book?", a: "Peak resort seasons benefit from 8–12 weeks’ lead time for preferred properties." },
    ],
    related: [
      { title: "Meetings", text: "Boardroom formats when retreats stay city-based.", href: "mice/meetings/", image: "partner" },
      { title: "Team Building", text: "Engagement modules inside retreat agendas.", href: "mice/team-building/", image: "korea" },
      { title: "Private Parties", text: "Intimate celebration nights for leadership.", href: "events/private-parties/", image: "egypt" },
    ],
    ctaTitle: "Ready to plan your corporate retreat?",
    ctaText: "Share team size, outcomes, and preferred region — we will propose retreat properties and agendas.",
  },

  "event-management": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Event Management",
    sub: "Corporate and private events — planning, production, logistics, entertainment, and venues under one desk.",
    hero: "egypt",
    overviewTitle: "Destination events with luxury discipline",
    overview: [
      "D&G Holiday’s event management desk delivers corporate galas, product launches, award nights, and private celebrations with the same operational rigor as our MICE programs.",
      "From creative concept to technical production and guest logistics, we give brands a single partner for polished destination events across Thailand.",
    ],
    overviewImage: "partner",
    servicesTitle: "Event management pillars",
    services: [
      { title: "Corporate Events", text: "Brand-led evenings with precise guest flow and production.", image: "dubai", href: "events/gala-dinner/" },
      { title: "Private Events", text: "VIP celebrations with discretion and elevated hospitality.", image: "swiss", href: "events/private-parties/" },
      { title: "Planning", text: "Concept, budgeting, timelines, and stakeholder alignment.", image: "japan", href: "events/" },
      { title: "Production", text: "Stage, lighting, sound, and LED storytelling.", image: "korea", href: "events/entertainment-production/" },
      { title: "Logistics", text: "Transport, registration, and VIP protocols.", image: "dest", href: "mice/corporate-group-travel/" },
      { title: "Entertainment & Venue", text: "Artists, MCs, and venues matched to your brief.", image: "europe", href: "events/themed-events/" },
    ],
    why: DEFAULT_WHY,
    process: DEFAULT_PROCESS,
    gallery: ["egypt", "partner", "dubai", "korea", "swiss"],
    galleryTitle: "Corporate event atmospheres",
    faqs: [
      { q: "What event types do you produce?", a: "Gala dinners, awards, company parties, product launches, themed nights, private parties, and full entertainment production." },
      { q: "Can you work with our creative agency?", a: "Yes. We integrate agency concepts with venue, technical, and hospitality delivery." },
      { q: "Do you cover venues nationwide?", a: "Bangkok and major leisure destinations are core; we expand with destination partners as needed." },
      { q: "How do proposals handle budgets?", a: "We present clear option tiers so marketing and finance can approve with confidence." },
      { q: "Is on-site management included?", a: "Dedicated event managers and floor teams are standard for show days." },
      { q: "Can events include MICE components?", a: "Meetings, incentives, and travel logistics can be combined under one accountable plan." },
    ],
    related: [
      { title: "Gala Dinner", text: "Luxury dinners with entertainment.", href: "events/gala-dinner/", image: "dubai" },
      { title: "Product Launches", text: "Media-ready brand unveil moments.", href: "events/product-launches/", image: "egypt" },
      { title: "Meetings", text: "Daytime corporate meeting support.", href: "mice/meetings/", image: "partner" },
    ],
    ctaTitle: "Ready to organize your next event?",
    ctaText: "Brief us on date, guest profile, and creative direction — we will prepare a full event proposal.",
  },

  "gala-dinner": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Gala Dinner",
    sub: "Luxury galas and VIP dinners with décor, entertainment, and production timed to the minute.",
    hero: "dubai",
    overviewTitle: "Gala evenings that feel cinematic",
    overview: [
      "D&G Holiday produces gala dinners where guest arrival, dining, awards, and entertainment unfold as one seamless narrative — never a sequence of disconnected suppliers.",
      "Ideal for corporate celebrations, partner nights, and VIP hospitality, our galas combine venue styling, culinary direction, and show production at luxury DMC standard.",
    ],
    overviewImage: "egypt",
    servicesTitle: "Gala dinner elements",
    services: [
      { title: "Luxury Gala", text: "Full evening concepts with premium venues and service.", image: "swiss", href: "events/gala-dinner/" },
      { title: "Awards Night", text: "Cue-perfect recognition segments within the dinner flow.", image: "korea", href: "events/award-ceremonies/" },
      { title: "VIP Dinner", text: "Intimate high-touch dining for executives and partners.", image: "europe", href: "events/private-parties/" },
      { title: "Entertainment", text: "MC, live acts, and cultural performances on brief.", image: "japan", href: "events/entertainment-production/" },
      { title: "Decoration", text: "Tablescapes, florals, and entrance experiences.", image: "dest", href: "events/themed-events/" },
      { title: "Production", text: "Lighting, sound, and stage direction for the full night.", image: "partner", href: "events/entertainment-production/" },
    ],
    why: [
      { title: "Professional Team", text: "Event directors who protect guest experience and timing." },
      { title: "International Standards", text: "Service and staging suited to multinational audiences." },
      { title: "Customized Solutions", text: "Themes and menus built around your brand story." },
      { title: "Experienced Project Managers", text: "Run-of-show ownership from load-in to farewell." },
      { title: "Reliable Partners", text: "Chefs, florists, and production houses with gala pedigree." },
      { title: "24/7 Support", text: "Show-call readiness for last-minute VIP changes." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["dubai", "egypt", "swiss", "korea", "europe"],
    galleryTitle: "Gala dining & evening light",
    faqs: [
      { q: "What guest counts do galas typically host?", a: "From intimate VIP dinners to ballroom galas of several hundred — scaled with the right venue." },
      { q: "Can dietary requirements be managed at scale?", a: "Yes. We brief kitchens early for vegetarian, Jain, halal, and allergy needs." },
      { q: "Do you provide MCs and entertainment?", a: "We cast MCs and acts to match language, tone, and brand guidelines." },
      { q: "Is award presentation support included?", a: "Trophy logistics, cue sheets, and stage management can be integrated into the dinner." },
      { q: "Can you theme the entire ballroom?", a: "Décor, lighting, and entrance design can transform the space to your concept." },
      { q: "How do you handle VIP seating?", a: "We design seating plans and floor management for protocol and networking goals." },
    ],
    related: [
      { title: "Award Ceremonies", text: "Recognition-focused stage productions.", href: "events/award-ceremonies/", image: "korea" },
      { title: "Entertainment & Production", text: "Technical show packages.", href: "events/entertainment-production/", image: "partner" },
      { title: "Themed Events", text: "Immersive décor and storytelling nights.", href: "events/themed-events/", image: "dest" },
    ],
    ctaTitle: "Ready to host a luxury gala?",
    ctaText: "Share date, guest count, and celebration goal — we will design a gala proposal.",
  },

  "award-ceremonies": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Award Ceremonies",
    sub: "Corporate recognition nights with stage design, precise cueing, entertainment, and media moments.",
    hero: "korea",
    overviewTitle: "Recognition events with flawless cues",
    overview: [
      "Award ceremonies demand timing discipline. D&G Holiday builds stage direction, lighting, trophy logistics, and VIP seating so every recognition moment lands with dignity and energy.",
      "Whether paired with a gala dinner or staged as a standalone night, we protect photography moments, entertainment arcs, and brand presentation quality.",
    ],
    overviewImage: "egypt",
    servicesTitle: "Ceremony capabilities",
    services: [
      { title: "Corporate Awards", text: "Category structures and stage scripts for company recognition.", image: "dubai", href: "events/award-ceremonies/" },
      { title: "Recognition Events", text: "Partner and employee nights that feel elevated, not routine.", image: "japan", href: "events/gala-dinner/" },
      { title: "Stage Design", text: "Looks that frame winners and brand messaging clearly.", image: "partner", href: "events/entertainment-production/" },
      { title: "Production", text: "Lighting, sound, LED, and cue-to-cue show calling.", image: "swiss", href: "events/entertainment-production/" },
      { title: "Entertainment", text: "Acts and MCs that lift energy between award blocks.", image: "europe", href: "events/themed-events/" },
      { title: "Photography", text: "Winner moments, VIP coverage, and media-ready assets.", image: "dest", href: "events/product-launches/" },
    ],
    why: [
      { title: "Professional Team", text: "Show callers experienced with multi-category award nights." },
      { title: "International Standards", text: "Protocols for multinational winners and executives." },
      { title: "Customized Solutions", text: "Scripts and stage looks tailored to your brand voice." },
      { title: "Experienced Project Managers", text: "Trophy, AV, and seating owned under one timeline." },
      { title: "Reliable Partners", text: "Production and photo teams proven on corporate stages." },
      { title: "24/7 Support", text: "Rehearsal and show-night coverage for last-minute changes." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["korea", "egypt", "dubai", "partner", "japan"],
    galleryTitle: "Stage light & recognition nights",
    faqs: [
      { q: "How do you prevent award segment delays?", a: "Detailed cue sheets, rehearsals, and floor managers keep presenters and winners on time." },
      { q: "Can trophies and certificates be managed on site?", a: "Yes — we coordinate storage, handoff points, and winner escorts." },
      { q: "Do you support bilingual ceremonies?", a: "Scripts and MCs can run in English and Thai, with other languages on request." },
      { q: "Is LED content production available?", a: "We can brief content partners or integrate your agency assets into the stage system." },
      { q: "Can the ceremony include a dinner?", a: "Many clients combine awards with a gala dinner under one run-of-show." },
      { q: "What about winner photography?", a: "Dedicated photo moments and media backdrops can be built into the flow." },
    ],
    related: [
      { title: "Gala Dinner", text: "Dining frameworks for award nights.", href: "events/gala-dinner/", image: "dubai" },
      { title: "Annual Company Parties", text: "Festive recognition inside year-end parties.", href: "events/annual-company-parties/", image: "japan" },
      { title: "Entertainment & Production", text: "Full technical show packages.", href: "events/entertainment-production/", image: "partner" },
    ],
    ctaTitle: "Ready to stage your awards night?",
    ctaText: "Tell us categories, guest count, and venue preference — we will propose a ceremony plan.",
  },

  "annual-company-parties": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Annual Company Parties",
    sub: "Year-end and staff celebrations with themes, entertainment, and production that feel festive and well-run.",
    hero: "japan",
    overviewTitle: "Company parties with control",
    overview: [
      "Annual parties should feel joyful without sliding into chaos. D&G Holiday designs year-end and festival celebrations with clear guest flow, themed décor, and entertainment that keeps large teams engaged.",
      "From staff parties to anniversary festivals, we deliver production, dining, and games that match your culture while protecting safety and timing.",
    ],
    overviewImage: "korea",
    servicesTitle: "Party formats",
    services: [
      { title: "Year End Party", text: "Flagship celebrations with awards, dining, and dance floors.", image: "dubai", href: "events/annual-company-parties/" },
      { title: "Staff Party", text: "Inclusive formats sized for whole-company attendance.", image: "dest", href: "events/themed-events/" },
      { title: "Festival Party", text: "Seasonal themes with cultural entertainment options.", image: "egypt", href: "events/themed-events/" },
      { title: "Theme Party", text: "Immersive looks that photograph beautifully for internal media.", image: "europe", href: "events/themed-events/" },
      { title: "Entertainment", text: "Bands, DJs, games, and MCs matched to your workforce.", image: "swiss", href: "events/entertainment-production/" },
      { title: "Production", text: "Lighting, sound, and stage packages for large rooms.", image: "partner", href: "events/entertainment-production/" },
    ],
    why: [
      { title: "Professional Team", text: "Producers who keep large parties safe, timed, and fun." },
      { title: "International Standards", text: "Inclusive experiences for multicultural workforces." },
      { title: "Customized Solutions", text: "Themes and games built around your company culture." },
      { title: "Experienced Project Managers", text: "One lead for venue, F&B, and entertainment suppliers." },
      { title: "Reliable Partners", text: "Artists and technical crews used to corporate volumes." },
      { title: "24/7 Support", text: "Show-night coverage for crowd and schedule shifts." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["japan", "korea", "dubai", "dest", "egypt"],
    galleryTitle: "Celebration energy & party settings",
    faqs: [
      { q: "How large a party can you manage?", a: "From boutique staff nights to multi-hundred ballroom parties with zoned entertainment." },
      { q: "Can alcohol service be controlled?", a: "We work with venues on responsible service plans and VIP protocols." },
      { q: "Do you include games and lucky draws?", a: "Yes — game hosts, prize logistics, and draw systems can be integrated." },
      { q: "Are family-friendly formats available?", a: "Daytime or early-evening formats can be designed when families join." },
      { q: "Can transportation be arranged for staff?", a: "Coach movements and hotel transfers can be part of the party logistics." },
      { q: "How early should year-end venues be booked?", a: "November–December venues book early — 3–6 months’ notice is ideal." },
    ],
    related: [
      { title: "Themed Events", text: "Deeper immersive décor concepts.", href: "events/themed-events/", image: "europe" },
      { title: "Award Ceremonies", text: "Recognition blocks inside the party.", href: "events/award-ceremonies/", image: "korea" },
      { title: "Team Building", text: "Daytime engagement before the party night.", href: "mice/team-building/", image: "dest" },
    ],
    ctaTitle: "Ready to plan your company party?",
    ctaText: "Share headcount, date window, and theme ideas — we will propose a celebration package.",
  },

  "product-launches": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Product Launches",
    sub: "Brand launches, press conferences, and influencer showcases with cinematic staging.",
    hero: "europe",
    overviewTitle: "Launches that put product first",
    overview: [
      "D&G Holiday produces product launches where media, influencers, and partners experience your brand with clarity — demo zones, press moments, and hospitality that support the story.",
      "From unveil reveals to after-parties, we align creative direction with technical production so the product — not the logistics — remains the hero.",
    ],
    overviewImage: "dubai",
    servicesTitle: "Launch services",
    services: [
      { title: "Brand Launch", text: "Full creative and operational frameworks for unveil nights.", image: "egypt", href: "events/product-launches/" },
      { title: "Media Event", text: "Press flows, interview corners, and media kits support.", image: "korea", href: "events/award-ceremonies/" },
      { title: "Press Conference", text: "Stage, AV, and seating for official announcements.", image: "partner", href: "mice/seminars-conferences/" },
      { title: "Showcase", text: "Demo stations and sampling journeys for guests.", image: "japan", href: "mice/exhibitions/" },
      { title: "Presentation", text: "Speaker coaching cues and slide-to-stage integration.", image: "swiss", href: "mice/meetings/" },
      { title: "Influencer Event", text: "Content-friendly sets and hosting for creator guests.", image: "dest", href: "events/themed-events/" },
    ],
    why: [
      { title: "Professional Team", text: "Launch producers who protect brand messaging and guest flow." },
      { title: "International Standards", text: "Media protocols suitable for regional unveil campaigns." },
      { title: "Customized Solutions", text: "Sets and demos designed around your product story." },
      { title: "Experienced Project Managers", text: "Agency, venue, and technical partners under one timeline." },
      { title: "Reliable Partners", text: "AV and fabrication teams used to brand-critical moments." },
      { title: "24/7 Support", text: "Rehearsal-to-show coverage for last-minute creative changes." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["europe", "dubai", "egypt", "korea", "japan"],
    galleryTitle: "Launch stages & brand moments",
    faqs: [
      { q: "Can you work from our agency’s creative deck?", a: "Yes. We translate creative into venue, technical, and hospitality delivery." },
      { q: "Do you arrange influencer hospitality?", a: "Invitations support, gift logistics, and content corners can be included." },
      { q: "Is a press conference format available?", a: "We stage official announcement formats with AV and seating plans." },
      { q: "Can product demos be interactive?", a: "Demo zones with power, staffing, and crowd control are commonly designed." },
      { q: "Do launches include after-parties?", a: "Optional after-parties can extend the night with a separate mood and guest list." },
      { q: "How do you protect embargo timing?", a: "We brief teams on access control and media timing when confidentiality matters." },
    ],
    related: [
      { title: "Exhibitions", text: "Ongoing trade presence after the launch.", href: "mice/exhibitions/", image: "korea" },
      { title: "Themed Events", text: "Immersive worlds around the product story.", href: "events/themed-events/", image: "dest" },
      { title: "Entertainment & Production", text: "Reveal effects and technical show systems.", href: "events/entertainment-production/", image: "partner" },
    ],
    ctaTitle: "Ready to launch with impact?",
    ctaText: "Share launch date, audience mix, and creative direction — we will build a production proposal.",
  },

  "themed-events": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Themed Events",
    sub: "Custom themes, décor, entertainment, and interactive activities with strong corporate branding.",
    hero: "dest",
    overviewTitle: "Immersive themes, professionally executed",
    overview: [
      "Themed events succeed when every detail — entrance, lighting, entertainment, and activities — belongs to one story. D&G Holiday designs immersive corporate evenings that photograph beautifully and run on schedule.",
      "Tropical, cultural, luxury, or fully custom: we build environments that reinforce your brand without visual clutter or operational risk.",
    ],
    overviewImage: "europe",
    servicesTitle: "Theme building blocks",
    services: [
      { title: "Custom Theme", text: "Concept boards and mood direction locked to your brief.", image: "dubai", href: "events/themed-events/" },
      { title: "Decoration", text: "Sets, florals, and props that transform the venue.", image: "japan", href: "events/gala-dinner/" },
      { title: "Entertainment", text: "Casting and acts that extend the theme narrative.", image: "korea", href: "events/entertainment-production/" },
      { title: "Interactive Activities", text: "Guest engagements that keep energy circulating.", image: "swiss", href: "mice/team-building/" },
      { title: "Corporate Branding", text: "Tasteful logo moments across photo and stage zones.", image: "partner", href: "events/product-launches/" },
      { title: "Full Evening Flow", text: "Arrival to farewell designed as one continuous experience.", image: "egypt", href: "events/annual-company-parties/" },
    ],
    why: [
      { title: "Professional Team", text: "Creative producers grounded in corporate delivery realities." },
      { title: "International Standards", text: "Themes that respect diverse guest cultures and protocols." },
      { title: "Customized Solutions", text: "No stock party kits — concepts built for your brand." },
      { title: "Experienced Project Managers", text: "Décor, entertainment, and F&B synchronized on one timeline." },
      { title: "Reliable Partners", text: "Set designers and artists with corporate event experience." },
      { title: "24/7 Support", text: "Build-day and show-night coverage for adjustments." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["dest", "europe", "dubai", "japan", "egypt"],
    galleryTitle: "Themed worlds & décor detail",
    faqs: [
      { q: "How custom can a theme be?", a: "Fully custom concepts are standard — we develop mood, palette, and guest journey from your brief." },
      { q: "Can themes work in outdoor venues?", a: "Yes, with weather contingencies and technical plans for outdoor production." },
      { q: "Do you provide costumes and performers?", a: "Casting and wardrobe support can be arranged to match the theme." },
      { q: "How do you avoid brand overkill?", a: "We place branding at intentional moments so the theme stays elegant." },
      { q: "Can F&B follow the theme?", a: "Menus and service style can echo the concept without compromising quality." },
      { q: "What is the typical lead time?", a: "Complex builds benefit from 6–10 weeks; simpler themes can move faster." },
    ],
    related: [
      { title: "Annual Company Parties", text: "Festive applications of theme design.", href: "events/annual-company-parties/", image: "japan" },
      { title: "Gala Dinner", text: "Formal dining inside themed environments.", href: "events/gala-dinner/", image: "dubai" },
      { title: "Private Parties", text: "Intimate themed celebrations.", href: "events/private-parties/", image: "swiss" },
    ],
    ctaTitle: "Ready to build a themed evening?",
    ctaText: "Share your inspiration, guest count, and venue type — we will propose a theme concept.",
  },

  "private-parties": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Private Parties",
    sub: "VIP parties, anniversaries, and luxury celebrations with private venues and discreet service.",
    hero: "swiss",
    overviewTitle: "Private celebrations with white-glove care",
    overview: [
      "D&G Holiday designs private parties for executives, partners, and VIP guests who expect privacy, refined entertainment, and seamless hospitality.",
      "Birthday milestones, anniversaries, and exclusive gatherings are produced with venue discretion, personal service options, and entertainment that feels intimate — never oversized.",
    ],
    overviewImage: "dubai",
    servicesTitle: "Private party services",
    services: [
      { title: "VIP Parties", text: "Exclusive guest lists with elevated hosting standards.", image: "europe", href: "events/private-parties/" },
      { title: "Birthday & Anniversary", text: "Personal milestones crafted with thoughtful detail.", image: "japan", href: "events/themed-events/" },
      { title: "Luxury Celebration", text: "Fine dining, florals, and entertainment at premium venues.", image: "egypt", href: "events/gala-dinner/" },
      { title: "Private Venue", text: "Villas, lounges, and exclusive-use spaces.", image: "dest", href: "mice/corporate-retreats/" },
      { title: "Entertainment", text: "Acoustic sets, hosts, and performers scaled to the room.", image: "korea", href: "events/entertainment-production/" },
      { title: "Guest Care", text: "Transfers, security coordination, and personal preferences.", image: "partner", href: "travel-services/luxury-travel/" },
    ],
    why: [
      { title: "Professional Team", text: "Hosts who understand discretion and VIP protocol." },
      { title: "International Standards", text: "Service levels expected by global executives." },
      { title: "Customized Solutions", text: "Every celebration is personal — not a package reprint." },
      { title: "Experienced Project Managers", text: "One lead for venue, chefs, and entertainment." },
      { title: "Reliable Partners", text: "Private venues and artists accustomed to exclusivity." },
      { title: "24/7 Support", text: "Immediate response for guest preference changes." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["swiss", "dubai", "europe", "egypt", "japan"],
    galleryTitle: "Intimate luxury settings",
    faqs: [
      { q: "How small can a private party be?", a: "From ultra-intimate dinners to villa parties of several dozen guests." },
      { q: "Can you arrange private chefs?", a: "Yes — personal chef and butler options are available for villa formats." },
      { q: "Is privacy guaranteed?", a: "We select venues and staffing plans designed for discretion." },
      { q: "Do you handle guest transfers?", a: "Private cars and meet & greet can be included for VIP arrivals." },
      { q: "Can the party include a short program?", a: "Speeches, cake moments, and acoustic entertainment can be gently staged." },
      { q: "Are last-minute private events possible?", a: "When venues allow, we mobilize preferred partners quickly for short-lead celebrations." },
    ],
    related: [
      { title: "Gala Dinner", text: "Larger formal dinner productions.", href: "events/gala-dinner/", image: "dubai" },
      { title: "Luxury Travel", text: "VIP stay and transfer arrangements.", href: "travel-services/luxury-travel/", image: "swiss" },
      { title: "Themed Events", text: "Stronger décor narratives for private nights.", href: "events/themed-events/", image: "dest" },
    ],
    ctaTitle: "Ready to plan a private celebration?",
    ctaText: "Share the occasion, guest list size, and preferred mood — we will propose a private party plan.",
  },

  "entertainment-production": {
    section: "Event Management",
    sectionHref: "events/",
    title: "Entertainment & Production",
    sub: "Stage design, lighting, sound, LED, live bands, MCs, performers, and technical show calling.",
    hero: "partner",
    overviewTitle: "Show production under one desk",
    overview: [
      "D&G Holiday’s entertainment and production desk unifies artists, technical crews, and stage management so corporate events get a coherent show — not a patchwork of vendors.",
      "From LED storytelling to live bands and precision cueing, we deliver technical production that supports brand narratives and guest energy.",
    ],
    overviewImage: "egypt",
    servicesTitle: "Production capabilities",
    services: [
      { title: "Stage Design", text: "Looks that frame speakers, winners, and brand moments.", image: "dubai", href: "events/entertainment-production/" },
      { title: "Lighting & Sound", text: "Systems tuned for speech clarity and performance impact.", image: "korea", href: "events/gala-dinner/" },
      { title: "LED Screen", text: "Content playback and scenic LED architecture.", image: "japan", href: "events/product-launches/" },
      { title: "Live Band & MC", text: "Casting matched to language, tone, and audience.", image: "europe", href: "events/annual-company-parties/" },
      { title: "Performers", text: "Dancers, cultural acts, and specialty entertainment.", image: "dest", href: "events/themed-events/" },
      { title: "Technical Production", text: "Rehearsals, cue sheets, and show-calling discipline.", image: "swiss", href: "events/award-ceremonies/" },
    ],
    why: [
      { title: "Professional Team", text: "Technical directors and show callers with corporate experience." },
      { title: "International Standards", text: "Safety, power, and cue discipline for large productions." },
      { title: "Customized Solutions", text: "Artist and tech packages built for your run-of-show." },
      { title: "Experienced Project Managers", text: "One owner across creative, technical, and artist logistics." },
      { title: "Reliable Partners", text: "Crews and rental houses proven on high-stakes brand events." },
      { title: "24/7 Support", text: "Build and show coverage for technical contingencies." },
    ],
    process: DEFAULT_PROCESS,
    gallery: ["partner", "egypt", "dubai", "korea", "japan"],
    galleryTitle: "Stage craft & production energy",
    faqs: [
      { q: "Can you supply full technical packages?", a: "Yes — lighting, sound, LED, staging, and crew can be scoped as one package." },
      { q: "Do you book artists directly?", a: "We cast and contract entertainers suited to your audience and brand guidelines." },
      { q: "Is rehearsal time included?", a: "Cue-to-cue rehearsals are planned into the production schedule." },
      { q: "Can production support hybrid streaming?", a: "Camera and streaming integrations can be added with the AV plan." },
      { q: "How do you handle outdoor productions?", a: "Weather protection, power, and safety plans are built for outdoor sites." },
      { q: "Can you work inside our chosen venue’s rules?", a: "We liaise with venue technical teams on load-in, power, and curfew requirements." },
    ],
    related: [
      { title: "Gala Dinner", text: "Dining nights powered by full production.", href: "events/gala-dinner/", image: "dubai" },
      { title: "Award Ceremonies", text: "Cue-critical recognition shows.", href: "events/award-ceremonies/", image: "korea" },
      { title: "Product Launches", text: "Reveal-focused technical moments.", href: "events/product-launches/", image: "europe" },
    ],
    ctaTitle: "Ready to produce your next show?",
    ctaText: "Share venue, date, and show ambitions — we will propose entertainment and technical production.",
  },
};

function renderMiceServicePage(pageId, rel) {
  const p = withServiceMedia(pageId, PAGES[pageId]);
  if (!p) return null;

  const sectionIcon = PAGE_SECTION_ICONS[pageId] || "briefcase-business";
  const servicesLead =
    SERVICES_LEADS[pageId] ||
    "Premium capabilities for corporate organizers and international partners.";
  const processLead =
    PROCESS_LEADS[pageId] ||
    "A clear path from first briefing to post-event wrap.";

  const services = p.services
    .map((h, i) => {
      const icon = h.icon || pickIcon(h.title);
      return `<a class="dg-ts-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${h.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, h.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(h.title)}</h3>
    <p>${esc(h.text)}</p>
    <span class="dg-ts-card__cta">Learn more <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");

  const why = (p.why || DEFAULT_WHY)
    .map((w, i) => {
      const icon = w.icon || pickIcon(w.title, "badge-check");
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

  const gallery = (p.galleryImages || p.gallery || [p.overviewImage])
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
      return `<a class="dg-ts-card dg-ts-reveal" href="${rel}${r.href}">
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

  const overviewParas = p.overview.map((t) => `<p>${esc(t)}</p>`).join("\n");

  const trust = (p.why || DEFAULT_WHY)
    .slice(0, 3)
    .map((w) => {
      const icon = w.icon || pickIcon(w.title, "badge-check");
      return `<li>
  ${ico(icon)}
  <div><strong>${esc(w.title)}</strong><span>${esc(w.text)}</span></div>
</li>`;
    })
    .join("\n");

  return `<article class="dg-ts dg-theme--mice">
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

  <section class="dg-ts-overview" id="overview">
    <div class="dg-ts__wrap">
      <div class="dg-ts-overview__grid">
        <div class="dg-ts-overview__copy dg-ts-reveal">
          ${sectionHead({
            eyebrow: "Overview",
            title: p.overviewTitle,
            icon: sectionIcon,
            align: "left",
          })}
          ${overviewParas}
          <ul class="dg-ts-trust" aria-label="Service strengths">${trust}</ul>
        </div>
        <figure class="dg-ts-overview__media dg-ts-reveal dg-ts-reveal-d1">
          <img src="${img(rel, p.overviewImage)}" alt="${esc(p.title)} overview" loading="lazy" />
          <figcaption class="dg-ts-overview__caption">
            <span>D&amp;G Holiday</span>
            <strong>${esc(p.title)}</strong>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="dg-ts-highlights" id="services">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Our Services",
        title: p.servicesTitle,
        lead: servicesLead,
        icon: "layout-grid",
      })}
      <div class="dg-ts-highlights__grid">${services}</div>
    </div>
  </section>

  <section class="dg-ts-why" id="why">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Why Choose Us",
        title: "Why clients trust this desk",
        lead: "People, process, and partners — built for corporate-ready delivery.",
        icon: "shield-check",
      })}
      <div class="dg-ts-why__grid">${why}</div>
    </div>
  </section>

  <section class="dg-ts-steps" id="process">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Our Process",
        title: "From briefing to wrap",
        lead: processLead,
        icon: "route",
      })}
      <div class="dg-ts-steps__track dg-ts-steps__track--six">${steps}</div>
    </div>
  </section>

  <section class="dg-ts-gallery" id="gallery">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Gallery",
        title: p.galleryTitle || "Corporate event atmospheres",
        lead: "Destination mood and delivery moments from similar programs.",
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
        lead: "Practical answers organizers ask before confirming a program.",
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
        lead: "Related desks that often sit alongside this program.",
        icon: "link",
      })}
      <div class="dg-ts-related__grid">${related}</div>
    </div>
  </section>

  ${renderPageCta({
    rel,
    title: p.ctaTitle || "Ready to organize your next event?",
    text:
      p.ctaText ||
      "Tell us about your dates, guests, and objectives — our corporate desk will prepare a tailored proposal.",
  })}
</article>`;
}

function hasMiceServicePage(id) {
  return Boolean(PAGES[id]);
}

function listMiceServicePageIds() {
  return Object.keys(PAGES);
}

function renderMiceHubPage({ title, sub, heroKey, children, rel, eventsLink }) {
  const hubIcons = {
    meetings: "presentation",
    "incentive-travel": "trophy",
    "seminars-conferences": "mic",
    "corporate-group-travel": "bus",
    "team-building": "users",
    exhibitions: "store",
    "corporate-retreats": "trees",
  };

  const cards = (children || [])
    .map((c, i) => {
      const href = `${c.id}/`;
      const icon = hubIcons[c.id] || PAGE_SECTION_ICONS[c.id] || "briefcase-business";
      return `<a class="dg-ts-card dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${href}">
  <div class="dg-ts-card__body" style="padding-top:28px">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(c.label)}</h3>
    <p>${esc(c.description || "")}</p>
    <span class="dg-ts-card__cta">Explore <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");

  const extra = eventsLink
    ? `<a class="dg-ts-card dg-ts-reveal" href="${rel}events/">
  <div class="dg-ts-card__body" style="padding-top:28px">
    <div class="dg-ts-card__top">${ico("calendar-days")}</div>
    <h3>Event Management</h3>
    <p>Gala dinners, awards, product launches, themed parties, and full entertainment production.</p>
    <span class="dg-ts-card__cta">Explore <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`
    : "";

  return `<article class="dg-ts dg-theme--mice">
  ${renderPageHero({
    title,
    subtitle: sub,
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: title },
    ],
    rel,
  })}
  <section class="dg-ts-hub">
    <div class="dg-ts__wrap">
      <div class="dg-ts-section__head dg-ts-reveal">
        ${ico("briefcase-business", "lg")}
        <p class="dg-ts__eyebrow">Our Services</p>
        <h2>Choose a corporate desk</h2>
        <p class="dg-ts__lead">Same premium layout on every page — clear proof and conversion-ready next steps.</p>
      </div>
      <div class="dg-ts-hub__grid">${cards}${extra}</div>
    </div>
  </section>
  ${renderPageCta({
    rel,
    title: "Ready to plan your next event?",
    text: "Share dates, guests, and objectives — our corporate desk will prepare a tailored proposal.",
  })}
</article>`;
}

module.exports = {
  renderMiceServicePage,
  hasMiceServicePage,
  listMiceServicePageIds,
  renderMiceHubPage,
  PAGES,
};
