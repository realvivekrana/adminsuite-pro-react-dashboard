import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, ShoppingCart, Package, Users, BarChart3, Settings, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const commands = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", group: "Pages" },
  { label: "Orders", icon: ShoppingCart, path: "/dashboard/orders", group: "Pages" },
  { label: "Products", icon: Package, path: "/dashboard/products", group: "Pages" },
  { label: "Customers", icon: Users, path: "/dashboard/users", group: "Pages" },
  { label: "Analytics", icon: BarChart3, path: "/dashboard/analytics", group: "Pages" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings", group: "Pages" },
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!commandOpen) { setQuery(""); setSelected(0); }
  }, [commandOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!commandOpen) return;
      if (e.key === "Escape") setCommandOpen(false);
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) {
        navigate(filtered[selected].path);
        setCommandOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [commandOpen, filtered, selected, navigate, setCommandOpen]);

  return (
    <AnimatePresence>
      {commandOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
          >
            <div className="rounded-xl border border-border bg-popover shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  placeholder="Search pages, actions..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <kbd className="text-[10px] text-muted-foreground/50 font-mono border border-border rounded px-1.5 py-0.5">ESC</kbd>
              </div>

              {/* Results */}
              <div className="py-2 max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No results found</p>
                ) : (
                  filtered.map((cmd, i) => (
                    <button
                      key={cmd.path}
                      onClick={() => { navigate(cmd.path); setCommandOpen(false); }}
                      onMouseEnter={() => setSelected(i)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                        i === selected ? "bg-[#008060]/10 text-[#008060]" : "text-foreground hover:bg-accent"
                      )}
                    >
                      <cmd.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="flex-1 text-left">{cmd.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                    </button>
                  ))
                )}
              </div>

              <div className="px-4 py-2 border-t border-border flex items-center gap-3 text-[10px] text-muted-foreground/60">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
