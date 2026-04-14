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

      const articles = gsap.utils.toArray<HTMLElement>(
        "[data-category-article]",
        sectionRef.current,
      );
      const mediaPanels = gsap.utils.toArray<HTMLElement>(
        "[data-category-media]",
        sectionRef.current,
      );

      gsap.from(articles, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      mediaPanels.forEach((panel, index) => {
        gsap.fromTo(
          panel,
          {
            clipPath:
              index % 2 === 0
                ? "inset(0 100% 0 0 round 2rem)"
                : "inset(0 0 0 100% round 2rem)",
          },
          {
            clipPath: "inset(0 0 0 0 round 2rem)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              once: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-brand-black py-24 sm:py-28">
      <div className="container-shell space-y-8">
        {categoryBlocks.map((block, index) => {
          const isEven = index % 2 === 1;

          return (
            <article
              key={block.title}
              data-category-article
              className={`overflow-hidden rounded-[2.6rem] border border-white/10 ${block.contentClass}`}
            >
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div
                  data-category-media
                  className={`${isEven ? "lg:order-2" : ""} relative min-h-[22rem] overflow-hidden lg:min-h-[30rem] ${block.panelClass}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_34%)]" />
                  <div className="grain-overlay absolute inset-0 opacity-[0.14]" />
                  <div className="absolute inset-5 rounded-[2rem] border border-white/12 bg-black/8 sm:inset-7" />
                  <div
                    className={`absolute inset-5 overflow-hidden rounded-[2rem] sm:inset-7 ${block.frameClass}`}
                  >
                    <ScrollParallax offset={8} className="absolute inset-0">
                      <Image
                        src={block.image}
                        alt={block.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={`${block.imageFitClass} ${block.imageClass}`}
                      />
                    </ScrollParallax>
                  </div>
                </div>

                <div className={`${isEven ? "lg:order-1" : ""} flex items-center`}>
                  <div className="p-8 sm:p-10 lg:p-12">
                    <Tag>{block.eyebrow}</Tag>
                    <h3 className="mt-5 max-w-[8ch] font-display text-[clamp(3.2rem,8vw,5.4rem)] uppercase leading-[0.9] text-brand-white">
                      {block.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
                      {block.description}
                    </p>
                    <div className="mt-8">
                      <MagneticButton
                        href={block.href}
                        variant="secondary"
                        size="sm"
                      >
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
