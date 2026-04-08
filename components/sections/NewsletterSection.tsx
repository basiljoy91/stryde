"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NewsletterState = "idle" | "loading" | "success";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<NewsletterState>("idle");
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || state === "loading") {
      return;
    }

    timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    setState("loading");

    const successTimer = window.setTimeout(() => {
      setState("success");
    }, 1200);

    const resetTimer = window.setTimeout(() => {
      setState("idle");
      setEmail("");
    }, 3200);

    timeoutsRef.current = [successTimer, resetTimer];
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-brand-black py-24 sm:py-28 lg:py-30"
    >
      <div className="grain-overlay absolute inset-0 opacity-[0.25]" />
      <div className="absolute left-[10%] top-10 h-[24rem] w-[24rem] rounded-full bg-brand-accent/6 blur-[130px]" />
      <div className="absolute right-[8%] top-20 h-[22rem] w-[22rem] rounded-full bg-brand-ember/10 blur-[120px]" />

      <div className="container-shell relative z-10">
        <div className="rounded-[2.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel backdrop-blur-2xl sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow">Newsletter / Access</p>
              <h2 className="mt-4 font-display text-[clamp(4rem,9vw,7rem)] uppercase leading-[0.9] text-brand-white">
                Early Looks.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
                Join the list for launch dates, prototype notes, and the first
                access window when the next concept drop goes live.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <motion.div
                animate={
                  state === "loading"
                    ? { x: ["-100%", "100%"] }
                    : { x: "-100%" }
                }
                transition={
                  state === "loading"
                    ? {
                        duration: 1.1,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                      }
                    : { duration: 0.2 }
                }
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent"
              />

              <div
                className={cn(
                  "rounded-[2rem] border p-3 transition-all duration-300 focus-within:border-brand-accent/40",
                  state === "success"
                    ? "border-brand-accent/40 shadow-glow-soft"
                    : "border-white/10",
                )}
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-14 w-full rounded-[1.4rem] border border-transparent bg-black/35 px-5 text-sm text-brand-white outline-none placeholder:text-brand-muted"
                  />
                  <Button
                    type="submit"
                    disabled={state === "loading" || email.length === 0}
                    className="h-14 min-w-[12rem]"
                  >
                    {state === "loading" ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : state === "success" ? (
                      <>
                        <Check className="h-4 w-4" />
                        You&apos;re In
                      </>
                    ) : (
                      "Join the List"
                    )}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {state === "success" ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 text-sm leading-7 text-brand-accent"
                  >
                    Success. We&apos;ll send the next launch note to {email}.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
