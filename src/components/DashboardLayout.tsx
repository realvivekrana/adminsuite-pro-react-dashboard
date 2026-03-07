import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { cn } from "@/lib/utils";

/** Main dashboard layout with sidebar and navbar */
export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <div className={cn("transition-all duration-300", collapsed ? "lg:ml-[68px]" : "lg:ml-[260px]")}>
        <TopNavbar onMenuToggle={() => setCollapsed((v) => !v)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
