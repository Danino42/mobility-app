import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import type { ChargerStop } from "../types/domain";
import chargerIcon from "../images/charger.png";
import mealDealIcon from "../images/mealdeal.jpg";

interface GoogleMapViewProps {
  chargers: ChargerStop[];
}

const rankRingColor: Record<ChargerStop["rank"], string> = {
  optimal: "#3d7a45",
  ok: "#a1660f",
  skip: "#c8382a",
};

// Centered on Bern, roughly the midpoint of the mock charger corridor.
const DEFAULT_CENTER = { lat: 46.955, lng: 7.475 };

function ChargerMarker({
  charger,
  onSelect,
}: {
  charger: ChargerStop;
  onSelect: (c: ChargerStop) => void;
}) {
  const hasMealDeal = charger.perk === "meal_deal";
  const icon = hasMealDeal ? mealDealIcon : chargerIcon;

  return (
    <AdvancedMarker
      position={{ lat: charger.lat, lng: charger.lng }}
      onClick={() => onSelect(charger)}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-sm"
        style={{ border: `2px solid ${rankRingColor[charger.rank]}` }}
      >
        <img
          src={icon}
          alt=""
          className={hasMealDeal ? "h-6 w-6 rounded-full object-cover" : "h-5 w-5 object-contain"}
        />
      </div>
    </AdvancedMarker>
  );
}

export default function GoogleMapView({ chargers }: GoogleMapViewProps) {
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
    <div className="mx-4 mt-3 h-56 overflow-hidden rounded border border-border">
      <APIProvider apiKey={apiKey}>
        <Map
          mapId="fleet-charging-map"
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={11}
          gestureHandling="greedy"
          disableDefaultUI
          style={{ width: "100%", height: "100%" }}
        >
          {chargers.map((c) => (
            <ChargerMarker key={c.id} charger={c} onSelect={setSelected} />
          ))}

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
