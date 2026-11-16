export type LocalCurrency = "UGX" | "KES";

export type CurrencyAmount = {
  value: number;
  currency: LocalCurrency;
};

const LOCAL_UNITS_PER_USD: Record<LocalCurrency, number> = {
  UGX: 4131,
  KES: 130.05,
};

export const USD_RATE_NOTE =
  "Approximate rates as of Nov. 16, 2026: $1 = UGX 4,131 / KES 130.05.";

export function formatUsdEquivalent(amount: CurrencyAmount) {
  const usd = amount.value / LOCAL_UNITS_PER_USD[amount.currency];

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usd);
}
