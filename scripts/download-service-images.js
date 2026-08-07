/**
 * Download service-specific stock photography for internal pages.
 * Homepage images are never modified or reused.
 *
 * Usage: node scripts/download-service-images.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "images", "services");

/** Curated Unsplash photos — professional luxury/corporate travel look */
const PHOTOS = {
  // Business travel
  "business-airport.jpg": "photo-1436491865332-7a61a109cc05",
  "business-lounge.jpg": "photo-1540339832862-474599807836",
  "business-meeting.jpg": "photo-1556760544-74068565f05c",
  "business-executive.jpg": "photo-1560250097-0b93528c311a",
  "business-laptop.jpg": "photo-1486312338219-ce68d2c6f44d",

  // Company / corporate groups
  "corporate-group.jpg": "photo-1529156069898-49953e39b3ac",
  "corporate-airport.jpg": "photo-1530521954074-e64f6810b32d",
  "corporate-hotel.jpg": "photo-1566073771259-6a8506099945",
  "corporate-coach.jpg": "photo-1544626237-643a1b2a1c0f",
  // fixed below in retry map


  // Executive / VIP
  "executive-sedan.jpg": "photo-1549317661-bd32c8ce0db2",
  "executive-chauffeur.jpg": "photo-1449965408869-eaa3f722e40d",
  "executive-arrival.jpg": "photo-1551882547-ff40c63fe5fa",
  "executive-vip.jpg": "photo-1464219789935-c2d9d9aba644",

  // Transportation
  "transport-van.jpg": "photo-1464219789935-c2d9d9aba644",
  "transport-coach.jpg": "photo-1544620341-1adc1baa1c40",
  "transport-pickup.jpg": "photo-1570125909232-eb263c188f7e",
  "transport-driver.jpg": "photo-1449965408869-eaa3f722e40d",
  "transport-boat.jpg": "photo-1544551763-46a013bb70d5",

  // Hotels (NO landmarks)
  "hotel-lobby.jpg": "photo-1566073771259-6a8506099945",
  "hotel-room.jpg": "photo-1618773928121-c32242e63f39",
  "hotel-resort.jpg": "photo-1582719478250-c89cae4dc85b",
  "hotel-reception.jpg": "photo-1551882547-ff40c63fe5fa",
  "hotel-suite.jpg": "photo-1590490360182-c33d57733427",
  "hotel-pool.jpg": "photo-1571896349842-33c89424de2d",

  // Travel management / visa
  "travel-desk.jpg": "photo-1454165804606-c3d57bc86b40",
  "travel-planning.jpg": "photo-1486312338219-ce68d2c6f44d",
  "visa-passport.jpg": "photo-1544928147-79a2dbc1f389",
  "visa-documents.jpg": "photo-1450101499163-c8848c66ca85",
  "visa-consultation.jpg": "photo-1551836022-d5d88e9218df",

  // Private / luxury
  "private-guide.jpg": "photo-1527631742177-e5bfdf71b3dd",
  "private-couple.jpg": "photo-1469854523086-cc02fe5d8800",
  "private-vehicle.jpg": "photo-1549317661-bd32c8ce0db2",
  "luxury-resort.jpg": "photo-1540541338287-41700207dee6",
  "luxury-yacht.jpg": "photo-1567899378494-47b22a2ae96a",
  "luxury-villa.jpg": "photo-1600596542815-ffad4c1539a9",
  "luxury-dining.jpg": "photo-1414235077428-338989a2e8c0",
  "luxury-spa.jpg": "photo-1540555700478-4be289fbecef",

  // Inbound / domestic / groups (Thailand atmosphere, not landmarks)
  "thailand-beach.jpg": "photo-1552465011-b4e21bf6e79a",
  "thailand-city.jpg": "photo-1508009603885-50cf7c579365",
  "thailand-temple.jpg": "photo-1528181304800-259b08848526",
  "thailand-market.jpg": "photo-1528183429752-a5390440953a",
  "group-tourists.jpg": "photo-1488646953014-85cb44e25828",
  "family-travel.jpg": "photo-1476514525535-07fb3b4ae5f1",

  // MICE / meetings / events
  "meeting-boardroom.jpg": "photo-1517245386807-bb43f82c33c4",
  "meeting-conference.jpg": "photo-1540575467063-178a50c2df87",
  "meeting-presentation.jpg": "photo-1552664730-d307ca884978",
  "meeting-workshop.jpg": "photo-1557804506-669a67965ba0",
  "exhibition-hall.jpg": "photo-1540575467063-178a50c2df87",
  "team-building.jpg": "photo-1529156069898-49953e39b3ac",
  "incentive-celebration.jpg": "photo-1511795409824-469bb1227309",
  "gala-dinner.jpg": "photo-1519167758481-83f29da85c2d",
  "award-stage.jpg": "photo-1492684223066-81342ee5ff30",
  "product-launch.jpg": "photo-1475724017904-b712052c192a",
  "themed-party.jpg": "photo-1530103862676-de8c9debad1d",
  "retreat-nature.jpg": "photo-1506905925346-21bda4d32df4",

  // Weddings
  "wedding-ceremony.jpg": "photo-1519741497674-611481863552",
  "wedding-beach.jpg": "photo-1511285560929-80b456fe0c7f",
  "wedding-venue.jpg": "photo-1464366400600-7168b8af9bc3",
  "wedding-indian.jpg": "photo-1583939003579-730e3918a45a",
  "wedding-couple.jpg": "photo-1529636798458-92182e064925",
  "wedding-decor.jpg": "photo-1465495976277-4387d4b0b4c6",
  "wedding-planning.jpg": "photo-1511795409824-469bb1227309",

  // India market (people/culture — not Dubai skyline)
  "india-travelers.jpg": "photo-1524492412937-b28074a5bb57",
  "india-family.jpg": "photo-1604608672516-f1b9b1d37076",
  "india-cuisine.jpg": "photo-1585937421612-70a008356fbe",
  "india-celebration.jpg": "photo-1583939003579-730e3918a45a",
};

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "D&G-Holiday-Image-Pipeline/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const entries = Object.entries(PHOTOS);
  let ok = 0;
  for (const [file, id] of entries) {
    const dest = path.join(outDir, file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
      console.log("skip", file);
      ok++;
      continue;
    }
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;
    try {
      const buf = await fetchBuffer(url);
      if (buf.length < 5000) throw new Error(`too small (${buf.length})`);
      fs.writeFileSync(dest, buf);
      console.log("ok", file, buf.length);
      ok++;
    } catch (err) {
      console.error("FAIL", file, err.message);
    }
  }
  console.log(`\nDone: ${ok}/${entries.length} images in images/services/`);
}

main();
