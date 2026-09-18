import { mockChargers } from "../mock/data";
import GoogleMapView from "../components/GoogleMapView";
import ChargerCard from "../components/ChargerCard";

export default function MapAndChargers() {
  const optimal = mockChargers.filter((c) => c.rank === "optimal");
  const ok = mockChargers.filter((c) => c.rank === "ok");
  const skip = mockChargers.filter((c) => c.rank === "skip");

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-[16px] font-medium">Today's route</h1>
        <p className="mt-0.5 text-[12px] text-text-muted">
          Recommended charging stops along your planned trip
        </p>
      </div>

      <GoogleMapView chargers={mockChargers} />

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

      <div className="mt-4">
        <p className="px-4 pb-1 text-[11px] text-good">Optimal stop</p>
        <div className="border-y border-border bg-surface">
          {optimal.map((c) => (
            <ChargerCard key={c.id} charger={c} />
          ))}
        </div>
      </div>

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
