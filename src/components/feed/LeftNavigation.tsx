
import React from 'react';
import { Home, Bell, Mail, Bookmark, User, Search, MoreHorizontal } from 'lucide-react';

interface LeftNavigationProps {
  isDarkMode: boolean;
  onNavigate?: (screen: number) => void;
}

const LeftNavigation = ({ isDarkMode, onNavigate }: LeftNavigationProps) => {
  const navItems = [
    { icon: Home, label: 'Home', active: true, screen: 3 },
    { icon: Search, label: 'Explore', active: false, screen: 0 },
    { icon: Bell, label: 'Notifications', active: false, screen: 0 },
    { icon: Mail, label: 'Messages', active: false, screen: 0 },
    { icon: Bookmark, label: 'Bookmarks', active: false, screen: 0 },
    { icon: User, label: 'Profile', active: false, screen: 4 },
    { icon: MoreHorizontal, label: 'More', active: false, screen: 0 },
  ];

  const handleNavClick = (screen: number) => {
    onNavigate?.(screen);
  };

  return (
    <nav className={`sticky top-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.screen)}
              className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 px-3 lg:px-4 py-3 rounded-full transition-colors hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} ${
                item.active 
                  ? `font-bold ${isDarkMode ? 'text-white' : 'text-black'}` 
                  : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`
              }`}
            >
              <Icon className={`w-6 h-6 ${item.active ? 'stroke-2' : 'stroke-1.5'}`} />
              <span className="text-xl hidden lg:block">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Tweet/Post Button */}
      <button
        onClick={() => onNavigate?.(5)}
        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-3 lg:px-6 rounded-full transition-colors"
      >
        <span className="hidden lg:block">Post</span>
        <span className="lg:hidden">+</span>
      </button>
    </nav>
  );
};

export default LeftNavigation;
