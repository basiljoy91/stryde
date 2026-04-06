import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { footerColumns, socialLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer id="newsletter" className="relative border-t border-white/10 py-16 sm:py-20">
      <div className="container-shell">
        <div className="glass-panel grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="eyebrow">Newsletter / Community</p>
            <h2 className="section-heading max-w-xl">
              Stay Ahead Of The Next Drop.
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/65">
              Product previews, prototype notes, and early access invitations
              delivered before the release window opens.
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
              <label
                htmlFor="newsletter-email"
                className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted"
              >
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-pill border border-white/12 bg-white/[0.04] px-5 text-sm text-brand-white outline-none transition placeholder:text-brand-muted focus:border-brand-accent/45"
                />
                <Button className="shrink-0">
                  Join Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
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
