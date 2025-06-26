
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../hooks/useProfile';
import Header from '../components/Header';
import StockChartData from '../components/StockChartData';

const StockChartDataPage = () => {
  const [searchParams] = useSearchParams();
  const symbol = searchParams.get('symbol') || '';
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  const handleNavigate = (screen: number, symbol?: string) => {
    // Handle any navigation needs from the StockChartData component
    console.log('Navigate to screen:', screen, 'symbol:', symbol);
  };

  const themeClasses = isDarkMode 
    ? "page-background bg-black"
    : "page-background bg-gray-50";

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden`} style={{ transition: 'none' }}>
      <Header 
        onNavigate={handleNavigate} 
        currentScreen={6}
        isDarkMode={isDarkMode}
        userProfile={profile}
        isLoggedIn={!!user}
      />
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-16">
        <StockChartData 
          symbol={symbol}
          onNavigate={handleNavigate} 
          isDarkMode={isDarkMode} 
        />
      </div>
    </div>
  );
};

export default StockChartDataPage;
