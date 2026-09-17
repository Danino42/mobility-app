import { NavLink, Outlet } from "react-router-dom";
import { Zap } from "lucide-react";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Zap className="h-5 w-5 text-orange-500" />
            <span>Trusted EV Fleet Charging</span>
          </div>
          <nav className="flex gap-2">
            <NavLink to="/" end className={navLinkClasses}>
              Fleet Dashboard
            </NavLink>
            <NavLink to="/driver" className={navLinkClasses}>
              Driver View
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
