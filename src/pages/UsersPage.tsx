import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Users, TrendingUp, ShoppingBag, DollarSign,
  X, MapPin, Mail, Calendar, ChevronLeft, ChevronRight,
  Eye, Star
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { mockCustomers, mockOrders, type MockCustomer } from "@/data/mockData";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useStore } from "@/store/useStore";

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ initials, size = "sm" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const colors = ["bg-violet-500","bg-blue-500","bg-emerald-500","bg-amber-500","bg-pink-500","bg-cyan-500","bg-orange-500","bg-indigo-500"];
  const color = colors[initials.charCodeAt(0) % colors.length];
  const sz = size === "lg" ? "h-14 w-14 text-lg" : size === "md" ? "h-10 w-10 text-sm" : "h-8 w-8 text-xs";
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Spending sparkline data per customer ─────────────────────────────────────
function buildSpendingData(spent: number) {
  const base = spent / 12;
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({
    month: m,
    amount: Math.round(base * (0.6 + Math.random() * 0.8 + (i > 8 ? 0.4 : 0))),
  }));
}

// ─── Customer Profile Drawer ──────────────────────────────────────────────────
function CustomerDrawer({ customer, onClose }: { customer: MockCustomer; onClose: () => void }) {
  const { theme } = useStore();
  const spendingData = buildSpendingData(customer.spent);
  const customerOrders = mockOrders.filter(o => o.customer === customer.name);
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "hsl(222,47%,8%)" : "#fff",
    border: `1px solid ${theme === "dark" ? "hsl(222,47%,14%)" : "hsl(220,13%,91%)"}`,
    borderRadius: "8px", fontSize: "12px",
    color: theme === "dark" ? "#fff" : "#0f172a",
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-bold text-foreground">Customer Profile</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Profile Card */}
          <div className="glass-card rounded-xl p-5 text-center space-y-3">
            <Avatar initials={customer.avatar} size="lg" />
            <div>
              <h3 className="text-lg font-bold text-foreground">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{customer.location}</span>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              customer.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-secondary text-muted-foreground"
            }`}>
              {customer.status === "active" ? "● Active" : "○ Inactive"}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Orders", value: customer.orders, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Spent", value: `$${(customer.spent/1000).toFixed(1)}k`, icon: DollarSign, color: "text-[#008060]", bg: "bg-[#008060]/10" },
              { label: "Joined", value: customer.joined, icon: Calendar, color: "text-violet-500", bg: "bg-violet-500/10" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-3 text-center">
                <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center mx-auto mb-2`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <p className="text-sm font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Spending Chart */}
          <div className="glass-card rounded-xl p-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Spending History</h4>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={spendingData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008060" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#008060" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "hsl(222,47%,14%)" : "hsl(220,13%,91%)"} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(218,11%,55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(218,11%,55%)" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v}`, "Spent"]} />
                <Area type="monotone" dataKey="amount" stroke="#008060" strokeWidth={2} fill="url(#spendGrad)" dot={false} activeDot={{ r: 4, fill: "#008060" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders */}
          <div className="glass-card rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Orders</h4>
            {customerOrders.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No orders found</p>
            ) : customerOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-xs font-semibold text-[#008060] font-mono">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">${order.amount.toLocaleString()}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                    order.status === "fulfilled" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    order.status === "pending" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                    "bg-red-500/10 text-red-500"
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 8;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<MockCustomer | null>(null);
  const debouncedSearch = useDebouncedValue(search);

  const filtered = mockCustomers.filter((c) => {
    const q = debouncedSearch.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalSpent = mockCustomers.reduce((s, c) => s + c.spent, 0);
  const activeCount = mockCustomers.filter(c => c.status === "active").length;

  const stats = [
    { label: "Total Customers", value: mockCustomers.length.toString(), icon: Users,       color: "text-blue-500",    bg: "bg-blue-500/10"    },
    { label: "Active",          value: activeCount.toString(),           icon: TrendingUp,  color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Total Revenue",   value: `$${(totalSpent/1000).toFixed(0)}k`, icon: DollarSign, color: "text-[#008060]", bg: "bg-[#008060]/10" },
    { label: "Avg. Order Value",value: `$${Math.round(totalSpent / mockCustomers.reduce((s,c)=>s+c.orders,0))}`, icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Customers</h1>
        <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">Manage your customer base and view profiles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card rounded-xl p-4 hover:border-[#008060]/30 hover:shadow-md transition-all duration-300 group">
            <div className={`h-9 w-9 rounded-lg ${s.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <s.icon className={`h-[18px] w-[18px] ${s.color}`} />
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search customers..."
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="h-10 w-full rounded-lg bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["all","active","inactive"] as const).map((s) => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                statusFilter === s ? "bg-[#008060] text-white shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}>
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Card layout */}
      <div className="sm:hidden space-y-3">
        {paginated.length === 0 ? (
          <div className="glass-card rounded-xl p-10 text-center">
            <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-foreground">No customers found</p>
          </div>
        ) : paginated.map((c) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-4 space-y-3 hover:border-[#008060]/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar initials={c.avatar} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                c.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-secondary text-muted-foreground"
              }`}>{c.status}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>
              <span>{c.orders} orders · ${c.spent.toLocaleString()}</span>
            </div>
            <button onClick={() => setSelectedCustomer(c)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-secondary hover:bg-accent text-xs font-medium text-foreground transition-colors">
              <Eye className="h-3.5 w-3.5" /> View Profile
            </button>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden sm:block glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                {["Customer","Location","Orders","Total Spent","Status","Last Order",""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center">
                  <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium text-foreground">No customers found</p>
                </td></tr>
              ) : paginated.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-accent/30 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={c.avatar} />
                      <div>
                        <p className="font-semibold text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />{c.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground text-xs">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-foreground">{c.orders}</td>
                  <td className="px-4 py-3.5 font-bold text-foreground">${c.spent.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      c.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-secondary text-muted-foreground border border-border"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground text-xs">{c.lastOrder}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setSelectedCustomer(c)}
                      className="p-2 rounded-lg hover:bg-[#008060]/10 hover:text-[#008060] text-muted-foreground transition-colors opacity-0 group-hover:opacity-100">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
            <span className="text-xs text-muted-foreground">{filtered.length} customers</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
                className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors text-foreground">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`h-7 w-7 rounded-lg text-xs font-medium transition-colors ${n===page ? "bg-[#008060] text-white" : "hover:bg-accent text-muted-foreground"}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
                className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors text-foreground">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedCustomer && <CustomerDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
    </div>
  );
}
