"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(232,255,71,0.12),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(255,83,54,0.14),transparent_24%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.18]" />

      <div className="relative z-10 max-w-xl rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-panel backdrop-blur-xl">
        <p className="eyebrow">Fallback / Motion safe mode</p>
        <h1 className="mt-4 font-display text-[clamp(3.5rem,9vw,6rem)] uppercase leading-[0.88] text-brand-white">
          We Hit A Rough Beat.
        </h1>
        <p className="mt-5 text-base leading-8 text-white/68">
          The page can recover without losing the rest of the experience. Try
          the scene again, or continue browsing with motion-safe fallbacks.
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.24em] text-white/36">
          {error.digest ?? "Runtime fallback active"}
        </p>
        <button
          type="button"
          onClick={reset}
          data-cursor="button"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-pill bg-brand-accent px-6 text-sm font-semibold uppercase tracking-[0.24em] text-brand-black shadow-glow"
        >
          Reload Scene
        </button>
      </div>
    </div>
  );
}
