// Multi-column retail footer modeled on H&M / COS / Mejuri.
// Five-column desktop grid: brand, Shop, Help, Studio, Follow.

import Link from "next/link";

const COLS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { href: "/shop", label: "All bracelets" },
      { href: "/shop?collection=everyday", label: "Everyday" },
      { href: "/shop?collection=signature", label: "Signature" },
      { href: "/shop?collection=limited", label: "Limited" },
      { href: "/shop", label: "Gift cards" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "#", label: "Shipping" },
      { href: "#", label: "Returns" },
      { href: "#", label: "Size guide" },
      { href: "#", label: "Care guide" },
      { href: "#", label: "Repairs" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { href: "/about", label: "Our story" },
      { href: "#", label: "Materials" },
      { href: "#", label: "Sustainability" },
      { href: "#", label: "Press" },
      { href: "#", label: "Wholesale" },
    ],
  },
  {
    heading: "Follow",
    links: [
      { href: "#", label: "Instagram" },
      { href: "#", label: "Pinterest" },
      { href: "#", label: "TikTok" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-12 md:gap-y-0">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4">
            <p className="font-serif text-2xl tracking-[0.32em] uppercase">
              Lewa
            </p>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-background/70">
              Quietly considered bracelets, hand-finished in small batches.
            </p>
            <p className="mt-8 caps text-[10px] text-background/55">
              Studio
            </p>
            <p className="mt-2 text-[14px] text-background/85">
              hello@lewa.studio
            </p>
            <p className="text-[14px] text-background/85">+1 (555) 014-3322</p>
          </div>

          {COLS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <p className="caps text-[10px] text-background/55">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3 text-[14px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-background/85 gold-underline hover:text-background"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-16 flex flex-col gap-4 border-t border-background/15 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 caps text-[10px] text-background/55">
            <span>🇺🇸 United States · USD</span>
            <span aria-hidden>·</span>
            <span>English</span>
          </div>

          <div className="flex items-center gap-4 text-background/70">
            {["VISA", "MC", "AMEX", "PAYPAL", "APAY", "GPAY"].map((p) => (
              <span
                key={p}
                className="rounded-sm border border-background/25 px-1.5 py-1 text-[9px] tracking-[0.18em]"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 caps text-[10px] text-background/55">
            <a href="#" className="gold-underline">Privacy</a>
            <a href="#" className="gold-underline">Terms</a>
            <a href="#" className="gold-underline">Cookies</a>
            <span>© {new Date().getFullYear()} Lewa Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
