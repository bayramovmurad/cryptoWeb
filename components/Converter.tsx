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
    <section className="panel converterPanel">
      <div className="panelHeader">
        <h2>Converter</h2>
        <span>Live USD estimate</span>
      </div>

      {!coin ? (
        <p className="muted">Select a coin to start converting.</p>
      ) : (
        <>
          <label className="label">Amount ({coin.symbol.toUpperCase()})</label>
          <input
            className="input"
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="resultBox">
            <span>USD Value</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </>
      )}
    </section>
  );
}

export default Converter;