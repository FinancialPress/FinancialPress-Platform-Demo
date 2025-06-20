
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

interface EarningsChartsProps {
  isDarkMode: boolean;
}

const EarningsCharts = ({ isDarkMode }: EarningsChartsProps) => {
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
    { platform: 'X (Twitter)', value: 78 },
    { platform: 'YouTube', value: 65 },
    { platform: 'Telegram', value: 43 },
    { platform: 'LinkedIn', value: 29 },
    { platform: 'Instagram', value: 18 }
  ];

  const subscriberEarningsData = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 18 },
    { month: 'Mar', value: 25 },
    { month: 'Apr', value: 31 },
    { month: 'May', value: 42 },
    { month: 'Jun', value: 58 }
  ];

  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const tooltipBg = isDarkMode ? '#1F2937' : '#FFFFFF';
  const tooltipBorder = isDarkMode ? '#374151' : '#E5E7EB';

  return (
    <>
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

        {/* Earnings by platform (pie chart with vertical legend) */}
        <Card className={cardClasses}>
          <CardHeader className="pb-3">
            <CardTitle className={textClasses + ' text-base'}>Earnings by Platform</CardTitle>
            <p className={mutedText + ' text-xs'}>Distribution across platforms</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {/* Legend on the left */}
              <div className="flex flex-col space-y-2 text-xs">
                {earningsBySharesData.map((entry, index) => (
                  <div key={entry.platform} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index] }}
                    />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {entry.platform}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Pie chart on the right */}
              <div className="flex-1 max-w-[140px]">
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={earningsBySharesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {earningsBySharesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
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
    </>
  );
};

export default EarningsCharts;
