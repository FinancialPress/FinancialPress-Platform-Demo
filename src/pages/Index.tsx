
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

  const screens = [
    <LandingPage key="landing" onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <SignUpPage key="signup" onNavigate={handleNavigate} />,
    <OnboardingFlow key="onboarding" onNavigate={handleNavigate} />,
    <UserFeed key="feed" onNavigate={handleNavigate} />,
    <Dashboard key="dashboard" onNavigate={handleNavigate} />,
    <ContentCreator key="creator" onNavigate={handleNavigate} />,
    <ShareEarnFlow key="share" onNavigate={handleNavigate} />,
    <FinalCTA key="cta" />
  ];

  return (
    <div className="min-h-screen bg-black">
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
