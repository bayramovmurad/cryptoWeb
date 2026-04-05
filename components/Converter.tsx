"use client";

import { useMemo, useState } from "react";
import { CoinItem } from "@/types/crypto";
import { formatCurrency } from "@/lib/utils";

type Props = {
  coin: CoinItem | null;
};

function Converter({ coin }: Props) {
  const [amount, setAmount] = useState("1");

  const total = useMemo(() => {
    if (!coin) return 0;
    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount)) return 0;
    return numericAmount * coin.current_price;
  }, [amount, coin]);

return (
  <section className="p-5 rounded-[20px] bg-[rgba(18,25,45,0.86)] border border-white/10 backdrop-blur shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-[22px]">Converter</h2>
      <span className="text-[#aab4d4] text-sm">Live USD estimate</span>
    </div>

    {!coin ? (
      <p className="text-[#b8c0d9]">Select a coin to start converting.</p>
    ) : (
      <>
        <label className="block mb-2 text-[#bac3de]">
          Amount ({coin.symbol.toUpperCase()})
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full h-12 rounded-[14px] border border-white/10 bg-[#0f172a] px-3"
        />

        <div className="mt-4 p-4 rounded-[16px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
          <span className="block text-[#c3ccdf] mb-1">USD Value</span>
          <strong className="text-[28px]">{formatCurrency(total)}</strong>
        </div>
      </>
    )}
  </section>
);
}

export default Converter;