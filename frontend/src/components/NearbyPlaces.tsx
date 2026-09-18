import {
  UtensilsCrossed,
  ShoppingCart,
  Newspaper,
  Cross,
  Landmark,
  DoorOpen,
  Store,
  Croissant,
} from "lucide-react";
import type { NearbyCategory, NearbyPlace } from "../types/domain";

const categoryConfig: Record<NearbyCategory, { label: string; icon: typeof UtensilsCrossed }> = {
  fast_food: { label: "Fast food", icon: UtensilsCrossed },
  groceries: { label: "Groceries", icon: ShoppingCart },
  kiosk: { label: "Kiosk", icon: Newspaper },
  pharmacy: { label: "Pharmacy", icon: Cross },
  atm: { label: "ATM", icon: Landmark },
  restroom: { label: "Restroom", icon: DoorOpen },
  supermarket: { label: "Supermarket", icon: Store },
  bakery: { label: "Bakery", icon: Croissant },
};

export default function NearbyPlaces({ places }: { places: NearbyPlace[] }) {
  if (places.length === 0) return null;
  const shown = places.slice(0, 4);

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {shown.map((place) => {
        const { label, icon: Icon } = categoryConfig[place.category];
        return (
          <span
            key={place.id}
            title={place.name}
            className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-text-muted"
          >
            <Icon size={11} />
            {label}
            <span className="tabular text-text-faint">{place.walkMinutes}'</span>
          </span>
        );
      })}
    </div>
  );
}