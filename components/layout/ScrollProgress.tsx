"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 24,
    mass: 0.25,
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 22,
    mass: 0.2,
  });

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[85] h-1 bg-white/6">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left bg-gradient-to-r from-brand-accent via-white to-brand-ember"
        />
      </div>
      <div className="pointer-events-none fixed right-4 top-1/2 z-[84] hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
        <div className="h-28 w-px bg-white/10" />
        <div className="relative h-24 w-2 rounded-full bg-white/8">
          <motion.div
            style={{ scaleY }}
            className="absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full bg-gradient-to-t from-brand-accent to-brand-ember"
          />
        </div>
        <div className="h-28 w-px bg-white/10" />
      </div>
    </>
  );
}
