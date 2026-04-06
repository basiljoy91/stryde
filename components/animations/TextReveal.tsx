"use client";

import { useRef } from "react";

import { useGSAP } from "@/hooks/useGSAP";
import { SplitText, gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
  start?: string;
  text: string;
};

export function TextReveal({
  as: Tag = "div",
  className,
  start = "top 85%",
  text,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = Tag as "div" | "span" | "p" | "h1" | "h2" | "h3";

  useGSAP(
    () => {
      if (!ref.current) {
        return;
      }

      gsap.set(ref.current, { autoAlpha: 1 });

      const split = SplitText.create(ref.current, {
        type: "lines,chars",
        mask: "lines",
        charsClass: "text-reveal-char",
        linesClass: "text-reveal-line",
      });

      gsap.from(split.chars, {
        yPercent: 112,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });

      return () => split.revert();
    },
    { dependencies: [start, text], revertOnUpdate: true, scope: ref },
  );

  return (
    <Component ref={ref as never} className={cn("opacity-0", className)}>
      {text}
    </Component>
  );
}
