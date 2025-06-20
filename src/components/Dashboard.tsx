import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  Trophy
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DashboardProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const Dashboard = ({ onNavigate, isDarkMode = true }: DashboardProps) => {
  // Debug log to verify isDarkMode
  console.log('DASHBOARD isDarkMode:', isDarkMode);

  const earningsData = [
    { day: 'Mon', value: 5 },
    { day: 'Tue', value: 8 },
    { day: 'Wed', value: 12 },
    { day: 'Thu', value: 18 },
    { day: 'Fri', value: 15 },
    { day: 'Sat', value: 22 },
    { day: 'Sun', value: 20 }
  ];

  const platformData = [
    { platform: 'Twitter', value: 450 },
    { platform: 'LinkedIn', value: 320 },
    { platform: 'Medium', value: 280 },
    { platform: 'Telegram', value: 180 },
    { platform: 'Others', value: 120 }
  ];

  const topContent = [
    { title: 'Crypto Report', views: 320, shares: 45, tips: 12, earnings: 'Share' },
    { title: 'Tech Analysis', views: 260, shares: 32, tips: 8, earnings: 'Share' },
    { title: 'Market Overview', views: 410, shares: 53, tips: 15, earnings: 'Share' },
    { title: 'DeFi Explained', views: 180, shares: 27, tips: 6, earnings: 'Share' },
    { title: 'NFT Insights', views: 95, shares: 18, tips: 4, earnings: 'Share' }
  ];

  const achievements = [
    { title: '1,000 Shares Club', progress: 85, target: 1000, current: 850 },
    { title: 'Content Creator Pro', progress: 60, target: 100, current: 60 },
    { title: 'Top Master', progress: 40, target: 50, current: 20 },
    { title: 'Viral Sensation', progress: 92, target: 10, current: 9.2 }
  ];

  // Reusable theme-aware classes
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
          <div className="flex gap-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onNavigate?.(4)}
            >
              Create Content
            </Button>
            <Button 
              variant="outline" 
              className={`${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              onClick={() => onNavigate?.(3)}
            >
              Find Content to Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Dashboard */}
          <div className="col-span-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <Card className={cardClasses}>
                <CardContent className="p-4">
                  <div className={mutedText + ' text-sm mb-1'}>Today's Earnings</div>
                  <div className="text-2xl font-bold">18</div>
                  <div className={mutedText + ' text-xs'}>FP Shares</div>
                  <div className="text-xs text-green-400">+5% vs yesterday</div>
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
                  <div className={mutedText + ' text-sm mb-1'}>Total Reach</div>
                  <div className="text-2xl font-bold">4,280</div>
                  <div className={mutedText + ' text-xs'}>+15% this month</div>
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

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Earnings Over Time */}
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textClasses + ' text-lg'}>Earnings Over Time</CardTitle>
                  <p className={mutedText + ' text-sm'}>Tokens earned from content engagement</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="day" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
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

              {/* Earnings by Platform */}
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textClasses + ' text-lg'}>Earnings by Platform</CardTitle>
                  <p className={mutedText + ' text-sm'}>Where your content performs best</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={platformData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis dataKey="platform" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: tooltipBg,
                          border: `1px solid ${tooltipBorder}`,
                          borderRadius: '8px',
                          color: isDarkMode ? '#FFFFFF' : '#000000'
                        }}
                      />
                      <Bar dataKey="value" fill="#06B6D4" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Content */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className={textClasses + ' text-lg'}>Top Performing Content</span>
                  <Button variant="outline" size="sm" className={`${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    View All
                  </Button>
                </CardTitle>
                <p className={mutedText + ' text-sm'}>Your highest earning content</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className={`grid grid-cols-5 gap-4 text-sm ${mutedText} pb-2 border-b ${subtleBorder}`}>
                    <div>Content</div>
                    <div>Views</div>
                    <div>Shares</div>
                    <div>Tips</div>
                    <div>Actions</div>
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
                      <div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                          {content.earnings}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Community & Performance */}
          <div className="col-span-4 space-y-6">
            {/* Community Ranking */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  <span className={textClasses + ' text-lg'}>Community Ranking</span>
                </CardTitle>
                <p className={mutedText + ' text-sm'}>Your position in the FinancialPress community</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-bold text-blue-500 mb-2">#42</div>
                <div className={mutedText + ' text-sm mb-4'}>in FP Crypto Creators</div>
                <div className="space-y-2 mb-4">
                  <Badge className="bg-blue-600 text-white mr-2">Top Share</Badge>
                  <Badge className="bg-green-600 text-white mr-2">First Share</Badge>
                  <Badge className="bg-yellow-600 text-black">Hot Club</Badge>
                </div>
                <div className={mutedText + ' text-xs space-y-1'}>
                  <div><strong>Personal Bests:</strong></div>
                  <div>Most shared content this week</div>
                  <div>New record for likes in a single day</div>
                  <div>Highest single-day earnings</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={textClasses + ' text-lg'}>Quick Actions</CardTitle>
                <p className={mutedText + ' text-sm'}>Common tasks you can perform right away</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-start"
                    onClick={() => onNavigate?.(4)}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Upload Content
                    <span className="ml-auto text-xs">Add a new piece of content</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} flex items-center justify-start ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => onNavigate?.(3)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Find Content to Share
                    <span className="ml-auto text-xs">Discover shareable content</span>
                  </Button>
                  <Button variant="outline" className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} flex items-center justify-start ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <Users className="w-4 h-4 mr-2" />
                    Connect
                    <span className="ml-auto text-xs">Link more social accounts</span>
                  </Button>
                  <Button variant="outline" className={`w-full ${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'} flex items-center justify-start ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Withdraw
                    <span className="ml-auto text-xs">Share earnings and withdraw</span>
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

            {/* Network Growth */}
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle className={textClasses + ' text-lg'}>Network Growth</CardTitle>
                <p className={mutedText + ' text-sm'}>Your audience growth and reach</p>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold">128</div>
                      <div className={mutedText + ' text-xs'}>Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">345</div>
                      <div className={mutedText + ' text-xs'}>Following</div>
                    </div>
                  </div>
                  <div className={mutedText + ' text-xs mb-4'}>
                    <strong>Your public profile:</strong><br />
                    FinancialPress.love/user/yourprofile2
                  </div>
                  <div className={mutedText + ' text-xs'}>
                    Share your profile to grow your network and position yourself as a thought leader in the financial space.
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

export default Dashboard;
