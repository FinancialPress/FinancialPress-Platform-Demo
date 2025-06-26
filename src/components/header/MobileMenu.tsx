
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface UserData {
  displayName: string;
  username: string;
  fptBalance: number;
  imageUrl: string | null;
  role: string;
}

interface MobileMenuProps {
  showMobileMenu: boolean;
  currentScreen: number;
  onNavigate: (screen: number) => void;
  onClose: () => void;
  shouldShowLoggedIn: boolean;
  userData: UserData;
  isDarkMode: boolean;
}

const MobileMenu = ({
  showMobileMenu,
  onClose,
  shouldShowLoggedIn,
  userData,
  isDarkMode,
}: MobileMenuProps) => {
  const navigate = useNavigate();
  const { displayName, username, fptBalance, imageUrl, role } = userData;

  const logoTextClasses = isDarkMode ? 'text-white' : 'text-black';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (userRole: string) => {
    switch (userRole) {
      case 'creator':
        return 'Creator';
      case 'distributor':
        return 'Distributor';
      case 'newcomer':
        return 'Newcomer';
      default:
        return 'Newcomer';
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!showMobileMenu) return null;

  return (
    <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
      <div className="flex flex-col space-y-3 pt-4">
        <button
          onClick={() => handleNavigation('/')}
          className={`text-left px-4 py-2 text-sm ${logoTextClasses}`}
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation('/feed')}
          className={`text-left px-4 py-2 text-sm ${logoTextClasses}`}
        >
          Feed
        </button>
        <button
          onClick={() => handleNavigation('/create')}
          className={`text-left px-4 py-2 text-sm ${logoTextClasses}`}
        >
          Create
        </button>
        <button
          onClick={() => handleNavigation('/dashboard')}
          className={`text-left px-4 py-2 text-sm ${logoTextClasses}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavigation('/stockchartdata')}
          className={`text-left px-4 py-2 text-sm ${logoTextClasses}`}
        >
          Stock Chart
        </button>

        {shouldShowLoggedIn && (
          <div className="border-t border-gray-700 pt-3 px-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={imageUrl || undefined} alt="Profile" />
                <AvatarFallback className="bg-fpYellow text-black font-semibold">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`${logoTextClasses} font-semibold text-sm`}>
                    {displayName}
                  </span>
                  <Badge className="bg-fpYellow text-black text-xs px-1 py-0.5 rounded-full font-semibold">
                    {getRoleBadge(role)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {username}
                  </span>
                  <div className="flex items-center space-x-1 bg-fpYellow text-black px-1 py-0.5 rounded-full">
                    <span className="text-xs font-bold">💰</span>
                    <span className="text-xs font-bold">
                      {fptBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
