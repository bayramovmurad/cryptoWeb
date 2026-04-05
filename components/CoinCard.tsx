"use client";

import { memo } from "react";
import { CoinItem } from "@/types/crypto";
import { formatCurrency, formatPercent } from "@/lib/utils";
import Image from "next/image";

type Props = {
  coin: CoinItem;
  onSelect: (coin: CoinItem) => void;
  active: boolean;
};

function CoinCardComponent({ coin, onSelect, active }: Props) {
  const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0;

  return (
    <button
      onClick={() => onSelect(coin)}
      className={`border border-white/10 bg-[rgba(17,24,39,0.9)] rounded-[18px] p-[18px] text-left transition hover:-translate-y-[2px] hover:border-indigo-400 ${
        active
          ? "border-[#647cff] shadow-[0_0_0_3px_rgba(100,124,255,0.12)]"
          : ""
      }`}>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image width={50} height={50} src={coin.image} alt="img" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-[18px]">{coin.name}</h3>
            <span className="text-[13px] text-[#96a0bd]">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <span className="text-[13px] text-[#96a0bd]">
          #{coin.market_cap_rank}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <strong>{formatCurrency(coin.current_price)}</strong>
        <span
          className={
            isPositive ? "text-green-400 font-bold" : "text-red-400 font-bold"
          }>
          {formatPercent(coin.price_change_percentage_24h)}
        </span>
      </div>
    </button>
  );
}

export default memo(CoinCardComponent);
