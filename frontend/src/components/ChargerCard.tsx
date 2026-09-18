import type { ChargerStop } from "../types/domain";
import PerkBadge from "./PerkBadge";
import PriceTierBadge from "./PriceTierBadge";
import NearbyPlaces from "./NearbyPlaces";
import chargerIcon from "../images/charger.png";

const rankStyle: Record<ChargerStop["rank"], { label: string; className: string }> = {
  optimal: { label: "Optimal", className: "border-good bg-good-bg text-good" },
  ok: { label: "Still OK", className: "border-warn bg-warn-bg text-warn" },
  skip: { label: "Avoid", className: "border-accent bg-accent-bg text-accent" },
};

export default function ChargerCard({ charger }: { charger: ChargerStop }) {
  const rank = rankStyle[charger.rank];

  return (
    <div className="flex items-start gap-3 border-b border-border px-4 py-3 last:border-b-0">
      <img src={chargerIcon} alt="" className="mt-0.5 h-9 w-9 shrink-0 object-contain" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[14px] font-medium">{charger.name}</span>
          <span
            className={`shrink-0 rounded border px-2 py-0.5 text-[11px] font-medium ${rank.className}`}
          >
            {rank.label}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-text-muted">
          <PriceTierBadge tier={charger.priceTier} pricePerKwh={charger.pricePerKwh} />
          <span>·</span>
          <span className="tabular">
            {charger.available}/{charger.total} free
          </span>
        </div>
        {charger.perk !== "none" && (
          <div className="mt-0.5">
            <PerkBadge perk={charger.perk} mealDeal={charger.mealDeal} />
          </div>
        )}
        {charger.nearby && charger.nearby.length > 0 && (
          <NearbyPlaces places={charger.nearby} />
        )}
      </div>
    </div>
  );
}