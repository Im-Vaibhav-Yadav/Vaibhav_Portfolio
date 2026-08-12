"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Trash2 } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import SectionHeading from "./SectionHeading";
import { DOMAIN_TEXT, DOMAIN_BG, type Domain } from "@/lib/domain-colors";

const BLANK_POST = {
  id: String(Date.now()),
  title: "New post or video title",
  platform: "YouTube",
  url: "https://",
  date: "2026",
};

const PLANNED_CATEGORIES: { index: string; label: string; domain: Domain }[] = [
  { index: "01", label: "Implementation", domain: "product" },
  { index: "02", label: "Data & BI", domain: "data" },
  { index: "03", label: "AI Systems", domain: "ai" },
  { index: "04", label: "Building in Public", domain: "systems" },
];

export default function Writing() {
  const { content, editing, addItem, removeItem } = useContent();
  const { posts } = content;

  return (
    <section id="writing" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          kickerPath="headings.writing.kicker"
          titlePath="headings.writing.title"
        />

        <p className="mb-10 max-w-lg font-body text-base text-haze md:text-lg">
          Writing on systems, implementation, data, and AI &mdash; and
          building all of it in public.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PLANNED_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="flex flex-col justify-between gap-4 bg-ink p-6"
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs ${DOMAIN_TEXT[cat.domain]}`}>
                  {cat.index}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${DOMAIN_BG[cat.domain]}`} />
              </div>
              <p className="font-display text-lg italic text-paper">
                {cat.label}
              </p>
              <span className="font-mono text-[10px] uppercase tracking-widest text-haze">
                Coming soon
              </span>
            </motion.div>
          ))}
        </div>

        {posts.length > 0 && (
          <div className="border-t border-line">
            {posts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative flex flex-col gap-2 border-b border-line py-6 md:flex-row md:items-center md:justify-between md:gap-6"
              >
                {editing && (
                  <button
                    onClick={() => removeItem("posts", i)}
                    className="absolute -left-2 top-6 text-haze opacity-60 hover:text-gold md:-left-8"
                    aria-label="Remove post"
                  >
                    <Trash2 size={13} />
                  </button>
                )}

                <div className="flex-1">
                  <Editable
                    as="p"
                    path={`posts.${i}.title`}
                    className="block font-display text-xl italic text-paper transition-colors group-hover:text-acid md:text-2xl"
                  />
                  <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-haze">
                    <Editable as="span" path={`posts.${i}.platform`} />
                    <span>&middot;</span>
                    <Editable as="span" path={`posts.${i}.date`} />
                  </div>
                </div>

                {editing ? (
                  <Editable
                    as="span"
                    path={`posts.${i}.url`}
                    className="block max-w-xs truncate font-mono text-xs text-acid/80 md:max-w-sm"
                  />
                ) : (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    data-cursor-label="OPEN"
                    className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-haze transition-colors hover:text-acid"
                  >
                    View <ArrowUpRight size={13} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {editing && (
          <button
            onClick={() => addItem("posts", { ...BLANK_POST, id: String(Date.now()) })}
            className="mt-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
          >
            <Plus size={12} /> Add post / video
          </button>
        )}
      </div>
    </section>
  );
}
