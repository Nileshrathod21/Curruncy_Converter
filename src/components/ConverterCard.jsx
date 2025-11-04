import React, { useState, useEffect } from 'react';
import useFetchRates from '../hooks/useFetchRates';
import CurrencySelect from './CurrencySelect';
import { CURRENCY_META } from '../utils/currencies';

export default function ConverterCard() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('conv_history') || '[]');
    } catch {
      return [];
    }
  });

  const { data, loading, error, refetch } = useFetchRates(from, to, amount);

  // ensure numeric amount and derive result if API omits it
  const numericAmount = Number(amount) || 0;
  const rateFromApi = data?.info?.rate;
  const apiResult = typeof data?.result === 'number' ? data.result : null;
  let computedResult = null;
  if (apiResult !== null && apiResult !== undefined) {
    computedResult = apiResult;
  } else if (rateFromApi !== null && rateFromApi !== undefined) {
    computedResult = numericAmount * rateFromApi;
  }

  useEffect(() => {
    localStorage.setItem('conv_history', JSON.stringify(history));
  }, [history]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const saveFav = () => {
    const entry = {
      from,
      to,
      amount: numericAmount,
      result: computedResult,
      time: Date.now(),
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 20);
      // notify other components (Home) that history changed
      try {
        localStorage.setItem('conv_history', JSON.stringify(next));
      } catch {}
      try {
        globalThis.dispatchEvent(new CustomEvent('history-updated'));
      } catch {}
      return next;
    });
  };

  // prepare display values and middle content to avoid nested ternaries in JSX
  const rateDisplay = rateFromApi ?? '—';
  const resultDisplay =
    computedResult === null ? '—' : computedResult.toFixed(2);
  const fromIcon = CURRENCY_META[from]?.icon ?? '';
  const toIcon = CURRENCY_META[to]?.icon ?? '';

  let middleContent = null;
  if (loading) {
    middleContent = <p className="text-center text-gray-300">Loading...</p>;
  } else if (error) {
    middleContent = <p className="text-center text-red-400">{error}</p>;
  } else {
    middleContent = (
      <div className="text-center">
        <div className="text-sm text-gray-300">Rate: {rateDisplay}</div>
        <div className="text-2xl font-bold text-white mt-2 result-anim">
          <span className="mr-2">{fromIcon}</span>
          {numericAmount} {from} = {resultDisplay} {to}
          <span className="ml-2">{toIcon}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card max-w-lg mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-4">
        💰 AI Currency Converter
      </h2>

      <div className="mb-4">
        <input
          type="number"
          value={amount}
          min="0"
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-md bg-white/5 text-white"
          placeholder="Amount"
        />
      </div>

      <div className="flex gap-3 items-center mb-4">
        <CurrencySelect value={from} onChange={setFrom} label="From" />
        <button
          onClick={swap}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600"
        >
          🔄
        </button>
        <CurrencySelect value={to} onChange={setTo} label="To" />
      </div>

      {middleContent}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => refetch()}
          className="p-2 bg-blue-500 rounded-md"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>

        <button
          onClick={saveFav}
          className="flex-1 p-2 bg-green-500 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
}
