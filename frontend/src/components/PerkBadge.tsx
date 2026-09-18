import { Coffee, UtensilsCrossed } from "lucide-react";
import type { ChargerPerk } from "../types/domain";

const perkConfig: Record<Exclude<ChargerPerk, "none">, { label: string; icon: typeof Coffee }> = {
  meal_deal: { label: "Meal deal", icon: UtensilsCrossed },
  coffee: { label: "Coffee", icon: Coffee },
  lounge: { label: "Lounge", icon: Coffee },
};

export default function PerkBadge({ perk }: { perk: ChargerPerk }) {
  if (perk === "none") return null;
  const { label, icon: Icon } = perkConfig[perk];
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-warn/40 px-2 py-0.5 text-[11px] text-warn">
      <Icon size={11} />
      {label}
    </span>
  );
}
