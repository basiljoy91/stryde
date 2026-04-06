"use client";

import type { PropsWithChildren } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type FadeUpProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
}>;

export function FadeUp({
  children,
  className,
  delay = 0,
  distance = 28,
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, once }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
