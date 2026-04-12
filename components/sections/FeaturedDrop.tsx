"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import { featuredDrops } from "@/lib/constants";
import { TextReveal } from "@/components/animations/TextReveal";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";

export function FeaturedDrop() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(
        ".drop-card",
        sectionRef.current,
      );

      gsap.from(cards, {
        autoAlpha: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.14,
        y: 72,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
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
      className="relative overflow-hidden bg-brand-white py-24 text-brand-black sm:py-28 lg:py-30"
    >
      <div className="grain-overlay absolute inset-0 opacity-[0.2]" />
      <div className="container-shell relative z-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-black/45">
              Featured Drops
            </p>
            <TextReveal
              as="h2"
              text="Built To Be Seen."
              className="mt-3 font-display text-[clamp(4.25rem,10vw,8rem)] uppercase leading-[0.88] tracking-[0.06em] text-brand-black"
            />
          </div>
          <p className="max-w-2xl text-base leading-8 text-black/60">
            Three standout pairs from the current drop, each built with a
            distinct mood, finish, and silhouette made to carry the whole look.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredDrops.map((drop) => (
            <FeaturedDropCard key={drop.id} drop={drop} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedDropCard({
  drop,
}: {
  drop: (typeof featuredDrops)[number];
}) {
  const rotateXBase = useMotionValue(0);
  const rotateYBase = useMotionValue(0);
  const rotateX = useSpring(rotateXBase, {
    stiffness: 180,
    damping: 18,
    mass: 0.45,
  });
  const rotateY = useSpring(rotateYBase, {
    stiffness: 180,
    damping: 18,
    mass: 0.45,
  });

  const handlePointerMove = (event: {
    clientX: number;
    clientY: number;
    currentTarget: HTMLElement;
  }) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const percentX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const percentY = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateXBase.set(percentY * -7);
    rotateYBase.set(percentX * 9);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        rotateXBase.set(0);
        rotateYBase.set(0);
      }}
    >
      <Link
              key={drop.id}
              href={drop.href}
              className="drop-card group relative min-h-[33rem] overflow-hidden rounded-[2.3rem] bg-[#101113] p-6 text-brand-white"
              data-cursor="card"
              data-cursor-label="View"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${drop.accentClass} opacity-70 transition duration-500 group-hover:opacity-100`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/82 to-transparent" />

              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_36%)] opacity-70 transition duration-500 group-hover:opacity-100" />
                <Image
                  src={drop.image}
                  alt={drop.name}
                  fill
                  className={`object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.08] ${drop.imageClass}`}
                />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <Tag>Edition {drop.id}</Tag>
                  <Badge variant="dark">{drop.price}</Badge>
                </div>

                <div className="mt-auto">
                  <h3 className="font-display text-4xl uppercase leading-none">
                    {drop.name}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                    {drop.summary}
                  </p>
                  <div className="mt-7 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.28em] text-white/40">
                      View details
                    </span>
                    <span className="inline-flex translate-y-5 items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      View
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
      </Link>
    </motion.div>
  );
}
