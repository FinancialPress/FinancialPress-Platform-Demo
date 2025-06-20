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
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

interface DashboardProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
}

const Dashboard = ({ onNavigate, isDarkMode }: DashboardProps) => {
  const [contentTab, setContentTab] = useState('content');

  const achievements = [
    { title: '1,000 Shares Club', progress: 85, target: 1000, current: 850 },
    { title: 'Content Creator Pro', progress: 60, target: 100, current: 60 },
    { title: 'Top Master', progress: 40, target: 50, current: 20 },
    { title: 'Viral Sensation', progress: 92, target: 10, current: 9.2 }
  ];

  const cardClasses = isDarkMode
    ? 'bg-gray-900 border-gray-800 text-white'
    : 'bg-white border-gray-200 text-black';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <Card className={cardClasses}>
          <CardHeader className="pb-3">
            <CardTitle className={`${isDarkMode ? 'text-white' : 'text-black'} text-base`}>
              Quick Actions
            </CardTitle>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
              Start creating and earning
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-500 text-black font-semibold flex items-center justify-center"
                onClick={() => onNavigate?.(5)}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Create and Earn
              </Button>

              {[
                {
                  label: 'Share with Insight',
                  icon: <Share2 className="w-4 h-4 mr-2" />,
                  screen: 3
                },
                {
                  label: 'Host a Live Session',
                  icon: <Video className="w-4 h-4 mr-2" />
                },
                {
                  label: 'Connect with People',
                  icon: <UserPlus className="w-4 h-4 mr-2" />
                },
                {
                  label: 'Withdraw Funds',
                  icon: <DollarSign className="w-4 h-4 mr-2" />
                }
              ].map((action, idx) => (
                <Button
                  key={idx}
                  className={`w-full flex items-center justify-center font-semibold ${
                    isDarkMode
                      ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border border-gray-300 text-gray-800 hover:bg-gray-100'
                  }`}
                  variant="outline"
                  onClick={() => action.screen && onNavigate?.(action.screen)}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cardClasses + ' mt-8'}>
          <CardHeader className="pb-3">
            <CardTitle className={`${isDarkMode ? 'text-white' : 'text-black'} text-base`}>
              Achievement Progress
            </CardTitle>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
              Track your milestones and achievements
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{achievement.title}</span>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {Math.round(achievement.current)}/{achievement.target}
                    </span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
