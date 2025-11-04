// Small currency metadata map for icons/labels (fiat + crypto)
export const CURRENCY_META = {
  USD: { name: 'US Dollar', icon: '🇺🇸', type: 'fiat' },
  EUR: { name: 'Euro', icon: '🇪🇺', type: 'fiat' },
  GBP: { name: 'British Pound', icon: '🇬🇧', type: 'fiat' },
  INR: { name: 'Indian Rupee', icon: '🇮🇳', type: 'fiat' },
  JPY: { name: 'Japanese Yen', icon: '🇯🇵', type: 'fiat' },
  AUD: { name: 'Australian Dollar', icon: '🇦🇺', type: 'fiat' },
  CAD: { name: 'Canadian Dollar', icon: '🇨🇦', type: 'fiat' },
  CHF: { name: 'Swiss Franc', icon: '🇨🇭', type: 'fiat' },
  CNY: { name: 'Chinese Yuan', icon: '🇨🇳', type: 'fiat' },
  SGD: { name: 'Singapore Dollar', icon: '🇸🇬', type: 'fiat' },

  // cryptocurrencies (exchangerate.host supports some crypto symbols)
  BTC: { name: 'Bitcoin', icon: '₿', type: 'crypto' },
  ETH: { name: 'Ethereum', icon: 'Ξ', type: 'crypto' },
  DOGE: { name: 'Dogecoin', icon: 'Ð', type: 'crypto' },
  LTC: { name: 'Litecoin', icon: 'Ł', type: 'crypto' },
  XRP: { name: 'XRP', icon: '✕', type: 'crypto' },
};

export const DEFAULT_CURRENCIES = [
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
  'BTC',
  'ETH',
  'DOGE',
  'LTC',
  'XRP',
];

export default CURRENCY_META;
