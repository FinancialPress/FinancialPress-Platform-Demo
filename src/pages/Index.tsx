
import React, { useState } from 'react';
import Header from '@/components/Header';
import TickerBar from '@/components/TickerBar';
import LandingPage from '@/components/LandingPage';
import SignUpPage from '@/components/SignUpPage';
import OnboardingFlow from '@/components/OnboardingFlow';
import UserFeed from '@/components/UserFeed';
import ContentCreator from '@/components/ContentCreator';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import Dashboard from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedRole, setSelectedRole] = useState<'creator' | 'distributor'>('creator');
  const [showDemoMenu, setShowDemoMenu] = useState(true);

  const screens = [
    'Landing Page',
    'Sign Up',
    'Onboarding',
    'User Feed',
    'Create Content',
    'Dashboard'
  ];

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
        return <UserFeed onNavigate={setCurrentScreen} />;
      case 4:
        return <ContentCreator onNavigate={setCurrentScreen} />;
      case 5:
        return <Dashboard />;
      default:
        return <LandingPage onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Demo Navigation - Toggle visibility */}
      {showDemoMenu && (
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
                          : "border-gray-500 text-white hover:bg-gray-700 hover:text-white hover:border-gray-400"
                      }`}
                      onClick={() => setCurrentScreen(index)}
                    >
                      {index + 1}. {screen}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDemoMenu(false)}
                  className="text-gray-400 hover:text-white ml-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Menu Toggle Button - Show when menu is hidden */}
      {!showDemoMenu && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDemoMenu(true)}
            className="bg-gray-900 border-gray-600 text-white hover:bg-gray-800"
          >
            <Menu className="w-4 h-4 mr-1" />
            Demo Menu
          </Button>
        </div>
      )}

      {/* Main Content - Adjust spacing based on demo menu visibility */}
      <div className={showDemoMenu ? "pt-16 relative z-10" : "relative z-10"}>
        {/* Header and Ticker - Fixed positioning below demo nav */}
        <div className="relative z-20">
          <Header 
            onNavigate={setCurrentScreen} 
            isLoggedIn={currentScreen >= 3} 
          />
          <TickerBar />
        </div>
        
        {/* Screen Content - Proper z-index layering */}
        <div className="relative z-10">
          {renderCurrentScreen()}
        </div>
      </div>
    </div>
  );
};

export default Index;
