import type { Metadata } from "next";

import { CollectionShowcase } from "@/components/sections/CollectionShowcase";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Shop the Stryde collection across running, basketball, and lifestyle silhouettes built for speed, style, and everyday rotation.",
  alternates: {
    canonical: absoluteUrl("/collection"),
  },
  openGraph: {
    title: "Collection | Stryde",
    description:
      "Shop the Stryde collection across running, basketball, and lifestyle silhouettes built for speed, style, and everyday rotation.",
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
