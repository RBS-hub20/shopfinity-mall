"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { Price } from "@/components/Price";
import type { Product } from "@/lib/products";
import { useStore } from "@/store/useStore";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToCart = useStore((s) => s.addToCart);
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-hover"
    >
      <div className="relative aspect-square bg-brand-light">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          className="object-contain p-3 transition duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-bold text-white">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => addToCart(product.id)}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-2 right-2 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-brand-black text-white opacity-0 shadow transition hover:bg-brand-red group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={15} />
        </button>
      </div>

      <div className="space-y-1.5 p-3">
        <h3 className="line-clamp-2 min-h-[32px] text-[12px] font-semibold leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <Price priceUSD={product.priceUSD} className="text-[13px] font-extrabold" />
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={wished}
            aria-label={`${wished ? "Remove from" : "Add to"} wishlist`}
            className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-brand-gray transition hover:text-brand-red"
          >
            <Heart
              size={13}
              className={wished ? "fill-brand-red text-brand-red" : ""}
            />
            {wished ? product.likes + 1 >= 1000
              ? `${((product.likes + 1) / 1000).toFixed(1)}k`
              : product.likes + 1
              : product.likesLabel}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
