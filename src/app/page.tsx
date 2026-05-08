import Image from "next/image";
import Link from "next/link";
import { CategoryTile } from "@/components/category-tile";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { WorksCarousel } from "@/components/works-carousel";
import { listProducts } from "@/lib/products";

export default function HomePage() {
  const products = listProducts();
  const featured = products.slice(0, 4);

  // Hero category tiles — H&M-style "shop by collection" row.
  const categories = [
    {
      href: "/shop?collection=everyday",
      eyebrow: "01 — The everyday",
      title: "Pieces you’ll never take off",
      cta: "Shop everyday",
      image:
        "https://images.unsplash.com/photo-1534976618208-4833d5b57d08?auto=format&fit=crop&w=1200&q=80",
    },
    {
      href: "/shop?collection=signature",
      eyebrow: "02 — Signature",
      title: "Quietly statement",
      cta: "Shop signature",
      image:
        "https://images.unsplash.com/photo-1597006354623-4cf80ed86522?auto=format&fit=crop&w=1200&q=80",
    },
    {
      href: "/shop?collection=limited",
      eyebrow: "03 — Limited",
      title: "One of fifty",
      cta: "Shop limited",
      image:
        "https://images.unsplash.com/photo-1681091637303-807c90770c42?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          OUR WORKS — first thing on the page.
          Cloudy copper backdrop wrapping a deep matte-black inner panel.
          ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative isolate overflow-hidden"
        // Layered radial gradients build the cloudy copper backdrop
        // (top-left highlight + warm midtone + deep base).
        style={{
          background:
            "radial-gradient(60% 40% at 25% 8%,#ebb18a 0%,rgba(235,177,138,0) 60%)," +
            "radial-gradient(70% 60% at 82% 28%,#c2814b 0%,rgba(194,129,75,0) 65%)," +
            "radial-gradient(120% 90% at 50% 100%,#552a12 0%,#7a4422 50%,#a96936 100%)",
        }}
      >
        {/* Soft cloud / film-grain texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%,rgba(255,225,190,0.65) 0%,transparent 38%)," +
              "radial-gradient(circle at 72% 58%,rgba(70,32,12,0.55) 0%,transparent 42%)," +
              "radial-gradient(circle at 42% 82%,rgba(255,205,150,0.4) 0%,transparent 32%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-20 md:pt-20 md:pb-28">

          {/* Black inner panel with thin cream-peach hairline border */}
          <div className="relative mt-4 overflow-hidden rounded-[28px] bg-noir p-6 ring-1 ring-[#f0d6b8]/35 md:mt-14 md:p-12">
            {/* Inside-panel header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="font-italic-accent max-w-[22rem] text-[15px] leading-relaxed text-white/70 md:text-[17px]">
                Lewa&apos;s combination of statement and simplicity creates a
                look as quietly distinct as the woman who wears it.
              </p>
              <h2 className="font-serif text-[64px] font-medium leading-[0.92] tracking-[-0.01em] text-white md:text-[112px]">
                Our{" "}
                <span className="font-italic-accent italic">works</span>
              </h2>
            </div>

            {/* Carousel */}
            <div className="mt-8 md:mt-10">
              <WorksCarousel products={products} heroTag="Bracelets" />
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop" className="btn-primary">
              Shop the edit
            </Link>
            <Link
              href="/about"
              className="caps text-[11px] text-[#2a1409] gold-underline"
            >
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SHOP BY COLLECTION
          ════════════════════════════════════════════════════════════════ */}
      <section className="border-b border-line/70">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="flex items-end justify-between border-b border-line pb-8">
            <div>
              <p className="eyebrow">Collections</p>
              <h2 className="heading-lg mt-2">Shop by edit</h2>
            </div>
            <Link
              href="/shop"
              className="hidden caps text-[11px] gold-underline md:inline"
            >
              View all →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {categories.map((c) => (
              <CategoryTile
                key={c.href}
                href={c.href}
                image={c.image}
                eyebrow={c.eyebrow}
                title={c.title}
                cta={c.cta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURED — "Pieces we're wearing now"
          ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="flex items-end justify-between border-b border-line pb-8">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="heading-lg mt-2">Pieces we&apos;re wearing now</h2>
          </div>
          <Link
            href="/shop"
            className="hidden caps text-[11px] gold-underline md:inline"
          >
            Shop all bracelets →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          STORY STRIP — "Made in our studio"
          ════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1681091637303-807c90770c42?auto=format&fit=crop&w=1400&q=80"
              alt="Bracelets being finished by hand in the Lewa studio"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-24">
            <p className="eyebrow">Inside the studio</p>
            <h2 className="heading-lg mt-3">
              Hand-finished, in tight editions.
            </h2>
            <p className="lead mt-5">
              Every Lewa piece is finished in our studio — knotted, polished,
              engraved by hand. Editions stay small on purpose. When something
              sells out, we don&apos;t rush to remake it.
            </p>
            <div className="mt-8">
              <Link href="/about" className="btn-ghost">
                Read our story
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-6">
              {[
                ["Free shipping", "Over $120"],
                ["Free repairs", "First year"],
                ["30-day returns", "On full price"],
              ].map(([title, sub]) => (
                <div key={title}>
                  <p className="text-[13px] font-medium">{title}</p>
                  <p className="mt-1 text-[12px] text-muted">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          NEWSLETTER
          ════════════════════════════════════════════════════════════════ */}
      <Newsletter />
    </>
  );
}
