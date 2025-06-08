
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Eye, BarChart3, X } from 'lucide-react';

interface EarningsTrackerProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigate?: (screen: number) => void;
  isEmbedded?: boolean;
}

const EarningsTracker: React.FC<EarningsTrackerProps> = ({ 
  isVisible, 
  onClose, 
  onNavigate, 
  isEmbedded = false 
}) => {
  const [balance, setBalance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Simulate real-time earnings
      const interval = setInterval(() => {
        setBalance(prev => prev + 0.1);
      }, 500);

      // Stop animation after 5 seconds
      setTimeout(() => {
        setIsAnimating(false);
        clearInterval(interval);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const earningsData = [
    { platform: 'Twitter/X', shares: 3, earnings: '2.4 FPT', engagement: '1.2K views' },
    { platform: 'Telegram', shares: 2, earnings: '1.8 FPT', engagement: '850 views' },
    { platform: 'Reddit', shares: 1, earnings: '0.9 FPT', engagement: '420 views' },
  ];

  if (!isVisible) return null;

  // Embedded version for sidebar
  if (isEmbedded) {
    return (
      <Card className="bg-gray-900 border-yellow-500 border-2 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-white text-sm">Live Earnings</span>
            </div>
          </div>

          {/* Real-time Balance */}
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-yellow-500 mb-1">
              {balance.toFixed(1)} FPT
            </div>
            {isAnimating && (
              <div className="text-green-400 text-xs animate-pulse">
                ⚡ Earning in real-time...
              </div>
            )}
            {!isAnimating && (
              <Badge className="bg-green-500 text-black text-xs">
                ✅ You just earned 0.88 FPT!
              </Badge>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Total Shares Today</span>
              <span className="text-white font-semibold">6</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Total Engagement</span>
              <span className="text-white font-semibold">2.47K views</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Avg. per Share</span>
              <span className="text-green-400 font-semibold">0.85 FPT</span>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="space-y-1 mb-3">
            <div className="text-xs text-gray-300 font-medium">Platform Breakdown:</div>
            {earningsData.map((data, index) => (
              <div key={index} className="flex items-center justify-between text-xs bg-gray-800 rounded p-1.5">
                <span className="text-gray-300">{data.platform}</span>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">{data.earnings}</div>
                  <div className="text-gray-400 text-xs">{data.engagement}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2">
            <Button 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs py-2"
              onClick={() => onNavigate?.(5)}
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              View Dashboard
            </Button>
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 text-xs py-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              Optimize Earnings
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Original floating version (kept for backwards compatibility)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Wallet Widget */}
      <Card className="bg-gray-900 border-yellow-500 border-2 shadow-2xl w-80 animate-slide-in-right">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-white">Live Earnings</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Real-time Balance */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {balance.toFixed(1)} FPT
            </div>
            {isAnimating && (
              <div className="text-green-400 text-sm animate-pulse">
                ⚡ Earning in real-time...
              </div>
            )}
            {!isAnimating && (
              <Badge className="bg-green-500 text-black">
                ✅ You just earned 0.88 FPT for your first share!
              </Badge>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Shares Today</span>
              <span className="text-white font-semibold">6</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Engagement</span>
              <span className="text-white font-semibold">2.47K views</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Avg. per Share</span>
              <span className="text-green-400 font-semibold">0.85 FPT</span>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-300 font-medium">Platform Breakdown:</div>
            {earningsData.map((data, index) => (
              <div key={index} className="flex items-center justify-between text-xs bg-gray-800 rounded p-2">
                <span className="text-gray-300">{data.platform}</span>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">{data.earnings}</div>
                  <div className="text-gray-400">{data.engagement}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2">
            <Button 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm"
              onClick={() => onNavigate?.(7)}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Full Dashboard
            </Button>
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Optimize Earnings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsTracker;
