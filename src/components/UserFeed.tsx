
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  TrendingUp,
  Eye,
  Clock,
  Play,
  Volume2,
  FileText,
  ExternalLink,
  Award,
  Zap,
  Users,
  DollarSign,
  Star,
  ArrowUp,
  Settings,
  Filter
} from 'lucide-react';

const UserFeed = () => {
  // Personalized featured content based on user interests
  const personalizedContent = [
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
      category: "Crypto Analysis",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop",
      isRecommended: true
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
      category: "DeFi",
      hasImage: false,
      isFollowing: true
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
      category: "NFTs",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=150&fit=crop"
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
      category: "AI & Tech",
      hasImage: false,
      isRecommended: true
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
      category: "Macroeconomics",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=150&fit=crop",
      isFollowing: true
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
      category: "Blockchain",
      hasImage: false
    },
    {
      title: "Altcoin Season Alert: Top 10 Gems Under $1",
      creator: "AltcoinHunter",
      badge: "Silver Creator",
      engagement: "1.5K tips",
      earnings: "31.2 FPT",
      views: "7.8K",
      comments: 56,
      shares: 98,
      timeAgo: "2d ago",
      category: "Altcoins",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop",
      isRecommended: true
    },
    {
      title: "Stablecoin Market Analysis: USDT vs USDC",
      creator: "StableMaster",
      badge: "Gold Creator",
      engagement: "1.1K tips",
      earnings: "24.6 FPT",
      views: "5.2K",
      comments: 34,
      shares: 67,
      timeAgo: "2d ago",
      category: "Stablecoins",
      hasImage: false
    },
    {
      title: "Layer 2 Solutions: Arbitrum's Latest Upgrade",
      creator: "L2Expert",
      badge: "Platinum Creator",
      engagement: "2.8K tips",
      earnings: "52.3 FPT",
      views: "13.6K",
      comments: 101,
      shares: 203,
      timeAgo: "3d ago",
      category: "Layer 2",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=150&fit=crop"
    }
  ];

  const trendingStories = [
    { title: "SEC Approves Bitcoin ETF Options Trading", views: "45.2K", timeAgo: "1h" },
    { title: "Ethereum Merge Anniversary: 1 Year Later", views: "38.9K", timeAgo: "2h" },
    { title: "Binance Launches New DeFi Product Suite", views: "32.1K", timeAgo: "3h" },
    { title: "Tesla Adds Dogecoin Payment Option", views: "28.7K", timeAgo: "4h" },
    { title: "Cardano Smart Contracts Hit New Milestone", views: "25.3K", timeAgo: "5h" },
    { title: "Polygon zkEVM Goes Live on Mainnet", views: "22.8K", timeAgo: "6h" },
    { title: "Chainlink Oracle Network Expansion", views: "19.4K", timeAgo: "7h" },
    { title: "Uniswap V4 Beta Testing Begins", views: "17.2K", timeAgo: "8h" }
  ];

  const quickPosts = [
    { title: "BTC Technical Analysis: Key Levels", creator: "ChartMaster", tips: "1.2K", timeAgo: "30m" },
    { title: "Altseason Indicators Flashing Green", creator: "AltTrader", tips: "980", timeAgo: "45m" },
    { title: "DeFi TVL Surpasses $200B Milestone", creator: "DeFiData", tips: "2.1K", timeAgo: "1h" },
    { title: "NFT Volume Spikes 340% This Week", creator: "NFTStats", tips: "1.5K", timeAgo: "1h" },
    { title: "Institutional Adoption Report Q4", creator: "InstitutionalPro", tips: "3.2K", timeAgo: "2h" },
    { title: "Yield Farming Strategies Updated", creator: "YieldGuru", tips: "890", timeAgo: "2h" }
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

  const userStats = [
    { label: "Your Earnings", value: "124.8 FPT", icon: DollarSign, color: "text-green-400" },
    { label: "Following", value: "23", icon: Users, color: "text-blue-400" },
    { label: "Content Shared", value: "67", icon: Star, color: "text-purple-400" },
    { label: "Tips Received", value: "1.2K", icon: Award, color: "text-yellow-400" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Personalized Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Your Personalized Financial Feed
          </h1>
          <p className="text-base text-gray-300 mb-4 max-w-2xl mx-auto">
            Content curated based on your interests in Crypto, DeFi, and AI Trading.
          </p>
          <div className="flex gap-3 justify-center mb-6">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-5 py-2">
              Create Content
            </Button>
            <Button variant="outline" className="font-bold px-5 py-2">
              <Settings className="w-4 h-4 mr-2" />
              Customize Feed
            </Button>
          </div>
          
          {/* Personalized Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {userStats.map((stat, index) => (
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

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-8">
            {/* Filter Options */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold">For You</h2>
                <Badge className="bg-yellow-600 text-black text-xs">Personalized</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="text-sm">
                  View All
                </Button>
              </div>
            </div>

            {/* Personalized Featured Content */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4">
                {personalizedContent.map((content, index) => (
                  <Card key={index} className="bg-gray-900 border-gray-800 hover:border-yellow-500 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          <Badge className="bg-blue-600 text-white text-xs">{content.category}</Badge>
                          {content.isRecommended && (
                            <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                          )}
                          {content.isFollowing && (
                            <Badge className="bg-purple-600 text-white text-xs">Following</Badge>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs">{content.timeAgo}</span>
                      </div>
                      
                      {/* Conditional Image */}
                      {content.hasImage && (
                        <div className="mb-2">
                          <img 
                            src={content.thumbnail} 
                            alt={content.title}
                            className="w-full h-20 rounded object-cover"
                          />
                        </div>
                      )}
                      
                      <h3 className="text-sm font-semibold mb-2 text-white line-clamp-2">{content.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-300 text-xs">{content.creator}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
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
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">{content.engagement}</span>
                        <span className="text-green-400 font-semibold">{content.earnings}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trending Stories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Trending Stories</h2>
              <div className="grid grid-cols-2 gap-3">
                {trendingStories.map((story, index) => (
                  <Card key={index} className="bg-gray-900 border-gray-800 hover:border-yellow-500 transition-colors">
                    <CardContent className="p-3">
                      <h3 className="text-sm font-medium text-white mb-1 line-clamp-1">{story.title}</h3>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{story.views} views</span>
                        </div>
                        <span>{story.timeAgo}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Posts */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Posts</h2>
              <div className="grid grid-cols-3 gap-3">
                {quickPosts.map((post, index) => (
                  <Card key={index} className="bg-gray-900 border-gray-800">
                    <CardContent className="p-3">
                      <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">{post.title}</h3>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">@{post.creator}</span>
                        <span className="text-yellow-400">{post.tips} tips</span>
                      </div>
                      <span className="text-gray-500 text-xs">{post.timeAgo}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-4">
            {/* Your Interests */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Your Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Crypto", "DeFi", "AI Trading", "NFTs", "Blockchain"].map((interest, index) => (
                    <Badge key={index} className="bg-yellow-600 text-black text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-yellow-500" />
                  Trending Topics
                </h3>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between py-1 border-b border-gray-800 last:border-b-0">
                      <div>
                        <div className="font-medium text-white text-sm">#{topic.name}</div>
                        <div className="text-gray-400 text-xs">{topic.posts} posts</div>
                      </div>
                      <div className="flex items-center text-green-400 text-xs">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        {topic.growth}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Creators */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-yellow-500" />
                  Top Creators
                </h3>
                <div className="space-y-2">
                  {topCreators.map((creator, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-bold text-yellow-500">#{index + 1}</div>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-white text-xs">{creator.name}</div>
                          <div className="text-gray-400 text-xs">{creator.followers}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-xs">{creator.earnings}</div>
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
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm">
                    Create Content
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    Manage Interests
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    View Analytics
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

export default UserFeed;
