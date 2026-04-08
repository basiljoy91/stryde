export const siteConfig = {
  description:
    "Stryde is a motion-led footwear concept built with editorial layout, smooth scroll, and reusable interaction primitives.",
  name: "Stryde",
  siteUrl: resolveSiteUrl(),
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}

function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeSiteUrl(candidate);

    if (normalized) {
      return normalized;
    }
  }

  return "http://localhost:3000";
}

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `${trimmed.includes("localhost") || trimmed.startsWith("127.0.0.1") ? "http" : "https"}://${trimmed}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}
