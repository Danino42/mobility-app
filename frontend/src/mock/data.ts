import type {
  CompanyRankingEntry,
  DriverSession,
  LatLng,
  PlannedRoute,
  RouteWaypoint,
} from "../types/domain";
import { generateMockChargers } from "./generateChargers";

export const mockSession: DriverSession = {
  driverName: "D. Kovacs",
  vehicleId: "ZH 481 920",
  vehicleIcon: "car",
  batteryPercent: 62,
  companyName: "BKW Energie AG",
  savedMoneyChf: 370,
  eScore: 98.5,
};

// Today's trip: employee home in Bern -> office in Zurich -> office in
// Luzern -> back home in Bern. Labeled as Start / Goal 1 / Goal 2 / Finish
// so the route reads as a simple sequence rather than a complex itinerary.
export const mockRouteWaypoints: RouteWaypoint[] = [
  { location: { lat: 46.9481, lng: 7.4474 }, label: "Start", placeName: "Home - Bern" },
  { location: { lat: 47.3769, lng: 8.5417 }, label: "Goal 1", placeName: "Office - Zurich" },
  { location: { lat: 47.0502, lng: 8.3093 }, label: "Goal 2", placeName: "Office - Luzern" },
  { location: { lat: 46.9481, lng: 7.4474 }, label: "Finish", placeName: "Home - Bern" },
];

// Mock live position of the car -- currently placed between Bern and
// Zurich, near the Kirchberg motorway corridor.
export const mockCarPosition: LatLng = { lat: 47.03, lng: 7.65 };

// A national-looking network of 50 chargers, generated deterministically
// around real Swiss towns. Meal deals / coffee are bound to a subset of
// these chargers (not all), matching how perks work in reality.
const generatedChargers = generateMockChargers(50);

// One charger near the actual route (Kirchberg, on the Bern-Zurich
// motorway corridor) is promoted to be THE highlighted stop for today's
// route -- shown large on the map with its free meal deal front and
// center. The rest of the generated set still appears, smaller, so the
// map also reflects the wider network.
export const mockRouteChargerId = "chg-route-1";

export const mockChargers = [
  {
    id: mockRouteChargerId,
    name: "BKW Kilchberg (A1)",
    lat: 47.0975,
    lng: 7.5987,
    pricePerKwh: 0.29,
    priceTier: "low" as const,
    available: 5,
    total: 6,
    perk: "meal_deal" as const,
    mealDeal: {
      type: "free" as const,
      vegan: true,
      venueName: "Kirchberg Raststätte",
    },
    rank: "optimal" as const,
    onActiveRoute: true,
  },
  ...generatedChargers,
];

export const mockRoutes: PlannedRoute[] = [
  {
    id: "route-1",
    date: new Date().toISOString(),
    label: "Bern - Zurich - Luzern loop",
    distanceKm: 268,
    chargerStopIds: [mockRouteChargerId],
    status: "in_progress",
  },
  {
    id: "route-2",
    date: new Date(Date.now() + 86400000).toISOString(),
    label: "Bern - site inspection Muri",
    distanceKm: 18,
    chargerStopIds: [],
    status: "planned",
  },
  {
    id: "route-3",
    date: new Date(Date.now() + 3 * 86400000).toISOString(),
    label: "Bern - depot return",
    distanceKm: 6,
    chargerStopIds: [],
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