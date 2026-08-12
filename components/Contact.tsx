"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Phone,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  Instagram,
  Globe,
  Mail,
  Link2,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import SectionHeading from "./SectionHeading";
import { ICON_KEYS } from "@/lib/schema";

const ICONS: Record<string, any> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  youtube: Youtube,
  instagram: Instagram,
  globe: Globe,
  mail: Mail,
  phone: Phone,
  link: Link2,
  file: FileText,
};

const BLANK_SOCIAL = {
  id: "",
  label: "New link",
  value: "your-handle",
  url: "https://",
  icon: "link",
};

export default function Contact() {
  const { content, editing, update, addItem, removeItem } = useContent();
  const { profile, socials } = content;

  return (
    <section id="contact" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          kickerPath="headings.contact.kicker"
          titlePath="headings.contact.title"
        />

        <motion.a
          href={editing ? undefined : `mailto:${profile.email}`}
          data-cursor-hover
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="group mb-16 flex flex-col items-start gap-4 border-b border-line pb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <Editable
            as="span"
            path="profile.email"
            className="block break-all font-display text-[9vw] italic leading-none tracking-tight text-paper transition-colors group-hover:text-acid sm:text-6xl md:text-7xl"
          />
          <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-line text-paper transition-all group-hover:-translate-y-1 group-hover:rotate-45 group-hover:border-acid group-hover:text-acid">
            <ArrowUpRight size={22} />
          </span>
        </motion.a>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={<Phone size={16} />}
            label="Phone"
            value={profile.phone}
            href={editing ? undefined : `tel:${profile.phone.replace(/\s/g, "")}`}
            editing={editing}
            valuePath="profile.phone"
          />

          {socials.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Link2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                className="corner-frame group relative border border-line p-6 transition-colors hover:border-acid/40"
              >
                {editing && (
                  <button
                    onClick={() => removeItem("socials", i)}
                    className="absolute right-1.5 top-1.5 text-haze opacity-60 hover:text-amber"
                    aria-label="Remove link"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
                {editing ? (
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <select
                          value={s.icon}
                          onChange={(e) =>
                            update(`socials.${i}.icon`, e.target.value)
                          }
                          className="border border-line bg-panel px-1.5 py-1 font-mono text-[10px] uppercase tracking-widest text-acid"
                        >
                          {ICON_KEYS.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                        <Editable
                          as="span"
                          path={`socials.${i}.label`}
                          className="block font-mono text-[10px] uppercase tracking-widest text-acid"
                        />
                      </div>
                      <Editable
                        as="p"
                        path={`socials.${i}.value`}
                        className="mb-1 block text-sm text-paper"
                      />
                      <Editable
                        as="p"
                        path={`socials.${i}.url`}
                        className="block truncate font-mono text-[11px] text-haze"
                      />
                    </div>
                  </div>
                ) : (
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor-hover
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-acid">
                        <Icon size={14} />
                        {s.label}
                      </div>
                      <p className="text-sm text-paper">{s.value}</p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-haze transition-colors group-hover:text-acid"
                    />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {editing && (
          <button
            onClick={() =>
              addItem("socials", { ...BLANK_SOCIAL, id: `s${Date.now()}` })
            }
            className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
          >
            <Plus size={12} /> Add link
          </button>
        )}
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  editing,
  valuePath,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  editing: boolean;
  valuePath: string;
}) {
  const inner = (
    <div className="flex items-center justify-between gap-3">
      <div>
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-acid">
          {icon}
          {label}
        </div>
        <Editable as="p" path={valuePath} className="block text-sm text-paper" />
      </div>
      {!editing && (
        <ArrowUpRight
          size={16}
          className="text-haze transition-colors group-hover:text-acid"
        />
      )}
    </div>
  );

  if (editing || !href) {
    return (
      <div className="corner-frame group border border-line p-6 transition-colors hover:border-acid/40">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      data-cursor-hover
      className="corner-frame group border border-line p-6 transition-colors hover:border-acid/40"
    >
      {inner}
    </a>
  );
}
