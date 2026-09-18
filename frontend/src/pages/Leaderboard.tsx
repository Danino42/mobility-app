import { TrendingUp, TrendingDown, Minus, Trophy } from "lucide-react";
import { mockLeaderboard, mockOwnCompanyEntry } from "../mock/data";
import type { CompanyRankingEntry } from "../types/domain";

const trendIcon: Record<CompanyRankingEntry["trend"], typeof TrendingUp> = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const trendColor: Record<CompanyRankingEntry["trend"], string> = {
  up: "text-good",
  down: "text-accent",
  flat: "text-text-faint",
};

function RankRow({ entry, isOwnCompany }: { entry: CompanyRankingEntry; isOwnCompany: boolean }) {
  const TrendIcon = trendIcon[entry.trend];

  return (
    <div
      className={`flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 ${
        isOwnCompany ? "bg-surface-raised" : ""
      }`}
    >
      <span className="w-8 shrink-0 tabular text-[13px] text-text-muted">{entry.rank}</span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium">
          {entry.companyName}
          {isOwnCompany && <span className="ml-2 text-[11px] text-accent">your company</span>}
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="tabular text-[14px] font-medium">{entry.eScore}</span>
        <TrendIcon size={14} className={trendColor[entry.trend]} />
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const { totalCompanies, entries } = mockLeaderboard;

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-[16px] font-medium">Company leaderboard</h1>
        <p className="mt-0.5 text-[12px] text-text-muted">
          Ranked by efficiency score this month · {totalCompanies} companies
        </p>
      </div>

      <div className="mx-4 mt-3 flex items-center gap-3 rounded border border-accent-dim bg-surface px-4 py-3">
        <Trophy size={20} className="text-warn" />
        <div>
          <p className="text-[13px] font-medium">This month's prize</p>
          <p className="text-[12px] text-text-muted">
            Top company gets a fleet-wide charging credit
          </p>
        </div>
      </div>

      <div className="mt-4 border-y border-border bg-surface">
        {entries.map((entry) => (
          <RankRow key={entry.rank} entry={entry} isOwnCompany={false} />
        ))}

        <div className="flex items-center justify-center border-b border-border py-2 text-[12px] tracking-wider text-text-faint">
          · · ·
        </div>

        <RankRow entry={mockOwnCompanyEntry} isOwnCompany />
      </div>
    </div>
  );
}