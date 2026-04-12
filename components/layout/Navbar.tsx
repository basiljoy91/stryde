"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type PanInfo } from "framer-motion";
import { Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const pathname = usePathname();
  const openCart = useCart((state) => state.openCart);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCart((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 28);
  });

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const isNavLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && href === "/#home";
    }

    if (href === "/collection") {
      return pathname.startsWith("/collection");
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6"
      >
        <div
          className={cn(
            "container-shell flex items-center justify-between rounded-[1.75rem] border border-transparent py-3 transition-all duration-300",
            isScrolled || isMenuOpen
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
              const isActive = isNavLinkActive(link.href);

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
            <Link
              href="/collection"
              data-cursor="button"
              aria-label="Search catalogue"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition hover:border-brand-accent/35 hover:text-brand-white sm:flex"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              data-cursor="button"
              aria-label="Open cart"
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition hover:border-brand-accent/35 hover:text-brand-white"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <motion.span
                key={itemCount}
                initial={{ scale: 0.7, y: -4 }}
                animate={{ scale: [0.7, 1.22, 1], y: [-4, -8, 0] }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-[0.58rem] font-bold text-brand-black"
              >
                {itemCount}
              </motion.span>
            </button>
            <Link
              href="/lookbook"
              data-cursor="button"
              aria-label="Open lookbook"
              title="Open lookbook"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-brand-accent/20 bg-brand-accent/10 text-brand-accent transition hover:border-brand-accent/45 hover:bg-brand-accent/16 sm:flex"
            >
              <Sparkles className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              data-cursor="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-brand-accent/35 lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-[18px] w-[18px]" />
              ) : (
                <Menu className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-brand-black/96 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              drag="x"
              dragDirectionLock
              dragElastic={0.08}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                if (info.offset.x > 80 || info.velocity.x > 600) {
                  setIsMenuOpen(false);
                }
              }}
              className="container-shell flex min-h-screen flex-col px-6 pb-10 pt-28"
            >
              <nav className="flex flex-1 flex-col justify-center gap-4">
                {navLinks.map((link, index) => {
                  const isActive = isNavLinkActive(link.href);

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 18 }}
                      transition={{ delay: 0.04 * index, duration: 0.32 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        data-cursor="button"
                        className={cn(
                          "block rounded-[1.6rem] border px-5 py-5 font-display text-5xl uppercase leading-none transition",
                          isActive
                            ? "border-brand-accent/32 bg-brand-accent/10 text-brand-accent"
                            : "border-white/10 bg-white/[0.03] text-brand-white",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-white/38">
                  Touch-friendly navigation
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openCart();
                  }}
                  data-cursor="button"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white"
                >
                  Cart
                  <span className="rounded-full bg-brand-accent px-2 py-1 text-brand-black">
                    {itemCount}
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
