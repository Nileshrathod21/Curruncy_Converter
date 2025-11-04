import React from 'react';
import { CURRENCY_META } from '../utils/currencies';

export default function HistoryList({ items = [], onClear }) {
  return (
    <div className="glass-card mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Recent / Favorites</h3>
        <button onClick={onClear} className="text-sm text-red-400">
          Clear
        </button>
      </div>
      {items.length === 0 ? (
        <div className="text-sm text-gray-400">No history yet</div>
      ) : (
        <ul className="space-y-2">
          {items.map((it, idx) => {
            const fromIcon = CURRENCY_META[it.from]?.icon ?? '';
            const toIcon = CURRENCY_META[it.to]?.icon ?? '';
            const resultText =
              it.result == null ? '—' : Number(it.result).toFixed(2);
            return (
              <li
                key={idx}
                className="p-2 bg-white/5 rounded-md flex justify-between"
              >
                <div className="text-sm">
                  <div>
                    <span className="mr-2">{fromIcon}</span>
                    {it.amount} {it.from} → {resultText} {it.to}
                    <span className="ml-2">{toIcon}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(it.time).toLocaleString()}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
