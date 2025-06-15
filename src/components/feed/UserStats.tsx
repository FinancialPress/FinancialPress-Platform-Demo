
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

  const columns = filteredStats.length;

  return (
    <div className={`grid grid-cols-${columns} gap-6 mb-6`}>
      {filteredStats.map((stat, index) => (
        <Card key={index} className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
