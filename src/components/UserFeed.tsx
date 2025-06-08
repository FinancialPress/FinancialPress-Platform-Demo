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
  Zap
} from 'lucide-react';

const UserFeed = () => {
  const [posts] = useState([
    {
      id: 1,
      type: 'video',
      title: "Live: Bitcoin Technical Analysis - $95K Breakout Confirmed",
      creator: {
        name: "CryptoWhale",
        username: "@cryptowhale",
        avatar: "/api/placeholder/40/40",
        badge: "Platinum",
        verified: true
      },
      content: "Breaking down the key resistance levels and what this means for the next leg up. Watch for these critical support zones.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop",
      duration: "12:34",
      metrics: {
        views: "24.5K",
        likes: 892,
        comments: 156,
        shares: 234,
        tips: "45.8 FPT",
        timeAgo: "2h ago"
      },
      tags: ["Bitcoin", "Technical Analysis", "Live"]
    },
    {
      id: 2,
      type: 'text',
      title: "Why I'm Bullish on Solana's 2024 Roadmap",
      creator: {
        name: "DeFiGuru",
        username: "@defiguru",
        avatar: "/api/placeholder/40/40",
        badge: "Gold",
        verified: true
      },
      content: "The upcoming Firedancer upgrade could be a game-changer for SOL. Here's my detailed analysis of why Solana is positioned to outperform in 2024:\n\n1. Network improvements with Firedancer\n2. Growing ecosystem adoption\n3. Institutional interest picking up\n4. Developer activity at all-time highs\n\nThe technical fundamentals are stronger than ever, and the market is starting to recognize this value proposition.",
      metrics: {
        views: "18.2K",
        likes: 654,
        comments: 89,
        shares: 167,
        tips: "32.4 FPT",
        timeAgo: "4h ago"
      },
      tags: ["Solana", "DeFi", "Analysis"]
    },
    {
      id: 3,
      type: 'image',
      title: "DeFi TVL Reaches New All-Time High: $180B",
      creator: {
        name: "DeFiTracker",
        username: "@defitracker",
        avatar: "/api/placeholder/40/40",
        badge: "Silver",
        verified: false
      },
      content: "Total Value Locked across all DeFi protocols just hit a new milestone. This chart shows the incredible growth we've seen this year.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      metrics: {
        views: "12.8K",
        likes: 445,
        comments: 67,
        shares: 123,
        tips: "28.9 FPT",
        timeAgo: "6h ago"
      },
      tags: ["DeFi", "TVL", "Data"]
    },
    {
      id: 4,
      type: 'link',
      title: "Federal Reserve Signals Potential Rate Cuts",
      creator: {
        name: "MacroMind",
        username: "@macromind",
        avatar: "/api/placeholder/40/40",
        badge: "Platinum",
        verified: true
      },
      content: "This could be the catalyst crypto markets have been waiting for. My analysis of what this means for digital assets and traditional markets.",
      linkPreview: {
        title: "Fed Chair Powell Hints at Rate Cuts in 2024",
        description: "Federal Reserve Chairman Jerome Powell suggested the central bank may cut interest rates multiple times this year...",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=300&fit=crop",
        domain: "reuters.com"
      },
      metrics: {
        views: "31.5K",
        likes: 1203,
        comments: 234,
        shares: 456,
        tips: "68.7 FPT",
        timeAgo: "8h ago"
      },
      tags: ["Fed", "Macro", "Analysis"]
    },
    {
      id: 5,
      type: 'document',
      title: "Q4 2024 Crypto Market Report - 50 Pages of Analysis",
      creator: {
        name: "ResearchPro",
        username: "@researchpro",
        avatar: "/api/placeholder/40/40",
        badge: "Gold",
        verified: true
      },
      content: "Comprehensive breakdown of market trends, institutional adoption, and 2025 predictions. Free download for FP members.",
      document: {
        title: "Q4-2024-Crypto-Market-Report.pdf",
        pages: 50,
        size: "2.3 MB"
      },
      metrics: {
        views: "9.2K",
        likes: 234,
        comments: 45,
        shares: 189,
        tips: "41.2 FPT",
        timeAgo: "12h ago"
      },
      tags: ["Research", "Report", "Q4"]
    },
    {
      id: 6,
      type: 'text',
      title: "Thread: Why NFTs Aren't Dead (10 Part Series)",
      creator: {
        name: "NFTAnalyst",
        username: "@nftanalyst",
        avatar: "/api/placeholder/40/40",
        badge: "Silver",
        verified: false
      },
      content: "1/10 🧵 Despite what you might hear, NFTs are evolving rapidly. Here's what most people are missing about the space:\n\nUtility-first projects are gaining traction, blue chips are consolidating, and institutional interest is quietly building...",
      threadCount: 10,
      metrics: {
        views: "15.6K",
        likes: 567,
        comments: 123,
        shares: 234,
        tips: "35.8 FPT",
        timeAgo: "1d ago"
      },
      tags: ["NFTs", "Thread", "Analysis"]
    }
  ]);

  const renderPostContent = (post: any) => {
    switch (post.type) {
      case 'video':
        return (
          <div className="relative mb-4">
            <img 
              src={post.thumbnail} 
              alt={post.title}
              className="w-full h-64 rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              <Button className="bg-white/90 hover:bg-white text-black rounded-full p-4">
                <Play className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {post.duration}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="mb-4">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 rounded-lg object-cover"
            />
          </div>
        );
      
      case 'link':
        return (
          <div className="mb-4">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="flex">
                <img 
                  src={post.linkPreview.image} 
                  alt=""
                  className="w-32 h-24 object-cover"
                />
                <div className="p-3 flex-1">
                  <h4 className="text-white text-sm font-medium line-clamp-2">{post.linkPreview.title}</h4>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{post.linkPreview.description}</p>
                  <div className="flex items-center mt-2">
                    <ExternalLink className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-gray-400 text-xs">{post.linkPreview.domain}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case 'document':
        return (
          <div className="mb-4">
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">{post.document.title}</h4>
                  <p className="text-gray-400 text-xs">{post.document.pages} pages • {post.document.size}</p>
                </div>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs px-3 py-1">
                  Download
                </Button>
              </div>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="col-span-8">
            {/* Create Post Button */}
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>YOU</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    className="flex-1 justify-start bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                  >
                    Share your financial insights...
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6">
                    Create
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.creator.avatar} />
                          <AvatarFallback>{post.creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">{post.creator.name}</span>
                            {post.creator.verified && <Award className="w-4 h-4 text-yellow-500" />}
                            <Badge className={`text-xs ${
                              post.creator.badge === 'Platinum' ? 'bg-purple-600' :
                              post.creator.badge === 'Gold' ? 'bg-yellow-600' : 'bg-gray-600'
                            }`}>
                              {post.creator.badge}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <span>{post.creator.username}</span>
                            <span>•</span>
                            <span>{post.metrics.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>

                    {/* Post Content */}
                    {renderPostContent(post)}

                    {/* Post Text Content */}
                    <div className="mb-4">
                      <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
                      {post.threadCount && (
                        <Button variant="link" className="text-blue-400 text-sm p-0 mt-2">
                          Show this thread ({post.threadCount} parts)
                        </Button>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Metrics */}
                    <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.metrics.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500">{post.metrics.tips}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.metrics.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.metrics.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
                          <Share2 className="w-4 h-4 mr-1" />
                          {post.metrics.shares}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm px-4">
                        Tip Creator
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4">
            {/* Trending Topics */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Bitcoin ETF", posts: 234, growth: "+15%" },
                    { name: "AI Stocks", posts: 189, growth: "+23%" },
                    { name: "DeFi Yield", posts: 156, growth: "+8%" },
                    { name: "NFT Markets", posts: 134, growth: "+12%" },
                    { name: "Fed Policy", posts: 98, growth: "+34%" }
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                      <div>
                        <div className="font-medium text-white">#{topic.name}</div>
                        <div className="text-gray-400 text-sm">{topic.posts} posts</div>
                      </div>
                      <div className="flex items-center text-green-400 text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
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
                  {[
                    { name: "CryptoWhale", earnings: "1,250 FPT", badge: "Platinum", followers: "45.2K", posts: 127 },
                    { name: "BlockchainBull", earnings: "1,150 FPT", badge: "Gold", followers: "38.9K", posts: 89 },
                    { name: "DeFiDegen", earnings: "980 FPT", badge: "Gold", followers: "32.1K", posts: 156 },
                    { name: "MacroMind", earnings: "890 FPT", badge: "Silver", followers: "28.7K", posts: 78 },
                    { name: "TechAnalyst", earnings: "750 FPT", badge: "Silver", followers: "25.3K", posts: 94 }
                  ].map((creator, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
