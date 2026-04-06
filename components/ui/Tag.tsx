import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TagProps = HTMLAttributes<HTMLSpanElement>;

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-brand-muted",
        className,
      )}
      {...props}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-brand-accent" />
      {children}
    </span>
  );
}
