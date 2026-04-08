import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProductDetailShowcase } from "@/components/sections/ProductDetailShowcase";
import { collectionProducts, getProductById } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return collectionProducts.map((product) => ({
    slug: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: absoluteUrl(`/collection/${product.id}`),
    },
    openGraph: {
      title: `${product.name} | Stryde`,
      description: product.description,
      url: absoluteUrl(`/collection/${product.id}`),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  return (
    <PageWrapper>
      <ProductDetailShowcase product={product} />
    </PageWrapper>
  );
}
