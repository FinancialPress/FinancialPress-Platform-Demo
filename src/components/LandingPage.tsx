
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';

const LandingPage = () => {
  const featuredContent = [
    {
      title: "Bitcoin Bull Run: What's Driving the $94K Rally?",
      creator: "CryptoAnalyst",
      badge: "Gold Creator",
      engagement: "2.4K tips",
      earnings: "45.8 FPT"
    },
    {
      title: "DeFi Renaissance: Top 5 Protocols to Watch in 2024",
      creator: "DeFiGuru",
      badge: "Platinum Creator",
      engagement: "1.8K tips",
      earnings: "38.2 FPT"
    },
    {
      title: "NFT Market Recovery: Blue Chips Lead the Way",
      creator: "NFTTracker",
      badge: "Silver Creator",
      engagement: "1.2K tips",
      earnings: "28.5 FPT"
    }
  ];

  const topCreators = [
    { name: "CryptoWhale", earnings: "1,250 FPT", badge: "Platinum" },
    { name: "BlockchainBull", earnings: "1,150 FPT", badge: "Gold" },
    { name: "DeFiDegen", earnings: "980 FPT", badge: "Gold" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Earn crypto by sharing quality content
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the Web3 platform for creators, curators, and commentators. 
            Turn your influence into earnings with every share.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              Start Earning
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8 mb-20">
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

        {/* Featured Content */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Content</h2>
          <div className="grid grid-cols-3 gap-8">
            {featuredContent.map((content, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:border-yellow-500 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">{content.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-300">{content.creator}</span>
                      <Badge className="bg-yellow-500 text-black">{content.badge}</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{content.engagement}</span>
                    <span className="text-green-400 font-semibold">Earned: {content.earnings}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Top Creators This Week</h2>
          <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
            <CardContent className="p-8">
              {topCreators.map((creator, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-800 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-yellow-500">#{index + 1}</div>
                    <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-white">{creator.name}</div>
                      <Badge className={`${creator.badge === 'Platinum' ? 'bg-purple-500' : 'bg-yellow-500'} text-black`}>
                        {creator.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-green-400 font-bold">{creator.earnings}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
