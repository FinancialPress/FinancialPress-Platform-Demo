import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
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

type UserType = 'demo' | 'live' | null;

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  // Reset to landing page when navigated to root path
  useEffect(() => {
    if (location.pathname === '/') {
      setCurrentScreen(0);
      setShowOnboarding(false);
    }
  }, [location.pathname]);

  const handleNavigate = (screen: number, symbol?: string, type?: UserType) => {
    // Special handling for Content Creator - navigate to dedicated page
    if (screen === 5) {
      navigate('/create');
      return;
    }
    
    setCurrentScreen(screen);
    if (symbol) {
      setSearchSymbol(symbol);
    }
    if (type) {
      setUserType(type);
    }
    // Reset onboarding flag when navigating normally
    if (screen !== 3) {
      setShowOnboarding(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(true);
    setCurrentScreen(3); // Navigate to UserFeed with onboarding flag
  };

  // Mock data for ShareEarnFlow
  const mockPost = {
    title: "Bitcoin Analysis: Market Trends and Future Predictions",
    creator: "CryptoExpert",
    estimatedEarnings: "15.2 FPT"
  };

  const handleShareClose = () => {
    console.log("Share modal closed");
  };

  const handleShare = () => {
    console.log("Content shared");
  };

  const screens = [
    <LandingPage key="landing" onNavigate={handleNavigate} isDarkMode={isDarkMode} />,
    <SignUpPage key="signup" onNavigate={handleNavigate} isDarkMode={isDarkMode} userType={userType} setUserType={setUserType} />,
    <OnboardingFlow key="onboarding" onLandingPage={() => setCurrentScreen(0)} onComplete={handleOnboardingComplete} userType={userType} />,
    <UserFeed key="feed" onNavigate={handleNavigate} isDarkMode={isDarkMode} showOnboarding={showOnboarding} />,
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

  // Don't show Header on Onboarding (screen 2)
  const showHeader = currentScreen !== 2;
  
  // Add extra spacing when user is signed in and on landing page
  const isSignedInOnLanding = !!user && currentScreen === 0;

  return (
    <>
      {showHeader && currentScreen !== 0 && (
        <Header 
          onNavigate={handleNavigate} 
          currentScreen={currentScreen}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleTheme}
          userProfile={profile}
          isLoggedIn={!!user}
        />
      )}
      <div className={`${isSignedInOnLanding ? 'mt-8' : ''}`}>
        <div className="max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-16">
          {screens[currentScreen]}
        </div>
      </div>
    </>
  );
};

export default Index;
