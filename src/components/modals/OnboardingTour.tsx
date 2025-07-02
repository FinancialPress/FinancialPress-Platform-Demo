
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OnboardingTourProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
  isDarkMode?: boolean;
  onEarningsUpdate?: () => void;
}

const OnboardingTour = ({ isActive, onComplete, onSkip, isDarkMode = true, onEarningsUpdate }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showEarningsAnimation, setShowEarningsAnimation] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Scroll to top when tour starts
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isActive]);

  useEffect(() => {
    if (currentStep === 3 && isActive) {
      // Trigger earnings animation when step 3 begins
      setTimeout(() => {
        setShowEarningsAnimation(true);
        onEarningsUpdate?.();
      }, 500);
    }
  }, [currentStep, isActive, onEarningsUpdate]);

  if (!isActive) return null;

  const handleNext = () => {
    if (currentStep < 3) {
      // Scroll to top before moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Step 1 - Start Creating",
          content: "This is where you start creating content. Click here to share your thoughts, insights, or content from your other platforms.",
          selector: "[data-tour='whats-on-mind']"
        };
      case 2:
        return {
          title: "Step 2 - Your Feed",
          content: "Your feed is full of opportunities. Share anything from here to your social channels and earn FPT tokens when people engage with your content.",
          selector: "[data-tour='feed-content']"
        };
      case 3:
        return {
          title: "Step 3 - Your Earnings",
          content: "Keep tabs on your earnings in the header next to your profile. And to get you started, we've already added 1.0 FPT to your wallet for being one of our earliest adopters.",
          selector: ".flex.items-center.bg-fpYellow"
        };
      default:
        return null;
    }
  };

  const stepContent = getStepContent();
  if (!stepContent) return null;

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-700 text-white"
    : "bg-white border-gray-300 text-black";

  return (
    <>
      {/* Blur Overlay - everything except focused element */}
      <div className="fixed inset-0 z-40">
        <div className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-30" />
      </div>
      
      {/* Tour Card */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-4">
        <Card className={`${cardClasses} shadow-2xl`}>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-3">{stepContent.title}</h3>
            <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {stepContent.content}
            </p>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onSkip}
                className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
              >
                Skip Tour
              </Button>
              
              <div className="flex space-x-2">
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentStep} of 3
                </span>
                <Button 
                  size="sm"
                  onClick={handleNext}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  {currentStep === 3 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Focused Element Highlight - Remove blur from target */}
      <style>
        {`
          ${stepContent.selector} {
            position: relative;
            z-index: 45;
            filter: none !important;
            backdrop-filter: none !important;
          }
          
          body:has(.onboarding-active) * {
            filter: blur(2px);
          }
          
          body:has(.onboarding-active) ${stepContent.selector},
          body:has(.onboarding-active) ${stepContent.selector} * {
            filter: none !important;
          }
        `}
      </style>
    </>
  );
};

export default OnboardingTour;
