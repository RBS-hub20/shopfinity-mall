"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { IDEAS } from "@/lib/content";

export function Ideas() {
  return (
    <section id="ideas" className="container-x pt-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="section-title">Ideas for Your Next Upgrade</h2>
        <button className="text-xs font-semibold text-brand-red hover:underline">
          See more ideas
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {IDEAS.map((idea, i) => (
          <motion.button
            key={idea.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl text-left"
          >
            <Image
              src={idea.image}
              alt={idea.title}
              fill
              sizes="(max-width: 640px) 50vw, 220px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/75 to-transparent p-3">
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-bold text-white">{idea.title}</span>
                <span className="block text-[10px] text-white/75">{idea.count}</span>
              </span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/95 text-brand-black transition group-hover:bg-brand-red group-hover:text-white">
                <ChevronRight size={13} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
