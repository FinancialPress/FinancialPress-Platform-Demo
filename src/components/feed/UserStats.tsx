
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Users, Star, Award } from 'lucide-react';

/**
 * Optional prop: showStats - array of label names to display (default: all 4)
 */
const allStats = [
  { label: "Your Earnings", value: "124.8 FPT", icon: DollarSign, color: "text-green-400" },
  { label: "Following", value: "23", icon: Users, color: "text-blue-400" },
  { label: "Content Shared", value: "67", icon: Star, color: "text-purple-400" },
  { label: "Tips Received", value: "1.2K", icon: Award, color: "text-yellow-400" }
];

interface UserStatsProps {
  showStats?: string[];
  isDarkMode?: boolean;
}

const UserStats = ({ showStats, isDarkMode = true }: UserStatsProps) => {
  const filteredStats = showStats
    ? allStats.filter(stat => showStats.includes(stat.label))
    : allStats;

  // Theme-aware classes
  const titleClasses = isDarkMode ? 'text-white' : 'text-black';
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const valueClasses = isDarkMode ? 'text-white' : 'text-black';
  const labelClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${titleClasses}`}>Your Stats</h3>
      {filteredStats.map((stat, index) => (
        <Card key={index} className={cardClasses}>
          <CardContent className="p-4 text-center">
            <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
            <div className={`text-xl font-bold ${valueClasses}`}>{stat.value}</div>
            <div className={`text-sm ${labelClasses}`}>{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
