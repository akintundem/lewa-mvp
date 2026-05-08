import { ProductCard } from "@/components/product-card";
import { listProducts, type Product } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Browse the full Lewa edit of hand-finished bracelets.",
};

const COLLECTIONS: { id: Product["collection"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "everyday", label: "Everyday" },
  { id: "signature", label: "Signature" },
  { id: "limited", label: "Limited" },
];

// Server component — reads `collection` from the URL search params.
// In Next.js 16, `searchParams` is a Promise.
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  const all = listProducts();
  const filtered =
    collection && collection !== "all"
      ? all.filter((p) => p.collection === collection)
      : all;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="border-b border-line/70 pb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">
          The edit
        </p>
        <h1 className="font-display mt-2 text-4xl md:text-5xl">
          All <span className="font-italic-accent italic">bracelets</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          A small, considered catalogue. Each piece is finished by hand in our
          studio.
        </p>
      </div>

      {/* Collection filter — plain anchor links so it works without JS. */}
      <nav className="mt-8 flex flex-wrap gap-2 text-xs tracking-[0.2em] uppercase">
        {COLLECTIONS.map((c) => {
          const active =
            (c.id === "all" && !collection) || collection === c.id;
          const href = c.id === "all" ? "/shop" : `/shop?collection=${c.id}`;
          return (
            <a
              key={c.id}
              href={href}
              className={`border px-4 py-2 transition ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {c.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">
          Nothing in this collection yet. Check back soon.
        </p>
      )}
    </section>
  );
}
