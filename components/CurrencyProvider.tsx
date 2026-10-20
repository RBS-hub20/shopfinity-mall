"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useStore } from "@/store/useStore";
import {
  CURRENCY_META,
  USD_TO_PHP,
  convert,
  formatPrice,
  isApproximate,
  type Currency,
} from "@/lib/currency";

type CurrencyContextValue = {
  currency: Currency;
  rate: number;
  meta: (typeof CURRENCY_META)[Currency];
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  format: (priceUSD: number) => string;
  convert: (priceUSD: number) => number;
  approximate: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

/**
 * Global currency context. State lives in the zustand store so non-React
 * consumers can read it too, while components use the familiar context API.
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useStore((s) => s.currency);
  const setCurrency = useStore((s) => s.setCurrency);
  const toggleCurrency = useStore((s) => s.toggleCurrency);

  const format = useCallback((priceUSD: number) => formatPrice(priceUSD, currency), [currency]);
  const toLocal = useCallback((priceUSD: number) => convert(priceUSD, currency), [currency]);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      rate: USD_TO_PHP,
      meta: CURRENCY_META[currency],
      setCurrency,
      toggleCurrency,
      format,
      convert: toLocal,
      approximate: isApproximate(currency),
    }),
    [currency, setCurrency, toggleCurrency, format, toLocal],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
