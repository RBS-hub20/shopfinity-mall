"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, TRENDING } from "@/lib/products";
import { useStore } from "@/store/useStore";

export function TrendingProducts() {
  const [showAll, setShowAll] = useState(false);
  const query = useStore((s) => s.query);
  const activeCategory = useStore((s) => s.activeCategory);
  const setActiveCategory = useStore((s) => s.setActiveCategory);
  const setQuery = useStore((s) => s.setQuery);

  const filtering = query.trim().length > 0 || activeCategory !== null;

  const products = useMemo(() => {
    const base = showAll || filtering ? PRODUCTS : TRENDING;
    const q = query.trim().toLowerCase();

    return base.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCategory =
        !activeCategory ||
        (activeCategory === "Sale" ? p.badge === "Sale" : p.category === activeCategory);
      return matchesQuery && matchesCategory;
    });
  }, [showAll, filtering, query, activeCategory]);

  const heading = filtering ? "Search Results" : "Trending Products";

  return (
    <section id="trending" className="container-x pt-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="section-title">{heading}</h2>
          {filtering && (
            <p className="mt-1 text-xs text-brand-gray">
              {products.length} item{products.length === 1 ? "" : "s"}
              {activeCategory ? ` in ${activeCategory}` : ""}
              {query.trim() ? ` for “${query.trim()}”` : ""}
            </p>
          )}
        </div>

        {filtering ? (
          <button
            onClick={() => {
              setQuery("");
              setActiveCategory(null);
            }}
            className="text-xs font-semibold text-brand-red hover:underline"
          >
            Clear filters
          </button>
        ) : (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-xs font-semibold text-brand-red hover:underline"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 px-6 py-14 text-center">
          <SearchX className="text-brand-gray" size={28} />
          <p className="text-sm font-semibold">No products found</p>
          <p className="text-xs text-brand-gray">Try another keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
