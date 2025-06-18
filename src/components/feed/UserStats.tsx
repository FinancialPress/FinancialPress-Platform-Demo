
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

const UserStats = ({ showStats }: { showStats?: string[] }) => {
  const filteredStats = showStats
    ? allStats.filter(stat => showStats.includes(stat.label))
    : allStats;

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Your Stats</h3>
        <div className="space-y-3">
          {filteredStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div className="flex-1">
                <div className="text-white font-semibold">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;
