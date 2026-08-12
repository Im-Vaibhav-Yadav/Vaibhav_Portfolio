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
        ink: "#050606",
        panel: "#0b0d0d",
        paper: "#f1efe8",
        haze: "#8c9698",
        muted: "#566064",
        line: "rgba(255,255,255,0.08)",
        hairline: "rgba(255,255,255,0.035)",
        acid: "#c8ff24",
        champagne: "#d8c69a",
        gold: "#b89562",
        electric: "#8ea7ff",
        amber: "#b89562",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-jbmono)", "monospace"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "grid-bright": "linear-gradient(to right, rgba(200,255,36,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,255,36,0.16) 1px, transparent 1px)",
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
