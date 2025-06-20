
import { useState } from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import SignUpPage from '../components/SignUpPage';
import OnboardingFlow from '../components/OnboardingFlow';
import UserFeed from '../components/UserFeed';
import Dashboard from '../components/Dashboard';
import ContentCreator from '../components/ContentCreator';
import ShareEarnFlow from '../components/ShareEarnFlow';
import StockChartData from '../components/StockChartData';
import FinalCTA from '../components/FinalCTA';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchSymbol, setSearchSymbol] = useState('');

  const handleNavigate = (screen: number, symbol?: string) => {
    setCurrentScreen(screen);
    if (symbol) {
      setSearchSymbol(symbol);
    }
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Mock data for ShareEarnFlow
  const mockPost = {
    title: "Bitcoin Analysis: Market Trends and Future Predictions",
    creator: "CryptoExpert",
    estimatedEarnings: "15.2 FPT"
  };

  const handleShareClose = () => {
    // Handle close logic
    console.log("Share modal closed");
  };

  const handleShare = () => {
    // Handle share logic
    console.log("Content shared");
  };

  const screens = [
    <LandingPage key="landing" onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <SignUpPage key="signup" onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <OnboardingFlow key="onboarding" onLandingPage={() => setCurrentScreen(0)} />,
    <UserFeed key="feed" onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <Dashboard key="dashboard" onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <ContentCreator key="creator" onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <StockChartData key="stockchart" symbol={searchSymbol} onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <ShareEarnFlow 
      key="share" 
      post={mockPost}
      onClose={handleShareClose}
      onShare={handleShare}
    />,
    <FinalCTA key="cta" />
  ];

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-black"
    : "min-h-screen bg-gray-50";

  // Don't show Header on Onboarding (screen 2)
  const showHeader = currentScreen !== 2;

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden`}>
      {showHeader && (
        <Header 
          onNavigate={handleNavigate} 
          currentScreen={currentScreen}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      )}
      <div className="w-full">
        {screens[currentScreen]}
      </div>
    </div>
  );
};

export default Index;
