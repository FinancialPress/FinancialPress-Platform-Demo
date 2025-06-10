
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign, Star, MessageCircle, Share2, Eye, Clock, ArrowUp, Heart, Repeat2, Bookmark } from 'lucide-react';
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
      timeAgo: "2h",
      views: "45.2K",
      badge: "Editor's Choice",
      engagement: {
        views: 45200,
        comments: 89,
        shares: 156,
        likes: 2400
      },
      earnings: "45.8 FPT"
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
      timeAgo: "42 minutes ago",
      type: "news",
      engagement: {
        views: 12500,
        comments: 34,
        shares: 67,
        likes: 890
      },
      earnings: "32.4 FPT"
    },
    {
      id: 2,
      title: "Bitcoin Traders Now See $107K Retest Before New All-Time Highs",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=300&h=200&fit=crop",
      category: "MARKET UPDATE",
      author: "William Suberg",
      timeAgo: "1 hour ago",
      type: "market",
      engagement: {
        views: 18900,
        comments: 56,
        shares: 89,
        likes: 1200
      },
      earnings: "48.7 FPT"
    },
    {
      id: 3,
      title: "The NFT Market is Silently Becoming Infrastructure",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      category: "OPINION",
      author: "Charu Sethi",
      timeAgo: "1 hour ago",
      type: "opinion",
      engagement: {
        views: 8700,
        comments: 23,
        shares: 45,
        likes: 670
      },
      earnings: "28.9 FPT"
    },
    {
      id: 4,
      title: "How Hackers Use Fake X Links to Steal Crypto, and How to Spot Them",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop",
      category: "EXPLAINED",
      author: "Omkar Singh",
      timeAgo: "1 hour ago",
      type: "educational",
      engagement: {
        views: 15600,
        comments: 67,
        shares: 78,
        likes: 1100
      },
      earnings: "41.2 FPT"
    },
    {
      id: 5,
      title: "Swift Legislation Turns Kyrgyzstan into Central Asia's Primary Crypto Hub",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
      category: "REGULATION",
      author: "Regulatory Desk",
      timeAgo: "2 hours ago",
      type: "regulation",
      engagement: {
        views: 9800,
        comments: 29,
        shares: 52,
        likes: 580
      },
      earnings: "26.7 FPT"
    },
    {
      id: 6,
      title: "Elon Musk Dogecoin Pump Incoming? SOL Tipped to Hit $300 in 2025",
      image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300&h=200&fit=crop",
      category: "MAGAZINE",
      author: "Trade Secrets",
      timeAgo: "3 hours ago",
      type: "analysis",
      engagement: {
        views: 22100,
        comments: 78,
        shares: 134,
        likes: 1800
      },
      earnings: "58.3 FPT"
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Compact */}
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Get monetized for contributing or sharing content
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
                <Card key={story.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-3/5">
                      <div className="relative">
                        <img 
                          src={story.image} 
                          alt={story.title}
                          className="w-full h-64 lg:h-80 object-cover"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-red-600 text-white">{story.badge}</Badge>
                          <Badge className="bg-blue-600 text-white">{story.category}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-2/5 p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4 leading-tight">{story.title}</h2>
                        <p className="text-gray-300 mb-6 line-height-relaxed">{story.description}</p>
                        
                        <div className="flex items-center justify-between text-gray-400 text-sm mb-6">
                          <span className="font-medium">by {story.author}</span>
                          <div className="flex items-center space-x-4">
                            <span>{story.timeAgo}</span>
                            <span>{story.views} views</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="space-y-4">
                        {/* Engagement Stats */}
                        <div className="flex items-center justify-between text-sm py-3 px-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span className="text-white font-medium">{story.engagement.views.toLocaleString()}</span>
                              <span className="text-gray-400">views</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-4 h-4 text-gray-400" />
                              <span className="text-white font-medium">{story.engagement.comments}</span>
                              <span className="text-gray-400">comments</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold text-lg">{story.earnings}</div>
                            <div className="text-gray-400 text-xs">Earned</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                              <Heart className="w-5 h-5" />
                              <span className="font-medium">{story.engagement.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-5 h-5" />
                              <span>{story.engagement.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                              <Repeat2 className="w-5 h-5" />
                              <span>{story.engagement.shares}</span>
                            </button>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors">
                              <Share2 className="w-5 h-5" />
                              <span className="font-medium">Share & Earn</span>
                            </button>
                            <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                              <Bookmark className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
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
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-2 left-2 ${getCategoryColor(item.category)} text-white text-xs`}>
                        {item.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-sm mb-3 line-clamp-2">{item.title}</h3>
                      <div className="text-gray-400 text-xs mb-3">
                        <span>by {item.author}</span>
                        <span className="mx-2">•</span>
                        <span>{item.timeAgo}</span>
                      </div>
                      
                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between text-xs mb-3 py-2 px-3 bg-gray-800 rounded">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-300">{item.engagement.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-300">{item.engagement.comments}</span>
                          </span>
                        </div>
                        <div className="text-green-400 font-semibold">{item.earnings}</div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                            <Heart className="w-3 h-3" />
                            <span className="text-xs">{item.engagement.likes}</span>
                          </button>
                          <button className="text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-3 h-3" />
                          </button>
                          <button className="text-gray-400 hover:text-green-400 transition-colors">
                            <Repeat2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                            <Share2 className="w-3 h-3" />
                          </button>
                          <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                            <Bookmark className="w-3 h-3" />
                          </button>
                        </div>
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
