
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import Header from '../components/Header';
import UserFeed from '../components/UserFeed';

const UserFeedPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  const handleNavigate = (screen: number) => {
    console.log('UserFeedPage handleNavigate called with screen:', screen);
    // Map screen numbers to routes
    switch (screen) {
      case 0:
        navigate('/');
        break;
      case 4:
        navigate('/');
        break;
      case 5:
        navigate('/create');
        break;
      default:
        console.log('Unknown screen number:', screen);
        break;
    }
  };

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-black"
    : "min-h-screen bg-gray-50";

  console.log('UserFeedPage rendering with user:', user?.id);

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden`}>
      <Header 
        onNavigate={handleNavigate} 
        currentScreen={3}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleTheme}
        userProfile={profile}
        isLoggedIn={!!user}
      />
      <div className="w-full">
        <UserFeed onNavigate={handleNavigate} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default UserFeedPage;
