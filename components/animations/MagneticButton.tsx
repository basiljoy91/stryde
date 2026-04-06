"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type MagneticButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className"
> & {
  children: ReactNode;
  className?: string;
  href?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function MagneticButton({
  children,
  className,
  href,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.35 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);

    x.set(distanceX * 0.16);
    y.set(distanceY * 0.16);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = buttonStyles({ className, size, variant });

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      {href ? (
        <Link
          href={href}
          data-cursor="button"
          className={cn(classes)}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          data-cursor="button"
          className={classes}
          {...props}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
