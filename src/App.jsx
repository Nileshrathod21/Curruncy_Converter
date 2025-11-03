import React from 'react';
import './index.css';
import Header from './components/Header';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-700 to-violet-800 dark:from-slate-900 dark:to-black text-white">
      <Header />
      <Home />
    </div>
  );
}
