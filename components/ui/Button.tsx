import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-accent text-brand-black shadow-glow hover:-translate-y-0.5 hover:bg-brand-white",
  secondary:
    "border border-white/14 bg-white/[0.04] text-brand-white hover:-translate-y-0.5 hover:border-brand-accent/45 hover:bg-white/[0.08]",
  ghost: "bg-transparent text-brand-white hover:bg-white/[0.06]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-xs uppercase tracking-[0.22em]",
  md: "h-12 px-6 text-sm uppercase tracking-[0.24em]",
  lg: "h-14 px-7 text-sm uppercase tracking-[0.28em]",
};

type ButtonStyleOptions = {
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function buttonStyles({
  className,
  fullWidth,
  size = "md",
  variant = "primary",
}: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  fullWidth,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-cursor="button"
      className={buttonStyles({ className, fullWidth, size, variant })}
      {...props}
    >
      {children}
    </button>
  );
}
