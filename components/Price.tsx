"use client";

import { useCurrency } from "@/components/CurrencyProvider";

export function Price({
  priceUSD,
  className = "",
  approxClassName = "",
  showApprox = true,
}: {
  priceUSD: number;
  className?: string;
  approxClassName?: string;
  showApprox?: boolean;
}) {
  const { format, approximate } = useCurrency();

  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={className}>{format(priceUSD)}</span>
      {showApprox && approximate ? (
        <span className={`text-[10px] font-medium text-brand-gray ${approxClassName}`}>Approx.</span>
      ) : null}
    </span>
  );
}
