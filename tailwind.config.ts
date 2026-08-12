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
        // Bumped up from the earlier soft-editorial pass — sharper,
        // more defined structural lines for a sturdier feel.
        line: "rgba(34,28,20,0.22)",
        hairline: "rgba(34,28,20,0.09)",
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
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blink: "blink 1.1s step-end infinite",
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
