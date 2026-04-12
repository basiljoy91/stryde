import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { LookbookShowcase } from "@/components/sections/LookbookShowcase";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Step into the Stryde lookbook for campaign frames, studio product moments, and the visual world around each drop.",
  alternates: {
    canonical: absoluteUrl("/lookbook"),
  },
  openGraph: {
    title: "Lookbook | Stryde",
    description:
      "Step into the Stryde lookbook for campaign frames, studio product moments, and the visual world around each drop.",
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
