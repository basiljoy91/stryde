"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seenKey = "stryde-preloader-seen";
    const hasSeenPreloader = window.sessionStorage.getItem(seenKey) === "true";

    if (hasSeenPreloader) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setVisible(true);
    });

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(seenKey, "true");
      setVisible(false);
    }, 1850);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="pointer-events-none fixed inset-0 z-[120] overflow-hidden bg-brand-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(232,255,71,0.12),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(255,83,54,0.14),transparent_24%),#0A0A0A]" />
          <div className="grain-overlay absolute inset-0 opacity-[0.2]" />
          <div className="absolute inset-x-[12%] top-[18%] h-px bg-gradient-to-r from-transparent via-brand-accent/80 to-transparent" />
          <div className="absolute inset-x-[12%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-brand-ember/65 to-transparent" />

          <div className="relative flex min-h-screen flex-col items-center justify-center px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="eyebrow text-white/52"
            >
              Stryde / Loading the next drop
            </motion.p>
            <div className="mt-6 overflow-hidden">
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                className="font-display text-[clamp(5rem,14vw,11rem)] uppercase leading-[0.82] tracking-[0.1em] text-brand-white"
              >
                STRYDE
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
              className="mt-7 h-[3px] w-[min(24rem,72vw)] origin-left rounded-full bg-white/10"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.56 }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-brand-accent via-white to-brand-ember"
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
