
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Search, 
  TrendingUp, 
  Bell, 
  MessageCircle, 
  Bookmark, 
  Users, 
  BarChart3, 
  Wallet, 
  Settings,
  User,
  Star,
  Globe
} from 'lucide-react';

interface FeedSidebarProps {
  isDarkMode?: boolean;
  onNavigate?: (screen: number) => void;
}

const FeedSidebar = ({ isDarkMode = true, onNavigate }: FeedSidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Home', onClick: () => onNavigate?.(0), hasNotification: false },
    { icon: Search, label: 'Search', onClick: () => {}, hasNotification: false },
    { icon: TrendingUp, label: 'Trending', onClick: () => {}, hasNotification: false },
    { icon: Bell, label: 'Notifications', onClick: () => {}, hasNotification: true, count: 3 },
    { icon: MessageCircle, label: 'Messages', onClick: () => {}, hasNotification: true, count: 5 },
    { icon: Bookmark, label: 'Saved', onClick: () => {}, hasNotification: false },
    { icon: Users, label: 'Following', onClick: () => {}, hasNotification: false },
    { icon: BarChart3, label: 'Analytics', onClick: () => onNavigate?.(4), hasNotification: false },
    { icon: Wallet, label: 'Earnings', onClick: () => {}, hasNotification: false },
  ];

  const shortcuts = [
    { icon: Star, label: 'Top Creators', onClick: () => {} },
    { icon: Globe, label: 'Communities', onClick: () => {} },
    { icon: TrendingUp, label: 'Market Watch', onClick: () => {} },
  ];

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const textClasses = isDarkMode 
    ? "text-white"
    : "text-black";

  const secondaryTextClasses = isDarkMode 
    ? "text-gray-400"
    : "text-gray-600";

  const hoverClasses = isDarkMode 
    ? "hover:bg-gray-800"
    : "hover:bg-gray-50";

  return (
    <div className="w-64 space-y-6 sticky top-8">
      {/* Main Navigation */}
      <Card className={cardClasses}>
        <CardContent className="p-4">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-800">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className={`${textClasses} font-semibold`}>John Doe</div>
              <div className={`${secondaryTextClasses} text-sm`}>@johndoe</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${hoverClasses} group`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${secondaryTextClasses} group-hover:text-yellow-500`} />
                  <span className={`${textClasses} font-medium`}>{item.label}</span>
                </div>
                {item.hasNotification && item.count && (
                  <Badge className="bg-red-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {item.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          {/* Settings */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <button className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${hoverClasses} group`}>
              <Settings className={`w-5 h-5 ${secondaryTextClasses} group-hover:text-yellow-500`} />
              <span className={`${textClasses} font-medium`}>Settings</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Shortcuts */}
      <Card className={cardClasses}>
        <CardContent className="p-4">
          <h3 className={`${textClasses} font-semibold mb-4`}>Quick Access</h3>
          <div className="space-y-1">
            {shortcuts.map((shortcut, index) => (
              <button
                key={index}
                onClick={shortcut.onClick}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${hoverClasses} group`}
              >
                <shortcut.icon className={`w-4 h-4 ${secondaryTextClasses} group-hover:text-yellow-500`} />
                <span className={`${secondaryTextClasses} text-sm group-hover:${textClasses}`}>{shortcut.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Content CTA */}
      <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0">
        <CardContent className="p-4 text-center">
          <h4 className="text-black font-bold mb-2">Start Creating</h4>
          <p className="text-black/80 text-sm mb-3">Share your insights and earn FPT tokens</p>
          <button 
            onClick={() => onNavigate?.(5)}
            className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Create Content
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedSidebar;
