import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBag } from "@/components/add-to-bag";
import { formatPrice, getProduct, listProducts } from "@/lib/products";

// Pre-render every product page at build time.
export function generateStaticParams() {
  return listProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

// Next.js 16: `params` is a Promise and must be awaited.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <article className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <nav className="text-xs tracking-[0.2em] uppercase text-muted">
        <Link href="/shop" className="gold-underline">
          ← Back to shop
        </Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Product photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-line/70 bg-card">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Detail */}
        <div className="flex flex-col">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            {product.collection}
          </p>
          <h1 className="font-display mt-3 text-4xl md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm tracking-wide uppercase text-muted">
            {product.tagline}
          </p>

          <p className="mt-6 text-base leading-relaxed">
            {product.description}
          </p>

          <p className="font-display mt-8 text-2xl tabular-nums">
            {formatPrice(product.price)}
          </p>

          <div className="mt-6">
            <AddToBag product={product} />
          </div>

          <dl className="mt-10 border-t border-line/70 pt-6 text-sm">
            <dt className="text-xs tracking-[0.2em] uppercase text-muted">
              Materials
            </dt>
            <dd className="mt-2 leading-relaxed">
              {product.materials.join(" · ")}
            </dd>
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Each Lewa piece is hand-finished and ships in our linen pouch with a
            care card. Free shipping on orders over $120.
          </p>
        </div>
      </div>
    </article>
  );
}
