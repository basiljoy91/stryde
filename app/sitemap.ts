import type { MetadataRoute } from "next";

import { collectionProducts } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/collection",
    "/contact",
    "/lookbook",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
    })),
    ...collectionProducts.map((product) => ({
      url: absoluteUrl(`/collection/${product.id}`),
      lastModified: new Date(),
    })),
  ];
}
