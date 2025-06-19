
import React from 'react';

interface TickerBarProps {
  isDarkMode?: boolean;
}

const TickerBar = ({ isDarkMode = true }: TickerBarProps) => {
  const tickerData = [
    // Stock Symbols (20)
    { symbol: 'AAPL', change: '+0.48%', isPositive: true },
    { symbol: 'MSFT', change: '+0.46%', isPositive: true },
    { symbol: 'AMZN', change: '-1.07%', isPositive: false },
    { symbol: 'TSLA', change: '+1.80%', isPositive: true },
    { symbol: 'AMD', change: '-0.24%', isPositive: false },
    { symbol: 'NVDA', change: '+2.15%', isPositive: true },
    { symbol: 'GOOGL', change: '-0.65%', isPositive: false },
    { symbol: 'META', change: '+0.92%', isPositive: true },
    { symbol: 'NFLX', change: '-0.33%', isPositive: false },
    { symbol: 'INTC', change: '+0.78%', isPositive: true },
    { symbol: 'BABA', change: '-1.23%', isPositive: false },
    { symbol: 'ORCL', change: '+0.49%', isPositive: true },
    { symbol: 'DIS', change: '-0.72%', isPositive: false },
    { symbol: 'V', change: '+0.26%', isPositive: true },
    { symbol: 'PYPL', change: '-0.98%', isPositive: false },
    { symbol: 'BRK.A', change: '+1.00%', isPositive: true },
    { symbol: 'JPM', change: '-0.43%', isPositive: false },
    { symbol: 'WMT', change: '+0.31%', isPositive: true },
    { symbol: 'T', change: '+0.05%', isPositive: true },
    { symbol: 'UBER', change: '+0.88%', isPositive: true },
    
    // Crypto Symbols (20)
    { symbol: 'BTC', change: '+0.55%', isPositive: true },
    { symbol: 'ETH', change: '-1.12%', isPositive: false },
    { symbol: 'HBAR', change: '+4.70%', isPositive: true },
    { symbol: 'XRP', change: '+0.93%', isPositive: true },
    { symbol: 'SOL', change: '-0.89%', isPositive: false },
    { symbol: 'DOGE', change: '+1.25%', isPositive: true },
    { symbol: 'AVAX', change: '+0.19%', isPositive: true },
    { symbol: 'MATIC', change: '-0.44%', isPositive: false },
    { symbol: 'ADA', change: '+0.68%', isPositive: true },
    { symbol: 'DOT', change: '-0.15%', isPositive: false },
    { symbol: 'SHIB', change: '+0.03%', isPositive: true },
    { symbol: 'LTC', change: '-1.00%', isPositive: false },
    { symbol: 'LINK', change: '+0.40%', isPositive: true },
    { symbol: 'NEAR', change: '+3.20%', isPositive: true },
    { symbol: 'TON', change: '-0.55%', isPositive: false },
    { symbol: 'ARB', change: '+2.87%', isPositive: true },
    { symbol: 'OP', change: '-0.98%', isPositive: false },
    { symbol: 'FPT', change: '+12.90%', isPositive: true },
    { symbol: 'STX', change: '+1.66%', isPositive: true },
    { symbol: 'RNDR', change: '-0.61%', isPositive: false },
  ];

  const backgroundClasses = isDarkMode 
    ? "bg-black border-gray-800" 
    : "bg-white border-gray-200";

  const getTickerItemClasses = (isPositive: boolean | null) => {
    const baseClasses = "inline-flex items-center px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap mx-2";
    
    if (isPositive === true) {
      return isDarkMode 
        ? `${baseClasses} bg-green-900/50 text-green-400 border border-green-800`
        : `${baseClasses} bg-green-100 text-green-700 border border-green-200`;
    } else if (isPositive === false) {
      return isDarkMode 
        ? `${baseClasses} bg-red-900/50 text-red-400 border border-red-800`
        : `${baseClasses} bg-red-100 text-red-700 border border-red-200`;
    } else {
      return isDarkMode 
        ? `${baseClasses} bg-gray-800 text-gray-400 border border-gray-700`
        : `${baseClasses} bg-gray-100 text-gray-600 border border-gray-300`;
    }
  };

  // Duplicate the data to create seamless looping
  const duplicatedData = [...tickerData, ...tickerData];

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className={`w-full h-14 ${backgroundClasses} border-b overflow-hidden`}>
        <div className="flex items-center h-full">
          <div className="animate-ticker-scroll">
            {duplicatedData.map((item, index) => (
              <div
                key={`${item.symbol}-${index}`}
                className={getTickerItemClasses(item.isPositive)}
              >
                <span className="font-semibold mr-2">{item.symbol}</span>
                <span>{item.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerBar;
