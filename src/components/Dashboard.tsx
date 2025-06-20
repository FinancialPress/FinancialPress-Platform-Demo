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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
}

const Dashboard = ({ onNavigate, isDarkMode }: DashboardProps) => {
  const [contentTab, setContentTab] = useState('content');

  // ...[truncated unchanged data definitions]...

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
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        {/* ...[truncated content]... */}

        <Card className={cardClasses}>
          <CardHeader className="pb-3">
            <CardTitle className={textClasses + ' text-base'}>Quick Actions</CardTitle>
            <p className={mutedText + ' text-xs'}>Start creating and earning</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full bg-yellow-500 text-black font-semibold flex items-center justify-center hover:bg-yellow-500 active:bg-yellow-500"
                onClick={() => onNavigate?.(5)}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Create and Earn
              </Button>

              {/* Updated secondary buttons without dark hover */}
              {[
                { label: 'Share with Insight', icon: <Share2 className="w-4 h-4 mr-2" />, screen: 3 },
                { label: 'Host a Live Session', icon: <Video className="w-4 h-4 mr-2" /> },
                { label: 'Connect with People', icon: <UserPlus className="w-4 h-4 mr-2" /> },
                { label: 'Withdraw Funds', icon: <DollarSign className="w-4 h-4 mr-2" /> }
              ].map((action, idx) => (
                <Button 
                  key={idx}
                  className={`w-full flex items-center justify-center font-semibold border ${
                    isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-800 hover:bg-gray-100'
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

        {/* ...[rest of the Dashboard remains unchanged]... */}

      </div>
    </div>
  );
};

export default Dashboard;
