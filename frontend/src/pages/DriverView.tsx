import { useEffect, useState } from "react";
import { getChargingEvents } from "../api/fleet";
import type { ChargingEvent } from "../types/domain";

const locationColors: Record<ChargingEvent["locationType"], string> = {
  home: "bg-emerald-100 text-emerald-700",
  workplace: "bg-blue-100 text-blue-700",
  public: "bg-orange-100 text-orange-700",
};

export default function DriverView() {
  const [events, setEvents] = useState<ChargingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getChargingEvents()
      .then(setEvents)
      .catch(() => setError("Could not reach the backend yet — is the API running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">My charging history</h1>
        <p className="mt-1 text-slate-500">
          Every charging event, cost and reimbursement status — no hidden logic.
        </p>
      </div>

      {loading && <p className="text-slate-400">Loading…</p>}
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Energy</th>
              <th className="px-4 py-3 font-medium">Cost</th>
              <th className="px-4 py-3 font-medium">Reimbursed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-3">
                  {new Date(e.startTime).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      locationColors[e.locationType]
                    }`}
                  >
                    {e.locationLabel}
                  </span>
                </td>
                <td className="px-4 py-3">{e.energyKwh.toFixed(1)} kWh</td>
                <td className="px-4 py-3">CHF {e.costChf.toFixed(2)}</td>
                <td className="px-4 py-3">{e.reimbursed ? "✅" : "⏳"}</td>
              </tr>
            ))}
            {events.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  No charging events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
