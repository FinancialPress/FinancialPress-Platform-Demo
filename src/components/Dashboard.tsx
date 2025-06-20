
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  Share2, 
  Award,
  BarChart3,
  PlusCircle,
  RefreshCw,
  Star,
  Trophy,
  Video,
  UserPlus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
}

const Dashboard = ({ onNavigate, isDarkMode }: DashboardProps) => {
  const [contentTab, setContentTab] = useState('content');

  const earningsData = [
    { day: 'Mon', value: 5 },
    { day: 'Tue', value: 8 },
    { day: 'Wed', value: 12 },
    { day: 'Thu', value: 18 },
    { day: 'Fri', value: 15 },
    { day: 'Sat', value: 22 },
    { day: 'Sun', value: 20 }
  ];

  const earningsByContentData = [
    { type: 'Articles', value: 145 },
    { type: 'Videos', value: 89 },
    { type: 'Reports', value: 67 },
    { type: 'Live Sessions', value: 34 }
  ];

  const earningsBySharesData = [
    { platform: 'Twitter', value: 78 },
    { platform: 'LinkedIn', value: 65 },
    { platform: 'Medium', value: 43 },
    { platform: 'Telegram', value: 29 },
    { platform: 'Others', value: 18 }
  ];

  const subscriberEarningsData = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 18 },
    { month: 'Mar', value: 25 },
    { month: 'Apr', value: 31 },
    { month: 'May', value: 42 },
    { month: 'Jun', value: 58 }
  ];

  const topContent = [
    { title: 'Crypto Market Analysis', views: 1245, shares: 89, tips: 24, earnings: 45 },
    { title: 'DeFi Investment Guide', views: 987, shares: 67, tips: 18, earnings: 38 },
    { title: 'Bitcoin Technical Analysis', views: 756, shares: 54, tips: 15, earnings: 32 },
    { title: 'Ethereum 2.0 Explained', views: 643, shares: 43, tips: 12, earnings: 28 },
    { title: 'NFT Market Trends', views: 521, shares: 38, tips: 9, earnings: 22 }
  ];

  const topShares = [
    { title: 'Federal Reserve Rate Decision', originalAuthor: 'Sarah Chen', shares: 156, earnings: 28 },
    { title: 'Tesla Q3 Earnings Report', originalAuthor: 'Mike Johnson', shares: 134, earnings: 24 },
    { title: 'Crypto Regulation Update', originalAuthor: 'Alex Rivera', shares: 98, earnings: 18 },
    { title: 'Housing Market Analysis', originalAuthor: 'Emma Davis', shares: 87, earnings: 16 },
    { title: 'AI Stocks Performance', originalAuthor: 'David Park', shares: 76, earnings: 14 }
  ];

  const achievements = [
    { title: '1,000 Shares Club', progress: 85, target: 1000, current: 850 },
    { title: 'Content Creator Pro', progress: 60, target: 100, current: 60 },
    { title: 'Top Master', progress: 40, target: 50, current: 20 },
    { title: 'Viral Sensation', progress: 92, target: 10, current: 9.2 }
  ];

  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const subtleBorder = isDarkMode ? 'border-gray-800' : 'border-gray-300';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const subtleText = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const tooltipBg = isDarkMode ? '#1F2937' : '#FFFFFF';
  const tooltipBorder = isDarkMode ? '#374151' : '#E5E7EB';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className={mutedText}>Track your content performance and earnings</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Dashboard */}
          <div className="col-span-8 space-y-6">
            {/* Key Metrics - Today's Earnings Prominent */}
            <div className="grid grid-cols-4 gap-4">
              {/* Today's Earnings - Made more prominent */}
              <Card className={`${cardClasses} col-span-2 border-2 border-yellow-500`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={mutedText + ' text-lg font-medium'}>Today's Earnings</div>
                    <DollarSign className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-4xl font-bold text-yellow-500 mb-2">18</div>
                  <div className={mutedText + ' text-base mb-2'}>FP Shares</div>
                  <div className="text-sm text-green-400 font-medium">+5% vs yesterday</div>
                </CardContent>
              </Card>
              <Card className={cardClasses}>
                <CardContent className="p-4">
                  <div className={mutedText + ' text-sm mb-1'}>Weekly Earnings</div>
                  <div className="text-2xl font-bold">75</div>
                  <div className={mutedText + ' text-xs'}>FP Shares</div>
                  <div className="text-xs text-green-400">+8 vs last week</div>
                </CardContent>
              </Card>
              <Card className={cardClasses}>
                <CardContent className="p-4">
                  <div className={mutedText + ' text-sm mb-1'}>Wallet Balance</div>
                  <div className="text-2xl font-bold">325</div>
                  <div className={mutedText + ' text-xs'}>FP Tokens</div>
                  <div className="text-xs text-blue-400">Withdraw</div>
                </CardContent>
              </Card>
            </div>

            {/* Original Earnings Charts Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Earnings over time */}
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className={textClasses + ' text-base'}>Earnings Over Time</CardTitle>
                  <p className={mutedText + ' text-xs'}>Weekly performance trend</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="day" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={12} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tooltipBg,
                          border: `1px solid ${tooltipBorder}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Earnings by platform (pie chart) */}
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className={textClasses + ' text-base'}>Earnings by Platform</CardTitle>
                  <p className={mutedText + ' text-xs'}>Distribution across platforms</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={earningsBySharesData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        fontSize={10}
                      >
                        {earningsBySharesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tooltipBg,
                          border: `1px solid ${tooltipBorder}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* New Earnings Charts Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Earnings by Content */}
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className={textClasses + ' text-base'}>Earnings by Content</CardTitle>
                  <p className={mutedText + ' text-xs'}>Your created content performance</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={earningsByContentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="type" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={10} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tooltipBg,
                          border: `1px solid ${tooltipBorder}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Earnings by Shares */}
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className={textClasses + ' text-base'}>Earnings by Shares</CardTitle>
                  <p className={mutedText + ' text-xs'}>Your shared content performance</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={earningsBySharesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="platform" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={10} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tooltipBg,
                          border: `1px solid ${tooltipBorder}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                      <Bar dataKey="value" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Earnings by Subscribers */}
              <Card className={cardClasses}>
                <CardHeader className="pb-3">
                  <CardTitle className={textClasses + ' text-base'}>Subscriber Earnings</CardTitle>
                  <p className={mutedText + ' text-xs'}>Monthly subscriber growth</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={subscriberEarningsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="month" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={10} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} fontSize={10} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tooltipBg,
                          border: `1px solid ${tooltipBorder}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Tabbed Top Performing Content */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={textClasses + ' text-lg'}>Performance Analytics</CardTitle>
                <p className={mutedText + ' text-sm'}>Your top earning content and shares</p>
              </CardHeader>
              <CardContent>
                <Tabs value={contentTab} onValueChange={setContentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="content">Top Performing Content</TabsTrigger>
                    <TabsTrigger value="shares">Top Performing Shares</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content">
                    <div className="space-y-3">
                      <div className={`grid grid-cols-5 gap-4 text-sm ${mutedText} pb-2 border-b ${subtleBorder}`}>
                        <div>Content</div>
                        <div>Views</div>
                        <div>Shares</div>
                        <div>Tips</div>
                        <div>Earnings</div>
                      </div>
                      {topContent.map((content, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 py-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">
                              {content.title.charAt(0)}
                            </div>
                            <span className={textClasses}>{content.title}</span>
                          </div>
                          <div className={subtleText}>{content.views}</div>
                          <div className={subtleText}>{content.shares}</div>
                          <div className={subtleText}>{content.tips}</div>
                          <div className="text-yellow-500 font-medium">{content.earnings} FPT</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="shares">
                    <div className="space-y-3">
                      <div className={`grid grid-cols-4 gap-4 text-sm ${mutedText} pb-2 border-b ${subtleBorder}`}>
                        <div>Shared Content</div>
                        <div>Original Author</div>
                        <div>Shares</div>
                        <div>Earnings</div>
                      </div>
                      {topShares.map((share, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 py-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Share2 className="w-4 h-4 text-green-500" />
                            <span className={textClasses}>{share.title}</span>
                          </div>
                          <div className={subtleText}>{share.originalAuthor}</div>
                          <div className={subtleText}>{share.shares}</div>
                          <div className="text-yellow-500 font-medium">{share.earnings} FPT</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Community & Performance */}
          <div className="col-span-4 space-y-6">
            {/* Community Stats with Followers/Subscribers */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span className={textClasses + ' text-lg'}>Community Stats</span>
                </CardTitle>
                <p className={mutedText + ' text-sm'}>Your audience and engagement</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">1,247</div>
                    <div className={mutedText + ' text-sm'}>Active Followers</div>
                    <div className="text-xs text-green-400">+12% this month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500">89</div>
                    <div className={mutedText + ' text-sm'}>Paid Subscribers</div>
                    <div className="text-xs text-green-400">+8% this month</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-500 mb-2">#42</div>
                  <div className={mutedText + ' text-sm mb-4'}>in FP Crypto Creators</div>
                  <div className="space-y-2 mb-4">
                    <Badge className="bg-blue-600 text-white mr-2">Top Share</Badge>
                    <Badge className="bg-green-600 text-white mr-2">First Share</Badge>
                    <Badge className="bg-yellow-600 text-black">Hot Club</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updated Quick Actions */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={textClasses + ' text-lg'}>Quick Actions</CardTitle>
                <p className={mutedText + ' text-sm'}>Start creating and earning</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold flex items-center justify-center"
                    onClick={() => onNavigate?.(5)}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Create and Earn
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} flex items-center justify-center`}
                    onClick={() => onNavigate?.(3)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share with Insight
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} flex items-center justify-center`}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Host a Live Session
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} flex items-center justify-center`}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Connect with People
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} flex items-center justify-center`}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Withdraw Funds
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Progress */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={textClasses + ' text-lg'}>Achievement Progress</CardTitle>
                <p className={mutedText + ' text-sm'}>Track your milestones and achievements</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={textClasses}>{achievement.title}</span>
                        <span className={mutedText}>{Math.round(achievement.current)}/{achievement.target}</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
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

export default Dashboard;
