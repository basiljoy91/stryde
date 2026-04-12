"use client";

import type { PropsWithChildren } from "react";

import { motion, useAnimationControls } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const curtainControls = useAnimationControls();
  const logoControls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;

    const runTransition = async () => {
      curtainControls.set({ opacity: 1, scaleY: 1, transformOrigin: "bottom" });
      logoControls.set({ opacity: 0.92, scale: 0.82, y: 0 });

      await Promise.all([
        logoControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
        }),
        curtainControls.start({
          scaleY: 1,
          transition: { duration: 0.01 },
        }),
      ]);

      if (cancelled) {
        return;
      }

      await Promise.all([
        curtainControls.start({
          opacity: 1,
          scaleY: 0,
          transformOrigin: "top",
          transition: { duration: 0.82, ease: [0.83, 0, 0.17, 1] },
        }),
        logoControls.start({
          opacity: 0,
          scale: 1.18,
          y: -12,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }),
      ]);
    };

    runTransition();

    return () => {
      cancelled = true;
    };
  }, [pathname, curtainControls, logoControls]);

  return (
    <div className="flex min-h-screen flex-col">
      <motion.div
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-screen flex-col"
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 1, scaleY: 1, transformOrigin: "bottom" }}
        animate={curtainControls}
        className="pointer-events-none fixed inset-0 z-[95] origin-bottom bg-[linear-gradient(180deg,#111214_0%,#0a0a0a_42%,rgba(232,255,71,0.08)_100%)]"
      >
        <div className="flex min-h-screen items-center justify-center">
          <motion.div
            animate={logoControls}
            className="flex h-28 w-28 items-center justify-center rounded-full border border-brand-accent/24 bg-brand-accent/10 text-brand-accent shadow-[0_0_0_1px_rgba(232,255,71,0.18),0_30px_70px_rgba(0,0,0,0.32)]"
          >
            <span className="font-display text-7xl uppercase leading-none">S</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
