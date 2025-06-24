
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TopNavigationBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const TopNavigationBar = ({ isDarkMode, onToggleDarkMode }: TopNavigationBarProps) => {
  const navigate = useNavigate();

  const topNavClasses = isDarkMode
    ? 'w-full bg-gray-800 border-b border-gray-700'
    : 'w-full bg-gray-100 border-b border-gray-300';

  const topNavTextClasses = isDarkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  const handleNewsClick = () => {
    navigate('/');
  };

  const handleFeedClick = () => {
    navigate('/feed');
  };

  const handleCommunityClick = () => {
    navigate('/feed');
  };

  return (
    <div className={`${topNavClasses} hidden sm:block`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 text-sm">
            <button 
              onClick={handleNewsClick}
              className={`${topNavTextClasses} transition-colors cursor-pointer`}
            >
              News
            </button>
            <button 
              onClick={handleFeedClick}
              className={`${topNavTextClasses} transition-colors cursor-pointer`}
            >
              Your Feed
            </button>
            <button 
              onClick={handleCommunityClick}
              className={`${topNavTextClasses} transition-colors cursor-pointer`}
            >
              Community
            </button>
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
  );
};

export default TopNavigationBar;
