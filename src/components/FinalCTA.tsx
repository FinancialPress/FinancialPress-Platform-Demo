
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Wallet, Star, Award, DollarSign } from 'lucide-react';

const FinalCTA = () => {
  const creatorLeaderboard = [
    { rank: 1, name: "CryptoWhale", earnings: "2,450 FPT", badge: "Platinum", posts: 24 },
    { rank: 2, name: "DeFiGuru", earnings: "2,180 FPT", badge: "Gold", posts: 18 },
    { rank: 3, name: "TechAnalyst", earnings: "1,950 FPT", badge: "Platinum", posts: 22 },
    { rank: 4, name: "BlockchainBull", earnings: "1,720 FPT", badge: "Gold", posts: 15 },
    { rank: 5, name: "NFTSeer", earnings: "1,480 FPT", badge: "Silver", posts: 12 }
  ];

  const distributorLeaderboard = [
    { rank: 1, name: "ShareMaster", earnings: "1,850 FPT", shares: 156, engagement: "45K" },
    { rank: 2, name: "ViralBoost", earnings: "1,620 FPT", shares: 134, engagement: "38K" },
    { rank: 3, name: "ContentCurator", earnings: "1,390 FPT", shares: 121, engagement: "32K" },
    { rank: 4, name: "TrendSetter", earnings: "1,180 FPT", shares: 98, engagement: "28K" },
    { rank: 5, name: "InfluenceHub", earnings: "1,050 FPT", shares: 87, engagement: "24K" }
  ];

  const platformStats = [
    { metric: "Active Wallets", value: "25,847", icon: Wallet, color: "text-blue-400" },
    { metric: "Total FPT Distributed", value: "$2.8M", icon: DollarSign, color: "text-green-400" },
    { metric: "Content Pieces", value: "500K+", icon: Star, color: "text-yellow-400" },
    { metric: "Monthly Users", value: "125K", icon: Users, color: "text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <img 
            src="/lovable-uploads/1a2b168c-aa7f-4ee5-8180-f1bdc8ecd1db.png" 
            alt="FinancialPress Logo" 
            className="w-24 h-24 mx-auto mb-6"
          />
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Create. Share. Earn.
            </span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join FinancialPress and grow your influence in the Web3 economy. 
            Start earning crypto for quality content today.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-4 gap-8 mb-16">
          {platformStats.map((stat, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.metric}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboards */}
        <div className="grid grid-cols-2 gap-12 mb-16">
          {/* Creator Leaderboard */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-yellow-500 mr-3" />
                <h2 className="text-3xl font-bold text-white">Top Creators</h2>
              </div>
              <div className="space-y-4">
                {creatorLeaderboard.map((creator) => (
                  <div key={creator.rank} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        creator.rank === 1 ? 'bg-yellow-500 text-black' : 
                        creator.rank === 2 ? 'bg-gray-400 text-black' : 
                        creator.rank === 3 ? 'bg-amber-600 text-black' : 'bg-gray-600 text-white'
                      }`}>
                        {creator.rank}
                      </div>
                      <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-white">{creator.name}</div>
                        <div className="text-sm text-gray-400">{creator.posts} posts</div>
                      </div>
                      <Badge className={`${
                        creator.badge === 'Platinum' ? 'bg-purple-500' : 
                        creator.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'
                      } text-black`}>
                        {creator.badge}
                      </Badge>
                    </div>
                    <div className="text-green-400 font-bold">{creator.earnings}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distributor Leaderboard */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
                <h2 className="text-3xl font-bold text-white">Top Distributors</h2>
              </div>
              <div className="space-y-4">
                {distributorLeaderboard.map((distributor) => (
                  <div key={distributor.rank} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        distributor.rank === 1 ? 'bg-yellow-500 text-black' : 
                        distributor.rank === 2 ? 'bg-gray-400 text-black' : 
                        distributor.rank === 3 ? 'bg-amber-600 text-black' : 'bg-gray-600 text-white'
                      }`}>
                        {distributor.rank}
                      </div>
                      <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-white">{distributor.name}</div>
                        <div className="text-sm text-gray-400">{distributor.shares} shares • {distributor.engagement} views</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold">{distributor.earnings}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500 max-w-2xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Earning?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of creators and distributors already earning crypto on FinancialPress
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                  Sign Up and Start Earning
                </Button>
                <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-8 py-4 text-lg">
                  Learn More
                </Button>
              </div>
              <div className="mt-6 text-gray-400 text-sm">
                Join 25,000+ users • $2.8M+ distributed • Start earning today
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
