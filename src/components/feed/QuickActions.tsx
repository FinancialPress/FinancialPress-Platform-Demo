
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '../../contexts/ThemeContext';

interface QuickActionsProps {
  isDarkMode?: boolean;
  onNavigate?: (screen: number) => void;
}

const QuickActions = ({ isDarkMode: propIsDarkMode, onNavigate }: QuickActionsProps) => {
  const navigate = useNavigate();
  const themeContext = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : themeContext.isDarkMode;

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const titleClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const outlineButtonClasses = isDarkMode
    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100 font-semibold px-6";

  const handleCreateContent = () => {
    navigate('/create');
  };

  const handleViewDashboard = () => {
    onNavigate?.(4); // Navigate to Dashboard screen
  };

  return (
    <Card className={cardClasses}>
      <CardContent className="p-4">
        <h3 className={`text-lg font-semibold ${titleClasses} mb-3`}>Quick Actions</h3>
        <div className="space-y-2">
          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm"
            onClick={handleCreateContent}
          >
            Create Content
          </Button>
          <Button
            variant="outline"
            className={`w-full text-sm ${outlineButtonClasses}`}
            onClick={() => onNavigate?.(2)} // Onboarding
          >
            Manage Profile
          </Button>
          <Button
            variant="outline"
            className={`w-full text-sm ${outlineButtonClasses}`}
            onClick={handleViewDashboard}
          >
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
