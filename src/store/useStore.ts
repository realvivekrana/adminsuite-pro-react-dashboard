import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "user" | "payment" | "alert";
}

interface StoreState {
  // Sidebar
  sidebarCollapsed: boolean;
  mobileOpen: boolean;
  toggleSidebar: () => void;
  setMobileOpen: (open: boolean) => void;

  // Theme
  theme: "dark" | "light";
  toggleTheme: () => void;
  setTheme: (theme: "dark" | "light") => void;

  // Notifications
  notifications: Notification[];
  markAllRead: () => void;
  markRead: (id: string) => void;

  // Command palette
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;

  // Search
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
}

const defaultNotifications: Notification[] = [
  { id: "1", title: "New Order", message: "Order #1042 placed by Sarah Connor", time: "2 min ago", read: false, type: "order" },
  { id: "2", title: "Payment Received", message: "$299 payment confirmed for Order #1041", time: "15 min ago", read: false, type: "payment" },
  { id: "3", title: "New Customer", message: "John Doe just registered an account", time: "1 hr ago", read: false, type: "user" },
  { id: "4", title: "Low Stock Alert", message: "iPhone 15 Pro has only 3 units left", time: "2 hr ago", read: true, type: "alert" },
  { id: "5", title: "Order Shipped", message: "Order #1039 has been shipped", time: "3 hr ago", read: true, type: "order" },
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileOpen: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setMobileOpen: (open) => set({ mobileOpen: open }),

      theme: "light" as const,
      toggleTheme: () => {},
      setTheme: () => {},

      notifications: defaultNotifications,
      markAllRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      markRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),

      commandOpen: false,
      setCommandOpen: (open) => set({ commandOpen: open }),

      globalSearch: "",
      setGlobalSearch: (q) => set({ globalSearch: q }),
    }),
    {
      name: "shopify-admin-store",
      partialize: (s) => ({ theme: s.theme, sidebarCollapsed: s.sidebarCollapsed }),
    }
  )
);
