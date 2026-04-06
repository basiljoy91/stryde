"use client";

import type { PropsWithChildren } from "react";

import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        anchors: { offset: -96 },
        autoRaf: true,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 0.92,
      }}
      className="min-h-screen"
    >
      {children}
    </ReactLenis>
  );
}
