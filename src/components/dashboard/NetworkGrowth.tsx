
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NetworkGrowthProps {
  isDarkMode: boolean;
}

const NetworkGrowth = ({ isDarkMode }: NetworkGrowthProps) => {
  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const tooltipBg = isDarkMode ? '#1F2937' : '#FFFFFF';
  const tooltipBorder = isDarkMode ? '#374151' : '#E5E7EB';

  const growthData = [
    { month: 'Jan', followers: 1200 },
    { month: 'Feb', followers: 1450 },
    { month: 'Mar', followers: 1680 },
    { month: 'Apr', followers: 2100 },
    { month: 'May', followers: 2500 },
    { month: 'Jun', followers: 2850 }
  ];

  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle className={textClasses}>Network Growth</CardTitle>
        <p className={mutedText}>Follower growth over time</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={growthData}>
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
            <Line type="monotone" dataKey="followers" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NetworkGrowth;
