import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { salesTrendData, trafficSourceData, topProductsData, weeklyData } from "@/data/mockData";
import { useStore } from "@/store/useStore";

const useTooltipStyle = () => ({
  backgroundColor: "#ffffff",
  border: "1px solid hsl(220 13% 90%)",
  borderRadius: "8px",
  color: "#111827",
  fontSize: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
});

const axisStyle = { fontSize: 11, fill: "#9ca3af" };

/** Sales trend area chart */
export function SalesTrendChart() {
  const { theme } = useStore();
  const tooltipStyle = useTooltipStyle(theme);
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Sales Overview</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Revenue trend over the last 12 months</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={salesTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#008060" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#008060" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "hsl(222,47%,14%)" : "hsl(220,13%,91%)"} />
          <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
          <Area type="monotone" dataKey="revenue" stroke="#008060" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#008060" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Weekly sales bar chart */
export function WeeklySalesChart() {
  const { theme } = useStore();
  const tooltipStyle = useTooltipStyle(theme);
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Weekly Sales</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Sales vs visitors this week</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "hsl(222,47%,14%)" : "hsl(220,13%,91%)"} />
          <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="sales" fill="#008060" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar dataKey="visitors" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Traffic source donut chart */
export function TrafficChart() {
  const { theme } = useStore();
  const tooltipStyle = useTooltipStyle(theme);
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Traffic Sources</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Where your visitors come from</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={trafficSourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3} strokeWidth={0}>
              {trafficSourceData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 w-full sm:w-auto sm:min-w-[140px]">
          {trafficSourceData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground flex-1 truncate">{item.name}</span>
              <span className="text-xs font-semibold text-foreground">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Top products horizontal bar chart */
export function TopProductsChart() {
  const { theme } = useStore();
  const tooltipStyle = useTooltipStyle(theme);
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Top Products</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Best selling products by units</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={topProductsData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "hsl(222,47%,14%)" : "hsl(220,13%,91%)"} horizontal={false} />
          <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="sales" fill="#008060" radius={[0, 4, 4, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Keep legacy exports for AnalyticsPage
export { SalesTrendChart as RevenueChart, TrafficChart as TrafficChartLegacy };
export function CategoryChart() { return <TopProductsChart />; }
