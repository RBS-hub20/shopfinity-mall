export type Currency = "PHP" | "USD";

/** Base prices are stored in USD. Demo conversion rate. */
export const USD_TO_PHP = 58.5;

export const CURRENCY_META: Record<Currency, { symbol: string; code: string; label: string }> = {
  PHP: { symbol: "₱", code: "PHP", label: "₱ PHP" },
  USD: { symbol: "$", code: "USD", label: "$ USD" },
};

export function convert(priceUSD: number, currency: Currency): number {
  return currency === "PHP" ? priceUSD * USD_TO_PHP : priceUSD;
}

/** ₱17,549.42 / $299.99 */
export function formatPrice(priceUSD: number, currency: Currency): string {
  const value = convert(priceUSD, currency);
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${CURRENCY_META[currency].symbol}${formatted}`;
}

/** PHP prices are converted, so they carry an "Approx." hint. */
export function isApproximate(currency: Currency): boolean {
  return currency === "PHP";
}
