"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";

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

export default function Hero() {
  const { content, editing } = useContent();
  const { profile, stats } = content;
  const [first, ...restWords] = profile.name.split(" ");
  const rest = restWords.join(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between px-6 pt-32 md:px-10"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center"
      >
        <motion.div
          variants={item}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-haze"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          Open to select engagements
          <span className="hidden items-center gap-1 sm:flex">
            <MapPin size={12} /> <Editable path="profile.location" />
          </span>
        </motion.div>

        {editing ? (
          <motion.div variants={item}>
            <Editable
              as="h1"
              path="profile.name"
              className="block font-display text-6xl font-light italic leading-[0.95] tracking-tight text-paper sm:text-7xl md:text-8xl"
            />
          </motion.div>
        ) : (
          <motion.h1
            variants={item}
            className="font-display text-[13vw] font-light italic leading-[0.92] tracking-tight text-paper sm:text-[9vw] md:text-[7.2vw] lg:text-[6.4vw]"
          >
            {first}
            <br />
            <span className="font-semibold not-italic">{rest}</span>
          </motion.h1>
        )}

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
            <a
              href="#work"
              data-cursor-hover
              className="border border-acid bg-acid px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5"
            >
              View the work
            </a>
            <a
              href="#contact"
              data-cursor-hover
              className="border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:border-acid hover:text-acid"
            >
              Get in touch
            </a>
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
          <span className="h-4 w-[2px] animate-blink bg-acid" />
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
