
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Play, Heart, MessageCircle, Share2, Eye, MoreHorizontal } from 'lucide-react';

const LiveFeedSection = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'breaking'>('live');

  const liveFeeds = [
    {
      host: "Jorge | The Gaming Strategist",
      title: "Inside @_portals_: The $40K Web3 Game Jam You Need to ...",
      viewers: "+332",
      avatar: "JG",
      isVerified: true,
      category: "Gaming"
    },
    {
      host: "Kearney",
      title: "NightSpawn: Official Gameplay Reveal Stream",
      viewers: "+234",
      avatar: "K",
      isVerified: true,
      category: "Gaming"
    },
    {
      host: "Solana Gaming",
      title: "LIVE w/ Portals: Can Web3 Really Democratize Game ...",
      viewers: "+177",
      avatar: "SG",
      isVerified: true,
      category: "Gaming"
    },
    {
      host: "Mario Nawfal",
      title: "SOL Outperforms: Is ALT Season Around th...",
      viewers: "+3.5K",
      avatar: "MN",
      isVerified: true,
      category: "Crypto"
    },
    {
      host: "Yuli Kay",
      title: "Monthly Crypto News Roundtable with Bitget ...",
      viewers: "+811",
      avatar: "YK",
      isVerified: true,
      category: "Crypto"
    }
  ];

  const breakingNews = [
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
    },
    {
      id: 3,
      title: "TRX set to presale rises to account amid market rebound",
      timeAgo: "18m",
      source: "MarketWatch"
    },
    {
      id: 4,
      title: "SOL jumps 12% as ecosystem growth accelerates",
      timeAgo: "45m",
      source: "DeFiPulse"
    }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800 mb-8">
      <CardContent className="p-0">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-800">
          <Button
            variant="ghost"
            className={`flex-1 rounded-none py-4 ${
              activeTab === 'live' 
                ? 'bg-gray-800 text-white border-b-2 border-yellow-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('live')}
          >
            <Play className="w-4 h-4 mr-2" />
            LIVE FEED
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 rounded-none py-4 ${
              activeTab === 'breaking' 
                ? 'bg-gray-800 text-white border-b-2 border-yellow-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('breaking')}
          >
            Breaking News
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'live' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Video and Article Card */}
              <div className="space-y-4">
                {/* Featured Video Preview */}
                <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop"
                    alt="Live stream presenter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                  {/* Live indicator */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    LIVE
                  </div>
                </div>

                {/* Article Card */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    {/* Author Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-sm">A</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">Arthur Hayes</span>
                          <Badge className="bg-yellow-500 text-black text-xs">Gold Creator</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">2h</span>
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className="bg-blue-600 text-white text-xs">Latest News</Badge>
                      <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                    </div>

                    {/* Content */}
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Bank of Japan Pivot to QE May Fuel Bitcoin Rally
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      Central bank's monetary policy shift could trigger significant cryptocurrency market movement as institutional adoption accelerates globally.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>45.2K views</span>
                        <span>89 comments</span>
                        <span>156 shares</span>
                      </div>
                      <div className="text-green-400 font-semibold text-center">
                        <div className="text-base">52.8</div>
                        <div className="text-xs">FPT Earned</div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">2400</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">89</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">156</span>
                        </button>
                      </div>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold px-3 py-1">
                        Share & Earn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Live Feeds Menu */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">Trending Live Feeds</h3>
                <div className="space-y-3">
                  {liveFeeds.map((feed, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-xs">{feed.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className="text-white font-medium text-sm truncate">{feed.host}</span>
                            {feed.isVerified && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-300 text-xs line-clamp-2">{feed.title}</p>
                          <Badge className="bg-purple-600 text-white text-xs mt-1">{feed.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-red-600 rounded-full px-2 py-1">
                        <Users className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-semibold">{feed.viewers}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {breakingNews.map((news) => (
                <div key={news.id} className="border-b border-gray-800 pb-3 last:border-b-0">
                  <h4 className="text-white font-medium text-sm mb-2">{news.title}</h4>
                  <div className="flex items-center text-gray-400 text-xs">
                    <span>{news.source}</span>
                    <span className="mx-2">•</span>
                    <span>{news.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveFeedSection;
