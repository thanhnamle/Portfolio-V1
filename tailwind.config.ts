import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        inverse: {
          DEFAULT: "hsl(var(--inverse))",
          foreground: "hsl(var(--inverse-foreground))",
          muted: "hsl(var(--inverse-muted))",
        },
        success: "hsl(var(--success))",
        // Blueprint plate: intentionally the same navy in light and dark themes.
        bp: {
          DEFAULT: "#0B1E3A",
          raised: "#0E2850",
          line: "#3C5D8F",
          text: "#E3ECF8",
          muted: "#A9BBD6",
          accent: "#5CC8FF",
        },
      },
      borderRadius: {
        tile: "1.75rem",
      },
      // Both register as `bg-blueprint`: grid lines plus their spacing.
      backgroundImage: {
        blueprint:
          "linear-gradient(#15305A 1px, transparent 1px), linear-gradient(90deg, #15305A 1px, transparent 1px)",
      },
      backgroundSize: {
        blueprint: "28px 28px",
      },
    },
  },
  plugins: [],
} satisfies Config;
