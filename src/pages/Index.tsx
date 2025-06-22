
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import SignUpPage from "@/components/SignUpPage";
import UserFeed from "@/components/UserFeed";
import Dashboard from "@/components/Dashboard";
import ContentCreator from "@/components/ContentCreator";
import StockChartData from "@/components/StockChartData";
import OnboardingFlow from "@/components/OnboardingFlow";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

const AppContent = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [searchSymbol, setSearchSymbol] = useState("");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Check if user needs onboarding
  const needsOnboarding = user && !hasCompletedOnboarding && (!profile || !profile.display_name || !profile.username);

  useEffect(() => {
    // If user has a complete profile, mark onboarding as complete
    if (profile && profile.display_name && profile.username) {
      setHasCompletedOnboarding(true);
    }
  }, [profile]);

  const handleNavigate = (screen: number, symbol?: string) => {
    // If user is authenticated but needs onboarding, redirect to onboarding
    if (user && needsOnboarding && screen !== 1) {
      return; // Stay in onboarding flow
    }

    setCurrentScreen(screen);
    if (symbol) {
      setSearchSymbol(symbol);
    }
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen(3); // Go to User Feed after onboarding
  };

  // Show onboarding flow if user is logged in but hasn't completed onboarding
  if (user && needsOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 0:
        return <LandingPage onNavigate={handleNavigate} />;
      case 1:
        return <SignUpPage onNavigate={handleNavigate} />;
      case 3:
        return <UserFeed onNavigate={handleNavigate} />;
      case 4:
        return <Dashboard onNavigate={handleNavigate} />;
      case 5:
        return <ContentCreator onNavigate={handleNavigate} />;
      case 6:
        return <StockChartData symbol={searchSymbol} onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        onNavigate={handleNavigate} 
        currentScreen={currentScreen}
        isLoggedIn={!!user}
        userProfile={profile}
        profileLoading={profileLoading}
      />
      {renderCurrentScreen()}
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
