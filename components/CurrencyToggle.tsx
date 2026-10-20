"use client";

import { useCurrency } from "@/components/CurrencyProvider";
import type { Currency } from "@/lib/currency";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "PHP", label: "₱ PHP" },
  { value: "USD", label: "$ USD" },
];

export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      role="radiogroup"
      aria-label="Currency"
      className={`relative flex items-center rounded-full border border-gray-200 bg-brand-light p-0.5 ${className}`}
    >
      {OPTIONS.map((opt) => {
        const active = currency === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            onClick={() => setCurrency(opt.value)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              active ? "bg-brand-red text-white shadow-sm" : "text-brand-gray hover:text-brand-black"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
