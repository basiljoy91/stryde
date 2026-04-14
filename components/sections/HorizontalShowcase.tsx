"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { collectionProducts } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";

const featuredLineup = collectionProducts.slice(0, 4);

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-lineup-card]",
        sectionRef.current,
      );

      gsap.from(cards, {
        autoAlpha: 0,
        y: 54,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black py-24 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,83,54,0.12),transparent_22%),radial-gradient(circle_at_18%_24%,rgba(232,255,71,0.08),transparent_24%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.16]" />

      <div className="container-shell relative z-10">
        <div className="max-w-3xl">
          <p className="eyebrow text-white/46">Lineup / Current Rotation</p>
          <h2 className="mt-4 max-w-[8ch] font-display text-[clamp(3.8rem,8vw,6.4rem)] uppercase leading-[0.88] tracking-[0.05em] text-brand-white">
            The Rotation In Full.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">
            A sharper read on the current lineup, with cleaner spacing and
            simpler framing so each pair lands before the motion does.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredLineup.map((product) => (
            <Link
              key={product.id}
              href={`/collection/${product.id}`}
              data-lineup-card
              data-cursor="card"
              data-cursor-label="View"
              className="group overflow-hidden rounded-[2.1rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#f9f4ea_0%,#ece3d6_100%)]">
                <div className="relative h-72">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 42vw, 100vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${product.imageClass}`}
                  />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                  {product.badge} / {product.category}
                </p>
                <h3 className="mt-3 font-display text-[2.4rem] uppercase leading-[0.92] text-brand-white">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
