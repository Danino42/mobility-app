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

export interface ChargerStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  pricePerKwh: number;
  available: number;
  total: number;
  perk: ChargerPerk;
  rank: "optimal" | "ok" | "skip";
}

export interface PlannedRoute {
  id: string;
  date: string; // ISO date
  label: string; // e.g. "Zurich -> Bern client visit"
  distanceKm: number;
  chargerStopIds: string[];
  status: "planned" | "in_progress" | "done";
}

export interface CompanyRankingEntry {
  rank: number;
  companyName: string;
  eScore: number;
  totalSavedChf: number;
  trend: "up" | "down" | "flat";
}
