import React, { useState } from 'react';
import { DollarSign, Share2, Video, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DashboardProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
}

const Dashboard = ({ onNavigate, isDarkMode }: DashboardProps) => {
  const cardClasses = isDarkMode
    ? 'bg-gray-900 border-gray-800 text-white'
    : 'bg-white border-gray-200 text-black';

  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <Card className={cardClasses}>
          <CardHeader className="pb-3">
            <CardTitle className={textClasses + ' text-base'}>Quick Actions</CardTitle>
            <p className={mutedText + ' text-xs'}>Start creating and earning</p>
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

              <Button
                className={`w-full flex items-center justify-center font-semibold transition-colors duration-150 ${
                  isDarkMode
                    ? 'text-gray-300 border border-gray-600 hover:bg-gray-700'
                    : 'text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
                variant="outline"
                onClick={() => onNavigate?.(3)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share with Insight
              </Button>

              <Button
                className={`w-full flex items-center justify-center font-semibold transition-colors duration-150 ${
                  isDarkMode
                    ? 'text-gray-300 border border-gray-600 hover:bg-gray-700'
                    : 'text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
                variant="outline"
              >
                <Video className="w-4 h-4 mr-2" />
                Host a Live Session
              </Button>

              <Button
                className={`w-full flex items-center justify-center font-semibold transition-colors duration-150 ${
                  isDarkMode
                    ? 'text-gray-300 border border-gray-600 hover:bg-gray-700'
                    : 'text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
                variant="outline"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Connect with People
              </Button>

              <Button
                className={`w-full flex items-center justify-center font-semibold transition-colors duration-150 ${
                  isDarkMode
                    ? 'text-gray-300 border border-gray-600 hover:bg-gray-700'
                    : 'text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
                variant="outline"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
