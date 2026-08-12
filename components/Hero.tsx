"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import EditableImage from "./edit/EditableImage";
import MagneticButton from "./MagneticButton";
import { DOMAIN_BG, DOMAIN_TEXT, type Domain } from "@/lib/domain-colors";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const SYSTEM_ROWS: { label: string; domain: Domain; keywords: string }[] = [
  { label: "Product", domain: "product", keywords: "SaaS · implementation · UAT" },
  { label: "Data", domain: "data", keywords: "Power BI · SQL · DAX" },
  { label: "AI", domain: "ai", keywords: "LLMs · agents · MCP" },
  { label: "Automation", domain: "systems", keywords: "workflows · pipelines" },
];

export default function Hero() {
  const { content, editing } = useContent();
  const { profile, stats } = content;
  const [first, ...restWords] = profile.name.split(" ");
  const rest = restWords.join(" ");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between px-6 pt-32 md:px-10"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-[1.5fr_auto]"
      >
        <div>
          <motion.div
            variants={item}
            className="mb-8 flex items-center gap-5 md:gap-7"
          >
            <EditableImage
              path="profile.photo"
              aspect="aspect-square"
              className="h-20 w-20 shrink-0 md:h-28 md:w-28"
              alwaysShow
              emptyLabel="Add photo"
            />

            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-haze">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-acid opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
                </span>
                <span className="truncate">Open to select engagements</span>
                <span className="hidden shrink-0 items-center gap-1 sm:flex">
                  <MapPin size={12} /> <Editable path="profile.location" />
                </span>
              </div>

              {editing ? (
                <Editable
                  as="h1"
                  path="profile.name"
                  className="block font-display text-4xl italic leading-[0.95] tracking-tight text-paper sm:text-5xl md:text-6xl"
                />
              ) : (
                <h1 className="whitespace-nowrap font-display text-[7vw] italic leading-[0.9] tracking-tight text-paper sm:text-[4.6vw] md:text-[3.6vw] lg:text-[2.9vw]">
                  {first} <span className="not-italic tracking-tight">{rest}</span>
                </h1>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <Editable
              as="p"
              path="profile.tagline"
              multiline
              className="block max-w-xl font-body text-lg leading-relaxed text-haze md:text-xl"
            />
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href="#work"
                cursorLabel="VIEW"
                className="border border-acid bg-acid px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink"
              >
                View the work
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-acid hover:text-acid"
              >
                Get in touch
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-2 font-mono text-sm text-acid"
          >
            <span className="text-haze">&gt;</span>
            <Editable path="profile.role" />
            <span className="text-haze">&middot;</span>
            <Editable path="profile.roleSecondary" />
            <span className="h-4 w-[2px] motion-safe:animate-blink bg-acid" />
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="hidden w-64 border border-line bg-panel/40 p-5 backdrop-blur-sm lg:block"
        >
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-haze">
            <span>System</span>
            <span className="flex items-center gap-1.5 text-acid">
              <span className="h-1.5 w-1.5 rounded-full bg-acid motion-safe:animate-pulseDot" />
              Active
            </span>
          </div>
          <div className="space-y-3">
            {SYSTEM_ROWS.map((row, i) => (
              <div
                key={row.label}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                className="group cursor-default border-l-2 border-line pl-3 py-1 transition-colors"
                style={
                  hoveredRow === i
                    ? { borderColor: "var(--domain-" + row.domain + ")" }
                    : undefined
                }
              >
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${DOMAIN_BG[row.domain]} motion-safe:animate-pulseDot`}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  {row.label}
                </div>
                <motion.p
                  initial={false}
                  animate={{
                    opacity: hoveredRow === i ? 1 : 0,
                    height: hoveredRow === i ? "auto" : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className={`overflow-hidden pl-3.5 font-mono text-[10px] ${DOMAIN_TEXT[row.domain]}`}
                >
                  {row.keywords}
                </motion.p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 border-t border-line py-8 sm:grid-cols-4"
      >
        {stats.map((s, i) => (
          <div key={i}>
            <Editable
              as="div"
              path={`stats.${i}.value`}
              className="block font-display text-2xl italic text-paper md:text-3xl"
            />
            <Editable
              as="div"
              path={`stats.${i}.label`}
              className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-haze"
            />
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#about"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-haze md:right-10 lg:flex"
      >
        Scroll <ArrowDown size={12} className="-rotate-90" />
      </motion.a>
    </section>
  );
}
