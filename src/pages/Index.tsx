
import React, { useState } from 'react';
import Header from '@/components/Header';
import TickerBar from '@/components/TickerBar';
import LandingPage from '@/components/LandingPage';
import SignUpPage from '@/components/SignUpPage';
import OnboardingFlow from '@/components/OnboardingFlow';
import UserFeed from '@/components/UserFeed';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import EarningsTracker from '@/components/EarningsTracker';
import FinalCTA from '@/components/FinalCTA';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEarningsTracker, setShowEarningsTracker] = useState(false);

  const screens = [
    'Landing Page',
    'Sign Up',
    'Onboarding',
    'User Feed',
    'Share & Earn',
    'Earnings Tracker',
    'Final CTA'
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

  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 0:
        return <LandingPage />;
      case 1:
        return <SignUpPage />;
      case 2:
        return <OnboardingFlow />;
      case 3:
        return (
          <div onClick={() => setShowShareModal(true)}>
            <UserFeed />
          </div>
        );
      case 4:
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
      case 5:
        return (
          <div>
            <UserFeed />
            <EarningsTracker 
              isVisible={true}
              onClose={() => setShowEarningsTracker(false)}
            />
          </div>
        );
      case 6:
        return <FinalCTA />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Demo Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="text-white font-bold">FinancialPress Demo</div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {screens.map((screen, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={currentScreen === index ? "default" : "outline"}
                  className={currentScreen === index ? "bg-yellow-500 text-black" : "border-gray-600 text-gray-300"}
                  onClick={() => setCurrentScreen(index)}
                >
                  {index + 1}. {screen}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="pt-20">
        <Header />
        <TickerBar />
        {renderCurrentScreen()}
        
        {/* Conditional Modals/Overlays */}
        {currentScreen === 4 && showShareModal && (
          <ShareEarnFlow 
            post={samplePost}
            onClose={() => setShowShareModal(false)}
            onShare={handleShare}
          />
        )}
        
        {currentScreen === 5 && (
          <EarningsTracker 
            isVisible={showEarningsTracker}
            onClose={() => setShowEarningsTracker(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
