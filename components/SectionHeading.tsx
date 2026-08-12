"use client";

import { motion } from "framer-motion";
import Editable from "./edit/Editable";

export default function SectionHeading({
  index,
  titlePath,
  kickerPath,
}: {
  index: string;
  titlePath: string;
  kickerPath: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-6"
    >
      <div>
        <Editable
          as="p"
          path={kickerPath}
          className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-acid"
        />
        <Editable
          as="h2"
          path={titlePath}
          className="block font-display text-4xl italic tracking-tight text-paper sm:text-5xl md:text-6xl"
        />
      </div>
      <span className="hidden font-mono text-sm text-haze sm:block">
        N&deg; {index}
      </span>
    </motion.div>
  );
}
