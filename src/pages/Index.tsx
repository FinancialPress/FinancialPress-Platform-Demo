
import { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Star, Award, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import LiveFeedSection from '../components/feed/LiveFeedSection';
import TopSharers from '../components/feed/TopSharers';
import TopCreators from '../components/feed/TopCreators';
import TopComments from '../components/feed/TopComments';
import QuickActions from '../components/feed/QuickActions';
import TrendingTopics from '../components/feed/TrendingTopics';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('feed');
  const [newsFilter, setNewsFilter] = useState<'latest' | 'trending'>('latest');

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
      earnings: "28.5",
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
      earnings: "38.2",
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
      earnings: "42.3",
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
      earnings: "32.1",
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
      earnings: "24.7",
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
      earnings: "58.7",
      type: "analysis"
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
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content Area - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <LiveFeedSection />

            {/* News Section with Filters */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">News</h2>
                <div className="flex space-x-2">
                  <Button
                    variant={newsFilter === 'latest' ? 'default' : 'outline'}
                    size="sm"
                    className={newsFilter === 'latest' ? 'bg-yellow-500 text-black' : ''}
                    onClick={() => setNewsFilter('latest')}
                  >
                    Latest
                  </Button>
                  <Button
                    variant={newsFilter === 'trending' ? 'default' : 'outline'}
                    size="sm"
                    className={newsFilter === 'trending' ? 'bg-yellow-500 text-black' : ''}
                    onClick={() => setNewsFilter('trending')}
                  >
                    Trending
                  </Button>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <span className="font-medium text-xs text-white">{item.author}</span>
                            <Badge className={`text-xs ${getBadgeColor(item.badge)}`}>
                              {item.badge.split(' ')[0]}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-300">{item.timeAgo}</span>
                        </div>

                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-white">{item.title}</h3>
                        
                        {/* Engagement Stats */}
                        <div className="flex items-center justify-between text-xs mb-2 text-gray-300">
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

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors">
                              <Heart className="w-3 h-3" />
                              <span className="text-xs">{item.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-3 h-3" />
                              <span className="text-xs">{item.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors">
                              <Share2 className="w-3 h-3" />
                              <span className="text-xs">{item.shares}</span>
                            </button>
                          </div>
                          <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                            <Bookmark className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Takes up 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <TopSharers />
            <QuickActions />
            <TopCreators />
            <TopComments />
            <TrendingTopics />
            
            {/* Stats Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Platform Stats</h3>
              {liveStats.map((stat, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
