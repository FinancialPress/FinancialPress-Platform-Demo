
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
    // Navigate to feed page after content creation
    navigate('/feed');
  };

  const handleNavigate = (screen: number) => {
    if (screen === 3) {
      // Navigate to feed
      navigate('/feed');
    } else if (onNavigate) {
      onNavigate(screen);
    }
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
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-16">
        <ContentCreator onNavigate={handleNavigate} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default ContentCreatorPage;
