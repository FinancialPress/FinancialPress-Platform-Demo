
import React, { useState } from 'react';
import Header from '@/components/Header';
import TickerBar from '@/components/TickerBar';
import LandingPage from '@/components/LandingPage';
import SignUpPage from '@/components/SignUpPage';
import OnboardingFlow from '@/components/OnboardingFlow';
import UserFeed from '@/components/UserFeed';
import ContentCreator from '@/components/ContentCreator';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import EarningsTracker from '@/components/EarningsTracker';
import Dashboard from '@/components/Dashboard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEarningsTracker, setShowEarningsTracker] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'creator' | 'distributor'>('creator');

  const screens = [
    'Landing Page',
    'Sign Up',
    'Onboarding',
    'User Feed',
    'Content Creator',
    'Share & Earn',
    'Earnings Tracker',
    'Dashboard'
  ];

  const samplePost = {
    title: "Bitcoin Breaks $95K: Technical Analysis and What's Next",
    creator: "CryptoWhale",
    estimatedEarnings: "2.4 FPT"
  };

  const handleShare = () => {
    setShowShareModal(false);
    setShowEarningsTracker(true);
  };

  const handleOnboardingComplete = () => {
    // Navigate to user feed when onboarding is complete
    setCurrentScreen(3);
  };

  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 0:
        return <LandingPage onNavigate={setCurrentScreen} />;
      case 1:
        return <SignUpPage onNavigate={setCurrentScreen} />;
      case 2:
        return <OnboardingFlow userRole={selectedRole} onComplete={handleOnboardingComplete} />;
      case 3:
        return <UserFeed />;
      case 4:
        return <ContentCreator onNavigate={setCurrentScreen} />;
      case 5:
        return (
          <div>
            <UserFeed />
            <ShareEarnFlow 
              post={samplePost}
              onClose={() => setShowShareModal(false)}
              onShare={handleShare}
            />
          </div>
        );
      case 6:
        return (
          <div>
            <UserFeed />
            <EarningsTracker 
              isVisible={true}
              onClose={() => setShowEarningsTracker(false)}
            />
          </div>
        );
      case 7:
        return <Dashboard />;
      default:
        return <LandingPage onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Demo Navigation - Fixed positioning with proper z-index */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-sm">FinancialPress Demo</div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {screens.map((screen, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={currentScreen === index ? "default" : "outline"}
                    className={`text-xs px-2 py-1 h-auto ${
                      currentScreen === index 
                        ? "bg-yellow-500 text-black hover:bg-yellow-600" 
                        : "border-gray-600 text-gray-300 hover:border-gray-500"
                    }`}
                    onClick={() => setCurrentScreen(index)}
                  >
                    {index + 1}. {screen}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Proper spacing to avoid overlap */}
      <div className="pt-16 relative z-10">
        {/* Header and Ticker - Fixed positioning below demo nav */}
        <div className="relative z-20">
          <Header onNavigate={setCurrentScreen} />
          <TickerBar />
        </div>
        
        {/* Screen Content - Proper z-index layering */}
        <div className="relative z-10">
          {renderCurrentScreen()}
        </div>
        
        {/* Modal Overlays - Highest z-index */}
        {currentScreen === 5 && showShareModal && (
          <div className="relative z-50">
            <ShareEarnFlow 
              post={samplePost}
              onClose={() => setShowShareModal(false)}
              onShare={handleShare}
            />
          </div>
        )}
        
        {currentScreen === 6 && (
          <div className="relative z-50">
            <EarningsTracker 
              isVisible={showEarningsTracker}
              onClose={() => setShowEarningsTracker(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
