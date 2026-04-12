"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

try {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
} catch (error) {
  console.error("Failed to register GSAP plugins", error);
}

export { gsap, ScrollTrigger, SplitText };
