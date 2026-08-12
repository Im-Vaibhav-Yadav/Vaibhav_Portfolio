"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Trash2 } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import EditableList from "./edit/EditableList";
import SectionHeading from "./SectionHeading";

const BLANK_ROLE = {
  company: "New Company",
  role: "Role title",
  period: "Mon 20XX — Present",
  location: "Location",
  tag: "",
  points: ["What you did there."],
};

export default function Experience() {
  const { content, editing, addItem, removeItem } = useContent();
  const { experience } = content;

  return (
    <section id="experience" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          kickerPath="headings.experience.kicker"
          titlePath="headings.experience.title"
        />

        <div className="flex flex-col">
          {experience.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative grid grid-cols-1 gap-6 border-b border-line py-10 md:grid-cols-[220px_1fr_200px] md:gap-10"
            >
              {editing && (
                <button
                  onClick={() => removeItem("experience", i)}
                  className="absolute -left-2 top-8 text-haze opacity-60 hover:text-amber md:-left-8"
                  aria-label="Remove role"
                >
                  <Trash2 size={14} />
                </button>
              )}

              <div>
                <Editable
                  as="p"
                  path={`experience.${i}.period`}
                  className="block font-mono text-xs uppercase tracking-widest text-haze"
                />
                {role.tag === "current" && (
                  <span className="mt-3 inline-flex items-center gap-2 border border-acid/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-acid">
                    <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                    Current
                  </span>
                )}
              </div>

              <div>
                <Editable
                  as="h3"
                  path={`experience.${i}.company`}
                  className="block font-display text-2xl italic text-paper transition-colors group-hover:text-acid md:text-3xl"
                />
                <Editable
                  as="p"
                  path={`experience.${i}.role`}
                  className="mb-4 mt-1 block font-mono text-sm text-haze"
                />
                <ul className="space-y-2.5">
                  <EditableList
                    path={`experience.${i}.points`}
                    as="li"
                    className="flex gap-3 text-sm leading-relaxed text-haze md:text-base"
                    prefix={<span className="mt-1 text-acid">+</span>}
                    placeholder="New point…"
                    addLabel="Add point"
                  />
                </ul>
              </div>

              <div className="flex items-start justify-start gap-1.5 font-mono text-xs text-haze md:justify-end">
                <Editable as="span" path={`experience.${i}.location`} />
                <ArrowUpRight
                  size={13}
                  className="mt-0.5 text-acid opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {editing && (
          <button
            onClick={() => addItem("experience", { ...BLANK_ROLE })}
            className="mt-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
          >
            <Plus size={12} /> Add role
          </button>
        )}
      </div>
    </section>
  );
}
