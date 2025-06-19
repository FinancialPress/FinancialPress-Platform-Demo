import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TrendingUp, TrendingDown, Clock, ExternalLink, Star, Plus, ChevronDown, Play, Search } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import TopCreators from '@/components/feed/TopCreators';
import TopSharers from '@/components/feed/TopSharers';
import TopComments from '@/components/feed/TopComments';
import TrendingTopics from '@/components/feed/TrendingTopics';
import EnhancedChart from '@/components/ui/enhanced-chart';

interface StockChartDataProps {
  symbol?: string;
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const StockChartData = ({ symbol = 'TSLA', onNavigate, isDarkMode = true }: StockChartDataProps) => {
  const [timeFrame, setTimeFrame] = useState('1D');
  const [isLoading, setIsLoading] = useState(true);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [newsTab, setNewsTab] = useState('All');
  const [hoveredPrice, setHoveredPrice] = useState(false);
  const [animatingPrice, setAnimatingPrice] = useState(false);
  const [isAddTickerOpen, setIsAddTickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const { toast } = useToast();

  // Mock chart data
  const chartData = {
    '1D': [323.24, 325.50, 320.15, 328.90, 331.45, 329.80, 335.20],
    '5D': [310.50, 315.20, 323.24, 335.20, 328.90, 342.10, 338.75],
    '1M': [285.30, 295.60, 310.50, 335.20, 345.80, 350.20, 338.75],
    '6M': [240.20, 280.50, 285.30, 335.20, 380.40, 350.15, 338.75],
    'YTD': [200.20, 250.50, 285.30, 335.20, 380.40, 420.15, 338.75],
    '1Y': [180.20, 220.50, 285.30, 335.20, 380.40, 420.15, 338.75],
    '5Y': [50.20, 120.50, 185.30, 335.20, 380.40, 420.15, 338.75]
  };

  const currentPrice = chartData[timeFrame as keyof typeof chartData].slice(-1)[0];
  const previousPrice = chartData[timeFrame as keyof typeof chartData].slice(-2)[0];
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100);

  // Sparkline data for current symbol
  const sparklineData = chartData[timeFrame as keyof typeof chartData].slice(-5).map((value, index) => ({ value, index }));

  // Available tickers for "Add Ticker" modal
  const availableTickers = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.67 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.23 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 151.34 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 335.78 },
    { symbol: 'BTC', name: 'Bitcoin', price: 94567.89 },
    { symbol: 'ETH', name: 'Ethereum', price: 3567.23 }
  ];

  const filteredTickers = availableTickers.filter(ticker =>
    ticker.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock financial data
  const financialMetrics = [
    { label: 'Previous Close', value: '331.45' },
    { label: 'Open', value: '335.20' },
    { label: 'Bid', value: '338.50 x 1000' },
    { label: 'Ask', value: '338.75 x 800' },
    { label: "Day's Range", value: '330.15 - 340.20' },
    { label: '52 Week Range', value: '138.80 - 414.50' },
    { label: 'Volume', value: '24,567,890' },
    { label: 'Avg. Volume', value: '28,456,234' },
    { label: 'Market Cap', value: '1.08T' },
    { label: 'Beta (5Y Monthly)', value: '2.31' },
    { label: 'PE Ratio (TTM)', value: '65.34' },
    { label: 'EPS (TTM)', value: '5.19' },
    { label: 'Earnings Date', value: 'Jan 25, 2024' },
    { label: 'Forward Dividend & Yield', value: 'N/A (N/A)' },
    { label: 'Ex-Dividend Date', value: 'N/A' },
    { label: '1y Target Est', value: '290.00' }
  ];

  // Mock news data with videos
  const newsData = [
    {
      id: 1,
      title: "Tesla Stock Plummets as Aussie Factory Shuts Down",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      timestamp: "9 hours ago",
      source: "Financial Times",
      type: "news"
    },
    {
      id: 2,
      title: "Tesla (TSLA) to Halt Gigafactory Texas Output Again",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=300&h=200&fit=crop",
      timestamp: "10 hours ago",
      source: "Reuters",
      type: "news"
    },
    {
      id: 3,
      title: "Elon Musk Announces New Tesla Model Pricing Strategy",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300&h=200&fit=crop",
      timestamp: "12 hours ago",
      source: "Bloomberg",
      type: "news"
    },
    {
      id: 4,
      title: "Tesla's Q4 Delivery Numbers Beat Analyst Expectations",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      timestamp: "1 day ago",
      source: "CNBC",
      type: "video"
    }
  ];

  const relatedVideos = [
    {
      id: 1,
      title: "Tesla Stock Analysis: What's Next for TSLA?",
      thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop",
      duration: "12:45",
      source: "Yahoo Finance",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Elon Musk's Latest Tesla Announcement Explained",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      duration: "8:32",
      source: "CNBC",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      title: "Tesla Gigafactory Tour: Inside the Future of Manufacturing",
      thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop",
      duration: "15:23",
      source: "Bloomberg Technology",
      timestamp: "1 day ago"
    }
  ];

  // Simulate live price updates with animations
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingPrice(true);
      setTimeout(() => setAnimatingPrice(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [currentSymbol, timeFrame]);

  const handleWatchlistToggle = () => {
    setIsWatchlisted(!isWatchlisted);
    toast({
      title: isWatchlisted ? `${currentSymbol} removed from Watchlist` : `${currentSymbol} added to your Watchlist!`,
      description: isWatchlisted ? "Stock removed successfully" : "You can track this stock in your portfolio",
    });
  };

  const handleTickerChange = (ticker: any) => {
    setCurrentSymbol(ticker.symbol);
    setIsAddTickerOpen(false);
    setSearchQuery('');
    toast({
      title: `Switched to ${ticker.symbol}`,
      description: `Now viewing ${ticker.name}`,
    });
  };

  const timeFrames = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'All'];
  const newsTabs = ['All', 'News', 'Press Releases', 'SEC Filings'];

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
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-8">
              {/* Enhanced Stock Info Card */}
              <Card className={`${cardClasses} relative overflow-hidden`}>
                {/* Premium gradient background */}
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-yellow-500/10 via-transparent to-gray-900/50' : 'bg-gradient-to-br from-yellow-400/10 via-transparent to-gray-100/50'} pointer-events-none`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <h2 className={`${textClasses} text-2xl font-bold`}>{currentSymbol}</h2>
                          {/* Sparkline on hover */}
                          {hoveredPrice && (
                            <div className="w-12 h-6">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={sparklineData}>
                                  <Line 
                                    type={"cardinal" as any}
                                    dataKey="value" 
                                    stroke={priceChange >= 0 ? '#10B981' : '#EF4444'} 
                                    strokeWidth={1}
                                    dot={false}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          )}
                        </div>
                        <Badge className="bg-green-600 text-white text-xs">
                          NASDAQ
                        </Badge>
                        
                        {/* Add Ticker Button */}
                        <Dialog open={isAddTickerOpen} onOpenChange={setIsAddTickerOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} flex items-center space-x-1`}
                            >
                              <Plus className="w-3 h-3" />
                              <span>Switch</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
                            <DialogHeader>
                              <DialogTitle className={textClasses}>Switch Ticker</DialogTitle>
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
                                {filteredTickers.map((ticker) => (
                                  <div
                                    key={ticker.symbol}
                                    onClick={() => handleTickerChange(ticker)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${isDarkMode ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className={`${textClasses} font-medium`}>{ticker.symbol}</div>
                                        <div className={`${secondaryTextClasses} text-sm`}>{ticker.name}</div>
                                      </div>
                                      <div className={`${textClasses} font-medium`}>${ticker.price.toFixed(2)}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className={`${secondaryTextClasses} text-sm mb-4`}>Tesla Inc. - Common Stock</p>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} flex items-center space-x-1`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Follow</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleWatchlistToggle}
                          className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} flex items-center space-x-1`}
                        >
                          <Star className={`w-3 h-3 ${isWatchlisted ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                          <span>{isWatchlisted ? 'Watching' : 'Watchlist'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div 
                      className={`${textClasses} text-4xl font-bold transition-all duration-500 ${animatingPrice ? 'animate-pulse scale-105' : ''}`}
                      onMouseEnter={() => setHoveredPrice(true)}
                      onMouseLeave={() => setHoveredPrice(false)}
                    >
                      ${currentPrice.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-2">
                      {priceChange >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`${priceChange >= 0 ? 'text-green-400' : 'text-red-400'} font-medium transition-all duration-300 ${animatingPrice ? 'glow' : ''}`}>
                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%)
                      </span>
                    </div>
                    <div className={`${secondaryTextClasses} text-sm flex items-center space-x-1`}>
                      <span>At close: 4:00 PM EST</span>
                    </div>
                    
                    {/* Enhanced hover tooltip */}
                    {hoveredPrice && (
                      <div className={`mt-4 p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'} backdrop-blur-sm`}>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className={`${secondaryTextClasses} block`}>Volume</span>
                            <span className={`${textClasses} font-medium`}>24.5M</span>
                          </div>
                          <div>
                            <span className={`${secondaryTextClasses} block`}>Market Cap</span>
                            <span className={`${textClasses} font-medium`}>1.08T</span>
                          </div>
                          <div>
                            <span className={`${secondaryTextClasses} block`}>24h High</span>
                            <span className={`${textClasses} font-medium`}>${(currentPrice * 1.02).toFixed(2)}</span>
                          </div>
                          <div>
                            <span className={`${secondaryTextClasses} block`}>24h Low</span>
                            <span className={`${textClasses} font-medium`}>${(currentPrice * 0.98).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Analyst Rating */}
                  <div className="mb-4 p-3 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`${textClasses} text-sm font-medium`}>Analyst Rating</span>
                      <span className="text-green-400 text-sm font-bold">BUY</span>
                    </div>
                    <div className="flex space-x-1 mb-2">
                      <div className="flex-1 h-2 bg-green-500 rounded-l"></div>
                      <div className="flex-1 h-2 bg-green-500"></div>
                      <div className="flex-1 h-2 bg-gray-600"></div>
                      <div className="flex-1 h-2 bg-gray-600 rounded-r"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Strong Buy</span>
                      <span>Hold</span>
                      <span>Strong Sell</span>
                    </div>
                    <div className="mt-2 text-yellow-400 text-sm font-medium">
                      1Y Target: $290.00
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comprehensive Financial Metrics */}
              <Card className={cardClasses}>
                <CardContent className="p-4">
                  <h3 className={`${textClasses} font-semibold mb-4`}>Statistics</h3>
                  <div className="space-y-3">
                    {financialMetrics.map((metric, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className={secondaryTextClasses}>{metric.label}</span>
                        <span className={textClasses}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Enhanced Chart Section with premium background */}
            <div className="w-full mb-6">
              <EnhancedChart
                symbol={currentSymbol}
                isDarkMode={isDarkMode}
                height={400}
                showFullscreen={true}
                showVolume={true}
                showSidebarMetrics={false}
                className="w-full"
              />
            </div>

            {/* Enhanced News Feed */}
            <Card className={`${cardClasses} mt-6`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`${textClasses} text-xl font-bold`}>Latest {currentSymbol} News</h2>
                </div>

                {/* News Tabs */}
                <Tabs value={newsTab} onValueChange={setNewsTab} className="mb-6">
                  <TabsList className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {newsTabs.map((tab) => (
                      <TabsTrigger key={tab} value={tab} className="text-sm">
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <div className="space-y-4">
                  {newsData.map((news) => (
                    <div
                      key={news.id}
                      className={`flex space-x-4 p-4 rounded-lg border ${isDarkMode ? 'border-gray-800 hover:border-gray-700 bg-gray-800/50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'} transition-all cursor-pointer`}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-24 h-16 rounded-lg object-cover"
                        />
                        {news.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" fill="white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`${textClasses} font-semibold mb-2 line-clamp-2 text-sm`}>
                          {news.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs">
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

            {/* Related Videos Section */}
            <Card className={`${cardClasses} mt-6`}>
              <CardContent className="p-6">
                <h3 className={`${textClasses} text-lg font-bold mb-4`}>Related Videos: {currentSymbol}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {relatedVideos.map((video) => (
                    <div
                      key={video.id}
                      className={`flex space-x-4 p-3 rounded-lg border ${isDarkMode ? 'border-gray-800 hover:border-gray-700 bg-gray-800/30' : 'border-gray-200 hover:border-gray-300 bg-gray-50'} transition-all cursor-pointer`}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-32 h-20 rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white drop-shadow-lg" fill="white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`${textClasses} font-medium mb-2 line-clamp-2 text-sm`}>
                          {video.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className={secondaryTextClasses}>{video.source}</span>
                          <span className={secondaryTextClasses}>•</span>
                          <span className={secondaryTextClasses}>{video.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Overview */}
            <Card className={`${cardClasses} mt-6`}>
              <CardContent className="p-6">
                <Collapsible open={isOverviewOpen} onOpenChange={setIsOverviewOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h3 className={`${textClasses} text-lg font-bold`}>Company Overview</h3>
                    <ChevronDown className={`w-5 h-5 ${textClasses} transition-transform ${isOverviewOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className={`${secondaryTextClasses} text-sm`}>Sector</span>
                        <p className={`${textClasses} font-medium`}>Consumer Cyclical</p>
                      </div>
                      <div>
                        <span className={`${secondaryTextClasses} text-sm`}>Industry</span>
                        <p className={`${textClasses} font-medium`}>Auto Manufacturers</p>
                      </div>
                      <div>
                        <span className={`${secondaryTextClasses} text-sm`}>CEO</span>
                        <p className={`${textClasses} font-medium`}>Elon Musk</p>
                      </div>
                      <div>
                        <span className={`${secondaryTextClasses} text-sm`}>Employees</span>
                        <p className={`${textClasses} font-medium`}>140,473</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className={`${secondaryTextClasses} text-sm`}>Headquarters</span>
                      <p className={`${textClasses} font-medium`}>Austin, Texas, United States</p>
                    </div>
                    <div>
                      <span className={`${secondaryTextClasses} text-sm`}>Description</span>
                      <p className={`${textClasses} text-sm mt-1 leading-relaxed`}>
                        Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments, Automotive, and Energy Generation and Storage.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
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
