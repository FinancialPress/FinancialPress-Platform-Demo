
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share2, DollarSign, TrendingUp, Clock, Filter, Eye, Bookmark, MoreHorizontal, ArrowUp, Star, Users, Award } from 'lucide-react';

const UserFeed = () => {
  const [selectedFilter, setSelectedFilter] = useState('trending');

  const feedPosts = [
    {
      id: 1,
      title: "Bitcoin Breaks $95K: Technical Analysis and What's Next",
      summary: "In-depth analysis of Bitcoin's recent breakout past $95,000, key resistance levels, and potential targets for the next leg up. Looking at volume, RSI, and key support zones...",
      creator: "CryptoWhale",
      badge: "Platinum",
      avatar: "CW",
      timeAgo: "2h ago",
      likes: 234,
      comments: 45,
      shares: 67,
      views: "12.5K",
      estimatedEarnings: "2.4 FPT",
      topics: ["Bitcoin", "Technical Analysis"],
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      category: "Crypto Analysis",
      readTime: "5 min read",
      engagement: 89
    },
    {
      id: 2,
      title: "DeFi 2.0: The Next Generation of Decentralized Finance",
      summary: "Exploring the evolution of DeFi protocols, new innovations in yield farming, and the protocols leading the charge in the next wave of decentralized finance...",
      creator: "DeFiGuru",
      badge: "Gold",
      avatar: "DG",
      timeAgo: "4h ago",
      likes: 189,
      comments: 32,
      shares: 54,
      views: "8.9K",
      estimatedEarnings: "1.8 FPT",
      topics: ["DeFi", "Protocols"],
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      category: "DeFi",
      readTime: "7 min read",
      engagement: 76
    },
    {
      id: 3,
      title: "AI Stocks Surge: Which Companies Are Leading the Revolution",
      summary: "Market analysis of AI-focused companies, their Q4 earnings, and investment opportunities in the artificial intelligence sector. NVIDIA, Microsoft, and emerging players...",
      creator: "TechAnalyst",
      badge: "Platinum", 
      avatar: "TA",
      timeAgo: "6h ago",
      likes: 156,
      comments: 28,
      shares: 41,
      views: "11.2K",
      estimatedEarnings: "1.5 FPT",
      topics: ["AI", "Stocks"],
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      category: "Tech Stocks",
      readTime: "6 min read",
      engagement: 67
    },
    {
      id: 4,
      title: "Solana's Comeback: Why SOL Could Hit $500",
      summary: "Deep dive into Solana's network improvements, growing ecosystem, and why analysts are bullish on SOL reaching new all-time highs...",
      creator: "BlockchainBull",
      badge: "Gold",
      avatar: "BB",
      timeAgo: "8h ago",
      likes: 298,
      comments: 67,
      shares: 89,
      views: "15.7K",
      estimatedEarnings: "3.2 FPT",
      topics: ["Solana", "Altcoins"],
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
      category: "Crypto Analysis",
      readTime: "4 min read",
      engagement: 92
    },
    {
      id: 5,
      title: "Fed Policy Shift: Impact on Crypto and Traditional Markets",
      summary: "Analysis of the Federal Reserve's latest policy decisions and their ripple effects across cryptocurrency and traditional financial markets...",
      creator: "MacroMind",
      badge: "Platinum",
      avatar: "MM",
      timeAgo: "12h ago",
      likes: 167,
      comments: 43,
      shares: 76,
      views: "9.8K",
      estimatedEarnings: "2.1 FPT",
      topics: ["Fed", "Macro"],
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      category: "Macroeconomics",
      readTime: "8 min read",
      engagement: 78
    }
  ];

  const suggestedFollows = [
    { name: "BlockchainBull", followers: "180K", topic: "Market Analysis", posts: 234, badge: "Platinum" },
    { name: "NFTSeer", followers: "120K", topic: "NFT Trends", posts: 156, badge: "Gold" },
    { name: "MacroMind", followers: "250K", topic: "Economics", posts: 189, badge: "Platinum" },
    { name: "DeFiDegen", followers: "95K", topic: "DeFi Protocols", posts: 167, badge: "Silver" }
  ];

  const trendingNow = [
    { topic: "Bitcoin ETF", posts: 234, change: "+15%" },
    { topic: "AI Regulation", posts: 189, change: "+23%" },
    { topic: "DeFi Yields", posts: 156, change: "+8%" },
    { topic: "NFT Gaming", posts: 134, change: "+12%" },
    { topic: "Stablecoin News", posts: 98, change: "+6%" }
  ];

  const categories = [
    { name: "Crypto", count: 1234, active: true },
    { name: "Stocks", count: 890, active: false },
    { name: "Tech", count: 567, active: false },
    { name: "AI", count: 445, active: false },
    { name: "DeFi", count: 334, active: false },
    { name: "NFTs", count: 223, active: false },
    { name: "Macro", count: 178, active: false }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="col-span-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">Your Feed</h1>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    Create Post
                  </Button>
                </div>
              </div>
              
              <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
                <TabsList className="bg-gray-900 border-gray-800 mb-6">
                  <TabsTrigger value="trending" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="tipped" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Most Tipped
                  </TabsTrigger>
                  <TabsTrigger value="newest" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                    <Clock className="w-4 h-4 mr-2" />
                    Newest
                  </TabsTrigger>
                  <TabsTrigger value="following" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                    Following
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedFilter} className="mt-6">
                  <div className="space-y-6">
                    {feedPosts.map((post) => (
                      <Card key={post.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            {/* Thumbnail */}
                            <div className="flex-shrink-0">
                              <img 
                                src={post.thumbnail} 
                                alt="" 
                                className="w-32 h-24 rounded-lg object-cover"
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-black">
                                    {post.avatar}
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-semibold text-white">{post.creator}</span>
                                      <Badge className={`${
                                        post.badge === 'Platinum' ? 'bg-purple-500' : 'bg-yellow-500'
                                      } text-black text-xs`}>
                                        {post.badge}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                      <span>{post.timeAgo}</span>
                                      <span>•</span>
                                      <span>{post.readTime}</span>
                                      <span>•</span>
                                      <Badge variant="outline" className="border-blue-600 text-blue-400 text-xs">
                                        {post.category}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    <Bookmark className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                              <p className="text-gray-300 mb-4 line-clamp-2">{post.summary}</p>

                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-6">
                                  <div className="flex items-center space-x-2 text-gray-400">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-sm">{post.views}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-400 hover:text-red-400 cursor-pointer">
                                    <Heart className="w-4 h-4" />
                                    <span className="text-sm">{post.likes}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 cursor-pointer">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{post.comments}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-400">
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-sm">{post.shares}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-yellow-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm">{post.engagement}</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                  <div className="text-right">
                                    <div className="text-green-400 font-semibold text-sm">
                                      Est: {post.estimatedEarnings}
                                    </div>
                                  </div>
                                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share & Earn
                                  </Button>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                {post.topics.map((topic) => (
                                  <Badge key={topic} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                                    #{topic}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* User Stats */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">24.8</div>
                    <div className="text-gray-400 text-sm">FPT Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">#47</div>
                    <div className="text-gray-400 text-sm">Your Rank</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">12</div>
                    <div className="text-gray-400 text-sm">Shares Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">156</div>
                    <div className="text-gray-400 text-sm">Total Posts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Now */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
                  Trending Now
                </h3>
                <div className="space-y-3">
                  {trendingNow.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                      <div>
                        <div className="font-medium text-white">#{trend.topic}</div>
                        <div className="text-gray-400 text-sm">{trend.posts} posts</div>
                      </div>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        {trend.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-yellow-500" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={category.active ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-between ${
                        category.active 
                          ? "bg-yellow-500 text-black" 
                          : "border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500"
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs">{category.count}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Follows */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-yellow-500" />
                  Suggested for You
                </h3>
                <div className="space-y-4">
                  {suggestedFollows.map((creator) => (
                    <div key={creator.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white text-sm">{creator.name}</span>
                            <Badge className={`${creator.badge === 'Platinum' ? 'bg-purple-500' : creator.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'} text-black text-xs`}>
                              {creator.badge}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">{creator.followers} • {creator.posts} posts</div>
                          <div className="text-xs text-gray-500">{creator.topic}</div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
