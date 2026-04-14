"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ArrowUpRight } from "lucide-react";

import { TextReveal } from "@/components/animations/TextReveal";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import { featuredDrops } from "@/lib/constants";

export function FeaturedDrop() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-drop-card]",
        sectionRef.current,
      );

      gsap.from(cards, {
        autoAlpha: 0,
        y: 48,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f0ece3] py-24 text-brand-black sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(232,255,71,0.12),transparent_28%),radial-gradient(circle_at_80%_14%,rgba(255,83,54,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(240,236,227,1))]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.14]" />

      <div className="container-shell relative z-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-black/42">
              Featured Drops
            </p>
            <TextReveal
              as="h2"
              text="Built To Be Seen."
              className="mt-3 max-w-[8ch] font-display text-[clamp(4rem,9vw,7.25rem)] uppercase leading-[0.88] tracking-[0.05em] text-brand-black"
            />
          </div>
          <p className="max-w-xl text-base leading-8 text-black/62">
            Three standout pairs from the current drop, styled with cleaner
            framing so the silhouette, color, and finish stay visible before
            anything else.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredDrops.map((drop) => (
            <Link
              key={drop.id}
              href={drop.href}
              data-drop-card
              data-cursor="card"
              data-cursor-label="View"
              className="group relative overflow-hidden rounded-[2.2rem] border border-black/8 bg-[#fffaf1] p-5 shadow-[0_28px_70px_rgba(10,10,10,0.08)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-x-5 top-5 h-44 rounded-[1.8rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(245,241,232,1))]" />
              <div
                className={`absolute inset-x-5 top-5 h-44 rounded-[1.8rem] bg-gradient-to-br ${drop.accentClass} opacity-35 transition duration-500 group-hover:opacity-55`}
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <Tag>Edition {drop.id}</Tag>
                <Badge variant="dark">{drop.price}</Badge>
              </div>

              <div className="relative z-10 mt-4 h-48 overflow-hidden rounded-[1.8rem] border border-black/6 bg-[#f6f2e8]">
                <Image
                  src={drop.image}
                  alt={drop.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className={`object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.06] ${drop.imageClass}`}
                />
              </div>

              <div className="relative z-10 mt-6">
                <h3 className="font-display text-[2.8rem] uppercase leading-[0.92] text-brand-black">
                  {drop.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/62">
                  {drop.summary}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.28em] text-black/40">
                    View details
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-brand-black transition-transform duration-300 group-hover:translate-x-1">
                    View
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
