"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import EditableList from "./edit/EditableList";
import SectionHeading from "./SectionHeading";
import { DOMAIN_BG, DOMAIN_TEXT, DOMAIN_KEYS, type Domain } from "@/lib/domain-colors";

const BLANK_GROUP = { id: "00", title: "New Category", domain: "product", items: ["Skill"] };

export default function Skills() {
  const { content, editing, addItem, removeItem, update } = useContent();
  const { skillGroups, skillTicker } = content;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          kickerPath="headings.skills.kicker"
          titlePath="headings.skills.title"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((group, i) => {
            const domain = (group.domain as Domain) || "product";
            const isDefocused = hovered !== null && hovered !== i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{ opacity: isDefocused ? 0.45 : 1 }}
                className="group relative flex min-h-[220px] flex-col justify-between bg-ink p-6 transition-colors hover:bg-panel"
              >
                {editing && (
                  <button
                    onClick={() => removeItem("skillGroups", i)}
                    className="absolute right-2 top-2 text-haze opacity-60 hover:text-gold"
                    aria-label="Remove group"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs ${DOMAIN_TEXT[domain]}`}>
                    {group.id}
                  </span>
                  {editing ? (
                    <select
                      value={group.domain}
                      onChange={(e) =>
                        update(`skillGroups.${i}.domain`, e.target.value)
                      }
                      className="border border-line bg-panel px-1 py-0.5 font-mono text-[9px] uppercase text-haze"
                    >
                      {DOMAIN_KEYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        hovered === i ? DOMAIN_BG[domain] : "bg-line"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <Editable
                    as="h3"
                    path={`skillGroups.${i}.title`}
                    className="mb-4 block font-display text-lg italic leading-tight text-paper"
                  />
                  <ul className="space-y-1.5">
                    <EditableList
                      path={`skillGroups.${i}.items`}
                      as="li"
                      className={`font-mono text-[12px] transition-colors ${
                        hovered === i ? "text-paper" : "text-haze"
                      }`}
                      placeholder="Skill"
                      addLabel="Add"
                    />
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {editing && (
          <button
            onClick={() =>
              addItem("skillGroups", {
                ...BLANK_GROUP,
                id: String(skillGroups.length + 1).padStart(2, "0"),
              })
            }
            className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
          >
            <Plus size={12} /> Add category
          </button>
        )}
      </div>

      {!editing ? (
        <div className="mask-fade-x relative mt-16 overflow-hidden border-y border-line py-5">
          <div className="flex w-max motion-safe:animate-marquee whitespace-nowrap [animation-play-state:running] hover:[animation-play-state:paused]">
            {[...skillTicker, ...skillTicker].map((s, i) => (
              <span
                key={i}
                className="mx-6 flex items-center gap-6 font-mono text-sm uppercase tracking-widest text-haze transition-colors hover:text-acid"
              >
                {s}
                <span className="text-acid">/</span>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-16 border-y border-line p-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-haze">
            Ticker items (scrolling strip)
          </p>
          <div className="flex flex-wrap gap-3">
            <EditableList
              path="skillTicker"
              as="span"
              className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-haze"
              placeholder="NEW SKILL"
              addLabel="Add ticker item"
            />
          </div>
        </div>
      )}
    </section>
  );
}
