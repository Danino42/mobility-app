import type {
  ChargerStop,
  CompanyRankingEntry,
  DriverSession,
  PlannedRoute,
} from "../types/domain";

export const mockSession: DriverSession = {
  driverName: "D. Kovacs",
  vehicleId: "ZH 481 920",
  vehicleIcon: "car",
  batteryPercent: 62,
  companyName: "BKW Energie AG",
  savedMoneyChf: 370,
  eScore: 98.5,
};

// Real-ish coordinates along a plausible Bern commute corridor, placed at
// or near actual charging locations (BKW HQ, motorway service stations,
// retail car parks) so the map reads as grounded rather than randomly
// scattered.
export const mockChargers: ChargerStop[] = [
  {
    id: "chg-1",
    name: "BKW HQ - Viktoriaplatz",
    lat: 46.9481,
    lng: 7.4474,
    pricePerKwh: 0.25,
    available: 6,
    total: 8,
    perk: "coffee",
    rank: "optimal",
  },
  {
    id: "chg-2",
    name: "Migros Wankdorf Center",
    lat: 46.9656,
    lng: 7.4614,
    pricePerKwh: 0.32,
    available: 3,
    total: 4,
    perk: "meal_deal",
    mealDeal: {
      type: "discounted",
      discountPercent: 20,
      vegan: true,
      venueName: "Migros Restaurant Wankdorf",
    },
    rank: "optimal",
  },
  {
    id: "chg-3",
    name: "Ionity Grauholz (A1)",
    lat: 47.0198,
    lng: 7.5121,
    pricePerKwh: 0.68,
    available: 2,
    total: 6,
    perk: "none",
    rank: "skip",
  },
  {
    id: "chg-4",
    name: "Coop Muri Rastplatz",
    lat: 46.9155,
    lng: 7.4784,
    pricePerKwh: 0.34,
    available: 4,
    total: 6,
    perk: "meal_deal",
    mealDeal: {
      type: "free",
      vegan: false,
      venueName: "Coop Restaurant Muri",
    },
    rank: "ok",
  },
  {
    id: "chg-5",
    name: "Shell Recharge Bern-Ost",
    lat: 46.9401,
    lng: 7.4919,
    pricePerKwh: 0.41,
    available: 5,
    total: 8,
    perk: "coffee",
    rank: "ok",
  },
];

export const mockRoutes: PlannedRoute[] = [
  {
    id: "route-1",
    date: new Date().toISOString(),
    label: "Bern - client visit Zurich",
    distanceKm: 125,
    chargerStopIds: ["chg-1", "chg-2"],
    status: "in_progress",
  },
  {
    id: "route-2",
    date: new Date(Date.now() + 86400000).toISOString(),
    label: "Bern - site inspection Muri",
    distanceKm: 18,
    chargerStopIds: ["chg-4"],
    status: "planned",
  },
  {
    id: "route-3",
    date: new Date(Date.now() + 3 * 86400000).toISOString(),
    label: "Bern - depot return",
    distanceKm: 6,
    chargerStopIds: ["chg-5"],
    status: "planned",
  },
];

export const mockCompanyRanking: CompanyRankingEntry[] = [
  { rank: 1, companyName: "Swisscom AG", eScore: 99.1, totalSavedChf: 18420, trend: "up" },
  { rank: 2, companyName: "BKW Energie AG", eScore: 97.8, totalSavedChf: 16110, trend: "up" },
  { rank: 3, companyName: "Post CH AG", eScore: 96.4, totalSavedChf: 14870, trend: "flat" },
  { rank: 4, companyName: "SBB Cargo", eScore: 94.2, totalSavedChf: 12340, trend: "down" },
  { rank: 5, companyName: "Migros Betriebe", eScore: 92.6, totalSavedChf: 10980, trend: "up" },
];
