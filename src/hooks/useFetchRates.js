// src/hooks/useFetchRates.js
// src/hooks/useFetchRates.js
import { useState, useEffect, useCallback } from 'react';

export default function useFetchRates(from, to, amount) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async () => {
    if (!from || !to || !amount) return;
    setLoading(true);
    setError(null);

    try {
      // ✅ Use Frankfurter API (no API key needed)
      const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      console.log('API response:', json);

      const rate = json.rates?.[to];
      if (!rate) throw new Error('Invalid data from API');

      setData({
        info: { rate },
        result: rate,
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch rates. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [from, to, amount]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return { data, loading, error, refetch: fetchRates };
}
