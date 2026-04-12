"use client";

import { useGSAP as baseUseGSAP } from "@gsap/react";

import "@/lib/gsap";

export function useGSAP(
  callback?: Parameters<typeof baseUseGSAP>[0],
  config?: Parameters<typeof baseUseGSAP>[1],
) {
  return baseUseGSAP(
    (...args) => {
      if (typeof callback !== "function") {
        return undefined;
      }

      try {
        return callback(...args);
      } catch (error) {
        console.error("GSAP animation init failed", error);
        return undefined;
      }
    },
    config,
  );
}
