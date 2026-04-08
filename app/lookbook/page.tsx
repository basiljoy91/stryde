import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { LookbookShowcase } from "@/components/sections/LookbookShowcase";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Browse the Stryde editorial lookbook with masonry framing, parallax imagery, hover captions, and full-screen lightbox navigation.",
  alternates: {
    canonical: absoluteUrl("/lookbook"),
  },
  openGraph: {
    title: "Lookbook | Stryde",
    description:
      "Browse the Stryde editorial lookbook with masonry framing, parallax imagery, hover captions, and full-screen lightbox navigation.",
    url: absoluteUrl("/lookbook"),
  },
};

export default function LookbookPage() {
  return (
    <PageWrapper>
      <LookbookShowcase />
    </PageWrapper>
  );
}
