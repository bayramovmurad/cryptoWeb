import { CoinItem } from "@/types/crypto";

const API_BASE = "https://api.coingecko.com/api/v3";

export async function fetchCryptoMarkets(signal?: AbortSignal): Promise<CoinItem[]> {
    const url = `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=24h`;

    const res = await fetch(url, {
        method: "GET",
        signal,
        next: { revalidate: 0 },
        headers: {
            accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.map((item: any) => ({
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        image: item.image,
        current_price: item.current_price,
        price_change_percentage_24h: item.price_change_percentage_24h,
        market_cap_rank: item.market_cap_rank,
    }));
}