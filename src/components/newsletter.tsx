"use client";

// Newsletter signup band — visual only for the MVP.
// Wire to ESP (Klaviyo / Mailchimp / Beehiiv) later.

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="eyebrow">The list</p>
          <h2 className="heading-lg mt-3">First look at every drop.</h2>
          <p className="lead mt-4 max-w-md">
            Quiet, infrequent emails. New pieces before they go live, studio
            notes, and 10% off your first order.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: POST to /api/newsletter once the ESP is wired.
            setDone(true);
          }}
          className="flex flex-col justify-end gap-4 md:col-span-7"
        >
          <label htmlFor="newsletter-email" className="caps text-muted">
            Email address
          </label>
          <div className="flex border-b border-foreground/30 focus-within:border-foreground">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent py-3 text-base outline-none placeholder:text-muted/70"
            />
            <button
              type="submit"
              className="caps shrink-0 px-2 py-3 text-foreground hover:text-accent-strong"
            >
              Subscribe →
            </button>
          </div>
          <p
            className={`text-xs text-muted transition-opacity ${
              done ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            Thanks — you&apos;re on the list.
          </p>
        </form>
      </div>
    </section>
  );
}
