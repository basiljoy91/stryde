import type { Metadata } from "next";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { ContactShowcase } from "@/components/sections/ContactShowcase";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Stryde for launch concepts, motion systems, branded commerce, and editorial collaboration.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact | Stryde",
    description:
      "Reach out to Stryde for launch concepts, motion systems, branded commerce, and editorial collaboration.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <ContactShowcase />
    </PageWrapper>
  );
}
