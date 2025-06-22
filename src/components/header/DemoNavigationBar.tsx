import React from 'react';

interface DemoNavigationBarProps {
  currentScreen: number;
  onNavigate: (screen: number) => void;
}

const DemoNavigationBar = ({ currentScreen, onNavigate }: DemoNavigationBarProps) => {
  const navigationItems = [
    { screen: 0, label: 'Landing Page' },
    { screen: 1, label: 'Sign Up' },
    { screen: 3, label: 'User Feed' },
    { screen: 4, label: 'Dashboard' },
    { screen: 5, label: 'Content Creator' },
    { screen: 6, label: 'Stock Chart' },
  ];

  return (
    <div className="w-full bg-fpYellow border-b border-fpYellow hidden md:block">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm overflow-x-auto">
            {navigationItems.map(({ screen, label }) => (
              <button
                key={screen}
                onClick={() => onNavigate(screen)}
                className={`transition-colors whitespace-nowrap 
                  text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 
                  ${currentScreen === screen ? 'font-bold underline' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoNavigationBar;
