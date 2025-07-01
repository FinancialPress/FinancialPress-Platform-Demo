
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

interface CreatePostPromptProps {
  isDarkMode: boolean;
  onNavigate?: (screen: number) => void;
}

const CreatePostPrompt = ({ isDarkMode, onNavigate }: CreatePostPromptProps) => {
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';

  const handleCreateClick = () => {
    onNavigate?.(5); // Navigate to create screen
  };

  return (
    <Card className={`${cardClasses} mb-6`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-fpYellow rounded-full flex items-center justify-center">
            <span className="text-black font-bold">J</span>
          </div>
          <Button
            variant="ghost"
            className={`flex-1 justify-start text-left ${isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'} h-12 rounded-full`}
            onClick={handleCreateClick}
          >
            What's on your mind? Share your insights...
          </Button>
          <Button
            size="sm"
            className="bg-fpYellow hover:bg-fpYellowDark text-black"
            onClick={handleCreateClick}
          >
            <PenSquare className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostPrompt;
