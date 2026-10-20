"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Truck } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "Discover. Shop. Upgrade.",
    titleA: "Latest Tech",
    titleB: "Gadgets",
    text: "Explore cutting-edge gadgets that upgrade your lifestyle.",
  },
  {
    eyebrow: "Sound. Perfected.",
    titleA: "Premium",
    titleB: "Audio",
    text: "Studio-grade headphones and earbuds built for every day.",
  },
  {
    eyebrow: "Smarter. Every day.",
    titleA: "Connected",
    titleB: "Living",
    text: "Smart home devices that make your space work for you.",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section className="container-x pt-5">
      <div className="relative overflow-hidden rounded-3xl bg-brand-light">
        {/* red panel on the right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] bg-brand-red md:block [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />

        <div className="relative grid items-center gap-6 px-6 py-10 sm:px-10 md:grid-cols-2 md:py-12">
          {/* Left copy */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 max-w-md"
          >
            <p className="text-sm font-semibold text-brand-red">{slide.eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              {slide.titleA}
              <br />
              <span className="text-brand-red">{slide.titleB}</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-gray">{slide.text}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#trending" className="btn-red">
                Shop Now <ArrowRight size={16} />
              </a>
              <a href="#ideas" className="btn-outline">
                Browse Collection
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-xs font-medium text-brand-gray">
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="text-base leading-none">🇵🇭</span> PH
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="text-base leading-none">🇺🇸</span> US
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-brand-red" /> Fast Shipping
              </span>
            </div>
          </motion.div>

          {/* Right visual */}
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              key={`img-${index}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-[520px]"
            >
              <Image
                src="/hero-products.svg"
                alt="Featured tech gadgets"
                width={720}
                height={460}
                priority
                className="h-auto w-full drop-shadow-xl"
              />
            </motion.div>

            <div className="absolute -top-2 right-0 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center shadow-lg sm:h-24 sm:w-24">
              <span className="px-2 text-[11px] font-bold leading-tight sm:text-xs">New Arrivals</span>
              <span className="mt-1 h-[2px] w-5 rounded bg-brand-red" />
            </div>
          </div>
        </div>

        {/* carousel controls */}
        <div className="absolute bottom-4 right-5 z-20 flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-black shadow transition hover:text-brand-red"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-brand-red" : "w-1.5 bg-white/80"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-black shadow transition hover:text-brand-red"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
