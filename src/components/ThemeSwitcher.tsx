import { useSyncExternalStore } from "react";
import { Moon, Sun, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const themes: { value: Theme; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
];

// The <html> "dark" class is the single source of truth (set early by the inline script in
// index.html, dark by default), so every mounted switcher stays in sync.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

const currentTheme = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies for this visit.
  }
};

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const theme = useSyncExternalStore(subscribe, currentTheme);

  return (
    <div role="group" aria-label="Theme" className={cn("flex gap-1 rounded-2xl border bg-card p-1", className)}>
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => applyTheme(value)}
          aria-label={label}
          aria-pressed={theme === value}
          title={label}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
            theme === value ? "bg-inverse text-inverse-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Icon size={17} aria-hidden />
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
