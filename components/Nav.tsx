"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Upload, Loader2 } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";

export default function Nav() {
  const { content, editing, update, uploadImage } = useContent();
  const { navLinks, profile } = content;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(navLinks[0]?.href ?? "");
  const [uploadingResume, setUploadingResume] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  async function handleResumeFile(file: File | null) {
    if (!file) return;
    setUploadingResume(true);
    try {
      const url = await uploadImage(file);
      update("profile.resumeUrl", url);
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingResume(false);
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navLinks.length]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/85 py-2 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            className="group flex items-center gap-3"
            data-cursor-hover
          >
            <span className="edge-shadow flex h-9 w-9 items-center justify-center border border-acid/40 font-mono text-xs text-acid transition-colors group-hover:bg-acid group-hover:text-ink">
              {profile.initials}
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.25em] text-haze sm:block">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link, i) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor-hover
                  className={`group flex items-baseline gap-1.5 font-mono text-[13px] uppercase tracking-wider transition-colors ${
                    isActive ? "text-paper" : "text-haze hover:text-paper"
                  }`}
                >
                  <span
                    className={`text-[10px] transition-colors ${
                      isActive ? "text-acid" : "text-acid/70"
                    }`}
                  >
                    {link.index}
                  </span>
                  <span className="relative">
                    <Editable as="span" path={`navLinks.${i}.label`} />
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-acid transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              download
              data-cursor-hover
              data-cursor-label="OPEN"
              className="hidden items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-paper transition-colors hover:border-acid hover:text-acid md:flex"
            >
              R&eacute;sum&eacute; <ArrowUpRight size={13} />
            </a>
            {editing && (
              <>
                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  data-cursor-hover
                  className="hidden items-center gap-1.5 border border-dashed border-acid/50 px-2.5 py-2 font-mono text-[10px] uppercase tracking-widest text-acid md:flex"
                  title="Replace résumé PDF"
                >
                  {uploadingResume ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Upload size={12} />
                  )}
                  Replace
                </button>
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) =>
                    handleResumeFile(e.target.files?.[0] ?? null)
                  }
                />
              </>
            )}
            <button
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-line text-paper md:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink p-6"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-line text-paper"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-16 flex flex-1 flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-display text-4xl italic text-paper"
                >
                  <span className="mr-3 font-mono text-sm text-acid">
                    {link.index}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <a
                href={profile.resumeUrl}
                download
                className="mt-6 flex items-center gap-2 border border-acid px-5 py-3 font-mono text-xs uppercase tracking-widest text-acid"
              >
                Download R&eacute;sum&eacute; <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
