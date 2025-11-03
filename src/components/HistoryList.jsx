import React from 'react';

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
          {items.map((it, idx) => (
            <li
              key={idx}
              className="p-2 bg-white/5 rounded-md flex justify-between"
            >
              <div className="text-sm">
                {it.amount} {it.from} → {it.result?.toFixed(2) ?? '—'} {it.to}
                <div className="text-xs text-gray-400">
                  {new Date(it.time).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
