"use client";

import { useMemo, useState } from "react";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import SearchBar from "@/components/SearchBar";
import { filterCoins } from "@/lib/utils";

export default function Page() {
  const { coins, loading, error } = useCryptoPrices(30000);
  const [query, setQuery] = useState("");

  const filteredCoins = useMemo(() => {
    return filterCoins(coins, query);
  }, [coins, query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />

      <div>
        {filteredCoins.map((c) => (
          <div key={c.id}>
            {c.name} - ${c.current_price}
          </div>
        ))}
      </div>
    </div>
  );
}
