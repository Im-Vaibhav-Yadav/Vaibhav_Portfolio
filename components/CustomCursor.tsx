"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pointerFine, setPointerFine] = useState(true);
  const [hoveringLink, setHoveringLink] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (max-width: 860px)");
    setPointerFine(!mq.matches);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 6);
      y.set(e.clientY - 6);
      if (!visible) setVisible(true);
    };
    const overHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHoveringLink(!!target.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overHandler);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overHandler);
    };
  }, [visible, x, y]);

  if (!pointerFine) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          scale: hoveringLink ? 2.6 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-3 w-3 rounded-full bg-acid"
      />
    </motion.div>
  );
}
