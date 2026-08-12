"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Trash2, Radio } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import SectionHeading from "./SectionHeading";

const BLANK_POST = {
  id: String(Date.now()),
  title: "New post or video title",
  platform: "YouTube",
  url: "https://",
  date: "2026",
};

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

        {posts.length === 0 && !editing ? (
          <div className="corner-frame flex flex-col items-start gap-3 border border-line p-8">
            <Radio size={18} className="text-acid" />
            <p className="max-w-md text-sm text-haze">
              Nothing published yet — this is where write-ups and videos on
              implementation, BI and AI agents will land as they go live.
            </p>
          </div>
        ) : (
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
                    className="absolute -left-2 top-6 text-haze opacity-60 hover:text-amber md:-left-8"
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
