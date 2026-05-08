import Image from "next/image";
import Link from "next/link";

// Editorial category tile — large photo with overlay label and CTA.
// Used in the "Shop by collection" row on the landing page.

type Props = {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  cta?: string;
  /** Vertical position of the overlay text. */
  align?: "top" | "bottom";
  /** Override the natural aspect ratio. */
  className?: string;
};

export function CategoryTile({
  href,
  image,
  eyebrow,
  title,
  cta = "Shop now",
  align = "bottom",
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden bg-card ${className ?? "aspect-[3/4]"}`}
      aria-label={`${title} — ${cta}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* Bottom gradient for legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            align === "bottom"
              ? "linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,0.55) 100%)"
              : "linear-gradient(180deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0) 55%)",
        }}
      />

      <div
        className={`absolute inset-x-0 px-7 ${
          align === "bottom" ? "bottom-7" : "top-7"
        }`}
      >
        <p className="caps text-[10px] text-white/85">{eyebrow}</p>
        <h3 className="mt-1 font-serif text-[26px] leading-tight text-white md:text-[32px]">
          {title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-2 caps text-[11px] text-white">
          {cta}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
