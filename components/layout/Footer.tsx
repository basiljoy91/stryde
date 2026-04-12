import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { footerColumns, socialLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16 sm:py-20">
      <div className="container-shell">
        <div className="glass-panel grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="eyebrow">Community / Connect</p>
            <h2 className="section-heading max-w-xl">
              Built For The Long Run.
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/65">
              Follow the studio, revisit the collection, and keep up with the
              next release cycle without repeating the same signup block twice.
            </p>
            <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.26em] text-brand-muted">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="button"
                  className="rounded-pill border border-white/10 px-4 py-2 transition hover:border-brand-accent/35 hover:text-brand-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="rounded-[2rem] border border-white/10 bg-black/40 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
                Already saw the newsletter block?
              </p>
              <h3 className="font-display text-4xl uppercase leading-none text-brand-white">
                Jump Back To The Drop.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/62">
                The main signup lives in the dedicated access section above.
                Use the links here to browse the collection or head back to the
                hero story.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/collection"
                  data-cursor="button"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:border-brand-accent/35 hover:text-brand-white"
                >
                  Shop Collection
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#home"
                  data-cursor="button"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:border-brand-accent/35 hover:text-brand-white"
                >
                  Back To Top
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-white">
                    {column.title}
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-white/60">
                    {column.links.map((link) => (
                      <p key={link}>{link}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
