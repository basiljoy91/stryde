"use client";

import Image from "next/image";
import { useRef } from "react";

import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollParallax } from "@/components/animations/ScrollParallax";
import { Tag } from "@/components/ui/Tag";
import { useGSAP } from "@/hooks/useGSAP";
import { categoryBlocks } from "@/lib/constants";
import { gsap } from "@/lib/gsap";

export function CategoryBlocks() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const mediaPanels = gsap.utils.toArray<HTMLElement>(
        "[data-category-media]",
        sectionRef.current,
      );

      mediaPanels.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          {
            clipPath:
              index % 2 === 0
                ? "inset(0 100% 0 0 round 2rem)"
                : "inset(0 0 0 100% round 2rem)",
            y: 28,
          },
          {
            clipPath: "inset(0 0 0 0 round 2rem)",
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
              once: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-brand-black py-24 sm:py-28 lg:py-30">
      <div className="container-shell space-y-6">
        {categoryBlocks.map((block, index) => {
          const isEven = index % 2 === 1;

          return (
            <article
              key={block.title}
              className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-brand-mid"
            >
              <div className="grid lg:grid-cols-2">
                <div
                  data-category-media
                  className={`${isEven ? "lg:order-2" : ""} relative min-h-[22rem] overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_40%),#121315]`}
                >
                  <div className="grain-overlay absolute inset-0 opacity-[0.18]" />
                  <ScrollParallax offset={10} className="absolute inset-0">
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      className={`object-contain p-8 sm:p-10 ${block.imageClass}`}
                    />
                  </ScrollParallax>
                </div>

                <div className={`${isEven ? "lg:order-1" : ""} flex items-center`}>
                  <div className="p-8 sm:p-10 lg:p-12">
                    <Tag>{block.eyebrow}</Tag>
                    <h3 className="mt-5 font-display text-[clamp(3.5rem,8vw,5.5rem)] uppercase leading-[0.9] text-brand-white">
                      {block.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
                      {block.description}
                    </p>
                    <div className="mt-8">
                      <MagneticButton href={block.href} variant="secondary" size="sm">
                        {block.cta}
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
