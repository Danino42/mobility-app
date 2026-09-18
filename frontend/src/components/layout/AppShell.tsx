import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ScanChargerButton from "../ScanChargerButton";
import { mockSession } from "../../mock/data";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[480px] bg-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header session={mockSession} onMenuClick={() => setSidebarOpen(true)} />
      <main className="pb-8">
        <Outlet />
      </main>
      <ScanChargerButton />
    </div>
  );
}