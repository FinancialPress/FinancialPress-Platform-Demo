import React, { useState } from 'react';
import { Search, Bell, User, Sun, Moon, Menu, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
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
  userProfile,
}: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Supabase client for sign-out
  const supabase = useSupabaseClient();

  // Theme handling
  const themeContext = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : themeContext.isDarkMode;
  const onToggleDarkMode = propOnToggleDarkMode || themeContext.toggleTheme;

  // Determine logged-in state
  const shouldShowLoggedIn = [3, 4, 5, 6].includes(currentScreen) || isLoggedIn;

  // User display data
  const getDisplayData = () => {
    if (isLoggedIn && userProfile) {
      const emailName = userProfile.email?.split('@')[0] || 'User';
      return {
        displayName: userProfile.display_name || emailName,
        username: userProfile.username ? `@${userProfile.username}` : `@${emailName}`,
        fptBalance: userProfile.fpt_balance || 0,
        imageUrl: userProfile.image_url,
        role: userProfile.role || 'newcomer',
      };
    }
    if (shouldShowLoggedIn && !isLoggedIn) {
      return {
        displayName: 'John Doe',
        username: '@johndoe',
        fptBalance: 1247.5,
        imageUrl: null,
        role: 'creator',
      };
    }
    return {
      displayName: 'User',
      username: '@user',
      fptBalance: 0,
      imageUrl: null,
      role: 'newcomer',
    };
  };

  const { displayName, username, fptBalance, imageUrl, role } = getDisplayData();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      onNavigate?.(6, searchValue.trim().toUpperCase());
      setIsSearching(false);
    }, 300);
  };

  const topNavClasses = isDarkMode
    ? 'w-full bg-gray-800 border-b border-gray-700'
    : 'w-full bg-gray-100 border-b border-gray-300';

  const topNavTextClasses = isDarkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  const mainHeaderClasses = isDarkMode
    ? 'w-full bg-[#0D0D0E] border-b border-gray-800'
    : 'w-full bg-white border-b border-gray-200';

  const logoTextClasses = isDarkMode ? 'text-white' : 'text-black';

  const searchClasses = isDarkMode
    ? 'pl-10 pr-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400'
    : 'pl-10 pr-12 bg-gray-50 border-gray-300 text-black placeholder-gray-500';

  const searchIconClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const searchButtonClasses = isDarkMode
    ? 'bg-[#F8E71C] hover:bg-[#E5D41A] text-black border-[#F8E71C]'
    : 'bg-[#F8E71C] hover:bg-[#E5D41A] text-black border-[#F8E71C]';

  return (
    <>
      {/* Demo Navigation Strip - Hidden on mobile */}
      <div className="w-full bg-[#F8E71C] border-b border-yellow-600 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm overflow-x-auto">
              <button
                onClick={() => onNavigate?.(0)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${
                  currentScreen === 0 ? 'font-bold underline' : ''
                }`}
              >
                Landing Page
              </button>
              <button
                onClick={() => onNavigate?.(1)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${
                  currentScreen === 1 ? 'font-bold underline' : ''
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => onNavigate?.(3)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${
                  currentScreen === 3 ? 'font-bold underline' : ''
                }`}
              >
                User Feed
              </button>
              <button
                onClick={() => onNavigate?.(4)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${
                  currentScreen === 4 ? 'font-bold underline' : ''
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate?.(5)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${
                  currentScreen === 5 ? 'font-bold underline' : ''
                }`}
              >
                Content Creator
              </button>
              <button
                onClick={() => onNavigate?.(6)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${
                  currentScreen === 6 ? 'font-bold underline' : ''
                }`}
              >
                Stock Chart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Navigation Strip */}
      <div className={`${topNavClasses} hidden sm:block`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 text-sm">
              <a href="#" className={`${topNavTextClasses} transition-colors`}>
                News
              </a>
              <a href="#" className={`${topNavTextClasses} transition-colors`}>
                Your Feed
              </a>
              <a href="#" className={`${topNavTextClasses} transition-colors`}>
                Community
              </a>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              onClick={onToggleDarkMode}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={mainHeaderClasses}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 sm:space-x-8">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="h-12 sm:h-14 w-32 sm:w-[200px]">
                <img
                  src={isDarkMode ? '/lovable-Uploads/logo.png' : '/lovable-Uploads/FullLightMode.png'}
                  alt="BTCMargin Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-6">
              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${searchIconClasses} w-4 h-4 sm:w-5 sm:h-5`}
                />
                <Input
                  placeholder="Search $BTC, $ETH, DeFi..."
                  className={`w-48 sm:w-64 lg:w-80 text-sm ${searchClasses}`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  aria-label="Search cryptocurrencies and topics"
                />
                <Button
                  type="submit"
                  size="icon"
                  className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 ${searchButtonClasses} ${
                    isSearching || !searchValue.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSearching || !searchValue.trim()}
                  aria-label="Execute search"
                >
                  <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </form>

              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => onNavigate?.(6)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Theme Toggle for Mobile */}
              <Button variant="ghost" size="icon" className="sm:hidden" onClick={onToggleDarkMode}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {shouldShowLoggedIn ? (
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex flex-col items-end text-right space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {displayName}
                      </span>
                      <Badge className="bg-[#F8E71C] text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                        {getRoleBadge(role)}
                      </Badge>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {username}
                    </span>
                  </div>

                  <div className="flex items-center bg-[#F8E71C] text-black px-2 py-1 rounded-full space-x-1 font-bold text-sm">
                    <span>💰</span>
                    <span>{fptBalance.toLocaleString()} FPT</span>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage src={imageUrl || undefined} alt="Profile" />
                          <AvatarFallback className="bg-[#F8E71C] text-black font-semibold">
                            {getInitials(displayName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 mt-2 p-1 bg-[#0D0D0E] border border-gray-700">
                      <DropdownMenuItem
                        onClick={() => onNavigate?.(7)}
                        className="flex items-center space-x-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onNavigate?.(8)}
                        className="flex items-center space-x-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          await supabase.auth.signOut();
                          onNavigate?.(0); // Redirect to landing
                        }}
                        className="flex items-center space-x-2 text-red-500 hover:bg-gray-800"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                    onClick={() => onNavigate?.(1)}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#F8E71C] hover:bg-[#E5D41A] text-black font-semibold px-3 sm:px-6 text-xs sm:text-sm"
                    onClick={() => onNavigate?.(1)}
                  >
                    Join Now
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => {
                    onNavigate?.(0);
                    setShowMobileMenu(false);
                  }}
                  className={`text-left px-4 py-2 text-sm ${
                    currentScreen === 0 ? 'font-bold text-[#F8E71C]' : logoTextClasses
                  }`}
                >
                  Landing Page
                </button>
                <button
                  onClick={() => {
                    onNavigate?.(1);
                    setShowMobileMenu(false);
                  }}
                  className={`text-left px-4 py-2 text-sm ${
                    currentScreen === 1 ? 'font-bold text-[#F8E71C]' : logoTextClasses
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    onNavigate?.(3);
                    setShowMobileMenu(false);
                  }}
                  className={`text-left px-4 py-2 text-sm ${
                    currentScreen === 3 ? 'font-bold text-[#F8E71C]' : logoTextClasses
                  }`}
                >
                  User Feed
                </button>
                <button
                  onClick={() => {
                    onNavigate?.(4);
                    setShowMobileMenu(false);
                  }}
                  className={`text-left px-4 py-2 text-sm ${
                    currentScreen === 4 ? 'font-bold text-[#F8E71C]' : logoTextClasses
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    onNavigate?.(5);
                    setShowMobileMenu(false);
                  }}
                  className={`text-left px-4 py-2 text-sm ${
                    currentScreen === 5 ? 'font-bold text-[#F8E71C]' : logoTextClasses
                  }`}
                >
                  Content Creator
                </button>
                <button
                  onClick={() => {
                    onNavigate?.(6);
                    setShowMobileMenu(false);
                  }}
                  className={`text-left px-4 py-2 text-sm ${
                    currentScreen === 6 ? 'font-bold text-[#F8E71C]' : logoTextClasses
                  }`}
                >
                  Stock Chart
                </button>

                {shouldShowLoggedIn && (
                  <div className="border-t border-gray-700 pt-3 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={imageUrl || undefined} alt="Profile" />
                        <AvatarFallback className="bg-[#F8E71C] text-black font-semibold">
                          {getInitials(displayName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`${logoTextClasses} font-semibold text-sm`}>{displayName}</span>
                          <Badge className="bg-[#F8E71C] text-black text-xs px-1 py-0.5 rounded-full font-semibold">
                            {getRoleBadge(role)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {username}
                          </span>
                          <div className="flex items-center space-x-1 bg-[#F8E71C] text-black px-1 py-0.5 rounded-full">
                            <span className="text-xs font-bold">💰</span>
                            <span className="text-xs font-bold">{fptBalance.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Global Scrolling Ticker */}
      <TickerBar isDarkMode={isDarkMode} />
    </>
  );
};

export default Header;
