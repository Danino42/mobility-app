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

export type NearbyCategory =
  | "fast_food"
  | "groceries"
  | "kiosk"
  | "pharmacy"
  | "atm"
  | "restroom"
  | "supermarket"
  | "bakery";

export interface NearbyPlace {
  id: string;
  name: string;
  category: NearbyCategory;
  walkMinutes: number;
}

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
  nearby?: NearbyPlace[];
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

export interface LeaderboardData {
  totalCompanies: number;
  entries: CompanyRankingEntry[]; // top entries, own company always included
  ownCompanyName: string;
}

export type PreferenceId =
  | "home_charging"
  | "coffee"
  | "vegan"
  | "vegetarian"
  | "fast_food"
  | "gluten_free"
  | "quiet_stops"
  | "fast_dc_charging"
  | "loyalty_deals";

export interface PreferenceQuestion {
  id: PreferenceId;
  question: string;
}

export interface UserPreferences {
  answers: Partial<Record<PreferenceId, boolean>>;
  completedOnboarding: boolean;
}

export type FeedbackMood = "happy" | "neutral" | "sad";

export interface FeedbackComment {
  id: string;
  authorName: string;
  mood: FeedbackMood;
  text: string;
  upvotes: number;
  downvotes: number;
  createdAt: string; // ISO date
}
