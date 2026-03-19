import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Package, ShoppingCart,
  BarChart3, Settings, ChevronLeft, ChevronRight,
  X, LogOut, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/store/useStore";

const navItems = [
  { label: "Dashboard",  icon: LayoutDashboard, path: "/dashboard"           },
  { label: "Orders",     icon: ShoppingCart,    path: "/dashboard/orders"    },
  { label: "Products",   icon: Package,         path: "/dashboard/products"  },
  { label: "Customers",  icon: Users,           path: "/dashboard/users"     },
  { label: "Analytics",  icon: BarChart3,       path: "/dashboard/analytics" },
  { label: "Settings",   icon: Settings,        path: "/dashboard/settings"  },
];

function SidebarContent({ collapsed, onClose }: { collapsed: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <aside className={cn(
      "h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-sm",
      collapsed ? "w-[68px]" : "w-[240px]"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-[#008060] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Zap className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="text-sm font-bold text-gray-900 tracking-tight block truncate">Shopify Admin</span>
              <span className="text-[10px] text-gray-400 font-medium">Dashboard v2</span>
            </div>
          )}
        </div>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden h-7 w-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.path === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-[#008060]/8 text-[#008060]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#008060] rounded-r-full" />
              )}
              <item.icon className={cn(
                "h-[18px] w-[18px] flex-shrink-0 transition-transform duration-150",
                isActive ? "text-[#008060]" : "text-gray-400 group-hover:text-gray-600 group-hover:scale-110"
              )} />
              {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
              {!collapsed && isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#008060] flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-2 border-t border-gray-100 space-y-0.5 flex-shrink-0">
        <button
          onClick={handleLogout}
          title={collapsed ? "Sign out" : undefined}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={() => useStore.getState().toggleSidebar()}
          className="hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all duration-150"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <ChevronRight className="h-[18px] w-[18px] flex-shrink-0" />
            : <ChevronLeft  className="h-[18px] w-[18px] flex-shrink-0" />
          }
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

export function AppSidebar() {
  const { sidebarCollapsed, mobileOpen, setMobileOpen } = useStore();

  return (
    <>
      {/* Desktop fixed sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-40 h-screen">
        <SidebarContent collapsed={sidebarCollapsed} onClose={() => {}} />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 z-50 h-screen"
            >
              <SidebarContent collapsed={false} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
