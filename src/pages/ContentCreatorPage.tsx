
import React from 'react';
import { X } from 'lucide-react';
import ContentCreator from '../components/ContentCreator';

interface ContentCreatorPageProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const ContentCreatorPage = ({ onNavigate, isDarkMode = true }: ContentCreatorPageProps) => {
  const handleClose = () => {
    // Navigate back to user feed (screen 3)
    onNavigate?.(3);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Close button - top right */}
      <button
        className="absolute top-6 right-8 z-20 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
        title="Close and return to feed"
        onClick={handleClose}
        aria-label="Close"
      >
        <X className="w-6 h-6 text-gray-300" />
      </button>

      {/* Content Creator Component */}
      <ContentCreator onNavigate={onNavigate} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ContentCreatorPage;
