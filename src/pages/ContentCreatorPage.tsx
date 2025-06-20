
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import ContentCreator from '../components/ContentCreator';

interface ContentCreatorPageProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const ContentCreatorPage = ({ onNavigate, isDarkMode = true }: ContentCreatorPageProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate back to home page which shows the user feed
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Close button - fixed positioning with higher z-index */}
      <button
        className="fixed top-6 right-8 z-50 bg-gray-800 rounded-full p-3 hover:bg-gray-700 transition-colors shadow-lg"
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
