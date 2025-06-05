import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign, Star, MessageCircle, Share2, Eye, Clock, ArrowUp } from 'lucide-react';

interface LandingPageProps {
  onNavigate?: (screen: number) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const featuredContent = [
    {
      title: "Bitcoin Bull Run: What's Driving the $94K Rally?",
      creator: "CryptoAnalyst",
      badge: "Gold Creator",
      engagement: "2.4K tips",
      earnings: "45.8 FPT",
      views: "12.5K",
      comments: 89,
      shares: 156,
      timeAgo: "2h ago",
      category: "Crypto Analysis"
    },
    {
      title: "DeFi Renaissance: Top 5 Protocols to Watch in 2024",
      creator: "DeFiGuru",
      badge: "Platinum Creator",
      engagement: "1.8K tips",
      earnings: "38.2 FPT",
      views: "8.9K",
      comments: 67,
      shares: 134,
      timeAgo: "4h ago",
      category: "DeFi"
    },
    {
      title: "NFT Market Recovery: Blue Chips Lead the Way",
      creator: "NFTTracker",
      badge: "Silver Creator",
      engagement: "1.2K tips",
      earnings: "28.5 FPT",
      views: "6.7K",
      comments: 45,
      shares: 89,
      timeAgo: "6h ago",
      category: "NFTs"
    },
    {
      title: "AI Revolution in Finance: Which Stocks Will Soar?",
      creator: "TechAnalyst",
      badge: "Gold Creator",
      engagement: "2.1K tips",
      earnings: "42.3 FPT",
      views: "11.2K",
      comments: 78,
      shares: 167,
      timeAgo: "8h ago",
      category: "AI & Tech"
    },
    {
      title: "Macro Outlook: Fed Policy Impact on Crypto Markets",
      creator: "MacroMind",
      badge: "Platinum Creator",
      engagement: "3.2K tips",
      earnings: "58.7 FPT",
      views: "15.8K",
      comments: 123,
      shares: 289,
      timeAgo: "1d ago",
      category: "Macroeconomics"
    },
    {
      title: "Solana vs Ethereum: The L1 Battle Intensifies",
      creator: "BlockchainBull",
      badge: "Gold Creator",
      engagement: "1.9K tips",
      earnings: "36.4 FPT",
      views: "9.3K",
      comments: 92,
      shares: 178,
      timeAgo: "1d ago",
      category: "Blockchain"
    }
  ];

  const topCreators = [
    { name: "CryptoWhale", earnings: "1,250 FPT", badge: "Platinum", followers: "45.2K", posts: 127 },
    { name: "BlockchainBull", earnings: "1,150 FPT", badge: "Gold", followers: "38.9K", posts: 89 },
    { name: "DeFiDegen", earnings: "980 FPT", badge: "Gold", followers: "32.1K", posts: 156 },
    { name: "MacroMind", earnings: "890 FPT", badge: "Silver", followers: "28.7K", posts: 78 },
    { name: "TechAnalyst", earnings: "750 FPT", badge: "Silver", followers: "25.3K", posts: 94 }
  ];

  const trendingTopics = [
    { name: "Bitcoin ETF", posts: 234, growth: "+15%" },
    { name: "AI Stocks", posts: 189, growth: "+23%" },
    { name: "DeFi Yield", posts: 156, growth: "+8%" },
    { name: "NFT Markets", posts: 134, growth: "+12%" },
    { name: "Fed Policy", posts: 98, growth: "+34%" }
  ];

  const liveStats = [
    { label: "Active Now", value: "2,847", color: "text-green-400" },
    { label: "Posts Today", value: "1,234", color: "text-blue-400" },
    { label: "FPT Earned (24h)", value: "12,450", color: "text-yellow-400" },
    { label: "Tips Given", value: "8,967", color: "text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Earn crypto by sharing quality content
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the Web3 platform for creators, curators, and commentators. 
            Turn your influence into earnings with every share.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg"
              onClick={() => onNavigate?.(1)}
            >
              Start Earning
            </Button>
            <Button 
              variant="outline" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>
          
          {/* Live Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-16">
            {liveStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-4 gap-6 mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">25,000+</div>
              <div className="text-gray-400">Active Users</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">$2.5M</div>
              <div className="text-gray-400">Total Rewards Paid</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-gray-400">Platform Uptime</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-gray-400">Content Pieces</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="col-span-8">
            {/* Featured Content */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Featured Content</h2>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {featuredContent.map((content, index) => (
                  <Card key={index} className="bg-gray-900 border-gray-800 hover:border-yellow-500 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-blue-600 text-white text-xs">{content.category}</Badge>
                        <span className="text-gray-400 text-sm">{content.timeAgo}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-white line-clamp-2">{content.title}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{content.creator}</span>
                          <Badge className="bg-yellow-500 text-black text-xs">{content.badge}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{content.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{content.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="w-3 h-3" />
                          <span>{content.shares}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">{content.engagement}</span>
                        <span className="text-green-400 font-semibold text-sm">Earned: {content.earnings}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Trending Topics */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                      <div>
                        <div className="font-medium text-white">#{topic.name}</div>
                        <div className="text-gray-400 text-sm">{topic.posts} posts</div>
                      </div>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        {topic.growth}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Creators Leaderboard */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Top Creators This Week
                </h3>
                <div className="space-y-3">
                  {topCreators.map((creator, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold text-yellow-500">#{index + 1}</div>
                        <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-white text-sm">{creator.name}</div>
                          <div className="text-gray-400 text-xs">{creator.followers} followers • {creator.posts} posts</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-green-400 font-bold text-sm">{creator.earnings}</div>
                        <Badge className={`${creator.badge === 'Platinum' ? 'bg-purple-500' : creator.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'} text-black text-xs`}>
                          {creator.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                    onClick={() => onNavigate?.(1)}
                  >
                    Create Content
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    Browse Categories
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    View Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
