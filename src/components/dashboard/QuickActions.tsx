
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Share2, Settings } from 'lucide-react';

interface QuickActionsProps {
  isDarkMode: boolean;
  onNavigate?: (screen: number) => void;
}

const QuickActions = ({ isDarkMode, onNavigate }: QuickActionsProps) => {
  // Theme-aware classes
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 text-white' 
    : 'bg-white border-gray-200 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const actions = [
    { label: 'Create Content', icon: Plus, action: () => onNavigate?.(2) },
    { label: 'Upload Media', icon: Upload, action: () => console.log('Upload media') },
    { label: 'Share Content', icon: Share2, action: () => onNavigate?.(3) },
    { label: 'Settings', icon: Settings, action: () => console.log('Settings') }
  ];

  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle className={textClasses}>Quick Actions</CardTitle>
        <p className={mutedText}>Common tasks</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start"
            onClick={action.action}
          >
            <action.icon className="mr-2 h-4 w-4" />
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
