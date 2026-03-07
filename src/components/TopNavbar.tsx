import { Moon, Sun, Bell, Search, Menu } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface Props {
  onMenuToggle: () => void;
}

/** Top navigation bar with search, notifications, and theme toggle */
export function TopNavbar({ onMenuToggle }: Props) {
  const { isDark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors text-foreground">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-64 rounded-lg bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* Theme toggle */}
        <button onClick={toggle} className="p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Avatar */}
        <div className="ml-2 h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
          JD
        </div>
      </div>
    </header>
  );
}
