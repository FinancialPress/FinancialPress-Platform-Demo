
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface DemoNavigationBarProps {
  currentScreen: number;
  onNavigate: (screen: number) => void;
}

const DemoNavigationBar = ({ currentScreen, onNavigate }: DemoNavigationBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { screen: 0, label: 'Landing Page', route: '/' },
    { screen: 1, label: 'Sign Up', route: '/signup' },
    { screen: 3, label: 'User Feed', route: '/feed' },
    { screen: 4, label: 'Dashboard', route: '/dashboard' },
    { screen: 5, label: 'Content Creator', route: '/create' },
    { screen: 6, label: 'Stock Chart', route: '/stock-chart' },
  ];

  const handleNavigation = (screen: number, route: string) => {
    // Use React Router navigation for all routes
    if (route === '/') {
      navigate('/');
    } else if (route === '/feed') {
      navigate('/feed');
    } else if (route === '/dashboard') {
      navigate('/dashboard');
    } else if (route === '/create') {
      navigate('/create');
    } else if (route === '/signup') {
      // For signup, use the onNavigate prop to show the signup screen
      onNavigate(1);
    } else if (route === '/stock-chart') {
      // For stock chart, use the onNavigate prop
      onNavigate(6);
    } else {
      navigate(route);
    }
  };

  const isCurrentRoute = (route: string) => {
    if (route === '/' && location.pathname === '/') return true;
    if (route !== '/' && location.pathname === route) return true;
    return false;
  };

  return (
    <div className="full-width-bg bg-fpYellow border-b border-fpYellow hidden md:block">
      <div className="content-container py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm overflow-x-auto">
            {navigationItems.map(({ screen, label, route }) => (
              <button
                key={screen}
                onClick={() => handleNavigation(screen, route)}
                className={`transition-colors whitespace-nowrap 
                  text-black hover:text-gray-700 
                  ${isCurrentRoute(route) ? 'font-bold underline' : ''}`}
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
