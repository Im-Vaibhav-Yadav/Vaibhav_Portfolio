"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles, Plus, X } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { content, editing, update, addItem, removeItem } = useContent();
  const { profile, education, focusAreas } = content;

  return (
    <section id="about" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01"
          kickerPath="headings.about.kicker"
          titlePath="headings.about.title"
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {profile.bio.map((p, i) => {
              const cls =
                i === 0
                  ? "block font-display text-2xl italic leading-snug text-paper md:text-3xl"
                  : "block max-w-2xl font-body text-base leading-relaxed text-haze md:text-lg";
              if (!editing) {
                return (
                  <p key={i} className={cls}>
                    {p}
                  </p>
                );
              }
              return (
                <div key={i} className="group/edit-item relative pl-6">
                  <button
                    onClick={() => removeItem("profile.bio", i)}
                    className="absolute left-0 top-1 text-haze opacity-60 hover:text-amber"
                    aria-label="Remove paragraph"
                  >
                    <X size={13} />
                  </button>
                  <p
                    className={`${cls} rounded-[3px] px-1 -mx-1 outline outline-1 outline-dashed outline-acid/40 hover:outline-acid focus:bg-acid/[0.06] focus:outline-2 focus:outline-solid focus:outline-acid`}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      update(
                        `profile.bio.${i}`,
                        e.currentTarget.textContent ?? ""
                      )
                    }
                  >
                    {p}
                  </p>
                </div>
              );
            })}
            {editing && (
              <button
                onClick={() => addItem("profile.bio", "New paragraph…")}
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
              >
                <Plus size={12} /> Add paragraph
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="corner-frame grain-card relative flex flex-col gap-8 border border-line p-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-haze">
                Field notes
              </span>
              <Sparkles size={16} className="text-acid" />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-acid">
                <GraduationCap size={14} /> Education
              </div>
              <Editable
                as="p"
                path="education.degree"
                className="block font-display text-lg italic text-paper"
              />
              <Editable
                as="p"
                path="education.school"
                className="mt-1 block text-sm text-haze"
              />
              <Editable
                as="p"
                path="education.period"
                className="mt-1 block font-mono text-xs text-haze"
              />
            </div>

            <div className="h-px bg-line" />

            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-acid">
                <MapPin size={14} /> Based in
              </div>
              <Editable as="p" path="profile.location" className="block text-paper" />
            </div>

            <div className="h-px bg-line" />

            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-acid">
                Currently focused on
              </div>
              <ul className="space-y-2 text-sm text-haze">
                {focusAreas.map((area, i) =>
                  !editing ? (
                    <li key={i}>&mdash; {area}</li>
                  ) : (
                    <li key={i} className="flex items-start gap-2">
                      <span>&mdash;</span>
                      <span
                        className="flex-1 rounded-[3px] px-1 -mx-1 outline outline-1 outline-dashed outline-acid/40 hover:outline-acid focus:bg-acid/[0.06] focus:outline-2 focus:outline-solid focus:outline-acid"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          update(
                            `focusAreas.${i}`,
                            e.currentTarget.textContent ?? ""
                          )
                        }
                      >
                        {area}
                      </span>
                      <button
                        onClick={() => removeItem("focusAreas", i)}
                        className="text-haze opacity-60 hover:text-amber"
                        aria-label="Remove"
                      >
                        <X size={13} />
                      </button>
                    </li>
                  )
                )}
              </ul>
              {editing && (
                <button
                  onClick={() => addItem("focusAreas", "New focus area")}
                  className="mt-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
                >
                  <Plus size={12} /> Add
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
