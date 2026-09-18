// Core domain types for the mobile driver app.

export interface DriverSession {
  driverName: string;
  vehicleId: string;
  vehicleIcon: string; // emoji or short label used as the "fun icon"
  batteryPercent: number;
  companyName: string;
  savedMoneyChf: number;
  eScore: number; // efficiency score, e.g. 98.5
}

export type ChargerPerk = "meal_deal" | "coffee" | "lounge" | "none";

export interface MealDealDetail {
  type: "free" | "discounted";
  discountPercent?: number; // present when type is "discounted"
  vegan: boolean;
  venueName: string;
}

export type PriceTier = "low" | "mid" | "high";

export interface ChargerStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  pricePerKwh: number;
  priceTier: PriceTier;
  available: number;
  total: number;
  perk: ChargerPerk;
  mealDeal?: MealDealDetail;
  rank: "optimal" | "ok" | "skip";
  onActiveRoute?: boolean; // true for the single highlighted stop on today's route
}

export interface PlannedRoute {
  id: string;
  date: string; // ISO date
  label: string; // e.g. "Zurich -> Bern client visit"
  distanceKm: number;
  chargerStopIds: string[];
  status: "planned" | "in_progress" | "done";
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface RouteWaypoint {
  location: LatLng;
  label: string; // "Start", "Goal 1", "Goal 2", "Finish"
  placeName: string; // "Home - Bern", "Office - Zurich", ...
}

export interface CompanyRankingEntry {
  rank: number;
  companyName: string;
  eScore: number;
  totalSavedChf: number;
  trend: "up" | "down" | "flat";
}
