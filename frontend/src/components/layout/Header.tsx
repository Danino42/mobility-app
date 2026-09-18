import { Menu, BatteryMedium } from "lucide-react";
import type { DriverSession } from "../../types/domain";
import carIcon from "../../images/carback.png";

interface HeaderProps {
  session: DriverSession;
  onMenuClick: () => void;
}

function batteryColor(percent: number): string {
  if (percent < 20) return "text-accent";
  if (percent < 40) return "text-warn";
  return "text-good";
}

export default function Header({ session, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="text-text-muted hover:text-text"
        >
          <Menu size={22} />
        </button>

        <img src={carIcon} alt="" className="h-7 w-7 shrink-0 object-contain" />

        <div className="flex flex-1 items-center gap-2 overflow-hidden">
          <span className="truncate text-[15px] font-medium">{session.driverName}</span>
          <span className="text-text-faint">·</span>
          <span className="truncate text-[13px] text-text-muted">{session.vehicleId}</span>
        </div>

        <div
          className={`flex items-center gap-1 text-[13px] tabular ${batteryColor(
            session.batteryPercent
          )}`}
        >
          <BatteryMedium size={18} />
          {session.batteryPercent}%
        </div>
      </div>

            <div className="flex divide-x divide-border border-t border-border">
        <div className="flex-1 px-4 py-2">
          <p className="text-[11px] text-text-muted">Saved money</p>
          <p className="tabular text-[15px] font-medium text-good">
            {session.savedMoneyChf.toLocaleString("de-CH")} CHF
          </p>
        </div>
        <div className="flex-1 px-4 py-2">
          <p className="text-[11px] text-text-muted">E-Score</p>
          <p className="tabular text-[15px] font-medium text-good">{session.eScore}</p>
          <p className="tabular text-[11px] text-text-faint">
            over {session.lifetimeKm.toLocaleString("de-CH")} km
          </p>
        </div>
      </div>
    </header>
  );
}
