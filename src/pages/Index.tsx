
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

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

  const themeClasses = isDarkMode 
    ? "page-background bg-black"
    : "page-background bg-gray-50";

  // Don't show Header on Onboarding (screen 2)
  const showHeader = currentScreen !== 2;
  
  // Add extra spacing when user is signed in and on landing page
  const isSignedInOnLanding = !!user && currentScreen === 0;

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden`}>
      {showHeader && (
        <Header 
          onNavigate={handleNavigate} 
          currentScreen={currentScreen}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleTheme}
          userProfile={profile}
          isLoggedIn={!!user}
        />
      )}
      <div className={`max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-16 ${isSignedInOnLanding ? 'mt-8' : ''}`}>
        {/* Screen 0 - Landing Page */}
        <div className={currentScreen === 0 ? 'block' : 'hidden'}>
          <LandingPage onNavigate={handleNavigate} isDarkMode={isDarkMode} />
        </div>

        {/* Screen 1 - Sign Up Page */}
        <div className={currentScreen === 1 ? 'block' : 'hidden'}>
          <SignUpPage isDarkMode={isDarkMode} />
        </div>

        {/* Screen 2 - Onboarding Flow */}
        <div className={currentScreen === 2 ? 'block' : 'hidden'}>
          <OnboardingFlow onLandingPage={() => setCurrentScreen(0)} onComplete={handleOnboardingComplete} userType={userType} />
        </div>

        {/* Screen 3 - User Feed */}
        <div className={currentScreen === 3 ? 'block' : 'hidden'}>
          <UserFeed onNavigate={handleNavigate} isDarkMode={isDarkMode} showOnboarding={showOnboarding} />
        </div>

        {/* Screen 4 - Dashboard */}
        <div className={currentScreen === 4 ? 'block' : 'hidden'}>
          <Dashboard onNavigate={handleNavigate} isDarkMode={isDarkMode} />
        </div>

        {/* Screen 5 - Content Creator */}
        <div className={currentScreen === 5 ? 'block' : 'hidden'}>
          <ContentCreator onNavigate={handleNavigate} isDarkMode={isDarkMode} />
        </div>

        {/* Screen 6 - Stock Chart Data */}
        <div className={currentScreen === 6 ? 'block' : 'hidden'}>
          <StockChartData symbol={searchSymbol} onNavigate={handleNavigate} isDarkMode={isDarkMode} />
        </div>

        {/* Screen 7 - Share Earn Flow */}
        <div className={currentScreen === 7 ? 'block' : 'hidden'}>
          <ShareEarnFlow 
            post={mockPost}
            onClose={handleShareClose}
            onShare={handleShare}
          />
        </div>

        {/* Screen 8 - Final CTA */}
        <div className={currentScreen === 8 ? 'block' : 'hidden'}>
          <FinalCTA />
        </div>
      </div>
    </div>
  );
};

export default Index;
