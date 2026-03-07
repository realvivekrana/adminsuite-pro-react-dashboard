import { ShoppingCart } from "lucide-react";

/** Placeholder Orders page */
export default function OrdersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">Track and manage all customer orders.</p>
      </div>
      <div className="glass-card rounded-xl p-16 text-center">
        <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Orders Management</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Order tracking, status updates, and fulfillment management will be available here.
        </p>
      </div>
    </div>
  );
}
