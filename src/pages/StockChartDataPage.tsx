
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import StockChartData from '../components/StockChartData';
import PageWrapper from '../components/layout/PageWrapper';

const StockChartDataPage = () => {
  const { isDarkMode } = useTheme();

  const handleNavigate = (screen: number, symbol?: string) => {
    // Handle any navigation needs from the StockChartData component
    console.log('Navigate to screen:', screen, 'symbol:', symbol);
  };

  return (
    <PageWrapper>
      <StockChartData onNavigate={handleNavigate} isDarkMode={isDarkMode} />
    </PageWrapper>
  );
};

export default StockChartDataPage;
