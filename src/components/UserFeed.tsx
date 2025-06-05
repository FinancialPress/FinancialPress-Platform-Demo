
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share2, DollarSign, TrendingUp, Clock, Filter } from 'lucide-react';

const UserFeed = () => {
  const [selectedFilter, setSelectedFilter] = useState('trending');

  const feedPosts = [
    {
      id: 1,
      title: "Bitcoin Breaks $95K: Technical Analysis and What's Next",
      summary: "In-depth analysis of Bitcoin's recent breakout past $95,000, key resistance levels, and potential targets for the next leg up...",
      creator: "CryptoWhale",
      badge: "Platinum",
      avatar: "CW",
      timeAgo: "2h ago",
      likes: 234,
      comments: 45,
      shares: 67,
      estimatedEarnings: "2.4 FPT",
      topics: ["Bitcoin", "Technical Analysis"],
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "DeFi 2.0: The Next Generation of Decentralized Finance",
      summary: "Exploring the evolution of DeFi protocols, new innovations in yield farming, and the protocols leading the charge...",
      creator: "DeFiGuru",
      badge: "Gold",
      avatar: "DG",
      timeAgo: "4h ago",
      likes: 189,
      comments: 32,
      shares: 54,
      estimatedEarnings: "1.8 FPT",
      topics: ["DeFi", "Protocols"],
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "AI Stocks Surge: Which Companies Are Leading the Revolution",
      summary: "Market analysis of AI-focused companies, their Q4 earnings, and investment opportunities in the artificial intelligence sector...",
      creator: "TechAnalyst",
      badge: "Platinum", 
      avatar: "TA",
      timeAgo: "6h ago",
      likes: 156,
      comments: 28,
      shares: 41,
      estimatedEarnings: "1.5 FPT",
      topics: ["AI", "Stocks"],
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
    }
  ];

  const suggestedFollows = [
    { name: "BlockchainBull", followers: "180K", topic: "Market Analysis" },
    { name: "NFTSeer", followers: "120K", topic: "NFT Trends" },
    { name: "MacroMind", followers: "250K", topic: "Economics" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="col-span-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-4">Your Feed</h1>
              
              <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
                <TabsList className="bg-gray-900 border-gray-800">
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
                                className="w-24 h-24 rounded-lg object-cover"
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
                                      } text-black`}>
                                        {post.badge}
                                      </Badge>
                                    </div>
                                    <span className="text-gray-400 text-sm">{post.timeAgo}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-green-400 font-semibold text-sm">
                                    Est. earnings: {post.estimatedEarnings}
                                  </div>
                                </div>
                              </div>

                              <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                              <p className="text-gray-300 mb-4 line-clamp-2">{post.summary}</p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                  <div className="flex items-center space-x-2 text-gray-400">
                                    <Heart className="w-5 h-5" />
                                    <span>{post.likes}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-400">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>{post.comments}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-400">
                                    <Share2 className="w-5 h-5" />
                                    <span>{post.shares}</span>
                                  </div>
                                </div>

                                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share & Earn
                                </Button>
                              </div>

                              <div className="flex gap-2 mt-3">
                                {post.topics.map((topic) => (
                                  <Badge key={topic} variant="outline" className="border-gray-600 text-gray-300">
                                    {topic}
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
            {/* Topic Filters */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter by Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Crypto', 'Stocks', 'Tech', 'AI', 'DeFi', 'NFTs'].map((topic) => (
                    <Button
                      key={topic}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Follows */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Suggested for You</h3>
                <div className="space-y-4">
                  {suggestedFollows.map((creator) => (
                    <div key={creator.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-white">{creator.name}</div>
                          <div className="text-sm text-gray-400">{creator.followers} • {creator.topic}</div>
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

            {/* Quick Stats */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shares Today</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">FPT Earned</span>
                    <span className="text-green-400 font-semibold">24.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Rank</span>
                    <span className="text-yellow-500 font-semibold">#47</span>
                  </div>
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
