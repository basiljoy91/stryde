"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronRight,
  LoaderCircle,
  MoveRight,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  collectionProducts,
  type CollectionProduct,
} from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const ProductViewer3D = dynamic(
  () =>
    import("@/components/ui/ProductViewer3D").then(
      (module) => module.ProductViewer3D,
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

type ProductDetailShowcaseProps = {
  product: CollectionProduct;
};

const accordionOrder = [
  { key: "description", label: "Description" },
  { key: "materials", label: "Materials" },
  { key: "sizingGuide", label: "Sizing Guide" },
  { key: "shipping", label: "Shipping" },
] as const;

type AccordionKey = (typeof accordionOrder)[number]["key"];

export function ProductDetailShowcase({
  product,
}: ProductDetailShowcaseProps) {
  const [activeImageId, setActiveImageId] = useState(product.gallery[0]?.id);
  const [selectedSize, setSelectedSize] = useState<number | null>(
    product.size[0] ?? null,
  );
  const [selectedColor, setSelectedColor] = useState(product.variants[0]);
  const [cartState, setCartState] = useState<"idle" | "loading" | "added">(
    "idle",
  );
  const [openAccordion, setOpenAccordion] =
    useState<AccordionKey | null>("description");
  const [zoomPoint, setZoomPoint] = useState({ x: 50, y: 50 });
  const [isZoomActive, setIsZoomActive] = useState(false);

  const addItem = useCart((state) => state.addItem);

  const activeGalleryItem = useMemo(() => {
    return (
      product.gallery.find((item) => item.id === activeImageId) ??
      product.gallery[0]
    );
  }, [activeImageId, product.gallery]);

  const relatedProducts = useMemo(() => {
    return collectionProducts
      .filter(
        (candidate) =>
          candidate.id !== product.id &&
          candidate.category === product.category,
      )
      .slice(0, 4);
  }, [product.category, product.id]);

  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(product.price);
  const hasMultipleGalleryImages = product.gallery.length > 1;
  const colorLabel =
    product.variants.length > 1 ? "Color" : "Studio color";

  const handleAddToCart = () => {
    if (!selectedColor) {
      return;
    }

    setCartState("loading");

    window.setTimeout(() => {
      addItem({
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.price,
        colorway: selectedColor.name,
      });
      setCartState("added");
    }, 850);

    window.setTimeout(() => {
      setCartState("idle");
    }, 2200);
  };

  return (
    <section className="relative min-h-screen bg-brand-black pb-24 pt-28 sm:pb-28 lg:pb-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,255,71,0.08),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(255,83,54,0.1),transparent_18%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.22]" />

      <div className="container-shell relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/38">
          <Link href="/" className="transition hover:text-white/70">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/collection" className="transition hover:text-white/70">
            Collection
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/74">{product.name}</span>
        </nav>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <div
              className="relative min-h-[34rem] overflow-hidden rounded-[2.6rem] border border-white/10 bg-brand-mid p-6 sm:min-h-[42rem]"
              style={{ touchAction: "pan-y pinch-zoom" }}
              onMouseEnter={() => setIsZoomActive(true)}
              onMouseLeave={() => setIsZoomActive(false)}
              onMouseMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - bounds.left) / bounds.width) * 100;
                const y = ((event.clientY - bounds.top) / bounds.height) * 100;

                setZoomPoint({
                  x: Math.max(0, Math.min(100, x)),
                  y: Math.max(0, Math.min(100, y)),
                });
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.accentClass} opacity-75`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%)]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeGalleryItem.id}-${selectedColor.name}`}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <ProductViewer3D
                    image={activeGalleryItem.image}
                    interactive
                    tone="light"
                  />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                {isZoomActive ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    className="pointer-events-none absolute bottom-5 right-5 hidden h-40 w-40 overflow-hidden rounded-full border border-white/15 shadow-[0_18px_48px_rgba(0,0,0,0.35)] lg:block"
                    style={{
                      backgroundImage: `url(${activeGalleryItem.image})`,
                      backgroundPosition: `${zoomPoint.x}% ${zoomPoint.y}%`,
                      backgroundSize: "220%",
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_34%,rgba(10,10,10,0.15)_70%)]" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <div className="absolute left-5 top-5 rounded-pill border border-white/10 bg-brand-black/40 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-sm">
                Hover to inspect detail
              </div>
            </div>

            {hasMultipleGalleryImages ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {product.gallery.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    data-cursor="button"
                    onClick={() => setActiveImageId(item.id)}
                    className={cn(
                      "relative overflow-hidden rounded-[1.6rem] border p-3 text-left transition",
                      item.id === activeGalleryItem.id
                        ? "border-brand-accent/40 bg-white/[0.08]"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]",
                    )}
                  >
                    <div className="relative mb-3 h-28 overflow-hidden rounded-[1.1rem] bg-black/30">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className={cn("object-contain p-3", item.imageClass)}
                      />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/68">
                      {item.label}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/68">
                  Single studio cutout supplied for this product.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/42">
                  Drag the 3D viewer to inspect the silhouette.
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="xl:sticky xl:top-28 space-y-5">
              <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.04] p-6 shadow-panel backdrop-blur-xl sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{product.category}</p>
                    <h1 className="mt-4 font-display text-[clamp(3.5rem,8vw,6rem)] uppercase leading-[0.88] text-brand-white">
                      {product.name}
                    </h1>
                  </div>
                  <Badge variant="accent">{product.badge}</Badge>
                </div>

                <p className="mt-5 text-base leading-8 text-white/68">
                  {product.description}
                </p>
                <p className="mt-6 font-display text-5xl uppercase leading-none text-brand-white">
                  {priceLabel}
                </p>

                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                    {colorLabel}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.name}
                        type="button"
                        data-cursor="button"
                        onClick={() => setSelectedColor(variant)}
                        className={cn(
                          "flex items-center gap-3 rounded-pill border px-3 py-2 transition",
                          selectedColor.name === variant.name
                            ? "border-brand-accent/40 bg-white/[0.08]"
                            : "border-white/10 bg-black/25 hover:bg-white/[0.05]",
                        )}
                      >
                        <span
                          className="h-5 w-5 rounded-full border border-white/15"
                          style={{ backgroundColor: variant.swatch }}
                        />
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/68">
                          {variant.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                    Size
                  </p>
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {product.size.map((size) => (
                      <motion.button
                        whileHover={{ y: -2 }}
                        key={size}
                        type="button"
                        data-cursor="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "rounded-[1.1rem] border px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition",
                          selectedSize === size
                            ? "border-brand-accent/40 bg-brand-accent/14 text-brand-accent"
                            : "border-white/10 bg-black/25 text-white/72 hover:bg-white/[0.05]",
                        )}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  layout
                  type="button"
                  data-cursor="button"
                  onClick={handleAddToCart}
                  disabled={cartState === "loading"}
                  className={cn(
                    "mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-pill font-semibold uppercase tracking-[0.26em] transition",
                    cartState === "added"
                      ? "bg-brand-accent text-brand-black shadow-glow"
                      : "bg-brand-white text-brand-black hover:-translate-y-0.5",
                  )}
                >
                  {cartState === "loading" ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Adding
                    </>
                  ) : cartState === "added" ? (
                    <>
                      <Check className="h-4 w-4" />
                      Added
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </motion.button>
              </div>

              <div className="rounded-[2.1rem] border border-white/10 bg-white/[0.03] p-3">
                {accordionOrder.map((item) => {
                  const isOpen = openAccordion === item.key;
                  const content =
                    item.key === "description"
                      ? [product.description]
                      : product[item.key];

                  return (
                    <div
                      key={item.key}
                      className="border-b border-white/10 last:border-b-0"
                    >
                      <button
                        type="button"
                        data-cursor="button"
                        onClick={() =>
                          setOpenAccordion((current) =>
                            current === item.key ? null : item.key,
                          )
                        }
                        className="flex w-full items-center justify-between px-4 py-5 text-left"
                      >
                        <span className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-white">
                          {item.label}
                        </span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                          <ChevronDown className="h-4 w-4 text-white/55" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-5">
                              {content.map((line) => (
                                <p
                                  key={line}
                                  className="mb-3 text-sm leading-7 text-white/68 last:mb-0"
                                >
                                  {line}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Related Products</p>
              <h2 className="mt-3 font-display text-[clamp(3rem,7vw,5rem)] uppercase leading-[0.9] text-brand-white">
                Keep Moving
              </h2>
            </div>
            <Link
              href="/collection"
              data-cursor="button"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-white/56 transition hover:text-brand-white"
            >
              Back to collection
              <MoveRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: -900, right: 0 }}
            dragElastic={0.08}
            className="flex gap-5 overflow-hidden pb-4"
          >
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/collection/${related.id}`}
                className="group relative min-w-[19rem] overflow-hidden rounded-[2rem] border border-white/10 bg-brand-mid p-5 sm:min-w-[21rem]"
                data-cursor="card"
                data-cursor-label="Open"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${related.accentClass} opacity-70 transition duration-500 group-hover:opacity-100`}
                />
                <div className="relative z-10">
                  <div className="relative h-56">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className={cn(
                        "object-contain p-4 transition-transform duration-700 group-hover:scale-[1.08]",
                        related.imageClass,
                      )}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-3xl uppercase leading-none text-brand-white">
                        {related.name}
                      </p>
                      <p className="mt-2 text-sm text-white/62">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(related.price)}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-brand-accent" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </section>
      </div>
    </section>
  );
}
