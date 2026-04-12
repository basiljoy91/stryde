import { TextReveal } from "@/components/animations/TextReveal";

export function BrandStatement() {
  return (
    <section
      id="brand"
      className="relative overflow-hidden bg-brand-black py-24 sm:py-28 lg:py-30"
    >
      <div className="grain-overlay absolute inset-0 opacity-[0.3]" />
      <div className="absolute left-[-8rem] top-10 h-[26rem] w-[26rem] rounded-full bg-brand-accent/6 blur-[130px]" />
      <div className="absolute right-[-4rem] top-0 h-[24rem] w-[24rem] rounded-full bg-brand-ember/10 blur-[120px]" />

      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="eyebrow">Brand Statement</p>
          <TextReveal
            as="h2"
            text="NOT JUST A SHOE."
            className="mt-4 font-display text-[clamp(4rem,10vw,8rem)] uppercase leading-[0.88] tracking-[0.06em] text-brand-white"
          />
        </div>

        <div className="max-w-2xl pt-2">
          <TextReveal
            as="p"
            text="Stryde builds footwear for people who move with intent. Every pair is shaped to feel light off the ground, secure through the turn, and sharp enough to live beyond the session that inspired it."
            className="text-lg leading-9 text-white/72"
          />
        </div>
      </div>
    </section>
  );
}
