
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useBalance } from '../contexts/BalanceContext';
import { UserProfile } from '../hooks/useProfile';
import MainHeader from './header/MainHeader';
import TickerBar from './TickerBar';

interface HeaderProps {
  onNavigate?: (screen: number, symbol?: string) => void;
  currentScreen?: number;
  isLoggedIn?: boolean;
  isDemoMinimized?: boolean;
  onToggleDemo?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  userProfile?: UserProfile | null;
  hideTickerBar?: boolean;
}

const Header = ({
  onNavigate,
  currentScreen = 0,
  isLoggedIn = false,
  isDemoMinimized = false,
  onToggleDemo,
  isDarkMode: propIsDarkMode,
  onToggleDarkMode: propOnToggleDarkMode,
  userProfile,
  hideTickerBar = false,
}: HeaderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { balance } = useBalance(); // Use centralized balance

  // Theme handling
  const themeContext = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : themeContext.isDarkMode;
  const onToggleDarkMode = propOnToggleDarkMode || themeContext.toggleTheme;

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Determine logged-in state
  const shouldShowLoggedIn = [3, 4, 5, 6].includes(currentScreen) || isLoggedIn;

  // User display data
  const getDisplayData = () => {
    if (isLoggedIn && userProfile) {
      const emailName = userProfile.email?.split('@')[0] || 'User';
      return {
        displayName: userProfile.display_name || emailName,
        username: userProfile.username ? `@${userProfile.username}` : `@${emailName}`,
        fptBalance: balance, // Use live balance from BalanceContext
        imageUrl: userProfile.image_url,
        role: userProfile.role || 'newcomer',
      };
    }
    if (shouldShowLoggedIn && !isLoggedIn) {
      return {
        displayName: 'John Doe',
        username: '@johndoe',
        fptBalance: 1247.5,
        imageUrl: null,
        role: 'creator',
      };
    }
    return {
      displayName: 'User',
      username: '@user',
      fptBalance: 0,
      imageUrl: null,
      role: 'newcomer',
    };
  };

  const userData = getDisplayData();

  const handleNavigate = (screen: number, symbol?: string) => {
    onNavigate?.(screen, symbol);
  };

  return (
    <>
      <MainHeader
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
        shouldShowLoggedIn={shouldShowLoggedIn}
        userData={userData}
      />
      {!hideTickerBar && <TickerBar isDarkMode={isDarkMode} />}
    </>
  );
};

export default Header;
