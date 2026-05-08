"use client";

// Retail-grade header: announcement bar lives above this in the layout.
// Three-section layout (nav · centered logo · utility) on desktop,
// hamburger / centered logo / bag on mobile — the H&M / COS pattern.

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart-provider";

const PRIMARY_NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?collection=signature", label: "Signature" },
  { href: "/shop?collection=limited", label: "Limited" },
  { href: "/about", label: "Story" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Slim the header once the user scrolls past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line/70 bg-background/85 backdrop-blur transition-[height] ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.04)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        {/* LEFT — desktop primary nav, mobile hamburger */}
        <div className="flex flex-1 items-center gap-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden"
          >
            <Icon name="menu" />
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="caps text-[11px] gold-underline text-foreground/85 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER — logo */}
        <Link
          href="/"
          aria-label="Lewa home"
          className="absolute left-1/2 -translate-x-1/2 select-none"
        >
          <span className="font-serif text-2xl tracking-[0.32em] uppercase md:text-[28px]">
            Lewa
          </span>
        </Link>

        {/* RIGHT — utility cluster */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <button
            type="button"
            aria-label="Search"
            className="hidden text-foreground/80 hover:text-foreground md:inline-flex"
          >
            <Icon name="search" />
          </button>
          <Link
            href="#"
            aria-label="Account"
            className="hidden text-foreground/80 hover:text-foreground md:inline-flex"
          >
            <Icon name="user" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
            className="relative inline-flex items-center text-foreground/85 hover:text-foreground"
          >
            <Icon name="bag" />
            {count > 0 && (
              <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium tabular-nums text-background">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-50 bg-background transition-opacity duration-200 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-6">
          <span className="font-serif text-xl tracking-[0.32em] uppercase">
            Lewa
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="caps text-[11px]"
          >
            Close
          </button>
        </div>
        <nav className="flex flex-col px-6 py-8">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-line py-5 font-serif text-2xl"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 flex gap-6 caps text-[11px] text-muted">
            <a href="#">Help</a>
            <a href="#">Stores</a>
            <a href="#">Account</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ─────── Inline icon set (no dependency on a UI lib) ─────── */
function Icon({ name }: { name: "menu" | "search" | "user" | "bag" }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </svg>
      );
    case "bag":
      return (
        <svg {...common}>
          <path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 8Z" />
          <path d="M9 8a3 3 0 0 1 6 0" />
        </svg>
      );
  }
}
