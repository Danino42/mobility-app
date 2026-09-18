import { NavLink } from "react-router-dom";
import { X, Map, Route, Trophy, LogOut } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { to: "/", label: "Map & chargers", icon: Map },
  { to: "/routes", label: "My routes", icon: Route },
  { to: "/leaderboard", label: "Company leaderboard", icon: Trophy },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* panel */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 border-r border-border bg-surface transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <span className="text-sm font-medium text-text-muted">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-text-muted hover:text-text"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col px-2 py-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded px-3 py-3 text-sm ${
                  isActive
                    ? "bg-surface-raised text-text"
                    : "text-text-muted hover:bg-surface-raised hover:text-text"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-border px-2 py-3">
          <button className="flex w-full items-center gap-3 rounded px-3 py-3 text-sm text-text-muted hover:bg-surface-raised hover:text-text">
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
