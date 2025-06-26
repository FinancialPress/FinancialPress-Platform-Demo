
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import Header from '../Header';

const AppLayout = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  // Don't show header on certain pages (like onboarding in Index)
  const hideHeaderPaths = ['/onboarding'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  const themeClasses = isDarkMode 
    ? "page-background bg-black"
    : "page-background bg-gray-50";

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -10,
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.2
  };

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden min-h-screen`}>
      {shouldShowHeader && (
        <Header 
          currentScreen={0}
          isDarkMode={isDarkMode}
          userProfile={profile}
          isLoggedIn={!!user}
        />
      )}
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="flex-1"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AppLayout;
