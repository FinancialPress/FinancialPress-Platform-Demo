
import React, { useState } from 'react';
import EarningsMetrics from './dashboard/EarningsMetrics';
import EarningsCharts from './dashboard/EarningsCharts';
import PerformanceAnalytics from './dashboard/PerformanceAnalytics';
import CommunityStats from './dashboard/CommunityStats';
import NetworkGrowth from './dashboard/NetworkGrowth';
import QuickActions from './dashboard/QuickActions';
import AchievementProgress from './dashboard/AchievementProgress';

interface DashboardProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
}

const Dashboard = ({ onNavigate, isDarkMode }: DashboardProps) => {
  const [contentTab, setContentTab] = useState('content');

  // Theme-aware classes
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className={mutedText}>Track your content performance and earnings</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Dashboard */}
          <div className="col-span-8 space-y-6">
            <EarningsMetrics isDarkMode={isDarkMode} />
            <EarningsCharts isDarkMode={isDarkMode} />
            <PerformanceAnalytics 
              isDarkMode={isDarkMode} 
              contentTab={contentTab} 
              setContentTab={setContentTab} 
            />
          </div>

          {/* Right Column - Community & Performance */}
          <div className="col-span-4 space-y-6">
            <CommunityStats isDarkMode={isDarkMode} />
            <NetworkGrowth isDarkMode={isDarkMode} />
            <QuickActions isDarkMode={isDarkMode} onNavigate={onNavigate} />
            <AchievementProgress isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
