"use client";

import type { PropsWithChildren } from "react";
import { useRef } from "react";

import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScrollParallaxProps = PropsWithChildren<{
  className?: string;
  offset?: number;
  scrub?: number;
}>;

export function ScrollParallax({
  children,
  className,
  offset = 12,
  scrub = 1.15,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) {
        return;
      }

      gsap.fromTo(
        ref.current,
        { yPercent: -offset },
        {
          yPercent: offset,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("parallax-layer", className)}>
      {children}
    </div>
  );
}
