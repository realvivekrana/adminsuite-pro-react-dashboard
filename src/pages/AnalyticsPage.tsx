import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Users, BarChart3 } from "lucide-react";
import { salesTrendData, topProductsData, trafficSourceData, weeklyData } from "@/data/mockData";
import { useStore } from "@/store/useStore";

// ─── Types ────────────────────────────────────────────────────────────────────
type Range = "7d" | "30d" | "90d" | "12m";

const RANGE_LABELS: Record<Range, string> = {
  "7d": "7 Days", "30d": "30 Days", "90d": "90 Days", "12m": "12 Months",
};

// ─── Tooltip style hook ───────────────────────────────────────────────────────
function useTooltipStyle(theme: string) {
  return {
    backgroundColor: theme === "dark" ? "hsl(222,47%,8%)" : "#fff",
    border: `1px solid ${theme === "dark" ? "hsl(222,47%,14%)" : "hsl(220,13%,91%)"}`,
    borderRadius: "8px", fontSize: "12px",
    color: theme === "dark" ? "#fff" : "#0f172a",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  };
}

const axisStyle = { fontSize: 11, fill: "hsl(218,11%,55%)" };
const gridColor = (theme: string) => theme === "dark" ? "hsl(222,47%,14%)" : "hsl(220,13%,91%)";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label, prefix = "$" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs space-y-1.5">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-foreground capitalize">{p.dataKey}:</span>
          <span className="font-bold text-foreground">{prefix}{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, change, icon: Icon, color, bg, index }: {
  label: string; value: string; change: string; icon: any; color: string; bg: string; index: number;
}) {
  const isPos = change.startsWith("+");
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="glass-card rounded-xl p-5 hover:border-[#008060]/30 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`h-10 w-10 rounded-lg ${bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isPos ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-500"}`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("12m");
  const { theme } = useStore();
  const tooltipStyle = useTooltipStyle(theme);

  // Slice data based on range
  const revenueData = useMemo(() => {
    if (range === "7d") return weeklyData.map(d => ({ month: d.day, revenue: d.sales, orders: Math.round(d.sales / 120) }));
    if (range === "30d") return salesTrendData.slice(-4).map(d => ({ ...d }));
    if (range === "90d") return salesTrendData.slice(-6);
    return salesTrendData;
  }, [range]);

  const kpis = [
    { label: "Total Revenue",  value: "$1.28M", change: "+18.4%", icon: DollarSign,   color: "text-[#008060]",   bg: "bg-[#008060]/10"   },
    { label: "Total Orders",   value: "9,420",  change: "+12.1%", icon: ShoppingCart, color: "text-blue-500",    bg: "bg-blue-500/10"    },
    { label: "New Customers",  value: "3,890",  change: "+8.7%",  icon: Users,        color: "text-violet-500",  bg: "bg-violet-500/10"  },
    { label: "Avg. Order Val", value: "$136",   change: "+5.2%",  icon: TrendingUp,   color: "text-amber-500",   bg: "bg-amber-500/10"   },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">Deep dive into your business performance</p>
        </div>
        {/* Date Range Selector */}
        <div className="flex items-center gap-1 bg-secondary rounded-xl p-1 w-fit">
          {(Object.keys(RANGE_LABELS) as Range[]).map((r) => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                range === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}>
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} index={i} />)}
      </div>

      {/* Revenue Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <h3 className="text-sm font-bold text-foreground">Revenue Overview</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Revenue & orders trend — {RANGE_LABELS[range]}</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#008060]" />Revenue</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />Orders</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#008060" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#008060" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor(theme)} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#008060" strokeWidth={2.5} fill="url(#revGrad2)" dot={false} activeDot={{ r: 5, fill: "#008060", strokeWidth: 2, stroke: "#fff" }} />
            <Area type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} fill="url(#ordGrad2)" dot={false} activeDot={{ r: 4, fill: "#6366f1" }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom Row: Top Products + Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Top Products Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">Top Products</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Best sellers by units sold</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topProductsData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor(theme)} horizontal={false} />
              <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip prefix="" />} />
              <Bar dataKey="sales" fill="#008060" radius={[0, 6, 6, 0]} maxBarSize={22}
                label={{ position: "right", fontSize: 10, fill: "hsl(218,11%,55%)" }} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Traffic Sources Donut */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="glass-card rounded-xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">Traffic Sources</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Where your visitors come from</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={trafficSourceData} cx="50%" cy="50%" innerRadius={52} outerRadius={82}
                  dataKey="value" paddingAngle={3} strokeWidth={0}>
                  {trafficSourceData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 w-full sm:min-w-[150px]">
              {trafficSourceData.map((item) => (
                <div key={item.name} className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground flex-1 truncate">{item.name}</span>
                  <span className="text-xs font-bold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Weekly Sales Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass-card rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div>
            <h3 className="text-sm font-bold text-foreground">Weekly Performance</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Sales vs visitors this week</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#008060]" />Sales</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />Visitors</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor(theme)} />
            <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sales" fill="#008060" radius={[5, 5, 0, 0]} maxBarSize={36} />
            <Bar dataKey="visitors" fill="#6366f1" radius={[5, 5, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Products Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        className="glass-card rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">Product Performance</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Revenue breakdown by product</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                {["Product","Units Sold","Revenue","Share"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {topProductsData.map((p, i) => {
                const totalRev = topProductsData.reduce((s, x) => s + x.revenue, 0);
                const share = ((p.revenue / totalRev) * 100).toFixed(1);
                return (
                  <tr key={p.name} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="h-6 w-6 rounded-full bg-[#008060]/10 text-[#008060] text-xs font-bold flex items-center justify-center">{i+1}</span>
                        <span className="font-medium text-foreground">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{p.sales.toLocaleString()}</td>
                    <td className="px-4 py-3.5 font-bold text-foreground">${p.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full max-w-[80px]">
                          <div className="h-full bg-[#008060] rounded-full" style={{ width: `${share}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
