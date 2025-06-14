
import React, { useState } from 'react';
import { Check, PenTool, Share2, X } from 'lucide-react';
import SocialChannelConnection from './onboarding/SocialChannelConnection';
import TopicSelection from './onboarding/TopicSelection';
import CreatorSelection from './onboarding/CreatorSelection';
import CreatorProfileSetup from './onboarding/CreatorProfileSetup';
import DistributorProfileSetup from './onboarding/DistributorProfileSetup';
import OnboardingWelcome from './onboarding/OnboardingWelcome';

interface OnboardingFlowProps {
  userRole?: 'creator' | 'distributor';
  onComplete?: () => void;
  onLandingPage?: () => void; // Add prop to navigate home
}

const OnboardingFlow = ({ userRole = 'creator', onComplete, onLandingPage }: OnboardingFlowProps) => {
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
    // Navigate to user feed (screen 3 in the main app)
    onComplete?.();
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
          <CreatorProfileSetup onContinue={() => setCurrentStep(4)} />
        ) : (
          <DistributorProfileSetup onContinue={() => setCurrentStep(4)} />
        );
      case 4:
        return (
          <OnboardingWelcome
            userRole={userRole}
            onComplete={handleComplete}
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

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* X icon (Close Onboarding, go to landing page) */}
      <button
        className="absolute top-6 right-8 z-20 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
        title="Return to landing page"
        onClick={onLandingPage}
        aria-label="Close"
      >
        <X className="w-6 h-6 text-gray-300" />
      </button>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step 
                      ? 'bg-yellow-500'
                      : 'bg-gray-700'
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

