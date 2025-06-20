import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import SocialChannelConnection from './onboarding/SocialChannelConnection';
import TopicSelection from './onboarding/TopicSelection';
import CreatorSelection from './onboarding/CreatorSelection';
import CreatorProfileSetup from './onboarding/CreatorProfileSetup';
import DistributorProfileSetup from './onboarding/DistributorProfileSetup';
import OnboardingWelcome from './onboarding/OnboardingWelcome';

interface OnboardingFlowProps {
  userRole?: 'creator' | 'distributor';
  onComplete?: () => void;
  onLandingPage?: () => void;
  isDarkMode?: boolean;
}

const OnboardingFlow = ({
  userRole = 'creator',
  onComplete,
  onLandingPage,
  isDarkMode = true
}: OnboardingFlowProps) => {
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
    onComplete?.();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SocialChannelConnection onContinue={() => setCurrentStep(2)} isDarkMode={isDarkMode} />;
      case 2:
        return (
          <TopicSelection
            userRole={userRole}
            selectedTopics={selectedTopics}
            onTopicToggle={toggleTopic}
            onContinue={() => setCurrentStep(3)}
            isDarkMode={isDarkMode}
          />
        );
      case 3:
        return userRole === 'creator'
          ? <CreatorProfileSetup onContinue={() => setCurrentStep(4)} isDarkMode={isDarkMode} />
          : <DistributorProfileSetup onContinue={() => setCurrentStep(4)} isDarkMode={isDarkMode} />;
      case 4:
        return <OnboardingWelcome userRole={userRole} onComplete={handleComplete} isDarkMode={isDarkMode} />;
      default:
        return <SocialChannelConnection onContinue={() => setCurrentStep(2)} isDarkMode={isDarkMode} />;
    }
  };

  const bgColor = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';
  const buttonStyle = isDarkMode
    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
    : 'bg-gray-200 hover:bg-gray-300 text-gray-600';
  const stepDone = isDarkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-400 text-black';
  const stepPending = isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600';
  const barInactive = isDarkMode ? 'bg-gray-700' : 'bg-gray-300';
  const barActive = isDarkMode ? 'bg-yellow-500' : 'bg-yellow-400';

  return (
    <div className={`min-h-screen ${bgColor} relative`}>
      {/* Close Button */}
      <button
        className={`absolute top-6 right-8 z-20 rounded-full p-2 transition-colors ${buttonStyle}`}
        title="Return to landing page"
        onClick={onLandingPage}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Progress & Step Content */}
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step ? stepDone : stepPending
                }`}>
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? barActive : barInactive
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
