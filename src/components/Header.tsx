
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onNavigate?: (screen: number) => void;
  isLoggedIn?: boolean;
}

const Header = ({ onNavigate, isLoggedIn = false }: HeaderProps) => {
  return (
    <header className="w-full bg-black border-b border-gray-800">
      <div className="max-w-[1440px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <img 
              src="/lovable-uploads/1a2b168c-aa7f-4ee5-8180-f1bdc8ecd1db.png" 
              alt="FinancialPress Logo" 
              className="w-12 h-12"
            />
            <span className="text-white text-2xl font-bold">FinancialPress</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search $XRP, $FPT, Tesla..."
                className="pl-10 w-80 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:text-white"
                >
                  <Bell className="w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-white font-medium">John Doe</span>
                </div>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:text-white font-semibold px-6"
                  onClick={() => onNavigate?.(1)}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
                  onClick={() => onNavigate?.(1)}
                >
                  Join Now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
