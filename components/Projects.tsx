"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import EditableList from "./edit/EditableList";
import ImageCarousel from "./edit/ImageCarousel";
import SectionHeading from "./SectionHeading";
import {
  DOMAIN_TEXT,
  DOMAIN_BORDER,
  DOMAIN_KEYS,
  type Domain,
} from "@/lib/domain-colors";
import { BUILD_TYPE_KEYS } from "@/lib/schema";

const BUILD_TYPE_LABEL: Record<string, string> = {
  client: "Client Work",
  independent: "Independent Build",
  experimental: "Experimental / R&D",
};

const BLANK_PROJECT = {
  id: String(Date.now()).slice(-2),
  year: "2026",
  name: "New Project",
  category: "Category · Stack",
  domain: "product",
  buildType: "independent",
  description: "What this project does and why it matters.",
  stack: ["Tech"],
  highlights: ["Key highlight"],
  images: [],
};

export default function Projects() {
  const { content, editing, addItem, removeItem, update } = useContent();
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
            const domain = (p.domain as Domain) || "product";
            const domainText = DOMAIN_TEXT[domain] ?? "text-acid";
            const domainBorder = DOMAIN_BORDER[domain] ?? "border-acid";

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
                    className="absolute -left-2 top-8 z-10 text-haze opacity-60 hover:text-gold md:-left-8"
                    aria-label="Remove project"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-cursor-hover
                  data-cursor-label="VIEW"
                  className="flex w-full items-center gap-4 py-8 text-left md:gap-8"
                >
                  <span
                    className={`w-8 shrink-0 font-mono text-sm transition-colors ${
                      isOpen ? domainText : "text-haze"
                    }`}
                  >
                    {p.id}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-3xl italic leading-tight transition-colors md:text-5xl ${
                        isOpen ? domainText : "text-paper"
                      }`}
                    >
                      {editing ? (
                        <Editable as="span" path={`projects.${i}.name`} />
                      ) : (
                        p.name
                      )}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-haze">
                      {editing ? (
                        <Editable as="span" path={`projects.${i}.category`} />
                      ) : (
                        p.category
                      )}
                      {p.buildType && p.buildType !== "client" && (
                        <span
                          className={`border ${domainBorder} px-1.5 py-0.5 text-[9px] ${domainText}`}
                        >
                          {BUILD_TYPE_LABEL[p.buildType] ?? p.buildType}
                        </span>
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
                      isOpen ? `${domainBorder} ${domainText}` : "border-line text-haze"
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
                      {editing && (
                        <div className="mb-4 flex flex-wrap items-center gap-4 pl-12 font-mono text-[10px] uppercase tracking-widest text-haze md:pl-16">
                          <label className="flex items-center gap-2">
                            Domain
                            <select
                              value={p.domain}
                              onChange={(e) =>
                                update(`projects.${i}.domain`, e.target.value)
                              }
                              className="border border-line bg-panel px-1.5 py-1 text-acid"
                            >
                              {DOMAIN_KEYS.map((d) => (
                                <option key={d} value={d}>
                                  {d}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="flex items-center gap-2">
                            Build type
                            <select
                              value={p.buildType}
                              onChange={(e) =>
                                update(
                                  `projects.${i}.buildType`,
                                  e.target.value
                                )
                              }
                              className="border border-line bg-panel px-1.5 py-1 text-acid"
                            >
                              {BUILD_TYPE_KEYS.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-8 pb-10 pl-12 md:grid-cols-[1.3fr_1fr] md:pl-16">
                        <div className="max-w-xl">
                          {(p.images?.length > 0 || editing) && (
                            <ImageCarousel
                              path={`projects.${i}.images`}
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
                          <div className={`mb-3 font-mono text-[11px] uppercase tracking-widest ${domainText}`}>
                            Highlights
                          </div>
                          <ul className="mb-5 space-y-2">
                            <EditableList
                              path={`projects.${i}.highlights`}
                              as="li"
                              className="flex gap-2 text-sm leading-relaxed text-haze"
                              prefix={<span className={domainText}>&mdash;</span>}
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
              addItem("projects", {
                ...BLANK_PROJECT,
                id: String(projects.length + 1).padStart(2, "0"),
              });
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
