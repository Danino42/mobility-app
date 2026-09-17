import { useEffect, useState } from "react";
import { getFairnessMetrics, getFleetSummary } from "../api/fleet";
import type { FairnessMetric, FleetSummary } from "../types/domain";
import StatCard from "../components/StatCard";

export default function FleetDashboard() {
  const [summary, setSummary] = useState<FleetSummary | null>(null);
  const [fairness, setFairness] = useState<FairnessMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getFleetSummary(), getFairnessMetrics()])
      .then(([summaryData, fairnessData]) => {
        setSummary(summaryData);
        setFairness(fairnessData);
      })
      .catch(() => setError("Could not reach the backend yet — is the API running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Fleet Dashboard</h1>
        <p className="mt-1 text-slate-500">
          Transparent overview of charging cost, usage and fairness across home,
          workplace and public locations.
        </p>
      </div>

      {loading && <p className="text-slate-400">Loading…</p>}
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error} Start the backend with <code>uvicorn app.main:app --reload</code> in{" "}
          <code>/backend</code>.
        </div>
      )}

      {summary && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Vehicles" value={String(summary.totalVehicles)} />
          <StatCard
            label="Energy this month"
            value={`${summary.totalEnergyKwhThisMonth.toFixed(0)} kWh`}
          />
          <StatCard
            label="Cost this month"
            value={`CHF ${summary.totalCostChfThisMonth.toFixed(0)}`}
          />
          <StatCard
            label="Avg. cost / kWh"
            value={`CHF ${summary.avgCostPerKwh.toFixed(2)}`}
          />
        </div>
      )}

      {fairness.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Fairness &amp; savings potential
          </h2>
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Driver</th>
                <th className="pb-2 font-medium">Home %</th>
                <th className="pb-2 font-medium">Workplace %</th>
                <th className="pb-2 font-medium">Public %</th>
                <th className="pb-2 font-medium">Avg CHF/kWh</th>
                <th className="pb-2 font-medium">Potential savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fairness.map((f) => (
                <tr key={f.driverId}>
                  <td className="py-2">{f.driverId}</td>
                  <td className="py-2">{(f.homeShare * 100).toFixed(0)}%</td>
                  <td className="py-2">{(f.workplaceShare * 100).toFixed(0)}%</td>
                  <td className="py-2">{(f.publicShare * 100).toFixed(0)}%</td>
                  <td className="py-2">{f.avgCostPerKwh.toFixed(2)}</td>
                  <td className="py-2">CHF {f.potentialSavingsChf.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
