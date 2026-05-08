"use client";

import { useCart } from "./cart-provider";
import type { Product } from "@/lib/products";

// Thin client wrapper so server-rendered product pages can ship a working
// "Add to bag" button without becoming client components themselves.
export function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() =>
        add({ slug: product.slug, name: product.name, price: product.price })
      }
      className="w-full bg-foreground py-4 text-xs tracking-[0.25em] uppercase text-background transition hover:bg-accent-strong"
    >
      Add to bag
    </button>
  );
}
