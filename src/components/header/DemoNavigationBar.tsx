
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DemoNavigationBarProps {
  currentScreen: number;
  onNavigate: (screen: number) => void;
}

const DemoNavigationBar = ({ currentScreen, onNavigate }: DemoNavigationBarProps) => {
  const navigate = useNavigate();
  
  const navigationItems = [
    { screen: 0, label: 'Landing Page' },
    { screen: 1, label: 'Sign Up' },
    { screen: 3, label: 'User Feed' },
    { screen: 4, label: 'Dashboard' },
    { screen: 5, label: 'Content Creator' },
    { screen: 6, label: 'Stock Chart' },
  ];

  const handleNavigation = (screen: number) => {
    // For UserFeed, navigate to the /feed route using React Router
    if (screen === 3) {
      navigate('/feed');
    } 
    // For Dashboard, navigate to the /dashboard route using React Router
    else if (screen === 4) {
      navigate('/dashboard');
    }
    else {
      onNavigate(screen);
    }
  };

  return (
    <div className="w-full bg-fpYellow border-b border-fpYellow hidden md:block">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm overflow-x-auto">
            {navigationItems.map(({ screen, label }) => (
              <button
                key={screen}
                onClick={() => handleNavigation(screen)}
                className={`transition-colors whitespace-nowrap 
                  text-black hover:text-gray-700 
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
