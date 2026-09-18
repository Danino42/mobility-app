import { CalendarDays } from "lucide-react";
import { mockRoutes, mockChargers } from "../mock/data";
import type { PlannedRoute } from "../types/domain";
import chargerIcon from "../images/charger.png";
import mealDealIcon from "../images/mealdeal.jpg";

const statusStyle: Record<PlannedRoute["status"], { label: string; className: string }> = {
  planned: { label: "Planned", className: "text-text-muted border-border" },
  in_progress: { label: "In progress", className: "text-warn border-warn" },
  done: { label: "Done", className: "text-good border-good" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function MyRoutes() {
  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-[16px] font-medium">My routes</h1>
        <p className="mt-0.5 text-[12px] text-text-muted">Planned trips for the days ahead</p>
      </div>

      <div className="mt-4 flex flex-col gap-2 px-4">
        {mockRoutes.map((route) => {
          const status = statusStyle[route.status];
          const stops = mockChargers.filter((c) => route.chargerStopIds.includes(c.id));

          return (
            <div key={route.id} className="rounded border border-border bg-surface px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-[12px] text-text-muted">
                  <CalendarDays size={13} />
                  {formatDate(route.date)}
                </div>
                <span
                  className={`rounded border px-2 py-0.5 text-[11px] ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <p className="mt-1.5 text-[14px] font-medium">{route.label}</p>
              <p className="mt-0.5 text-[12px] tabular text-text-muted">
                {route.distanceKm} km
              </p>

              {stops.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stops.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-text-muted"
                    >
                      <img
                        src={s.perk === "meal_deal" ? mealDealIcon : chargerIcon}
                        alt=""
                        className={
                          s.perk === "meal_deal"
                            ? "h-3.5 w-3.5 rounded-full object-cover"
                            : "h-3.5 w-3.5 object-contain"
                        }
                      />
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
