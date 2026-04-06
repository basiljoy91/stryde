"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorMode = "default" | "button" | "card";

export function CustomCursor() {
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const springX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.35 });

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const frame = window.requestAnimationFrame(() => {
      setEnabled(mediaQuery.matches);
    });

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setEnabled(event.matches);
      if (!event.matches) {
        setVisible(false);
      }
    };

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
      setMode("default");
      setLabel("");
    };

    const handleOver = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );

      if (!target) {
        setMode("default");
        setLabel("");
        return;
      }

      const nextMode = target.dataset.cursor === "card" ? "card" : "button";
      setMode(nextMode);
      setLabel(
        target.dataset.cursorLabel ?? (nextMode === "card" ? "Inspect" : ""),
      );
    };

    const handleWindowOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        handleLeave();
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("mouseout", handleWindowOut);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mouseout", handleWindowOut);
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  const size = mode === "card" ? 88 : mode === "button" ? 52 : 18;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: 1,
            width: size,
            height: size,
          }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-white/18 bg-white/[0.08] text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-brand-black mix-blend-difference backdrop-blur-md"
        >
          {label}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
