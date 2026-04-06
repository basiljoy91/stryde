import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "dark" | "outline";

const badgeVariants: Record<BadgeVariant, string> = {
  accent: "bg-brand-accent text-brand-black",
  dark: "bg-white/[0.08] text-brand-white",
  outline: "border border-white/12 bg-transparent text-white/70",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  children,
  className,
  variant = "outline",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em]",
        badgeVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
