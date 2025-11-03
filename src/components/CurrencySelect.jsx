import React from 'react';

const CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'INR',
  'JPY',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'SGD',
];

export default function CurrencySelect({ value, onChange, label }) {
  return (
    <label className="flex-1 min-w-0">
      <div className="text-sm mb-1 text-gray-300">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 pr-8 rounded-md bg-white text-gray-900 dark:bg-white/5 dark:text-white border border-gray-200 dark:border-white/20 min-w-0 appearance-none"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c} className="text-gray-900 dark:text-white">
              {c}
            </option>
          ))}
        </select>

        {/* custom arrow */}
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </label>
  );
}
