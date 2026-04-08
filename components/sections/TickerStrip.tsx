import { tickerItems } from "@/lib/constants";

const loopItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

export function TickerStrip() {
  return (
    <section className="overflow-hidden border-y border-black/10 bg-brand-white py-5 text-brand-black">
      <div className="ticker-track flex min-w-[200%] items-center gap-7 whitespace-nowrap pr-7">
        {loopItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-display text-[1.65rem] uppercase tracking-[0.24em] sm:text-[2rem]"
          >
            {item}
            <span className="ml-7 text-black/35">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
