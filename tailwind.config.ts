import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        // Cinzel display face for headings (see --font-heading in index.css).
        heading: ["var(--font-heading)"],
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
        // Arcane chart plate used by the stack diagram, terminal and dialogs.
        bp: {
          DEFAULT: "hsl(var(--bp))",
          raised: "hsl(var(--bp-raised))",
          line: "hsl(var(--bp-line))",
          text: "hsl(var(--bp-text))",
          muted: "hsl(var(--bp-muted))",
          accent: "hsl(var(--bp-accent))",
        },
      },
      // Squared-off plates to match the intro's cinematic look.
      borderRadius: {
        tile: "0.375rem",
        xl: "0.375rem",
        "2xl": "0.5rem",
        "3xl": "0.5rem",
      },
      // `bg-blueprint` registers both the grid lines and their spacing.
      backgroundImage: {
        blueprint:
          "linear-gradient(hsl(var(--bp-grid)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--bp-grid)) 1px, transparent 1px)",
        "flow-x": "linear-gradient(to right, hsl(var(--bp-accent)) 50%, transparent 0)",
        "flow-y": "linear-gradient(to bottom, hsl(var(--bp-accent)) 50%, transparent 0)",
      },
      backgroundSize: {
        blueprint: "28px 28px",
      },
      keyframes: {
        // Marching dashes on the stacked (mobile) diagram connectors.
        "flow-y": { to: { backgroundPosition: "0 16px" } },
        // Dashes travelling along the curved SVG wires (dash + gap = 12, two cycles).
        dash: { to: { strokeDashoffset: "-24" } },
        // Ambience: twinkling stars and drifting motes.
        twinkle: { "0%, 100%": { opacity: "0.35" }, "50%": { opacity: "1" } },
        drift: {
          "0%": { transform: "translate(0, 0)", opacity: "0" },
          "15%, 85%": { opacity: "1" },
          "100%": { transform: "translate(var(--dx), var(--dy))", opacity: "0" },
        },
        // Intro hero: light streaks racing across, a slow light sweep, and pulse rings on network nodes.
        streak: {
          "0%": { transform: "translateX(-25vw)", opacity: "0" },
          "12%, 80%": { opacity: "1" },
          "100%": { transform: "translateX(125vw)", opacity: "0" },
        },
        sweep: { "0%": { transform: "translateX(-60%)" }, "100%": { transform: "translateX(180%)" } },
        ring: { "0%": { transform: "scale(1)", opacity: "0.8" }, "100%": { transform: "scale(3.2)", opacity: "0" } },
      },
      animation: {
        "flow-y": "flow-y 0.8s linear infinite",
        dash: "dash 1.2s linear infinite",
        twinkle: "twinkle 5s ease-in-out infinite",
        drift: "drift var(--duration) ease-in-out infinite",
        streak: "streak var(--duration) cubic-bezier(0.5, 0, 0.75, 0) infinite",
        sweep: "sweep 11s ease-in-out infinite",
        ring: "ring 2.6s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
