"""
In-memory mock data so the API returns something useful before MongoDB
is populated. Swap this out for real DB queries as the project develops.
"""

from datetime import datetime, timedelta

MOCK_EVENTS = [
    {
        "id": "evt-1",
        "vehicleId": "veh-1",
        "driverId": "driver-1",
        "locationType": "home",
        "locationLabel": "Home - Bern",
        "startTime": (datetime.utcnow() - timedelta(days=1, hours=20)).isoformat(),
        "endTime": (datetime.utcnow() - timedelta(days=1, hours=16)).isoformat(),
        "energyKwh": 22.5,
        "costChf": 6.75,
        "tariffChfPerKwh": 0.30,
        "reimbursed": True,
    },
    {
        "id": "evt-2",
        "vehicleId": "veh-1",
        "driverId": "driver-1",
        "locationType": "workplace",
        "locationLabel": "HQ Garage Slot 4",
        "startTime": (datetime.utcnow() - timedelta(days=3, hours=8)).isoformat(),
        "endTime": (datetime.utcnow() - timedelta(days=3, hours=4)).isoformat(),
        "energyKwh": 18.0,
        "costChf": 4.50,
        "tariffChfPerKwh": 0.25,
        "reimbursed": True,
    },
    {
        "id": "evt-3",
        "vehicleId": "veh-2",
        "driverId": "driver-2",
        "locationType": "public",
        "locationLabel": "Ionity Zurich",
        "startTime": (datetime.utcnow() - timedelta(days=2, hours=10)).isoformat(),
        "endTime": (datetime.utcnow() - timedelta(days=2, hours=9, minutes=30)).isoformat(),
        "energyKwh": 35.0,
        "costChf": 24.50,
        "tariffChfPerKwh": 0.70,
        "reimbursed": False,
    },
    {
        "id": "evt-4",
        "vehicleId": "veh-2",
        "driverId": "driver-2",
        "locationType": "home",
        "locationLabel": "Shared wallbox - Zurich",
        "startTime": (datetime.utcnow() - timedelta(days=5, hours=22)).isoformat(),
        "endTime": (datetime.utcnow() - timedelta(days=5, hours=18)).isoformat(),
        "energyKwh": 15.0,
        "costChf": 4.95,
        "tariffChfPerKwh": 0.33,
        "reimbursed": True,
    },
]

MOCK_FAIRNESS = [
    {
        "driverId": "driver-1",
        "avgCostPerKwh": 0.27,
        "homeShare": 0.55,
        "workplaceShare": 0.45,
        "publicShare": 0.0,
        "potentialSavingsChf": 3.20,
    },
    {
        "driverId": "driver-2",
        "avgCostPerKwh": 0.52,
        "homeShare": 0.3,
        "workplaceShare": 0.0,
        "publicShare": 0.7,
        "potentialSavingsChf": 41.80,
    },
]


def compute_fleet_summary() -> dict:
    by_location: dict[str, dict[str, float]] = {
        "home": {"energyKwh": 0.0, "costChf": 0.0},
        "workplace": {"energyKwh": 0.0, "costChf": 0.0},
        "public": {"energyKwh": 0.0, "costChf": 0.0},
    }
    total_energy = 0.0
    total_cost = 0.0

    for event in MOCK_EVENTS:
        loc = event["locationType"]
        by_location[loc]["energyKwh"] += event["energyKwh"]
        by_location[loc]["costChf"] += event["costChf"]
        total_energy += event["energyKwh"]
        total_cost += event["costChf"]

    return {
        "totalVehicles": 2,
        "totalEnergyKwhThisMonth": total_energy,
        "totalCostChfThisMonth": total_cost,
        "avgCostPerKwh": round(total_cost / total_energy, 3) if total_energy else 0,
        "byLocationType": by_location,
    }
