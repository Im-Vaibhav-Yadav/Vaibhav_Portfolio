"use client";

import { useState } from "react";
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
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";
import MagneticButton from "./MagneticButton";
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

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { content, editing, update, addItem, removeItem } = useContent();
  const { profile, socials, contactForm } = content;
  const [anyHovered, setAnyHovered] = useState(false);

  return (
    <section id="contact" className="relative px-6 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          kickerPath="headings.contact.kicker"
          titlePath="headings.contact.title"
        />

        <p className="mb-12 max-w-xl font-body text-base text-haze md:text-lg">
          Send a message directly below, or reach out through whichever
          channel on the right is easiest for you.
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm accessKey={contactForm?.accessKey ?? ""} email={profile.email} />

          <div
            onMouseEnter={() => setAnyHovered(true)}
            onMouseLeave={() => setAnyHovered(false)}
          >
            <div className="relative mb-6 h-px w-full overflow-hidden bg-line">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                animate={{ opacity: anyHovered ? 1 : 0.5 }}
                className="absolute inset-0 origin-left bg-acid"
              />
            </div>

            {editing ? (
              <div className="mb-6 flex items-center gap-4 border-b border-line pb-6">
                <Editable
                  as="span"
                  path="profile.email"
                  className="block break-all font-display text-2xl italic leading-none tracking-tight text-paper"
                />
              </div>
            ) : (
              <MagneticButton
                href={`mailto:${profile.email}`}
                cursorLabel="OPEN"
                className="group mb-6 w-full items-center justify-between gap-4 border-b border-line pb-6"
              >
                <span className="block break-all font-display text-2xl italic leading-none tracking-tight text-paper transition-colors group-hover:text-acid">
                  {profile.email}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line text-paper transition-all group-hover:rotate-45 group-hover:border-acid group-hover:text-acid">
                  <ArrowUpRight size={16} />
                </span>
              </MagneticButton>
            )}

            <div className="flex flex-col gap-4">
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
                    className="corner-frame group relative border border-line p-5 transition-colors hover:border-acid/40"
                  >
                    {editing && (
                      <button
                        onClick={() => removeItem("socials", i)}
                        className="absolute right-1.5 top-1.5 text-haze opacity-60 hover:text-gold"
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
                        data-cursor-label="OPEN"
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
        </div>
      </div>
    </section>
  );
}

function ContactForm({
  accessKey,
  email,
}: {
  accessKey: string;
  email: string;
}) {
  const { editing, update } = useContent();
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const nameError = touched && !name.trim();
  const emailError =
    touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail.trim());
  const messageError = touched && !message.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || !message.trim() || emailError) return;

    if (!accessKey) {
      const body = `${message}\n\n— ${name} (${fromEmail})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        subject || `Message from ${name}`
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email: fromEmail,
          subject: subject || `Portfolio message from ${name}`,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName("");
        setFromEmail("");
        setSubject("");
        setMessage("");
        setTouched(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="corner-frame flex min-h-[320px] flex-col items-start justify-center gap-3 border border-line p-8">
        <CheckCircle2 size={28} className="text-acid" />
        <p className="font-display text-2xl italic text-paper">
          Message sent.
        </p>
        <p className="max-w-sm text-sm text-haze">
          Thanks for reaching out — I&apos;ll get back to you as soon as I
          can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="corner-frame border border-line p-6 md:p-8"
    >
      <div className="mb-6 font-mono text-[11px] uppercase tracking-widest text-acid">
        Send a message
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" error={nameError && "Required"}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass(nameError)}
          />
        </Field>
        <Field label="Email" error={emailError && "A valid email is required"}>
          <input
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldClass(emailError)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Subject">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
            className={fieldClass(false)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={messageError && "Required"}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me a bit about what you have in mind…"
            rows={5}
            className={`${fieldClass(messageError)} resize-none`}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <MagneticButton
          type="submit"
          disabled={status === "sending"}
          cursorLabel="SEND"
          className="border border-acid bg-acid px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink"
        >
          {status === "sending" ? (
            <span className="flex items-center gap-2">
              <Loader2 size={13} className="animate-spin" /> Sending…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send message <Send size={13} />
            </span>
          )}
        </MagneticButton>

        {status === "error" && (
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-amber">
            <AlertCircle size={13} /> Couldn&apos;t send — try emailing directly
          </span>
        )}

        {!accessKey && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-haze">
            Opens your email client
          </span>
        )}
      </div>

      {editing && (
        <div className="mt-8 border-t border-dashed border-acid/30 pt-5">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-acid">
            Form delivery setup
          </p>
          <p className="mb-3 max-w-md text-xs leading-relaxed text-haze">
            Without a key, submissions just open the visitor&apos;s email
            client. For silent, no-backend delivery, grab a free access key
            at{" "}
            <a
              href="https://web3forms.com"
              target="_blank"
              rel="noreferrer"
              className="text-acid underline"
            >
              web3forms.com
            </a>{" "}
            (no card, just your email) and paste it below.
          </p>
          <Editable
            as="p"
            path="contactForm.accessKey"
            className="inline-block min-w-[240px] border border-line bg-panel px-3 py-2 font-mono text-xs text-paper"
          />
        </div>
      )}
    </form>
  );
}

function fieldClass(error: boolean | string | null | undefined) {
  return `w-full border bg-panel px-3 py-2.5 font-body text-sm text-paper outline-none placeholder:text-haze/70 focus:border-acid ${
    error ? "border-amber" : "border-line"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-haze">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block font-mono text-[10px] text-amber">
          {error}
        </span>
      )}
    </label>
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
      <div className="corner-frame group border border-line p-5 transition-colors hover:border-acid/40">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      data-cursor-hover
      data-cursor-label="OPEN"
      className="corner-frame group border border-line p-5 transition-colors hover:border-acid/40"
    >
      {inner}
    </a>
  );
}
