export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(232,255,71,0.12),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(255,83,54,0.14),transparent_24%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.2]" />
      <div className="absolute inset-x-[10%] top-[22%] h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent" />

      <div className="relative z-10 text-center">
        <p className="eyebrow text-white/54">Loading the next frame</p>
        <div className="mt-6 flex items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-brand-accent/24 bg-brand-accent/10 text-brand-accent shadow-[0_0_0_1px_rgba(232,255,71,0.18),0_28px_70px_rgba(0,0,0,0.34)]">
            <span className="font-display text-7xl uppercase leading-none">S</span>
          </div>
        </div>
        <div className="mt-7 h-[3px] w-[min(20rem,68vw)] overflow-hidden rounded-full bg-white/10">
          <div className="loading-bar h-full w-full origin-left bg-gradient-to-r from-brand-accent via-white to-brand-ember" />
        </div>
      </div>
    </div>
  );
}
