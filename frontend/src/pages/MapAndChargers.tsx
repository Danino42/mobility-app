import { mockChargers, mockRouteWaypoints, mockCarPosition } from "../mock/data";
import GoogleMapView from "../components/GoogleMapView";
import ChargerCard from "../components/ChargerCard";

const LIST_LIMIT = 5;

export default function MapAndChargers() {
  const routeCharger = mockChargers.find((c) => c.onActiveRoute);
  const others = mockChargers.filter((c) => !c.onActiveRoute);

  const optimal = others.filter((c) => c.rank === "optimal").slice(0, LIST_LIMIT);
  const ok = others.filter((c) => c.rank === "ok").slice(0, LIST_LIMIT);
  const skip = others.filter((c) => c.rank === "skip").slice(0, LIST_LIMIT);

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-[16px] font-medium">Today's route</h1>
        <p className="mt-0.5 text-[12px] text-text-muted">
          Start (Bern) - Goal 1 (Zurich) - Goal 2 (Luzern) - Finish (Bern)
        </p>
      </div>

      <GoogleMapView
        chargers={mockChargers}
        routeWaypoints={mockRouteWaypoints}
        carPosition={mockCarPosition}
      />

      <div className="mx-4 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-muted">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-good" /> Optimal
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-warn" /> Still OK
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-accent" /> Higher cost
        </span>
      </div>

      {routeCharger && (
        <div className="mt-4">
          <p className="px-4 pb-1 text-[11px] text-good">On your route - recommended stop</p>
          <div className="border-y border-border bg-surface">
            <ChargerCard charger={routeCharger} />
          </div>
        </div>
      )}

      {optimal.length > 0 && (
        <div className="mt-4">
          <p className="px-4 pb-1 text-[11px] text-good">Other optimal chargers nearby</p>
          <div className="border-y border-border bg-surface">
            {optimal.map((c) => (
              <ChargerCard key={c.id} charger={c} />
            ))}
          </div>
        </div>
      )}

      {ok.length > 0 && (
        <div className="mt-4">
          <p className="px-4 pb-1 text-[11px] text-warn">Still OK</p>
          <div className="border-y border-border bg-surface">
            {ok.map((c) => (
              <ChargerCard key={c.id} charger={c} />
            ))}
          </div>
        </div>
      )}

      {skip.length > 0 && (
        <div className="mt-4">
          <p className="px-4 pb-1 text-[11px] text-accent">Higher cost nearby</p>
          <div className="border-y border-border bg-surface">
            {skip.map((c) => (
              <ChargerCard key={c.id} charger={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}