"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowRight } from "lucide-react";

import { MagneticButton } from "@/components/animations/MagneticButton";
import { Badge } from "@/components/ui/Badge";
import { useGSAP } from "@/hooks/useGSAP";
import { SplitText, gsap } from "@/lib/gsap";
import { heroIntroLabels, heroProduct, zoomFeatureTags } from "@/lib/constants";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);
  const shoeRef = useRef<HTMLDivElement | null>(null);
  const featureTagsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinRef.current ||
        !headlineRef.current ||
        !subtitleRef.current ||
        !ctaRef.current ||
        !labelsRef.current ||
        !shoeRef.current ||
        !featureTagsRef.current
      ) {
        return;
      }

      const split = SplitText.create(headlineRef.current, {
        type: "chars",
        charsClass: "text-reveal-char",
      });

      const heroLabels = gsap.utils.toArray<HTMLElement>(
        "[data-hero-label]",
        labelsRef.current,
      );
      const featureTags = gsap.utils.toArray<HTMLElement>(
        "[data-feature-tag]",
        featureTagsRef.current,
      );

      gsap.set(shoeRef.current, {
        scale: 0.9,
        xPercent: -50,
        yPercent: -50,
        rotate: -7,
      });
      gsap.set(featureTags, {
        autoAlpha: 0,
        y: 28,
      });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

      intro
        .from(split.chars, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.03,
          duration: 0.95,
          delay: 0.12,
        })
        .from(
          subtitleRef.current,
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.65,
          },
          0.42,
        )
        .from(
          ctaRef.current,
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.65,
          },
          0.54,
        )
        .from(
          heroLabels,
          {
            autoAlpha: 0,
            y: 14,
            stagger: 0.06,
            duration: 0.55,
          },
          0.66,
        );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=95%",
          scrub: 0.8,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      scrollTimeline
        .to(
          shoeRef.current,
          {
            scale: 1.35,
            rotate: -2,
            xPercent: -36,
            yPercent: -45,
            ease: "none",
          },
          0,
        )
        .to(
          headlineRef.current,
          {
            autoAlpha: 0.08,
            y: -20,
            ease: "none",
          },
          0,
        )
        .to(
          subtitleRef.current,
          {
            autoAlpha: 0,
            y: -16,
            ease: "none",
          },
          0.08,
        )
        .to(
          ctaRef.current,
          {
            autoAlpha: 0,
            y: -12,
            ease: "none",
          },
          0.12,
        )
        .to(
          heroLabels,
          {
            autoAlpha: 0,
            y: 12,
            stagger: 0.03,
            ease: "none",
          },
          0.12,
        )
        .to(
          featureTags,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.48,
        );

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="home" ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-[100svh] overflow-hidden bg-brand-black"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(232,255,71,0.12),transparent_26%),radial-gradient(circle_at_84%_14%,rgba(255,83,54,0.14),transparent_24%),radial-gradient(circle_at_50%_72%,rgba(255,255,255,0.05),transparent_28%),#0A0A0A]" />
        <div className="grain-overlay absolute inset-0 opacity-[0.22]" />
        <div className="absolute -left-20 top-16 h-[22rem] w-[22rem] rounded-full border border-brand-accent/12" />
        <div className="absolute right-[-8rem] top-10 h-[24rem] w-[36rem] rounded-full border border-brand-ember/12" />

        <div className="container-shell relative z-10 flex h-full flex-col justify-between pb-10 pt-28 sm:pb-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Badge variant="accent">{heroProduct.code}</Badge>
            <span className="eyebrow text-white/42">{heroProduct.eyebrow}</span>
          </div>

          <div className="relative z-20 max-w-3xl">
            <h1
              ref={headlineRef}
              className="max-w-[8ch] font-display text-[clamp(5.2rem,17vw,14rem)] uppercase leading-[0.82] tracking-[0.07em] text-brand-white"
            >
              {heroProduct.headlinePrimary}
            </h1>
            <p
              ref={subtitleRef}
              className="mt-5 max-w-xl text-base leading-8 text-white/70 sm:text-lg"
            >
              {heroProduct.headlineSecondary}
            </p>
            <div
              ref={ctaRef}
              className="mt-8 flex flex-wrap items-center gap-4 text-white/42"
            >
              <MagneticButton href="#featured">
                Explore the Drop
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <span className="text-xs uppercase tracking-[0.28em]">
                Scroll for the first reveal
              </span>
            </div>
          </div>

          <div
            ref={labelsRef}
            className="relative z-20 grid gap-3 sm:max-w-3xl sm:grid-cols-3"
          >
            {heroIntroLabels.map((label) => (
              <div
                key={label}
                data-hero-label
                className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/56">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={shoeRef}
          className="pointer-events-none absolute left-[67%] top-[52%] z-20 h-[30vh] w-[68vw] max-w-[860px] sm:h-[34vh] lg:h-[42vh]"
        >
          <Image
            src={heroProduct.image}
            alt={heroProduct.name}
            fill
            priority
            sizes="(min-width: 1280px) 860px, 68vw"
            className="object-contain drop-shadow-[0_36px_120px_rgba(0,0,0,0.45)]"
          />
        </div>

        <div
          id="zoom"
          ref={featureTagsRef}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-30 sm:bottom-12"
        >
          <div className="container-shell grid gap-3 lg:grid-cols-3">
            {zoomFeatureTags.map((tag) => (
              <div
                key={tag.title}
                data-feature-tag
                className="rounded-[1.6rem] border border-white/10 bg-black/40 p-5 text-brand-white backdrop-blur-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/46">
                  {tag.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-[2rem] uppercase leading-none">
                  {tag.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {tag.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
