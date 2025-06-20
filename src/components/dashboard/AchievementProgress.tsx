
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Star, Award } from 'lucide-react';

interface AchievementProgressProps {
  isDarkMode: boolean;
}

const AchievementProgress = ({ isDarkMode }: AchievementProgressProps) => {
  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const achievements = [
    { 
      title: 'Content Creator',
      description: 'Create 10 pieces of content',
      progress: 75,
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      title: 'Influencer',
      description: 'Reach 5K followers',
      progress: 45,
      icon: Star,
      color: 'text-purple-500'
    },
    {
      title: 'Top Earner',
      description: 'Earn $1K this month',
      progress: 60,
      icon: Award,
      color: 'text-green-500'
    }
  ];

  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle className={textClasses}>Achievement Progress</CardTitle>
        <p className={mutedText}>Your milestones</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <achievement.icon className={achievement.color + ' h-4 w-4'} />
                <span className={textClasses + ' text-sm font-medium'}>
                  {achievement.title}
                </span>
              </div>
              <span className={mutedText + ' text-xs'}>{achievement.progress}%</span>
            </div>
            <Progress value={achievement.progress} className="h-2" />
            <p className={mutedText + ' text-xs'}>{achievement.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AchievementProgress;
