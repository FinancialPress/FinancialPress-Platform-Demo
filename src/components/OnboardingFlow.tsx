
import React, { useState } from 'react';
import { Check, PenTool, Share2 } from 'lucide-react';
import TopicSelection from './onboarding/TopicSelection';
import CreatorSelection from './onboarding/CreatorSelection';
import CreatorProfileSetup from './onboarding/CreatorProfileSetup';
import DistributorProfileSetup from './onboarding/DistributorProfileSetup';
import OnboardingWelcome from './onboarding/OnboardingWelcome';

interface OnboardingFlowProps {
  userRole?: 'creator' | 'distributor';
  onComplete?: () => void;
}

const OnboardingFlow = ({ userRole = 'creator', onComplete }: OnboardingFlowProps) => {
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
    switch(currentStep) {
      case 1:
        return (
          <TopicSelection
            userRole={userRole}
            selectedTopics={selectedTopics}
            onTopicToggle={toggleTopic}
            onContinue={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <CreatorSelection
            userRole={userRole}
            selectedCreators={selectedCreators}
            onCreatorToggle={toggleCreator}
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
          <TopicSelection
            userRole={userRole}
            selectedTopics={selectedTopics}
            onTopicToggle={toggleTopic}
            onContinue={() => setCurrentStep(2)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        {/* Role Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${userRole === 'creator' ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-blue-500/20 border border-blue-500'} mb-4`}>
            {userRole === 'creator' ? (
              <PenTool className="w-5 h-5 text-yellow-500 mr-2" />
            ) : (
              <Share2 className="w-5 h-5 text-blue-500 mr-2" />
            )}
            <span className={`font-semibold ${userRole === 'creator' ? 'text-yellow-500' : 'text-blue-500'}`}>
              {userRole === 'creator' ? 'Content Creator' : 'Content Distributor'} Onboarding
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? `${userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'} text-black` 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step 
                      ? userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'
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
