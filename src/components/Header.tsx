
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, Menu, X, User, LogOut, Coins } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBalance } from '@/contexts/BalanceContext';
import { useToast } from '@/hooks/use-toast';
import Logo from './ui/logo';
import DemoNavigationBar from './header/DemoNavigationBar';

interface HeaderProps {
  onNavigate: (screen: number, symbol?: string) => void;
  currentScreen: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  userProfile?: any;
  isLoggedIn: boolean;
}

const Header = ({ onNavigate, currentScreen, isDarkMode, onToggleDarkMode, userProfile, isLoggedIn }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { balance } = useBalance();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      
      // Navigate to home page after sign out
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFeedClick = () => {
    if (user) {
      // For authenticated users, go directly to /feed
      navigate('/feed');
    } else {
      // For demo users, use the existing screen-based navigation
      onNavigate(3);
    }
  };

  const bgClasses = isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`${bgClasses} border-b sticky top-0 z-50`}>
      {/* Show demo navigation bar only for non-authenticated users */}
      {!user && <DemoNavigationBar currentScreen={currentScreen} onNavigate={onNavigate} />}
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo className="h-8 w-auto" />
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={handleFeedClick}
              className={`${textClasses} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              Feed
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/create')}
              className={`${textClasses} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              Create
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate(4)}
              className={`${textClasses} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              Dashboard
            </Button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* FPT Balance */}
            {user && (
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                <Badge className="bg-yellow-500 text-black font-semibold">
                  {balance.toFixed(1)} FPT
                </Badge>
              </div>
            )}

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className={`hidden sm:block text-sm font-medium ${textClasses}`}>
                    {userProfile?.display_name || userProfile?.email || 'User'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className={`${mutedTextClasses} hover:text-red-500`}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate(1)}
                className="bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Sign Up
              </Button>
            )}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleDarkMode}
              className={`${textClasses} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden ${textClasses}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                onClick={() => {
                  handleFeedClick();
                  setIsMenuOpen(false);
                }}
                className={`justify-start ${textClasses}`}
              >
                Feed
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigate('/create');
                  setIsMenuOpen(false);
                }}
                className={`justify-start ${textClasses}`}
              >
                Create
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  onNavigate(4);
                  setIsMenuOpen(false);
                }}
                className={`justify-start ${textClasses}`}
              >
                Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
