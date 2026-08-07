/**
 * Travel Services + India Market page content + HTML renderer
 * Shared luxury DMC template; unique copy per page.
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

/** @type {Record<string, object>} */
const PAGES = {
  "inbound-travel": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Inbound Travel",
    sub: "Seamless Thailand ground handling for international guests and overseas agencies.",
    hero: "story",
    overviewTitle: "Welcome the world to Thailand",
    overview: [
      "D&G Holiday designs and operates inbound programs for agencies, corporates, and independent travelers who expect precise logistics and warm hospitality from the moment they land.",
      "From first airport greeting to final departure, our Thailand desk coordinates hotels, transfers, guides, attractions, and multilingual guest care as one accountable partner.",
    ],
    overviewImage: "dest",
    highlightsTitle: "Inbound strengths",
    highlights: [
      { title: "Airport Transfer", text: "Meet & greet, VIP vans, and coach movements timed to flight schedules.", image: "dubai", href: "travel-services/transportation-transfers/" },
      { title: "Hotels & Stays", text: "Curated city, beach, and resort inventory matched to your guest profile.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "Tours & Experiences", text: "Culture, nature, and signature Thailand days paced for each group.", image: "japan", href: "travel-services/group-tours/" },
      { title: "Transportation", text: "Private cars, coaches, and island logistics with vetted operators.", image: "korea", href: "travel-services/transportation-transfers/" },
      { title: "Professional Guides", text: "Licensed guides with language options for major source markets.", image: "europe", href: "travel-services/private-tours/" },
      { title: "Visa Guidance", text: "Entry requirement briefings and document support for smoother arrivals.", image: "partner", href: "travel-services/visa-travel-support/" },
    ],
    why: [
      { title: "Professional Team", text: "Inbound coordinators who speak agency language and protect guest comfort." },
      { title: "Tailor-made Programs", text: "Day-by-day planning shaped around your market, season, and budget." },
      { title: "Luxury Service", text: "Elevated options for VIP, honeymoon, and premium FIT arrivals." },
      { title: "Competitive Pricing", text: "Transparent ground packages with partner-ready quotations." },
      { title: "Fast Response", text: "Quick replies on availability, changes, and operational updates." },
      { title: "24/7 Support", text: "On-program duty coverage when flights shift or guests need help." },
    ],
    included: ["Airport transfers", "Hotel booking & confirmation", "Private or coach transportation", "Professional licensed guides", "Attraction tickets & activities", "Meals as per itinerary", "Insurance guidance", "Visa & entry consultation"],
    faqs: [
      { q: "Can you handle series groups and FIT in the same season?", a: "Yes. Our inbound desk runs parallel workflows for series coaches and private FIT so quality stays consistent." },
      { q: "Which languages can guides speak?", a: "English and Thai as standard, with Chinese, Hindi, and other languages arranged by destination and availability." },
      { q: "Do you provide meet & greet at all major airports?", a: "Bangkok, Phuket, Chiang Mai, and other gateways — with name boards, assistance, and transfer to hotel." },
      { q: "How far in advance should agencies book?", a: "Peak seasons benefit from 60–90 days’ notice; we also support shorter lead times when inventory allows." },
      { q: "Can itineraries include multiple islands?", a: "Yes. We plan ferry, flight, and coach connections with realistic buffers for guest comfort." },
      { q: "Is travel insurance included?", a: "We can advise and arrange insurance support; coverage depends on the program you select." },
    ],
    related: [
      { title: "Private Tours", text: "VIP pacing with private guides and cars.", href: "travel-services/private-tours/", image: "europe" },
      { title: "Group Tours", text: "Scalable operations for schools and companies.", href: "travel-services/group-tours/", image: "korea" },
      { title: "India Market", text: "Specialist desk for Indian travelers and weddings.", href: "india-market/", image: "dubai" },
    ],
  },

  "outbound-travel": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Outbound Travel",
    sub: "Curated international journeys for Thai travelers — flights, hotels, visas, and private touring.",
    hero: "europe",
    overviewTitle: "Open the world from Thailand",
    overview: [
      "Our outbound team builds international programs for leisure travelers, families, and corporate groups departing from Thailand — with clear documentation support and trusted overseas partners.",
      "Whether the brief is a first Europe trip or a multi-city Asia circuit, we balance flights, hotels, visas, insurance, and on-ground touring into one coherent journey.",
    ],
    overviewImage: "swiss",
    highlightsTitle: "Outbound essentials",
    highlights: [
      { title: "Flights", text: "Routing options and timing advice aligned to your travel window.", image: "dubai", href: "travel-services/outbound-travel/" },
      { title: "Hotels Abroad", text: "City and resort stays selected for location, comfort, and value.", image: "japan", href: "travel-services/hotel-reservations/" },
      { title: "Visa Support", text: "Document checklists and appointment guidance for key destinations.", image: "partner", href: "travel-services/visa-travel-support/" },
      { title: "Travel Insurance", text: "Protection options explained in plain language before departure.", image: "why", href: "travel-services/visa-travel-support/" },
      { title: "Private Tours", text: "Private guides and cars in selected overseas cities.", image: "europe", href: "travel-services/private-tours/" },
      { title: "Group Departures", text: "Escorted group options when shared travel fits the brief.", image: "korea", href: "travel-services/group-tours/" },
    ],
    why: [
      { title: "Trusted Overseas Partners", text: "DMC and hotel relationships that protect service quality abroad." },
      { title: "Clear Documentation", text: "Visa and entry requirements explained before you commit." },
      { title: "Tailor-made Options", text: "Private and family itineraries beyond fixed packages." },
      { title: "One Desk Accountability", text: "A single Thailand team owning flights, hotels, and touring." },
      { title: "Competitive Packages", text: "Balanced inclusions with transparent pricing." },
      { title: "Pre-departure Briefing", text: "Practical tips so travelers feel prepared on day one." },
    ],
    included: ["Flight arrangement support", "International hotel booking", "Visa consultation", "Travel insurance options", "Private or group touring", "Airport transfers abroad (as booked)", "Itinerary documentation", "Emergency contact pathway"],
    faqs: [
      { q: "Do you arrange visas for every country?", a: "We support popular destinations with clear checklists; embassy rules vary and final approval rests with authorities." },
      { q: "Can outbound trips be fully private?", a: "Yes. Private touring and transfers can be arranged in selected cities and regions." },
      { q: "Are flights refundable?", a: "Airline rules differ by fare class — we confirm conditions before ticketing." },
      { q: "Do you help with Schengen or UK visas?", a: "We provide document guidance and appointment support for common European routes." },
      { q: "Can companies book outbound incentives?", a: "Absolutely. We design reward trips with hotels, activities, and gala options abroad." },
      { q: "What if plans change after deposit?", a: "We review airline and hotel terms and propose the best recovery path." },
    ],
    related: [
      { title: "Visa & Travel Support", text: "Documents, insurance, and entry briefings.", href: "travel-services/visa-travel-support/", image: "partner" },
      { title: "Luxury Travel", text: "Elevated hotels and experiences abroad.", href: "travel-services/luxury-travel/", image: "swiss" },
      { title: "Group Tours", text: "Escorted group departures when preferred.", href: "travel-services/group-tours/", image: "japan" },
    ],
  },

  "domestic-travel": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Domestic Travel",
    sub: "Discover Thailand with weekend escapes, family journeys, and luxury domestic itineraries.",
    hero: "dest",
    overviewTitle: "Thailand, designed with intention",
    overview: [
      "Domestic travel with D&G Holiday goes beyond generic packages — we craft pacing for Bangkok weekends, northern culture, southern beaches, and multi-city circuits for families and corporates.",
      "Whether you need a two-night reset or a week-long luxury Thailand journey, our local knowledge keeps logistics light and experiences rich.",
    ],
    overviewImage: "story",
    highlightsTitle: "Domestic highlights",
    highlights: [
      { title: "Thailand Destinations", text: "Bangkok, Chiang Mai, Phuket, Krabi, Samui, Pattaya, and beyond.", image: "story", href: "destinations/thailand/" },
      { title: "Weekend Trips", text: "Short breaks with smart transfers and quality stays.", image: "why", href: "travel-services/domestic-travel/" },
      { title: "Luxury Trips", text: "Boutique resorts, private cars, and elevated dining.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "Family Trips", text: "Kid-friendly pacing, connecting rooms, and soft adventure.", image: "japan", href: "travel-services/private-tours/" },
      { title: "Culture Circuits", text: "Temples, markets, and craft experiences with licensed guides.", image: "korea", href: "travel-services/private-tours/" },
      { title: "Island Escapes", text: "Beach time with ferry and flight connections planned carefully.", image: "dubai", href: "destinations/thailand/" },
    ],
    why: [
      { title: "Local Expertise", text: "On-ground teams who know seasonal crowds and quieter alternatives." },
      { title: "Flexible Duration", text: "Weekend, midweek, or extended domestic journeys." },
      { title: "Family Ready", text: "Practical rooming and activity choices for all ages." },
      { title: "Luxury Options", text: "Premium resorts and private touring when you want more." },
      { title: "Corporate Friendly", text: "Team outings and retreats with clear logistics." },
      { title: "Fast Quoting", text: "Clear domestic proposals with inclusions listed upfront." },
    ],
    included: ["Domestic hotels", "Private or shared transfers", "Guide services (as booked)", "Selected meals", "Attraction tickets", "Island connections", "Travel briefings", "On-trip support"],
    faqs: [
      { q: "Can you arrange same-week domestic trips?", a: "Often yes for Bangkok and major beaches — subject to hotel and transport availability." },
      { q: "Do you cover both north and south in one trip?", a: "Yes, with flight connections and realistic day plans." },
      { q: "Are domestic trips suitable for elderly travelers?", a: "We adjust walking loads, hotel locations, and vehicle types to the group." },
      { q: "Can schools book domestic study tours?", a: "Yes — with coach logistics, permissions support, and educational pacing." },
      { q: "Do prices include domestic flights?", a: "Optional. We can include or exclude flights based on your preference." },
      { q: "Is private touring available domestically?", a: "Yes. Private cars and guides are a core domestic option." },
    ],
    related: [
      { title: "Private Tours", text: "Personal pacing across Thailand.", href: "travel-services/private-tours/", image: "europe" },
      { title: "Luxury Travel", text: "Premium resorts and experiences.", href: "travel-services/luxury-travel/", image: "swiss" },
      { title: "Group Tours", text: "Company and school domestic groups.", href: "travel-services/group-tours/", image: "korea" },
    ],
  },

  "group-tours": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Group Tours",
    sub: "Scalable operations for corporate, government, school, and large leisure groups.",
    hero: "korea",
    overviewTitle: "Groups that move with confidence",
    overview: [
      "Large groups need more than seats on a coach — they need choreography. D&G Holiday runs corporate, government, school, and association groups with clear manifests, timing buffers, and dedicated coordinators.",
      "From 15 guests to 200+, we design routes, hotels, meals, and activities that keep the group together without feeling rushed.",
    ],
    overviewImage: "japan",
    highlightsTitle: "Group capabilities",
    highlights: [
      { title: "Corporate Groups", text: "Team travel with meeting space and evening programs.", image: "dubai", href: "mice/corporate-group-travel/" },
      { title: "Government Groups", text: "Protocol-aware logistics and reliable documentation support.", image: "partner", href: "travel-services/group-tours/" },
      { title: "Schools", text: "Educational pacing, safety briefings, and coach operations.", image: "why", href: "travel-services/domestic-travel/" },
      { title: "Large Groups", text: "Multi-coach movements, wave check-ins, and venue capacity planning.", image: "europe", href: "travel-services/group-tours/" },
      { title: "Series Tours", text: "Repeatable inbound series with stable supplier frameworks.", image: "story", href: "travel-services/inbound-travel/" },
      { title: "Incentive Groups", text: "Reward travel with gala and experience upgrades.", image: "swiss", href: "mice/incentive-travel/" },
    ],
    why: [
      { title: "Dedicated Coordinators", text: "One ops owner for manifests, timing, and supplier briefings." },
      { title: "Coach Expertise", text: "Fleet sizing and route planning for comfort and punctuality." },
      { title: "Hotel Blocks", text: "Rooming lists and group check-in handled professionally." },
      { title: "Safety Mindset", text: "Practical risk awareness across transport and activities." },
      { title: "Transparent Pricing", text: "Per-person structures that finance and procurement can review." },
      { title: "On-ground Presence", text: "Tour leaders and local teams visible when groups need them." },
    ],
    included: ["Group hotels", "Coach or van charter", "Tour leader / coordinator", "Guides as required", "Meal programs", "Attraction tickets", "Welcome / farewell options", "Manifest & rooming support"],
    faqs: [
      { q: "What is your minimum group size?", a: "Typically from 15 travelers; smaller private groups can use our Private Tours desk." },
      { q: "Can you split large groups across hotels?", a: "Yes, when inventory requires — with shuttle plans and clear communication." },
      { q: "Do you support government protocol needs?", a: "We plan seating, timing, and hospitality touchpoints with protocol in mind." },
      { q: "How do you handle dietary requirements?", a: "Collected in advance and briefed to hotels and restaurants." },
      { q: "Can groups mix meetings and touring?", a: "Yes — common for corporate and association programs." },
      { q: "What happens if a coach is delayed?", a: "Duty teams re-sequence stops and keep group leaders updated in real time." },
    ],
    related: [
      { title: "Corporate Group Travel", text: "MICE-ready corporate movements.", href: "mice/corporate-group-travel/", image: "dubai" },
      { title: "Inbound Travel", text: "Overseas groups arriving in Thailand.", href: "travel-services/inbound-travel/", image: "story" },
      { title: "Indian Group Tours", text: "Specialist leisure and student groups.", href: "india-market/indian-group-tours/", image: "partner" },
    ],
  },

  "private-tours": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Private Tours",
    sub: "Tailor-made journeys with private guides, VIP pacing, and discreet luxury service.",
    hero: "swiss",
    overviewTitle: "Travel on your own terms",
    overview: [
      "Private tours with D&G Holiday are built around how you want the day to feel — unhurried mornings, hidden restaurants, private guides, and cars that wait when plans spontaneously change.",
      "Ideal for couples, families, executives, and VIP guests who prefer privacy over fixed group schedules.",
    ],
    overviewImage: "europe",
    highlightsTitle: "Private tour signatures",
    highlights: [
      { title: "Tailor-made Itineraries", text: "Day plans written around interests, energy, and hotel location.", image: "japan", href: "travel-services/private-tours/" },
      { title: "Luxury Touches", text: "Premium vehicles, reserved tables, and elevated experiences.", image: "swiss", href: "travel-services/luxury-travel/" },
      { title: "VIP Handling", text: "Fast-track style assistance and private meet & greet options.", image: "dubai", href: "travel-services/transportation-transfers/" },
      { title: "Private Guide", text: "Licensed guides dedicated to your party alone.", image: "story", href: "travel-services/private-tours/" },
      { title: "Family Private Travel", text: "Soft adventure and culture balanced for every age.", image: "why", href: "travel-services/domestic-travel/" },
      { title: "Photography Days", text: "Sunrise temples, markets, and scenic stops timed for light.", image: "korea", href: "gallery/" },
    ],
    why: [
      { title: "True Flexibility", text: "Change a stop without waiting for a coach full of strangers." },
      { title: "Discreet Service", text: "Professional teams who protect privacy for VIP guests." },
      { title: "Local Access", text: "Experiences that fixed tours rarely reach." },
      { title: "Quality Vehicles", text: "Private cars and vans matched to party size." },
      { title: "Senior Guides", text: "Storytelling and cultural depth, not rushed checklists." },
      { title: "Concierge Mindset", text: "Reservations and special requests handled in advance." },
    ],
    included: ["Private vehicle", "Private licensed guide", "Custom day planning", "Hotel pick-up & drop-off", "Attraction tickets (as booked)", "Meal reservations support", "Bottled water onboard", "WhatsApp-style trip support"],
    faqs: [
      { q: "How many people fit a private tour?", a: "From solo travelers to family vans — we size the vehicle to your party." },
      { q: "Can we customize every day?", a: "Yes. The itinerary is a living plan refined before and during travel." },
      { q: "Are private tours available outside Bangkok?", a: "Nationwide — Chiang Mai, Phuket, Krabi, Samui, and more." },
      { q: "Do you offer multi-day private circuits?", a: "Yes, with hotel changes and intercity transfers included in the plan." },
      { q: "Can executives combine touring with meetings?", a: "We schedule around agendas and keep transport waiting as needed." },
      { q: "Is a guide mandatory?", a: "Recommended for culture days; driver-only options available for simple transfers." },
    ],
    related: [
      { title: "Luxury Travel", text: "Concierge-level Thailand journeys.", href: "travel-services/luxury-travel/", image: "swiss" },
      { title: "Transportation", text: "VIP vans and private cars.", href: "travel-services/transportation-transfers/", image: "dubai" },
      { title: "Inbound Travel", text: "Full ground handling for arrivals.", href: "travel-services/inbound-travel/", image: "story" },
    ],
  },

  "luxury-travel": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Luxury Travel",
    sub: "Exceptional stays, private aviation, yachts, fine dining, and white-glove concierge care.",
    hero: "dubai",
    overviewTitle: "Luxury without noise",
    overview: [
      "Luxury travel at D&G Holiday is quiet confidence — the right suite, the right table, the right transfer, and a team that anticipates needs before they are spoken.",
      "From private jets and helicopter hops to yacht afternoons and chef’s-table evenings, we compose journeys for guests who expect discretion and excellence.",
    ],
    overviewImage: "swiss",
    highlightsTitle: "Luxury signatures",
    highlights: [
      { title: "Luxury Hotels", text: "Iconic resorts and design-led stays across Thailand and beyond.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "Private Jets", text: "Charter coordination for time-sensitive VIP movements.", image: "dubai", href: "travel-services/luxury-travel/" },
      { title: "Yachts", text: "Private charters for islands, celebrations, and sunset hosting.", image: "story", href: "travel-services/luxury-travel/" },
      { title: "Fine Dining", text: "Reserved tables and curated culinary evenings.", image: "europe", href: "travel-services/luxury-travel/" },
      { title: "Helicopter", text: "Scenic transfers and exclusive aerial experiences where available.", image: "japan", href: "travel-services/transportation-transfers/" },
      { title: "Concierge", text: "Hard-to-get reservations, shopping hosts, and personal assistants.", image: "partner", href: "travel-services/private-tours/" },
    ],
    why: [
      { title: "Access", text: "Relationships that open rooms, tables, and experiences in peak periods." },
      { title: "Discretion", text: "Teams trained for privacy and low-profile VIP handling." },
      { title: "Precision", text: "Minute-level timing across aviation, yacht, and hotel handovers." },
      { title: "Design Eye", text: "Itineraries that feel composed, not crowded." },
      { title: "On-call Support", text: "A luxury desk reachable when plans evolve overnight." },
      { title: "Global Taste", text: "Standards aligned with international luxury travelers." },
    ],
    included: ["Luxury hotel booking", "Private transfers / VIP cars", "Concierge reservations", "Private guide options", "Yacht or aviation coordination (as booked)", "Fine dining bookings", "Personalized welcome amenities", "Dedicated trip manager"],
    faqs: [
      { q: "Can you book ultra-luxury resorts in peak season?", a: "We work early with preferred partners; some properties require long lead times." },
      { q: "Do you arrange private jet charters?", a: "Yes — we coordinate with aviation partners based on route and aircraft needs." },
      { q: "Are yacht charters private?", a: "Private charters are available for day and multi-day island programs." },
      { q: "Can luxury trips include wellness?", a: "Spa resorts, retreat add-ons, and quiet pacing are frequently requested." },
      { q: "Is butler or host service available?", a: "Personal hosts can be arranged for shopping, dining, and day programs." },
      { q: "Do you serve ultra-high-net-worth travelers?", a: "Yes, with discreet handling and senior management oversight." },
    ],
    related: [
      { title: "Private Tours", text: "VIP pacing on the ground.", href: "travel-services/private-tours/", image: "europe" },
      { title: "Hotel Reservations", text: "Luxury and boutique inventory.", href: "travel-services/hotel-reservations/", image: "swiss" },
      { title: "Destination Weddings", text: "Celebration-level luxury logistics.", href: "destination-weddings/", image: "story" },
    ],
  },

  "hotel-reservations": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Hotel Reservations",
    sub: "Luxury hotels, resorts, boutique stays, and corporate inventory through trusted partners.",
    hero: "swiss",
    overviewTitle: "Stays confirmed with care",
    overview: [
      "Hotel selection shapes the entire journey. Our reservations desk matches guest profiles to luxury hotels, beach resorts, boutique properties, and corporate-ready city stays — in Thailand and through worldwide partners.",
      "Agencies and corporates receive clear confirmations, rate integrity, and alternatives when preferred inventory is tight.",
    ],
    overviewImage: "dubai",
    highlightsTitle: "Stay categories",
    highlights: [
      { title: "Luxury Hotels", text: "Flagship brands and elevated service standards.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "Resorts", text: "Beach and wellness escapes with leisure facilities.", image: "story", href: "travel-services/domestic-travel/" },
      { title: "Boutique Hotels", text: "Design-led stays with character and location advantage.", image: "japan", href: "travel-services/hotel-reservations/" },
      { title: "Corporate Hotels", text: "Meeting space, reliable Wi-Fi, and business districts.", image: "europe", href: "mice/meetings/" },
      { title: "Worldwide Partners", text: "Outbound hotel booking through trusted networks.", image: "korea", href: "travel-services/outbound-travel/" },
      { title: "Group Blocks", text: "Rooming lists and group check-in coordination.", image: "partner", href: "travel-services/group-tours/" },
    ],
    why: [
      { title: "Curated Inventory", text: "We recommend stays that fit the trip story — not just the cheapest rate." },
      { title: "Partner Rates", text: "Access to contracted and special rates where available." },
      { title: "Fast Alternatives", text: "Backup options when peak dates sell out." },
      { title: "Group Fluency", text: "Blocks, cut-offs, and rooming handled professionally." },
      { title: "Quality Checks", text: "Location, reviews, and service notes before we propose." },
      { title: "One Invoice Path", text: "Hotels packaged with transfers and touring when needed." },
    ],
    included: ["Hotel search & shortlist", "Rate confirmation", "Booking vouchers", "Special request handling", "Group block support", "Cancellation advice", "Alternative options", "Package with transfers"],
    faqs: [
      { q: "Do you book only Thailand hotels?", a: "Thailand is our core; outbound hotels are arranged through partner networks." },
      { q: "Can you secure connecting rooms?", a: "Yes, subject to hotel inventory — we request early for families." },
      { q: "Are deposits refundable?", a: "Depends on hotel policy and rate type; we clarify before confirming." },
      { q: "Do you handle MICE room blocks?", a: "Yes, including attrition tracking and group check-in plans." },
      { q: "Can agencies white-label hotel packages?", a: "We support B2B packaging with partner-ready documentation." },
      { q: "How do you choose boutique hotels?", a: "Location, design, service consistency, and guest fit — not trend alone." },
    ],
    related: [
      { title: "Luxury Travel", text: "Ultra-premium stay experiences.", href: "travel-services/luxury-travel/", image: "swiss" },
      { title: "Inbound Travel", text: "Hotels inside full Thailand programs.", href: "travel-services/inbound-travel/", image: "story" },
      { title: "Transportation", text: "Transfers paired with every stay.", href: "travel-services/transportation-transfers/", image: "dubai" },
    ],
  },

  "transportation-transfers": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Transportation & Transfers",
    sub: "Airport, hotel, VIP van, private car, coach, and boat transfers — timed with precision.",
    hero: "dubai",
    overviewTitle: "Movement without friction",
    overview: [
      "Transfers are where first impressions form. D&G Holiday runs airport and hotel transfers with flight monitoring, clear name boards, and vehicle standards matched to FIT, VIP, and group needs.",
      "From private cars to coaches and boat connections, our transport desk keeps guests moving calmly between gateways, hotels, and experiences.",
    ],
    overviewImage: "europe",
    highlightsTitle: "Transfer options",
    highlights: [
      { title: "Airport Transfer", text: "Meet & greet with flight tracking and hotel drop-off.", image: "dubai", href: "travel-services/transportation-transfers/" },
      { title: "Hotel Transfer", text: "Inter-hotel and city point-to-point movements.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "VIP Van", text: "Executive vans for small groups and premium FIT.", image: "japan", href: "travel-services/luxury-travel/" },
      { title: "Private Car", text: "Sedans and SUVs with professional drivers.", image: "europe", href: "travel-services/private-tours/" },
      { title: "Coach", text: "Group coaches with experienced drivers and route planning.", image: "korea", href: "travel-services/group-tours/" },
      { title: "Boat Transfer", text: "Island and pier connections coordinated with hotel timing.", image: "story", href: "travel-services/domestic-travel/" },
    ],
    why: [
      { title: "Flight Monitoring", text: "Drivers adjusted when arrivals shift." },
      { title: "Vehicle Standards", text: "Clean, air-conditioned fleets sized correctly." },
      { title: "VIP Discretion", text: "Low-profile handling for executives and celebrities." },
      { title: "Group Control", text: "Multi-vehicle waves managed by coordinators." },
      { title: "Island Know-how", text: "Ferry and boat links timed to avoid long waits." },
      { title: "24/7 Duty Desk", text: "Support when late flights need new plans." },
    ],
    included: ["Flight monitoring", "Meet & greet", "Private or shared vehicle", "Driver waiting time (policy-based)", "Child seats on request", "Bottled water", "Boat transfer coordination", "Night arrival coverage"],
    faqs: [
      { q: "Do you track delayed flights?", a: "Yes. We monitor major gateways and update driver dispatch accordingly." },
      { q: "Are child seats available?", a: "On request — please advise ages when booking." },
      { q: "Can one van serve a family with luggage?", a: "We size vehicles for passengers and bags; oversized luggage should be noted." },
      { q: "Do you offer hourly private cars?", a: "Yes for city touring and flexible VIP agendas." },
      { q: "How early should coaches be booked?", a: "Peak dates benefit from early reservation, especially for large groups." },
      { q: "Are boat transfers private?", a: "Private and shared options depend on route and season." },
    ],
    related: [
      { title: "Inbound Travel", text: "Transfers inside full arrival programs.", href: "travel-services/inbound-travel/", image: "story" },
      { title: "Private Tours", text: "Cars with guides for the full day.", href: "travel-services/private-tours/", image: "europe" },
      { title: "Luxury Travel", text: "VIP vehicles and aviation links.", href: "travel-services/luxury-travel/", image: "dubai" },
    ],
  },

  "visa-travel-support": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "Visa & Travel Support",
    sub: "Visa guidance, travel documents, insurance, and entry-requirement consultation.",
    hero: "partner",
    overviewTitle: "Clarity before you travel",
    overview: [
      "Cross-border travel succeeds when documents are right. Our support desk helps agencies and travelers understand visa pathways, entry rules, insurance options, and the paperwork rhythm before departure.",
      "We do not replace embassies — we prepare you to meet their requirements with fewer surprises.",
    ],
    overviewImage: "why",
    highlightsTitle: "Support services",
    highlights: [
      { title: "Visa Guidance", text: "Checklists and process overviews for popular destinations.", image: "europe", href: "travel-services/visa-travel-support/" },
      { title: "Travel Documents", text: "Passport validity checks and supporting letter advice.", image: "partner", href: "travel-services/outbound-travel/" },
      { title: "Insurance", text: "Coverage options explained before you fly.", image: "swiss", href: "travel-services/visa-travel-support/" },
      { title: "Entry Requirements", text: "Briefings on arrival cards, health rules, and transit notes.", image: "japan", href: "travel-services/inbound-travel/" },
      { title: "Consultation", text: "One-to-one sessions for complex multi-country trips.", image: "dubai", href: "contact/" },
      { title: "Corporate Support", text: "Document packs for company travelers and groups.", image: "korea", href: "mice/corporate-group-travel/" },
    ],
    why: [
      { title: "Plain Language", text: "Requirements translated into actionable steps." },
      { title: "Up-to-date Briefs", text: "We monitor common route changes that affect travelers." },
      { title: "Outbound Integration", text: "Visa support tied to the trip you are booking." },
      { title: "Group Document Control", text: "Shared checklists for schools and companies." },
      { title: "Risk Awareness", text: "Honest notes when timelines are tight." },
      { title: "Partner Desk Access", text: "Agencies get structured answers for their clients." },
    ],
    included: ["Visa checklist", "Document review guidance", "Appointment tips", "Insurance options", "Entry requirement briefing", "Cover letter advice (where relevant)", "Travel timeline planning", "Follow-up consultation"],
    faqs: [
      { q: "Do you guarantee visa approval?", a: "No embassy decision can be guaranteed. We help you prepare a complete, organized application." },
      { q: "Can you submit applications for us?", a: "Support levels vary by destination and traveler type — we confirm the suitable pathway case by case." },
      { q: "How early should we start visa work?", a: "Many destinations need several weeks; peak seasons need more buffer." },
      { q: "Do you help inbound guests with Thailand entry rules?", a: "Yes — we brief agencies on common entry requirements for arriving visitors." },
      { q: "Is travel insurance mandatory?", a: "Not always, but strongly recommended; some visas or activities require it." },
      { q: "Can corporates get bulk guidance?", a: "Yes. We prepare shared briefings for employee groups." },
    ],
    related: [
      { title: "Outbound Travel", text: "International trips that need documents.", href: "travel-services/outbound-travel/", image: "europe" },
      { title: "Inbound Travel", text: "Arrival-ready Thailand programs.", href: "travel-services/inbound-travel/", image: "story" },
      { title: "Contact", text: "Speak with our support desk.", href: "contact/", image: "partner" },
    ],
  },

  "india-market": {
    section: "Travel Services",
    sectionHref: "travel-services/",
    title: "India Market",
    sub: "Specialist Thailand hosting for Indian travelers — leisure, corporate, wedding, luxury, FIT, and groups.",
    hero: "dubai",
    overviewTitle: "A desk built for India",
    overview: [
      "India is a priority market for D&G Holiday. We combine Thailand destination strength with cultural fluency, Hindi-speaking support, vegetarian catering pathways, and wedding-scale logistics.",
      "From FIT couples to corporate incentives and destination weddings, our India desk understands expectations around hospitality, cuisine, ceremony timing, and group energy.",
    ],
    overviewImage: "partner",
    highlightsTitle: "India market focus",
    highlights: [
      { title: "Indian Travelers", text: "Leisure programs tuned to family and celebration travel styles.", image: "story", href: "india-market/indian-group-tours/" },
      { title: "Corporate", text: "Meetings, offsites, and business hospitality in Thailand.", image: "dubai", href: "india-market/indian-corporate-groups/" },
      { title: "Wedding", text: "Multi-day destination weddings with venue and guest logistics.", image: "swiss", href: "india-market/indian-wedding-services/" },
      { title: "Luxury", text: "Premium villas, private dining, and VIP handling.", image: "europe", href: "travel-services/luxury-travel/" },
      { title: "FIT", text: "Private touring with cultural and culinary preferences respected.", image: "japan", href: "travel-services/private-tours/" },
      { title: "Groups", text: "Leisure, student, and pilgrimage-style group operations.", image: "korea", href: "india-market/indian-group-tours/" },
    ],
    why: [
      { title: "Cultural Fluency", text: "Teams who understand ceremony, cuisine, and guest care expectations." },
      { title: "Hindi Support", text: "Airport, guide, and coordinator options for smoother communication." },
      { title: "Catering Pathways", text: "North Indian, South Indian, vegetarian, Jain, and Halal partners." },
      { title: "Wedding Scale", text: "Hotels and venues that can host multi-function celebrations." },
      { title: "Agency Partnership", text: "B2B quoting for India-based agencies and planners." },
      { title: "End-to-end Ownership", text: "Travel, events, and catering under one Thailand desk." },
    ],
    included: ["India-market consultation", "Hotel & venue shortlists", "Group or FIT planning", "Hindi-speaking support options", "Catering coordination", "Transfer & guide planning", "Wedding logistics pathway", "Dedicated partner contact"],
    faqs: [
      { q: "Do you only serve Indian nationals?", a: "We specialize in India-market needs while welcoming all travelers who want this service style." },
      { q: "Can you handle large wedding guest lists?", a: "Yes — with multi-hotel rooming and transfer waves." },
      { q: "Is vegetarian catering widely available?", a: "We work with specialized caterers and hotel kitchens experienced in Indian menus." },
      { q: "Do you support agents in India?", a: "Yes. Our B2B desk provides partner-ready proposals." },
      { q: "Are Hindi guides available in Phuket and Bangkok?", a: "Subject to dates — we confirm language coverage when quoting." },
      { q: "Can corporate and leisure be combined?", a: "Common for incentives that mix meetings, touring, and gala evenings." },
    ],
    related: [
      { title: "Indian Wedding Services", text: "Destination wedding operations.", href: "india-market/indian-wedding-services/", image: "swiss" },
      { title: "Indian Incentive Travel", text: "Reward programs in Thailand.", href: "india-market/indian-incentive-travel/", image: "dubai" },
      { title: "Hindi-speaking Support", text: "Guides and coordinators.", href: "india-market/hindi-speaking-support/", image: "partner" },
    ],
  },

  "indian-group-tours": {
    section: "India Market",
    sectionHref: "india-market/",
    title: "Indian Group Tours",
    sub: "Leisure, student, pilgrimage-style, and family groups hosted with cultural care in Thailand.",
    hero: "story",
    overviewTitle: "Groups that feel looked after",
    overview: [
      "Indian group tours thrive when cuisine, pacing, shopping time, and family dynamics are understood. Our desk designs leisure, student, pilgrimage-style, and multi-generation itineraries with the right hotels and meal plans.",
      "Coaches, guides, and attraction tickets are coordinated so leaders can focus on the guests — not the logistics.",
    ],
    overviewImage: "dest",
    highlightsTitle: "Group styles",
    highlights: [
      { title: "Leisure Groups", text: "Beaches, cities, and signature Thailand experiences.", image: "story", href: "india-market/indian-group-tours/" },
      { title: "Students", text: "Educational pacing with safety and supervision in mind.", image: "korea", href: "travel-services/group-tours/" },
      { title: "Pilgrimage-style", text: "Temple circuits and reflective cultural days.", image: "japan", href: "travel-services/domestic-travel/" },
      { title: "Family Groups", text: "Multi-age comfort, connecting rooms, and soft adventure.", image: "why", href: "travel-services/private-tours/" },
      { title: "Shopping Days", text: "Structured mall and market time without rushing meals.", image: "dubai", href: "india-market/" },
      { title: "Photo Moments", text: "Iconic stops timed for group photography.", image: "europe", href: "gallery/" },
    ],
    why: [
      { title: "Cuisine First", text: "Meal plans that respect vegetarian and regional preferences." },
      { title: "Group Rhythm", text: "Shopping, temples, and beaches balanced sensibly." },
      { title: "Language Options", text: "Hindi-speaking support where available." },
      { title: "Leader Tools", text: "Manifests, rooming, and daily briefings for tour leaders." },
      { title: "Value Engineering", text: "Strong inclusions without compromising guest comfort." },
      { title: "Festival Awareness", text: "Seasonal planning around Indian holiday travel peaks." },
    ],
    included: ["Group hotels", "Coach transport", "Guides", "Meal program options", "Attraction tickets", "Airport transfers", "Tour leader support", "Daily operations briefing"],
    faqs: [
      { q: "Can menus be fully vegetarian?", a: "Yes — we plan with hotels and caterers experienced in Indian vegetarian service." },
      { q: "Do you allow free-time shopping blocks?", a: "Yes, with meeting points and transport standby options." },
      { q: "Are student groups accepted?", a: "Yes, with supervision ratios and safety briefings." },
      { q: "Can Jain meals be arranged?", a: "Available through specialized catering partners on request." },
      { q: "What group size works best?", a: "From about 20 guests upward for coach efficiency; smaller parties can go private." },
      { q: "Do you provide Hindi-speaking guides?", a: "Subject to destination and dates — confirmed at quotation." },
    ],
    related: [
      { title: "Indian Catering", text: "Cuisine for groups and events.", href: "india-market/indian-catering/", image: "partner" },
      { title: "Group Tours", text: "Broader group operations desk.", href: "travel-services/group-tours/", image: "korea" },
      { title: "Hindi-speaking Support", text: "Language-enabled guest care.", href: "india-market/hindi-speaking-support/", image: "why" },
    ],
  },

  "indian-corporate-groups": {
    section: "India Market",
    sectionHref: "india-market/",
    title: "Indian Corporate Groups",
    sub: "Meetings, corporate events, incentives, and business travel hosted in Thailand.",
    hero: "europe",
    overviewTitle: "Business travel with hospitality depth",
    overview: [
      "Indian corporates choosing Thailand need meeting reliability plus memorable hospitality. We deliver agendas that balance boardrooms, team experiences, and evening programs — with dietary care and executive transfers.",
      "From compact leadership offsites to multi-day conferences, our corporate desk keeps timing tight and guest experience warm.",
    ],
    overviewImage: "dubai",
    highlightsTitle: "Corporate focus",
    highlights: [
      { title: "Meetings", text: "Venues, AV partners, and coffee-break precision.", image: "europe", href: "mice/meetings/" },
      { title: "Corporate Events", text: "Award nights, launches, and leadership dinners.", image: "swiss", href: "events/" },
      { title: "Incentive", text: "Reward travel with touring and celebration peaks.", image: "dubai", href: "india-market/indian-incentive-travel/" },
      { title: "Business Travel", text: "Executive stays and point-to-point transfers.", image: "japan", href: "travel-services/hotel-reservations/" },
      { title: "Team Building", text: "Activities that energize without exhausting the agenda.", image: "korea", href: "mice/team-building/" },
      { title: "Delegate Care", text: "Registration flow, rooming, and dietary tracking.", image: "partner", href: "mice/seminars-conferences/" },
    ],
    why: [
      { title: "Agenda Discipline", text: "Programs that start on time and protect meeting hours." },
      { title: "Executive Handling", text: "VIP transfers and discreet support for leadership." },
      { title: "Cuisine Confidence", text: "Indian and international menus for diverse teams." },
      { title: "One Contract Path", text: "Hotels, venues, and transport under coordinated delivery." },
      { title: "Brand Presentation", text: "Spaces and run-of-show that reflect corporate standards." },
      { title: "Rapid Revisions", text: "Agenda changes absorbed without chaos." },
    ],
    included: ["Venue sourcing", "Hotel blocks", "Meeting packages", "AV coordination", "Transfers", "Delegate materials support", "Dietary management", "On-site coordinators"],
    faqs: [
      { q: "Can you host hybrid meetings?", a: "We coordinate venues with reliable connectivity and AV partners." },
      { q: "Do you sign NDAs?", a: "Confidential handling is standard for corporate programs; formal NDA processes available." },
      { q: "How large a conference can you support?", a: "From leadership retreats to multi-hundred delegate events — scaled by venue." },
      { q: "Are alcohol-free gala options available?", a: "Yes. Menus and beverage plans follow your company policy." },
      { q: "Can spouses join incentive days?", a: "Spouse programs can be designed alongside the main agenda." },
      { q: "Do you provide Hindi-speaking staff onsite?", a: "Available on request for key touchpoints." },
    ],
    related: [
      { title: "Indian Incentive Travel", text: "Reward journeys and galas.", href: "india-market/indian-incentive-travel/", image: "dubai" },
      { title: "Meetings", text: "MICE meeting operations.", href: "mice/meetings/", image: "europe" },
      { title: "Corporate Group Travel", text: "Broader corporate movements.", href: "mice/corporate-group-travel/", image: "korea" },
    ],
  },

  "indian-incentive-travel": {
    section: "India Market",
    sectionHref: "india-market/",
    title: "Indian Incentive Travel",
    sub: "Reward programs, luxury trips, corporate retreats, and gala dinners in Thailand.",
    hero: "swiss",
    overviewTitle: "Rewards that feel earned",
    overview: [
      "Incentive travel should feel like a celebration, not another meeting. We design Thailand reward programs with luxury stays, signature experiences, retreat energy, and gala evenings that photograph beautifully and run on time.",
      "Corporate planners get clear budgets, brandable moments, and guest care that matches the achievement being honored.",
    ],
    overviewImage: "dubai",
    highlightsTitle: "Incentive elements",
    highlights: [
      { title: "Reward Programs", text: "Multi-day journeys structured around recognition peaks.", image: "swiss", href: "india-market/indian-incentive-travel/" },
      { title: "Luxury Trips", text: "Premium resorts and private experiences.", image: "europe", href: "travel-services/luxury-travel/" },
      { title: "Corporate Retreat", text: "Strategy days balanced with wellness and leisure.", image: "japan", href: "mice/corporate-retreats/" },
      { title: "Gala Dinner", text: "Stage, décor, cuisine, and entertainment cues.", image: "story", href: "events/gala-dinner/" },
      { title: "Island Rewards", text: "Phuket, Samui, and Krabi celebration settings.", image: "dest", href: "destinations/thailand/" },
      { title: "VIP Rooms", text: "Suite upgrades and welcome amenities for top performers.", image: "partner", href: "travel-services/hotel-reservations/" },
    ],
    why: [
      { title: "Memorable Peaks", text: "Each day has a highlight — not a flat schedule." },
      { title: "Brand Fit", text: "Décor and run-of-show aligned to company identity." },
      { title: "Cuisine Excellence", text: "Indian and international menus for celebration dining." },
      { title: "Photo-ready Moments", text: "Settings chosen for leadership visibility and guest joy." },
      { title: "Budget Clarity", text: "Options presented in tiers without hidden gaps." },
      { title: "Flawless Timing", text: "Transfers and stage cues rehearsed with vendors." },
    ],
    included: ["Incentive concept", "Hotel & venue plan", "Experience design", "Gala production pathway", "Transfers", "Guest amenities", "Dietary service", "On-site show calling support"],
    faqs: [
      { q: "Can incentives be alcohol-free?", a: "Yes. Celebration formats adapt to company culture." },
      { q: "Do you provide entertainment?", a: "We coordinate performers and technical partners for gala nights." },
      { q: "How many nights work best?", a: "Many programs run 3–5 nights; we scale to your recognition goals." },
      { q: "Can families join?", a: "Family extensions can be offered after the core incentive." },
      { q: "Are private villa buyouts possible?", a: "For leadership groups, selected properties can be proposed." },
      { q: "How early should we book peak dates?", a: "Festive and year-end windows need early venue holds." },
    ],
    related: [
      { title: "Gala Dinner", text: "Celebration production desk.", href: "events/gala-dinner/", image: "story" },
      { title: "Luxury Travel", text: "Premium stay experiences.", href: "travel-services/luxury-travel/", image: "swiss" },
      { title: "Indian Corporate Groups", text: "Meetings plus hospitality.", href: "india-market/indian-corporate-groups/", image: "europe" },
    ],
  },

  "indian-wedding-services": {
    section: "India Market",
    sectionHref: "india-market/",
    title: "Indian Wedding Services",
    sub: "Destination weddings in Thailand — planning, décor, stays, entertainment, and guest transport.",
    hero: "story",
    overviewTitle: "Celebrations on a destination scale",
    overview: [
      "Indian destination weddings need choreography across ceremonies, guest arrivals, décor, cuisine, and late-night energy. D&G Holiday provides the Thailand operations layer so families and planners can focus on the celebration.",
      "We align hotels, venues, transportation waves, entertainment partners, and catering — with cultural respect at every touchpoint.",
    ],
    overviewImage: "swiss",
    highlightsTitle: "Wedding services",
    highlights: [
      { title: "Destination Wedding", text: "Beach, ballroom, and villa celebration settings.", image: "story", href: "destination-weddings/indian-weddings/" },
      { title: "Wedding Planning", text: "Run-of-show, vendor matrix, and guest journey mapping.", image: "partner", href: "destination-weddings/wedding-planning-services/" },
      { title: "Decoration", text: "Floral and production partners for ceremony aesthetics.", image: "europe", href: "destination-weddings/" },
      { title: "Accommodation", text: "Room blocks across one or multiple hotels.", image: "swiss", href: "travel-services/hotel-reservations/" },
      { title: "Entertainment", text: "Music, dance, and stage coordination.", image: "dubai", href: "events/entertainment-production/" },
      { title: "Transportation", text: "Airport waves, venue shuttles, and VIP cars.", image: "korea", href: "travel-services/transportation-transfers/" },
    ],
    why: [
      { title: "Ceremony Fluency", text: "Timelines that respect rituals and family priorities." },
      { title: "Guest Experience", text: "Arrivals, hospitality desks, and clear daily information." },
      { title: "Cuisine Partners", text: "Specialized Indian wedding catering pathways." },
      { title: "Scale Ready", text: "Hundreds of guests moved without losing warmth." },
      { title: "Planner Friendly", text: "We integrate with your wedding planner’s creative lead." },
      { title: "Venue Reality", text: "Honest capacity and noise guidance before you book." },
    ],
    included: ["Venue shortlist", "Hotel blocks", "Guest transfer plan", "Ceremony logistics support", "Décor vendor coordination", "Entertainment pathway", "Catering coordination", "On-site operations team"],
    faqs: [
      { q: "Can you host multi-day weddings?", a: "Yes — welcome dinners, ceremonies, and receptions across several days." },
      { q: "Do you work with planners from India?", a: "Frequently. We act as the Thailand operations partner." },
      { q: "Are beach ceremonies always possible?", a: "Subject to venue permits, tides, and weather plans — we advise alternatives." },
      { q: "Can you manage baraat logistics?", a: "Route permissions and timing are planned with hotels and local rules." },
      { q: "How do guest arrivals work?", a: "Flight manifests drive transfer waves and hotel check-in desks." },
      { q: "Is Jain or Halal catering possible?", a: "Yes through specialized partners — confirm early for peak wedding dates." },
    ],
    related: [
      { title: "Indian Catering", text: "Wedding cuisine specialists.", href: "india-market/indian-catering/", image: "partner" },
      { title: "Destination Weddings", text: "Full wedding portfolio.", href: "destination-weddings/", image: "story" },
      { title: "Hindi-speaking Support", text: "Coordinators for family hospitality.", href: "india-market/hindi-speaking-support/", image: "why" },
    ],
  },

  "indian-catering": {
    section: "India Market",
    sectionHref: "india-market/",
    title: "Indian Catering",
    sub: "North Indian, South Indian, vegetarian, Jain, Halal, and wedding-scale catering in Thailand.",
    hero: "why",
    overviewTitle: "Cuisine that feels like home",
    overview: [
      "For India-market programs, food is hospitality. We coordinate specialized caterers and hotel kitchens for North and South Indian menus, vegetarian excellence, Jain and Halal requirements, and wedding banquet scale.",
      "Whether the brief is a corporate lunch or a multi-night wedding, menus are tasted, timed, and served with cultural care.",
    ],
    overviewImage: "partner",
    highlightsTitle: "Cuisine capabilities",
    highlights: [
      { title: "North Indian", text: "Rich gravies, tandoor, and celebration classics.", image: "dubai", href: "india-market/indian-catering/" },
      { title: "South Indian", text: "Regional specialties for breakfasts and feasts.", image: "japan", href: "india-market/indian-catering/" },
      { title: "Vegetarian", text: "Complete vegetarian journeys without compromise.", image: "story", href: "india-market/indian-group-tours/" },
      { title: "Jain", text: "Specialized preparation pathways on request.", image: "partner", href: "india-market/indian-catering/" },
      { title: "Halal", text: "Halal-certified options through vetted partners.", image: "korea", href: "india-market/indian-catering/" },
      { title: "Wedding Catering", text: "Multi-function banquets with live stations.", image: "swiss", href: "india-market/indian-wedding-services/" },
    ],
    why: [
      { title: "Specialist Partners", text: "Caterers who understand regional Indian cuisine at event scale." },
      { title: "Hotel Integration", text: "Kitchen access and banquet flow coordinated with venues." },
      { title: "Dietary Discipline", text: "Labeling and service lines that prevent mix-ups." },
      { title: "Tasting Culture", text: "Menu trials before celebration days when timelines allow." },
      { title: "Live Stations", text: "Interactive service that energizes receptions." },
      { title: "Group Efficiency", text: "Service speed tuned to coach and ceremony schedules." },
    ],
    included: ["Menu consultation", "Caterer shortlist", "Dietary planning", "Tasting coordination (as scheduled)", "Banquet flow planning", "Service staffing pathway", "Equipment & station planning", "On-night quality checks"],
    faqs: [
      { q: "Can every meal be vegetarian?", a: "Yes — many India-market programs run fully vegetarian by design." },
      { q: "Do hotels cook Indian food in-house?", a: "Some do; others host specialist caterers — we recommend the stronger path." },
      { q: "How early should wedding catering be booked?", a: "Peak wedding months need early holds for kitchens and décor load-in." },
      { q: "Are Jain kitchens always available?", a: "Available in key destinations through specialists — confirm at quoting." },
      { q: "Can you serve 500+ guests?", a: "Yes with the right venue kitchen and service plan." },
      { q: "Do you provide alcohol-free beverage programs?", a: "Yes, including mocktail stations and tea/coffee hospitality." },
    ],
    related: [
      { title: "Indian Wedding Services", text: "Full wedding operations.", href: "india-market/indian-wedding-services/", image: "story" },
      { title: "Indian Group Tours", text: "Meal plans for touring groups.", href: "india-market/indian-group-tours/", image: "dest" },
      { title: "Events", text: "Gala and celebration hosting.", href: "events/", image: "europe" },
    ],
  },

  "hindi-speaking-support": {
    section: "India Market",
    sectionHref: "india-market/",
    title: "Hindi-speaking Support",
    sub: "Airport meet & greet, guides, interpreters, corporate support, wedding coordinators, and 24/7 care.",
    hero: "partner",
    overviewTitle: "Communication that comforts",
    overview: [
      "Language turns a good trip into a confident one. Our Hindi-speaking support covers airport greetings, touring, corporate meetings, wedding hospitality desks, and after-hours assistance for India-market guests.",
      "Availability varies by destination and date — we confirm language coverage transparently when preparing your proposal.",
    ],
    overviewImage: "why",
    highlightsTitle: "Support touchpoints",
    highlights: [
      { title: "Airport Meet & Greet", text: "Warm arrivals with clear guidance through transfers.", image: "dubai", href: "travel-services/transportation-transfers/" },
      { title: "Tour Guide", text: "Hindi-speaking guiding for key Thailand destinations.", image: "story", href: "travel-services/private-tours/" },
      { title: "Interpreter", text: "Meeting and vendor interpretation for corporate agendas.", image: "europe", href: "india-market/indian-corporate-groups/" },
      { title: "Corporate Support", text: "Hospitality desks and delegate assistance.", image: "japan", href: "mice/meetings/" },
      { title: "Wedding Coordinator", text: "Family-facing coordination across ceremony days.", image: "swiss", href: "india-market/indian-wedding-services/" },
      { title: "24/7 Support", text: "Duty contacts for urgent guest needs.", image: "korea", href: "contact/" },
    ],
    why: [
      { title: "Guest Confidence", text: "Families and elders feel understood from arrival." },
      { title: "Faster Problem Solving", text: "Issues resolved without language friction." },
      { title: "Ceremony Calm", text: "Wedding days run clearer for relatives and vendors." },
      { title: "Corporate Clarity", text: "Meetings and briefings land accurately." },
      { title: "Agency Assurance", text: "Partners abroad know guests are locally supported." },
      { title: "Honest Availability", text: "We confirm language resources before you sell the trip." },
    ],
    included: ["Language needs assessment", "Airport greeting options", "Guide / interpreter booking", "Wedding hospitality desk options", "Corporate meeting support", "Emergency contact pathway", "Briefing for drivers & hotels", "Daily coordination notes"],
    faqs: [
      { q: "Is Hindi support guaranteed in every city?", a: "Coverage is strongest in major gateways; we confirm city-by-city when quoting." },
      { q: "Can support be partial (airports only)?", a: "Yes — many programs use Hindi meet & greet plus English touring." },
      { q: "Do wedding coordinators stay through all functions?", a: "Staffing plans are built to your ceremony calendar." },
      { q: "Is 24/7 support Hindi-speaking?", a: "Duty desks provide multilingual escalation; Hindi coverage is arranged for key programs." },
      { q: "Can interpreters join supplier meetings?", a: "Yes for venue walks, catering tastings, and production briefings." },
      { q: "How do we request Hindi support?", a: "Note it in your proposal brief — destinations, dates, and touchpoints." },
    ],
    related: [
      { title: "India Market", text: "Full India specialist desk.", href: "india-market/", image: "dubai" },
      { title: "Indian Wedding Services", text: "Celebration operations.", href: "india-market/indian-wedding-services/", image: "story" },
      { title: "Contact Our Team", text: "Brief our partner desk.", href: "contact/", image: "partner" },
    ],
  },
};

const DEFAULT_STEPS = [
  { title: "Consultation", text: "Share dates, guests, and goals with our partner desk.", icon: "messages-square" },
  { title: "Planning", text: "We design itinerary, hotels, and logistics options.", icon: "map" },
  { title: "Confirmation", text: "Approve the proposal and secure key inventory.", icon: "badge-check" },
  { title: "Travel", text: "Arrive to prepared transfers, stays, and experiences.", icon: "plane" },
  { title: "Support", text: "On-trip care and after-travel follow-up.", icon: "headset" },
];

const PAGE_SECTION_ICONS = {
  "inbound-travel": "plane-landing",
  "outbound-travel": "plane-takeoff",
  "domestic-travel": "map-pinned",
  "group-tours": "users",
  "private-tours": "user-round",
  "luxury-travel": "gem",
  "hotel-reservations": "hotel",
  "transportation-transfers": "car",
  "visa-travel-support": "file-check",
  "india-market": "landmark",
  "indian-group-tours": "users",
  "indian-corporate-groups": "briefcase-business",
  "indian-incentive-travel": "trophy",
  "indian-wedding-services": "heart",
  "indian-catering": "utensils",
  "hindi-speaking-support": "languages",
};

function ico(name, size) {
  const cls = size === "lg" ? "dg-ts-ico dg-ts-ico--lg" : "dg-ts-ico";
  return `<span class="${cls}" aria-hidden="true"><i data-lucide="${esc(name)}" class="dg-lucide"></i></span>`;
}

function pickIcon(title, fallback = "sparkles") {
  const t = String(title || "").toLowerCase();
  if (/group|school|government|series|student/.test(t)) return "users";
  if (/airport|flight|plane|arrival|meet/.test(t)) return "plane";
  if (/hotel|stay|resort|room|accommodation|villa/.test(t)) return "hotel";
  if (/tour|experience|culture|circuit|temple|pilgrim/.test(t)) return "compass";
  if (/transport|transfer|coach|car|van|boat|ship|yacht|helicopter|jet/.test(t)) return "car";
  if (/guide|private|vip|fit|tailor/.test(t)) return "user-round";
  if (/visa|document|insurance|entry|passport/.test(t)) return "file-check";
  if (/luxury|premium|fine dining|concierge|gem/.test(t)) return "gem";
  if (/family|weekend|domestic/.test(t)) return "heart";
  if (/wedding|ceremony|celebration/.test(t)) return "heart";
  if (/corporate|business|meeting|interpreter/.test(t)) return "briefcase-business";
  if (/incentive|reward|trophy/.test(t)) return "trophy";
  if (/catering|dining|meal|food/.test(t)) return "utensils";
  if (/hindi|language|support|24\/7|care|duty/.test(t)) return "headset";
  if (/india|market/.test(t)) return "landmark";
  if (/partner|trusted|overseas|network/.test(t)) return "handshake";
  if (/price|pricing|competitive|value/.test(t)) return "badge-percent";
  if (/fast|response|speed/.test(t)) return "zap";
  if (/team|professional|staff/.test(t)) return "users";
  if (/tailor|custom|bespoke/.test(t)) return "sparkles";
  if (/safety|secure|protect|shield/.test(t)) return "shield-check";
  if (/knowledge|brief|clear|document/.test(t)) return "book-open";
  if (/mountain|nature|outdoor/.test(t)) return "mountain";
  if (/key|access/.test(t)) return "key-round";
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

function renderTravelServicePage(pageId, rel) {
  const p = withServiceMedia(pageId, PAGES[pageId]);
  if (!p) return null;

  const sectionIcon = PAGE_SECTION_ICONS[pageId] || "sparkles";

  const highlights = p.highlights
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

  const why = p.why
    .map((w, i) => {
      const icon = w.icon || pickIcon(w.title, "badge-check");
      return `<article class="dg-ts-why__item dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}">
  ${ico(icon)}
  <h3>${esc(w.title)}</h3>
  <p>${esc(w.text)}</p>
</article>`;
    })
    .join("\n");

  const included = p.included
    .map(
      (item) =>
        `<li>${ico("circle-check")}<span>${esc(item)}</span></li>`
    )
    .join("");

  const steps = DEFAULT_STEPS.map(
    (s, i) => `<div class="dg-ts-step dg-ts-reveal${i ? ` dg-ts-reveal-d${Math.min(i, 3)}` : ""}">
  ${ico(s.icon, "lg")}
  <h3>${esc(s.title)}</h3>
  <p>${esc(s.text)}</p>
</div>`
  ).join("\n");

  const galleryKeys = p.galleryImages || [
    p.overviewImage,
    ...(p.highlights || []).slice(0, 4).map((h) => h.image),
  ];
  const gallery = galleryKeys
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

  return `<article class="dg-ts dg-theme--travel">
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

  <section class="dg-ts-highlights" id="highlights">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Service Highlights",
        title: p.highlightsTitle,
        lead: "Capabilities shaped for partners and discerning travelers.",
        icon: "layout-grid",
      })}
      <div class="dg-ts-highlights__grid">${highlights}</div>
    </div>
  </section>

  <section class="dg-ts-why" id="why">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Why Choose Us",
        title: "Why partners trust this desk",
        lead: "People, process, and presence — built for agency-ready delivery.",
        icon: "shield-check",
      })}
      <div class="dg-ts-why__grid">${why}</div>
    </div>
  </section>

  <section class="dg-ts-included" id="included">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "What's Included",
        title: "Typical program building blocks",
        lead: "Final inclusions are confirmed in your proposal.",
        icon: "clipboard-list",
      })}
      <ul class="dg-ts-included__grid dg-ts-reveal dg-ts-reveal-d1">${included}</ul>
    </div>
  </section>

  <section class="dg-ts-steps" id="process">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "How We Work",
        title: "From brief to on-trip care",
        lead: "A clear path from first enquiry to after-travel follow-up.",
        icon: "route",
      })}
      <div class="dg-ts-steps__track">${steps}</div>
    </div>
  </section>

  <section class="dg-ts-gallery" id="gallery">
    <div class="dg-ts__wrap">
      ${sectionHead({
        eyebrow: "Gallery",
        title: "Atmosphere of the journey",
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
        lead: "Practical answers partners ask before confirming a program.",
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
    title: "Ready to plan your journey?",
    text: "Tell us about your travelers, dates, and goals — our partner desk will prepare a tailored proposal.",
  })}
</article>`;
}

function hasTravelServicePage(id) {
  return Boolean(PAGES[id]);
}

function listTravelServicePageIds() {
  return Object.keys(PAGES);
}

module.exports = {
  renderTravelServicePage,
  hasTravelServicePage,
  listTravelServicePageIds,
  PAGES,
};
