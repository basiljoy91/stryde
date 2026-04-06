import { ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/animations/FadeUp";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { designPillars, featuredDrops } from "@/lib/constants";

export function FeaturedDrop() {
  return (
    <section id="featured" className="pb-24 sm:pb-28 lg:pb-32">
      <div className="container-shell">
        <FadeUp className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Featured Drop / Foundation</p>
            <h2 className="section-heading mt-3 max-w-3xl">
              System First. Product Ready.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-white/65">
            The shell is now driven by shared tokens, motion primitives, and a
            reusable layout kit so every future page can inherit the same brand
            intensity without rebuilding the basics.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <FadeUp>
            <article className="glass-panel clip-fade h-full overflow-hidden p-8 sm:p-10">
              <Tag>Velocity pack</Tag>
              <div className="mt-6 flex flex-wrap items-start justify-between gap-5">
                <div>
                  <h3 className="font-display text-5xl uppercase leading-none text-brand-white sm:text-6xl">
                    Drop Architecture
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
                    Oversized display typography, matte-black foundations,
                    editorial spotlighting, and kinetic hover states establish
                    the direction before the full catalogue arrives.
                  </p>
                </div>
                <Badge variant="accent">Reusable shell</Badge>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {designPillars.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                      {pillar.label}
                    </p>
                    <p className="mt-3 text-base leading-7 text-brand-white">
                      {pillar.value}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </FadeUp>

          <div className="grid gap-5">
            <FadeUp>
              <article
                id="system"
                className="glass-panel rounded-[2rem] p-7"
              >
                <Tag>Design DNA</Tag>
                <h3 className="mt-5 font-display text-4xl uppercase leading-none text-brand-white">
                  Material Contrast
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Transparent chrome, blurred cards, accent glows, and copper
                  contour lines echo the reference while staying flexible enough
                  for new campaigns.
                </p>
              </article>
            </FadeUp>

            <FadeUp delay={0.08}>
              <article className="glass-panel rounded-[2rem] p-7">
                <Tag>Motion stack</Tag>
                <h3 className="mt-5 font-display text-4xl uppercase leading-none text-brand-white">
                  Scroll + Reveal
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Lenis smooths the experience, GSAP handles text splitting and
                  parallax, and Framer Motion covers route and entrance
                  choreography.
                </p>
                <div className="mt-6">
                  <MagneticButton href="#newsletter" variant="secondary" size="sm">
                    Join Updates
                    <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </article>
            </FadeUp>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {featuredDrops.map((drop, index) => (
            <FadeUp key={drop.id} delay={0.05 * index}>
              <article
                className="glass-panel clip-fade relative flex h-full overflow-hidden p-6"
                data-cursor="card"
                data-cursor-label="View"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${drop.accentClass}`}
                />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <Tag>Edition {drop.id}</Tag>
                    <Badge variant="dark">{drop.price}</Badge>
                  </div>
                  <h3 className="mt-8 font-display text-4xl uppercase leading-none text-brand-white">
                    {drop.name}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-white/65">
                    {drop.summary}
                  </p>
                  <div className="accent-line mt-6 mb-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                    Built to expand into product cards, category pages, and
                    campaign modules next.
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
