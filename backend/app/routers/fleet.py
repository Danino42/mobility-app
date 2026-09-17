from fastapi import APIRouter, Query

from app.mock_data import MOCK_EVENTS, MOCK_FAIRNESS, compute_fleet_summary

router = APIRouter(tags=["fleet"])


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.get("/fleet/summary")
async def fleet_summary():
    # TODO: replace with an aggregation query against MongoDB's
    # charging_events collection once real data is loaded.
    return compute_fleet_summary()


@router.get("/charging-events")
async def charging_events(
    driver_id: str | None = Query(default=None, alias="driverId"),
    vehicle_id: str | None = Query(default=None, alias="vehicleId"),
):
    # TODO: replace with a MongoDB find() with optional filters.
    events = MOCK_EVENTS
    if driver_id:
        events = [e for e in events if e["driverId"] == driver_id]
    if vehicle_id:
        events = [e for e in events if e["vehicleId"] == vehicle_id]
    return events


@router.get("/fairness")
async def fairness_metrics():
    # TODO: replace with a real fairness computation over charging_events,
    # grouped by driver, comparing home/workplace/public cost exposure.
    return MOCK_FAIRNESS
