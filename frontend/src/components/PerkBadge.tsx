import coffeeIcon from "../images/coffee.png";
import mealDealIcon from "../images/mealdeal.jpg";
import type { ChargerPerk, MealDealDetail } from "../types/domain";

interface PerkBadgeProps {
  perk: ChargerPerk;
  mealDeal?: MealDealDetail;
}

export default function PerkBadge({ perk, mealDeal }: PerkBadgeProps) {
  if (perk === "none") return null;

  if (perk === "meal_deal" && mealDeal) {
    const dealLabel =
      mealDeal.type === "free"
        ? "Free meal"
        : `${mealDeal.discountPercent}% off meal`;

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-warn-bg bg-warn-bg px-2 py-0.5 text-[11px] text-warn">
        <img src={mealDealIcon} alt="" className="h-3.5 w-3.5 rounded-full object-cover" />
        {dealLabel}
        {mealDeal.vegan && <span className="text-good">· vegan</span>}
      </span>
    );
  }

  if (perk === "coffee") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-warn-bg bg-warn-bg px-2 py-0.5 text-[11px] text-warn">
        <img src={coffeeIcon} alt="" className="h-3.5 w-3.5 object-contain" />
        Coffee
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-warn-bg bg-warn-bg px-2 py-0.5 text-[11px] text-warn">
      Lounge
    </span>
  );
}
