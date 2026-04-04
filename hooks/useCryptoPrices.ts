"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchCryptoMarkets } from "@/lib/api";
import { CoinItem } from "@/types/crypto";

export function useCryptoPrices(refreshMs = 30000) {
    const [coins, setCoins] = useState<CoinItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const loadCoins = useCallback(async () => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            setError(null);
            const data = await fetchCryptoMarkets(controller.signal);
            setCoins(data);
        } catch (err: any) {
            if (err?.name === "AbortError") return;
            setError(err?.message || "Something went wrong while loading prices.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCoins();

        const interval = setInterval(() => {
            loadCoins();
        }, refreshMs);

        return () => {
            clearInterval(interval);
            abortRef.current?.abort();
        };
    }, [loadCoins, refreshMs]);

    return {
        coins,
        loading,
        error,
        reload: loadCoins,
    };
}