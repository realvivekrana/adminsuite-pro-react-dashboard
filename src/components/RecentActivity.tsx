import { ShoppingCart, UserPlus, MessageSquare, CreditCard, Package, TrendingUp } from "lucide-react";

const activities = [
  { icon: UserPlus, text: "New user registered", user: "Sarah Connor", time: "2 min ago", color: "text-primary" },
  { icon: ShoppingCart, text: "New order placed", user: "John Doe", time: "15 min ago", color: "text-success" },
  { icon: CreditCard, text: "Payment received", user: "Alice Smith", time: "1 hour ago", color: "text-warning" },
  { icon: MessageSquare, text: "New support ticket", user: "Bob Wilson", time: "2 hours ago", color: "text-chart-4" },
  { icon: Package, text: "Product shipped", user: "Order #1234", time: "3 hours ago", color: "text-chart-5" },
  { icon: TrendingUp, text: "Revenue milestone", user: "$50k reached", time: "5 hours ago", color: "text-success" },
];

/** Recent activity feed for the dashboard */
export function RecentActivity() {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: "700ms" }}>
      <h3 className="text-lg font-semibold text-card-foreground mb-1">Recent Activity</h3>
      <p className="text-sm text-muted-foreground mb-6">Latest events and notifications</p>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <div className={`h-9 w-9 rounded-lg bg-accent flex items-center justify-center ${a.color}`}>
              <a.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">{a.text}</p>
              <p className="text-xs text-muted-foreground">{a.user}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
