
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import Header from '../components/Header';
import UserFeed from '../components/UserFeed';

const UserFeedPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  const handleNavigate = (screen: number, symbol?: string) => {
    switch (screen) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/auth');
        break;
      case 4:
        navigate('/profile');
        break;
      case 5:
        navigate('/create');
        break;
      case 6:
        // Stock chart navigation - could be handled differently
        navigate('/');
        break;
      default:
        navigate('/');
    }
  };

  const bgClasses = isDarkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-gray-50 text-black";

  return (
    <div className={bgClasses}>
      <Header
        onNavigate={handleNavigate}
        currentScreen={3}
        isLoggedIn={!!user}
        isDarkMode={isDarkMode}
        userProfile={profile}
      />
      <UserFeed 
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        showOnboarding={false}
      />
    </div>
  );
};

export default UserFeedPage;
