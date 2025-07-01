
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import SignUpPage from '../components/SignUpPage';

const SignUpPageRoute = () => {
  const { isDarkMode } = useTheme();

  return <SignUpPage isDarkMode={isDarkMode} />;
};

export default SignUpPageRoute;
