
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Plus, Search } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  high24h: number;
  low24h: number;
  marketCap?: string;
  sparkline: number[];
}

interface MarketOverviewProps {
  isDarkMode?: boolean;
}

const MarketOverview = ({ isDarkMode = true }: MarketOverviewProps) => {
  const [selectedTicker, setSelectedTicker] = useState('SPY');
  const [timeframe, setTimeframe] = useState('1D');
  const [animatingTickers, setAnimatingTickers] = useState<Set<string>>(new Set());
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);
  const [isAddTickerOpen, setIsAddTickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customTickers, setCustomTickers] = useState<MarketData[]>([]);

  // Default market data
  const defaultMarkets: MarketData[] = [
    {
      symbol: 'SPY',
      name: 'S&P 500',
      price: 4789.45,
      change: 23.67,
      changePercent: 0.50,
      volume: '89.2M',
      high24h: 4798.12,
      low24h: 4756.33,
      marketCap: '43.2T',
      sparkline: [4756, 4762, 4771, 4785, 4789]
    },

    {
      symbol: 'IXIC',
      name: 'Nasdaq',
      price: 15623.89,
      change: 89.34,
      changePercent: 0.58,
      volume: '156.7M',
      high24h: 15645.23,
      low24h: 15567.12,
      marketCap: '18.9T',
      sparkline: [15567, 15589, 15601, 15618, 15624]
    },

    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 94567.89,
      change: 1234.56,
      changePercent: 1.32,
      volume: '28.9B',
      high24h: 95123.45,
      low24h: 92456.78,
      marketCap: '1.85T',
      sparkline: [92456, 93234, 93867, 94234, 94568]
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3567.23,
      change: -67.89,
      changePercent: -1.87,
      volume: '15.6B',
      high24h: 3645.67,
      low24h: 3534.12,
      marketCap: '428.9B',
      sparkline: [3645, 3612, 3589, 3556, 3567]
    },
    {
      symbol: 'HBAR',
      name: 'Hedera',
      price: 0.2834,
      change: 0.0123,
      changePercent: 4.54,
      volume: '89.3M',
      high24h: 0.2889,
      low24h: 0.2701,
      marketCap: '10.7B',
      sparkline: [0.2701, 0.2756, 0.2789, 0.2812, 0.2834]
    }
  ];

  const [markets, setMarkets] = useState<MarketData[]>(defaultMarkets);

  // Chart data for different timeframes
  const chartData = {
    '1D': [
      { time: '09:30', value: 4756 },
      { time: '11:00', value: 4762 },
      { time: '12:30', value: 4771 },
      { time: '14:00', value: 4785 },
      { time: '15:30', value: 4789 }
    ],
    '5D': [
      { time: 'Mon', value: 4723 },
      { time: 'Tue', value: 4756 },
      { time: 'Wed', value: 4771 },
      { time: 'Thu', value: 4785 },
      { time: 'Fri', value: 4789 }
    ],
    '1M': [
      { time: 'Week 1', value: 4567 },
      { time: 'Week 2', value: 4623 },
      { time: 'Week 3', value: 4701 },
      { time: 'Week 4', value: 4789 }
    ],
    '3M': [
      { time: 'Oct', value: 4234 },
      { time: 'Nov', value: 4456 },
      { time: 'Dec', value: 4789 }
    ],
    '6M': [
      { time: 'Jul', value: 4123 },
      { time: 'Aug', value: 4234 },
      { time: 'Sep', value: 4345 },
      { time: 'Oct', value: 4456 },
      { time: 'Nov', value: 4567 },
      { time: 'Dec', value: 4789 }
    ],
    '1Y': [
      { time: 'Q1', value: 3867 },
      { time: 'Q2', value: 4123 },
      { time: 'Q3', value: 4345 },
      { time: 'Q4', value: 4789 }
    ]
  };

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * markets.length);
      const ticker = markets[randomIndex].symbol;
      
      setAnimatingTickers(prev => new Set([...prev, ticker]));
      
      setTimeout(() => {
        setAnimatingTickers(prev => {
          const newSet = new Set(prev);
          newSet.delete(ticker);
          return newSet;
        });
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [markets]);

  const timeframes = ['1D', '5D', '1M', '3M', '6M', '1Y'];

  const availableTickersForAdd = [
    { symbol: 'AVAX', name: 'Avalanche', price: 45.67 },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.0876 },
    { symbol: 'ADA', name: 'Cardano', price: 0.4523 },
    { symbol: 'SOL', name: 'Solana', price: 98.45 },
    { symbol: 'MATIC', name: 'Polygon', price: 0.8934 }
  ];

  const filteredTickersForAdd = availableTickersForAdd.filter(ticker =>
    ticker.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTicker = (ticker: any) => {
    const newTicker: MarketData = {
      symbol: ticker.symbol,
      name: ticker.name,
      price: ticker.price,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: `${(Math.random() * 100).toFixed(1)}M`,
      high24h: ticker.price * 1.05,
      low24h: ticker.price * 0.95,
      sparkline: Array.from({ length: 5 }, () => ticker.price * (0.95 + Math.random() * 0.1))
    };
    
    setCustomTickers(prev => [...prev, newTicker]);
    setIsAddTickerOpen(false);
    setSearchQuery('');
  };

  const allMarkets = [...markets, ...customTickers];

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const textClasses = isDarkMode 
    ? "text-white"
    : "text-black";

  const secondaryTextClasses = isDarkMode 
    ? "text-gray-400"
    : "text-gray-600";

  return (
    <div className="w-full">
      <Card className={`${cardClasses} relative overflow-hidden`}>
        {/* Gradient background overlay */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-yellow-500/5 via-transparent to-gray-900/50' : 'bg-gradient-to-br from-yellow-400/10 via-transparent to-gray-100/50'} pointer-events-none`} />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`${textClasses} text-2xl font-bold mb-1`}>Markets Overview</h2>
              <p className={`${secondaryTextClasses} text-sm`}>Real-time market data and analytics</p>
            </div>
            <Dialog open={isAddTickerOpen} onOpenChange={setIsAddTickerOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} flex items-center space-x-2`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Ticker</span>
                </Button>
              </DialogTrigger>
              <DialogContent className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
                <DialogHeader>
                  <DialogTitle className={textClasses}>Add Custom Ticker</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${secondaryTextClasses}`} />
                    <Input
                      placeholder="Search tickers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-black'}`}
                    />
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredTickersForAdd.map((ticker) => (
                      <div
                        key={ticker.symbol}
                        onClick={() => handleAddTicker(ticker)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${isDarkMode ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`${textClasses} font-medium`}>{ticker.symbol}</div>
                            <div className={`${secondaryTextClasses} text-sm`}>{ticker.name}</div>
                          </div>
                          <div className={`${textClasses} font-medium`}>${ticker.price.toFixed(4)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Market Tickers */}
            <div className="lg:col-span-2 space-y-3">
              {allMarkets.map((market) => (
                <div
                  key={market.symbol}
                  onClick={() => setSelectedTicker(market.symbol)}
                  onMouseEnter={() => setHoveredTicker(market.symbol)}
                  onMouseLeave={() => setHoveredTicker(null)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedTicker === market.symbol
                      ? isDarkMode 
                        ? 'border-yellow-500/50 bg-yellow-500/5' 
                        : 'border-yellow-400/50 bg-yellow-400/5'
                      : isDarkMode
                      ? 'border-gray-800 hover:border-gray-700 bg-gray-800/30'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  } hover:shadow-lg relative overflow-hidden group`}
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : 'bg-gradient-to-r from-yellow-400/10 to-transparent'}`} />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`${textClasses} font-bold text-lg`}>{market.symbol}</span>
                          <Badge 
                            className={`text-xs ${
                              market.symbol.startsWith('$') || ['BTC', 'ETH', 'HBAR'].includes(market.symbol)
                                ? 'bg-purple-600 text-white'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            {market.symbol.startsWith('$') || ['BTC', 'ETH', 'HBAR'].includes(market.symbol) ? 'Crypto' : 'Index'}
                          </Badge>
                        </div>
                        <span className={`${secondaryTextClasses} text-sm`}>{market.name}</span>
                      </div>
                      
                      {/* Sparkline on hover */}
                      {hoveredTicker === market.symbol && (
                        <div className="w-16 h-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={market.sparkline.map((value, index) => ({ value, index }))}>
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={market.change >= 0 ? '#10B981' : '#EF4444'} 
                                strokeWidth={1}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className={`${textClasses} text-xl font-bold mb-1 ${animatingTickers.has(market.symbol) ? 'animate-pulse' : ''}`}>
                        ${market.price.toLocaleString(undefined, { 
                          minimumFractionDigits: market.price < 1 ? 4 : 2,
                          maximumFractionDigits: market.price < 1 ? 4 : 2
                        })}
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        {market.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`${market.change >= 0 ? 'text-green-400' : 'text-red-400'} font-medium text-sm`}>
                          {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)} ({market.changePercent >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                      
                      {/* Tooltip on hover */}
                      {hoveredTicker === market.symbol && (
                        <div className={`absolute right-4 top-full mt-2 p-3 rounded-lg shadow-lg border z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} min-w-48`}>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className={secondaryTextClasses}>Volume:</span>
                              <span className={textClasses}>{market.volume}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={secondaryTextClasses}>24h High:</span>
                              <span className={textClasses}>${market.high24h.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={secondaryTextClasses}>24h Low:</span>
                              <span className={textClasses}>${market.low24h.toFixed(2)}</span>
                            </div>
                            {market.marketCap && (
                              <div className="flex justify-between">
                                <span className={secondaryTextClasses}>Market Cap:</span>
                                <span className={textClasses}>{market.marketCap}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Panel - Interactive Chart */}
            <div className="lg:col-span-1">
              <div className={`p-4 rounded-lg border ${cardClasses} relative overflow-hidden`}>
                {/* Chart background gradient */}
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-radial from-yellow-500/10 via-transparent to-gray-900/50' : 'bg-gradient-radial from-yellow-400/10 via-transparent to-gray-100/50'} pointer-events-none`} />
                
                <div className="relative z-10">
                  <div className="mb-4">
                    <h3 className={`${textClasses} font-semibold mb-2`}>
                      {allMarkets.find(m => m.symbol === selectedTicker)?.name || 'S&P 500'}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {timeframes.map((tf) => (
                        <Button
                          key={tf}
                          variant={timeframe === tf ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setTimeframe(tf)}
                          className={
                            timeframe === tf
                              ? "bg-yellow-500 text-black hover:bg-yellow-600 h-7 px-2 text-xs"
                              : isDarkMode
                              ? "text-gray-400 hover:text-white hover:bg-gray-700 h-7 px-2 text-xs"
                              : "text-gray-600 hover:text-black hover:bg-gray-100 h-7 px-2 text-xs"
                          }
                        >
                          {tf}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="h-48 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData[timeframe as keyof typeof chartData]}>
                        <XAxis 
                          dataKey="time" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                            border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#EAB308" 
                          strokeWidth={2}
                          dot={{ fill: '#EAB308', strokeWidth: 2, r: 3 }}
                          activeDot={{ r: 5, fill: '#EAB308' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`text-center ${secondaryTextClasses} text-xs`}>
                    Click any ticker to view its chart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;
