import Image from "next/image";
import Link from "next/link";
import { type Product, formatPrice } from "@/lib/products";

// Retail-grade product card.
// - Two photos: primary + alternate; alternate cross-fades on hover.
// - Subtle hover zoom on the primary.
// - Collection tag pill, only shown for non-everyday lines.

const ALT_BY_SLUG: Record<string, string> = {
  // Quick second-image rotation using existing CDN photos. When you have
  // proper "alt" shots per product, replace this with a per-product field.
  "ivory-knot": "https://images.unsplash.com/photo-1597006354623-4cf80ed86522?auto=format&fit=crop&w=900&q=80",
  "gilded-thread": "https://images.unsplash.com/photo-1638617501607-5dfb8b079ebf?auto=format&fit=crop&w=900&q=80",
  "lewa-signature": "https://images.unsplash.com/photo-1633810542706-90e5ff7557be?auto=format&fit=crop&w=900&q=80",
  "midnight-bead": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
  "amber-strand": "https://images.unsplash.com/photo-1652336967223-5eb146dabed8?auto=format&fit=crop&w=900&q=80",
  "linen-charm": "https://images.unsplash.com/photo-1595754069947-f9896fed5b38?auto=format&fit=crop&w=900&q=80",
};

export function ProductCard({ product }: { product: Product }) {
  const alt = ALT_BY_SLUG[product.slug];
  const tag =
    product.collection === "limited"
      ? "Limited"
      : product.collection === "signature"
        ? "Signature"
        : null;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      aria-label={`${product.name} — ${formatPrice(product.price)}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-card">
        {/* Primary image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-0"
        />
        {/* Alternate image — fades in on hover */}
        {alt && (
          <Image
            src={alt}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        )}

        {/* Collection tag */}
        {tag && (
          <span className="absolute left-3 top-3 bg-card/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase backdrop-blur">
            {tag}
          </span>
        )}

        {/* Quick view chip — appears on hover */}
        <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-1 bg-foreground/90 px-3 py-2.5 text-center text-[10px] tracking-[0.22em] uppercase text-background opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Quick view
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-serif text-[17px] leading-tight">{product.name}</p>
          <p className="mt-1 truncate text-[12px] tracking-wide text-muted">
            {product.tagline}
          </p>
        </div>
        <p className="text-[13px] tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
