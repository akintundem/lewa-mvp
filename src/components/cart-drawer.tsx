"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./cart-provider";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal, clear } = useCart();

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping bag"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-xl tracking-[0.15em] uppercase">
            Your bag
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm tracking-wide uppercase gold-underline"
            aria-label="Close bag"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted">
              <p>Your bag is empty.</p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="mt-4 gold-underline tracking-wide uppercase text-foreground"
              >
                Browse bracelets
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => (
                <li
                  key={line.slug}
                  className="flex items-start gap-4 border-b border-line/70 pb-6"
                >
                  <div className="flex-1">
                    <p className="font-display text-lg">{line.name}</p>
                    <p className="mt-1 text-xs tracking-wide uppercase text-muted">
                      {formatPrice(line.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-sm">
                      <button
                        type="button"
                        onClick={() => setQty(line.slug, line.qty - 1)}
                        className="h-7 w-7 border border-foreground/20 hover:border-foreground"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="tabular-nums" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(line.slug, line.qty + 1)}
                        className="h-7 w-7 border border-foreground/20 hover:border-foreground"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        className="ml-auto text-xs tracking-wide uppercase text-muted gold-underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm tabular-nums">
                    {formatPrice(line.price * line.qty)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="tracking-wide uppercase text-muted">
                Subtotal
              </span>
              <span className="font-display text-lg tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              type="button"
              disabled
              className="mt-4 w-full bg-foreground py-3 text-xs tracking-[0.25em] uppercase text-background opacity-90 hover:opacity-100 disabled:cursor-not-allowed"
              title="Checkout coming soon"
            >
              Checkout (coming soon)
            </button>
            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-xs tracking-wide uppercase text-muted gold-underline"
            >
              Clear bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
