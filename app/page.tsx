"use client";

import { useEffect, useState } from "react";
import { fetchCryptoMarkets } from "@/lib/api";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";


export default function Page() {
  // const { coins, loading, error, reload } = useCryptoPrices(30000);
  const [coins, setCoins] = useState<any[]>([]);

  useEffect(() => {
    fetchCryptoMarkets().then(setCoins);
  }, []);

  return (
    <div>
      {coins.map((c) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}
