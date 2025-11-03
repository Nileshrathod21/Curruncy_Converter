import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-xl font-bold text-white">AI Currency Converter</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
