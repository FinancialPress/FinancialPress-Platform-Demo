
import React, { useState } from 'react';
import { Search, Bell, User, Sun, Moon, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import TickerBar from './TickerBar';

interface HeaderProps {
  onNavigate?: (screen: number, symbol?: string) => void;
  currentScreen?: number;
  isLoggedIn?: boolean;
  isDemoMinimized?: boolean;
  onToggleDemo?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Header = ({ 
  onNavigate, 
  currentScreen = 0,
  isLoggedIn = false, 
  isDemoMinimized = false, 
  onToggleDemo,
  isDarkMode = true,
  onToggleDarkMode
}: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Determine if user should be shown as logged in based on current screen
  const shouldShowLoggedIn = [3, 4, 5, 6].includes(currentScreen) || isLoggedIn;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    
    // Navigate to stockchartdata page with symbol
    setTimeout(() => {
      onNavigate?.(6, searchValue.trim().toUpperCase());
      setIsSearching(false);
    }, 300);
  };

  const topNavClasses = isDarkMode 
    ? "w-full bg-gray-800 border-b border-gray-700"
    : "w-full bg-gray-100 border-b border-gray-300";

  const topNavTextClasses = isDarkMode
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 hover:text-gray-900";

  const mainHeaderClasses = isDarkMode
    ? "w-full bg-black border-b border-gray-800"
    : "w-full bg-white border-b border-gray-200";

  const logoTextClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const searchClasses = isDarkMode
    ? "pl-10 pr-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
    : "pl-10 pr-12 bg-gray-50 border-gray-300 text-black placeholder-gray-500";

  const searchIconClasses = isDarkMode
    ? "text-gray-400"
    : "text-gray-500";

  const searchButtonClasses = isDarkMode
    ? "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500"
    : "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500";

  return (
    <>
      {/* Demo Navigation Strip - Hidden on mobile */}
      <div className="w-full bg-yellow-500 border-b border-yellow-600 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm overflow-x-auto">
              <button 
                onClick={() => onNavigate?.(0)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${currentScreen === 0 ? 'font-bold underline' : ''}`}
              >
                Landing Page
              </button>
              <button 
                onClick={() => onNavigate?.(1)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${currentScreen === 1 ? 'font-bold underline' : ''}`}
              >
                Sign Up
              </button>
              <button 
                onClick={() => onNavigate?.(3)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${currentScreen === 3 ? 'font-bold underline' : ''}`}
              >
                User Feed
              </button>
              <button 
                onClick={() => onNavigate?.(4)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${currentScreen === 4 ? 'font-bold underline' : ''}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate?.(5)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${currentScreen === 5 ? 'font-bold underline' : ''}`}
              >
                Content Creator
              </button>
              <button 
                onClick={() => onNavigate?.(6)}
                className={`text-black hover:text-gray-700 transition-colors whitespace-nowrap ${currentScreen === 6 ? 'font-bold underline' : ''}`}
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
              <a href="#" className={`${topNavTextClasses} transition-colors`}>News</a>
              <a href="#" className={`${topNavTextClasses} transition-colors`}>Your Feed</a>
              <a href="#" className={`${topNavTextClasses} transition-colors`}>Community</a>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className={isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}
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
                  src={isDarkMode ? "/lovable-uploads/logo.png" : "/lovable-uploads/FullLightMode.png"}
                  alt="FinancialPress Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-6">
              {/* Enhanced Search Form - Hidden on very small screens, shown as icon on mobile */}
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${searchIconClasses} w-4 h-4 sm:w-5 sm:h-5`} />
                <Input 
                  placeholder="Search $XRP, $FPT, Tesla..."
                  className={`w-48 sm:w-64 lg:w-80 text-sm ${searchClasses}`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  aria-label="Search stocks and cryptocurrencies"
                />
                <Button
                  type="submit"
                  size="icon"
                  className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 ${searchButtonClasses} ${
                    isSearching || !searchValue.trim() 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
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
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={onToggleDarkMode}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              {shouldShowLoggedIn ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* Account Profile */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback className="bg-yellow-500 text-black font-semibold">JD</AvatarFallback>
                    </Avatar>
                    
                    {/* Profile Info - Hidden on mobile */}
                    <div className="hidden sm:flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className={`${logoTextClasses} font-semibold text-sm`}>John Doe</span>
                        <span className={`text-xs font-medium ${logoTextClasses}`}>1,247.5 FPT</span>
                        <Badge className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                          Creator Newcomer
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@johndoe</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`hidden sm:flex ${isDarkMode 
                      ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:text-white font-semibold px-4 sm:px-6"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 font-semibold px-4 sm:px-6"
                    }`}
                    onClick={() => onNavigate?.(1)}
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 sm:px-6 text-xs sm:text-sm"
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
                  onClick={() => { onNavigate?.(0); setShowMobileMenu(false); }}
                  className={`text-left px-4 py-2 text-sm ${currentScreen === 0 ? 'font-bold text-yellow-400' : logoTextClasses}`}
                >
                  Landing Page
                </button>
                <button 
                  onClick={() => { onNavigate?.(1); setShowMobileMenu(false); }}
                  className={`text-left px-4 py-2 text-sm ${currentScreen === 1 ? 'font-bold text-yellow-400' : logoTextClasses}`}
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => { onNavigate?.(3); setShowMobileMenu(false); }}
                  className={`text-left px-4 py-2 text-sm ${currentScreen === 3 ? 'font-bold text-yellow-400' : logoTextClasses}`}
                >
                  User Feed
                </button>
                <button 
                  onClick={() => { onNavigate?.(4); setShowMobileMenu(false); }}
                  className={`text-left px-4 py-2 text-sm ${currentScreen === 4 ? 'font-bold text-yellow-400' : logoTextClasses}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => { onNavigate?.(5); setShowMobileMenu(false); }}
                  className={`text-left px-4 py-2 text-sm ${currentScreen === 5 ? 'font-bold text-yellow-400' : logoTextClasses}`}
                >
                  Content Creator
                </button>
                <button 
                  onClick={() => { onNavigate?.(6); setShowMobileMenu(false); }}
                  className={`text-left px-4 py-2 text-sm ${currentScreen === 6 ? 'font-bold text-yellow-400' : logoTextClasses}`}
                >
                  Stock Chart
                </button>

                {shouldShowLoggedIn && (
                  <div className="border-t border-gray-700 pt-3 px-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="bg-yellow-500 text-black font-semibold">JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`${logoTextClasses} font-semibold text-sm`}>John Doe</span>
                          <Badge className="bg-yellow-500 text-black text-xs px-1 py-0.5 rounded-full font-semibold">
                            Creator
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@johndoe</span>
                          <span className={`text-xs font-medium ${logoTextClasses}`}>1,247.5 FPT</span>
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

      {/* Global Scrolling Ticker - Moved to Bottom */}
      <TickerBar isDarkMode={isDarkMode} />
    </>
  );
};

export default Header;
