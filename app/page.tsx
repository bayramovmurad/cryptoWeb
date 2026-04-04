"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import StatusBox from "@/components/StatusBox";
import CoinList from "@/components/CoinList";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { filterCoins } from "@/lib/utils";
import { CoinItem } from "@/types/crypto";

export default function HomePage() {
  const { coins, loading, error, reload } = useCryptoPrices(30000);
  const [query, setQuery] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<CoinItem | null>(null);

  const filteredCoins = useMemo(() => {
    return filterCoins(coins, query);
  }, [coins, query]);

  useEffect(() => {
    if (!selectedCoin && coins.length > 0) {
      setSelectedCoin(coins[0]);
      return;
    }

    if (selectedCoin) {
      const updated = coins.find((coin) => coin.id === selectedCoin.id);
      if (updated) setSelectedCoin(updated);
    }
  }, [coins, selectedCoin]);

  return (
    <main>
      <section>
        <div>
          <p>Crypto Ticker & Converter</p>
          <h1>Track live crypto prices without freezing the UI</h1>
          <p>
            Fast search, real-time updates, clean architecture and instant USD
            conversion.
          </p>
        </div>

        <div>
          <span>Refresh</span>
          <strong>30s</strong>
        </div>
      </section>

      <section>
        <div>
          <div>
            <div>
              <h2>Market List</h2>
              <button onClick={reload}>Refresh now</button>
            </div>

            <SearchBar value={query} onChange={setQuery} />
          </div>

          {loading ? (
            <StatusBox
              type="loading"
              message="Loading latest crypto prices..."
            />
          ) : error ? (
            <StatusBox
              type="error"
              message={error}
              action={<button onClick={reload}>Try again</button>}
            />
          ) : filteredCoins.length === 0 ? (
            <StatusBox type="empty" message="No coins found for your search." />
          ) : (
            <CoinList
              coins={filteredCoins}
              selectedCoin={selectedCoin}
              onSelect={setSelectedCoin}
            />
          )}
        </div>
      </section>
    </main>
  );
}
