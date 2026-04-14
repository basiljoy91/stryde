"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { FadeUp } from "@/components/animations/FadeUp";
import { TextReveal } from "@/components/animations/TextReveal";
import { lookbookEntries } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LookbookShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const activeEntry =
    activeIndex !== null ? lookbookEntries[activeIndex] : null;

  const lightboxLabel = useMemo(() => {
    if (!activeEntry || activeIndex === null) {
      return "";
    }

    return `${activeIndex + 1} / ${lookbookEntries.length}`;
  }, [activeEntry, activeIndex]);

  const showPrev = () => {
    setActiveIndex((current) =>
      current === null
        ? 0
        : (current - 1 + lookbookEntries.length) % lookbookEntries.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % lookbookEntries.length,
    );
  };

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPrev();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <div className="relative bg-brand-black pb-24 pt-28 sm:pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,255,71,0.06),transparent_20%),radial-gradient(circle_at_80%_12%,rgba(255,83,54,0.08),transparent_18%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.14]" />

      <div className="container-shell relative z-10">
        <header className="pb-12 sm:pb-14">
          <nav className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/38">
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/74">Lookbook</span>
          </nav>
          <p className="eyebrow">Lookbook / Campaign Frames</p>
          <TextReveal
            as="h1"
            text="LOOKBOOK"
            className="mt-4 font-display text-[clamp(4.2rem,14vw,10rem)] uppercase leading-[0.84] tracking-[0.08em] text-brand-white"
          />
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">
            A cleaner edit of the collection built around the real photography:
            studio stills, campaign images, and product frames that stay visible
            on both desktop and mobile.
          </p>
        </header>

        <div className="space-y-5 md:hidden">
          {lookbookEntries.map((entry, index) => (
            <FadeUp key={entry.id} delay={index * 0.03}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-full overflow-hidden rounded-[2rem] border border-white/10 text-left",
                  entry.panelClass,
                )}
              >
                <div className="p-4">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[1.6rem] border border-black/8 shadow-[0_20px_50px_rgba(0,0,0,0.16)]",
                      entry.frameClass,
                    )}
                  >
                    <div className="relative h-[18.5rem]">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${entry.accentClass} opacity-65`}
                      />
                      <Image
                        src={entry.image}
                        alt={entry.title}
                        fill
                        sizes="92vw"
                        className={cn(entry.cardImageClass, entry.imageClass)}
                      />
                    </div>
                  </div>
                  <div className="px-1 pb-1 pt-5">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-white/38">
                      Frame {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2
                      className={cn(
                        "mt-3 font-display text-[2.45rem] uppercase leading-[0.92]",
                        entry.textClass,
                      )}
                    >
                      {entry.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/66">
                      {entry.caption}
                    </p>
                  </div>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-[1.05fr_0.95fr_1fr]">
          {lookbookEntries.map((entry, index) => (
            <FadeUp key={entry.id} delay={index * 0.04}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative overflow-hidden rounded-[2.3rem] border border-white/10 text-left transition-transform duration-500 hover:-translate-y-1",
                  entry.panelClass,
                  entry.tall ? "min-h-[34rem]" : "min-h-[28rem]",
                )}
              >
                <div className="p-5">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[1.9rem] border border-black/8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]",
                      entry.frameClass,
                    )}
                  >
                    <div
                      className={cn(
                        "relative",
                        entry.tall ? "h-[26rem]" : "h-[20rem]",
                      )}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${entry.accentClass} opacity-72 transition duration-500 group-hover:opacity-88`}
                      />
                      <Image
                        src={entry.image}
                        alt={entry.title}
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                        className={cn(
                          "transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                          entry.cardImageClass,
                          entry.imageClass,
                        )}
                      />
                    </div>
                  </div>

                  <div className="px-1 pb-1 pt-5">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-white/38">
                      Frame {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2
                      className={cn(
                        "mt-3 font-display text-[clamp(2.4rem,3.4vw,3.5rem)] uppercase leading-[0.92]",
                        entry.textClass,
                      )}
                    >
                      {entry.title}
                    </h2>
                    <p className="mt-3 max-w-[34ch] text-sm leading-7 text-white/66">
                      {entry.caption}
                    </p>
                  </div>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeEntry ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_24%)]" />
            <div className="absolute right-4 top-4 z-10 flex items-center gap-3 sm:right-5 sm:top-5">
              <span className="text-xs uppercase tracking-[0.28em] text-white/45">
                {lightboxLabel}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveIndex(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white sm:h-12 sm:w-12"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="container-shell flex min-h-screen flex-col justify-center py-20 sm:py-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEntry.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center"
                >
                  <div
                    className={cn(
                      "overflow-hidden rounded-[2.2rem] border border-white/10 p-4 sm:p-5",
                      activeEntry.panelClass,
                    )}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-[1.8rem] border border-black/8 shadow-[0_28px_80px_rgba(0,0,0,0.18)]",
                        activeEntry.frameClass,
                      )}
                    >
                      <div className="relative min-h-[22rem] sm:min-h-[32rem]">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${activeEntry.accentClass} opacity-72`}
                        />
                        <Image
                          src={activeEntry.image}
                          alt={activeEntry.title}
                          fill
                          sizes="(min-width: 1024px) 56vw, 92vw"
                          className={cn(
                            activeEntry.cardImageClass,
                            activeEntry.imageClass,
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-1 sm:px-4">
                    <p className="eyebrow">Frame {lightboxLabel}</p>
                    <h2 className="mt-4 font-display text-[clamp(3rem,8vw,5.6rem)] uppercase leading-[0.88] text-brand-white">
                      {activeEntry.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
                      {activeEntry.caption}
                    </p>

                    <div className="mt-8 flex items-center gap-3 md:hidden">
                      <button
                        type="button"
                        onClick={showPrev}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
