import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { RevenueChart, TrafficChart, CategoryChart } from "@/components/DashboardCharts";
import { RecentActivity } from "@/components/RecentActivity";

const stats = [
  { title: "Total Users", value: "24,563", change: "+12.5% from last month", changeType: "positive" as const, icon: Users },
  { title: "Revenue", value: "$89,420", change: "+8.2% from last month", changeType: "positive" as const, icon: DollarSign },
  { title: "Orders", value: "1,843", change: "-3.1% from last month", changeType: "negative" as const, icon: ShoppingCart },
  { title: "Growth", value: "23.8%", change: "+4.3% from last month", changeType: "positive" as const, icon: TrendingUp },
];

/** Main dashboard page with stats, charts, and activity */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TrafficChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryChart />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
