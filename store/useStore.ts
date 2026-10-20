"use client";

import { create } from "zustand";
import type { Currency } from "@/lib/currency";
import { PRODUCTS, type Product } from "@/lib/products";

export type CartLine = { product: Product; qty: number };

type ShopState = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;

  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;

  cart: CartLine[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  cartCount: () => number;
  cartTotalUSD: () => number;

  query: string;
  setQuery: (q: string) => void;
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
};

export const useStore = create<ShopState>((set, get) => ({
  currency: "PHP",
  setCurrency: (currency) => set({ currency }),
  toggleCurrency: () => set((s) => ({ currency: s.currency === "PHP" ? "USD" : "PHP" })),

  wishlist: [],
  toggleWishlist: (id) =>
    set((s) => ({
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
    })),
  isWished: (id) => get().wishlist.includes(id),

  cart: [],
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  addToCart: (id) =>
    set((s) => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product) return s;
      const existing = s.cart.find((l) => l.product.id === id);
      return {
        cart: existing
          ? s.cart.map((l) => (l.product.id === id ? { ...l, qty: l.qty + 1 } : l))
          : [...s.cart, { product, qty: 1 }],
        cartOpen: true,
      };
    }),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((l) => l.product.id !== id) })),
  changeQty: (id, delta) =>
    set((s) => ({
      cart: s.cart
        .map((l) => (l.product.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    })),
  cartCount: () => get().cart.reduce((n, l) => n + l.qty, 0),
  cartTotalUSD: () => get().cart.reduce((n, l) => n + l.qty * l.product.priceUSD, 0),

  query: "",
  setQuery: (query) => set({ query }),
  activeCategory: null,
  setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
