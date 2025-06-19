import React, { useState } from 'react';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TickerBar from './TickerBar';

interface HeaderProps {
  onNavigate?: (screen: number, symbol?: string) => void;
  currentScreen?: number;
  isLoggedIn?: boolean;
  isDemoMinimized?: boolean;
  onToggleDemo?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Header = ({ 
  onNavigate, 
  currentScreen = 0,
  isLoggedIn = false, 
  isDemoMinimized = false, 
  onToggleDemo,
  isDarkMode = true,
  onToggleDarkMode
}: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    
    // Navigate to stockchartdata page with symbol
    setTimeout(() => {
      onNavigate?.(6, searchValue.trim().toUpperCase());
      setIsSearching(false);
    }, 300);
  };

  const topNavClasses = isDarkMode 
    ? "w-full bg-gray-800 border-b border-gray-700"
    : "w-full bg-gray-100 border-b border-gray-300";

  const topNavTextClasses = isDarkMode
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 hover:text-gray-900";

  const mainHeaderClasses = isDarkMode
    ? "w-full bg-black border-b border-gray-800"
    : "w-full bg-white border-b border-gray-200";

  const logoTextClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const searchClasses = isDarkMode
    ? "pl-10 pr-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
    : "pl-10 pr-12 bg-gray-50 border-gray-300 text-black placeholder-gray-500";

  const searchIconClasses = isDarkMode
    ? "text-gray-400"
    : "text-gray-500";

  const searchButtonClasses = isDarkMode
    ? "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500"
    : "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500";

  return (
    <>
      {/* Demo Navigation Strip */}
      <div className="w-full bg-yellow-500 border-b border-yellow-600">
        <div className="max-w-[1440px] mx-auto px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={() => onNavigate?.(0)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 0 ? 'font-bold underline' : ''}`}
              >
                Landing Page
              </button>
              <button 
                onClick={() => onNavigate?.(1)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 1 ? 'font-bold underline' : ''}`}
              >
                Sign Up
              </button>
              <button 
                onClick={() => onNavigate?.(3)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 3 ? 'font-bold underline' : ''}`}
              >
                User Feed
              </button>
              <button 
                onClick={() => onNavigate?.(4)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 4 ? 'font-bold underline' : ''}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate?.(5)}
                className={`text-black hover:text-gray-700 transition-colors ${currentScreen === 5 ? 'font-bold underline' : ''}`}
              >
                Content Creator
              </button>
              <button 
                onClick={() => onNavigate?.(6...

Something went wrong, please refresh to reconnect or try again.
