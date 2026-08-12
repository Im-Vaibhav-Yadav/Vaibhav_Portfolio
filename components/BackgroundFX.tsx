"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (reduced || coarse) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      raf = 0;
      if (!pending || !ref.current) return;
      ref.current.style.setProperty("--mx", `${pending.x}px`);
      ref.current.style.setProperty("--my", `${pending.y}px`);
    };

    const onMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-grid-interactive" />
      <div className="cursor-glow" />
      <div className="absolute -left-40 top-[-10%] h-[560px] w-[560px] rounded-full bg-acid/[0.06] blur-[120px] motion-safe:animate-drift" />
      <div className="absolute right-[-10%] top-[20%] h-[480px] w-[480px] rounded-full bg-gold/[0.07] blur-[130px] motion-safe:animate-driftSlow" />
      <div className="absolute left-[15%] bottom-[-15%] h-[500px] w-[500px] rounded-full bg-electric/[0.05] blur-[140px] motion-safe:animate-drift" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="noise absolute inset-0" />
    </div>
  );
}
