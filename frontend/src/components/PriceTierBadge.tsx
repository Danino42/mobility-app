import type { PriceTier } from "../types/domain";

const tierConfig: Record<PriceTier, { symbol: string; className: string }> = {
  low: { symbol: "$", className: "text-good bg-good-bg border-good" },
  mid: { symbol: "$$", className: "text-warn bg-warn-bg border-warn" },
  high: { symbol: "$$$", className: "text-accent bg-accent-bg border-accent" },
};

export default function PriceTierBadge({
  tier,
  pricePerKwh,
}: {
  tier: PriceTier;
  pricePerKwh: number;
}) {
  const { symbol, className } = tierConfig[tier];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium ${className}`}
    >
      {symbol}
      <span className="tabular font-normal opacity-80">
        {pricePerKwh.toFixed(2)}/kWh
      </span>
    </span>
  );
}