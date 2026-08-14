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
        // Deepened from the original pale-beige pass — the page was
        // reading as washed out, so background/panel got richer and
        // every accent got more saturated for real pop.
        ink: "#e2d3b0",
        panel: "#f6eeda",
        paper: "#1c160f",
        haze: "#6b5f45",
        muted: "#8f7f5c",
        line: "rgba(28,22,15,0.30)",
        hairline: "rgba(28,22,15,0.11)",
        // Primary brand accent — terracotta against warm beige, used
        // pervasively (CTAs, cursor, links, hover states).
        acid: "#bb431f",
        // Domain accents — one per capability area, used consistently as
        // tags/dots/borders rather than backgrounds, so four hues stay
        // legible instead of noisy.
        champagne: "#0c6b60",
        gold: "#9c4907",
        electric: "#3730a3",
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
