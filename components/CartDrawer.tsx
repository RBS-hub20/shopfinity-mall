"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { useStore } from "@/store/useStore";

export function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const changeQty = useStore((s) => s.changeQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const { format, approximate } = useCurrency();

  const total = cart.reduce((n, l) => n + l.qty * l.product.priceUSD, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-base font-extrabold">
                <ShoppingBag size={18} className="text-brand-red" /> Your Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-brand-light"
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <ShoppingBag size={30} className="text-gray-300" />
                  <p className="text-sm font-semibold">Your cart is empty</p>
                  <p className="text-xs text-brand-gray">Add a gadget to get started.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cart.map((line) => (
                    <li key={line.product.id} className="flex gap-3 rounded-xl border border-gray-200 p-2.5">
                      <div className="relative h-16 w-16 shrink-0 rounded-lg bg-brand-light">
                        <Image
                          src={line.product.image}
                          alt={line.product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1.5"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-semibold">{line.product.name}</p>
                        <p className="mt-0.5 text-[12px] font-extrabold text-brand-red">
                          {format(line.product.priceUSD)}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <button
                            onClick={() => changeQty(line.product.id, -1)}
                            aria-label="Decrease quantity"
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 hover:border-brand-red"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-5 text-center text-xs font-semibold">{line.qty}</span>
                          <button
                            onClick={() => changeQty(line.product.id, 1)}
                            aria-label="Increase quantity"
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 hover:border-brand-red"
                          >
                            <Plus size={11} />
                          </button>
                          <button
                            onClick={() => removeFromCart(line.product.id)}
                            aria-label={`Remove ${line.product.name}`}
                            className="ml-auto text-brand-gray transition hover:text-brand-red"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-gray-200 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="font-display text-lg font-extrabold">
                  {format(total)}
                  {approximate && (
                    <span className="ml-1.5 text-[10px] font-medium text-brand-gray">Approx.</span>
                  )}
                </span>
              </div>
              <button
                disabled={cart.length === 0}
                className="btn-red mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout
              </button>
              <p className="mt-2 text-center text-[10px] text-brand-gray">
                Demo only — no payment is processed.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
