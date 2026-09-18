import { Plug } from "lucide-react";
import type { ChargerStop } from "../types/domain";
import PerkBadge from "./PerkBadge";

const rankStyle: Record<ChargerStop["rank"], { label: string; className: string }> = {
  optimal: { label: "Optimal", className: "border-good text-good" },
  ok: { label: "Still OK", className: "border-warn text-warn" },
  skip: { label: "Avoid", className: "border-accent text-accent" },
};

export default function ChargerCard({ charger }: { charger: ChargerStop }) {
  const rank = rankStyle[charger.rank];

  return (
    <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[14px] font-medium">{charger.name}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-text-muted">
          <span className="tabular">CHF {charger.pricePerKwh.toFixed(2)}/kWh</span>
          <span>·</span>
          <span className="tabular">
            {charger.available}/{charger.total} free
          </span>
          <PerkBadge perk={charger.perk} />
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span
          className={`rounded border px-2 py-0.5 text-[11px] font-medium ${rank.className}`}
        >
          {rank.label}
        </span>
        <Plug size={14} className="text-text-faint" />
      </div>
    </div>
  );
}
