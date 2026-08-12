"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content-store";
import Editable from "./edit/Editable";

export default function Nav() {
  const { content } = useContent();
  const { navLinks, profile } = content;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#top"
            className="group flex items-center gap-3"
            data-cursor-hover
          >
            <span className="flex h-9 w-9 items-center justify-center border border-acid/40 font-mono text-xs text-acid transition-colors group-hover:bg-acid group-hover:text-ink">
              {profile.initials}
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.25em] text-haze sm:block">
              Yadav / Systems
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className="group flex items-baseline gap-1.5 font-mono text-[13px] uppercase tracking-wider text-haze transition-colors hover:text-paper"
              >
                <span className="text-[10px] text-acid/70">{link.index}</span>
                <span className="relative">
                  <Editable as="span" path={`navLinks.${i}.label`} />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-acid transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              download
              data-cursor-hover
              className="hidden items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-paper transition-colors hover:border-acid hover:text-acid md:flex"
            >
              R&eacute;sum&eacute; <ArrowUpRight size={13} />
            </a>
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
                href="/resume.pdf"
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
