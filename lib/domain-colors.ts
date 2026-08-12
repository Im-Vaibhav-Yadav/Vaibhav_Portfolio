export type Domain = "product" | "data" | "ai" | "systems";

export const DOMAIN_LABEL: Record<Domain, string> = {
  product: "Product",
  data: "Data",
  ai: "AI",
  systems: "Systems",
};

/** Tailwind text-color utility class per domain. */
export const DOMAIN_TEXT: Record<Domain, string> = {
  product: "text-acid",
  data: "text-champagne",
  ai: "text-electric",
  systems: "text-gold",
};

/** Tailwind background-color utility class per domain (for dots). */
export const DOMAIN_BG: Record<Domain, string> = {
  product: "bg-acid",
  data: "bg-champagne",
  ai: "bg-electric",
  systems: "bg-gold",
};

/** Tailwind border-color utility class per domain. */
export const DOMAIN_BORDER: Record<Domain, string> = {
  product: "border-acid/50",
  data: "border-champagne/50",
  ai: "border-electric/50",
  systems: "border-gold/50",
};

export const DOMAIN_KEYS: Domain[] = ["product", "data", "ai", "systems"];
