
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  const handleNavigate = (screen: number, symbol?: string) => {
    // Handle any navigation needs from the Dashboard component
    console.log('Navigate to screen:', screen, 'symbol:', symbol);
  };

  const themeClasses = isDarkMode 
    ? "page-background bg-black"
    : "page-background bg-gray-50";

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden`}>
      <Header 
        onNavigate={handleNavigate} 
        currentScreen={4}
        isDarkMode={isDarkMode}
        userProfile={profile}
        isLoggedIn={!!user}
      />
      <Dashboard onNavigate={handleNavigate} isDarkMode={isDarkMode} />
    </div>
  );
};

export default DashboardPage;
