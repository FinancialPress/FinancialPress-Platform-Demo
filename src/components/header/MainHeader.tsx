
import React, { useState } from 'react';
import { Search, Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/logo';
import SearchForm from './SearchForm';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';
import { useNavigate } from 'react-router-dom';

interface UserData {
  displayName: string;
  username: string;
  fptBalance: number;
  imageUrl: string | null;
  role: string;
}

interface MainHeaderProps {
  onNavigate: (screen: number, symbol?: string) => void;
  currentScreen: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  shouldShowLoggedIn: boolean;
  userData: UserData;
}

const MainHeader = ({
  onNavigate,
  currentScreen,
  isDarkMode,
  onToggleDarkMode,
  shouldShowLoggedIn,
  userData,
}: MainHeaderProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const { fptBalance, role } = userData;

  // Top Grey Bar Classes
  const topBarClasses = isDarkMode
    ? 'w-full bg-gray-800 border-b border-gray-700'
    : 'w-full bg-gray-100 border-b border-gray-300';

  const topBarTextClasses = isDarkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  // Main Header Classes
  const mainHeaderClasses = isDarkMode
    ? 'w-full bg-black border-b border-gray-800'
    : 'w-full bg-white border-b border-gray-200';

  const getRoleBadge = (userRole: string) => {
    switch (userRole) {
      case 'creator':
        return 'Creator';
      case 'distributor':
        return 'Distributor';
      case 'newcomer':
        return 'Newcomer';
      default:
        return 'Newcomer';
    }
  };

  const handleFeedClick = () => {
    onNavigate(3);
  };

  const handleCreateClick = () => {
    onNavigate(5);
  };

  const handleDashboardClick = () => {
    onNavigate(4);
  };

  // Navigate to landing page using onNavigate
  const handleHomeClick = () => {
    onNavigate(0);
  };

  const handleAuthClick = () => {
    navigate('/signup');
  };

  const getActiveButtonClasses = (screenNumber: number) => {
    const isActive = currentScreen === screenNumber;
    return isActive 
      ? 'bg-fpYellow text-black rounded-md px-3 py-1 font-bold'
      : `${topBarTextClasses} transition-colors font-bold`;
  };

  return (
    <>
      {/* Top Grey Bar - Primary Navigation */}
      <div className={`${topBarClasses} hidden sm:block`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 text-sm">
              <button 
                onClick={handleFeedClick}
                className={getActiveButtonClasses(3)}
              >
                Feed
              </button>
              <button 
                onClick={handleCreateClick}
                className={getActiveButtonClasses(5)}
              >
                Create
              </button>
              <button 
                onClick={handleDashboardClick}
                className={getActiveButtonClasses(4)}
              >
                Dashboard
              </button>
            </div>

            {/* Right side - Theme toggle and Social Icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                onClick={onToggleDarkMode}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-2">
                <a 
                  href="https://x.com/FinancialPress_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${topBarTextClasses} transition-colors`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/financial-press" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${topBarTextClasses} transition-colors`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main White Header */}
      <header className={mainHeaderClasses}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="h-12 sm:h-14 w-32 sm:w-[200px] cursor-pointer" onClick={handleHomeClick}>
                <Logo isDarkMode={isDarkMode} />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-6">
              <SearchForm onNavigate={onNavigate} isDarkMode={isDarkMode} />

              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => onNavigate(6)}
              >
                <Search className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" className="sm:hidden" onClick={onToggleDarkMode}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {shouldShowLoggedIn ? (
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <UserDropdown userData={userData} isDarkMode={isDarkMode} onNavigate={onNavigate} />

                  <div className="hidden sm:flex items-center space-x-3">
                    <div className="flex items-center bg-fpYellow text-black px-2 py-1 rounded-full space-x-1 font-bold text-sm">
                      <span>💰</span>
                      <span>{fptBalance.toLocaleString()} FPT</span>
                    </div>
                    <Badge className="bg-fpYellow text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                      {getRoleBadge(role)}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`hidden sm:flex ${
                      isDarkMode
                        ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:text-white font-semibold px-4 sm:px-6'
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50 font-semibold px-4 sm:px-6'
                    }`}
                    onClick={handleAuthClick}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-fpYellow hover:bg-fpYellowDark text-black font-semibold px-3 sm:px-6 text-xs sm:text-sm"
                    onClick={handleAuthClick}
                  >
                    Join Now
                  </Button>
                </div>
              )}
            </div>
          </div>

          <MobileMenu
            showMobileMenu={showMobileMenu}
            currentScreen={currentScreen}
            onNavigate={onNavigate}
            onClose={() => setShowMobileMenu(false)}
            shouldShowLoggedIn={shouldShowLoggedIn}
            userData={userData}
            isDarkMode={isDarkMode}
          />
        </div>
      </header>
    </>
  );
};

export default MainHeader;
