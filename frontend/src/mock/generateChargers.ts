import type { ChargerStop, MealDealDetail, NearbyCategory, NearbyPlace, PriceTier } from "../types/domain";

// Real Swiss towns/areas used as anchor points so generated chargers cluster
// in plausible places rather than scattering uniformly across empty land.
// Roughly covers the Bern - Zurich - Luzern triangle plus a bit beyond, so
// the network looks national rather than limited to a single route.
const ANCHORS: { name: string; lat: number; lng: number }[] = [
  { name: "Bern", lat: 46.9481, lng: 7.4474 },
  { name: "Zurich", lat: 47.3769, lng: 8.5417 },
  { name: "Luzern", lat: 47.0502, lng: 8.3093 },
  { name: "Zug", lat: 47.1662, lng: 8.5154 },
  { name: "Aarau", lat: 47.3925, lng: 8.0442 },
  { name: "Olten", lat: 47.3521, lng: 7.9058 },
  { name: "Thun", lat: 46.7512, lng: 7.6283 },
  { name: "Biel", lat: 47.1368, lng: 7.2468 },
  { name: "Solothurn", lat: 47.2088, lng: 7.5323 },
  { name: "Baden", lat: 47.4739, lng: 8.3068 },
  { name: "Zurich Airport", lat: 47.4502, lng: 8.5616 },
  { name: "Winterthur", lat: 47.5001, lng: 8.7241 },
  { name: "Rapperswil", lat: 47.2264, lng: 8.8188 },
  { name: "Schwyz", lat: 47.0207, lng: 8.6547 },
  { name: "Sarnen", lat: 46.8965, lng: 8.2461 },
];

const VENUE_NAMES = [
  "Migros Restaurant",
  "Coop Restaurant",
  "Shell Cafe",
  "BP Connect",
  "Ikea Restaurant",
  "Landi Laden",
  "Marché Restaurant",
];

const CHARGER_NETWORKS = [
  "Ionity",
  "Shell Recharge",
  "Migros",
  "Coop",
  "BKW",
  "Move",
  "GOFAST",
  "EVPass",
];

// Name pools per nearby-place category, used to generate plausible
// (not real) points of interest around each charger.
const NEARBY_NAMES: Record<NearbyCategory, string[]> = {
  fast_food: ["McDonald's", "Burger King", "Subway", "Kebab Haus"],
  groceries: ["Volg", "Denner", "Spar"],
  kiosk: ["Valora Kiosk", "Press & Books", "Naville"],
  pharmacy: ["Amavita", "Sun Store", "TopPharm"],
  atm: ["PostFinance ATM", "UBS ATM", "Raiffeisen ATM"],
  restroom: ["Public WC", "McClean", "Rest Area WC"],
  supermarket: ["Migros", "Coop", "Aldi", "Lidl"],
  bakery: ["Backwerk", "Confiserie Sprüngli", "Dorfbäckerei"],
};

const NEARBY_CATEGORIES = Object.keys(NEARBY_NAMES) as NearbyCategory[];

// Small deterministic PRNG (mulberry32) so the generated set is stable
// across reloads instead of reshuffling every render.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function priceTierFor(pricePerKwh: number): PriceTier {
  if (pricePerKwh <= 0.32) return "low";
  if (pricePerKwh <= 0.5) return "mid";
  return "high";
}

function buildMealDeal(rand: () => number): MealDealDetail {
  const venueName = VENUE_NAMES[Math.floor(rand() * VENUE_NAMES.length)];
  const isFree = rand() < 0.3;
  return isFree
    ? { type: "free", vegan: rand() < 0.4, venueName }
    : {
        type: "discounted",
        discountPercent: [10, 15, 20, 25, 30][Math.floor(rand() * 5)],
        vegan: rand() < 0.4,
        venueName,
      };
}

function buildNearbyPlaces(rand: () => number): NearbyPlace[] {
  // Shuffle categories deterministically, then take up to 4 -- not every
  // charger gets every category, and not every charger gets 4.
  const shuffled = [...NEARBY_CATEGORIES].sort(() => rand() - 0.5);
  const count = 1 + Math.floor(rand() * 4); // 1 to 4 nearby places
  return shuffled.slice(0, count).map((category, i) => {
    const names = NEARBY_NAMES[category];
    const name = names[Math.floor(rand() * names.length)];
    return {
      id: `nearby-${category}-${i}`,
      name,
      category,
      walkMinutes: 1 + Math.floor(rand() * 8),
    };
  });
}

export function generateMockChargers(count = 50): ChargerStop[] {
  const rand = mulberry32(42);
  const chargers: ChargerStop[] = [];

  for (let i = 0; i < count; i++) {
    const anchor = ANCHORS[Math.floor(rand() * ANCHORS.length)];
    // Jitter within roughly +/- 6km of the anchor town.
    const lat = anchor.lat + (rand() - 0.5) * 0.09;
    const lng = anchor.lng + (rand() - 0.5) * 0.14;

    const pricePerKwh = Math.round((0.22 + rand() * 0.55) * 100) / 100;
    const priceTier = priceTierFor(pricePerKwh);
    const total = 2 + Math.floor(rand() * 7);
    const available = Math.floor(rand() * (total + 1));

    // Only a subset of chargers carry a perk -- meal deals and coffee are
    // bound to the charger they sit at, not offered separately.
    const perkRoll = rand();
    const perk = perkRoll < 0.22 ? "meal_deal" : perkRoll < 0.4 ? "coffee" : "none";
    const mealDeal = perk === "meal_deal" ? buildMealDeal(rand) : undefined;

    const rank: ChargerStop["rank"] =
      priceTier === "low" ? "optimal" : priceTier === "mid" ? "ok" : "skip";

    const network = CHARGER_NETWORKS[Math.floor(rand() * CHARGER_NETWORKS.length)];
    const nearby = buildNearbyPlaces(rand);

    chargers.push({
      id: `chg-${i + 1}`,
      name: `${network} - ${anchor.name}`,
      lat: Math.round(lat * 10000) / 10000,
      lng: Math.round(lng * 10000) / 10000,
      pricePerKwh,
      priceTier,
      available,
      total,
      perk,
      mealDeal,
      rank,
      nearby,
    });
  }

  return chargers;
}