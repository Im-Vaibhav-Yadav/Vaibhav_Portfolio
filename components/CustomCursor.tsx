"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pointerFine, setPointerFine] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (max-width: 860px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPointerFine(!coarse.matches);
    setReducedMotion(reduced.matches);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 6);
      y.set(e.clientY - 6);
      if (!visible) setVisible(true);
    };
    const overHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover]"
      ) as HTMLElement | null;
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute("data-cursor-label") ?? null);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overHandler);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overHandler);
    };
  }, [visible, x, y]);

  if (!pointerFine || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          scale: label ? 1 : hovering ? 2.6 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex h-3 w-3 items-center justify-center rounded-full bg-acid mix-blend-difference"
      />
      <motion.div
        initial={false}
        animate={{
          opacity: label ? 1 : 0,
          scale: label ? 1 : 0.8,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-acid/60 bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-acid"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
