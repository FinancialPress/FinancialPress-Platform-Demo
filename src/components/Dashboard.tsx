
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MessageCircle, 
  Share2, 
  Award,
  BarChart3,
  PlusCircle,
  RefreshCw,
  Target,
  Star,
  Trophy
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const earningsData = [
    { day: 'Mon', earnings: 45 },
    { day: 'Tue', earnings: 52 },
    { day: 'Wed', earnings: 38 },
    { day: 'Thu', earnings: 73 },
    { day: 'Fri', earnings: 67 },
    { day: 'Sat', earnings: 89 },
    { day: 'Sun', earnings: 95 }
  ];

  const platformData = [
    { platform: 'Twitter', earnings: 450 },
    { platform: 'LinkedIn', earnings: 320 },
    { platform: 'Medium', earnings: 280 },
    { platform: 'Substack', earnings: 180 },
    { platform: 'Other', earnings: 120 }
  ];

  const topContent = [
    { title: 'Crypto Report', views: 2500, shares: 85, tips: 12, earnings: 125 },
    { title: 'Tech Analysis', views: 1800, shares: 67, tips: 8, earnings: 89 },
    { title: 'Market Overview', views: 1600, shares: 54, tips: 6, earnings: 76 },
    { title: 'DeFi Explained', views: 1200, shares: 43, tips: 9, earnings: 67 },
    { title: 'NFT Insights', views: 980, shares: 31, tips: 4, earnings: 45 }
  ];

  const achievements = [
    { title: '1000 Reach Club', progress: 85, target: 1000, current: 850 },
    { title: 'Content Creator Pro', progress: 60, target: 100, current: 60 },
    { title: 'Top Master', progress: 40, target: 50, current: 20 },
    { title: 'Viral Resonance', progress: 92, target: 10, current: 9.2 }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">Track your content performance and earnings</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="w-4 h-4 mr-2" />
              Upload Content
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Dashboard */}
          <div className="col-span-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-white">18</div>
                  <div className="text-sm text-gray-400">FP Posts</div>
                  <div className="text-xs text-green-400">+2 vs last week</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-white">75</div>
                  <div className="text-sm text-gray-400">FP Shares</div>
                  <div className="text-xs text-green-400">+8 vs last week</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-white">4,280</div>
                  <div className="text-sm text-gray-400">FPT Earned</div>
                  <div className="text-xs text-green-400">+15% this week</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-white">325</div>
                  <div className="text-sm text-gray-400">FP Network</div>
                  <div className="text-xs text-green-400">+23 this week</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Earnings Over Time */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Earnings Over Time</CardTitle>
                  <p className="text-gray-400 text-sm">Track your daily FPT achievement</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="earnings" stroke="#EAB308" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Earnings by Platform */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Earnings by Platform</CardTitle>
                  <p className="text-gray-400 text-sm">Where your content earns the most</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={platformData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="platform" type="category" stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="earnings" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Content */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center justify-between">
                  Top Performing Content
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    View All
                  </Button>
                </CardTitle>
                <p className="text-gray-400 text-sm">Your highest earning content</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center font-bold text-black">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{content.title}</div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {content.views}
                            </span>
                            <span className="flex items-center">
                              <Share2 className="w-3 h-3 mr-1" />
                              {content.shares}
                            </span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {content.tips}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{content.earnings} FPT</div>
                        <Badge className="bg-yellow-500 text-black text-xs">Top</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Community & Actions */}
          <div className="col-span-4 space-y-6">
            {/* Community Ranking */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Community Ranking
                </CardTitle>
                <p className="text-gray-400 text-sm">Top position in the FinancialPress Community</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-bold text-blue-500 mb-2">#42</div>
                <div className="text-sm text-gray-400 mb-4">of 17,456 Crypto Creators</div>
                <div className="space-y-2">
                  <Badge className="bg-blue-600 text-white">Top Rank</Badge>
                  <Badge className="bg-green-600 text-white">Fair Share</Badge>
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  Personal Rank: Most valued content this week
                </div>
              </CardContent>
            </Card>

            {/* Your Performance */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Your Performance</CardTitle>
                <p className="text-gray-400 text-sm">Current earnings and performance achievements</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-blue-500">#42</div>
                    <div className="text-sm text-gray-400">of 17,456 Crypto Creators</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">Single</div>
                      <div className="text-gray-400">Top performer in your category</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">Theme</div>
                      <div className="text-gray-400">Consistent high-quality content</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Progress */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Achievement Progress</CardTitle>
                <p className="text-gray-400 text-sm">Track your milestones and achievements</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white">{achievement.title}</span>
                        <span className="text-gray-400">{achievement.current}/{achievement.target}</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Network Growth */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Network Growth</CardTitle>
                <p className="text-gray-400 text-sm">Your audience growth and reach</p>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-white">128</div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">345</div>
                      <div className="text-xs text-gray-400">Following</div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    Your profile profile: You have grown and reached 345 community members...
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Upload Content
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    <Users className="w-4 h-4 mr-2" />
                    Audiences
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    <Share2 className="w-4 h-4 mr-2" />
                    Distribute
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
