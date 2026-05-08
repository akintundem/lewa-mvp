import Link from "next/link";

export const metadata = {
  title: "Our story",
  description:
    "Lewa is a small studio making considered bracelets in tight, hand-finished editions.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs tracking-[0.3em] uppercase text-muted">
        Our story
      </p>
      <h1 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
        A small studio,{" "}
        <span className="font-italic-accent italic">a tight edit</span>, a
        piece you keep.
      </h1>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85">
        <p>
          Lewa began with a simple frustration: we couldn&apos;t find a
          bracelet that we wanted to wear every day. Most pieces were either
          too precious to leave on, or too disposable to keep.
        </p>
        <p>
          So we started making them ourselves. Solid metals instead of
          plating. Real stones, not resin. Cords woven by hand. Clasps that
          actually hold.
        </p>
        <p>
          Each release is small — usually a few dozen of any one piece —
          because we finish them ourselves and we&apos;d like to sleep at some
          point. When something sells out, it stays out for a while.
        </p>
        <p>
          We design for layering: every piece in the edit is sized and toned
          to sit comfortably alongside the others. Wear one, wear five, swap
          them around. They&apos;re yours now.
        </p>
      </div>

      <div className="mt-12 border-t border-line/70 pt-8">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">
          Materials &amp; care
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
          <li>— Solid brass, sterling silver, and 14k gold-fill where noted.</li>
          <li>— Real freshwater pearls, onyx, and Baltic amber.</li>
          <li>— Waxed cotton and linen cords, hand-knotted on silk.</li>
          <li>— Care guide ships with every piece. Repairs are free for a year.</li>
        </ul>
      </div>

      <div className="mt-12">
        <Link
          href="/shop"
          className="bg-foreground px-6 py-3 text-xs tracking-[0.25em] uppercase text-background transition hover:bg-accent-strong"
        >
          See the edit
        </Link>
      </div>
    </article>
  );
}
