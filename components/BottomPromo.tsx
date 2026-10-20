"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Gift } from "lucide-react";

export function BottomPromo() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="container-x pt-8">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        {/* Red deals card */}
        <div className="relative overflow-hidden rounded-2xl bg-brand-red px-6 py-7 text-white">
          <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
            <Gift size={22} />
          </span>
          <h3 className="mt-4 font-display text-xl font-extrabold leading-tight">
            Exclusive Deals
            <br />
            for You!
          </h3>
          <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-white/85">
            Save more on top-rated gadgets handpicked just for you.
          </p>
          <a
            href="#trending"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-red transition hover:bg-brand-light"
          >
            Shop Deals <ArrowRight size={15} />
          </a>
        </div>

        {/* Newsletter card */}
        <div className="card flex flex-col items-center gap-5 px-6 py-7 sm:flex-row sm:justify-between">
          <div className="w-full max-w-sm">
            <h3 className="font-display text-lg font-extrabold">Get the Latest Tech &amp; Deals</h3>
            <p className="mt-1.5 text-xs text-brand-gray">
              Join our newsletter and never miss an update.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              className="mt-4 flex items-center gap-2 rounded-full border border-gray-200 bg-brand-light p-1 pl-4"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-brand-gray"
              />
              <button type="submit" className="btn-red shrink-0 px-4 py-2 text-xs">
                {subscribed ? <Check size={15} /> : "Subscribe"}
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-[11px] font-medium text-brand-red">
                You&apos;re on the list — demo only, no email sent.
              </p>
            )}
          </div>

          <Image
            src="/envelope.svg"
            alt=""
            aria-hidden
            width={260}
            height={200}
            className="h-auto w-40 shrink-0 sm:w-48"
          />
        </div>
      </div>
    </section>
  );
}
