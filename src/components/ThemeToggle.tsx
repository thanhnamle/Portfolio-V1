import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// The <html> "dark" class is the single source of truth (set early by the inline script
// in index.html), so every mounted toggle stays in sync.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

const isDark = () => document.documentElement.classList.contains("dark");

const ThemeToggle = () => {
  const dark = useSyncExternalStore(subscribe, isDark);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-11 w-11 items-center justify-center rounded-xl border bg-card text-foreground transition-colors hover:bg-muted"
    >
      {dark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
};

export default ThemeToggle;
