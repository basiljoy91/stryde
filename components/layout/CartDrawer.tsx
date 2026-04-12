"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";

export function CartDrawer() {
  const closeCart = useCart((state) => state.closeCart);
  const isOpen = useCart((state) => state.isOpen);
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCart, isOpen]);

  const subtotalLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(subtotal);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            key="cart-backdrop"
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="fixed inset-0 z-[75] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[28rem] flex-col border-l border-white/10 bg-brand-black shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_28px_90px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent/20 bg-brand-accent/10 text-brand-accent">
                  <ShoppingBag className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <p className="font-display text-3xl uppercase leading-none text-brand-white">
                    Cart
                  </p>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/42">
                    {items.length} items
                  </p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                data-cursor="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-brand-accent/35"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="relative mb-8 h-40 w-40 rounded-full border border-white/10 bg-white/[0.03]">
                    <div className="absolute inset-6 rounded-full border border-brand-accent/20 bg-brand-accent/8" />
                    <div className="absolute inset-0 flex items-center justify-center text-brand-accent">
                      <ShoppingBag className="h-12 w-12" />
                    </div>
                  </div>
                  <p className="font-display text-4xl uppercase leading-none text-brand-white">
                    Your Cart Is Empty
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/62">
                    Add a pair from the collection and the drawer will update
                    here with animated totals and quantity controls.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.colorway}`}
                      className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.2rem] bg-black/30">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-3"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-display text-3xl uppercase leading-none text-brand-white">
                                {item.name}
                              </p>
                              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/40">
                                {item.colorway}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id, item.colorway)}
                              data-cursor="button"
                              className="text-xs uppercase tracking-[0.22em] text-white/38 transition hover:text-brand-white"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 rounded-pill border border-white/10 bg-black/20 p-1">
                              <button
                                type="button"
                                aria-label={`Decrease quantity for ${item.name}`}
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.colorway,
                                    item.quantity - 1,
                                  )
                                }
                                data-cursor="button"
                                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/[0.06]"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="min-w-8 text-center text-sm font-semibold text-brand-white">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase quantity for ${item.name}`}
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.colorway,
                                    item.quantity + 1,
                                  )
                                }
                                data-cursor="button"
                                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/[0.06]"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <motion.span
                              key={`${item.id}-${item.colorway}-${item.quantity}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="font-display text-3xl uppercase leading-none text-brand-white"
                            >
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              }).format(item.price * item.quantity)}
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-5 sm:px-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.28em] text-white/42">
                  Subtotal
                </span>
                <motion.span
                  key={subtotalLabel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-4xl uppercase leading-none text-brand-white"
                >
                  {subtotalLabel}
                </motion.span>
              </div>
              <Button
                fullWidth
                disabled={items.length === 0}
                className="h-14"
              >
                Proceed to Checkout
              </Button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
