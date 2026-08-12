"use client";

import { ArrowUp } from "lucide-react";
import { useContent } from "@/lib/content-store";

export default function Footer() {
  const { content } = useContent();

  return (
    <footer className="relative border-t border-line px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-haze sm:flex-row">
        <span>
          &copy; {new Date().getFullYear()} {content.profile.name}
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-acid opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
          </span>
          System / Online
        </span>
        <a
          href="#top"
          data-cursor-hover
          className="flex items-center gap-2 transition-colors hover:text-acid"
        >
          Back to top <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
