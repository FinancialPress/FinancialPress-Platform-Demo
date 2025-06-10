
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign, Star, MessageCircle, Share2, Eye, Clock, ArrowUp, Heart, Repeat2, Bookmark, MoreHorizontal } from 'lucide-react';
import TrendingTopics from '@/components/feed/TrendingTopics';
import TopCreators from '@/components/feed/TopCreators';
import UserStats from '@/components/feed/UserStats';
import QuickActions from '@/components/feed/QuickActions';

interface LandingPageProps {
  onNavigate?: (screen: number) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
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
      earnings: "52.8 FPT",
      isFollowing: false,
      isRecommended: true
    }
  ];

  const pressReleases = [
    {
      id: 1,
      title: "VERSE token launch surpasses $18 market cap within minutes of going live on Pump.fun",
      timeAgo: "15m",
      source: "WaveHQ"
    },
    {
      id: 2,
      title: "Serenity and Zenlqx accelerate US-GCC efforts to lead trillion-dollar tokenization market",
      timeAgo: "32m",
      source: "CryptoNews"
    }
  ];

  const marketReleases = [
    {
      id: 1,
      title: "TRX set to presale rises to account amid market rebound",
      timeAgo: "18m",
      source: "MarketWatch"
    },
    {
      id: 2,
      title: "SOL jumps 12% as ecosystem growth accelerates",
      timeAgo: "45m",
      source: "DeFiPulse"
    }
  ];

  const contentGrid = [
    {
      id: 1,
      title: "Investment Giant Guggenheim Taps Ripple to Expand Digital Debt Offering",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop",
      category: "NEWS",
      author: "Sam Bourgi",
      handle: "@sambourgi",
      badge: "Silver Creator",
      timeAgo: "42m",
      views: "12.5K",
      comments: 45,
      shares: 89,
      likes: 1200,
      earnings: "28.5 FPT",
      type: "news"
    },
    {
      id: 2,
      title: "Bitcoin Traders Now See $107K Retest Before New All-Time Highs",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=300&h=200&fit=crop",
      category: "MARKET UPDATE",
      author: "William Suberg",
      handle: "@williamsuberg",
      badge: "Gold Creator",
      timeAgo: "1h",
      views: "18.3K",
      comments: 67,
      shares: 134,
      likes: 1800,
      earnings: "38.2 FPT",
      type: "market"
    },
    {
      id: 3,
      title: "The NFT Market is Silently Becoming Infrastructure",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      category: "OPINION",
      author: "Charu Sethi",
      handle: "@charusethi",
      badge: "Platinum Creator",
      timeAgo: "1h",
      views: "22.1K",
      comments: 78,
      shares: 167,
      likes: 2100,
      earnings: "42.3 FPT",
      type: "opinion"
    },
    {
      id: 4,
      title: "How Hackers Use Fake X Links to Steal Crypto, and How to Spot Them",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop",
      category: "EXPLAINED",
      author: "Omkar Singh",
      handle: "@omkarsingh",
      badge: "Silver Creator",
      timeAgo: "1h",
      views: "15.7K",
      comments: 52,
      shares: 98,
      likes: 1500,
      earnings: "32.1 FPT",
      type: "educational"
    },
    {
      id: 5,
      title: "Swift Legislation Turns Kyrgyzstan into Central Asia's Primary Crypto Hub",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
      category: "REGULATION",
      author: "Regulatory Desk",
      handle: "@regulatorydesk",
      badge: "Gold Creator",
      timeAgo: "2h",
      views: "9.8K",
      comments: 34,
      shares: 67,
      likes: 980,
      earnings: "24.7 FPT",
      type: "regulation"
    },
    {
      id: 6,
      title: "Elon Musk Dogecoin Pump Incoming? SOL Tipped to Hit $300 in 2025",
      image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300&h=200&fit=crop",
      category: "MAGAZINE",
      author: "Trade Secrets",
      handle: "@tradesecrets",
      badge: "Platinum Creator",
      timeAgo: "3h",
      views: "31.2K",
      comments: 123,
      shares: 289,
      likes: 3200,
      earnings: "58.7 FPT",
      type: "analysis"
    }
  ];

  const cryptoInDepth = [
    {
      id: 1,
      title: "Meta's Bitcoin Rejection Means Big Tech is Still Skeptical",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=250&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Empty Seats Could Hamper CFTC's Ability to Regulate Crypto",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=250&h=150&fit=crop"
    },
    {
      id: 3,
      title: "Singapore's Ousted Crypto Firms May Not Find Shelter Elsewhere",
      image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=250&h=150&fit=crop"
    },
    {
      id: 4,
      title: "South Korea's New President Will Bolster Crypto, But Scandals Prevail",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=250&h=150&fit=crop"
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Compact */}
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Get Monetized for Contributing or Sharing Content
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
            Join the Web3 platform for creators, publishers, curators, and commentators.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3"
              onClick={() => onNavigate?.(1)}
            >
              Start Earning
            </Button>
            <Button 
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-6 py-3"
            >
              Learn More
            </Button>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {liveStats.map((stat, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area - 3/4 width */}
          <div className="lg:col-span-3">
            {/* Featured Story */}
            <div className="mb-8">
              {featuredNews.map((story) => (
                <Card key={story.id} className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
                  <div className="md:flex">
                    <div className="md:w-2/3">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/3 p-6">
                      {/* Author Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-sm">{story.author.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 mb-1">
                              <span className="text-white font-medium text-sm">{story.author}</span>
                              <Badge className={`text-xs ${getBadgeColor(story.badge)}`}>
                                {story.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400 text-xs">
                              <span>{story.handle}</span>
                              <span>•</span>
                              <span>{story.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center space-x-1 mb-3">
                        <Badge className="bg-blue-600 text-white text-xs">{story.category}</Badge>
                        {story.isRecommended && (
                          <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                        )}
                        {story.isFollowing && (
                          <Badge className="bg-purple-600 text-white text-xs">Following</Badge>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-white mb-3">{story.title}</h2>
                      <p className="text-gray-300 text-sm mb-4">{story.description}</p>

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                        <div className="flex items-center space-x-3">
                          <span>{story.views} views</span>
                          <span>{story.comments} comments</span>
                          <span>{story.shares} shares</span>
                        </div>
                        <span className="text-green-400 font-semibold">Earned: {story.earnings}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs">{story.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">{story.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
                            <Repeat2 className="w-4 h-4" />
                            <span className="text-xs">{story.shares}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs">Share & Earn</span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Press Releases and Market Releases */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Press Releases</h3>
                  <div className="space-y-4">
                    {pressReleases.map((release) => (
                      <div key={release.id} className="border-b border-gray-800 pb-3 last:border-b-0">
                        <h4 className="text-white font-medium text-sm mb-2">{release.title}</h4>
                        <div className="flex items-center text-gray-400 text-xs">
                          <span>{release.source}</span>
                          <span className="mx-2">•</span>
                          <span>{release.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Market Releases</h3>
                  <div className="space-y-4">
                    {marketReleases.map((release) => (
                      <div key={release.id} className="border-b border-gray-800 pb-3 last:border-b-0">
                        <h4 className="text-white font-medium text-sm mb-2">{release.title}</h4>
                        <div className="flex items-center text-gray-400 text-xs">
                          <span>{release.source}</span>
                          <span className="mx-2">•</span>
                          <span>{release.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {contentGrid.map((item) => (
                <Card key={item.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
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
                          <span className="text-white font-medium text-xs">{item.author}</span>
                          <Badge className={`text-xs ${getBadgeColor(item.badge)}`}>
                            {item.badge.split(' ')[0]}
                          </Badge>
                        </div>
                        <span className="text-gray-400 text-xs">{item.timeAgo}</span>
                      </div>

                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                      
                      {/* Engagement Stats - Compact */}
                      <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
                        <div className="flex items-center space-x-2">
                          <span>{item.views}</span>
                          <span>•</span>
                          <span>{item.comments} comments</span>
                        </div>
                        <span className="text-green-400 font-semibold">{item.earnings}</span>
                      </div>

                      {/* Action Buttons - Compact */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                            <Heart className="w-3 h-3" />
                            <span className="text-xs">{item.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-3 h-3" />
                            <span className="text-xs">{item.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors">
                            <Share2 className="w-3 h-3" />
                            <span className="text-xs">{item.shares}</span>
                          </button>
                        </div>
                        <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                          <Bookmark className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Crypto In-Depth Section */}
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Crypto In-Depth</h3>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400">
                      <ArrowUp className="w-4 h-4 rotate-180" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400">
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cryptoInDepth.map((article) => (
                    <div key={article.id} className="space-y-2">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-32 object-cover rounded"
                      />
                      <h4 className="text-white text-sm font-medium line-clamp-3">{article.title}</h4>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Load More */}
            <div className="text-center">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => onNavigate?.(1)}
              >
                Sign Up to See More Content
              </Button>
            </div>
          </div>

          {/* Right Sidebar - 1/4 width */}
          <div className="space-y-6">
            <QuickActions />
            <TrendingTopics />
            <TopCreators />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
