"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import EditableList from "./edit/EditableList";
import EditableImage from "./edit/EditableImage";
import SectionHeading from "./SectionHeading";

const BLANK_PROJECT = {
  id: String(Date.now()).slice(-2),
  year: "2026",
  name: "New Project",
  category: "Category · Stack",
  description: "What this project does and why it matters.",
  stack: ["Tech"],
  highlights: ["Key highlight"],
  image: "",
};

export default function Projects() {
  const { content, editing, addItem, removeItem } = useContent();
  const { projects } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="work" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          kickerPath="headings.work.kicker"
          titlePath="headings.work.title"
        />

        <div className="border-t border-line">
          {projects.map((p, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative border-b border-line"
              >
                {editing && (
                  <button
                    onClick={() => removeItem("projects", i)}
                    className="absolute -left-2 top-8 z-10 text-haze opacity-60 hover:text-amber md:-left-8"
                    aria-label="Remove project"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor-hover
                  className="flex w-full items-center gap-4 py-8 text-left md:gap-8"
                >
                  <span className="w-8 shrink-0 font-mono text-sm text-haze">
                    {p.id}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-3xl italic leading-tight transition-colors md:text-5xl ${
                        isOpen ? "text-acid" : "text-paper"
                      }`}
                    >
                      {editing ? (
                        <Editable as="span" path={`projects.${i}.name`} />
                      ) : (
                        p.name
                      )}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-haze">
                      {editing ? (
                        <Editable as="span" path={`projects.${i}.category`} />
                      ) : (
                        p.category
                      )}
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-xs text-haze sm:block">
                    {editing ? (
                      <Editable as="span" path={`projects.${i}.year`} />
                    ) : (
                      p.year
                    )}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border ${
                      isOpen ? "border-acid text-acid" : "border-line text-haze"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-10 pl-12 md:grid-cols-[1.3fr_1fr] md:pl-16">
                        <div className="max-w-xl">
                          {(p.image || editing) && (
                            <EditableImage
                              path={`projects.${i}.image`}
                              className="mb-6 w-full"
                            />
                          )}
                          <Editable
                            as="p"
                            path={`projects.${i}.description`}
                            multiline
                            className="block font-body text-base leading-relaxed text-haze md:text-lg"
                          />
                        </div>
                        <div>
                          <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-acid">
                            Highlights
                          </div>
                          <ul className="mb-5 space-y-2">
                            <EditableList
                              path={`projects.${i}.highlights`}
                              as="li"
                              className="flex gap-2 text-sm leading-relaxed text-haze"
                              prefix={<span className="text-acid">&mdash;</span>}
                              placeholder="New highlight…"
                              addLabel="Add highlight"
                            />
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            <EditableList
                              path={`projects.${i}.stack`}
                              as="span"
                              className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-haze"
                              placeholder="Tech"
                              addLabel="Add tech"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {editing && (
          <button
            onClick={() => {
              addItem("projects", { ...BLANK_PROJECT, id: String(projects.length + 1).padStart(2, "0") });
              setOpenIndex(projects.length);
            }}
            className="mt-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
          >
            <Plus size={12} /> Add project
          </button>
        )}
      </div>
    </section>
  );
}
