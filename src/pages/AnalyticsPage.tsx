import { BarChart3 } from "lucide-react";
import { RevenueChart, TrafficChart, CategoryChart } from "@/components/DashboardCharts";

/** Analytics page with detailed charts */
export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Deep dive into your business metrics.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <TrafficChart />
      </div>
      <CategoryChart />
    </div>
  );
}
