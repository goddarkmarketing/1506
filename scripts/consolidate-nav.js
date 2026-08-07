/**
 * Consolidate top-level nav per IA recommendation, keep all page URLs.
 * Writes data/site-nav.json + web/src/data/site-nav.json
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const navPath = path.join(root, "data", "site-nav.json");
const nav = JSON.parse(fs.readFileSync(navPath, "utf8"));

function byId(id) {
  return nav.items.find((i) => i.id === id);
}

const about = byId("about");
const travel = byId("travel-services");
const mice = byId("mice");
const events = byId("events");
const india = byId("india-market");
const weddings = byId("destination-weddings");
const destinations = byId("destinations");
const gallery = byId("gallery");
const home = byId("home");
const articles = byId("articles");
const proposal = byId("proposal");
const contact = byId("contact");

// About: mega shows gallery too (page gen children unchanged)
about.navChildren = [
  ...about.children,
  {
    id: "gallery-overview",
    label: "Gallery",
    href: "/gallery/",
    description: "Tours, MICE, events, and wedding photo moments.",
  },
];

// Travel: mega includes India Market hub + India leaves
travel.navChildren = [
  ...travel.children,
  {
    id: "india-market-overview",
    label: "India Market (Overview)",
    href: "/india-market/",
    description: india.description,
  },
  ...india.children.map((c) => ({
    ...c,
    label: c.label.startsWith("Indian") || c.label.startsWith("Hindi")
      ? c.label
      : `India — ${c.label}`,
  })),
];

// MICE & Events: rename + mega merges event leaves
mice.label = "MICE & Events";
mice.heroTitle = "MICE & Events";
mice.description =
  "Meetings, incentives, conferences, exhibitions, corporate travel, and full event production across Thailand.";
mice.navChildren = [
  ...mice.children,
  {
    id: "events-overview",
    label: "Event Management (Overview)",
    href: "/events/",
    description: events.description,
  },
  ...events.children,
];

// Weddings: shorter top label
weddings.label = "Weddings";

// Hidden from top nav (pages still generated)
events.showInNav = false;
india.showInNav = false;
gallery.showInNav = false;

articles.label = "Blog";

nav.items = [
  home,
  about,
  travel,
  mice,
  weddings,
  destinations,
  articles,
  proposal,
  contact,
  // page sources (hidden)
  events,
  india,
  gallery,
];

fs.writeFileSync(navPath, JSON.stringify(nav, null, 2) + "\n");
fs.mkdirSync(path.join(root, "web", "src", "data"), { recursive: true });
fs.copyFileSync(navPath, path.join(root, "web", "src", "data", "site-nav.json"));
console.log(
  "Top nav:",
  nav.items.filter((i) => i.showInNav !== false).map((i) => i.label).join(" | ")
);
