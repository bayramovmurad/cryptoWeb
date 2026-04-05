"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchCryptoMarkets } from "@/lib/api";
import { CoinItem } from "@/types/crypto";

export function useCryptoPrices(refreshMs = 60000) {
    const [coins, setCoins] = useState<CoinItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);
    const isFetching = useRef(false);
    const lastFetchTime = useRef(0);

    const loadCoins = useCallback(async () => {
        const now = Date.now();

        // ⛔ SPAM PROTECTION (3 saniyə)
        if (now - lastFetchTime.current < 3000) return;
        lastFetchTime.current = now;

        // ⛔ PARALLEL REQUEST BLOCK
        if (isFetching.current) return;
        isFetching.current = true;

        // ⛔ stop previous request
        abortRef.current?.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            setLoading(true);
            setError(null);

            const data = await fetchCryptoMarkets(controller.signal);
            setCoins(data);
        } catch (err: any) {
            if (err?.name === "AbortError") return;

            // 429 handling
            if (err?.message?.includes("429")) {
                setError("Too many requests. Please wait...");
            } else {
                setError(err?.message || "Something went wrong.");
            }
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, []);

    useEffect(() => {
        loadCoins();

        const interval = setInterval(loadCoins, refreshMs);

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