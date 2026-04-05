"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import StatusBox from "@/components/StatusBox";
import CoinList from "@/components/CoinList";
import Converter from "@/components/Converter";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { filterCoins } from "@/lib/utils";
import { CoinItem } from "@/types/crypto";

export default function Page() {
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
      const updated = coins.find((c) => c.id === selectedCoin.id);
      if (updated) setSelectedCoin(updated);
    }
  }, [coins, selectedCoin]);

  return (
    <main className="min-h-screen p-8 bg-[#0b1020] text-white">
      {/* HERO */}
      <section className="mb-6 p-6 flex justify-between items-center gap-6 rounded-[20px] border border-white/10 bg-[rgba(18,25,45,0.86)] backdrop-blur shadow-xl max-md:flex-col max-md:items-start">
        <div>
          <p className="text-[#8ea3ff] text-sm mb-2">
            Crypto Ticker & Converter
          </p>
          <h1 className="text-3xl mb-2">Track live crypto prices</h1>
          <p className="text-[#b8c0d9]">
            Fast search, real-time updates, clean architecture.
          </p>
        </div>

        <div className="p-4 rounded-[18px] bg-gradient-to-br from-blue-600 to-purple-600 text-center">
          <span className="block text-sm">Refresh</span>
          <strong className="text-2xl">30s</strong>
        </div>
      </section>

      {/* GRID */}
      <section className="grid grid-cols-[2fr_1fr] gap-6 max-[980px]:grid-cols-1">
        <div className="flex flex-col gap-5">
          <div className="p-5 rounded-[20px] border border-white/10 bg-[rgba(18,25,45,0.86)]">
            <div className="flex justify-between mb-4">
              <h2>Market List</h2>
              <button
                onClick={reload}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                Refresh
              </button>
            </div>

            <SearchBar value={query} onChange={setQuery} />
          </div>

          {loading ? (
            <StatusBox type="loading" message="Loading..." />
          ) : error ? (
            <StatusBox type="error" message={error} />
          ) : filteredCoins.length === 0 ? (
            <StatusBox type="empty" message="No coins found" />
          ) : (
            <CoinList
              coins={filteredCoins}
              selectedCoin={selectedCoin}
              onSelect={setSelectedCoin}
            />
          )}
        </div>

        <Converter coin={selectedCoin} />
      </section>
    </main>
  );
}
