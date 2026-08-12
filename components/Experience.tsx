"use client";

import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import EditableList from "./edit/EditableList";
import SectionHeading from "./SectionHeading";
import { DOMAIN_BG, DOMAIN_TEXT, DOMAIN_KEYS, type Domain } from "@/lib/domain-colors";

const BLANK_ROLE = {
  company: "New Company",
  role: "Role title",
  period: "Mon 20XX — Present",
  location: "Location",
  tag: "",
  points: ["What you did there."],
  tags: [],
};

export default function Experience() {
  const { content, editing, addItem, removeItem, update } = useContent();
  const { experience } = content;

  return (
    <section id="experience" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          kickerPath="headings.experience.kicker"
          titlePath="headings.experience.title"
        />

        <div className="relative flex flex-col border-l border-line pl-8 md:pl-12">
          {experience.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative grid grid-cols-1 gap-6 border-b border-line py-10 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <span className="absolute -left-[41px] top-11 hidden h-3 w-3 rounded-full border-2 border-ink bg-line transition-colors duration-300 group-hover:bg-acid md:-left-[57px] md:block" />

              {editing && (
                <button
                  onClick={() => removeItem("experience", i)}
                  className="absolute -left-2 top-8 text-haze opacity-60 hover:text-gold md:-left-8"
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
                <Editable
                  as="p"
                  path={`experience.${i}.location`}
                  className="mt-3 block font-mono text-xs text-haze"
                />
              </div>

              <div>
                <Editable
                  as="h3"
                  path={`experience.${i}.company`}
                  className="block font-display text-3xl italic text-paper transition-colors group-hover:text-acid md:text-4xl"
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

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {(role.tags ?? []).map((t, ti) =>
                    !editing ? (
                      <span
                        key={ti}
                        className={`flex items-center gap-1.5 border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${DOMAIN_TEXT[t.domain as Domain] ?? "text-haze"}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${DOMAIN_BG[t.domain as Domain] ?? "bg-haze"}`}
                        />
                        {t.label}
                      </span>
                    ) : (
                      <span
                        key={ti}
                        className="flex items-center gap-1.5 border border-line px-2 py-1"
                      >
                        <select
                          value={t.domain}
                          onChange={(e) =>
                            update(
                              `experience.${i}.tags.${ti}.domain`,
                              e.target.value
                            )
                          }
                          className="bg-panel font-mono text-[9px] uppercase text-haze"
                        >
                          {DOMAIN_KEYS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <span
                          className="font-mono text-[10px] uppercase tracking-wider text-paper outline outline-1 outline-dashed outline-acid/40"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            update(
                              `experience.${i}.tags.${ti}.label`,
                              e.currentTarget.textContent ?? ""
                            )
                          }
                        >
                          {t.label}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(`experience.${i}.tags`, ti)
                          }
                          className="text-haze hover:text-gold"
                        >
                          &times;
                        </button>
                      </span>
                    )
                  )}
                  {editing && (
                    <button
                      onClick={() =>
                        addItem(`experience.${i}.tags`, {
                          label: "Tag",
                          domain: "product",
                        })
                      }
                      className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-acid/80 hover:text-acid"
                    >
                      <Plus size={11} /> Tag
                    </button>
                  )}
                </div>
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
