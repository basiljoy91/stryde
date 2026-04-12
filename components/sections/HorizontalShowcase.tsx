"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { collectionProducts } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";

const featuredLineup = collectionProducts.slice(0, 6);

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) {
        return;
      }

      const maxShift = Math.max(
        trackRef.current.scrollWidth - window.innerWidth,
        0,
      );

      if (!maxShift) {
        return;
      }

      gsap.to(trackRef.current, {
        x: -maxShift,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${maxShift * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black py-20 sm:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(232,255,71,0.05),transparent_24%),radial-gradient(circle_at_85%_18%,rgba(255,83,54,0.12),transparent_24%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.2]" />

      <div className="container-shell relative z-10">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Lineup / Scroll gallery</p>
          <h2 className="mt-4 font-display text-[clamp(3.8rem,9vw,7rem)] uppercase leading-[0.86] tracking-[0.06em] text-brand-white">
            The Rotation In Full.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/66">
            A pinned horizontal pass through the current lineup, framed like a
            campaign wall instead of a flat catalog.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 flex w-max gap-5 px-5 pb-4 sm:px-8 lg:px-10"
      >
        {featuredLineup.map((product, index) => (
          <Link
            key={product.id}
            href={`/collection/${product.id}`}
            data-cursor="card"
            data-cursor-label="View"
            className={`group relative flex min-h-[28rem] w-[84vw] max-w-[28rem] flex-col justify-end overflow-hidden rounded-[2.5rem] border border-white/10 bg-brand-mid p-6 sm:w-[28rem] ${
              index % 3 === 1 ? "sm:mt-12" : index % 3 === 2 ? "sm:mt-24" : ""
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${product.accentClass} opacity-75 transition duration-500 group-hover:opacity-100`}
            />
            <div className="absolute inset-[1px] rounded-[2.45rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_32%)]" />
            <div className="absolute inset-0">
              <div className="absolute left-6 top-6 rounded-pill border border-black/10 bg-black/6 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-black/50">
                {product.badge}
              </div>
              <div className="absolute inset-x-6 top-16 bottom-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#f8f2e6_0%,#ece3d6_100%)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 640px) 28rem, 84vw"
                  className={`object-cover p-4 transition-transform duration-700 ease-out group-hover:scale-[1.06] ${product.imageClass}`}
                />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/48">
                {product.category}
              </p>
              <h3 className="mt-3 font-display text-5xl uppercase leading-none text-brand-white">
                {product.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/66">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
