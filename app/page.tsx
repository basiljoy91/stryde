import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { CategoryBlocks } from "@/components/sections/CategoryBlocks";
import { FeaturedDrop } from "@/components/sections/FeaturedDrop";
import { Hero } from "@/components/sections/Hero";
import { HorizontalShowcase } from "@/components/sections/HorizontalShowcase";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { SectionTransition } from "@/components/sections/SectionTransition";
import { TickerStrip } from "@/components/sections/TickerStrip";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover Stryde footwear through limited drops, expressive running and lifestyle silhouettes, and a bold performance-led brand story.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Home | Stryde",
    description:
      "Discover Stryde footwear through limited drops, expressive running and lifestyle silhouettes, and a bold performance-led brand story.",
    url: absoluteUrl("/"),
  },
};

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <TickerStrip />
      <FeaturedDrop />
      <SectionTransition accent="ember" label="Current lineup in focus" />
      <HorizontalShowcase />
      <BrandStatement />
      <SectionTransition label="Built for pace, style, and repeat wear" />
      <CategoryBlocks />
      <NewsletterSection />
    </PageWrapper>
  );
}
