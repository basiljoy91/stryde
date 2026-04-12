"use client";

import type { PropsWithChildren } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-screen flex-col"
      >
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          className="pointer-events-none fixed inset-0 z-[95] origin-top bg-[linear-gradient(180deg,#111214_0%,#0a0a0a_42%,rgba(232,255,71,0.08)_100%)]"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
