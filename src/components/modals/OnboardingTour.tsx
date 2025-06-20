
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
          content: "This is your creative hub. Start your own posts, share from your other platforms, or even go live. However you want to share — it starts here.",
          selector: "[data-tour='start-creating']"
        };
      case 2:
        return {
          title: "Step 2 - Your Feed",
          content: "Your feed is full of opportunities. Share anything from here to your social channels and earn FPT tokens when people engage with your content.",
          selector: "[data-tour='feed-content']"
        };
      case 3:
        return {
          title: "Step 3 - Live Earnings",
          content: "Keep tabs on your earnings here — everything you make, live and in real time. And to get you started, we've already added 1.0 FPT to your wallet for being one of our earliest adopters 💸.",
          selector: "[data-tour='earnings-tracker']"
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
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
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
      
      {/* Highlight Effect for Current Step */}
      <style jsx>{`
        ${stepContent.selector} {
          position: relative;
          z-index: 45;
          box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.5);
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

export default OnboardingTour;
