import { apiClient } from "./client";
import type { ChargingEvent, FairnessMetric, FleetSummary } from "../types/domain";

export async function getFleetSummary(): Promise<FleetSummary> {
  const { data } = await apiClient.get<FleetSummary>("/fleet/summary");
  return data;
}

export async function getChargingEvents(params?: {
  driverId?: string;
  vehicleId?: string;
}): Promise<ChargingEvent[]> {
  const { data } = await apiClient.get<ChargingEvent[]>("/charging-events", { params });
  return data;
}

export async function getFairnessMetrics(): Promise<FairnessMetric[]> {
  const { data } = await apiClient.get<FairnessMetric[]>("/fairness");
  return data;
}

export async function getHealth(): Promise<{ status: string }> {
  const { data } = await apiClient.get<{ status: string }>("/health");
  return data;
}
