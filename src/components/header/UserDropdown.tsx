
import React from 'react';
import { User, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface UserData {
  displayName: string;
  username: string;
  fptBalance: number;
  imageUrl: string | null;
  role: string;
}

interface UserDropdownProps {
  userData: UserData;
  isDarkMode: boolean;
  onNavigate: (screen: number) => void;
}

const UserDropdown = ({ userData, isDarkMode, onNavigate }: UserDropdownProps) => {
  const navigate = useNavigate();
  const { displayName, username, imageUrl } = userData;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 sm:space-x-3"
        >
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage src={imageUrl || undefined} alt="Profile" />
            <AvatarFallback className="bg-fpYellow text-black font-semibold">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col space-y-0.5">
            <span
              className={`font-semibold text-sm ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {displayName}
            </span>
            <span
              className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {username}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-48 mt-2 p-1 ${
          isDarkMode
            ? 'bg-black border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <DropdownMenuItem
          onClick={handleProfileClick}
          className={`flex items-center space-x-2 ${
            isDarkMode
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onNavigate(8)}
          className={`flex items-center space-x-2 ${
            isDarkMode
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut();
            onNavigate(0);
          }}
          className={`flex items-center space-x-2 ${
            isDarkMode
              ? 'text-red-500 hover:bg-gray-800'
              : 'text-red-500 hover:bg-gray-100'
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
