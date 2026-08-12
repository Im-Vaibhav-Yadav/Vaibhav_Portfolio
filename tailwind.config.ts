import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "ink" = page background, "paper" = primary text — names kept
        // stable across theme passes so component classNames never need
        // touching; only the hex values change here.
        ink: "#0a0f24",
        panel: "#10173a",
        paper: "#edeffa",
        haze: "#8891b0",
        muted: "#5c6480",
        line: "rgba(237,239,250,0.10)",
        hairline: "rgba(237,239,250,0.04)",
        // Primary brand accent — warm gold against deep navy, used
        // pervasively (CTAs, cursor, links, hover states).
        acid: "#ffb020",
        // Domain accents — one per capability area, used consistently as
        // tags/dots/borders rather than backgrounds, so four hues stay
        // legible instead of noisy.
        champagne: "#22d3ee",
        gold: "#fb7185",
        electric: "#a78bfa",
        // Destructive/remove affordance in edit mode — deliberately not
        // one of the brand/domain colors.
        amber: "#ef4444",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-jbmono)", "monospace"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(237,239,250,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,239,250,0.05) 1px, transparent 1px)",
        "grid-bright": "linear-gradient(to right, rgba(255,176,32,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,176,32,0.22) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(4%, 6%) scale(1.08)" },
          "66%": { transform: "translate(-3%, -4%) scale(0.96)" },
        },
        driftSlow: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-6%, 5%) scale(1.1)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blink: "blink 1.1s step-end infinite",
        drift: "drift 22s ease-in-out infinite",
        driftSlow: "driftSlow 30s ease-in-out infinite",
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
