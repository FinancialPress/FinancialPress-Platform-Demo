import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign, Star, MessageCircle, Share2, Eye, Clock, ArrowUp, Heart, Repeat2 } from 'lucide-react';
import TrendingTopics from '@/components/feed/TrendingTopics';
import TopCreators from '@/components/feed/TopCreators';
import UserStats from '@/components/feed/UserStats';
import QuickActions from '@/components/feed/QuickActions';

interface LandingPageProps {
  onNavigate?: (screen: number) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const feedContent = [
    {
      id: 1,
      type: 'post',
      creator: "CryptoAnalyst",
      handle: "@cryptoanalyst",
      badge: "Gold Creator",
      timeAgo: "2h",
      content: "Bitcoin Bull Run: What's Driving the $94K Rally?",
      description: "The recent surge past $94K represents a significant psychological barrier. Key factors include increased institutional adoption, favorable regulatory news, and strong on-chain metrics. The momentum appears sustainable with support levels holding firm.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=250&fit=crop",
      engagement: {
        likes: 2400,
        shares: 156,
        comments: 89,
        views: 12500
      },
      earnings: "45.8 FPT",
      category: "Crypto Analysis"
    },
    {
      id: 2,
      type: 'post',
      creator: "DeFiGuru",
      handle: "@defiguru",
      badge: "Platinum Creator",
      timeAgo: "4h",
      content: "DeFi Renaissance: Top 5 Protocols to Watch in 2024",
      description: "The DeFi landscape is evolving rapidly. Here are the protocols showing the most promise: 1) Uniswap V4 with hooks, 2) Aave's GHO stablecoin expansion, 3) Compound III growth, 4) Curve's new tokenomics, 5) Lido's staking dominance.",
      engagement: {
        likes: 1800,
        shares: 134,
        comments: 67,
        views: 8900
      },
      earnings: "38.2 FPT",
      category: "DeFi"
    },
    {
      id: 3,
      type: 'trending',
      title: "SEC Approves Bitcoin ETF Options Trading",
      views: "45.2K",
      timeAgo: "1h",
      category: "Breaking News"
    },
    {
      id: 4,
      type: 'post',
      creator: "NFTTracker",
      handle: "@nfttracker",
      badge: "Silver Creator",
      timeAgo: "6h",
      content: "NFT Market Recovery: Blue Chips Lead the Way",
      description: "Floor prices for top collections are showing signs of recovery. BAYC, CryptoPunks, and Azuki are leading the charge with increased trading volume and whale accumulation patterns.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=250&fit=crop",
      engagement: {
        likes: 1200,
        shares: 89,
        comments: 45,
        views: 6700
      },
      earnings: "28.5 FPT",
      category: "NFTs"
    },
    {
      id: 5,
      type: 'post',
      creator: "TechAnalyst",
      handle: "@techanalyst",
      badge: "Gold Creator",
      timeAgo: "8h",
      content: "AI Revolution in Finance: Which Stocks Will Soar?",
      description: "AI integration in financial services is accelerating. Companies like NVDA, MSFT, and emerging fintech players are positioning themselves for massive growth. The convergence of AI and finance presents unprecedented opportunities.",
      engagement: {
        likes: 2100,
        shares: 167,
        comments: 78,
        views: 11200
      },
      earnings: "42.3 FPT",
      category: "AI & Tech"
    },
    {
      id: 6,
      type: 'trending',
      title: "Ethereum Merge Anniversary: 1 Year Later",
      views: "38.9K",
      timeAgo: "2h",
      category: "Analysis"
    }
  ];

  const liveStats = [
    { label: "Active Creators", value: "2,847", icon: Users, color: "text-green-400" },
    { label: "Total Rewards Paid", value: "$2.5M", icon: DollarSign, color: "text-yellow-400" },
    { label: "Content Pieces", value: "500K+", icon: Star, color: "text-purple-400" },
    { label: "Success Rate", value: "89%", icon: Award, color: "text-blue-400" }
  ];

  const renderFeedItem = (item: any) => {
    if (item.type === 'trending') {
      return (
        <Card key={item.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-red-600 text-white text-xs">Trending</Badge>
              <span className="text-gray-500 text-sm">{item.timeAgo}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">{item.title}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              <span>{item.views} views</span>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={item.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
        <CardContent className="p-4">
          {/* User Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">{item.creator.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{item.creator}</span>
                  <Badge className={`text-xs ${
                    item.badge === 'Platinum Creator' ? 'bg-purple-500 text-white' : 
                    item.badge === 'Gold Creator' ? 'bg-yellow-500 text-black' : 
                    'bg-gray-500 text-white'
                  }`}>
                    {item.badge}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <span>{item.handle}</span>
                  <span>•</span>
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white text-xs">{item.category}</Badge>
          </div>

          {/* Content */}
          <div className="mb-3">
            <h3 className="text-white font-semibold text-lg mb-2">{item.content}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* Image */}
          {item.image && (
            <div className="mb-3">
              <img 
                src={item.image} 
                alt={item.content}
                className="w-full h-64 rounded-lg object-cover"
              />
            </div>
          )}

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
            <div className="flex items-center space-x-4">
              <span>{item.engagement.views.toLocaleString()} views</span>
              <span>{item.engagement.comments} comments</span>
            </div>
            <span className="text-green-400 font-semibold">{item.earnings}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-800">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                <Heart className="w-5 h-5" />
                <span>{item.engagement.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{item.engagement.comments}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                <Repeat2 className="w-5 h-5" />
                <span>{item.engagement.shares}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Compact */}
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Earn Crypto for Contributing Content or Sharing Value
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

        {/* Two Column Layout: Feed + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Live Feed</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="text-sm border-gray-600 text-gray-300">
                  Latest
                </Button>
                <Button variant="outline" className="text-sm border-gray-600 text-gray-300">
                  Trending
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {feedContent.map(renderFeedItem)}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => onNavigate?.(1)}
              >
                Sign Up to See More Content
              </Button>
            </div>
          </div>

          {/* Right Sidebar */}
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
