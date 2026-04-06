"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/animations/FadeUp";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollParallax } from "@/components/animations/ScrollParallax";
import { TextReveal } from "@/components/animations/TextReveal";
import { Badge } from "@/components/ui/Badge";
import { heroProduct, heroStats, colorways } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export function Hero() {
  const [selectedColorway, setSelectedColorway] = useState(colorways[0]);
  const addItem = useCart((state) => state.addItem);

  const priceLabel = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        currency: "USD",
        maximumFractionDigits: 0,
        style: "currency",
      }).format(heroProduct.price),
    [],
  );

  const handleAddToCart = () => {
    addItem({
      id: heroProduct.id,
      image: heroProduct.image,
      name: heroProduct.name,
      price: heroProduct.price,
      colorway: selectedColorway.name,
    });
  };

  return (
    <section className="relative pb-24 pt-8 sm:pb-28 sm:pt-14 lg:pb-30">
      <div className="container-shell grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative z-10">
          <FadeUp className="flex flex-wrap items-center gap-4">
            <Badge variant="accent">Phase 1 / Design System</Badge>
            <span className="eyebrow">{heroProduct.eyebrow}</span>
          </FadeUp>

          <div className="mt-8 space-y-1">
            <TextReveal
              as="h1"
              text={heroProduct.headlinePrimary}
              className="font-display text-[clamp(5rem,13vw,10rem)] uppercase leading-[0.82] tracking-[0.04em] text-brand-ember sm:text-[clamp(6rem,15vw,12rem)]"
            />
            <TextReveal
              as="h1"
              text={heroProduct.headlineSecondary}
              className="font-display text-[clamp(5.5rem,14vw,11rem)] uppercase leading-[0.82] tracking-[0.02em] text-brand-white"
            />
          </div>

          <FadeUp
            delay={0.1}
            className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg"
          >
            {heroProduct.description}
          </FadeUp>

          <FadeUp delay={0.16} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton onClick={handleAddToCart}>
              Add to Cart
            </MagneticButton>
            <MagneticButton href="#featured" variant="secondary">
              Explore Drop
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </FadeUp>

          <FadeUp delay={0.22} className="mt-10 grid gap-4 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="glass-panel rounded-[1.4rem] p-4"
              >
                <p className="font-display text-4xl uppercase leading-none text-brand-white">
                  {item.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.26em] text-brand-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </FadeUp>
        </div>

        <div className="relative">
          <ScrollParallax offset={16}>
            <div
              className="relative mx-auto aspect-[1.05] max-w-[720px]"
              data-cursor="card"
              data-cursor-label="Inspect"
            >
              <div className="absolute inset-0 rounded-[2.75rem] border border-white/10 bg-white/[0.02]" />
              <div className="absolute inset-x-10 top-12 h-px animate-pulse-line bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="pointer-events-none absolute -left-4 top-14 font-display text-[clamp(7rem,20vw,15rem)] uppercase leading-none tracking-[0.08em] text-white/[0.05]">
                Apex
              </p>

              <motion.div
                className="absolute inset-[16%] rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${selectedColorway.glow} 0%, transparent 72%)`,
                }}
                animate={{ opacity: [0.72, 1, 0.72], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 6.2, ease: "easeInOut", repeat: Infinity }}
              />

              <motion.div
                className="absolute inset-x-0 top-[11%] bottom-[9%]"
                animate={{ rotate: [-14, -11, -14], y: [0, -14, 0] }}
                transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
              >
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_42px_90px_rgba(0,0,0,0.58)]"
                />
              </motion.div>

              <div className="glass-panel absolute right-5 top-5 max-w-[220px] p-4 text-right">
                <p className="eyebrow">Prototype code</p>
                <p className="mt-2 font-display text-4xl uppercase leading-none text-brand-white">
                  {heroProduct.code}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Tuned for aggressive first steps, clean transitions, and
                  locked-in heel support.
                </p>
              </div>

              <div className="absolute bottom-6 left-5 right-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="glass-panel rounded-[1.7rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                    Choose color
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {colorways.map((colorway) => (
                      <button
                        key={colorway.name}
                        type="button"
                        data-cursor="button"
                        aria-label={colorway.name}
                        onClick={() => setSelectedColorway(colorway)}
                        className={cn(
                          "group flex items-center gap-3 rounded-pill border px-3 py-2 transition-all duration-300",
                          selectedColorway.name === colorway.name
                            ? "border-brand-accent/40 bg-white/[0.08]"
                            : "border-white/10 bg-black/35",
                        )}
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-white/20"
                          style={{
                            background: `linear-gradient(135deg, ${colorway.accent}, ${colorway.secondary})`,
                          }}
                        />
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/70 transition group-hover:text-white">
                          {colorway.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-[1.7rem] p-4 text-right">
                  <Badge variant="dark">Exclusive Concept</Badge>
                  <p className="mt-4 font-display text-5xl uppercase leading-none text-brand-white">
                    {priceLabel}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-brand-muted">
                    {heroProduct.name}
                  </p>
                </div>
              </div>
            </div>
          </ScrollParallax>
        </div>
      </div>
    </section>
  );
}
