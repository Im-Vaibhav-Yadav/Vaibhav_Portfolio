"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Plus, Trash2, ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";

const BLANK_CERT = { name: "New certification", issuer: "Issuer", url: "" };

export default function Certifications() {
  const { content, editing, addItem, removeItem } = useContent();
  const { certifications } = content;

  return (
    <section className="relative px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-haze">
          <BadgeCheck size={14} className="text-champagne" />
          Certifications &amp; credentials
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {certifications.map((c, i) => {
            const Wrapper = !editing && c.url ? motion.a : motion.div;
            const wrapperProps =
              !editing && c.url
                ? {
                    href: c.url,
                    target: "_blank",
                    rel: "noreferrer",
                    "data-cursor-hover": true,
                    "data-cursor-label": "OPEN",
                  }
                : {};
            return (
              <Wrapper
                key={i}
                {...(wrapperProps as any)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="corner-frame group relative block border border-line p-5 transition-all hover:-translate-y-0.5 hover:border-champagne/40"
              >
                {editing && (
                  <button
                    onClick={() => removeItem("certifications", i)}
                    className="absolute right-1.5 top-1.5 text-haze opacity-60 hover:text-gold"
                    aria-label="Remove certification"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-haze">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {!editing && c.url && (
                    <span className="flex items-center gap-1 text-champagne opacity-0 transition-opacity group-hover:opacity-100">
                      Verified <ArrowUpRight size={10} />
                    </span>
                  )}
                </div>
                <Editable
                  as="p"
                  path={`certifications.${i}.name`}
                  className="mb-3 block font-display text-base italic leading-snug text-paper"
                />
                <Editable
                  as="p"
                  path={`certifications.${i}.issuer`}
                  className="block font-mono text-[10px] uppercase tracking-widest text-haze"
                />
                {editing && (
                  <Editable
                    as="p"
                    path={`certifications.${i}.url`}
                    className="mt-2 block truncate font-mono text-[10px] text-champagne/70"
                  />
                )}
              </Wrapper>
            );
          })}
        </div>

        {editing && (
          <button
            onClick={() => addItem("certifications", { ...BLANK_CERT })}
            className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
          >
            <Plus size={12} /> Add certification
          </button>
        )}
      </div>
    </section>
  );
}
