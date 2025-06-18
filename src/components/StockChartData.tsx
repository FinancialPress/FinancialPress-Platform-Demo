
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Clock, ExternalLink } from 'lucide-react';
import TopCreators from '@/components/feed/TopCreators';
import TopSharers from '@/components/feed/TopSharers';
import TopComments from '@/components/feed/TopComments';
import TrendingTopics from '@/components/feed/TrendingTopics';

interface StockChartDataProps {
  symbol?: string;
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const StockChartData = ({ symbol = 'TSLA', onNavigate, isDarkMode = true }: StockChartDataProps) => {
  const [timeFrame, setTimeFrame] = useState('1D');
  const [isLoading, setIsLoading] = useState(true);

  // Mock chart data
  const chartData = {
    '1D': [323.24, 325.50, 320.15, 328.90, 331.45, 329.80, 335.20],
    '1W': [310.50, 315.20, 323.24, 335.20, 328.90, 342.10, 338.75],
    '1M': [285.30, 295.60, 310.50, 335.20, 345.80, 350.20, 338.75],
    '1Y': [180.20, 220.50, 285.30, 335.20, 380.40, 420.15, 338.75]
  };

  const currentPrice = chartData[timeFrame as keyof typeof chartData].slice(-1)[0];
  const previousPrice = chartData[timeFrame as keyof typeof chartData].slice(-2)[0];
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100);

  // Mock news data
  const newsData = [
    {
      id: 1,
      title: "Tesla Stock Plummets as Aussie Factory Shuts Down",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      timestamp: "9 hours ago",
      source: "Financial Times"
    },
    {
      id: 2,
      title: "Tesla (TSLA) to Halt Gigafactory Texas Output Again",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=300&h=200&fit=crop",
      timestamp: "10 hours ago",
      source: "Reuters"
    },
    {
      id: 3,
      title: "Elon Musk Announces New Tesla Model Pricing Strategy",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300&h=200&fit=crop",
      timestamp: "12 hours ago",
      source: "Bloomberg"
    },
    {
      id: 4,
      title: "Tesla's Q4 Delivery Numbers Beat Analyst Expectations",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      timestamp: "1 day ago",
      source: "CNBC"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [symbol, timeFrame]);

  const timeFrames = ['1D', '1W', '1M', '1Y'];

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const textClasses = isDarkMode 
    ? "text-white"
    : "text-black";

  const secondaryTextClasses = isDarkMode 
    ? "text-gray-400"
    : "text-gray-600";

  const sidebarClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-gray-100 border-gray-200";

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-8">
              {/* Stock Info Card */}
              <Card className={cardClasses}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`${textClasses} text-2xl font-bold`}>{symbol}</h2>
                      <p className={`${secondaryTextClasses} text-sm`}>Tesla Inc.</p>
                    </div>
                    <Badge className="bg-green-600 text-white">
                      NASDAQ
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className={`${textClasses} text-3xl font-bold`}>
                      ${currentPrice.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-2">
                      {priceChange >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={priceChange >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className={cardClasses}>
                <CardContent className="p-4">
                  <h3 className={`${textClasses} font-semibold mb-4`}>Key Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={secondaryTextClasses}>Volume</span>
                      <span className={textClasses}>2.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={secondaryTextClasses}>Market Cap</span>
                      <span className={textClasses}>$1.08T</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={secondaryTextClasses}>52W High</span>
                      <span className={textClasses}>$414.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={secondaryTextClasses}>52W Low</span>
                      <span className={textClasses}>$138.80</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Chart Section */}
            <Card className={cardClasses}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className={`${textClasses} text-2xl font-bold`}>
                    {symbol} Price Chart
                  </h1>
                  <div className="flex items-center space-x-2">
                    <Clock className={`w-4 h-4 ${secondaryTextClasses}`} />
                    <span className={`${secondaryTextClasses} text-sm`}>Real-time</span>
                  </div>
                </div>

                {/* Mock Chart Area */}
                <div className="h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      {/* Mock Chart Line */}
                      <svg className="w-full h-full" viewBox="0 0 400 200">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#EAB308', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: '#EAB308', stopOpacity: 0 }} />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 150 Q 100 120 200 100 T 400 80"
                          stroke="#EAB308"
                          strokeWidth="3"
                          fill="none"
                          className="animate-pulse"
                        />
                        <path
                          d="M 0 150 Q 100 120 200 100 T 400 80 L 400 200 L 0 200 Z"
                          fill="url(#chartGradient)"
                        />
                      </svg>
                      <div className="absolute top-4 left-4 text-yellow-400 text-sm font-medium">
                        {timeFrame} Chart for {symbol}
                      </div>
                    </div>
                  )}
                </div>

                {/* Time Frame Selector */}
                <div className="flex space-x-2">
                  {timeFrames.map((tf) => (
                    <Button
                      key={tf}
                      variant={timeFrame === tf ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeFrame(tf)}
                      className={
                        timeFrame === tf
                          ? "bg-yellow-500 text-black hover:bg-yellow-600"
                          : isDarkMode
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {tf}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* News Feed */}
            <Card className={`${cardClasses} mt-6`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`${textClasses} text-xl font-bold`}>Latest {symbol} News</h2>
                  <Button variant="ghost" size="sm" className={secondaryTextClasses}>
                    View All
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {newsData.map((news) => (
                    <div
                      key={news.id}
                      className={`flex space-x-4 p-4 rounded-lg border ${isDarkMode ? 'border-gray-800 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300'} transition-colors cursor-pointer`}
                    >
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className={`${textClasses} font-medium mb-2 line-clamp-2`}>
                          {news.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className={secondaryTextClasses}>{news.source}</span>
                          <span className={secondaryTextClasses}>•</span>
                          <span className={secondaryTextClasses}>{news.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <TopCreators isDarkMode={isDarkMode} />
            <TopSharers isDarkMode={isDarkMode} />
            <TopComments isDarkMode={isDarkMode} />
            <TrendingTopics isDarkMode={isDarkMode} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StockChartData;
