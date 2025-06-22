import React, { useState } from 'react';
import { Search, Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/logo';
import SearchForm from './SearchForm';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';

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

  const { fptBalance, role } = userData;

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

  return (
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

            <div className="h-12 sm:h-14 w-32 sm:w-[200px]">
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
                  onClick={() => onNavigate(1)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-fpYellow hover:bg-fpYellowDark text-black font-semibold px-3 sm:px-6 text-xs sm:text-sm"
                  onClick={() => onNavigate(1)}
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
  );
};

export default MainHeader;
