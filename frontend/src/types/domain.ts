// Core domain types for Trusted EV Fleet Charging
// Mirrors the three charging realities from the BKW challenge brief:
// home, workplace, public.

export type ChargingLocationType = "home" | "workplace" | "public";

export interface ChargingEvent {
  id: string;
  vehicleId: string;
  driverId: string;
  locationType: ChargingLocationType;
  locationLabel: string; // e.g. "Home - Bern", "HQ Garage Slot 4", "Ionity Zurich"
  startTime: string; // ISO datetime
  endTime: string; // ISO datetime
  energyKwh: number;
  costChf: number;
  tariffChfPerKwh: number;
  reimbursed: boolean;
}

export interface Vehicle {
  id: string;
  plate: string;
  make: string;
  model: string;
  driverId: string;
  costCenter: string;
}

export interface Driver {
  id: string;
  name: string;
  homeChargingAccess: "own_wallbox" | "shared_system" | "no_infrastructure";
  costCenter: string;
}

export interface FairnessMetric {
  driverId: string;
  avgCostPerKwh: number;
  homeShare: number; // fraction of charging done at home (0-1)
  workplaceShare: number;
  publicShare: number;
  potentialSavingsChf: number; // estimated savings if shifted to cheaper locations
}

export interface FleetSummary {
  totalVehicles: number;
  totalEnergyKwhThisMonth: number;
  totalCostChfThisMonth: number;
  avgCostPerKwh: number;
  byLocationType: Record<ChargingLocationType, { energyKwh: number; costChf: number }>;
}
