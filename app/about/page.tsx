import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { AboutShowcase } from "@/components/sections/AboutShowcase";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Stryde team, discover the brand story, and explore the values shaping each release and every silhouette.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About | Stryde",
    description:
      "Meet the Stryde team, discover the brand story, and explore the values shaping each release and every silhouette.",
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutShowcase />
    </PageWrapper>
  );
}
