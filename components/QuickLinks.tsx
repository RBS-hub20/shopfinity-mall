"use client";

import { ArrowRight, Headphones, Smartphone, Speaker, Tag, Watch } from "lucide-react";
import { QUICK_LINKS } from "@/lib/content";
import { useStore } from "@/store/useStore";

const ICONS = { Headphones, Speaker, Watch, Smartphone, Tag } as const;

export function QuickLinks() {
  const setActiveCategory = useStore((s) => s.setActiveCategory);
  const activeCategory = useStore((s) => s.activeCategory);

  return (
    <section className="container-x pt-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {QUICK_LINKS.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS];
          const active = activeCategory === item.category;
          return (
            <button
              key={item.title}
              onClick={() => setActiveCategory(active ? null : item.category)}
              className={`group card flex items-center gap-3 px-4 py-3.5 text-left transition hover:-translate-y-0.5 hover:shadow-hover ${
                active ? "border-brand-red" : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand-black transition group-hover:bg-brand-red group-hover:text-white">
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold">{item.title}</span>
                <span className="block truncate text-[11px] text-brand-gray">{item.subtitle}</span>
              </span>
              <span className="arrow-dot">
                <ArrowRight size={13} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
