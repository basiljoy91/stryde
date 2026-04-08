"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowRight } from "lucide-react";

import { useGSAP } from "@/hooks/useGSAP";
import { SplitText, gsap } from "@/lib/gsap";
import {
  heroIntroLabels,
  heroProduct,
  zoomFeatureTags,
} from "@/lib/constants";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const headlineWrapRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const shoeRef = useRef<HTMLDivElement | null>(null);
  const darkLayerRef = useRef<HTMLDivElement | null>(null);
  const lightLayerRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);
  const featureTagsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinRef.current ||
        !headlineRef.current ||
        !headlineWrapRef.current ||
        !subtitleRef.current ||
        !ctaRef.current ||
        !shoeRef.current ||
        !darkLayerRef.current ||
        !lightLayerRef.current ||
        !labelsRef.current ||
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
        scale: 0.72,
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(lightLayerRef.current, { autoAlpha: 0 });
      gsap.set(featureTags, { autoAlpha: 0 });
      gsap.set(featureTags[0], { xPercent: -20, y: 24 });
      gsap.set(featureTags[1], { y: 34 });
      gsap.set(featureTags[2], { xPercent: 20, y: 24 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

      intro
        .from(split.chars, {
          yPercent: 115,
          opacity: 0,
          stagger: 0.03,
          duration: 1,
          delay: 0.15,
        })
        .from(
          subtitleRef.current,
          {
            autoAlpha: 0,
            duration: 0.75,
            y: 24,
          },
          0.45,
        )
        .from(
          ctaRef.current,
          {
            autoAlpha: 0,
            duration: 0.75,
            y: 22,
          },
          0.58,
        )
        .from(
          heroLabels,
          {
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.08,
            y: 18,
          },
          0.72,
        );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.1,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      scrollTimeline
        .to(
          shoeRef.current,
          {
            scale: 1.8,
            yPercent: -46,
            ease: "none",
          },
          0,
        )
        .to(
          headlineWrapRef.current,
          {
            autoAlpha: 0,
            duration: 0.28,
            y: -42,
          },
          0.08,
        )
        .to(
          subtitleRef.current,
          {
            autoAlpha: 0,
            duration: 0.24,
            y: -28,
          },
          0.1,
        )
        .to(
          ctaRef.current,
          {
            autoAlpha: 0,
            duration: 0.24,
            y: -24,
          },
          0.12,
        )
        .to(
          heroLabels,
          {
            autoAlpha: 0,
            duration: 0.24,
            stagger: 0.03,
            y: 24,
          },
          0.14,
        )
        .to(
          darkLayerRef.current,
          {
            autoAlpha: 0.16,
            ease: "none",
          },
          0.2,
        )
        .to(
          lightLayerRef.current,
          {
            autoAlpha: 1,
            ease: "none",
          },
          0.2,
        )
        .to(
          featureTags[0],
          {
            autoAlpha: 1,
            duration: 0.35,
            xPercent: 0,
            y: 0,
          },
          0.45,
        )
        .to(
          featureTags[1],
          {
            autoAlpha: 1,
            duration: 0.35,
            y: 0,
          },
          0.52,
        )
        .to(
          featureTags[2],
          {
            autoAlpha: 1,
            duration: 0.35,
            xPercent: 0,
            y: 0,
          },
          0.59,
        );

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="home" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative h-screen overflow-hidden bg-brand-black">
        <div ref={darkLayerRef} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,83,54,0.16),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(232,255,71,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_38%),#0A0A0A]" />
          <div className="grain-overlay absolute inset-0 opacity-[0.35]" />
          <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full border border-brand-copper/25" />
          <div className="absolute right-[-6rem] top-10 h-[26rem] w-[42rem] rounded-full border border-brand-copper/20" />
          <div className="absolute bottom-[-8rem] left-[8%] h-[24rem] w-[24rem] rounded-full border border-brand-copper/15" />
        </div>

        <div ref={lightLayerRef} className="absolute inset-0">
          <div className="absolute inset-0 bg-brand-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,83,54,0.15),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(232,255,71,0.18),transparent_22%),linear-gradient(180deg,rgba(10,10,10,0.02),transparent_42%)]" />
          <div className="grain-overlay absolute inset-0 opacity-[0.25]" />
        </div>

        <div className="container-shell relative z-10 flex h-full flex-col justify-between pb-14 pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Badge variant="accent">SS26 / Hero Zoom</Badge>
            <span className="eyebrow text-white/45">
              Signature scroll sequence
            </span>
          </div>

          <div className="relative z-20 max-w-5xl">
            <div ref={headlineWrapRef}>
              <h1
                ref={headlineRef}
                className="font-display text-[clamp(6rem,19vw,15rem)] uppercase leading-[0.82] tracking-[0.08em] text-brand-white"
              >
                {heroProduct.headlinePrimary}
              </h1>
            </div>
            <p
              ref={subtitleRef}
              className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg"
            >
              {heroProduct.headlineSecondary}
            </p>
            <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href="#featured">
                Explore the Drop
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <span className="text-xs uppercase tracking-[0.28em] text-white/42">
                Scroll to trigger the pin zoom.
              </span>
            </div>
          </div>

          <div
            ref={labelsRef}
            className="relative z-20 grid gap-4 sm:grid-cols-3"
          >
            {heroIntroLabels.map((label) => (
              <div
                key={label}
                data-hero-label
                className="glass-panel rounded-[1.6rem] border-white/12 bg-white/[0.03] px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={shoeRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[50vh] w-[82vw] max-w-[980px]"
        >
          <Image
            src={heroProduct.image}
            alt={heroProduct.name}
            fill
            priority
            className="object-contain drop-shadow-[0_48px_110px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div
          id="zoom"
          ref={featureTagsRef}
          className="pointer-events-none absolute inset-x-0 bottom-14 z-30"
        >
          <div className="container-shell grid gap-4 lg:grid-cols-3">
            {zoomFeatureTags.map((tag, index) => (
              <div
                key={tag.title}
                data-feature-tag
                className={`rounded-[1.8rem] border border-black/10 bg-black/5 p-5 text-brand-black shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-sm ${
                  index === 1 ? "lg:mt-10" : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45">
                  {tag.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-4xl uppercase leading-none">
                  {tag.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/65">
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
