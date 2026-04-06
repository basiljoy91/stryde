"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = useCart((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 28);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6"
    >
      <div
        className={cn(
          "container-shell flex items-center justify-between rounded-[1.75rem] border border-transparent py-3 transition-all duration-300",
          isScrolled
            ? "border-white/10 bg-brand-black/75 shadow-panel backdrop-blur-2xl"
            : "bg-transparent",
        )}
      >
        <Link
          href="/"
          data-cursor="button"
          className="flex items-center gap-3 rounded-pill px-2 py-1"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent/12 font-display text-2xl uppercase tracking-wide text-brand-accent">
            S
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-3xl uppercase tracking-display text-brand-white">
              Stryde
            </span>
            <span className="block text-[0.6rem] uppercase tracking-[0.32em] text-white/40">
              Performance Lab
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === "/" && link.href === "/";

            return (
              <Link
                key={link.label}
                href={link.href}
                data-cursor="button"
                className={cn(
                  "relative rounded-pill px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-white/80 transition-colors hover:text-brand-white",
                  isActive && "text-brand-white",
                )}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-ember" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-cursor="button"
            aria-label="Search catalogue"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition hover:border-brand-accent/35 hover:text-brand-white"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            data-cursor="button"
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition hover:border-brand-accent/35 hover:text-brand-white"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-[0.58rem] font-bold text-brand-black">
              {itemCount}
            </span>
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent/20 bg-brand-accent/10 text-brand-accent">
            <Sparkles className="h-[18px] w-[18px]" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
