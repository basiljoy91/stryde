"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { FadeUp } from "@/components/animations/FadeUp";
import { ScrollParallax } from "@/components/animations/ScrollParallax";
import { TextReveal } from "@/components/animations/TextReveal";
import { lookbookEntries } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LookbookShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeEntry =
    activeIndex !== null ? lookbookEntries[activeIndex] : null;

  const lightboxLabel = useMemo(() => {
    if (!activeEntry) {
      return "";
    }

    return `${activeIndex! + 1} / ${lookbookEntries.length}`;
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

  return (
    <div className="relative bg-brand-black pb-24 pt-28 sm:pb-28 lg:pb-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,255,71,0.08),transparent_24%),radial-gradient(circle_at_78%_14%,rgba(255,83,54,0.12),transparent_24%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.24]" />

      <div className="container-shell relative z-10">
        <header className="pb-14">
          <nav className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/38">
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/74">Lookbook</span>
          </nav>
          <p className="eyebrow">Lookbook / Editorial Grid</p>
          <TextReveal
            as="h1"
            text="LOOKBOOK"
            className="mt-4 font-display text-[clamp(5rem,15vw,11rem)] uppercase leading-[0.84] tracking-[0.08em] text-brand-white"
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-base leading-8 text-white/65"
          >
            An editorial cut of the collection with masonry framing, parallax
            motion, and a full-screen lightbox for the hero moments.
          </motion.p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lookbookEntries.map((entry, index) => (
            <FadeUp key={entry.id} delay={index * 0.04}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                data-cursor="card"
                data-cursor-label="Open"
                className={cn(
                  "group relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-brand-mid text-left",
                  entry.tall ? "min-h-[36rem]" : "min-h-[28rem]",
                )}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${entry.accentClass} opacity-80`}
                />
                <div
                  className={cn(
                    "absolute inset-4 rounded-[2rem] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.18)]",
                    entry.frameClass,
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <ScrollParallax offset={8} className="absolute inset-0">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                    className={cn(
                      "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
                      entry.cardImageClass,
                      entry.imageClass,
                    )}
                  />
                </ScrollParallax>
                <div className="absolute inset-x-0 bottom-0 z-10 translate-y-8 bg-gradient-to-t from-black to-transparent px-6 pb-6 pt-14 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-4xl uppercase leading-none text-brand-white">
                    {entry.title}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/68">
                    {entry.caption}
                  </p>
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
            className="fixed inset-0 z-[80] bg-black/92 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_24%)]" />
            <div className="absolute right-5 top-5 z-10 flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.28em] text-white/45">
                {lightboxLabel}
              </span>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
                data-cursor="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
              data-cursor="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
              data-cursor="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="container-shell flex min-h-screen flex-col justify-center py-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEntry.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
                >
                  <div className="relative min-h-[28rem] overflow-hidden rounded-[2.6rem] border border-white/10 bg-brand-mid sm:min-h-[38rem]">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${activeEntry.accentClass} opacity-80`}
                    />
                    <div
                      className={cn(
                        "absolute inset-5 rounded-[2rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.18)]",
                        activeEntry.frameClass,
                      )}
                    />
                    <Image
                      src={activeEntry.image}
                      alt={activeEntry.title}
                      fill
                      sizes="(min-width: 1024px) 56vw, 92vw"
                      className={cn(
                        "object-contain p-8 sm:p-10",
                        activeEntry.imageClass,
                      )}
                    />
                  </div>

                  <div>
                    <p className="eyebrow">Frame {lightboxLabel}</p>
                    <h2 className="mt-4 font-display text-[clamp(3.5rem,8vw,6rem)] uppercase leading-[0.88] text-brand-white">
                      {activeEntry.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
                      {activeEntry.caption}
                    </p>
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
