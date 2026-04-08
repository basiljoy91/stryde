import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { AboutShowcase } from "@/components/sections/AboutShowcase";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Read the Stryde story through a full-screen brand hero, milestone timeline, team section, and values grid.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About | Stryde",
    description:
      "Read the Stryde story through a full-screen brand hero, milestone timeline, team section, and values grid.",
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
