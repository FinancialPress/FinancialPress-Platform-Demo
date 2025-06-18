import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import QuickActions from './QuickActions';

interface DashboardProps {
  onNavigate?: (screen: number) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const earningsData = [
    { day: 'Mon', earnings: 5 },
    { day: 'Tue', earnings: 8 },
    { day: 'Wed', earnings: 12 },
    { day: 'Thu', earnings: 18 },
    { day: 'Fri', earnings: 15 },
    { day: 'Sat', earnings: 22 },
    { day: 'Sun', earnings: 20 }
  ];

  const platformData = [
    { platform: 'Twitter', earnings: 450 },
    { platform: 'LinkedIn', earnings: 320 },
    { platform: 'Medium', earnings: 280 },
    { platform: 'Telegram', earnings: 180 },
    { platform: 'Others', earnings: 120 }
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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">Track your content performance and earnings</p>
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
              className="border-gray-600 text-gray-300"
              onClick={() => onNavigate?.(3)}
            >
              Find Content to Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            {/* Existing content */}
          </div>

          <div className="col-span-4 space-y-6">
            {/* Community Ranking */}

            {/* Quick Actions */}
            <QuickActions isDarkMode={true} onNavigate={onNavigate} />

            {/* Achievements and other content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
