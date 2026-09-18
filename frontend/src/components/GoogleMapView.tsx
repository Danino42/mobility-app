import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow, Polyline } from "@vis.gl/react-google-maps";
import type { ChargerStop, LatLng, RouteWaypoint } from "../types/domain";
import chargerIcon from "../images/charger.png";
import mealDealIcon from "../images/mealdeal.jpg";
import carIcon from "../images/carback.png";
import { useDirectionsPath } from "./useDirectionsPath";

interface GoogleMapViewProps {
  chargers: ChargerStop[];
  routeWaypoints: RouteWaypoint[];
  carPosition: LatLng;
}

const rankRingColor: Record<ChargerStop["rank"], string> = {
  optimal: "#3d7a45",
  ok: "#a1660f",
  skip: "#c8382a",
};

const DEFAULT_CENTER = { lat: 47.06, lng: 7.95 };

function offerLabel(charger: ChargerStop): string | null {
  if (!charger.mealDeal) return null;
  return charger.mealDeal.type === "free"
    ? "FREE MEAL"
    : `-${charger.mealDeal.discountPercent}% meal`;
}

function WaypointMarker({ waypoint }: { waypoint: RouteWaypoint }) {
  return (
    <AdvancedMarker position={waypoint.location} zIndex={15}>
      <div className="flex flex-col items-center gap-1">
        <span className="whitespace-nowrap rounded-full bg-[#241c1a] px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
          {waypoint.label}
        </span>
        <div className="h-3 w-3 rounded-full border-2 border-white bg-[#241c1a] shadow-sm" />
      </div>
    </AdvancedMarker>
  );
}

function ChargerMarker({
  charger,
  onSelect,
}: {
  charger: ChargerStop;
  onSelect: (c: ChargerStop) => void;
}) {
  const hasMealDeal = charger.perk === "meal_deal";
  const isRouteHighlight = Boolean(charger.onActiveRoute);
  const icon = hasMealDeal ? mealDealIcon : chargerIcon;
  const offer = offerLabel(charger);

  // Only the one charger tied to today's active route renders large with
  // its offer spelled out. Everything else in the network renders small,
  // scaled a little by rank so better options are still slightly more
  // noticeable without competing with the highlighted stop.
  const size = isRouteHighlight ? 64 : charger.rank === "optimal" ? 26 : 20;
  const ringWidth = isRouteHighlight ? 4 : 1.5;

  return (
    <AdvancedMarker
      position={{ lat: charger.lat, lng: charger.lng }}
      onClick={() => onSelect(charger)}
      zIndex={isRouteHighlight ? 30 : charger.rank === "optimal" ? 5 : 1}
    >
      <div className="flex flex-col items-center gap-1">
        <div
          className="flex items-center justify-center rounded-full bg-surface shadow-md"
          style={{
            width: size,
            height: size,
            border: `${ringWidth}px solid ${rankRingColor[charger.rank]}`,
          }}
        >
          <img
            src={icon}
            alt=""
            style={{
              width: hasMealDeal ? size * 0.72 : size * 0.6,
              height: hasMealDeal ? size * 0.72 : size * 0.6,
              borderRadius: hasMealDeal ? "9999px" : 0,
              objectFit: hasMealDeal ? "cover" : "contain",
            }}
          />
        </div>
        {isRouteHighlight && offer && (
          <span className="whitespace-nowrap rounded-full bg-good px-2.5 py-1 text-[13px] font-medium text-white shadow-md">
            {offer}
          </span>
        )}
      </div>
    </AdvancedMarker>
  );
}

function CarMarker({ position }: { position: LatLng }) {
  return (
    <AdvancedMarker position={position} zIndex={20}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-surface shadow-md">
        <img src={carIcon} alt="Your car" className="h-6 w-6 object-contain" />
      </div>
    </AdvancedMarker>
  );
}

function RoutePolyline({ waypoints }: { waypoints: RouteWaypoint[] }) {
  const { path } = useDirectionsPath(waypoints);
  if (!path) return null;
  return <Polyline path={path} strokeColor="#c8382a" strokeOpacity={0.85} strokeWeight={4} />;
}

export default function GoogleMapView({
  chargers,
  routeWaypoints,
  carPosition,
}: GoogleMapViewProps) {
  const [selected, setSelected] = useState<ChargerStop | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  if (!apiKey) {
    return (
      <div className="mx-4 mt-3 flex h-56 flex-col items-center justify-center gap-1 rounded border border-border bg-surface px-4 text-center">
        <p className="text-[13px] font-medium">Map unavailable</p>
        <p className="text-[12px] text-text-muted">
          Set VITE_GOOGLE_MAPS_API_KEY in your .env file to show the live map.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-3 h-[62vh] min-h-[420px] overflow-hidden rounded border border-border">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId="fleet-charging-map"
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={9}
          gestureHandling="greedy"
          disableDefaultUI
          style={{ width: "100%", height: "100%" }}
        >
          <RoutePolyline waypoints={routeWaypoints} />

          {routeWaypoints.map((w) => (
            <WaypointMarker key={w.label} waypoint={w} />
          ))}

          {chargers.map((c) => (
            <ChargerMarker key={c.id} charger={c} onSelect={setSelected} />
          ))}

          <CarMarker position={carPosition} />

          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="min-w-[160px] p-1">
                <p className="text-[13px] font-medium text-[#241c1a]">{selected.name}</p>
                <p className="mt-0.5 text-[12px] text-[#8a7a74]">
                  CHF {selected.pricePerKwh.toFixed(2)}/kWh · {selected.available}/
                  {selected.total} free
                </p>
                {selected.mealDeal && (
                  <p className="mt-1 text-[12px] text-[#a1660f]">
                    {selected.mealDeal.type === "free"
                      ? "Free meal"
                      : `${selected.mealDeal.discountPercent}% off meal`}{" "}
                    at {selected.mealDeal.venueName}
                    {selected.mealDeal.vegan ? " · vegan" : ""}
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}