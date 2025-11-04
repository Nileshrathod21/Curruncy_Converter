// src/hooks/useFetchRates.js
import { useState, useEffect, useCallback } from 'react';

export default function useFetchRates(from, to, amount) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Crypto symbol → CoinGecko ID mapping
  const CRYPTO_MAP = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    MATIC: 'matic-network',
    SOL: 'solana',
    BNB: 'binancecoin',
  };

  const fetchRates = useCallback(async () => {
    if (!from || !to || !amount) return;
    setLoading(true);
    setError(null);

    try {
      let rate = null;
      const isFromCrypto = CRYPTO_MAP[from];
      const isToCrypto = CRYPTO_MAP[to];

      // 🪙 Case 1: Crypto conversions (use CoinGecko)
      if (isFromCrypto || isToCrypto) {
        // If crypto → fiat
        if (isFromCrypto && !isToCrypto) {
          const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${
              CRYPTO_MAP[from]
            }&vs_currencies=${to.toLowerCase()}`
          );
          const json = await res.json();
          rate = json[CRYPTO_MAP[from]]?.[to.toLowerCase()];
          // Fallback to USD if direct pair not found
          if (!rate && to !== 'USD') {
            const usdRes = await fetch(
              `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_MAP[from]}&vs_currencies=usd`
            );
            const usdJson = await usdRes.json();
            const usdRate = usdJson[CRYPTO_MAP[from]]?.usd;
            const fiatRes = await fetch(
              `https://api.frankfurter.app/latest?amount=1&from=USD&to=${to}`
            );
            const fiatJson = await fiatRes.json();
            const usdToFiat = fiatJson.rates?.[to];
            rate = usdRate * usdToFiat;
          }
        }

        // If fiat → crypto
        else if (!isFromCrypto && isToCrypto) {
          const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${
              CRYPTO_MAP[to]
            }&vs_currencies=${from.toLowerCase()}`
          );
          const json = await res.json();
          const fiatRate = json[CRYPTO_MAP[to]]?.[from.toLowerCase()];
          if (fiatRate) rate = 1 / fiatRate;
          else {
            // Fallback: use USD as bridge
            const cryptoUsdRes = await fetch(
              `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_MAP[to]}&vs_currencies=usd`
            );
            const cryptoUsdJson = await cryptoUsdRes.json();
            const cryptoUsd = cryptoUsdJson[CRYPTO_MAP[to]]?.usd;
            const fiatRes = await fetch(
              `https://api.frankfurter.app/latest?amount=1&from=${from}&to=USD`
            );
            const fiatJson = await fiatRes.json();
            const fiatToUsd = fiatJson.rates?.USD;
            rate = fiatToUsd / cryptoUsd;
          }
        }

        // If crypto → crypto (convert via USD)
        else if (isFromCrypto && isToCrypto) {
          const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_MAP[from]},${CRYPTO_MAP[to]}&vs_currencies=usd`
          );
          const json = await res.json();
          const fromUsd = json[CRYPTO_MAP[from]]?.usd;
          const toUsd = json[CRYPTO_MAP[to]]?.usd;
          rate = fromUsd / toUsd;
        }
      }

      // 💵 Case 2: Fiat → Fiat (Frankfurter)
      else {
        const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
        const res = await fetch(url);
        const json = await res.json();
        rate = json.rates?.[to];
      }

      if (!rate) throw new Error('No valid rate found.');

      const result = rate * amount;
      setData({ info: { rate }, result });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('⚠️ Failed to fetch rates. Try again later.');
    } finally {
      setLoading(false);
    }
  }, [from, to, amount]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return { data, loading, error, refetch: fetchRates };
}
