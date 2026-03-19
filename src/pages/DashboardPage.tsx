import { DollarSign, ShoppingCart, Users, TrendingUp, Package, ArrowUpRight } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { SalesTrendChart, WeeklySalesChart, TrafficChart, TopProductsChart } from "@/components/DashboardCharts";
import { RecentActivity } from "@/components/RecentActivity";
import { motion } from "framer-motion";
import { mockOrders, mockProducts } from "@/data/mockData";
import { cn } from "@/lib/utils";

const stats = [
  { title: "Total Revenue", value: "$128,430", change: "+18.2%", changeType: "positive" as const, icon: DollarSign, iconColor: "text-[#008060]", iconBg: "bg-[#008060]/10" },
  { title: "Total Orders", value: "1,042", change: "+12.5%", changeType: "positive" as const, icon: ShoppingCart, iconColor: "text-indigo-500", iconBg: "bg-indigo-500/10" },
  { title: "Customers", value: "8,340", change: "+9.1%", changeType: "positive" as const, icon: Users, iconColor: "text-amber-500", iconBg: "bg-amber-500/10" },
  { title: "Avg. Order Value", value: "$123.25", change: "-2.4%", changeType: "negative" as const, icon: TrendingUp, iconColor: "text-purple-500", iconBg: "bg-purple-500/10" },
];

const statusConfig = {
  fulfilled: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
  refunded: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export default function DashboardPage() {
  const lowStock = mockProducts.filter((p) => p.stock < 20);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Overview</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Mar 19, 2026 — Your store at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="h-8 px-3 rounded-lg border border-border bg-secondary/50 text-xs text-foreground outline-none focus:ring-2 focus:ring-[#008060]/20">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <StatsCard key={s.title} {...s} index={i} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SalesTrendChart />
        </div>
        <TrafficChart />
      </div>

      {/* Charts row 2 + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <WeeklySalesChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TopProductsChart />
        </div>

        {/* Low stock alert */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Low Stock</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Items needing restock</p>
            </div>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border">
            {lowStock.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 px-5 py-3 hover:bg-accent/30 transition-colors"
              >
                <img src={p.image} alt={p.name} className="h-8 w-8 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.category}</p>
                </div>
                <span className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0",
                  p.stock <= 5 ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {p.stock} left
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
