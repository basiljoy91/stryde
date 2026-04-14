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

      const line = ref.current.querySelector("[data-transition-line]");
      const text = ref.current.querySelector("[data-transition-label]");

      gsap.fromTo(
        [line, text],
        {
          autoAlpha: 0,
          y: 14,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  const accentClass =
    accent === "ember"
      ? "from-transparent via-brand-ember/50 to-transparent"
      : "from-transparent via-brand-accent/50 to-transparent";

  return (
    <div className="relative bg-brand-black py-10 sm:py-12">
      <div ref={ref} className="container-shell">
        <div className="mx-auto max-w-3xl">
          <div
            data-transition-line
            className={`h-px w-full bg-gradient-to-r ${accentClass}`}
          />
          <p
            data-transition-label
            className="pt-4 text-center text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/48"
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
