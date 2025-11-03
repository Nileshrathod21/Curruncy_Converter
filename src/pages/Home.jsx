import React, { useEffect, useState } from 'react';
import ConverterCard from '../components/ConverterCard';
import HistoryList from '../components/HistoryList';

export default function Home() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('conv_history') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handler = () => {
      try {
        setHistory(JSON.parse(localStorage.getItem('conv_history') || '[]'));
      } catch {
        setHistory([]);
      }
    };
    window.addEventListener('history-updated', handler);
    return () => window.removeEventListener('history-updated', handler);
  }, []);

  const clear = () => {
    localStorage.removeItem('conv_history');
    setHistory([]);
    window.dispatchEvent(new CustomEvent('history-cleared'));
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <ConverterCard />
      <HistoryList items={history} onClear={clear} />
    </main>
  );
}
