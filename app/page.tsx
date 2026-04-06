import { PageWrapper } from "@/components/layout/PageWrapper";
import { FeaturedDrop } from "@/components/sections/FeaturedDrop";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <FeaturedDrop />
    </PageWrapper>
  );
}
