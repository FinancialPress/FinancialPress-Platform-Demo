
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import Header from '../Header';

const AppLayout = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  // Don't show header on certain pages (like onboarding in Index)
  const hideHeaderPaths = ['/onboarding'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  const themeClasses = isDarkMode 
    ? "page-background bg-black"
    : "page-background bg-gray-50";

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden min-h-screen`}>
      {shouldShowHeader && (
        <Header 
          currentScreen={0}
          isDarkMode={isDarkMode}
          userProfile={profile}
          isLoggedIn={!!user}
        />
      )}
      
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
