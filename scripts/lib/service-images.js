/**
 * Service-matched photography for internal pages only.
 * Never points at homepage hero / promotional assets (egypt, etc.).
 * Destination landmark photos stay only for destination pages.
 */

const S = (name) => `images/services/${name}.jpg`;

/** Shared catalog keys → paths */
const CATALOG = {
  // Business
  bizAirport: S("business-airport"),
  bizLounge: S("business-lounge"),
  bizMeeting: S("business-meeting"),
  bizExec: S("business-executive"),
  bizLaptop: S("business-laptop"),

  // Corporate groups
  corpGroup: S("corporate-group"),
  corpAirport: S("corporate-airport"),
  corpHotel: S("corporate-hotel"),
  corpCoach: S("corporate-coach"),

  // Executive
  execSedan: S("executive-sedan"),
  execChauffeur: S("executive-chauffeur"),
  execArrival: S("executive-arrival"),
  execVip: S("executive-vip"),

  // Transport
  trVan: S("transport-van"),
  trCoach: S("transport-coach"),
  trPickup: S("transport-pickup"),
  trDriver: S("transport-driver"),
  trBoat: S("transport-boat"),

  // Hotels
  hotelLobby: S("hotel-lobby"),
  hotelRoom: S("hotel-room"),
  hotelResort: S("hotel-resort"),
  hotelReception: S("hotel-reception"),
  hotelSuite: S("hotel-suite"),
  hotelPool: S("hotel-pool"),

  // Travel desk / visa
  travelDesk: S("travel-desk"),
  travelPlan: S("travel-planning"),
  visaPass: S("visa-passport"),
  visaDocs: S("visa-documents"),
  visaConsult: S("visa-consultation"),

  // Private / luxury
  privGuide: S("private-guide"),
  privCouple: S("private-couple"),
  privVehicle: S("private-vehicle"),
  luxResort: S("luxury-resort"),
  luxYacht: S("luxury-yacht"),
  luxVilla: S("luxury-villa"),
  luxDining: S("luxury-dining"),
  luxSpa: S("luxury-spa"),

  // Thailand atmosphere (not famous foreign landmarks)
  thBeach: S("thailand-beach"),
  thCity: S("thailand-city"),
  thTemple: S("thailand-temple"),
  thMarket: S("thailand-market"),
  groupTour: S("group-tourists"),
  family: S("family-travel"),

  // MICE / events
  meetBoard: S("meeting-boardroom"),
  meetConf: S("meeting-conference"),
  meetPresent: S("meeting-presentation"),
  meetWork: S("meeting-workshop"),
  exhibit: S("exhibition-hall"),
  teamBuild: S("team-building"),
  incentive: S("incentive-celebration"),
  gala: S("gala-dinner"),
  award: S("award-stage"),
  launch: S("product-launch"),
  party: S("themed-party"),
  retreat: S("retreat-nature"),

  // Weddings
  wedCeremony: S("wedding-ceremony"),
  wedBeach: S("wedding-beach"),
  wedVenue: S("wedding-venue"),
  wedIndian: S("wedding-indian"),
  wedCouple: S("wedding-couple"),
  wedDecor: S("wedding-decor"),
  wedPlan: S("wedding-planning"),

  // India market
  indiaTravel: S("india-travelers"),
  indiaFamily: S("india-family"),
  indiaFood: S("india-cuisine"),
  indiaCeleb: S("india-celebration"),

  // Destinations only (kept for destination pages)
  destJapan: "images/destinations/japan.jpg",
  destKorea: "images/destinations/korea.jpg",
  destDubai: "images/destinations/dubai.jpg",
  destEurope: "images/destinations/europe.jpg",
  destSwiss: "images/destinations/switzerland.jpg",
  destThailand: "images/about/dest-band-bg.png",
  aboutStory: "images/about/story-bg.png",
  aboutPartner: "images/about/partner-bg.png",
  aboutWhy: "images/about/why-bg.png",
};

/**
 * Per-page media packs: overview + highlight images (6) + gallery (5) + related (3)
 * Keys are catalog keys.
 */
const PAGE_MEDIA = {
  // —— Travel Services ——
  "inbound-travel": {
    overview: "thCity",
    highlights: ["thTemple", "thBeach", "hotelLobby", "trPickup", "privGuide", "travelDesk"],
    gallery: ["thCity", "thBeach", "thTemple", "hotelResort", "groupTour"],
    related: ["thBeach", "luxResort", "indiaTravel"],
  },
  "outbound-travel": {
    overview: "groupTour",
    highlights: ["family", "travelPlan", "hotelLobby", "visaPass", "privCouple", "travelDesk"],
    gallery: ["groupTour", "family", "hotelRoom", "travelPlan", "bizAirport"],
    related: ["visaPass", "hotelLobby", "luxResort"],
  },
  "domestic-travel": {
    overview: "thBeach",
    highlights: ["thCity", "thTemple", "thMarket", "hotelResort", "family", "trBoat"],
    gallery: ["thBeach", "thCity", "hotelPool", "thTemple", "family"],
    related: ["privGuide", "hotelResort", "trPickup"],
  },
  "group-tours": {
    overview: "groupTour",
    highlights: ["corpCoach", "corpGroup", "hotelLobby", "trCoach", "travelDesk", "thTemple"],
    gallery: ["groupTour", "corpCoach", "corpGroup", "hotelReception", "thCity"],
    related: ["corpGroup", "trCoach", "hotelLobby"],
  },
  "private-tours": {
    overview: "privGuide",
    highlights: ["privCouple", "privVehicle", "thTemple", "luxDining", "execSedan", "thBeach"],
    gallery: ["privGuide", "privCouple", "privVehicle", "thTemple", "luxDining"],
    related: ["luxResort", "trVan", "hotelSuite"],
  },
  "luxury-travel": {
    overview: "luxResort",
    highlights: ["hotelSuite", "luxYacht", "luxVilla", "luxDining", "execSedan", "luxSpa"],
    gallery: ["luxResort", "luxYacht", "hotelSuite", "luxDining", "luxVilla"],
    related: ["privCouple", "hotelLobby", "wedVenue"],
  },
  "hotel-reservations": {
    overview: "hotelLobby",
    highlights: ["hotelRoom", "hotelResort", "hotelSuite", "hotelReception", "hotelPool", "corpHotel"],
    gallery: ["hotelLobby", "hotelRoom", "hotelResort", "hotelSuite", "hotelPool"],
    related: ["luxResort", "thCity", "trPickup"],
  },
  "transportation-transfers": {
    overview: "trPickup",
    highlights: ["trVan", "execSedan", "trCoach", "trDriver", "trBoat", "execVip"],
    gallery: ["trPickup", "execSedan", "trVan", "trCoach", "trBoat"],
    related: ["luxResort", "privGuide", "corpGroup"],
  },
  "visa-travel-support": {
    overview: "visaPass",
    highlights: ["visaDocs", "visaConsult", "travelDesk", "bizAirport", "travelPlan", "corpAirport"],
    gallery: ["visaPass", "visaDocs", "visaConsult", "travelDesk", "bizAirport"],
    related: ["groupTour", "thCity", "indiaTravel"],
  },

  // —— India Market ——
  "india-market": {
    overview: "indiaTravel",
    highlights: ["indiaFamily", "corpGroup", "wedIndian", "indiaFood", "indiaCeleb", "travelDesk"],
    gallery: ["indiaTravel", "indiaFamily", "wedIndian", "indiaFood", "thBeach"],
    related: ["wedIndian", "incentive", "visaConsult"],
  },
  "indian-group-tours": {
    overview: "indiaFamily",
    highlights: ["groupTour", "indiaTravel", "thBeach", "hotelResort", "corpCoach", "indiaFood"],
    gallery: ["indiaFamily", "groupTour", "thBeach", "hotelResort", "indiaFood"],
    related: ["indiaFood", "visaPass", "wedIndian"],
  },
  "indian-corporate-groups": {
    overview: "corpGroup",
    highlights: ["bizMeeting", "meetBoard", "corpHotel", "bizAirport", "travelDesk", "indiaTravel"],
    gallery: ["corpGroup", "bizMeeting", "meetBoard", "corpHotel", "bizAirport"],
    related: ["incentive", "meetConf", "indiaFood"],
  },
  "indian-incentive-travel": {
    overview: "incentive",
    highlights: ["thBeach", "luxResort", "gala", "corpGroup", "award", "hotelPool"],
    gallery: ["incentive", "thBeach", "luxResort", "gala", "corpGroup"],
    related: ["corpGroup", "indiaFood", "visaConsult"],
  },
  "indian-wedding-services": {
    overview: "wedIndian",
    highlights: ["wedCeremony", "wedVenue", "indiaCeleb", "wedDecor", "hotelResort", "indiaFood"],
    gallery: ["wedIndian", "wedCeremony", "wedVenue", "wedDecor", "indiaFood"],
    related: ["indiaFood", "visaConsult", "thBeach"],
  },
  "indian-catering": {
    overview: "indiaFood",
    highlights: ["indiaFood", "gala", "wedIndian", "corpHotel", "indiaCeleb", "luxDining"],
    gallery: ["indiaFood", "gala", "wedIndian", "luxDining", "corpHotel"],
    related: ["wedIndian", "groupTour", "visaConsult"],
  },
  "hindi-speaking-support": {
    overview: "indiaTravel",
    highlights: ["visaConsult", "privGuide", "travelDesk", "indiaFamily", "bizAirport", "corpGroup"],
    gallery: ["indiaTravel", "visaConsult", "privGuide", "travelDesk", "indiaFamily"],
    related: ["wedIndian", "indiaFood", "groupTour"],
  },

  // —— MICE ——
  meetings: {
    overview: "meetBoard",
    highlights: ["meetConf", "meetPresent", "meetWork", "bizMeeting", "corpHotel", "travelDesk"],
    gallery: ["meetBoard", "meetConf", "meetPresent", "bizMeeting", "corpHotel"],
    related: ["award", "meetConf", "corpGroup"],
  },
  "incentive-travel": {
    overview: "incentive",
    highlights: ["thBeach", "luxResort", "gala", "award", "corpGroup", "hotelPool"],
    gallery: ["incentive", "thBeach", "gala", "luxResort", "corpGroup"],
    related: ["meetBoard", "exhibit", "retreat"],
  },
  "seminars-conferences": {
    overview: "meetConf",
    highlights: ["meetPresent", "meetWork", "exhibit", "corpHotel", "travelDesk", "bizMeeting"],
    gallery: ["meetConf", "meetPresent", "exhibit", "corpHotel", "meetWork"],
    related: ["meetBoard", "exhibit", "corpGroup"],
  },
  "corporate-group-travel": {
    overview: "corpGroup",
    highlights: ["bizAirport", "corpCoach", "corpHotel", "bizMeeting", "travelDesk", "trPickup"],
    gallery: ["corpGroup", "bizAirport", "corpHotel", "corpCoach", "bizMeeting"],
    related: ["meetBoard", "incentive", "trVan"],
  },
  "team-building": {
    overview: "teamBuild",
    highlights: ["meetWork", "retreat", "corpGroup", "thBeach", "party", "meetPresent"],
    gallery: ["teamBuild", "meetWork", "retreat", "corpGroup", "thBeach"],
    related: ["retreat", "meetBoard", "incentive"],
  },
  exhibitions: {
    overview: "exhibit",
    highlights: ["meetConf", "launch", "corpHotel", "meetPresent", "travelDesk", "award"],
    gallery: ["exhibit", "meetConf", "launch", "corpHotel", "meetPresent"],
    related: ["meetBoard", "launch", "corpGroup"],
  },
  "corporate-retreats": {
    overview: "retreat",
    highlights: ["luxResort", "meetBoard", "luxSpa", "thBeach", "teamBuild", "hotelResort"],
    gallery: ["retreat", "luxResort", "meetBoard", "luxSpa", "thBeach"],
    related: ["meetBoard", "teamBuild", "incentive"],
  },

  // —— Events ——
  "event-management": {
    overview: "gala",
    highlights: ["award", "launch", "party", "meetConf", "wedVenue", "incentive"],
    gallery: ["gala", "award", "launch", "party", "meetConf"],
    related: ["meetBoard", "wedVenue", "corpGroup"],
  },
  "gala-dinner": {
    overview: "gala",
    highlights: ["luxDining", "award", "wedDecor", "corpHotel", "incentive", "meetPresent"],
    gallery: ["gala", "luxDining", "award", "wedDecor", "corpHotel"],
    related: ["award", "launch", "party"],
  },
  "award-ceremonies": {
    overview: "award",
    highlights: ["meetPresent", "gala", "launch", "corpHotel", "incentive", "party"],
    gallery: ["award", "meetPresent", "gala", "launch", "corpHotel"],
    related: ["gala", "launch", "meetConf"],
  },
  "annual-company-parties": {
    overview: "party",
    highlights: ["incentive", "gala", "corpGroup", "themed", "award", "luxDining"],
    gallery: ["party", "incentive", "gala", "corpGroup", "luxDining"],
    related: ["teamBuild", "gala", "award"],
  },
  "product-launches": {
    overview: "launch",
    highlights: ["meetPresent", "exhibit", "award", "party", "corpHotel", "meetConf"],
    gallery: ["launch", "meetPresent", "exhibit", "award", "party"],
    related: ["exhibit", "gala", "meetConf"],
  },
  "themed-events": {
    overview: "party",
    highlights: ["wedDecor", "incentive", "gala", "launch", "corpHotel", "award"],
    gallery: ["party", "wedDecor", "incentive", "gala", "launch"],
    related: ["gala", "award", "launch"],
  },
  "private-parties": {
    overview: "luxDining",
    highlights: ["party", "wedVenue", "luxVilla", "gala", "hotelSuite", "wedDecor"],
    gallery: ["luxDining", "party", "wedVenue", "luxVilla", "hotelSuite"],
    related: ["gala", "wedVenue", "luxResort"],
  },
  "entertainment-production": {
    overview: "award",
    highlights: ["meetPresent", "launch", "party", "gala", "exhibit", "incentive"],
    gallery: ["award", "meetPresent", "launch", "party", "gala"],
    related: ["gala", "launch", "meetConf"],
  },

  // —— Weddings ——
  "indian-weddings": {
    overview: "wedIndian",
    highlights: ["wedCeremony", "wedDecor", "wedVenue", "indiaFood", "hotelResort", "indiaCeleb"],
    gallery: ["wedIndian", "wedCeremony", "wedDecor", "wedVenue", "indiaFood"],
    related: ["wedBeach", "wedVenue", "indiaFood"],
  },
  "thai-weddings": {
    overview: "wedCeremony",
    highlights: ["thTemple", "wedCouple", "wedVenue", "thBeach", "wedDecor", "hotelResort"],
    gallery: ["wedCeremony", "thTemple", "wedCouple", "wedVenue", "thBeach"],
    related: ["wedBeach", "wedVenue", "luxResort"],
  },
  "luxury-weddings": {
    overview: "wedVenue",
    highlights: ["luxVilla", "wedCouple", "luxDining", "hotelSuite", "wedDecor", "luxYacht"],
    gallery: ["wedVenue", "luxVilla", "wedCouple", "luxDining", "hotelSuite"],
    related: ["wedBeach", "wedIndian", "luxResort"],
  },
  "beach-weddings": {
    overview: "wedBeach",
    highlights: ["thBeach", "wedCeremony", "wedCouple", "hotelResort", "wedDecor", "luxYacht"],
    gallery: ["wedBeach", "thBeach", "wedCeremony", "wedCouple", "hotelResort"],
    related: ["wedVenue", "luxResort", "wedIndian"],
  },
  "wedding-venues": {
    overview: "wedVenue",
    highlights: ["hotelResort", "wedBeach", "luxVilla", "thTemple", "corpHotel", "wedDecor"],
    gallery: ["wedVenue", "hotelResort", "wedBeach", "luxVilla", "wedDecor"],
    related: ["wedCeremony", "wedBeach", "luxResort"],
  },
  "wedding-planning-services": {
    overview: "wedPlan",
    highlights: ["wedCeremony", "wedDecor", "travelDesk", "wedCouple", "hotelResort", "indiaFood"],
    gallery: ["wedPlan", "wedCeremony", "wedDecor", "wedCouple", "hotelResort"],
    related: ["wedIndian", "wedBeach", "wedVenue"],
  },
};

/** Fix typo key in annual-company-parties */
PAGE_MEDIA["annual-company-parties"].highlights[3] = "party";

/**
 * Destination pages — landmarks OK only when matching the destination.
 */
const DEST_MEDIA = {
  thailand: {
    overview: "thCity",
    highlights: ["thBeach", "thTemple", "thMarket", "hotelResort", "thCity", "trBoat"],
    gallery: ["thCity", "thBeach", "thTemple", "hotelResort", "thMarket"],
    related: ["destJapan", "destDubai", "destEurope"],
  },
  asia: {
    overview: "destJapan",
    highlights: ["destJapan", "destKorea", "thTemple", "hotelLobby", "privGuide", "travelDesk"],
    gallery: ["destJapan", "destKorea", "thCity", "hotelLobby", "groupTour"],
    related: ["thCity", "destEurope", "destDubai"],
  },
  europe: {
    overview: "destEurope",
    highlights: ["destEurope", "destSwiss", "hotelLobby", "privGuide", "visaPass", "luxDining"],
    gallery: ["destEurope", "destSwiss", "hotelLobby", "privCouple", "groupTour"],
    related: ["destJapan", "thCity", "destDubai"],
  },
  "middle-east": {
    overview: "destDubai",
    highlights: ["destDubai", "hotelLobby", "luxResort", "bizAirport", "luxDining", "execSedan"],
    gallery: ["destDubai", "hotelLobby", "luxResort", "bizAirport", "execSedan"],
    related: ["thCity", "destEurope", "destJapan"],
  },
  worldwide: {
    overview: "groupTour",
    highlights: ["destEurope", "destJapan", "destDubai", "hotelLobby", "travelDesk", "family"],
    gallery: ["groupTour", "destEurope", "destJapan", "destDubai", "hotelLobby"],
    related: ["thCity", "luxResort", "visaPass"],
  },
};

function pathFor(key) {
  return CATALOG[key] || CATALOG.hotelLobby;
}

function resolveMedia(pageId) {
  return PAGE_MEDIA[pageId] || DEST_MEDIA[pageId] || null;
}

function serviceImageForTitle(title, fallback) {
  const t = String(title || "").toLowerCase();
  if (/hotel|resort|accommodation|stay/.test(t)) return "hotelLobby";
  if (/transfer|transport|chauffeur|van|coach|pickup/.test(t)) return "trPickup";
  if (/private tour|guide/.test(t)) return "privGuide";
  if (/luxury/.test(t)) return "luxResort";
  if (/wedding/.test(t)) return "wedCeremony";
  if (/visa|support|document/.test(t)) return "visaPass";
  if (/meeting|mice|corporate|board/.test(t)) return "meetBoard";
  if (/incentive/.test(t)) return "incentive";
  if (/exhibition|expo/.test(t)) return "exhibit";
  if (/yacht|cruise/.test(t)) return "luxYacht";
  if (/family/.test(t)) return "family";
  if (/adventure|safari/.test(t)) return "retreat";
  if (/romantic|honeymoon/.test(t)) return "privCouple";
  if (/wellness|spa/.test(t)) return "luxSpa";
  if (/dining|food|cater/.test(t)) return "luxDining";
  return fallback;
}

/**
 * Apply media pack onto a page content object (mutates a shallow copy).
 */
function withServiceMedia(pageId, page) {
  const pack = resolveMedia(pageId);
  if (!pack || !page) return page;
  const next = { ...page };
  next.overviewImage = pack.overview;
  next.hero = pack.overview;
  next.galleryImages = pack.gallery;
  if (Array.isArray(next.highlights)) {
    next.highlights = next.highlights.map((h, i) => ({
      ...h,
      image: pack.highlights[i % pack.highlights.length],
    }));
  }
  if (Array.isArray(next.packages)) {
    next.packages = next.packages.map((h, i) => ({
      ...h,
      image: pack.highlights[i % pack.highlights.length],
    }));
  }
  if (Array.isArray(next.related)) {
    next.related = next.related.map((r, i) => ({
      ...r,
      image: pack.related[i % pack.related.length],
    }));
  }
  // Wedding pages use `about` + aboutImage
  if (next.aboutImage) next.aboutImage = pack.overview;
  if (Array.isArray(next.gallery)) next.gallery = pack.gallery;
  // Destination / MICE card arrays — prefer title-matched service photos
  if (Array.isArray(next.experiences)) {
    next.experiences = next.experiences.map((e, i) => ({
      ...e,
      image: serviceImageForTitle(e.title, pack.highlights[i % pack.highlights.length]),
    }));
  }
  if (Array.isArray(next.services)) {
    next.services = next.services.map((e, i) => ({
      ...e,
      image: serviceImageForTitle(e.title, pack.gallery[i % pack.gallery.length]),
    }));
  }
  if (Array.isArray(next.cities)) {
    next.cities = next.cities.map((e, i) => ({
      ...e,
      image: pack.highlights[i % pack.highlights.length],
    }));
  }
  return next;
}

/** Build IMAGES map for legacy img(rel, key) helpers */
function buildImagesMap() {
  const map = {};
  for (const [k, v] of Object.entries(CATALOG)) map[k] = v;
  // legacy aliases → service photos (never egypt / random landmarks on services)
  map.story = CATALOG.thCity;
  map.why = CATALOG.aboutWhy;
  map.partner = CATALOG.aboutPartner;
  map.dest = CATALOG.destThailand;
  map.egypt = CATALOG.thBeach; // never show pyramid on services
  map.japan = CATALOG.destJapan;
  map.korea = CATALOG.destKorea;
  map.dubai = CATALOG.hotelLobby; // never Dubai skyline on transport/services by default
  map.europe = CATALOG.hotelResort;
  map.swiss = CATALOG.hotelSuite;
  return map;
}

module.exports = {
  CATALOG,
  PAGE_MEDIA,
  DEST_MEDIA,
  pathFor,
  resolveMedia,
  withServiceMedia,
  buildImagesMap,
};
