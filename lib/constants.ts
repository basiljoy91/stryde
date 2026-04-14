export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Collection", href: "/collection" },
  { label: "About", href: "/about" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/stryde.lab" },
  { label: "Behance", href: "https://www.behance.net/strydestudio" },
  { label: "Dribbble", href: "https://dribbble.com/stryde-lab" },
];

const studioHeroImage = "/images/products/hero-main.png";
const studioImageClass =
  "scale-[1.02] drop-shadow-[0_26px_76px_rgba(0,0,0,0.26)]";
const studioImageClassLarge =
  "scale-[1.04] drop-shadow-[0_32px_90px_rgba(0,0,0,0.28)]";

const productStudioMedia = {
  "flux-court-mid": {
    image: "/images/products/flux-court-mid.jpg",
    imageClass: studioImageClass,
  },
  "torque-glide": {
    image: "/images/products/torque-glide.jpg",
    imageClass: studioImageClass,
  },
  "echo-shift-low": {
    image: "/images/products/echo-shift-low.jpg",
    imageClass: studioImageClass,
  },
  "vector-pace": {
    image: "/images/products/vector-pace.png",
    imageClass: studioImageClassLarge,
  },
  "mono-stride": {
    image: "/images/products/mono-stride.jpg",
    imageClass: studioImageClass,
  },
  "aero-clash": {
    image: "/images/products/aero-clash.jpg",
    imageClass: studioImageClassLarge,
  },
  "district-runner": {
    image: "/images/products/district-runner.jpg",
    imageClass: studioImageClass,
  },
  "gallery-low": {
    image: "/images/products/gallery-low.jpg",
    imageClass: studioImageClass,
  },
  "vault-flight": {
    image: "/images/products/vault-flight.jpg",
    imageClass: studioImageClass,
  },
  "city-arc": {
    image: "/images/products/city-arc.jpg",
    imageClass: studioImageClass,
  },
  "pulse-racer": {
    image: "/images/products/pulse-racer.jpg",
    imageClass: studioImageClass,
  },
  "court-index": {
    image: "/images/products/court-index.jpg",
    imageClass: studioImageClass,
  },
} as const;

export const heroProduct = {
  id: "apex-jump-01",
  code: "Spring / Summer 2026",
  name: "Apex Jump 01",
  eyebrow: "Editorial performance footwear",
  headlinePrimary: "STRYDE",
  headlineSecondary: "Engineered for speed. Built to hold the gaze.",
  price: 184,
  description:
    "A dark editorial landing story where the hero pins, zooms, and transforms into a product system built around motion and contrast.",
  image: studioHeroImage,
};

export const heroIntroLabels = [
  "Free shipping",
  "Limited editions",
  "Engineered performance",
];

export const zoomFeatureTags = [
  {
    eyebrow: "01",
    title: "Engineered for Speed",
    summary: "Explosive response plate with featherweight layered support.",
  },
  {
    eyebrow: "02",
    title: "Locked-In Stability",
    summary: "Mid-foot containment and heel geometry tuned for sharp cuts.",
  },
  {
    eyebrow: "03",
    title: "360 Grip Story",
    summary: "Traction mapped around direction changes, stops, and takeoff.",
  },
];

export const tickerItems = [
  "FREE SHIPPING",
  "STRYDE SS26",
  "NEW DROP",
  "LIMITED EDITION",
  "ENGINEERED MOTION",
];

export const colorways = [
  {
    name: "Volt Pulse",
    accent: "#E8FF47",
    secondary: "#111111",
    glow: "rgba(232,255,71,0.34)",
  },
  {
    name: "Infra Ember",
    accent: "#FF5336",
    secondary: "#1C1C1C",
    glow: "rgba(255,83,54,0.3)",
  },
  {
    name: "Frost Ivory",
    accent: "#F5F5F0",
    secondary: "#4B4B4B",
    glow: "rgba(245,245,240,0.26)",
  },
];

export const heroStats = [
  { value: 3, suffix: "", label: "launch colorways" },
  { value: 26, suffix: "%", label: "lighter tooling concept" },
  { value: 360, suffix: "deg", label: "traction story" },
];

export const featuredDrops = [
  {
    id: "01",
    href: "/collection/flux-court-mid",
    name: "Flux Court Mid",
    price: "$164",
    summary: "Reactive knit upper with pressure-mapped traction and a low-profile heel clip.",
    image: productStudioMedia["flux-court-mid"].image,
    imageClass: productStudioMedia["flux-court-mid"].imageClass,
    accentClass: "from-brand-accent/25 via-brand-accent/8 to-transparent",
  },
  {
    id: "02",
    href: "/collection/torque-glide",
    name: "Torque Glide",
    price: "$172",
    summary: "A faster-cut silhouette built for guards who want snap, flex, and lightweight support.",
    image: productStudioMedia["torque-glide"].image,
    imageClass: productStudioMedia["torque-glide"].imageClass,
    accentClass: "from-brand-ember/25 via-brand-ember/10 to-transparent",
  },
  {
    id: "03",
    href: "/collection/echo-shift-low",
    name: "Echo Shift Low",
    price: "$158",
    summary: "Street-to-court hybrid with tonal mesh, sculpted foam, and reflective detailing.",
    image: productStudioMedia["echo-shift-low"].image,
    imageClass: productStudioMedia["echo-shift-low"].imageClass,
    accentClass: "from-white/20 via-white/8 to-transparent",
  },
];

export const designPillars = [
  { label: "Type", value: "Bebas Neue + Space Grotesk" },
  { label: "Palette", value: "Near-black, off-white, electric lime" },
  { label: "Motion", value: "Lenis, GSAP, Framer Motion" },
];

export const categoryBlocks = [
  {
    title: "Running",
    eyebrow: "Velocity system",
    description:
      "Lightweight uppers, fast transitions, and tonal cushioning details tuned for daily distance and high-tempo training blocks.",
    cta: "Shop Running",
    href: "/collection?category=Running",
    image: "/images/products/category-running.jpg",
    imageClass: studioImageClass,
    panelClass:
      "bg-[linear-gradient(145deg,#dfe7c3_0%,#c6cc94_28%,#2d2f27_100%)]",
    frameClass: "bg-[linear-gradient(180deg,#fbf7ee_0%,#efe5d7_100%)]",
    contentClass: "bg-[#131313]",
    imageFitClass: "object-contain object-center p-6 sm:p-8",
  },
  {
    title: "Lifestyle",
    eyebrow: "Street uniform",
    description:
      "Clean silhouettes and premium matte finishes shaped to move from city commute to after-hours rotation without losing edge.",
    cta: "Shop Lifestyle",
    href: "/collection?category=Lifestyle",
    image: "/images/products/category-lifestyle.jpg",
    imageClass: studioImageClass,
    panelClass:
      "bg-[linear-gradient(145deg,#2a2520_0%,#1a1917_35%,#121212_100%)]",
    frameClass: "bg-[linear-gradient(180deg,#f8f1e7_0%,#e6d9c8_100%)]",
    contentClass: "bg-[#181716]",
    imageFitClass: "object-cover object-center",
  },
  {
    title: "Limited",
    eyebrow: "Collector capsule",
    description:
      "Scarce runs with louder color stories, numbered packaging, and campaign-led details reserved for the shortest release windows.",
    cta: "Shop Limited",
    href: "/collection?category=Basketball",
    image: "/images/products/category-limited.jpg",
    imageClass: studioImageClass,
    panelClass:
      "bg-[linear-gradient(145deg,#f2ece1_0%,#d8c4a0_28%,#2b1f17_100%)]",
    frameClass: "bg-[linear-gradient(180deg,#fffaf0_0%,#f1ddbf_100%)]",
    contentClass: "bg-[#191513]",
    imageFitClass: "object-cover object-center",
  },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "/collection" },
      { label: "Running", href: "/collection?category=Running" },
      { label: "Limited drops", href: "/collection?category=Basketball" },
      { label: "Lookbook", href: "/lookbook" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/contact" },
      { label: "Returns", href: "/contact" },
      { label: "Sizing", href: "/collection" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Collection", href: "/collection" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export type ProductBadge = "NEW DROP" | "LIMITED" | "BESTSELLER";
export type ProductCategory = "Basketball" | "Running" | "Lifestyle";
export type ProductColor =
  | "Volt"
  | "Ember"
  | "Ivory"
  | "Black"
  | "Stone"
  | "Slate"
  | "Silver"
  | "Charcoal";

export type CollectionProduct = {
  id: string;
  name: string;
  price: number;
  badge: ProductBadge;
  category: ProductCategory;
  size: number[];
  colors: ProductColor[];
  image: string;
  imageClass: string;
  accentClass: string;
  description: string;
  materials: string[];
  sizingGuide: string[];
  shipping: string[];
  gallery: Array<{
    id: string;
    label: string;
    image: string;
    imageClass: string;
  }>;
  variants: Array<{
    name: ProductColor;
    imageClass: string;
    swatch: string;
  }>;
};

const productColorSwatches: Record<ProductColor, string> = {
  Black: "#121212",
  Charcoal: "#303030",
  Ember: "#FF5336",
  Ivory: "#F5F5F0",
  Silver: "#C8CED7",
  Slate: "#5C6370",
  Stone: "#C3B9A5",
  Volt: "#E8FF47",
};

function withStudioMedia(product: CollectionProduct): CollectionProduct {
  const media = productStudioMedia[product.id as keyof typeof productStudioMedia];
  const primaryColor = product.colors[0];
  const image = media?.image ?? studioHeroImage;
  const imageClass = media?.imageClass ?? studioImageClass;

  return {
    ...product,
    colors: primaryColor ? [primaryColor] : product.colors,
    image,
    imageClass,
    gallery: [
      {
        id: "studio",
        label: "Studio view",
        image,
        imageClass,
      },
    ],
    variants: primaryColor
      ? [
          {
            name: primaryColor,
            imageClass,
            swatch: productColorSwatches[primaryColor],
          },
        ]
      : [],
  };
}

const rawCollectionProducts: CollectionProduct[] = [
  {
    id: "flux-court-mid",
    name: "Flux Court Mid",
    price: 164,
    badge: "NEW DROP",
    category: "Basketball",
    size: [8, 9, 10, 11],
    colors: ["Volt", "Black"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-14deg] scale-[1.06] hue-rotate-[58deg] saturate-[1.16]",
    accentClass: "from-brand-accent/35 via-brand-accent/8 to-transparent",
    description:
      "A responsive mid-cut built for sudden lift, directional stops, and hard landings that still feel controlled.",
    materials: [
      "Layered mono-mesh upper with fused support film.",
      "Injected midsole foam with torsion-stabilizing plate.",
      "Rubber traction tuned for indoor and mixed-surface grip.",
    ],
    sizingGuide: [
      "Runs true to size for most players.",
      "Choose a half size up if you prefer extra toe room.",
      "Mid-foot wraps snugly for a locked-in game fit.",
    ],
    shipping: [
      "Ships in 2-4 business days within the region.",
      "Express checkout available at the next step.",
      "Free returns within 14 days on unworn pairs.",
    ],
    gallery: [
      {
        id: "hero",
        label: "Hero angle",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-14deg] scale-[1.08] hue-rotate-[58deg] saturate-[1.18]",
      },
      {
        id: "side",
        label: "Side profile",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-8deg] scale-[1.04] hue-rotate-[36deg] saturate-[1.08]",
      },
      {
        id: "sole",
        label: "Tooling detail",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-20deg] scale-[1.1] hue-rotate-[12deg] brightness-[0.96]",
      },
    ],
    variants: [
      {
        name: "Volt",
        imageClass:
          "rotate-[-14deg] scale-[1.08] hue-rotate-[58deg] saturate-[1.18]",
        swatch: "#E8FF47",
      },
      {
        name: "Black",
        imageClass:
          "rotate-[-12deg] scale-[1.06] grayscale brightness-[0.82]",
        swatch: "#111111",
      },
    ],
  },
  {
    id: "torque-glide",
    name: "Torque Glide",
    price: 172,
    badge: "BESTSELLER",
    category: "Running",
    size: [7, 8, 9, 10],
    colors: ["Ember", "Slate"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-10deg] scale-[1.08] hue-rotate-[332deg] saturate-[1.14]",
    accentClass: "from-brand-ember/35 via-brand-ember/10 to-transparent",
    description:
      "A low-profile runner with a sharper rocker line for quicker transitions and a more aggressive forefoot feel.",
    materials: [
      "Open engineered mesh with strategic no-sew reinforcement.",
      "Dual-density foam stack tuned for faster rebound.",
      "Heel counter insert for high-speed directional support.",
    ],
    sizingGuide: [
      "Performance fit with a narrow heel pocket.",
      "Take your normal running size.",
      "Wide-footed wearers may prefer going a half size up.",
    ],
    shipping: [
      "Dispatches within 48 hours on in-stock sizes.",
      "Complimentary shipping on orders over $180.",
      "Exchange window opens immediately after delivery.",
    ],
    gallery: [
      {
        id: "hero",
        label: "Front angle",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-10deg] scale-[1.08] hue-rotate-[332deg] saturate-[1.14]",
      },
      {
        id: "profile",
        label: "Fast profile",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-4deg] scale-[1.03] hue-rotate-[300deg] saturate-[1.06]",
      },
      {
        id: "heel",
        label: "Heel clip",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-18deg] scale-[1.1] hue-rotate-[350deg] brightness-[0.94]",
      },
    ],
    variants: [
      {
        name: "Ember",
        imageClass:
          "rotate-[-10deg] scale-[1.08] hue-rotate-[332deg] saturate-[1.14]",
        swatch: "#FF5336",
      },
      {
        name: "Slate",
        imageClass:
          "rotate-[-9deg] scale-[1.05] hue-rotate-[250deg] saturate-[0.8]",
        swatch: "#5C6370",
      },
    ],
  },
  {
    id: "echo-shift-low",
    name: "Echo Shift Low",
    price: 158,
    badge: "LIMITED",
    category: "Lifestyle",
    size: [8, 9, 10, 12],
    colors: ["Ivory", "Stone"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-13deg] scale-[1.04] grayscale brightness-[1.1]",
    accentClass: "from-white/25 via-white/8 to-transparent",
    description:
      "Street-leaning low top with cleaner proportions, softer foam feel, and reflective trims for after-dark wear.",
    materials: [
      "Mixed textile upper with suede-touch overlays.",
      "Soft rebound EVA midsole blend.",
      "Reflective linework across quarter and tongue pull.",
    ],
    sizingGuide: [
      "Relaxed lifestyle fit with a roomier forefoot.",
      "Stay true to size for casual wear.",
      "Size down half for a tighter, fashion fit.",
    ],
    shipping: [
      "Standard delivery in 3-5 business days.",
      "Gift packaging available in checkout.",
      "Returns accepted within 14 days.",
    ],
    gallery: [
      {
        id: "hero",
        label: "Editorial angle",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-13deg] scale-[1.04] grayscale brightness-[1.1]",
      },
      {
        id: "texture",
        label: "Material mix",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-2deg] scale-[1.01] hue-rotate-[15deg] saturate-[0.72]",
      },
      {
        id: "street",
        label: "Street view",
        image: "/images/hero-shoe.svg",
        imageClass:
          "rotate-[-16deg] scale-[1.08] hue-rotate-[28deg] brightness-[1.04]",
      },
    ],
    variants: [
      {
        name: "Ivory",
        imageClass:
          "rotate-[-13deg] scale-[1.04] grayscale brightness-[1.1]",
        swatch: "#F5F5F0",
      },
      {
        name: "Stone",
        imageClass:
          "rotate-[-11deg] scale-[1.02] hue-rotate-[18deg] saturate-[0.78]",
        swatch: "#C3B9A5",
      },
    ],
  },
  {
    id: "vector-pace",
    name: "Vector Pace",
    price: 146,
    badge: "NEW DROP",
    category: "Running",
    size: [7, 8, 9, 11],
    colors: ["Volt", "Silver"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-15deg] scale-[1.05] hue-rotate-[82deg] saturate-[1.2]",
    accentClass: "from-lime-300/25 via-brand-accent/10 to-transparent",
    description: "Speed-day trainer with a tighter heel cup and quicker toe-off geometry.",
    materials: ["Breathable mesh shell.", "Responsive foam core.", "Lightweight outsole webbing."],
    sizingGuide: ["True to size fit.", "Half size up for wider feet.", "Best with performance socks."],
    shipping: ["Dispatches in 48 hours.", "Tracked shipping on all orders.", "Easy exchanges available."],
    gallery: [
      { id: "hero", label: "Launch angle", image: "/images/hero-shoe.svg", imageClass: "rotate-[-15deg] scale-[1.05] hue-rotate-[82deg] saturate-[1.2]" },
      { id: "speed", label: "Speed frame", image: "/images/hero-shoe.svg", imageClass: "rotate-[-8deg] scale-[1.03] hue-rotate-[70deg] saturate-[1.05]" },
      { id: "foam", label: "Foam detail", image: "/images/hero-shoe.svg", imageClass: "rotate-[-20deg] scale-[1.08] hue-rotate-[48deg] brightness-[0.98]" },
    ],
    variants: [
      { name: "Volt", imageClass: "rotate-[-15deg] scale-[1.05] hue-rotate-[82deg] saturate-[1.2]", swatch: "#E8FF47" },
      { name: "Silver", imageClass: "rotate-[-13deg] scale-[1.03] hue-rotate-[10deg] saturate-[0.84]", swatch: "#C8CED7" },
    ],
  },
  {
    id: "mono-stride",
    name: "Mono Stride",
    price: 138,
    badge: "BESTSELLER",
    category: "Lifestyle",
    size: [8, 9, 10],
    colors: ["Black", "Charcoal"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[12deg] scale-[1.03] grayscale brightness-[0.88]",
    accentClass: "from-zinc-300/15 via-zinc-100/5 to-transparent",
    description: "Minimal monochrome runner for daily wear with a softer ride and dressed-down profile.",
    materials: ["Dense knit upper.", "Soft ride foam midsole.", "Abrasion-ready rubber pods."],
    sizingGuide: ["True to size.", "Snug heel fit.", "Balanced width through forefoot."],
    shipping: ["Ships in 2-4 days.", "Store pickup on select launches.", "Returns within 14 days."],
    gallery: [
      { id: "hero", label: "Studio front", image: "/images/hero-shoe.svg", imageClass: "rotate-[12deg] scale-[1.03] grayscale brightness-[0.88]" },
      { id: "mono", label: "Mono detail", image: "/images/hero-shoe.svg", imageClass: "rotate-[6deg] scale-[1.01] grayscale brightness-[0.8]" },
      { id: "profile", label: "Profile", image: "/images/hero-shoe.svg", imageClass: "rotate-[16deg] scale-[1.06] grayscale brightness-[0.92]" },
    ],
    variants: [
      { name: "Black", imageClass: "rotate-[12deg] scale-[1.03] grayscale brightness-[0.88]", swatch: "#111111" },
      { name: "Charcoal", imageClass: "rotate-[10deg] scale-[1.02] hue-rotate-[220deg] saturate-[0.2] brightness-[0.76]", swatch: "#2B2B2B" },
    ],
  },
  {
    id: "aero-clash",
    name: "Aero Clash",
    price: 182,
    badge: "LIMITED",
    category: "Basketball",
    size: [9, 10, 11, 12],
    colors: ["Ember", "Ivory"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-16deg] scale-[1.08] hue-rotate-[350deg] saturate-[1.22]",
    accentClass: "from-red-300/25 via-brand-ember/12 to-transparent",
    description: "Court-ready flagship with a louder launch palette and more sculpted sidewall geometry.",
    materials: ["Pressure-mapped woven upper.", "Stability plate insert.", "High-grip tread layout."],
    sizingGuide: ["True to size.", "Best for medium-width feet.", "Secure ankle collar."],
    shipping: ["Priority shipping included.", "Signature required for limited pairs.", "Returns within 10 days."],
    gallery: [
      { id: "hero", label: "Launch hero", image: "/images/hero-shoe.svg", imageClass: "rotate-[-16deg] scale-[1.08] hue-rotate-[350deg] saturate-[1.22]" },
      { id: "court", label: "Court stance", image: "/images/hero-shoe.svg", imageClass: "rotate-[-10deg] scale-[1.04] hue-rotate-[336deg] saturate-[1.08]" },
      { id: "outsole", label: "Grip map", image: "/images/hero-shoe.svg", imageClass: "rotate-[-22deg] scale-[1.12] hue-rotate-[12deg] brightness-[0.96]" },
    ],
    variants: [
      { name: "Ember", imageClass: "rotate-[-16deg] scale-[1.08] hue-rotate-[350deg] saturate-[1.22]", swatch: "#FF5336" },
      { name: "Ivory", imageClass: "rotate-[-14deg] scale-[1.05] grayscale brightness-[1.08]", swatch: "#F5F5F0" },
    ],
  },
  {
    id: "district-runner",
    name: "District Runner",
    price: 152,
    badge: "NEW DROP",
    category: "Running",
    size: [7, 8, 10, 11],
    colors: ["Silver", "Black"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[10deg] scale-[1.02] hue-rotate-[18deg] saturate-[0.85]",
    accentClass: "from-sky-300/20 via-white/8 to-transparent",
    description: "Urban training silhouette balancing lightweight comfort with everyday mileage support.",
    materials: ["Airflow mesh body.", "Stabilized foam platform.", "Durable heel wrap."],
    sizingGuide: ["Runs true.", "Half size up for all-day comfort.", "Neutral arch fit."],
    shipping: ["Ground shipping in 3-5 days.", "Free shipping over $180.", "Easy return labels included."],
    gallery: [
      { id: "hero", label: "Street angle", image: "/images/hero-shoe.svg", imageClass: "rotate-[10deg] scale-[1.02] hue-rotate-[18deg] saturate-[0.85]" },
      { id: "profile", label: "Runner profile", image: "/images/hero-shoe.svg", imageClass: "rotate-[4deg] scale-[1.01] hue-rotate-[28deg] saturate-[0.76]" },
      { id: "heel", label: "Rear lock", image: "/images/hero-shoe.svg", imageClass: "rotate-[18deg] scale-[1.06] hue-rotate-[4deg] brightness-[0.9]" },
    ],
    variants: [
      { name: "Silver", imageClass: "rotate-[10deg] scale-[1.02] hue-rotate-[18deg] saturate-[0.85]", swatch: "#C8CED7" },
      { name: "Black", imageClass: "rotate-[10deg] scale-[1.01] grayscale brightness-[0.82]", swatch: "#111111" },
    ],
  },
  {
    id: "gallery-low",
    name: "Gallery Low",
    price: 144,
    badge: "BESTSELLER",
    category: "Lifestyle",
    size: [8, 9, 10, 11],
    colors: ["Stone", "Ivory"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-8deg] scale-[1.03] hue-rotate-[12deg] saturate-[0.82]",
    accentClass: "from-amber-100/25 via-white/8 to-transparent",
    description: "Softly toned lifestyle pair that prioritizes texture, proportion, and all-day wearability.",
    materials: ["Mixed suede-touch overlays.", "Foam comfort base.", "Rubber traction accents."],
    sizingGuide: ["Relaxed fit.", "True to size for casual wear.", "Slightly roomier toe box."],
    shipping: ["Ships in 3-5 days.", "Gift note option available.", "Standard returns apply."],
    gallery: [
      { id: "hero", label: "Gallery frame", image: "/images/hero-shoe.svg", imageClass: "rotate-[-8deg] scale-[1.03] hue-rotate-[12deg] saturate-[0.82]" },
      { id: "material", label: "Material mix", image: "/images/hero-shoe.svg", imageClass: "rotate-[-2deg] scale-[1.0] hue-rotate-[24deg] saturate-[0.7]" },
      { id: "street", label: "Street style", image: "/images/hero-shoe.svg", imageClass: "rotate-[-14deg] scale-[1.07] hue-rotate-[8deg] brightness-[1.02]" },
    ],
    variants: [
      { name: "Stone", imageClass: "rotate-[-8deg] scale-[1.03] hue-rotate-[12deg] saturate-[0.82]", swatch: "#C3B9A5" },
      { name: "Ivory", imageClass: "rotate-[-7deg] scale-[1.02] grayscale brightness-[1.08]", swatch: "#F5F5F0" },
    ],
  },
  {
    id: "vault-flight",
    name: "Vault Flight",
    price: 194,
    badge: "LIMITED",
    category: "Basketball",
    size: [9, 10, 11],
    colors: ["Volt", "Ember"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-15deg] scale-[1.09] hue-rotate-[42deg] saturate-[1.24]",
    accentClass: "from-brand-accent/28 via-brand-ember/10 to-transparent",
    description: "High-energy court flagship with launch-only detailing and a louder competition-ready finish.",
    materials: ["Composite woven shell.", "Responsive midsole stack.", "High-abrasion traction rubber."],
    sizingGuide: ["True to size.", "Competition fit through mid-foot.", "Secure collar lock."],
    shipping: ["Priority fulfillment.", "Limited launch handling times may vary.", "Returns accepted on unworn pairs."],
    gallery: [
      { id: "hero", label: "Vault hero", image: "/images/hero-shoe.svg", imageClass: "rotate-[-15deg] scale-[1.09] hue-rotate-[42deg] saturate-[1.24]" },
      { id: "detail", label: "Color clash", image: "/images/hero-shoe.svg", imageClass: "rotate-[-9deg] scale-[1.05] hue-rotate-[18deg] saturate-[1.12]" },
      { id: "heel", label: "Exploded heel", image: "/images/hero-shoe.svg", imageClass: "rotate-[-20deg] scale-[1.11] hue-rotate-[340deg] brightness-[0.94]" },
    ],
    variants: [
      { name: "Volt", imageClass: "rotate-[-15deg] scale-[1.09] hue-rotate-[42deg] saturate-[1.24]", swatch: "#E8FF47" },
      { name: "Ember", imageClass: "rotate-[-15deg] scale-[1.07] hue-rotate-[350deg] saturate-[1.18]", swatch: "#FF5336" },
    ],
  },
  {
    id: "city-arc",
    name: "City Arc",
    price: 149,
    badge: "NEW DROP",
    category: "Lifestyle",
    size: [7, 8, 9, 10],
    colors: ["Stone", "Slate"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[14deg] scale-[1.01] grayscale brightness-[1.04]",
    accentClass: "from-stone-200/20 via-white/8 to-transparent",
    description: "Urban low-profile silhouette with understated tones and a smoother everyday ride.",
    materials: ["Textile upper shell.", "Supportive foam chassis.", "Segmented outsole."],
    sizingGuide: ["True to size.", "Balanced fit for everyday wear.", "Works best with standard socks."],
    shipping: ["Ships in 2-4 days.", "Free standard delivery on bundles.", "Easy exchanges available."],
    gallery: [
      { id: "hero", label: "City angle", image: "/images/hero-shoe.svg", imageClass: "rotate-[14deg] scale-[1.01] grayscale brightness-[1.04]" },
      { id: "upper", label: "Upper detail", image: "/images/hero-shoe.svg", imageClass: "rotate-[8deg] scale-[1.0] hue-rotate-[16deg] saturate-[0.68]" },
      { id: "move", label: "Motion shot", image: "/images/hero-shoe.svg", imageClass: "rotate-[18deg] scale-[1.05] brightness-[0.96]" },
    ],
    variants: [
      { name: "Stone", imageClass: "rotate-[14deg] scale-[1.01] grayscale brightness-[1.04]", swatch: "#C3B9A5" },
      { name: "Slate", imageClass: "rotate-[12deg] scale-[1.0] hue-rotate-[220deg] saturate-[0.42]", swatch: "#5C6370" },
    ],
  },
  {
    id: "pulse-racer",
    name: "Pulse Racer",
    price: 176,
    badge: "BESTSELLER",
    category: "Running",
    size: [8, 9, 10, 12],
    colors: ["Volt", "Ember"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-12deg] scale-[1.07] hue-rotate-[64deg] saturate-[1.22]",
    accentClass: "from-lime-200/22 via-brand-accent/10 to-transparent",
    description: "Fast-feeling distance runner with a livelier forefoot and brighter launch palette.",
    materials: ["Featherweight mesh upper.", "Dual-zone cushioning foam.", "Durable rubber toe-off zone."],
    sizingGuide: ["True to size.", "Slightly snug through mid-foot.", "Go up half for longer runs."],
    shipping: ["Fast dispatch in 48 hours.", "Tracked delivery included.", "14-day returns."],
    gallery: [
      { id: "hero", label: "Pace hero", image: "/images/hero-shoe.svg", imageClass: "rotate-[-12deg] scale-[1.07] hue-rotate-[64deg] saturate-[1.22]" },
      { id: "speed", label: "Tempo profile", image: "/images/hero-shoe.svg", imageClass: "rotate-[-6deg] scale-[1.03] hue-rotate-[54deg] saturate-[1.08]" },
      { id: "foam", label: "Rebound detail", image: "/images/hero-shoe.svg", imageClass: "rotate-[-18deg] scale-[1.09] hue-rotate-[28deg] brightness-[0.96]" },
    ],
    variants: [
      { name: "Volt", imageClass: "rotate-[-12deg] scale-[1.07] hue-rotate-[64deg] saturate-[1.22]", swatch: "#E8FF47" },
      { name: "Ember", imageClass: "rotate-[-12deg] scale-[1.06] hue-rotate-[350deg] saturate-[1.16]", swatch: "#FF5336" },
    ],
  },
  {
    id: "court-index",
    name: "Court Index",
    price: 168,
    badge: "LIMITED",
    category: "Basketball",
    size: [8, 9, 10, 11, 12],
    colors: ["Black", "Ivory"],
    image: "/images/hero-shoe.svg",
    imageClass: "rotate-[-11deg] scale-[1.06] hue-rotate-[4deg] saturate-[0.95]",
    accentClass: "from-zinc-200/18 via-white/8 to-transparent",
    description: "Structured court shoe balancing understated finish with high-confidence support through the platform.",
    materials: ["Layered support mesh.", "Plate-assisted foam midsole.", "Durable herringbone outsole."],
    sizingGuide: ["True to size.", "Secure fit through ankle.", "Suitable for medium and narrow feet."],
    shipping: ["Ships in 2-4 days.", "Signature shipping optional.", "Returns within 14 days."],
    gallery: [
      { id: "hero", label: "Index hero", image: "/images/hero-shoe.svg", imageClass: "rotate-[-11deg] scale-[1.06] hue-rotate-[4deg] saturate-[0.95]" },
      { id: "support", label: "Support profile", image: "/images/hero-shoe.svg", imageClass: "rotate-[-5deg] scale-[1.02] hue-rotate-[18deg] saturate-[0.82]" },
      { id: "outsole", label: "Outsole view", image: "/images/hero-shoe.svg", imageClass: "rotate-[-18deg] scale-[1.1] brightness-[0.94]" },
    ],
    variants: [
      { name: "Black", imageClass: "rotate-[-11deg] scale-[1.06] grayscale brightness-[0.82]", swatch: "#111111" },
      { name: "Ivory", imageClass: "rotate-[-11deg] scale-[1.05] grayscale brightness-[1.08]", swatch: "#F5F5F0" },
    ],
  },
];

export const collectionProducts = rawCollectionProducts.map(withStudioMedia);

export function getProductById(id: string) {
  return collectionProducts.find((product) => product.id === id);
}

export const aboutTimeline = [
  {
    year: "2018",
    title: "Prototype Zero",
    description:
      "Stryde began as a material study exploring how editorial visual language could shape performance product storytelling.",
    detail:
      "What started as a materials exercise became a clear design position: make footwear feel cinematic without losing product clarity.",
  },
  {
    year: "2020",
    title: "Motion Lab",
    description:
      "We built our first internal motion system, pairing object-focused layouts with scroll choreography and studio-grade pacing.",
    detail:
      "This was the year we learned how movement could guide attention, letting cushioning, tooling, and silhouette do the talking.",
  },
  {
    year: "2023",
    title: "Drop Framework",
    description:
      "The brand moved from one-off concepts into a repeatable release engine spanning collections, product detail, and campaign storytelling.",
    detail:
      "Release structure tightened here: sharper launches, clearer category stories, and a product system that could scale without feeling generic.",
  },
  {
    year: "2026",
    title: "Stryde SS26",
    description:
      "The current system unifies commerce, editorial, and interaction design into one immersive footwear showcase.",
    detail:
      "The latest chapter brings everything together into a polished retail experience built around real product imagery and confident brand language.",
  },
];

export const aboutTeam = [
  {
    name: "Anika Vale",
    role: "Creative Director",
    bio: "Shapes the visual tension between performance precision and editorial drama.",
  },
  {
    name: "Milo Hart",
    role: "Product Lead",
    bio: "Translates athlete insight into silhouettes, tooling stories, and launch narratives.",
  },
  {
    name: "Sena Brooks",
    role: "Motion Designer",
    bio: "Builds the scroll beats, reveals, and transitions that make every page feel alive.",
  },
  {
    name: "Tariq Moss",
    role: "Brand Strategist",
    bio: "Keeps every collection anchored to a clear point of view instead of generic hype.",
  },
];

export const aboutValues = [
  {
    title: "Velocity",
    icon: "zap",
    description: "Design decisions should move with intent, not decoration.",
  },
  {
    title: "Clarity",
    icon: "sparkles",
    description: "Every interaction should feel precise, legible, and unmistakably purposeful.",
  },
  {
    title: "Craft",
    icon: "gem",
    description: "Product storytelling deserves the same detail as the object itself.",
  },
  {
    title: "Culture",
    icon: "orbit",
    description: "Performance is only interesting when it connects back to people and style.",
  },
];

export const lookbookEntries = [
  {
    id: "frame-01",
    title: "Studio Pulse",
    caption: "Hard light, matte black space, and the first launch silhouette in motion.",
    image: "/images/products/lookbook-01.jpg",
    imageClass: studioImageClassLarge,
    accentClass: "from-brand-accent/18 via-transparent to-transparent",
    cardImageClass: "object-cover object-center",
    frameClass: "bg-[#f4efe6]",
    panelClass: "bg-[#171716]",
    textClass: "text-white",
    tall: true,
  },
  {
    id: "frame-02",
    title: "After Hours",
    caption: "A softer grayscale treatment built for the lifestyle side of the collection.",
    image: "/images/products/lookbook-02.jpg",
    imageClass: studioImageClass,
    accentClass: "from-white/14 via-transparent to-transparent",
    cardImageClass: "object-cover object-center",
    frameClass: "bg-[#ebe7e0]",
    panelClass: "bg-[#1b1b1b]",
    textClass: "text-white",
    tall: false,
  },
  {
    id: "frame-03",
    title: "Heat Check",
    caption: "High-contrast ember palette pushing the product into a sharper editorial frame.",
    image: "/images/products/lookbook-03.jpg",
    imageClass: studioImageClassLarge,
    accentClass: "from-brand-ember/18 via-transparent to-transparent",
    cardImageClass: "object-cover object-center",
    frameClass: "bg-[#efe7dc]",
    panelClass: "bg-[#191614]",
    textClass: "text-white",
    tall: false,
  },
  {
    id: "frame-04",
    title: "Velocity Board",
    caption: "Colorway studies pinned against an almost architectural background system.",
    image: productStudioMedia["pulse-racer"].image,
    imageClass: productStudioMedia["pulse-racer"].imageClass,
    accentClass: "from-lime-200/18 via-transparent to-transparent",
    cardImageClass: "object-contain object-center p-6 sm:p-8",
    frameClass: "bg-[linear-gradient(180deg,#f6f1e6_0%,#e7dcc7_100%)]",
    panelClass: "bg-[#171918]",
    textClass: "text-white",
    tall: true,
  },
  {
    id: "frame-05",
    title: "Mirror Run",
    caption: "Reflective highlights and low-angle framing pushing the shape forward.",
    image: productStudioMedia["city-arc"].image,
    imageClass: productStudioMedia["city-arc"].imageClass,
    accentClass: "from-sky-200/16 via-transparent to-transparent",
    cardImageClass: "object-contain object-center p-6 sm:p-8",
    frameClass: "bg-[linear-gradient(180deg,#f5f2ea_0%,#e7dfd3_100%)]",
    panelClass: "bg-[#181819]",
    textClass: "text-white",
    tall: false,
  },
  {
    id: "frame-06",
    title: "Quiet Form",
    caption: "A cleaner neutral composition where proportion and material carry the story.",
    image: productStudioMedia["gallery-low"].image,
    imageClass: productStudioMedia["gallery-low"].imageClass,
    accentClass: "from-stone-200/18 via-transparent to-transparent",
    cardImageClass: "object-contain object-center p-6 sm:p-8",
    frameClass: "bg-[linear-gradient(180deg,#fbf6ed_0%,#ece1d1_100%)]",
    panelClass: "bg-[#181716]",
    textClass: "text-white",
    tall: false,
  },
];
