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
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Video and Article Card */}
              <div className="space-y-4">
                {/* Featured Video Preview */}
                <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
<img 
  src="https://plus.unsplash.com/premium_photo-1661322680862-c50786006970?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbnRlbnQlMjBjcmVhdG9yJTIweW91dHViZSUyMHN0b2NrJTIwbWFya2V0fGVufDB8fDB8fHww" 
  alt="Stock market content creator streaming live" 
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
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}>
                  <CardContent className="p-4">
                    {/* Author Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-sm">A</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-medium`}>Arthur Hayes</span>
                          <Badge className="bg-yellow-500 text-black text-xs">Gold Creator</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MoreHorizontal className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={`${isDarkMode ? 'text-white' : 'text-black'} font-semibold text-lg mb-2`}>
                      How Japan's Central Bank Could Spark the Next Bitcoin Surge
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-4`}>
                      Trusted FinTech vlogger Arthur Hayes takes you inside the latest central bank policy shift in Japan, unpacking the key opportunities for investors and the potential risks that could impact global crypto markets. In this live session, he explores how institutional sentiment is shifting and what it means for Bitcoin's next rally. Tune in for sharp insights, real-time reactions, and actionable takeaways...
                    </p>

                    {/* Stats - MODIFIED: removed comments count and shares, added 'views' */}
                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      <div className="flex items-center space-x-4">
                        <span>45.2K views</span>
                      </div>
                      <div className="ml-auto text-green-400 font-semibold">
                        <span className="text-sm">52.8 FPT Earned</span>
                      </div>
                    </div>

                    {/* Footer Actions - MODIFIED: added Share & Earn and Tips buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'} transition-colors`}>
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">2400</span>
                        </button>
                        <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors`}>
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">89</span>
                        </button>
                        <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'} transition-colors`}>
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">156</span>
                        </button>
                        <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-500'} transition-colors`}>
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">Share & Earn</span>
                        </button>
                      </div>
                      <button className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-500'} transition-colors`}>
                        <HandCoins className="w-4 h-4" />
                        <span className="text-sm">Tips</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Live Feeds Menu */}
              <div className="space-y-4">
                <h3 className={`${isDarkMode ? 'text-white' : 'text-black'} font-semibold text-lg`}>Trending Live Feeds</h3>
                <div className="space-y-3">
                  {liveFeeds.map((feed, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-3 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg transition-colors cursor-pointer`}>
                      <div className="flex items-center space-x-2 flex-1">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-xs">{feed.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-medium text-sm truncate`}>{feed.host}</span>
                            {feed.isVerified && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xs line-clamp-2`}>{feed.title}</p>
                          <Badge className="bg-purple-600 text-white text-xs mt-1">{feed.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-600 rounded-full px-2 py-1">
                        <Users className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-semibold">{feed.viewers}</span>
                      </div>
                    </div>
                  ))}
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
                        <MoreHorizontal className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
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
                          <span className="text-base">Share & Earn</span>
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
