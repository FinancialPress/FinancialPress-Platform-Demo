import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Play, Heart, MessageCircle, Share2, Eye, MoreHorizontal, Bookmark, HandCoins } from 'lucide-react';

interface LiveFeedSectionProps {
  isDarkMode?: boolean;
}

const LiveFeedSection = ({ isDarkMode = true }: LiveFeedSectionProps) => {
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
    }
  ];

  const featuredBreakingNews = {
    id: 1,
    title: "Bank of Japan Pivot to QE May Fuel Bitcoin Rally",
    description: "Central bank's monetary policy shift could trigger significant cryptocurrency market movement as institutional adoption accelerates globally.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    author: "Arthur Hayes",
    handle: "@arthurhayes",
    badge: "Gold Creator",
    timeAgo: "2h",
    views: "45.2K",
    comments: 89,
    shares: 156,
    likes: 2400,
    earnings: "52.8",
    isFeatured: true
  };

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

const tabButtonClasses = (isActive: boolean) => {
  const base = 'flex-1 flex items-center justify-center gap-2 rounded-none py-4 text-sm font-semibold transition-colors';

  if (isDarkMode) {
    return `${base} ${
      isActive
        ? '!bg-gray-800 text-white border-b-4 border-yellow-500 hover:text-yellow-400'
        : 'text-gray-500 hover:text-yellow-400 hover:bg-gray-800/50'
    }`;
  } else {
    return `${base} ${
      isActive
        ? 'bg-gray-100 text-black border-b-4 border-yellow-500 hover:text-black'
        : 'text-gray-500 hover:text-black hover:bg-gray-200'
    }`;
  }
};

  const contentAreaClasses = isDarkMode ? "p-6" : "p-6 bg-gray-50";

  return (
    <Card className={`${cardClasses} mb-8`}>
      <CardContent className="p-0">
        {/* Tab Headers */}
        <div className={`flex ${isDarkMode ? 'border-b border-gray-800' : 'border-b border-gray-200'}`}>
          <Button
            variant="ghost"
            className={tabButtonClasses(activeTab === 'live')}
            onClick={() => setActiveTab('live')}
          >
            <Play className="w-4 h-4 mr-2" />
            LIVE FEED
          </Button>
          <Button
            variant="ghost"
            className={tabButtonClasses(activeTab === 'breaking')}
            onClick={() => setActiveTab('breaking')}
          >
            Breaking News
          </Button>
        </div>

        {/* Content */}
        <div className={contentAreaClasses}>
          {activeTab === 'live' ? (
            <div className="max-w-4xl mx-auto">
              {/* Expanded Video Preview */}
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/bc7342b7-7709-4a4a-899f-db6fdca5df1c.png" 
                  alt="Live podcast streaming" 
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                    <Play className="w-10 h-10 text-black ml-1" />
                  </div>
                </div>
                {/* Live indicator */}
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-2 rounded text-sm font-semibold">
                  LIVE
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Single Featured Breaking News Article */}
              <div className="space-y-6">
                <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={featuredBreakingNews.image}
                    alt={featuredBreakingNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Featured Article Card */}
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}>
                  <CardContent className="p-6">
                    {/* Author Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-lg">A</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-medium text-lg`}>{featuredBreakingNews.author}</span>
                          <Badge className="bg-yellow-500 text-black">{featuredBreakingNews.badge}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-red-600 text-white">Breaking News</Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-2xl mb-4`}>
                      {featuredBreakingNews.title}
                    </h1>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-6 leading-relaxed`}>
                      {featuredBreakingNews.description}
                    </p>

                    {/* Stats -- MODIFIED: removed comments count, added 'views' */}
                    <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                      <div className="flex items-center space-x-6 text-base">
                        <span>{featuredBreakingNews.views} views</span>
                      </div>
                      <div className="ml-auto text-green-400 font-semibold">
                        <span className="text-lg">{featuredBreakingNews.earnings} FPT Earned</span>
                      </div>
                    </div>

                    {/* Footer Actions -- MODIFIED last button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'} transition-colors`}>
                          <Heart className="w-5 h-5" />
                          <span className="text-base">{featuredBreakingNews.likes}</span>
                        </button>
                        <button className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors`}>
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-base">{featuredBreakingNews.comments}</span>
                        </button>
                        <button className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'} transition-colors`}>
                          <Share2 className="w-5 h-5" />
                          <span className="text-base">{featuredBreakingNews.shares}</span>
                        </button>
                        <button className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-500'} transition-colors`}>
                          <Share2 className="w-5 h-5" />
                          <span className="text-base">Share and Earn</span>
                        </button>
                      </div>
                      {/* REPLACED: Bookmark icon with HandCoins and "Tips" label */}
                      <button className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-500'} transition-colors`}>
                        <HandCoins className="w-5 h-5" />
                        <span className="text-base">Tips</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveFeedSection;
