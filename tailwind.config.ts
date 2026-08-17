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
        // Full repositioning away from the beige/editorial look toward a
        // minimal, near-black engineering-tool aesthetic (Linear/Vercel/
        // Stripe-docs register): one restrained accent, no textures or
        // hard shadows, contrast and typography doing the work.
        ink: "#0a0a0c",
        panel: "#141417",
        paper: "#f2f2f0",
        haze: "#9a9aa4",
        muted: "#6b6b74",
        line: "rgba(242,242,240,0.14)",
        hairline: "rgba(242,242,240,0.07)",
        // Primary brand accent — NVIDIA-style signature green, used
        // pervasively (CTAs, cursor, links, hover states).
        acid: "#76b900",
        // Domain accents — one per capability area, used consistently as
        // tags/dots/borders rather than backgrounds, so four hues stay
        // legible instead of noisy.
        champagne: "#2dd4bf",
        gold: "#fb923c",
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
