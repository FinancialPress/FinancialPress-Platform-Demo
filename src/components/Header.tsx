import React, { useState } from 'react';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
      {/* Demo Navigation Strip */}
      <div className="w-full bg-yellow-500 border-b border-yellow-600">
        <div className="max-w-[1440px] mx-auto px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={() => onNavigate?.(0)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 0 ? 'font-bold underline' : ''}`}
              >
                Landing Page
              </button>
              <button 
                onClick={() => onNavigate?.(1)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 1 ? 'font-bold underline' : ''}`}
              >
                Sign Up
              </button>
              <button 
                onClick={() => onNavigate?.(3)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 3 ? 'font-bold underline' : ''}`}
              >
                User Feed
              </button>
              <button 
                onClick={() => onNavigate?.(4)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 4 ? 'font-bold underline' : ''}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate?.(5)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 5 ? 'font-bold underline' : ''}`}
              >
                Content Creator
              </button>
              <button 
                onClick={() => onNavigate?.(6)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 6 ? 'font-bold underline' : ''}`}
              >
                Stock Chart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Navigation Strip */}
      <div className={topNavClasses}>
        <div className="max-w-[1440px] mx-auto px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 text-sm">
              <a href="#" className={`${topNavTextClasses} transition-colors`}>News</a>
              <a href="#" className={`${topNavTextClasses} transition-colors`}>Your Feed</a>
              <a href="#" className={`${topNavTextClasses} transition-colors`}>Community</a>
            </div>
            
            {/* Light/Dark Mode Toggle */}
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
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="relative h-8 w-[160px] bg-red-200">
                <img
                  src="/lovable-uploads/logo.png"
                  alt="Dark Logo"
                  className={`absolute top-0 left-0 h-8 w-[160px] object-contain transition-opacity duration-300 ${
                    isDarkMode ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ zIndex: 10 }}
                />
                <img
                  src="/lovable-uploads/FullLightMode.png"
                  alt="Light Logo"
                  className={`absolute top-0 left-0 h-8 w-[160px] object-contain transition-opacity duration-300 ${
                    !isDarkMode ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ zIndex: 10 }}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Enhanced Search Form */}
              <form onSubmit={handleSearch} className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${searchIconClasses} w-5 h-5`} />
                <Input 
                  placeholder="Search $XRP, $FPT, Tesla..."
                  className={`w-80 ${searchClasses}`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  aria-label="Search stocks and cryptocurrencies"
                />
                <Button
                  type="submit"
                  size="icon"
                  className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 ${searchButtonClasses} ${
                    isSearching || !searchValue.trim() 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                  disabled={isSearching || !searchValue.trim()}
                  aria-label="Execute search"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={isDarkMode 
                      ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:text-white"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                    }
                  >
                    <Bell className="w-5 h-5" />
                  </Button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-black" />
                    </div>
                    <span className={`${logoTextClasses} font-medium`}>John Doe</span>
                  </div>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className={isDarkMode 
                      ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:text-white font-semibold px-6"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 font-semibold px-6"
                    }
                    onClick={() => onNavigate?.(1)}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
                    onClick={() => onNavigate?.(1)}
                  >
                    Join Now
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Scrolling Ticker - Moved to Bottom */}
      <TickerBar isDarkMode={isDarkMode} />
    </>
  );
};

export default Header;
