import { useState } from "react";
import { ShoppingCart, Package, Clock, CheckCircle, DollarSign, Search, Filter, Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// Mock data
const orders = [
  { id: "ORD-001", customer: "John Doe", product: "Premium Plan", amount: "$99.00", status: "delivered", date: "2024-03-15" },
  { id: "ORD-002", customer: "Jane Smith", product: "Basic Plan", amount: "$29.00", status: "processing", date: "2024-03-14" },
  { id: "ORD-003", customer: "Bob Johnson", product: "Enterprise Plan", amount: "$299.00", status: "pending", date: "2024-03-14" },
  { id: "ORD-004", customer: "Alice Brown", product: "Premium Plan", amount: "$99.00", status: "delivered", date: "2024-03-13" },
  { id: "ORD-005", customer: "Charlie Wilson", product: "Basic Plan", amount: "$29.00", status: "processing", date: "2024-03-13" },
  { id: "ORD-006", customer: "Diana Martinez", product: "Premium Plan", amount: "$99.00", status: "delivered", date: "2024-03-12" },
  { id: "ORD-007", customer: "Ethan Davis", product: "Enterprise Plan", amount: "$299.00", status: "pending", date: "2024-03-12" },
  { id: "ORD-008", customer: "Fiona Garcia", product: "Basic Plan", amount: "$29.00", status: "delivered", date: "2024-03-11" },
];

const stats = [
  { label: "Total Orders", value: "1,234", icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Pending", value: "45", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { label: "Completed", value: "1,189", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Revenue", value: "$124,592", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
];

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">Track and manage all customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="p-4 sm:p-6 border-b border-border/50">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 w-full sm:w-64 bg-background/50"
                />
              </div>
              {/* Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 rounded-lg bg-background/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30">
              <tr>
                <th className="text-left py-3 px-4 sm:px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="text-left py-3 px-4 sm:px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-4 sm:px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Product</th>
                <th className="text-left py-3 px-4 sm:px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-4 sm:px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 sm:px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-right py-3 px-4 sm:px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-4 px-4 sm:px-6 text-sm font-medium text-foreground">{order.id}</td>
                  <td className="py-4 px-4 sm:px-6 text-sm text-foreground">{order.customer}</td>
                  <td className="py-4 px-4 sm:px-6 text-sm text-muted-foreground hidden md:table-cell">{order.product}</td>
                  <td className="py-4 px-4 sm:px-6 text-sm font-medium text-foreground">{order.amount}</td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[order.status as keyof typeof statusColors]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-sm text-muted-foreground hidden lg:table-cell">{order.date}</td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary hidden sm:flex">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive hidden sm:flex">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 sm:p-6 border-t border-border/50 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredOrders.length}</span> of <span className="font-medium text-foreground">{orders.length}</span> orders
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
