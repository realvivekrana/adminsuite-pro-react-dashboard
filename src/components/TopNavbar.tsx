import { Moon, Sun, Bell, Menu, Search, LogOut } from "lucide-react";
import { useThemeContext } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  onMenuToggle: () => void;
}

/** Top navigation bar with search, notifications, and theme toggle */
export function TopNavbar({ onMenuToggle }: Props) {
  const { theme, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuToggle} 
          className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors text-foreground"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Logo */}
        <Link to="/dashboard" className="lg:hidden flex items-center gap-2">
          <svg className="h-7 w-7" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
            <g stroke="#61dafb" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
          <span className="text-base font-bold text-foreground">AdminSuite Pro</span>
        </Link>
        
        {/* Desktop Search Bar */}
        <div className="relative hidden md:block flex-1 max-w-md lg:max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search users, products, analytics..."
            className="h-10 w-full rounded-lg bg-secondary/40 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 border border-transparent outline-none transition-all duration-200 ease-in-out hover:bg-secondary/60 focus:bg-background focus:border-border focus:ring-2 focus:ring-primary/10 focus:shadow-sm"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Notifications - Hidden on small mobile */}
        <button className="hidden sm:flex relative p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* Theme toggle */}
        <button 
          onClick={toggleTheme} 
          className="p-2.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* User Avatar & Logout */}
        <div className="flex items-center gap-2 ml-1 sm:ml-2">
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary ring-2 ring-primary/20">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
