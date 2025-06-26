
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Dashboard from '../components/Dashboard';
import PageWrapper from '../components/layout/PageWrapper';

const DashboardPage = () => {
  const { isDarkMode } = useTheme();

  const handleNavigate = (screen: number, symbol?: string) => {
    // Handle any navigation needs from the Dashboard component
    console.log('Navigate to screen:', screen, 'symbol:', symbol);
  };

  return (
    <PageWrapper>
      <Dashboard onNavigate={handleNavigate} isDarkMode={isDarkMode} />
    </PageWrapper>
  );
};

export default DashboardPage;
