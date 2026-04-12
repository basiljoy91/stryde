import type { Metadata } from "next";

import { CollectionShowcase } from "@/components/sections/CollectionShowcase";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Filter the Stryde collection by category, size, color, and price across animated grid and masonry views.",
  alternates: {
    canonical: absoluteUrl("/collection"),
  },
  openGraph: {
    title: "Collection | Stryde",
    description:
      "Filter the Stryde collection by category, size, color, and price across animated grid and masonry views.",
    url: absoluteUrl("/collection"),
  },
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <PageWrapper>
      <CollectionShowcase initialCategory={resolvedSearchParams.category} />
    </PageWrapper>
  );
}
