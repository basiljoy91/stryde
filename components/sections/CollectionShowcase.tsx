"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ChevronRight,
  Grid2x2,
  LayoutGrid,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/animations/TextReveal";
import { collectionProducts } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

type Category = "All" | "Basketball" | "Running" | "Lifestyle";
type Size = "All" | "7" | "8" | "9" | "10" | "11" | "12";
type Color = string;
type PriceRange = "All" | "Under 150" | "150-175" | "175+";
type ViewMode = "grid" | "masonry";

const categoryOptions: Category[] = ["All", "Basketball", "Running", "Lifestyle"];
const sizeOptions: Size[] = ["All", "7", "8", "9", "10", "11", "12"];
const colorOptions: Color[] = [
  "All",
  ...Array.from(new Set(collectionProducts.flatMap((product) => product.colors))),
];
const priceOptions: PriceRange[] = ["All", "Under 150", "150-175", "175+"];

const colorMap: Record<string, string> = {
  Volt: "#E8FF47",
  Ember: "#FF5336",
  Ivory: "#F5F5F0",
  Black: "#121212",
  Stone: "#C3B9A5",
  Slate: "#5C6370",
  Silver: "#C8CED7",
  Charcoal: "#303030",
};

type CollectionShowcaseProps = {
  initialCategory?: string;
};

export function CollectionShowcase({
  initialCategory,
}: CollectionShowcaseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const addItem = useCart((state) => state.addItem);
  const normalizedCategory = categoryOptions.includes(initialCategory as Category)
    ? (initialCategory as Category)
    : "All";
  const [category, setCategory] = useState<Category>(normalizedCategory);
  const [size, setSize] = useState<Size>("All");
  const [color, setColor] = useState<Color>("All");
  const [priceRange, setPriceRange] = useState<PriceRange>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredProducts = useMemo(() => {
    return collectionProducts.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSize =
        size === "All" || product.size.includes(Number(size));
      const matchesColor =
        color === "All" ||
        product.colors.includes(color as (typeof product.colors)[number]);
      const matchesPrice =
        priceRange === "All" ||
        (priceRange === "Under 150" && product.price < 150) ||
        (priceRange === "150-175" &&
          product.price >= 150 &&
          product.price <= 175) ||
        (priceRange === "175+" && product.price > 175);

      return matchesCategory && matchesSize && matchesColor && matchesPrice;
    });
  }, [category, color, priceRange, size]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const activeFilters = [
    category !== "All"
      ? { key: "category", label: category, clear: () => setCategory("All") }
      : null,
    size !== "All"
      ? { key: "size", label: `Size ${size}`, clear: () => setSize("All") }
      : null,
    color !== "All"
      ? { key: "color", label: color, clear: () => setColor("All") }
      : null,
    priceRange !== "All"
      ? { key: "price", label: priceRange, clear: () => setPriceRange("All") }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    clear: () => void;
  }>;

  const updateCategoryParam = (nextCategory: Category) => {
    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    if (nextCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", nextCategory);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleFilterChange = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setVisibleCount(6);
  };

  const handleCategoryChange = (value: Category) => {
    handleFilterChange(setCategory, value);
    updateCategoryParam(value);
  };

  const handleLoadMore = () => {
    if (!hasMore || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 3, filteredProducts.length));
      setIsLoadingMore(false);
    }, 850);
  };

  return (
    <section className="relative min-h-screen bg-brand-black pb-24 pt-28 sm:pb-28 lg:pb-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,255,71,0.08),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(255,83,54,0.12),transparent_20%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.22]" />

      <div className="container-shell relative z-10">
        <header className="pb-12">
          <nav className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/38">
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/74">Collection</span>
          </nav>

          <p className="eyebrow">Collection / Performance Archive</p>
          <TextReveal
            as="h1"
            text="COLLECTION"
            className="mt-4 font-display text-[clamp(5rem,15vw,11rem)] uppercase leading-[0.84] tracking-[0.08em] text-brand-white"
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-base leading-8 text-white/65"
          >
            Explore the full Stryde lineup, from fast-cut runners to statement
            court silhouettes and everyday pairs built for repeat wear.
          </motion.p>
        </header>

        <div className="sticky top-24 z-30 mb-7 rounded-[2rem] border border-white/10 bg-brand-black/72 p-4 shadow-panel backdrop-blur-2xl">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-white/62">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition",
                    viewMode === "grid"
                      ? "border-brand-accent/40 bg-brand-accent/14 text-brand-accent"
                      : "border-white/10 bg-white/[0.04] text-white/65",
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  data-cursor="button"
                  onClick={() => setViewMode("masonry")}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition",
                    viewMode === "masonry"
                      ? "border-brand-accent/40 bg-brand-accent/14 text-brand-accent"
                      : "border-white/10 bg-white/[0.04] text-white/65",
                  )}
                >
                  <Grid2x2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <motion.div layout className="grid gap-3 lg:grid-cols-4">
              <FilterGroup
                label="Category"
                options={categoryOptions}
                value={category}
                onChange={handleCategoryChange}
              />
              <FilterGroup
                label="Size"
                options={sizeOptions}
                value={size}
                onChange={(value) => handleFilterChange(setSize, value)}
              />
              <FilterGroup
                label="Color"
                options={colorOptions}
                value={color}
                onChange={(value) => handleFilterChange(setColor, value)}
              />
              <FilterGroup
                label="Price Range"
                options={priceOptions}
                value={priceRange}
                onChange={(value) => handleFilterChange(setPriceRange, value)}
              />
            </motion.div>

            <motion.div layout className="flex min-h-10 flex-wrap gap-2">
              <AnimatePresence initial={false}>
                {activeFilters.map((filter) => (
                  <motion.button
                    key={filter.key}
                    layout
                    initial={{ opacity: 0, scale: 0.85, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -8 }}
                    type="button"
                    data-cursor="button"
                    onClick={filter.clear}
                    className="inline-flex items-center gap-2 rounded-pill border border-brand-accent/30 bg-brand-accent/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-accent"
                  >
                    {filter.label}
                    <X className="h-3.5 w-3.5" />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <motion.div
          layout
          className={cn(
            "grid gap-5",
            viewMode === "grid"
              ? "sm:grid-cols-2 xl:grid-cols-3"
              : "sm:grid-cols-2 xl:grid-cols-3 auto-rows-[minmax(20rem,auto)]",
          )}
        >
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                index={index}
                product={product}
                viewMode={viewMode}
                tall={viewMode === "masonry" && index % 3 === 1}
                onQuickAdd={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    colorway: product.colors[0] ?? "Core",
                    image: product.image,
                  })
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center text-white/65"
          >
            No products match those filters yet. Try clearing a chip or widening the range.
          </motion.div>
        ) : null}

        {filteredProducts.length > 0 ? (
          <div className="mt-10 flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={!hasMore || isLoadingMore}
              variant="secondary"
              className="min-w-[12rem]"
            >
              {isLoadingMore ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-brand-accent" />
                  Loading
                </>
              ) : hasMore ? (
                <>
                  <Plus className="h-4 w-4" />
                  Load More
                </>
              ) : (
                "All Loaded"
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type FilterGroupProps<T extends string> = {
  label: string;
  onChange: (value: T) => void;
  options: T[];
  value: T;
};

function FilterGroup<T extends string>({
  label,
  onChange,
  options,
  value,
}: FilterGroupProps<T>) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/38">
        {label}
      </p>
      <motion.div layout className="flex flex-wrap gap-2">
        {options.map((option) => (
          <motion.button
            key={option}
            layout
            type="button"
            data-cursor="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-pill border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] transition",
              option === value
                ? "border-brand-accent/36 bg-brand-accent/14 text-brand-accent"
                : "border-white/10 bg-black/20 text-white/60 hover:text-white",
            )}
          >
            {option}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

type Product = (typeof collectionProducts)[number];

function ProductCard({
  index,
  onQuickAdd,
  product,
  tall,
  viewMode,
}: {
  index: number;
  onQuickAdd: () => void;
  product: Product;
  tall: boolean;
  viewMode: ViewMode;
}) {
  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(product.price);
  const rotateXBase = useMotionValue(0);
  const rotateYBase = useMotionValue(0);
  const rotateX = useSpring(rotateXBase, {
    stiffness: 180,
    damping: 18,
    mass: 0.45,
  });
  const rotateY = useSpring(rotateYBase, {
    stiffness: 180,
    damping: 18,
    mass: 0.45,
  });

  const handlePointerMove = (event: {
    clientX: number;
    clientY: number;
    currentTarget: HTMLElement;
  }) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const percentX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const percentY = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateXBase.set(percentY * -8);
    rotateYBase.set(percentX * 10);
  };

  const resetTilt = () => {
    rotateXBase.set(0);
    rotateYBase.set(0);
  };

  return (
    <motion.article
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      layout
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-brand-mid p-5",
        tall && "sm:row-span-2 min-h-[38rem]",
        !tall && "min-h-[31rem]",
        viewMode === "masonry" && !tall && "xl:min-h-[27rem]",
      )}
      data-cursor="card"
      data-cursor-label="Open"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <Link
        href={`/collection/${product.id}`}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 z-20"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-br ${product.accentClass} opacity-70 transition duration-500 group-hover:opacity-100`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <Badge variant="dark">{product.badge}</Badge>
          <span className="text-xs uppercase tracking-[0.28em] text-white/42">
            {product.category}
          </span>
        </div>

        <div className={cn("relative flex-1", tall ? "min-h-[19rem]" : "min-h-[16rem]")}>
          <div className="absolute inset-0 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,#f4efe4_0%,#ebe5d9_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_22px_44px_rgba(0,0,0,0.18)]" />
          <div className="absolute inset-[1px] rounded-[1.75rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent_36%)]" />
          <div className="absolute left-4 top-4 z-10 rounded-pill border border-black/8 bg-black/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-black/45">
            Studio frame
          </div>
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0 round 1.8rem)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 1.8rem)" }}
            transition={{
              duration: 0.7,
              delay: Math.min(index * 0.08, 0.36) + 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 overflow-hidden rounded-[1.8rem]"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 28vw, (min-width: 640px) 44vw, 100vw"
              className={`object-cover p-3 transition-transform duration-700 ease-out group-hover:scale-[1.05] ${product.imageClass}`}
            />
          </motion.div>
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-4xl uppercase leading-none text-brand-white">
                {product.name}
              </h3>
              <p className="mt-3 text-sm text-white/68">{priceLabel}</p>
            </div>
          </div>

            <div className="mt-4 flex items-center gap-2">
            {product.colors.map((swatch) => (
              <span
                key={swatch}
                className="h-4 w-4 rounded-full border border-white/15"
                style={{
                  backgroundColor: colorMap[swatch] ?? "#D9D9D9",
                }}
              />
            ))}
          </div>

          <motion.div
            initial={false}
            className="overflow-hidden"
          >
            <div className="relative z-30 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <Button
                className="mt-5 w-full"
                size="sm"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onQuickAdd();
                }}
              >
                Quick Add
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
