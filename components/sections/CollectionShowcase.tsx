"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Grid2x2,
  LayoutGrid,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
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
  const openCart = useCart((state) => state.openCart);
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
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const clearAllFilters = () => {
    setCategory("All");
    setSize("All");
    setColor("All");
    setPriceRange("All");
    setVisibleCount(6);
    updateCategoryParam("All");
  };

  const handleLoadMore = () => {
    if (!hasMore || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 3, filteredProducts.length));
      setIsLoadingMore(false);
    }, 700);
  };

  return (
    <section className="relative min-h-screen bg-brand-black pb-24 pt-28 sm:pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,255,71,0.07),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(255,83,54,0.1),transparent_18%),#0A0A0A]" />
      <div className="grain-overlay absolute inset-0 opacity-[0.18]" />

      <div className="container-shell relative z-10">
        <header className="pb-10">
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
            transition={{ delay: 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-base leading-8 text-white/64"
          >
            Explore the full Stryde lineup, from fast-cut runners to statement
            court silhouettes and everyday pairs built for repeat wear.
          </motion.p>
        </header>

        <div className="sticky top-24 z-30 mb-8 rounded-[1.8rem] border border-white/10 bg-[#111111]/88 p-4 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/72 transition hover:border-white/20 hover:text-white"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      filtersOpen && "rotate-180",
                    )}
                  />
                </button>

                <div className="text-xs uppercase tracking-[0.24em] text-white/42">
                  {filteredProducts.length} styles
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition",
                    viewMode === "grid"
                      ? "border-brand-accent/40 bg-brand-accent/12 text-brand-accent"
                      : "border-white/10 bg-white/[0.04] text-white/58",
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("masonry")}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border transition",
                    viewMode === "masonry"
                      ? "border-brand-accent/40 bg-brand-accent/12 text-brand-accent"
                      : "border-white/10 bg-white/[0.04] text-white/58",
                  )}
                  aria-label="Masonry view"
                >
                  <Grid2x2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {filtersOpen ? (
                <motion.div
                  key="filters"
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-3 pt-1 lg:grid-cols-4">
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
                      label="Price"
                      options={priceOptions}
                      value={priceRange}
                      onChange={(value) =>
                        handleFilterChange(setPriceRange, value)
                      }
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex min-h-9 flex-wrap items-center gap-2">
              <AnimatePresence initial={false}>
                {activeFilters.map((filter) => (
                  <motion.button
                    key={filter.key}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -6 }}
                    type="button"
                    onClick={filter.clear}
                    className="inline-flex items-center gap-2 rounded-pill border border-brand-accent/26 bg-brand-accent/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-accent"
                  >
                    {filter.label}
                    <X className="h-3.5 w-3.5" />
                  </motion.button>
                ))}
              </AnimatePresence>

              {activeFilters.length > 0 ? (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="ml-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/46 transition hover:text-white/74"
                >
                  Clear all
                </button>
              ) : (
                <span className="text-[0.68rem] uppercase tracking-[0.24em] text-white/34">
                  No filters applied
                </span>
              )}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className={cn(
            "grid gap-6",
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
                onQuickAdd={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    colorway: product.colors[0] ?? "Core",
                    image: product.image,
                  });
                  openCart();
                }}
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
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-3">
      <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-white/36">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-pill border px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.22em] transition",
              option === value
                ? "border-brand-accent/36 bg-brand-accent/14 text-brand-accent"
                : "border-white/10 bg-black/18 text-white/58 hover:border-white/18 hover:text-white",
            )}
          >
            {option}
          </button>
        ))}
      </div>
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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        duration: 0.42,
        delay: Math.min(index * 0.08, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-[2.1rem] border border-white/10 bg-[#181818] p-4 shadow-[0_22px_60px_rgba(0,0,0,0.18)]",
        tall && "sm:row-span-2 min-h-[36rem]",
        !tall && "min-h-[30rem]",
        viewMode === "masonry" && !tall && "xl:min-h-[27rem]",
      )}
    >
      <Link
        href={`/collection/${product.id}`}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 z-10"
      />

      <div className="relative z-20 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-pill border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/56">
            {product.badge}
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/38">
            {product.category}
          </span>
        </div>

        <div className={cn("relative mt-4", tall ? "min-h-[18rem]" : "min-h-[15rem]")}>
          <div className="absolute inset-0 rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,#f8f2e8_0%,#ebe3d6_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_40px_rgba(0,0,0,0.14)]" />
          <div className="absolute inset-[1px] rounded-[1.65rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.1),transparent_36%)]" />
          <div className="absolute inset-0 overflow-hidden rounded-[1.7rem]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 28vw, (min-width: 640px) 44vw, 100vw"
              className={`object-cover p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03] ${product.imageClass}`}
            />
          </div>
        </div>

        <div className="mt-5 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-[2.35rem] uppercase leading-[0.94] text-brand-white">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-white/62">{priceLabel}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {product.colors.map((swatch) => (
              <span
                key={swatch}
                className="h-3.5 w-3.5 rounded-full border border-white/15"
                style={{
                  backgroundColor: colorMap[swatch] ?? "#D9D9D9",
                }}
                aria-label={swatch}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 mt-5 flex items-center gap-3">
          <Button
            className="w-full"
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onQuickAdd();
            }}
          >
            Quick Add
          </Button>
          <Link
            href={`/collection/${product.id}`}
            className="inline-flex min-w-max items-center justify-center rounded-pill border border-white/10 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70 transition hover:border-white/18 hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
