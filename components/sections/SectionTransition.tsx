"use client";

import { useRef } from "react";

import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";

export function SectionTransition({
  accent = "lime",
  label,
}: {
  accent?: "ember" | "lime";
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) {
        return;
      }

      gsap.fromTo(
        ref.current,
        {
          clipPath: "inset(48% 0 48% 0 round 999px)",
          opacity: 0.35,
          scaleX: 0.82,
        },
        {
          clipPath: "inset(0% 0 0% 0 round 999px)",
          opacity: 1,
          scaleX: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 86%",
            end: "bottom 56%",
            scrub: 1,
          },
        },
      );
    },
    { scope: ref },
  );

  const accentClass =
    accent === "ember"
      ? "from-brand-ember/50 via-white/14 to-transparent"
      : "from-brand-accent/50 via-white/14 to-transparent";

  return (
    <div className="relative bg-brand-black py-5">
      <div className="container-shell">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-pill border border-white/10 bg-gradient-to-r ${accentClass} px-6 py-4`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_60%)]" />
          <p className="relative text-center text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-brand-white/72">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
