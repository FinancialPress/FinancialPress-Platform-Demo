
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import Header from '../components/Header';
import UserFeed from '../components/UserFeed';

// Error boundary wrapper for UserFeed
class UserFeedErrorBoundary extends React.Component<
  { children: React.ReactNode; isDarkMode: boolean },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; isDarkMode: boolean }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('UserFeed Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const bgClasses = this.props.isDarkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-gray-50 text-black";
      
      return (
        <div className={bgClasses}>
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p className="text-lg mb-4">Unable to load the feed. Please try refreshing the page.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-fpYellow hover:bg-fpYellowDark text-black font-semibold px-6 py-2 rounded"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}

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
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-16">
        <UserFeedErrorBoundary isDarkMode={isDarkMode}>
          <UserFeed 
            onNavigate={handleNavigate}
            isDarkMode={isDarkMode}
            showOnboarding={false}
          />
        </UserFeedErrorBoundary>
      </div>
    </div>
  );
};

export default UserFeedPage;
