
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircle, Heart, Share } from 'lucide-react';

interface CommunityStatsProps {
  isDarkMode: boolean;
}

const CommunityStats = ({ isDarkMode }: CommunityStatsProps) => {
  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const stats = [
    { label: 'Followers', value: '12.5K', icon: Users, color: 'text-blue-500' },
    { label: 'Comments', value: '2.8K', icon: MessageCircle, color: 'text-green-500' },
    { label: 'Likes', value: '45.2K', icon: Heart, color: 'text-red-500' },
    { label: 'Shares', value: '8.9K', icon: Share, color: 'text-purple-500' }
  ];

  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle className={textClasses}>Community Stats</CardTitle>
        <p className={mutedText}>Your audience engagement</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <stat.icon className={stat.color + ' h-5 w-5'} />
              <span className={textClasses}>{stat.label}</span>
            </div>
            <span className={textClasses + ' font-bold'}>{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommunityStats;
