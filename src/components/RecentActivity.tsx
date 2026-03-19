import { motion } from "framer-motion";
import { mockOrders } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusConfig = {
  fulfilled: { label: "Fulfilled", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-600 dark:text-red-400" },
  refunded: { label: "Refunded", className: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
};

/** Recent orders list for dashboard */
export function RecentActivity() {
  const recent = mockOrders.slice(0, 6);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Latest customer orders</p>
        </div>
        <a href="/dashboard/orders" className="text-xs text-[#008060] hover:underline font-medium">View all</a>
      </div>
      <div className="divide-y divide-border">
        {recent.map((order, i) => {
          const cfg = statusConfig[order.status];
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-5 py-3 hover:bg-accent/30 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-[#008060]/10 flex items-center justify-center text-xs font-bold text-[#008060] flex-shrink-0">
                {order.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{order.customer}</p>
                <p className="text-[10px] text-muted-foreground truncate">{order.product}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-semibold text-foreground">${order.amount.toLocaleString()}</p>
                <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-full", cfg.className)}>
                  {cfg.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
