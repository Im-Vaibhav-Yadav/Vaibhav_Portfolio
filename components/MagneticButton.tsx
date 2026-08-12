"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MAX_PULL = 8;

export default function MagneticButton({
  href,
  onClick,
  children,
  className = "",
  cursorLabel,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  cursorLabel?: string;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = href ? anchorRef.current : buttonRef.current;
    if (reduced || !el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * MAX_PULL);
    y.set((relY / (rect.height / 2)) * MAX_PULL);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedClassName = `inline-flex transition-colors ${className}`;

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor-hover
        data-cursor-label={cursorLabel}
        style={{ x: springX, y: springY }}
        className={sharedClassName}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
      data-cursor-label={cursorLabel}
      style={{ x: springX, y: springY }}
      className={sharedClassName}
    >
      {children}
    </motion.button>
  );
}
