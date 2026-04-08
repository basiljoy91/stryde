import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { CategoryBlocks } from "@/components/sections/CategoryBlocks";
import { FeaturedDrop } from "@/components/sections/FeaturedDrop";
import { Hero } from "@/components/sections/Hero";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { TickerStrip } from "@/components/sections/TickerStrip";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore the Stryde home experience with pinned hero motion, featured drops, editorial storytelling, and animated category sections.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Home | Stryde",
    description:
      "Explore the Stryde home experience with pinned hero motion, featured drops, editorial storytelling, and animated category sections.",
    url: absoluteUrl("/"),
  },
};

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <TickerStrip />
      <FeaturedDrop />
      <BrandStatement />
      <CategoryBlocks />
      <NewsletterSection />
    </PageWrapper>
  );
}
