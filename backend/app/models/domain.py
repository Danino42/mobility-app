from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

ChargingLocationType = Literal["home", "workplace", "public"]


class ChargingEvent(BaseModel):
    id: str
    vehicle_id: str = Field(alias="vehicleId")
    driver_id: str = Field(alias="driverId")
    location_type: ChargingLocationType = Field(alias="locationType")
    location_label: str = Field(alias="locationLabel")
    start_time: datetime = Field(alias="startTime")
    end_time: datetime = Field(alias="endTime")
    energy_kwh: float = Field(alias="energyKwh")
    cost_chf: float = Field(alias="costChf")
    tariff_chf_per_kwh: float = Field(alias="tariffChfPerKwh")
    reimbursed: bool

    model_config = {"populate_by_name": True}


class Vehicle(BaseModel):
    id: str
    plate: str
    make: str
    model: str
    driver_id: str = Field(alias="driverId")
    cost_center: str = Field(alias="costCenter")

    model_config = {"populate_by_name": True}


class Driver(BaseModel):
    id: str
    name: str
    home_charging_access: Literal["own_wallbox", "shared_system", "no_infrastructure"] = Field(
        alias="homeChargingAccess"
    )
    cost_center: str = Field(alias="costCenter")

    model_config = {"populate_by_name": True}


class FairnessMetric(BaseModel):
    driver_id: str = Field(alias="driverId")
    avg_cost_per_kwh: float = Field(alias="avgCostPerKwh")
    home_share: float = Field(alias="homeShare")
    workplace_share: float = Field(alias="workplaceShare")
    public_share: float = Field(alias="publicShare")
    potential_savings_chf: float = Field(alias="potentialSavingsChf")

    model_config = {"populate_by_name": True}


class LocationBreakdown(BaseModel):
    energy_kwh: float = Field(alias="energyKwh")
    cost_chf: float = Field(alias="costChf")

    model_config = {"populate_by_name": True}


class FleetSummary(BaseModel):
    total_vehicles: int = Field(alias="totalVehicles")
    total_energy_kwh_this_month: float = Field(alias="totalEnergyKwhThisMonth")
    total_cost_chf_this_month: float = Field(alias="totalCostChfThisMonth")
    avg_cost_per_kwh: float = Field(alias="avgCostPerKwh")
    by_location_type: dict[ChargingLocationType, LocationBreakdown] = Field(
        alias="byLocationType"
    )

    model_config = {"populate_by_name": True}
