import type { ChargerStop } from "../types/domain";

interface MapPlaceholderProps {
  chargers: ChargerStop[];
}

const rankDot: Record<ChargerStop["rank"], string> = {
  optimal: "bg-good",
  ok: "bg-warn",
  skip: "bg-accent",
};

// Rough projection of the mock lat/lng range onto a 0-100 box, just for
// placeholder pin placement. Replace this whole component with a real
// maps SDK (e.g. Mapbox GL, Leaflet, Google Maps) -- keep the same props.
function project(lat: number, lng: number) {
  const x = ((lng - 7.43) / (7.49 - 7.43)) * 100;
  const y = 100 - ((lat - 46.91) / (46.97 - 46.91)) * 100;
  return { x: Math.min(95, Math.max(5, x)), y: Math.min(95, Math.max(5, y)) };
}

export default function MapPlaceholder({ chargers }: MapPlaceholderProps) {
  return (
    <div className="relative mx-4 mt-3 h-56 overflow-hidden rounded border border-border bg-surface">
      {/* faint grid to suggest a map without pretending to be one */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {chargers.map((c) => {
        const { x, y } = project(c.lat, c.lng);
        return (
          <div
            key={c.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${rankDot[c.rank]}`} />
          </div>
        );
      })}

      <span className="absolute bottom-2 right-2 text-[10px] text-text-faint">
        map view — today's route
      </span>
    </div>
  );
}
