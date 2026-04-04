import { CoinItem } from "@/types/crypto";

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: value >= 1 ? 2 : 6,
    }).format(value);
}

export function formatPercent(value: number | null) {
    if (value === null || Number.isNaN(value)) return "—";
    return `${value.toFixed(2)}%`;
}

export function filterCoins(coins: CoinItem[], query: string) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return coins;

    return coins.filter((coin) =>
        coin.name.toLowerCase().includes(normalized) ||
        coin.symbol.toLowerCase().includes(normalized)
    );
}