
import React, { useState, useEffect } from 'react';

const TickerBar = () => {
  const [tickerData] = useState([
    { symbol: 'BTC', price: '$94,250.00', change: '+2.45%', isPositive: true },
    { symbol: 'ETH', price: '$3,420.50', change: '+1.87%', isPositive: true },
    { symbol: 'FPT', price: '$2.45', change: '+5.23%', isPositive: true },
    { symbol: 'XRP', price: '$2.18', change: '-0.95%', isPositive: false },
    { symbol: 'ADA', price: '$1.05', change: '+3.12%', isPositive: true },
    { symbol: 'SOL', price: '$245.80', change: '+4.67%', isPositive: true },
  ]);

  return (
    <div className="w-full bg-gray-900 border-b border-gray-800 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center py-3 px-8">
          <span className="text-yellow-500 font-semibold mr-6">LIVE PRICES:</span>
          <div className="flex space-x-8 animate-pulse">
            {tickerData.map((item) => (
              <div key={item.symbol} className="flex items-center space-x-2">
                <span className="text-white font-medium">{item.symbol}</span>
                <span className="text-gray-300">{item.price}</span>
                <span className={`font-medium ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerBar;
