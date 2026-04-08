import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";

import { CustomCursor } from "@/components/layout/CustomCursor";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { absoluteUrl, siteConfig } from "@/lib/site";

import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Stryde | Performance Lab",
    template: "%s | Stryde",
  },
  metadataBase: new URL(siteConfig.siteUrl),
  description: siteConfig.description,
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    title: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
