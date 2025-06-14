
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  isDarkMode?: boolean;
}

const QuickActions = ({ isDarkMode = true }: QuickActionsProps) => {
  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const titleClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const outlineButtonClasses = isDarkMode
    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 font-semibold px-6";

  return (
    <Card className={cardClasses}>
      <CardContent className="p-4">
        <h3 className={`text-lg font-semibold ${titleClasses} mb-3`}>Quick Actions</h3>
        <div className="space-y-2">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm">
            Create Content
          </Button>
          <Button variant="outline" className={`w-full text-sm ${outlineButtonClasses}`}>
            Manage Interests
          </Button>
          <Button variant="outline" className={`w-full text-sm ${outlineButtonClasses}`}>
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
