
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavigationBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const TopNavigationBar = ({ isDarkMode, onToggleDarkMode }: TopNavigationBarProps) => {
  const topNavClasses = isDarkMode
    ? 'bg-gray-800 border-b border-gray-700'
    : 'bg-gray-100 border-b border-gray-300';

  const topNavTextClasses = isDarkMode
    ? 'text-gray-300 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  return (
    <div className={`full-width-bg ${topNavClasses} hidden sm:block`}>
      <div className="content-container py-2">
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
  );
};

export default TopNavigationBar;
