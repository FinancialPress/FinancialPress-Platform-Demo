
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign, Star, MessageCircle, Share2, Eye, Clock, ArrowUp, Heart, Repeat2, Bookmark, MoreHorizontal } from 'lucide-react';
import TrendingTopics from '@/components/feed/TrendingTopics';
import TopCreators from '@/components/feed/TopCreators';
import TopSharers from '@/components/feed/TopSharers';
import TopComments from '@/components/feed/TopComments';
import UserStats from '@/components/feed/UserStats';
import QuickActions from '@/components/feed/QuickActions';
import LiveFeedSection from '@/components/feed/LiveFeedSection';

interface LandingPageProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const LandingPage = ({ onNavigate, isDarkMode = true }: LandingPageProps) => {
  const [newsFilter, setNewsFilter] = useState<'latest' | 'trending'>('latest');

  const featuredNews = [
    {
      id: 1,
      type: 'featured',
      title: "Bank of Japan Pivot to QE May Fuel Bitcoin Rally",
      description: "Central bank's monetary policy shift could trigger significant cryptocurrency market movement as institutional adoption accelerates globally.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
      category: "Latest News",
      author: "Arthur Hayes",
      handle: "@arthurhayes",
      badge: "Gold Creator",
      timeAgo: "2h",
      views: "45.2K",
      comments: 89,
      shares: 156,
      likes: 2400,
      earnings: "52.8",
      isFollowing: false
    }
  ];

  const contentGrid = [
    {
      id: 1,
      title: "Investment Giant Guggenheim Taps Ripple to Expand Digital Debt Offering",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&auto=format",
      category: "NEWS",
      author: "Sam Bourgi",
      handle: "@sambourgi",
      badge: "Silver Creator",
      timeAgo: "42m",
      views: "12.5K",
      comments: 45,
      shares: 89,
      likes: 1200,
      earnings: "28.5",
      type: "news"
    },
    {
      id: 2,
      title: "Bitcoin Traders Now See $107K Retest Before New All-Time Highs",
      image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300&h=200&fit=crop&auto=format",
      category: "MARKET UPDATE",
      author: "William Suberg",
      handle: "@williamsuberg",
      badge: "Gold Creator",
      timeAgo: "1h",
      views: "18.3K",
      comments: 67,
      shares: 134,
      likes: 1800,
      earnings: "38.2",
      type: "market"
    },
    {
      id: 3,
      title: "The NFT Market is Silently Becoming Infrastructure",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop&auto=format",
      category: "OPINION",
      author: "Charu Sethi",
      handle: "@charusethi",
      badge: "Platinum Creator",
      timeAgo: "1h",
      views: "22.1K",
      comments: 78,
      shares: 167,
      likes: 2100,
      earnings: "42.3",
      type: "opinion"
    },
    {
      id: 4,
      title: "How Hackers Use Fake X Links to Steal Crypto, and How to Spot Them",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop&auto=format",
      category: "EXPLAINED",
      author: "Omkar Singh",
      handle: "@omkarsingh",
      badge: "Silver Creator",
      timeAgo: "1h",
      views: "15.7K",
      comments: 52,
      shares: 98,
      likes: 1500,
      earnings: "32.1",
      type: "educational"
    },
    {
      id: 5,
      title: "Swift Legislation Turns Kyrgyzstan into Central Asia's Primary Crypto Hub",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=200&fit=crop&auto=format",
      category: "REGULATION",
      author: "Regulatory Desk",
      handle: "@regulatorydesk",
      badge: "Gold Creator",
      timeAgo: "2h",
      views: "9.8K",
      comments: 34,
      shares: 67,
      likes: 980,
      earnings: "24.7",
      type: "regulation"
    },
    {
      id: 6,
      title: "Elon Musk Dogecoin Pump Incoming? SOL Tipped to Hit $300 in 2025",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=300&h=200&fit=crop&auto=format",
      category: "MAGAZINE",
      author: "Trade Secrets",
      handle: "@tradesecrets",
      badge: "Platinum Creator",
      timeAgo: "3h",
      views: "31.2K",
      comments: 123,
      shares: 289,
      likes: 3200,
      earnings: "58.7",
      type: "analysis"
    },
    {
      id: 7,
      title: "DeFi Protocol Launches Revolutionary Staking Mechanism",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop&auto=format",
      category: "DEFI",
      author: "DeFi Weekly",
      handle: "@defiweekly",
      badge: "Gold Creator",
      timeAgo: "3h",
      views: "14.2K",
      comments: 56,
      shares: 112,
      likes: 1650,
      earnings: "34.8",
      type: "defi"
    },
    {
      id: 8,
      title: "Central Bank Digital Currencies: The Race Heats Up",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop&auto=format",
      category: "CBDC",
      author: "Policy Watch",
      handle: "@policywatch",
      badge: "Silver Creator",
      timeAgo: "4h",
      views: "11.7K",
      comments: 43,
      shares: 87,
      likes: 1320,
      earnings: "29.6",
      type: "policy"
    },
    {
      id: 9,
      title: "Web3 Gaming Tokens See Massive Surge in Trading Volume",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&auto=format",
      category: "GAMING",
      author: "GameFi Report",
      handle: "@gamefireport",
      badge: "Platinum Creator",
      timeAgo: "4h",
      views: "19.8K",
      comments: 89,
      shares: 156,
      likes: 2340,
      earnings: "45.2",
      type: "gaming"
    },
    {
      id: 10,
      title: "Ethereum Layer 2 Solutions Drive Record TVL Growth",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=300&h=200&fit=crop&auto=format",
      category: "LAYER 2",
      author: "L2 Analytics",
      handle: "@l2analytics",
      badge: "Gold Creator",
      timeAgo: "5h",
      views: "16.4K",
      comments: 73,
      shares: 145,
      likes: 1890,
      earnings: "41.3",
      type: "layer2"
    },
    {
      id: 11,
      title: "Institutional Bitcoin Holdings Reach All-Time High",
      image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=300&h=200&fit=crop&auto=format",
      category: "INSTITUTIONAL",
      author: "Corporate Watch",
      handle: "@corpwatch",
      badge: "Platinum Creator",
      timeAgo: "6h",
      views: "21.7K",
      comments: 95,
      shares: 178,
      likes: 2450,
      earnings: "48.9",
      type: "institutional"
    },
    {
      id: 12,
      title: "NFT Marketplace Revenues Surge 340% This Quarter",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop&auto=format",
      category: "NFT",
      author: "NFT Tracker",
      handle: "@nfttracker",
      badge: "Silver Creator",
      timeAgo: "7h",
      views: "13.8K",
      comments: 58,
      shares: 119,
      likes: 1567,
      earnings: "35.7",
      type: "nft"
    },
    {
      id: 13,
      title: "Crypto Lending Platforms Report 45% Growth in Q4",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop&auto=format",
      category: "LENDING",
      author: "FinTech Digest",
      handle: "@fintechdigest",
      badge: "Gold Creator",
      timeAgo: "8h",
      views: "12.3K",
      comments: 41,
      shares: 93,
      likes: 1234,
      earnings: "27.8",
      type: "lending"
    },
    {
      id: 14,
      title: "Blockchain Adoption in Healthcare Reaches New Milestone",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop&auto=format",
      category: "HEALTHCARE",
      author: "MedTech News",
      handle: "@medtechnews",
      badge: "Silver Creator",
      timeAgo: "9h",
      views: "8.7K",
      comments: 28,
      shares: 67,
      likes: 987,
      earnings: "21.4",
      type: "healthcare"
    },
    {
      id: 15,
      title: "Cross-Chain Bridge Security Gets Major Upgrade",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop&auto=format",
      category: "SECURITY",
      author: "Security Watch",
      handle: "@securitywatch",
      badge: "Platinum Creator",
      timeAgo: "10h",
      views: "15.6K",
      comments: 62,
      shares: 134,
      likes: 1678,
      earnings: "39.2",
      type: "security"
    },
    {
      id: 16,
      title: "Metaverse Land Sales Hit Record High This Month",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop&auto=format",
      category: "METAVERSE",
      author: "Virtual World",
      handle: "@virtualworld",
      badge: "Gold Creator",
      timeAgo: "11h",
      views: "18.9K",
      comments: 76,
      shares: 167,
      likes: 2123,
      earnings: "43.6",
      type: "metaverse"
    },
    {
      id: 17,
      title: "Green Bitcoin Mining Initiative Gains Traction",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=200&fit=crop&auto=format",
      category: "SUSTAINABILITY",
      author: "Green Crypto",
      handle: "@greencrypto",
      badge: "Silver Creator",
      timeAgo: "12h",
      views: "10.4K",
      comments: 35,
      shares: 78,
      likes: 1156,
      earnings: "26.3",
      type: "sustainability"
    },
    {
      id: 18,
      title: "AI-Powered Trading Bots Show 67% Success Rate",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop&auto=format",
      category: "AI TRADING",
      author: "AI Finance",
      handle: "@aifinance",
      badge: "Platinum Creator",
      timeAgo: "13h",
      views: "20.1K",
      comments: 88,
      shares: 189,
      likes: 2567,
      earnings: "47.8",
      type: "ai"
    }
  ];

  const liveStats = [
    { label: "Active Creators", value: "2,847", icon: Users, color: "text-green-400" },
    { label: "Total Rewards Paid", value: "$2.5M", icon: DollarSign, color: "text-yellow-400" },
    { label: "Content Pieces", value: "500K+", icon: Star, color: "text-purple-400" },
    { label: "Success Rate", value: "89%", icon: Award, color: "text-blue-400" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'news': return 'bg-blue-600';
      case 'market update': return 'bg-green-600';
      case 'opinion': return 'bg-purple-600';
      case 'explained': return 'bg-orange-600';
      case 'regulation': return 'bg-red-600';
      case 'magazine': return 'bg-pink-600';
      case 'defi': return 'bg-indigo-600';
      case 'cbdc': return 'bg-teal-600';
      case 'gaming': return 'bg-violet-600';
      case 'layer 2': return 'bg-gray-600';
      case 'institutional': return 'bg-gray-600';
      case 'nft': return 'bg-gray-600';
      case 'lending': return 'bg-blue-700';
      case 'healthcare': return 'bg-green-700';
      case 'security': return 'bg-red-700';
      case 'metaverse': return 'bg-purple-700';
      case 'sustainability': return 'bg-green-800';
      case 'ai trading': return 'bg-indigo-700';
      default: return 'bg-gray-600';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Platinum Creator': return 'bg-purple-500 text-white';
      case 'Gold Creator': return 'bg-yellow-500 text-black';
      case 'Silver Creator': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-black text-white"
    : "min-h-screen bg-gray-50 text-black";

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const textClasses = isDarkMode 
    ? "text-gray-300"
    : "text-gray-600";

  const heroTextClasses = isDarkMode
    ? "text-lg text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
    : "text-lg text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed";

  const newsHeaderClasses = isDarkMode
    ? "text-2xl font-bold text-white"
    : "text-2xl font-bold text-black";

  const newsButtonClasses = (isActive: boolean) => {
    if (isActive) {
      return "bg-yellow-500 text-black hover:bg-yellow-600";
    }
    return isDarkMode 
      ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
      : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900";
  };

  const loadMoreButtonClasses = isDarkMode
    ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-white";

  const sidebarHeaderClasses = isDarkMode
    ? "text-lg font-semibold text-white"
    : "text-lg font-semibold text-black";

  const statCardTextClasses = isDarkMode
    ? "text-xl font-bold text-white"
    : "text-xl font-bold text-black";

  return (
    <div className={themeClasses}>
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
            Join the financial community
          </h1>
          <p className={heroTextClasses}>
            Get credible, tailored updates with low noise and high impact and turn your influence into income as you grow your audience.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3"
              onClick={() => onNavigate?.(1)}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area - 3/4 width */}
          <div className="lg:col-span-3">
            {/* Live Feed Section - Direct display without tabs */}
            <div className="mb-8">
              <LiveFeedSection isDarkMode={isDarkMode} />
            </div>

            {/* News Section with Filters */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className={newsHeaderClasses}>News</h2>
                <div className="flex space-x-2">
                  <Button
                    variant={newsFilter === 'latest' ? 'default' : 'outline'}
                    size="sm"
                    className={newsButtonClasses(newsFilter === 'latest')}
                    onClick={() => setNewsFilter('latest')}
                  >
                    Latest
                  </Button>
                  <Button
                    variant={newsFilter === 'trending' ? 'default' : 'outline'}
                    size="sm"
                    className={newsButtonClasses(newsFilter === 'trending')}
                    onClick={() => setNewsFilter('trending')}
                  >
                    Trending
                  </Button>
                </div>
              </div>

              {/* Content Grid - Extended with more articles */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentGrid.map((item) => (
                  <Card key={item.id} className={`${cardClasses} hover:border-gray-700 transition-colors`}>
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                        <Badge className={`absolute top-2 left-2 ${getCategoryColor(item.category)} text-white text-xs`}>
                          {item.category}
                        </Badge>
                      </div>
                      <div className="p-3">
                        {/* Author Header - Compact */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-xs">{item.author.charAt(0)}</span>
                            </div>
                            <span className={`font-medium text-xs ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.author}</span>
                            <Badge className={`text-xs ${getBadgeColor(item.badge)}`}>
                              {item.badge.split(' ')[0]}
                            </Badge>
                          </div>
                          <span className={`text-xs ${textClasses}`}>{item.timeAgo}</span>
                        </div>

                        <h3 className={`font-semibold text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.title}</h3>
                        
                        {/* Engagement Stats - Updated Format */}
                        <div className={`flex items-center justify-between text-xs mb-2 ${textClasses}`}>
                          <div className="flex items-center space-x-2">
                            <span>{item.views}</span>
                            <span>•</span>
                            <span>{item.comments} comments</span>
                          </div>
                          <div className="text-green-400 font-semibold text-center">
                            <div className="text-sm">{item.earnings}</div>
                            <div className="text-xs">FPT Earned</div>
                          </div>
                        </div>

                        {/* Action Buttons - Compact */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button className={`flex items-center space-x-1 ${textClasses} hover:text-red-400 transition-colors`}>
                              <Heart className="w-3 h-3" />
                              <span className="text-xs">{item.likes}</span>
                            </button>
                            <button className={`flex items-center space-x-1 ${textClasses} hover:text-blue-400 transition-colors`}>
                              <MessageCircle className="w-3 h-3" />
                              <span className="text-xs">{item.comments}</span>
                            </button>
                            <button className={`flex items-center space-x-1 ${textClasses} hover:text-green-400 transition-colors`}>
                              <Repeat2 className="w-3 h-3" />
                              <span className="text-xs">{item.shares}</span>
                            </button>
                            <button className={`flex items-center space-x-1 ${textClasses} hover:text-yellow-400 transition-colors`}>
                              <Share2 className="w-3 h-3" />
                              <span className="text-xs">Share & Earn</span>
                            </button>
                          </div>
                          <button className={`${textClasses} hover:text-yellow-400 transition-colors`}>
                            <Bookmark className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mb-8">
              <Button 
                variant="outline" 
                className={loadMoreButtonClasses}
                onClick={() => onNavigate?.(1)}
              >
                Load More Content
              </Button>
            </div>
          </div>

          {/* Right Sidebar - 1/4 width */}
          <div className="space-y-6">
            <TopCreators isDarkMode={isDarkMode} />
            <QuickActions isDarkMode={isDarkMode} />
            <TopSharers isDarkMode={isDarkMode} />
            <TopComments isDarkMode={isDarkMode} />
            <TrendingTopics isDarkMode={isDarkMode} />
            
            {/* Stats Section - Moved to Bottom and Stacked */}
            <div className="space-y-4">
              <h3 className={sidebarHeaderClasses}>Platform Stats</h3>
              {liveStats.map((stat, index) => (
                <Card key={index} className={cardClasses}>
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                    <div className={statCardTextClasses}>{stat.value}</div>
                    <div className={`text-sm ${textClasses}`}>{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
