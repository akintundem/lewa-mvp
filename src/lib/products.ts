// Static product catalog for the Lewa MVP. Swap for a CMS / DB later —
// every page reads through these helpers so the call sites won't change.

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // USD
  materials: string[];
  collection: "everyday" | "signature" | "limited";
  // Free-license Unsplash image. Configured as a remotePattern in next.config.ts
  // so <Image> can optimize it. Swap each one for your own product photography
  // by changing the URL (or moving to a /public/products/<slug>.jpg path).
  image: string;
  // Fallback gradient — used by the simpler ProductCard until that component
  // is also upgraded to <Image>. Mimics moody studio lighting.
  swatch: string;
};

// Each `swatch` is a layered gradient that imitates a moody studio photo:
// a warm key light from the top, deep shadow at the bottom, and a hint of
// gold so the placeholder reads as "jewelry on warm skin tones" until real
// product photography is dropped in.
const studioWash =
  "radial-gradient(120% 70% at 50% 0%,rgba(255,220,170,0.55) 0%,rgba(255,220,170,0) 60%),";

// Direct Unsplash CDN URLs. Free for commercial use, no attribution required
// (Unsplash License). The ?auto=format&fit=crop&w= params are processed by
// Unsplash's edge — Next/Image then re-optimizes for the actual device.
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  {
    slug: "ivory-knot",
    name: "Ivory Knot",
    tagline: "Hand-knotted freshwater pearls",
    description:
      "A whisper-soft strand of freshwater pearls, hand-knotted on silk. Designed to layer, made to wear every day.",
    price: 78,
    materials: ["Freshwater pearl", "Silk thread", "14k gold-fill clasp"],
    collection: "everyday",
    image: u("photo-1633810542706-90e5ff7557be"),
    swatch: `${studioWash}linear-gradient(180deg,#7a4d2c 0%,#3d2415 70%,#1a0e08 100%)`,
  },
  {
    slug: "gilded-thread",
    name: "Gilded Thread",
    tagline: "Brushed gold bar on woven cord",
    description:
      "A slim brushed gold bar suspended on a woven black cord. Minimal. Quietly confident. The bracelet you forget you're wearing.",
    price: 64,
    materials: ["18k gold vermeil", "Waxed cotton cord"],
    collection: "everyday",
    image: u("photo-1602173574767-37ac01994b2a"),
    swatch: `${studioWash}linear-gradient(180deg,#5a3418 0%,#2a1810 60%,#0f0805 100%)`,
  },
  {
    slug: "lewa-signature",
    name: "Lewa Signature",
    tagline: "Engraved cuff in solid brass",
    description:
      "Our namesake cuff. Hand-finished solid brass with a discreet interior engraving. Adjustable to fit any wrist.",
    price: 142,
    materials: ["Solid brass", "Hand-engraved interior"],
    collection: "signature",
    // Hero shot — gold cuff on hand, dramatic shadow.
    image: u("photo-1597006354623-4cf80ed86522"),
    swatch: `${studioWash}linear-gradient(180deg,#8a5a30 0%,#4a2e18 60%,#1c0f08 100%)`,
  },
  {
    slug: "midnight-bead",
    name: "Midnight Bead",
    tagline: "Onyx and gold accents",
    description:
      "Faceted matte onyx beads punctuated by hammered gold spacers. A grounding piece that pairs beautifully stacked.",
    price: 96,
    materials: ["Matte onyx", "14k gold-fill"],
    collection: "signature",
    image: u("photo-1595754069947-f9896fed5b38"),
    swatch: `${studioWash}linear-gradient(180deg,#3a2418 0%,#1a0f0a 60%,#080503 100%)`,
  },
  {
    slug: "amber-strand",
    name: "Amber Strand",
    tagline: "Baltic amber, oxidised silver",
    description:
      "Sun-warmed Baltic amber set against oxidised sterling. Limited run — each piece is one of fifty.",
    price: 188,
    materials: ["Baltic amber", "Oxidised sterling silver"],
    collection: "limited",
    image: u("photo-1638617501607-5dfb8b079ebf"),
    swatch: `${studioWash}linear-gradient(180deg,#a06436 0%,#5a3418 60%,#1c0f08 100%)`,
  },
  {
    slug: "linen-charm",
    name: "Linen Charm",
    tagline: "Adjustable cord with gold disc",
    description:
      "A linen-wrapped cord with a single hand-stamped gold disc. Adjustable length. Made to be gifted.",
    price: 52,
    materials: ["Linen cord", "14k gold-fill disc"],
    collection: "everyday",
    image: u("photo-1652336967223-5eb146dabed8"),
    swatch: `${studioWash}linear-gradient(180deg,#6e4628 0%,#341e10 60%,#100806 100%)`,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function listProducts(): Product[] {
  return PRODUCTS;
}

export function formatPrice(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}
