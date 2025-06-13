
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Play, Heart, MessageCircle, Repeat2, Share2, Bookmark } from 'lucide-react';

const LiveFeedSection = () => {
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

  return (
    <Card className="bg-gray-900 border-gray-800 mb-8">
      <CardContent className="p-0">
        {/* Tab Header */}
        <div className="flex border-b border-gray-800 bg-gray-800">
          <div className="flex-1 py-4 px-6">
            <div className="flex items-center space-x-2 text-white">
              <Play className="w-4 h-4" />
              <span className="font-medium">LIVE FEED</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Side - Video Player and Content Card */}
            <div className="space-y-4">
              {/* Video Player */}
              <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
                <img 
                  src="/lovable-uploads/6d91b935-01e3-422f-8dc4-5ffcb7fccca9.png" 
                  alt="Live Stream" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  {/* Author Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-sm">A</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">Arthur Hayes</span>
                          <Badge className="bg-yellow-500 text-black text-xs">Gold Creator</Badge>
                        </div>
                        <span className="text-gray-400 text-sm">@arthurhayes • 2h</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Tags */}
                  <div className="flex space-x-2 mb-3">
                    <Badge className="bg-blue-600 text-white text-xs">Latest News</Badge>
                    <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Bank of Japan Pivot to QE May Fuel Bitcoin Rally
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4">
                    Central bank's monetary policy shift could trigger significant cryptocurrency market movement as institutional adoption accelerates globally.
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span>45.2K views</span>
                      <span>89 comments</span>
                      <span>156 shares</span>
                    </div>
                    <div className="text-green-400 font-semibold text-right">
                      <div className="text-lg">52.8</div>
                      <div className="text-xs">FPT Earned</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                        <Repeat2 className="w-4 h-4" />
                        <span className="text-sm">156</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share & Earn</span>
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Live Feeds Menu */}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveFeedSection;
