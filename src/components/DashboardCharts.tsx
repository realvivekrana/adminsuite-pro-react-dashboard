import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart
} from "recharts";

const barData = [
  { name: "Jan", revenue: 4000, orders: 240 },
  { name: "Feb", revenue: 3000, orders: 198 },
  { name: "Mar", revenue: 5000, orders: 305 },
  { name: "Apr", revenue: 4780, orders: 290 },
  { name: "May", revenue: 5890, orders: 381 },
  { name: "Jun", revenue: 6390, orders: 420 },
  { name: "Jul", revenue: 7490, orders: 510 },
];

const lineData = [
  { name: "Mon", users: 120, sessions: 340 },
  { name: "Tue", users: 230, sessions: 450 },
  { name: "Wed", users: 180, sessions: 380 },
  { name: "Thu", users: 340, sessions: 520 },
  { name: "Fri", users: 290, sessions: 490 },
  { name: "Sat", users: 410, sessions: 610 },
  { name: "Sun", users: 380, sessions: 580 },
];

const pieData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Food", value: 20 },
  { name: "Books", value: 12 },
  { name: "Other", value: 8 },
];

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(160, 84%, 39%)",
  "hsl(30, 95%, 55%)",
  "hsl(280, 67%, 54%)",
  "hsl(340, 75%, 55%)",
];

const tooltipStyle = {
  backgroundColor: "hsl(222, 47%, 8%)",
  border: "1px solid hsl(222, 47%, 14%)",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "13px",
};

/** Revenue bar chart */
export function RevenueChart() {
  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-1">Revenue Overview</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Monthly revenue and order trends</p>
      <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 14%)" />
          <XAxis dataKey="name" stroke="hsl(218, 11%, 55%)" fontSize={11} />
          <YAxis stroke="hsl(218, 11%, 55%)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="revenue" fill="hsl(221, 83%, 53%)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="orders" fill="hsl(160, 84%, 39%)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** User traffic area chart */
export function TrafficChart() {
  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 animate-fade-in" style={{ animationDelay: "500ms" }}>
      <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-1">User Traffic</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Weekly active users and sessions</p>
      <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
        <AreaChart data={lineData}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(280, 67%, 54%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(280, 67%, 54%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 14%)" />
          <XAxis dataKey="name" stroke="hsl(218, 11%, 55%)" fontSize={11} />
          <YAxis stroke="hsl(218, 11%, 55%)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="users" stroke="hsl(221, 83%, 53%)" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} />
          <Area type="monotone" dataKey="sessions" stroke="hsl(280, 67%, 54%)" fillOpacity={1} fill="url(#colorSessions)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Category breakdown pie chart */
export function CategoryChart() {
  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 animate-fade-in" style={{ animationDelay: "600ms" }}>
      <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-1">Sales by Category</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Product category distribution</p>
      <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" paddingAngle={4} strokeWidth={0}>
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
