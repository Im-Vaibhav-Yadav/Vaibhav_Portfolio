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
        ink: "#efe6d6",
        panel: "#f8f3e8",
        paper: "#221c14",
        haze: "#7c7059",
        muted: "#a79876",
        line: "rgba(34,28,20,0.12)",
        hairline: "rgba(34,28,20,0.05)",
        // Primary brand accent — terracotta against warm beige, used
        // pervasively (CTAs, cursor, links, hover states).
        acid: "#c1502e",
        // Domain accents — one per capability area, used consistently as
        // tags/dots/borders rather than backgrounds, so four hues stay
        // legible instead of noisy.
        champagne: "#0f766e",
        gold: "#b45309",
        electric: "#4338ca",
        // Destructive/remove affordance in edit mode — deliberately not
        // one of the brand/domain colors.
        amber: "#dc2626",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-jbmono)", "monospace"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(34,28,20,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,28,20,0.07) 1px, transparent 1px)",
        "grid-bright": "linear-gradient(to right, rgba(193,80,46,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(193,80,46,0.28) 1px, transparent 1px)",
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
