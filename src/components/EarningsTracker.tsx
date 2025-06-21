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
  isDarkMode?: boolean;
  customEarnings?: string;
  isFromOnboarding?: boolean;
}

const EarningsTracker: React.FC<EarningsTrackerProps> = ({
  isVisible,
  onClose,
  onNavigate,
  isEmbedded = false,
  isDarkMode = true,
  customEarnings,
  isFromOnboarding = false,
}) => {
  const [balance, setBalance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Theme-aware classes
  const cardClasses = isDarkMode
    ? 'bg-gray-900 border-yellow-500 text-white'
    : 'bg-white border-yellow-400 text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const subCardBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';

  useEffect(() => {
    if (isFromOnboarding && customEarnings) {
      const targetValue = parseFloat(customEarnings);
      if (targetValue > balance) {
        setIsAnimating(true);
        const interval = setInterval(() => {
          setBalance((prev) => {
            if (prev >= targetValue) {
              clearInterval(interval);
              setIsAnimating(false);
              return targetValue;
            }
            return prev + 0.1;
          });
        }, 100);
        return () => clearInterval(interval);
      } else {
        setBalance(targetValue);
      }
    } else if (!isFromOnboarding) {
      // Show original earnings when not from onboarding
      setBalance(5.1);
      setIsAnimating(false);
    }
  }, [customEarnings, balance, isFromOnboarding]);

  const earningsData = [
    { platform: 'X/Twitter', shares: 3, earnings: '2.4 FPT', engagement: '1.2K views' },
    { platform: 'Telegram', shares: 2, earnings: '1.8 FPT', engagement: '850 views' },
    { platform: 'Reddit', shares: 1, earnings: '0.9 FPT', engagement: '420 views' },
  ];

  if (!isVisible) return null;

  // Embedded version for sidebar
  if (isEmbedded) {
    return (
      <Card className={`${cardClasses} border-2 shadow-lg`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-sm">Live Earnings</span>
            </div>
          </div>

          {/* Real-time Balance */}
          <div className="text-center mb-4">
            <div className={`text-2xl font-bold text-yellow-500 mb-1`}>
              {balance.toFixed(1)} FPT
            </div>
            {!isFromOnboarding && balance > 0 && (
              <Badge className="bg-green-500 text-black text-xs mt-1">✅ You just earned {balance.toFixed(1)} FPT!</Badge>
            )}
            {isFromOnboarding && balance > 0 && (
              <Badge className="bg-green-500 text-black text-xs mt-1">✅ You just earned {balance.toFixed(1)} FPT!</Badge>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-xs">
              <span className={mutedText}>Total Shares Today</span>
              <span className="font-semibold">{isFromOnboarding ? '0' : '6'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className={mutedText}>Total Engagement</span>
              <span className="font-semibold">{isFromOnboarding ? '0 views' : '2.47K views'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className={mutedText}>Avg. per Share</span>
              <span className="text-green-400 font-semibold">{isFromOnboarding ? '0 FPT' : '0.85 FPT'}</span>
            </div>
          </div>

          {/* Platform Breakdown - only show if not from onboarding or if has earnings */}
          {(!isFromOnboarding || balance > 0) && (
            <div className="space-y-1 mb-3">
              <div className={`${mutedText} text-xs font-medium mb-1`}>Platform Breakdown:</div>
              {earningsData.map((data, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between text-xs ${subCardBg} rounded p-1.5`}
                >
                  <span className={mutedText}>{data.platform}</span>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{isFromOnboarding ? '0 FPT' : data.earnings}</div>
                    <div className={`${mutedText} text-xs`}>{isFromOnboarding ? '0 views' : data.engagement}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-2">
            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs py-2"
              onClick={() => onNavigate?.(4)}
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              View Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Original floating version
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Wallet Widget */}
      <Card className={`${cardClasses} border-2 shadow-2xl w-80 animate-slide-in-right`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-6 h-6 text-yellow-500" />
              <span className="font-bold">Live Earnings</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className={`${mutedText} hover:text-current`}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Real-time Balance */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-yellow-500 mb-2">{balance.toFixed(1)} FPT</div>
            <Badge className="bg-green-500 text-black mt-2">✅ You just earned {balance.toFixed(1)} FPT for your first share!</Badge>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className={mutedText}>Total Shares Today</span>
              <span className="font-semibold">6</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={mutedText}>Total Engagement</span>
              <span className="font-semibold">2.47K views</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={mutedText}>Avg. per Share</span>
              <span className="text-green-400 font-semibold">0.85 FPT</span>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="space-y-2 mb-4">
            <div className={`${mutedText} text-sm font-medium`}>Platform Breakdown:</div>
            {earningsData.map((data, index) => (
              <div key={index} className={`flex items-center justify-between text-xs ${subCardBg} rounded p-2`}>
                <span className={mutedText}>{data.platform}</span>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">{data.earnings}</div>
                  <div className={mutedText}>{data.engagement}</div>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsTracker;
