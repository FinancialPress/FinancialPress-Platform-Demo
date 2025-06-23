
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, PenTool, Share2, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import SocialChannelConnection from './onboarding/SocialChannelConnection';
import TopicSelection from './onboarding/TopicSelection';
import CreatorSelection from './onboarding/CreatorSelection';
import CreatorProfileSetup from './onboarding/CreatorProfileSetup';
import DistributorProfileSetup from './onboarding/DistributorProfileSetup';

interface OnboardingFlowProps {
  userRole?: 'creator' | 'distributor';
  userType?: 'demo' | 'live' | null;
  onComplete?: () => void;
  onLandingPage?: () => void;
}

const OnboardingFlow = ({ userRole = 'creator', userType, onComplete, onLandingPage }: OnboardingFlowProps) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const toggleCreator = (creator: string) => {
    setSelectedCreators(prev => 
      prev.includes(creator) 
        ? prev.filter(c => c !== creator)
        : [...prev, creator]
    );
  };

  const handleComplete = () => {
    // Navigate to feed page with onboarding completion state
    navigate('/feed', { 
      state: { showOnboarding: true, fromOnboarding: true },
      replace: true 
    });
  };

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <SocialChannelConnection
            onContinue={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <TopicSelection
            userRole={userRole}
            selectedTopics={selectedTopics}
            onTopicToggle={toggleTopic}
            onContinue={() => setCurrentStep(3)}
          />
        );
      case 3:
        return userRole === 'creator' ? (
          <CreatorProfileSetup 
            onContinue={handleComplete} 
            userType={userType}
            selectedTopics={selectedTopics}
          />
        ) : (
          <DistributorProfileSetup 
            onContinue={handleComplete} 
            userType={userType}
            selectedTopics={selectedTopics}
          />
        );
      default:
        return (
          <SocialChannelConnection
            onContinue={() => setCurrentStep(2)}
          />
        );
    }
  };

  // Theme-aware styling
  const backgroundClass = isDarkMode ? 'bg-black' : 'bg-gray-50';
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const closeButtonClass = isDarkMode 
    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
    : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-300';

  return (
    <div className={`min-h-screen ${backgroundClass} ${textClass} relative`}>
      {/* X icon (Close Onboarding, go to landing page) */}
      <button
        className={`absolute top-6 right-8 z-20 rounded-full p-2 transition-colors ${closeButtonClass}`}
        title="Return to landing page"
        onClick={onLandingPage}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        {/* Progress Steps - Updated to show only 3 steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? 'bg-yellow-500 text-black' 
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step 
                      ? 'bg-yellow-500'
                      : isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
