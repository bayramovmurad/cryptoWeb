"use client";

import { CoinItem } from "@/types/crypto";
import CoinCard from "./CoinCard";

type Props = {
  coins: CoinItem[];
  selectedCoin: CoinItem | null;
  onSelect: (coin: CoinItem) => void;
};

 function CoinList({ coins, selectedCoin, onSelect }: Props) {
  return (
    <div>
      {coins.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
          onSelect={onSelect}
          active={selectedCoin?.id === coin.id}
        />
      ))}
    </div>
  );
}

export default CoinList;