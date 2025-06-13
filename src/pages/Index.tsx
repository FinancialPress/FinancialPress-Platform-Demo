
import { useState } from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import SignUpPage from '../components/SignUpPage';
import OnboardingFlow from '../components/OnboardingFlow';
import UserFeed from '../components/UserFeed';
import Dashboard from '../components/Dashboard';
import ContentCreator from '../components/ContentCreator';
import ShareEarnFlow from '../components/ShareEarnFlow';
import FinalCTA from '../components/FinalCTA';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleNavigate = (screen: number) => {
    setCurrentScreen(screen);
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

  const handleOnboardingComplete = () => {
    // Navigate to user feed (screen 3)
    setCurrentScreen(3);
  };

  const screens = [
    <LandingPage key="landing" />,
    <SignUpPage key="signup" onNavigate={handleNavigate} />,
    <OnboardingFlow key="onboarding" onComplete={handleOnboardingComplete} />,
    <UserFeed key="feed" onNavigate={handleNavigate} />,
    <Dashboard key="dashboard" onNavigate={handleNavigate} />,
    <ContentCreator key="creator" onNavigate={handleNavigate} />,
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

  return (
    <div className={themeClasses}>
      <Header 
        onNavigate={handleNavigate} 
        currentScreen={currentScreen}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      {screens[currentScreen]}
    </div>
  );
};

export default Index;
