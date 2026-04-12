"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { ChevronRight, Gem, Orbit, Sparkles, Zap } from "lucide-react";

import { FadeUp } from "@/components/animations/FadeUp";
import { ScrollParallax } from "@/components/animations/ScrollParallax";
import { TextReveal } from "@/components/animations/TextReveal";
import { aboutTeam, aboutTimeline, aboutValues } from "@/lib/constants";

const valueIcons = {
  gem: Gem,
  orbit: Orbit,
  sparkles: Sparkles,
  zap: Zap,
} as const;

export function AboutShowcase() {
  return (
    <div className="relative bg-brand-black pb-24 pt-28 sm:pb-28 lg:pb-30">
      <section className="relative min-h-[88vh] overflow-hidden rounded-b-[3rem] border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(232,255,71,0.08),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,83,54,0.12),transparent_24%),#0A0A0A]" />
        <div className="grain-overlay absolute inset-0 opacity-[0.28]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />

        <div className="container-shell relative z-10 flex min-h-[88vh] flex-col justify-between pb-12">
          <nav className="pt-2 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/38">
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/74">About</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="pb-8">
              <p className="eyebrow">About / Brand Story</p>
              <ScrollParallax offset={10}>
                <h1 className="mt-5 font-display text-[clamp(5rem,15vw,11rem)] uppercase leading-[0.82] tracking-[0.08em] text-brand-white">
                  STRYDE
                </h1>
              </ScrollParallax>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 max-w-2xl text-lg leading-9 text-white/68"
              >
                Built at the intersection of performance product, editorial
                pacing, and interaction design. Stryde treats every release like
                a world, not a shelf.
              </motion.p>
            </div>

            <div className="relative min-h-[22rem] overflow-hidden rounded-[2.6rem] border border-white/10 bg-brand-mid/60">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/18 via-transparent to-brand-ember/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%)]" />
              <ScrollParallax offset={8} className="absolute inset-0">
                <Image
                  src="/images/products/hero-main.png"
                  alt="Stryde hero object"
                  fill
                  className="object-contain p-8 drop-shadow-[0_28px_90px_rgba(0,0,0,0.3)]"
                />
              </ScrollParallax>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-24 sm:py-28">
        <div className="mb-12">
          <p className="eyebrow">Timeline</p>
          <TextReveal
            as="h2"
            text="From Prototype To System."
            className="mt-4 font-display text-[clamp(3.5rem,8vw,6.5rem)] uppercase leading-[0.88] tracking-[0.06em] text-brand-white"
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 lg:block" />
          <div className="space-y-8">
            {aboutTimeline.map((item, index) => (
              <FadeUp key={item.year}>
                <div
                  className={`grid gap-4 lg:grid-cols-2 lg:gap-12 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative lg:pl-12">
                    <div className="hidden lg:absolute lg:left-0 lg:top-6 lg:block lg:h-3 lg:w-3 lg:rounded-full lg:bg-brand-accent" />
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                      <p className="font-display text-5xl uppercase leading-none text-brand-accent">
                        {item.year}
                      </p>
                      <h3 className="mt-4 font-display text-4xl uppercase leading-none text-brand-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-white/66">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 text-sm leading-8 text-white/52 sm:p-8">
                      {item.detail}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-24 sm:pb-28">
        <div className="mb-10">
          <p className="eyebrow">Team</p>
          <TextReveal
            as="h2"
            text="The People Behind The Pace."
            className="mt-4 font-display text-[clamp(3.25rem,8vw,6rem)] uppercase leading-[0.88] tracking-[0.06em] text-brand-white"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aboutTeam.map((member, index) => (
            <FadeUp key={member.name} delay={index * 0.05}>
              <article
                className="group relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-white/10 bg-brand-mid p-6"
                data-cursor="card"
                data-cursor-label="Meet"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/18 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-6 bottom-6 translate-y-8 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm leading-7 text-white/68">{member.bio}</p>
                </div>
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <IdentityAvatar
                    name={member.name}
                    accent={index % 2 === 0 ? "lime" : "ember"}
                  />
                  <div>
                    <h3 className="font-display text-4xl uppercase leading-none text-brand-white">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-xs uppercase tracking-[0.28em] text-white/45">
                      {member.role}
                    </p>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="container-shell">
        <div className="rounded-[2.6rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:p-12">
          <div className="mb-10">
            <p className="eyebrow">Values</p>
            <TextReveal
              as="h2"
              text="What We Keep Constant."
              className="mt-4 font-display text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.88] tracking-[0.06em] text-brand-white"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((value, index) => {
              const Icon = valueIcons[value.icon as keyof typeof valueIcons];

              return (
                <FadeUp key={value.title} delay={index * 0.06}>
                  <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-3xl uppercase leading-none text-brand-white">
                      {value.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/66">
                      {value.description}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function IdentityAvatar({
  accent,
  name,
}: {
  accent: "ember" | "lime";
  name: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const accentClasses =
    accent === "lime"
      ? "from-brand-accent/24 via-brand-accent/10 to-transparent text-brand-accent"
      : "from-brand-ember/24 via-brand-ember/10 to-transparent text-brand-ember";

  return (
    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentClasses} opacity-90`}
      />
      <div className="absolute inset-[9px] rounded-full border border-white/10" />
      <span className="relative font-display text-5xl uppercase leading-none text-white">
        {initials}
      </span>
    </div>
  );
}
