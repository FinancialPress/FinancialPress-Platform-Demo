
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Share, MessageCircle, TrendingUp, DollarSign, Users, Chrome, Facebook, Twitter, Instagram, Linkedin, Youtube, Calendar } from 'lucide-react';
import MarketOverview from './MarketOverview';
import FinalCTA from './FinalCTA';
import TickerBar from './TickerBar';

interface LandingPageProps {
  onNavigate?: (screen: number, symbol?: string) => void;
  isDarkMode?: boolean;
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  views: string;
  shares: number;
  comments: number;
}

const LandingPage = ({ onNavigate, isDarkMode = false }: LandingPageProps) => {
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);
  const [liveFeed, setLiveFeed] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Mock data for breaking news
    const mockBreakingNews: NewsItem[] = [
      {
        id: 1,
        title: 'Bitcoin Breaks $98,000 as Institutional Money Floods In',
        excerpt: 'Major financial institutions are driving unprecedented demand as Bitcoin reaches new all-time highs amid regulatory clarity.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
        author: 'CryptoAnalyst',
        views: '12.5K',
        shares: 89,
        comments: 34
      },
      {
        id: 2,
        title: 'Federal Reserve Hints at Rate Cuts, Markets Surge',
        excerpt: 'Fed Chairman signals potential monetary easing in Q2 2024, sparking rally across risk assets and precious metals.',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
        author: 'MacroInsights',
        views: '8.7K',
        shares: 67,
        comments: 23
      }
    ];

    const mockLiveFeed: NewsItem[] = [
      {
        id: 3,
        title: 'Tesla Stock Jumps 15% on Q4 Delivery Beat',
        excerpt: 'Electric vehicle giant reports record quarterly deliveries, exceeding analyst expectations by significant margin.',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=200&fit=crop',
        author: 'TechTrader',
        views: '15.2K',
        shares: 156,
        comments: 78
      },
      {
        id: 4,
        title: 'Gold Reaches New Highs as Dollar Weakens',
        excerpt: 'Precious metals rally continues with gold testing $2,100 resistance amid inflation concerns and geopolitical tensions.',
        image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=200&fit=crop',
        author: 'GoldBug',
        views: '9.3K',
        shares: 92,
        comments: 41
      },
      {
        id: 5,
        title: 'AI Stocks Lead Market Rally as Earnings Impress',
        excerpt: 'Artificial intelligence companies post stellar quarterly results, driving broader technology sector gains.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
        author: 'AIInvestor',
        views: '11.8K',
        shares: 134,
        comments: 62
      }
    ];

    setBreakingNews(mockBreakingNews);
    setLiveFeed(mockLiveFeed);
  }, []);

  // Generate random originator icon
  const getOriginatorIcon = (id: number) => {
    const icons = [
      { icon: Chrome, name: 'Web' },
      { icon: Facebook, name: 'Facebook' },
      { icon: Twitter, name: 'Twitter' },
      { icon: Instagram, name: 'Instagram' },
      { icon: Linkedin, name: 'LinkedIn' },
      { icon: Youtube, name: 'YouTube' },
    ];
    
    const iconIndex = id % icons.length;
    return icons[iconIndex];
  };

  // Add Financial Press logo for some articles
  const isFinancialPressArticle = (id: number) => id % 3 === 0;

  // Generate current date/time for demo
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeString = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const NewsCard = ({ item, section }: { item: NewsItem; section: string }) => {
    const originatorIcon = getOriginatorIcon(item.id);
    const isFinancialPress = isFinancialPressArticle(item.id);

    return (
      <Card className={`${isDarkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'} transition-colors cursor-pointer group`}>
        <CardContent className="p-0">
          <div className="relative">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="absolute top-3 right-3">
              {isFinancialPress ? (
                <img 
                  src="/lovable-uploads/36c32632-76d5-49c6-bb65-079fe61ba5f0.png" 
                  alt="Financial Press" 
                  className="w-6 h-6 bg-white rounded-full p-1"
                />
              ) : (
                <originatorIcon.icon className="w-6 h-6 text-white bg-black bg-opacity-50 rounded-full p-1" />
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-red-600 text-white text-xs">{section}</Badge>
            </div>
            <h3 className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2`}>
              {item.title}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
              {item.excerpt}
            </p>
            
            <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-4`}>
              <span className="font-medium">{item.author}</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{item.views}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Share className="w-4 h-4" />
                  <span>{item.shares}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{item.comments}</span>
                </span>
              </div>
            </div>

            {/* Date and Time Strip */}
            <div className={`pt-3 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {dateString}, {timeString}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const bgClasses = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={bgClasses}>
      {/* Ticker Bar */}
      <TickerBar isDarkMode={isDarkMode} />
      
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Earn Crypto by Sharing
            <br />
            Financial Insights
          </h1>
          <p className={`text-xl ${mutedText} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Join thousands of creators and distributors earning Financial Press Tokens (FPT) 
            by creating and sharing high-quality financial content with engaged communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-fpYellow hover:bg-fpYellowDark text-black font-bold text-lg px-8 py-4 rounded-full"
              onClick={() => onNavigate?.(1)}
            >
              Start Earning Today
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className={`${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-800' : 'border-gray-300 text-black hover:bg-gray-100'} font-semibold text-lg px-8 py-4 rounded-full`}
              onClick={() => onNavigate?.(3)}
            >
              View Feed
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-500 mb-2">$2.4M+</h3>
            <p className={mutedText}>Total Creator Earnings</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-blue-500 mb-2">50K+</h3>
            <p className={mutedText}>Active Community Members</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-500 p-3 rounded-full">
                <DollarSign className="w-8 h-8 text-black" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-2">1.2M</h3>
            <p className={mutedText}>FPT Tokens Distributed</p>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <MarketOverview isDarkMode={isDarkMode} />

      {/* Breaking News Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-16">
        <h2 className={`text-4xl font-bold ${textClasses} mb-12 text-center`}>Breaking News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {breakingNews.map((item) => (
            <NewsCard key={item.id} item={item} section="BREAKING" />
          ))}
        </div>
      </section>

      {/* Live Feed Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-16">
        <h2 className={`text-4xl font-bold ${textClasses} mb-12 text-center`}>Live Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {liveFeed.map((item) => (
            <NewsCard key={item.id} item={item} section="LIVE" />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;
