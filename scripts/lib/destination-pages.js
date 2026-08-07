/**
 * Destinations page content + HTML renderer
 * Shares luxury DMC design system (dg-ts).
 */
const { renderPageHero } = require("./page-hero");
const { renderPageCta } = require("./page-cta");
const { buildImagesMap, withServiceMedia } = require("./service-images");

const IMAGES = {
  ...buildImagesMap(),
  // Destination pages may show real destination photography
  japan: "images/destinations/japan.jpg",
  korea: "images/destinations/korea.jpg",
  dubai: "images/destinations/dubai.jpg",
  europe: "images/destinations/europe.jpg",
  swiss: "images/destinations/switzerland.jpg",
  destJapan: "images/destinations/japan.jpg",
  destKorea: "images/destinations/korea.jpg",
  destDubai: "images/destinations/dubai.jpg",
  destEurope: "images/destinations/europe.jpg",
  destSwiss: "images/destinations/switzerland.jpg",
};


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

const PAGE_SECTION_ICONS = {
  thailand: "map-pinned",
  asia: "globe",
  europe: "landmark",
  "middle-east": "sun",
  worldwide: "earth",
};

const CITIES_LEADS = {
  thailand: "Cities and coasts we operate most often for leisure, MICE, and weddings.",
  asia: "Signature countries and city circuits across the region.",
  europe: "Classic countries and highlights for refined outbound journeys.",
  "middle-east": "Gulf cities and heritage destinations with luxury ground care.",
  worldwide: "Global regions we plan through trusted partner networks.",
};

const SERVICES_LEADS = {
  thailand: "Full destination delivery — transfers, stays, tours, MICE, and weddings.",
  asia: "Luxury touring, hotels, corporate travel, and regional MICE support.",
  europe: "Private touring, five-star hotels, and outbound travel support.",
  "middle-east": "Luxury experiences, hotels, transfers, and corporate stopovers.",
  worldwide: "Global planning with partner DMCs and luxury hotel networks.",
};

const EXPERIENCES_LEADS = {
  thailand: "Choose a travel mood — we shape Thailand around it.",
  asia: "Travel moods across Asia’s cities, islands, and culture capitals.",
  europe: "Travel moods for culture, alpine beauty, and refined leisure.",
  "middle-east": "Travel moods from desert adventure to skyline luxury.",
  worldwide: "Travel moods for multi-region and around-the-world planning.",
};

function ico(name, size) {
  const cls = size === "lg" ? "dg-ts-ico dg-ts-ico--lg" : "dg-ts-ico";
  return `<span class="${cls}" aria-hidden="true"><i data-lucide="${esc(name)}" class="dg-lucide"></i></span>`;
}

function pickIcon(title, fallback = "map-pin") {
  const t = String(title || "").toLowerCase();
  if (/thailand|bangkok|phuket|chiang|samui|krabi|hua hin/.test(t)) return "map-pinned";
  if (/japan|korea|vietnam|singapore|malaysia|indonesia|bali|china|hong kong|taiwan|asia/.test(t)) return "globe";
  if (/france|italy|switzerland|united kingdom|spain|germany|austria|greece|scandinavia|europe/.test(t)) return "landmark";
  if (/dubai|abu dhabi|qatar|oman|saudi|jordan|middle east|desert/.test(t)) return "sun";
  if (/africa|americas|oceania|antarctica|worldwide|global/.test(t)) return "earth";
  if (/nature|island|park|mountain|coast|wadis/.test(t)) return "trees";
  if (/culture|temple|heritage|festival|museum/.test(t)) return "landmark";
  if (/luxury|five.?star|vip|premium/.test(t)) return "gem";
  if (/food|dining|culinary/.test(t)) return "utensils";
  if (/shop/.test(t)) return "shopping-bag";
  if (/adventure|dive|trek|safari/.test(t)) return "compass";
  if (/family/.test(t)) return "users";
  if (/romantic|couple/.test(t)) return "heart";
  if (/corporate|mice|meeting|incentive|business/.test(t)) return "briefcase-business";
  if (/wellness|spa|yoga|retreat/.test(t)) return "leaf";
  if (/hotel|resort|stay|accommodation/.test(t)) return "hotel";
  if (/tour|private|guide/.test(t)) return "user-round";
  if (/airport|transfer|transport/.test(t)) return "car";
  if (/wedding/.test(t)) return "heart";
  if (/visa|support|travel support/.test(t)) return "file-check";
  if (/cool|winter|nov|peak comfort/.test(t)) return "snowflake";
  if (/hot|summer|mar/.test(t)) return "sun";
  if (/green|spring|autumn|shoulder/.test(t)) return "cloud-sun";
  if (/tip|travel tip/.test(t)) return "lightbulb";
  if (/season/.test(t)) return "calendar-days";
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
  thailand: {
    section: "Destinations",
    sectionHref: "destinations/",
    title: "Thailand",
    sub: "Luxury travel, private tours, MICE, and destination weddings — delivered by a Thailand-based DMC with nationwide reach.",
    hero: "dest",
    overviewTitle: "Thailand with local luxury expertise",
    overview: [
      "Thailand is D&G Holiday’s home ground — where temple cities, tropical islands, and five-star resorts meet precise ground handling for leisure, corporate, and wedding travelers.",
      "From Bangkok boardrooms to Phuket beaches and Chiang Mai culture, we design journeys that feel effortless: history, hospitality, and high-end service in one accountable destination desk.",
    ],
    overviewImage: "story",
    citiesTitle: "Popular cities & attractions",
    cities: [
      { title: "Bangkok", text: "Grand palaces, rooftop dining, shopping, and corporate venues in Thailand’s capital.", image: "partner", href: "destinations/thailand/" },
      { title: "Phuket", text: "Andaman beaches, luxury resorts, yacht days, and sunset wedding settings.", image: "dubai", href: "destination-weddings/beach-weddings/" },
      { title: "Krabi", text: "Limestone cliffs, island hopping, and calm resort escapes.", image: "japan", href: "destinations/thailand/" },
      { title: "Chiang Mai", text: "Temples, mountains, wellness, and northern Thai culture.", image: "korea", href: "destinations/thailand/" },
      { title: "Koh Samui", text: "Gulf islands, villa luxury, and intimate destination celebrations.", image: "swiss", href: "destination-weddings/luxury-weddings/" },
      { title: "Hua Hin & Beyond", text: "Royal seaside charm, Pattaya energy, Ayutthaya heritage, Khao Lak, and Trang.", image: "europe", href: "destinations/thailand/" },
    ],
    servicesTitle: "Our services in Thailand",
    services: [
      { title: "Airport Transfer", text: "Meet & greet and VIP transfers across major gateways.", image: "dubai", href: "travel-services/transportation-transfers/" },
      { title: "Hotels & Luxury Resorts", text: "Curated stays from city hotels to exclusive resorts.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "Private & Luxury Tours", text: "Tailor-made days with private guides and cars.", image: "europe", href: "travel-services/private-tours/" },
      { title: "Corporate Travel & MICE", text: "Meetings, incentives, and conferences nationwide.", image: "partner", href: "mice/" },
      { title: "Destination Weddings", text: "Indian, Thai, beach, and luxury wedding planning.", image: "egypt", href: "destination-weddings/" },
      { title: "Travel Support", text: "Visa guidance, logistics, and on-trip care.", image: "korea", href: "travel-services/visa-travel-support/" },
    ],
    whyTitle: "Why visit Thailand",
    why: [
      { title: "Islands & nature", text: "Islands, national parks, mountains, and tropical coastlines in one country." },
      { title: "Living culture", text: "Temples, festivals, craft traditions, and warm Thai hospitality." },
      { title: "Five-star luxury", text: "World-class resorts, spas, private villas, and fine dining." },
      { title: "Culinary depth", text: "Street food to Michelin experiences across every region." },
      { title: "Shopping variety", text: "Markets, malls, and artisan finds for every traveler profile." },
      { title: "Soft adventure", text: "Diving, trekking, island hopping, and soft adventure for all ages." },
    ],
    seasonsTitle: "Best time to visit Thailand",
    seasonsLead: "Thailand is a year-round destination — timing depends on region and travel style.",
    seasons: [
      { title: "Cool Season (Nov–Feb)", text: "Ideal for Bangkok, north Thailand, and most leisure circuits with pleasant evenings." },
      { title: "Hot Season (Mar–May)", text: "Beach resorts shine; plan early starts and spa downtime for city programs." },
      { title: "Green Season (Jun–Oct)", text: "Lush landscapes, softer rates, and rewarding island/resort stays with smart weather plans." },
      { title: "Travel Tip", text: "Match coastlines carefully — Andaman and Gulf peak seasons differ. We advise by itinerary." },
    ],
    experiencesTitle: "Suggested experiences",
    experiences: [
      { title: "Luxury Experiences", text: "Private dining, yacht days, and five-star resort immersions.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Family Travel", text: "Gentle pacing, kid-friendly hotels, and shared cultural days.", image: "japan", href: "travel-services/domestic-travel/" },
      { title: "Adventure", text: "Island adventures, national parks, and active day designs.", image: "korea", href: "travel-services/private-tours/" },
      { title: "Romantic", text: "Sunset beaches, couples’ spa, and intimate villa stays.", image: "dubai", href: "destination-weddings/beach-weddings/" },
      { title: "Corporate", text: "Offsites, incentives, and executive meeting programs.", image: "partner", href: "mice/incentive-travel/" },
      { title: "Wellness", text: "Retreat resorts, yoga, and recovery-focused itineraries.", image: "dest", href: "mice/corporate-retreats/" },
    ],
    gallery: ["dest", "story", "dubai", "japan", "swiss"],
    galleryTitle: "Thailand in frame",
    faqs: [
      { q: "Which Thailand destinations do you operate most?", a: "Bangkok, Phuket, Krabi, Chiang Mai, Pattaya, Koh Samui, Hua Hin, Ayutthaya, Khao Lak, Trang, and tailored multi-city circuits." },
      { q: "Can you combine beach and culture in one trip?", a: "Yes. Classic pairings include Bangkok + Chiang Mai + beach, or Bangkok + Phuket/Samui with realistic transfer pacing." },
      { q: "Do you handle MICE and weddings in Thailand?", a: "Thailand is our strongest destination for meetings, incentives, conferences, exhibitions, and destination weddings." },
      { q: "Is Thailand suitable year-round?", a: "Yes, with regional seasonality. We recommend coastlines and cities based on your travel month." },
      { q: "Can itineraries be fully private?", a: "Private cars, guides, and villa or resort stays are standard for luxury FIT and VIP groups." },
      { q: "Do you provide airport meet & greet?", a: "Yes — across major Thai airports with name-board greeting and hotel transfer." },
    ],
    related: [
      { title: "Asia", text: "Extend Thailand with Japan, Korea, Vietnam, and more.", href: "destinations/asia/", image: "japan" },
      { title: "Middle East", text: "Dubai stopovers and luxury Middle East add-ons.", href: "destinations/middle-east/", image: "dubai" },
      { title: "Worldwide", text: "Global luxury routes through our partner network.", href: "destinations/worldwide/", image: "europe" },
    ],
    ctaTitle: "Let's plan your Thailand journey",
    ctaText: "Share your dates, traveler profile, and preferred regions — our Thailand desk will craft a proposal.",
  },

  asia: {
    section: "Destinations",
    sectionHref: "destinations/",
    title: "Asia",
    sub: "Travel across Asia with multi-country tours, city breaks, luxury stays, and corporate programs.",
    hero: "japan",
    overviewTitle: "Asia with seamless coordination",
    overview: [
      "Asia offers temples and skylines, cherry blossoms and tropical islands, culinary capitals and quiet heritage towns. D&G Holiday designs Asia programs that respect culture, pacing, and luxury standards.",
      "Whether Japan and Korea city circuits, Southeast Asia combinations, or corporate travel across the region, we connect trusted partners into one clear itinerary.",
    ],
    overviewImage: "korea",
    citiesTitle: "Popular destinations across Asia",
    cities: [
      { title: "Japan", text: "Tokyo, Kyoto, Osaka, and seasonal journeys from blossom to foliage.", image: "japan", href: "destinations/asia/" },
      { title: "Korea", text: "Seoul, Busan, and modern culture with refined hospitality.", image: "korea", href: "destinations/asia/" },
      { title: "Vietnam", text: "Hanoi, Halong, Hoi An, and Ho Chi Minh City circuits.", image: "dest", href: "destinations/asia/" },
      { title: "Singapore & Malaysia", text: "City elegance, food trails, and easy regional combinations.", image: "partner", href: "destinations/asia/" },
      { title: "Indonesia & Bali", text: "Island luxury, culture, and romantic resort escapes.", image: "dubai", href: "destinations/asia/" },
      { title: "China, Hong Kong & Taiwan", text: "Iconic cities, heritage, and contemporary luxury stays.", image: "europe", href: "destinations/asia/" },
    ],
    servicesTitle: "Our services in Asia",
    services: [
      { title: "Luxury Tours", text: "Curated multi-city and multi-country Asia journeys.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Private Tours", text: "Private guides and flexible pacing for discerning travelers.", image: "europe", href: "travel-services/private-tours/" },
      { title: "Hotels", text: "Luxury and boutique hotel reservations across key cities.", image: "japan", href: "travel-services/hotel-reservations/" },
      { title: "Corporate Travel", text: "Business trips and executive movements with clear reporting.", image: "partner", href: "mice/corporate-group-travel/" },
      { title: "MICE", text: "Regional meetings, incentives, and conference support.", image: "korea", href: "mice/" },
      { title: "Travel Support", text: "Visa guidance, transfers, and partner coordination.", image: "egypt", href: "travel-services/visa-travel-support/" },
    ],
    whyTitle: "Why travel Asia with us",
    why: [
      { title: "Regional diversity", text: "Mountains, islands, rice terraces, and national parks across the region." },
      { title: "Living heritage", text: "Temples, tea houses, festivals, and living heritage experiences." },
      { title: "Iconic luxury", text: "Iconic hotels, ryokans, resorts, and private transfers." },
      { title: "Culinary capitals", text: "From street stalls to destination dining in every capital." },
      { title: "City shopping", text: "Design districts, markets, and duty-free city hubs." },
      { title: "Balanced adventure", text: "Soft adventure and active days balanced with comfort." },
    ],
    seasonsTitle: "Best time to visit Asia",
    seasonsLead: "Asia spans climates — we align destinations to season and traveler comfort.",
    seasons: [
      { title: "Spring", text: "Cherry blossom windows in Japan/Korea and pleasant Southeast Asia travel." },
      { title: "Autumn", text: "Clear skies and foliage seasons for Japan, Korea, and many city breaks." },
      { title: "Winter", text: "Festive city travel, snow destinations, and warm tropical escapes." },
      { title: "Travel Tip", text: "Multi-country trips need buffer days for flights and immigration — we build realistic pacing." },
    ],
    experiencesTitle: "Suggested experiences",
    experiences: [
      { title: "Luxury Experiences", text: "Flagship hotels, private guides, and exclusive cultural access.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Family Travel", text: "City + soft adventure combinations with family-friendly hotels.", image: "korea", href: "travel-services/group-tours/" },
      { title: "Adventure", text: "Active days balanced with recovery nights in premium stays.", image: "dest", href: "travel-services/private-tours/" },
      { title: "Romantic", text: "Bali resorts, Kyoto ryokans, and intimate dining journeys.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Corporate", text: "Regional roadshows and incentive groups across Asia hubs.", image: "partner", href: "mice/incentive-travel/" },
      { title: "Wellness", text: "Spa resorts and restorative add-ons in tropical destinations.", image: "japan", href: "mice/corporate-retreats/" },
    ],
    gallery: ["japan", "korea", "dest", "dubai", "europe"],
    galleryTitle: "Asia destinations in frame",
    faqs: [
      { q: "Which Asia countries do you cover?", a: "Japan, Korea, Vietnam, Singapore, Malaysia, Indonesia (including Bali), Cambodia, Laos, China, Hong Kong, Taiwan, and tailor-made combinations." },
      { q: "Can you plan multi-country Asia tours?", a: "Yes. We design circuits with sensible flight connections and partner ground handling in each country." },
      { q: "Do you support corporate travel in Asia?", a: "Corporate group travel, meetings, and incentives are core Asia offerings." },
      { q: "Is visa support available?", a: "We provide entry requirement guidance and document support through our travel desk." },
      { q: "Can luxury hotels be guaranteed in peak seasons?", a: "Early booking is advised for cherry blossom and major holidays; we secure preferred inventory where available." },
      { q: "Do you offer private guides in major cities?", a: "Private guiding is available in key destinations through vetted local partners." },
    ],
    related: [
      { title: "Thailand", text: "Start or end Asia journeys in our home destination.", href: "destinations/thailand/", image: "dest" },
      { title: "Europe", text: "Luxury Europe programs for outbound travelers.", href: "destinations/europe/", image: "europe" },
      { title: "Middle East", text: "Dubai and Gulf stopovers between continents.", href: "destinations/middle-east/", image: "dubai" },
    ],
    ctaTitle: "Let's plan your Asia journey",
    ctaText: "Tell us your preferred countries, season, and travel style — we will prepare an Asia proposal.",
  },

  europe: {
    section: "Destinations",
    sectionHref: "destinations/",
    title: "Europe",
    sub: "Luxury Europe travel — classic circuits, alpine journeys, private tours, and five-star hotels.",
    hero: "europe",
    overviewTitle: "Europe with refined pacing",
    overview: [
      "Europe remains a dream destination for culture, cuisine, and landmark cities. D&G Holiday designs European programs for Thai and Asian travelers who expect clear logistics, strong hotels, and elegant pacing.",
      "From France and Italy to Switzerland, the UK, Spain, Germany, Austria, Greece, and Scandinavia, we shape private tours and small-group journeys that feel premium — never rushed.",
    ],
    overviewImage: "swiss",
    citiesTitle: "Popular countries & highlights",
    cities: [
      { title: "France", text: "Paris, Provence, and refined culinary journeys.", image: "europe", href: "destinations/europe/" },
      { title: "Italy", text: "Rome, Florence, Venice, and Amalfi-inspired leisure.", image: "dest", href: "destinations/europe/" },
      { title: "Switzerland", text: "Alpine scenery, scenic trains, and luxury mountain stays.", image: "swiss", href: "destinations/europe/" },
      { title: "United Kingdom", text: "London highlights with heritage day trips.", image: "partner", href: "destinations/europe/" },
      { title: "Spain & Germany", text: "Vibrant cities, architecture, and regional depth.", image: "korea", href: "destinations/europe/" },
      { title: "Austria, Greece & Scandinavia", text: "Classical elegance, islands, and Nordic design cities.", image: "japan", href: "destinations/europe/" },
    ],
    servicesTitle: "Our services in Europe",
    services: [
      { title: "Private Tours", text: "Private drivers and guides for flexible luxury pacing.", image: "europe", href: "travel-services/private-tours/" },
      { title: "Luxury Hotels", text: "Five-star and boutique hotel reservations in key cities.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "Luxury Travel", text: "Tailor-made Europe with elevated transfers and experiences.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Group Tours", text: "Classic circuits designed for outbound groups.", image: "korea", href: "travel-services/group-tours/" },
      { title: "Corporate Travel", text: "Business and incentive movements with clear planning.", image: "partner", href: "mice/corporate-group-travel/" },
      { title: "Visa & Travel Support", text: "Schengen guidance and document support for travelers.", image: "egypt", href: "travel-services/visa-travel-support/" },
    ],
    whyTitle: "Why visit Europe",
    why: [
      { title: "Alpine & coastal nature", text: "Alps, Mediterranean coasts, lakes, and countryside routes." },
      { title: "Landmark culture", text: "Museums, heritage cities, and world-famous landmarks." },
      { title: "Hotel excellence", text: "Iconic hotels, scenic trains, and private touring standards." },
      { title: "Regional cuisine", text: "Regional cuisine, wine country, and destination dining." },
      { title: "Fashion capitals", text: "Fashion capitals and boutique districts across the continent." },
      { title: "Scenic adventure", text: "Scenic hiking, island hopping, and soft alpine adventure." },
    ],
    seasonsTitle: "Best time to visit Europe",
    seasonsLead: "Season shapes crowds, alpine access, and Mediterranean comfort.",
    seasons: [
      { title: "Late Spring (Apr–Jun)", text: "Mild weather, blooming cities, and strong hotel availability before peak summer." },
      { title: "Summer (Jul–Aug)", text: "Long daylight and coastal energy — book early for iconic cities." },
      { title: "Autumn (Sep–Oct)", text: "Beautiful light, harvest seasons, and more comfortable pacing." },
      { title: "Travel Tip", text: "Winter shines for markets and ski; summer needs earlier hotel holds for luxury inventory." },
    ],
    experiencesTitle: "Suggested experiences",
    experiences: [
      { title: "Luxury Experiences", text: "Palace hotels, private museum hours, and scenic first-class rail.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Family Travel", text: "Multi-city Europe with family suites and gentle schedules.", image: "europe", href: "travel-services/group-tours/" },
      { title: "Adventure", text: "Alpine soft adventure with premium base hotels.", image: "japan", href: "travel-services/private-tours/" },
      { title: "Romantic", text: "Paris nights, lake views, and intimate dining reservations.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Corporate", text: "Incentive Europe and executive leisure add-ons.", image: "partner", href: "mice/incentive-travel/" },
      { title: "Wellness", text: "Spa hotels and restorative alpine or coastal stays.", image: "dest", href: "mice/corporate-retreats/" },
    ],
    gallery: ["europe", "swiss", "japan", "korea", "dubai"],
    galleryTitle: "Europe in frame",
    faqs: [
      { q: "Do you design Europe trips for travelers from Thailand?", a: "Yes. Itineraries, hotel styles, and pacing are tailored for Thai and Asian outbound travelers." },
      { q: "Can trips be fully private?", a: "Private tours with drivers/guides are available across major European destinations." },
      { q: "Which countries are most requested?", a: "France, Italy, Switzerland, UK, Spain, Germany, Austria, Greece, and Scandinavia combinations." },
      { q: "Do you help with Schengen visas?", a: "We provide guidance and document checklists; final approval remains with embassies/consulates." },
      { q: "Are luxury hotels available in peak summer?", a: "Yes with early booking — we recommend securing key cities as soon as dates are firm." },
      { q: "Can Europe be combined with Middle East stopovers?", a: "Dubai and other Gulf hubs are popular stopover add-ons on long-haul itineraries." },
    ],
    related: [
      { title: "Asia", text: "Regional Asia journeys and city breaks.", href: "destinations/asia/", image: "japan" },
      { title: "Middle East", text: "Luxury Gulf stopovers and city breaks.", href: "destinations/middle-east/", image: "dubai" },
      { title: "Worldwide", text: "Beyond Europe — global luxury routes.", href: "destinations/worldwide/", image: "egypt" },
    ],
    ctaTitle: "Let's plan your Europe journey",
    ctaText: "Share preferred countries, season, and hotel style — our outbound desk will prepare a Europe proposal.",
  },

  "middle-east": {
    section: "Destinations",
    sectionHref: "destinations/",
    title: "Middle East",
    sub: "Luxury Middle East travel — Dubai, Abu Dhabi, Qatar, Oman, Saudi Arabia, Jordan, and corporate journeys.",
    hero: "dubai",
    overviewTitle: "Modern luxury meets desert heritage",
    overview: [
      "The Middle East blends futuristic skylines, desert landscapes, and hospitality excellence. D&G Holiday designs luxury city breaks, family adventures, and corporate programs with polished ground arrangements.",
      "From Dubai icons and Abu Dhabi culture to Qatar, Oman, Saudi Arabia, and Jordan’s heritage trails, we create experiences that feel contemporary, comfortable, and memorable.",
    ],
    overviewImage: "egypt",
    citiesTitle: "Popular destinations",
    cities: [
      { title: "Dubai", text: "Skyline icons, desert safaris, shopping, and luxury hotels.", image: "dubai", href: "destinations/middle-east/" },
      { title: "Abu Dhabi", text: "Culture landmarks, louvre days, and refined coastal stays.", image: "egypt", href: "destinations/middle-east/" },
      { title: "Qatar", text: "Doha’s modern museums, souqs, and premium city hotels.", image: "partner", href: "destinations/middle-east/" },
      { title: "Oman", text: "Mountains, coastline, and distinctive luxury desert camps.", image: "dest", href: "destinations/middle-east/" },
      { title: "Saudi Arabia", text: "Emerging leisure and corporate destinations with guided planning.", image: "korea", href: "destinations/middle-east/" },
      { title: "Jordan", text: "Petra, Wadi Rum, and heritage journeys with strong storytelling.", image: "europe", href: "destinations/middle-east/" },
    ],
    servicesTitle: "Our services in the Middle East",
    services: [
      { title: "Luxury Experiences", text: "Desert, yacht, dining, and iconic attraction access.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Hotels", text: "Luxury hotel reservations in leading Gulf cities.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "Private Tours", text: "Private city and desert touring with flexible timing.", image: "europe", href: "travel-services/private-tours/" },
      { title: "Corporate Travel", text: "Business trips, stopovers, and executive hosting.", image: "partner", href: "mice/corporate-group-travel/" },
      { title: "Airport Transfer", text: "VIP meet & greet and hotel transfers.", image: "japan", href: "travel-services/transportation-transfers/" },
      { title: "Travel Support", text: "Entry guidance and itinerary coordination.", image: "korea", href: "travel-services/visa-travel-support/" },
    ],
    whyTitle: "Why visit the Middle East",
    why: [
      { title: "Desert drama", text: "Deserts, wadis, coastlines, and dramatic landscapes." },
      { title: "Heritage & museums", text: "Heritage sites, museums, and living traditions." },
      { title: "Hospitality luxury", text: "World-famous hotels, malls, and polished service culture." },
      { title: "Global dining", text: "Global dining scenes and regional flavors." },
      { title: "Retail & souqs", text: "Flagship retail and souq experiences in one trip." },
      { title: "Desert adventure", text: "Desert safaris, dune activities, and scenic touring." },
    ],
    seasonsTitle: "Best time to visit the Middle East",
    seasonsLead: "Mild winters are ideal for outdoor sightseeing and desert experiences.",
    seasons: [
      { title: "Peak Comfort (Nov–Mar)", text: "Best for outdoor attractions, desert evenings, and family sightseeing." },
      { title: "Shoulder Months", text: "April and October can work well with midday planning adjustments." },
      { title: "Summer", text: "Indoor luxury, malls, and shorter outdoor windows — still strong for city stays." },
      { title: "Travel Tip", text: "Combine Dubai city time with a desert evening and one cultural day for balanced itineraries." },
    ],
    experiencesTitle: "Suggested experiences",
    experiences: [
      { title: "Luxury Experiences", text: "Burj views, fine dining, and private desert dining setups.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Family Travel", text: "Theme attractions, easy transfers, and family suites.", image: "korea", href: "travel-services/group-tours/" },
      { title: "Adventure", text: "Desert safaris and scenic outdoor days with comfort returns.", image: "dest", href: "travel-services/private-tours/" },
      { title: "Romantic", text: "Yacht evenings, spa hotels, and skyline dining.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Corporate", text: "Stopover hosting and executive city programs.", image: "partner", href: "mice/" },
      { title: "Wellness", text: "Resort spas and recovery nights between long-haul flights.", image: "egypt", href: "mice/corporate-retreats/" },
    ],
    gallery: ["dubai", "egypt", "dest", "partner", "europe"],
    galleryTitle: "Middle East in frame",
    faqs: [
      { q: "Is Dubai suitable as a stopover destination?", a: "Yes. Short luxury stopovers with hotels, transfers, and highlight tours are very popular." },
      { q: "Can families travel comfortably in summer?", a: "Yes with indoor-focused planning, early outdoor slots, and premium hotel facilities." },
      { q: "Do you cover destinations beyond Dubai?", a: "Abu Dhabi, Qatar, Oman, Saudi Arabia, and Jordan can be planned based on traveler goals." },
      { q: "Are desert experiences private?", a: "Private and small-group desert options are available depending on the experience type." },
      { q: "Can Middle East be combined with Europe or Asia?", a: "Gulf hubs are excellent bridges for long-haul combinations." },
      { q: "Do you arrange VIP airport services?", a: "Meet & greet and VIP transfer arrangements can be included in luxury programs." },
    ],
    related: [
      { title: "Europe", text: "Continue westward on luxury Europe circuits.", href: "destinations/europe/", image: "europe" },
      { title: "Asia", text: "Connect Gulf cities with Asia hubs.", href: "destinations/asia/", image: "japan" },
      { title: "Thailand", text: "Return or start from our home destination.", href: "destinations/thailand/", image: "dest" },
    ],
    ctaTitle: "Let's plan your Middle East trip",
    ctaText: "Share your city preferences and travel dates — we will prepare a luxury Middle East proposal.",
  },

  worldwide: {
    section: "Destinations",
    sectionHref: "destinations/",
    title: "Worldwide",
    sub: "Global luxury travel — North & South America, Africa, Australia, New Zealand, polar regions, and worldwide tours.",
    hero: "egypt",
    overviewTitle: "The world, planned with discipline",
    overview: [
      "When your journey reaches beyond our core regions, D&G Holiday designs worldwide travel through trusted partners — with the same proposal clarity, hotel standards, and guest-care expectations.",
      "From North and South America to Africa, Australia, New Zealand, polar voyages, and luxury cruises, we build tailor-made FIT and special-interest journeys for discerning travelers.",
    ],
    overviewImage: "europe",
    citiesTitle: "Worldwide regions we arrange",
    cities: [
      { title: "North America", text: "Iconic cities, national parks, and coast-to-coast luxury routes.", image: "partner", href: "destinations/worldwide/" },
      { title: "South America", text: "Culture capitals, dramatic landscapes, and expedition-style touring.", image: "dest", href: "destinations/worldwide/" },
      { title: "Africa", text: "Safari circuits and destination experiences with vetted operators.", image: "egypt", href: "destinations/worldwide/" },
      { title: "Australia & New Zealand", text: "City, coast, and nature combinations with premium stays.", image: "japan", href: "destinations/worldwide/" },
      { title: "Polar Regions", text: "Expedition cruising and once-in-a-lifetime wilderness journeys.", image: "swiss", href: "destinations/worldwide/" },
      { title: "Luxury Cruises", text: "Ocean and river cruise holidays with pre/post hotel planning.", image: "dubai", href: "travel-services/luxury-travel/" },
    ],
    servicesTitle: "Our worldwide services",
    services: [
      { title: "Worldwide Tours", text: "Custom FIT and special-interest journeys across continents.", image: "europe", href: "travel-services/outbound-travel/" },
      { title: "Luxury Travel", text: "High-end hotels, private touring, and exclusive experiences.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Hotels", text: "Global hotel reservations through partner networks.", image: "japan", href: "travel-services/hotel-reservations/" },
      { title: "Private Tours", text: "Private arrangements where destination partners allow.", image: "korea", href: "travel-services/private-tours/" },
      { title: "Corporate Travel", text: "Business and incentive travel beyond core regions.", image: "partner", href: "mice/corporate-group-travel/" },
      { title: "Travel Support", text: "Visa guidance, documentation, and journey coordination.", image: "egypt", href: "travel-services/visa-travel-support/" },
    ],
    whyTitle: "Why travel worldwide with us",
    why: [
      { title: "Global nature", text: "Parks, safaris, islands, and wilderness destinations worldwide." },
      { title: "Curated culture", text: "Heritage cities and local encounters curated with care." },
      { title: "Consistent luxury", text: "Consistent hotel and service standards across partner destinations." },
      { title: "Culinary journeys", text: "Culinary-led journeys and destination dining reservations." },
      { title: "City balance", text: "City programs that balance icons, retail, and downtime." },
      { title: "Safe adventure", text: "Expedition and soft-adventure options with safety-first partners." },
    ],
    seasonsTitle: "Best time to travel worldwide",
    seasonsLead: "Global seasons vary widely — we match hemisphere, wildlife calendars, and cruise windows to your goals.",
    seasons: [
      { title: "Plan by Hemisphere", text: "Summer and winter reverse between north and south — we advise by destination." },
      { title: "Wildlife & Expeditions", text: "Safaris and polar voyages follow specific seasonal windows for best experience." },
      { title: "Cruise Seasons", text: "Ocean and river cruises have peak and value seasons by region." },
      { title: "Travel Tip", text: "Long-haul trips benefit from stopovers — Middle East and Asia hubs are popular bridges." },
    ],
    experiencesTitle: "Suggested experiences",
    experiences: [
      { title: "Luxury Experiences", text: "Bucket-list stays and exclusive access arranged via partners.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Family Travel", text: "Multi-generational worldwide itineraries with comfort pacing.", image: "japan", href: "travel-services/outbound-travel/" },
      { title: "Adventure", text: "Safari, expedition, and nature-led journeys.", image: "egypt", href: "travel-services/private-tours/" },
      { title: "Romantic", text: "Honeymoon routes across islands, cities, and cruise holidays.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Corporate", text: "Global incentive and executive travel planning.", image: "partner", href: "mice/incentive-travel/" },
      { title: "Wellness", text: "Destination spas and restorative long-stay options.", image: "dest", href: "mice/corporate-retreats/" },
    ],
    gallery: ["egypt", "europe", "swiss", "dubai", "japan"],
    galleryTitle: "Worldwide journeys in frame",
    faqs: [
      { q: "Do you operate worldwide destinations yourselves?", a: "Core strength is Thailand and regional programs; worldwide trips are delivered through vetted partner networks under our planning desk." },
      { q: "Can you arrange luxury cruises?", a: "Yes — ocean and river cruises with pre- and post-cruise hotels and transfers." },
      { q: "Are polar expeditions available?", a: "Expedition-style polar journeys can be arranged subject to seasonal departure availability." },
      { q: "How do proposals work for worldwide trips?", a: "We confirm destination partners, hotel standards, and inclusions clearly before you commit." },
      { q: "Is visa support included?", a: "We provide guidance and checklists for required visas based on nationality and route." },
      { q: "Can worldwide trips start or end in Thailand?", a: "Yes. Many clients combine outbound worldwide travel with Thailand arrival or departure services." },
    ],
    related: [
      { title: "Europe", text: "Classic luxury Europe circuits.", href: "destinations/europe/", image: "europe" },
      { title: "Asia", text: "Regional Asia with strong partner coverage.", href: "destinations/asia/", image: "japan" },
      { title: "Thailand", text: "Home destination expertise and ground handling.", href: "destinations/thailand/", image: "dest" },
    ],
    ctaTitle: "Let's plan your worldwide journey",
    ctaText: "Share your dream destinations and travel window — our planning desk will prepare a global luxury proposal.",
  },
};

function iconCards(items, rel, ctaLabel) {
  return items
    .map((h, i) => {
      const icon = h.icon || pickIcon(h.title);
      return `<a class="dg-ts-card dg-dest-card-page dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${rel}${h.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, h.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(h.title)}</h3>
    <p>${esc(h.text)}</p>
    <span class="dg-ts-card__cta">${esc(ctaLabel)} <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");
}

function tileCards(items) {
  return items
    .map((w, i) => {
      const icon = w.icon || pickIcon(w.title, "badge-check");
      return `<article class="dg-ts-why__item dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}">
  ${ico(icon)}
  <h3>${esc(w.title)}</h3>
  <p>${esc(w.text)}</p>
</article>`;
    })
    .join("\n");
}

function renderDestinationPage(pageId, rel) {
  const p = withServiceMedia(pageId, PAGES[pageId]);
  if (!p) return null;

  const sectionIcon = PAGE_SECTION_ICONS[pageId] || "map-pin";
  const citiesLead =
    CITIES_LEADS[pageId] ||
    "Signature places and experiences we plan most often.";
  const servicesLead =
    SERVICES_LEADS[pageId] ||
    "Travel, corporate, MICE, and celebration services for this destination.";
  const experiencesLead =
    EXPERIENCES_LEADS[pageId] ||
    "Choose a travel mood — we shape the destination around it.";

  const cities = iconCards(p.cities, rel, "Explore");
  const services = iconCards(p.services, rel, "Learn more");
  const why = tileCards(p.why);
  const seasons = tileCards(p.seasons);
  const experiences = iconCards(p.experiences, rel, "Explore");

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
      return `<a class="dg-ts-card dg-dest-card-page dg-ts-reveal" href="${rel}${r.href}">
  <div class="dg-ts-card__media"><img src="${img(rel, r.image)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(r.title)}</h3>
    <p>${esc(r.text)}</p>
    <span class="dg-ts-card__cta">View destination <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");

  const overviewParas = p.overview.map((t) => `<p>${esc(t)}</p>`).join("\n");

  const trust = (p.why || [])
    .slice(0, 3)
    .map((w) => {
      const icon = w.icon || pickIcon(w.title, "badge-check");
      return `<li>
  ${ico(icon)}
  <div><strong>${esc(w.title)}</strong><span>${esc(w.text)}</span></div>
</li>`;
    })
    .join("\n");

  const promise = [
    { icon: sectionIcon, title: p.title, text: "Destination desk" },
    { icon: "hotel", title: "Premium stays", text: "Hotels & resorts" },
    { icon: "compass", title: "Local craft", text: "Tours & experiences" },
  ]
    .map(
      (item) => `<li class="dg-dest-promise__item dg-ts-reveal">
  ${ico(item.icon, "lg")}
  <div><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div>
</li>`
    )
    .join("\n");

  return `<article class="dg-ts dg-dest-page dg-theme--dest">
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

  <section class="dg-dest-promise" aria-label="Destination promise">
    <div class="dg-ts__wrap">
      <ul class="dg-dest-promise__grid">${promise}</ul>
    </div>
  </section>

  <section class="dg-ts-overview" id="overview">
    <div class="dg-ts__wrap">
      <div class="dg-ts-overview__grid">
        <div class="dg-ts-overview__copy dg-ts-reveal">
          ${sectionHead({
            eyebrow: "Destination Overview",
            title: p.overviewTitle,
            icon: sectionIcon,
            align: "left",
          })}
          ${overviewParas}
          <ul class="dg-ts-trust" aria-label="Destination strengths">${trust}</ul>
        </div>
        <figure class="dg-ts-overview__media dg-ts-reveal dg-ts-reveal-d1">
          <img src="${img(rel, p.overviewImage)}" alt="${esc(p.title)} destination" loading="lazy" />
          <figcaption class="dg-ts-overview__caption">
            <span>D&amp;G Holiday</span>
            <strong>${esc(p.title)}</strong>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="dg-ts-highlights" id="cities">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Explore",
        title: p.citiesTitle,
        lead: citiesLead,
        icon: "map",
      })}
      <div class="dg-ts-highlights__grid">${cities}</div>
    </div>
  </section>

  <section class="dg-ts-highlights dg-dest-services" id="services">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Our Services",
        title: p.servicesTitle,
        lead: servicesLead,
        icon: "briefcase-business",
      })}
      <div class="dg-ts-highlights__grid">${services}</div>
    </div>
  </section>

  <section class="dg-ts-why" id="why-visit">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Why Visit",
        title: p.whyTitle,
        lead: "What makes this destination compelling for discerning travelers.",
        icon: "sparkles",
      })}
      <div class="dg-ts-why__grid">${why}</div>
    </div>
  </section>

  <section class="dg-ts-why dg-dest-seasons" id="best-time">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Best Time To Visit",
        title: p.seasonsTitle,
        lead: p.seasonsLead,
        icon: "calendar-days",
      })}
      <div class="dg-ts-why__grid">${seasons}</div>
    </div>
  </section>

  <section class="dg-ts-highlights" id="experiences">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Suggested Experiences",
        title: p.experiencesTitle,
        lead: experiencesLead,
        icon: "compass",
      })}
      <div class="dg-ts-highlights__grid">${experiences}</div>
    </div>
  </section>

  <section class="dg-ts-gallery" id="gallery">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Photo Gallery",
        title: p.galleryTitle || "Destination gallery",
        lead: "Atmosphere and place — from journeys we plan most often.",
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
        lead: "Practical answers travelers ask before confirming dates.",
        icon: "circle-help",
      })}
      <div class="dg-ts-faq__list dg-ts-reveal dg-ts-reveal-d1">${faqs}</div>
    </div>
  </section>

  <section class="dg-ts-related" id="related">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Related Destinations",
        title: "Continue exploring",
        lead: "Other destination desks that pair well with this journey.",
        icon: "link",
      })}
      <div class="dg-ts-related__grid">${related}</div>
    </div>
  </section>

  ${renderPageCta({
    rel,
    title: p.ctaTitle || "Ready to plan your journey?",
    text:
      p.ctaText ||
      "Tell us where you want to go — our destination desk will prepare a tailored proposal.",
  })}
</article>`;
}

function hasDestinationPage(id) {
  return Boolean(PAGES[id]);
}

function listDestinationPageIds() {
  return Object.keys(PAGES);
}

function renderDestinationHubPage({ children, rel }) {
  const hubIcons = {
    thailand: "map-pinned",
    asia: "globe",
    europe: "landmark",
    "middle-east": "sun",
    worldwide: "earth",
  };

  const heroMap = {
    thailand: "dest",
    asia: "japan",
    europe: "europe",
    "middle-east": "dubai",
    worldwide: "egypt",
  };

  const cardsHtml = (children || [])
    .map((c, i) => {
      const key = heroMap[c.id] || "story";
      const icon = hubIcons[c.id] || "map-pin";
      return `<a class="dg-ts-card dg-dest-card-page dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}" href="${c.id}/">
  <div class="dg-ts-card__media"><img src="${img(rel, key)}" alt="" loading="lazy" /></div>
  <div class="dg-ts-card__body">
    <div class="dg-ts-card__top">${ico(icon)}</div>
    <h3>${esc(c.label)}</h3>
    <p>${esc(c.description || "")}</p>
    <span class="dg-ts-card__cta">Explore <i data-lucide="arrow-right" class="dg-lucide" aria-hidden="true"></i></span>
  </div>
</a>`;
    })
    .join("\n");

  return `<article class="dg-ts dg-dest-page dg-theme--dest">
  ${renderPageHero({
    title: "Destinations",
    subtitle:
      "Thailand, Asia, Europe, the Middle East, and worldwide luxury travel — planned with DMC precision.",
    breadcrumb: [
      { label: "Home", href: "index.html" },
      { label: "Destinations" },
    ],
    rel,
  })}

  <section class="dg-dest-promise" aria-label="Destination promise">
    <div class="dg-ts__wrap">
      <ul class="dg-dest-promise__grid">
        <li class="dg-dest-promise__item dg-ts-reveal">${ico("map-pinned", "lg")}<div><strong>Thailand home desk</strong><span>Local luxury delivery</span></div></li>
        <li class="dg-dest-promise__item dg-ts-reveal dg-ts-reveal-d1">${ico("globe", "lg")}<div><strong>Regional reach</strong><span>Asia to Europe &amp; Gulf</span></div></li>
        <li class="dg-dest-promise__item dg-ts-reveal dg-ts-reveal-d2">${ico("gem", "lg")}<div><strong>Premium standard</strong><span>Hotels, tours &amp; care</span></div></li>
      </ul>
    </div>
  </section>

  <section class="dg-ts-hub">
    <div class="dg-ts__wrap">
      <div class="dg-ts-section__head dg-ts-reveal">
        ${ico("earth", "lg")}
        <p class="dg-ts__eyebrow">Explore The World</p>
        <h2>Choose a destination</h2>
        <p class="dg-ts__lead">Same premium system on every page — clear proof and conversion-ready next steps.</p>
      </div>
      <div class="dg-ts-hub__grid">${cardsHtml}</div>
    </div>
  </section>
  ${renderPageCta({
    rel,
    title: "Ready to plan your journey?",
    text: "Tell us where you want to go — our destination desk will prepare a tailored proposal.",
  })}
</article>`;
}

module.exports = {
  renderDestinationPage,
  hasDestinationPage,
  listDestinationPageIds,
  renderDestinationHubPage,
  PAGES,
};
