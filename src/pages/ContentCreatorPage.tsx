
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ContentCreator from '../components/ContentCreator';

interface ContentCreatorPageProps {
  onNavigate?: (screen: number) => void;
}

const ContentCreatorPage = ({ onNavigate }: ContentCreatorPageProps) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleClose = () => {
    // Navigate back to home page which shows the user feed
    navigate('/');
  };

  const bgClasses = isDarkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-gray-50 text-black";
  const buttonClasses = isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300";
  const iconClasses = isDarkMode ? "text-gray-300" : "text-gray-700";

  return (
    <div className={`${bgClasses} relative`}>
      {/* Close button - fixed positioning with higher z-index */}
      <button
        className={`fixed top-6 right-8 z-50 ${buttonClasses} rounded-full p-3 transition-colors shadow-lg`}
        title="Close and return to feed"
        onClick={handleClose}
        aria-label="Close"
      >
        <X className={`w-6 h-6 ${iconClasses}`} />
      </button>

      {/* Content Creator Component */}
      <ContentCreator onNavigate={onNavigate} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ContentCreatorPage;
