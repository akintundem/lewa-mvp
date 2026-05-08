"use client";

// "Our Works" carousel — a curved, tilted, depth-aware row of portrait cards.
// The hero card sits centered, upright, and largest. Neighbors fan outward:
// each card's transform is a pure function of its signed distance from the
// hero (rotate / scale / translateY / opacity / blur), so prev/next just
// changes heroIndex and CSS transitions handle the slide-rotate-scale motion.

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
  heroTag?: string;
};

// Layout knobs — tuned for the "floating fan" look. Side cards slot in next
// to the hero; far cards recede with reduced scale + opacity + blur.
const HERO_W = 280;          // px, hero card width (mobile)
const HERO_W_MD = 320;       // px, hero width on md+
const HERO_H_RATIO = 1.35;   // tall portrait
const STEP_X = 200;          // px between card centers on mobile
const STEP_X_MD = 230;       // px between card centers on md+
const TILT_PER_STEP = 7;     // deg
const MAX_TILT = 14;         // deg cap
const SCALE_FALLOFF = 0.12;  // per step
const MIN_SCALE = 0.62;
const Y_LIFT = 14;           // px parabolic lift per |step|^2
const OPACITY_FALLOFF = 0.18;
const MIN_OPACITY = 0.35;

export function WorksCarousel({ products, heroTag = "Bracelets" }: Props) {
  const middleIndex = Math.floor(products.length / 2);
  const [heroIndex, setHeroIndex] = useState(middleIndex);
  const [isMd, setIsMd] = useState(false);

  // Track md breakpoint so we can pick the right step/width without duplicating
  // every transform in two class strings.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMd(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const step = (dir: -1 | 1) => {
    setHeroIndex((i) => Math.min(Math.max(i + dir, 0), products.length - 1));
  };

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const heroW = isMd ? HERO_W_MD : HERO_W;
  const heroH = Math.round(heroW * HERO_H_RATIO);
  const stepX = isMd ? STEP_X_MD : STEP_X;
  // Stage height needs room for the tallest card plus the hero's lift.
  const stageH = heroH + 40;

  // Pure function of signed distance d from hero. Side cards lean *away* from
  // the hero (left side rotates left-negative, right side rotates positive),
  // which reads as a fan. Y follows |d|^2 so the row curves into a gentle smile.
  const transformFor = (d: number) => {
    const ad = Math.abs(d);
    const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, d * TILT_PER_STEP));
    const scale = Math.max(MIN_SCALE, 1 - ad * SCALE_FALLOFF);
    const y = ad * ad * Y_LIFT;
    const x = d * stepX;
    const opacity = Math.max(MIN_OPACITY, 1 - ad * OPACITY_FALLOFF);
    const blur = ad >= 3 ? 2 : ad >= 2 ? 1 : 0;
    const z = 100 - ad; // hero on top, neighbors stacked behind in order
    return { x, y, tilt, scale, opacity, blur, z };
  };

  return (
    <div className="relative">
      {/* Stage — cards are absolutely positioned around the centerline. */}
      <div
        className="relative mx-auto w-full overflow-hidden"
        style={{ height: stageH }}
      >
        {products.map((p, i) => {
          const d = i - heroIndex;
          const isHero = d === 0;
          const t = transformFor(d);
          return (
            <article
              key={p.slug}
              onClick={() => setHeroIndex(i)}
              aria-current={isHero ? "true" : undefined}
              className={`absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-3xl ring-1 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHero
                  ? "ring-white/25 shadow-[0_40px_80px_-25px_rgba(0,0,0,0.8)]"
                  : "ring-white/10 hover:ring-white/25"
              }`}
              style={{
                width: heroW,
                height: heroH,
                // Order matters: translate to slot, lift on the curve, scale,
                // then rotate around the card's own center.
                transform: `translate(-50%, -50%) translate(${t.x}px, ${t.y}px) scale(${t.scale}) rotate(${t.tilt}deg)`,
                opacity: t.opacity,
                zIndex: t.z,
                filter: t.blur ? `blur(${t.blur}px)` : undefined,
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
            >
              {/* Photo */}
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 768px) 320px, 280px"
                className="object-cover"
                priority={isHero}
              />

              {/* Warm light wash + bottom shadow for caption legibility */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(110% 50% at 50% 0%,rgba(255,220,170,0.18) 0%,rgba(255,220,170,0) 55%),linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0.65) 100%)",
                }}
              />

              {/* Hero pill tag */}
              {isHero && (
                <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/55 px-3.5 py-1.5 text-[10px] tracking-[0.18em] text-white backdrop-blur-md">
                  {heroTag}
                </span>
              )}

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-6 px-4 text-center">
                <p className="text-[10.5px] font-medium tracking-[0.22em] text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  THE {p.name.toUpperCase()}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom row — index dots on the left, circular controls on the right */}
      <div className="mt-4 flex items-center justify-between">
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setHeroIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === heroIndex ? "w-6 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/85 transition hover:border-white hover:text-white disabled:opacity-30"
            disabled={heroIndex === 0}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white/85 transition hover:border-white hover:text-white disabled:opacity-30"
            disabled={heroIndex === products.length - 1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
