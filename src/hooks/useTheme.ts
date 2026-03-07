import { useState, useEffect } from "react";

/** Hook to manage dark mode - defaults to dark theme */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      // Default to dark theme
      const stored = localStorage.getItem("theme");
      if (stored) {
        return stored === "dark";
      }
      // Default to dark if no preference stored
      return true;
    }
    return true; // Default to dark on server
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
