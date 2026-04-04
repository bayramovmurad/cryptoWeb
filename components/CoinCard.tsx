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

function CoinCardComponent({ coin, onSelect }: Props) {

  return (
    <button
      type="button"
      onClick={() => onSelect(coin)}>
      <div>
        <div>
          <Image width={50} height={50} src={coin.image} alt={coin.name} />
          <div>
            <h3>{coin.name}</h3>
            <span>{coin.symbol.toUpperCase()}</span>
          </div>
        </div>
        <span>#{coin.market_cap_rank}</span>
      </div>

      <div>
        <strong>{formatCurrency(coin.current_price)}</strong>
        <span>
          {formatPercent(coin.price_change_percentage_24h)}
        </span>
      </div>
    </button>
  );
}

const CoinCard = memo(CoinCardComponent);
export default CoinCard;
