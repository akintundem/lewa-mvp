"use client";

// Thin top-of-page strip cycling through promotional / trust messages.
// Standard fixture on premium retail sites (H&M, COS, Mejuri).

import { useEffect, useState } from "react";

const MESSAGES = [
  "Complimentary shipping on orders over $120",
  "New — The Spring edit is here",
  "Hand-finished in small batches · Free care guide with every order",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((prev) => (prev + 1) % MESSAGES.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6">
        {/* Left: locale switcher placeholder. Plain text label keeps it light. */}
        <span className="hidden caps text-[10px] opacity-70 sm:inline">
          🇺🇸 USD
        </span>

        {/* Center: cycling announcement. We render all three and animate
            opacity so the box height stays stable and there's no layout shift. */}
        <div className="relative flex h-full flex-1 items-center justify-center">
          {MESSAGES.map((m, idx) => (
            <span
              key={m}
              aria-hidden={idx !== i}
              className={`absolute caps text-[10px] transition-opacity duration-500 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            >
              {m}
            </span>
          ))}
        </div>

        {/* Right: helper links */}
        <div className="hidden items-center gap-5 sm:flex">
          <a
            href="#"
            className="caps text-[10px] opacity-70 hover:opacity-100"
          >
            Help
          </a>
          <a
            href="#"
            className="caps text-[10px] opacity-70 hover:opacity-100"
          >
            Stores
          </a>
        </div>
      </div>
    </div>
  );
}
