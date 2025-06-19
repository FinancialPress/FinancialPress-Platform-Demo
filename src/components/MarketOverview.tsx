import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Plus, Search } from 'lucide-react';
import EnhancedChart from '@/components/ui/enhanced-chart';

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

  ];

  const [markets, setMarkets] = useState<MarketData[]>(defaultMarkets);

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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Panel - Market Tickers */}
            <div className="lg:col-span-3 space-y-3">
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
                      
                      {/* Enhanced Sparkline on hover */}
                      {hoveredTicker === market.symbol && (
                        <div className="w-20 h-12">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={market.sparkline.map((value, index) => ({ value, index }))}>
                              <Line 
                                type={"cardinal" as any}
                                dataKey="value" 
                                stroke={market.change >= 0 ? '#10B981' : '#EF4444'} 
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ 
                                  r: 3, 
                                  fill: '#EAB308', 
                                  stroke: '#FBBF24', 
                                  strokeWidth: 1,
                                  style: { filter: 'drop-shadow(0 0 4px #EAB308)' }
                                }}
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
                      
                      {/* Enhanced tooltip on hover */}
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

            {/* Right Panel - Enhanced Interactive Chart */}
            <div className="lg:col-span-2 min-w-0">
              <div className="w-full" style={{ height: '320px' }}>
                <EnhancedChart
                  symbol={allMarkets.find(m => m.symbol === selectedTicker)?.symbol || 'SPY'}
                  isDarkMode={isDarkMode}
                  height={320}
                  showFullscreen={false}
                  showVolume={false}
                  showSidebarMetrics={false}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;
