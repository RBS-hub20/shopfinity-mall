"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { CATEGORY_PILLS, NAV_LINKS } from "@/lib/content";
import { useStore } from "@/store/useStore";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const query = useStore((s) => s.query);
  const setQuery = useStore((s) => s.setQuery);
  const activeCategory = useStore((s) => s.activeCategory);
  const setActiveCategory = useStore((s) => s.setActiveCategory);
  const wishlist = useStore((s) => s.wishlist);
  const cart = useStore((s) => s.cart);
  const setCartOpen = useStore((s) => s.setCartOpen);

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      {/* Top bar */}
      <div className="container-x flex h-16 items-center gap-3 sm:gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Shopfinity home">
          <Image
            src="/logo-transparent.png"
            alt="Shopfinity"
            width={160}
            height={160}
            priority
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-lg font-extrabold tracking-tight text-brand-red">
              Shopfinity
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-gray">
              Endless Finds. One Shop
            </span>
          </span>
        </Link>

        {/* Search */}
        <div className="relative mx-auto hidden w-full max-w-md md:block">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tech gadgets, ideas and more"
            aria-label="Search products"
            className="h-10 w-full rounded-full border border-gray-200 bg-brand-light pl-5 pr-12 text-sm outline-none transition placeholder:text-brand-gray focus:border-brand-red focus:bg-white"
          />
          <button
            aria-label="Search"
            className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-black text-white transition hover:bg-brand-red"
          >
            <Search size={15} />
          </button>
        </div>

        {/* Right nav */}
        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              className={`relative text-sm font-medium transition hover:text-brand-red ${
                i === 0 ? "text-brand-red" : "text-brand-black"
              }`}
            >
              {link}
              {i === 0 && (
                <span className="absolute -bottom-[22px] left-0 h-[2px] w-full rounded bg-brand-red" />
              )}
            </button>
          ))}
          <button
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-brand-black transition hover:border-brand-red hover:text-brand-red"
          >
            <User size={17} />
          </button>
        </nav>

        <button
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          className="relative ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:border-brand-red hover:text-brand-red lg:ml-0"
        >
          <ShoppingCart size={17} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 lg:hidden"
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* Sub header */}
      <div className="border-t border-gray-100">
        <div className="container-x flex flex-col gap-1 py-2 sm:h-12 sm:flex-row sm:items-center sm:gap-2 sm:py-0">
          <div className="no-scrollbar order-2 flex flex-1 items-center gap-1 overflow-x-auto sm:order-1">
            {CATEGORY_PILLS.map((pill) => {
              const active = activeCategory === pill;
              return (
                <button
                  key={pill}
                  onClick={() => setActiveCategory(active ? null : pill)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                    active
                      ? "bg-brand-red text-white"
                      : "text-brand-black hover:bg-brand-light hover:text-brand-red"
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          <div className="order-1 flex shrink-0 items-center gap-2 sm:order-2">
            <CurrencyToggle />
            <button
              aria-label="Wishlist"
              className="relative flex h-8 w-8 items-center justify-center rounded-full text-brand-black transition hover:text-brand-red"
            >
              <Heart size={17} />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <div className="relative mb-3 md:hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for tech gadgets, ideas and more"
              className="h-10 w-full rounded-full border border-gray-200 bg-brand-light pl-4 pr-10 text-sm outline-none focus:border-brand-red focus:bg-white"
            />
            <Search size={15} className="absolute right-4 top-3 text-brand-gray" />
          </div>
          <div className="flex flex-wrap gap-3">
            {NAV_LINKS.map((link) => (
              <button key={link} className="rounded-full bg-brand-light px-4 py-2 text-sm font-medium">
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
