import React, { useState } from 'react';
import { Search, Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../contexts/ThemeContext';
import { UserProfile } from '../hooks/useProfile';
import TickerBar from './TickerBar';

interface HeaderProps {
  onNavigate?: (screen: number, symbol?: string) => void;
  currentScreen?: number;
  isLoggedIn?: boolean;
  isDemoMinimized?: boolean;
  onToggleDemo?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  userProfile?: UserProfile | null;
}

const Header = ({
  onNavigate,
  currentScreen = 0,
  isLoggedIn = false,
  isDemoMinimized = false,
  onToggleDemo,
  isDarkMode: propIsDarkMode,
  onToggleDarkMode: propOnToggleDarkMode,
  userProfile
}: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const themeContext = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : themeContext.isDarkMode;
  const onToggleDarkMode = propOnToggleDarkMode || themeContext.toggleTheme;

  const shouldShowLoggedIn = [3, 4, 5, 6].includes(currentScreen) || isLoggedIn;

  const getDisplayData = () => {
    if (isLoggedIn && userProfile) {
      const emailName = userProfile.email?.split('@')[0] || 'User';
      return {
        displayName: userProfile.display_name || emailName,
        username: userProfile.username ? `@${userProfile.username}` : `@${emailName}`,
        fptBalance: userProfile.fpt_balance || 0,
        imageUrl: userProfile.image_url,
        role: userProfile.role || 'newcomer'
      };
    }

    if (shouldShowLoggedIn && !isLoggedIn) {
      return {
        displayName: 'John Doe',
        username: '@johndoe',
        fptBalance: 1247.5,
        imageUrl: null,
        role: 'creator'
      };
    }

    return {
      displayName: 'User',
      username: '@user',
      fptBalance: 0,
      imageUrl: null,
      role: 'newcomer'
    };
  };

  const { displayName, username, fptBalance, imageUrl, role } = getDisplayData();

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

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

  const topNavClasses = isDarkMode
    ? 'w-full bg-gray-800 border-b border-gray-700'
    : 'w-full bg-gray-100 border-b border-gray-300';

  const mainHeaderClasses = isDarkMode
    ? 'w-full bg-black border-b border-gray-800'
    : 'w-full bg-white border-b border-gray-200';

  const searchClasses = isDarkMode
    ? 'pl-10 pr-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400'
    : 'pl-10 pr-12 bg-gray-50 border-gray-300 text-black placeholder-gray-500';

  const searchIconClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const searchButtonClasses = isDarkMode
    ? 'bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500'
    : 'bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500';

  return (
    <header className={mainHeaderClasses}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu className="w-5 h-5" />
          </Button>
          <img
            src={isDarkMode ? "/lovable-uploads/logo.png" : "/lovable-uploads/FullLightMode.png"}
            alt="FinancialPress Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (!searchValue.trim()) return;
          setIsSearching(true);
          setTimeout(() => {
            onNavigate?.(6, searchValue.trim().toUpperCase());
            setIsSearching(false);
          }, 300);
        }} className="relative hidden sm:block">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${searchIconClasses} w-4 h-4`} />
          <Input
            placeholder="Search $BTC, $ETH, DeFi..."
            className={`w-64 lg:w-80 text-sm ${searchClasses}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 ${searchButtonClasses} ${
              isSearching || !searchValue.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSearching || !searchValue.trim()}
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>

        {shouldShowLoggedIn && (
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={imageUrl || undefined} alt="Profile" />
              <AvatarFallback className="bg-yellow-500 text-black font-semibold">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className={isDarkMode ? 'text-white text-sm font-semibold' : 'text-black text-sm font-semibold'}>{displayName}</span>
              <span className={isDarkMode ? 'text-gray-400 text-xs' : 'text-gray-600 text-xs'}>{username}</span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-500 text-black px-2 py-1 rounded-full">
              <span className="text-xs font-bold">💰</span>
              <span className="text-xs font-bold">{fptBalance.toLocaleString()} FPT</span>
            </div>
            <Badge className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
              {getRoleBadge(role)}
            </Badge>
          </div>
        )}
      </div>
      <TickerBar isDarkMode={isDarkMode} />
    </header>
  );
};

export default Header;
