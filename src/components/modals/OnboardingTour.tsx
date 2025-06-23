
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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

  const tourSteps = [
    {
      id: 1,
      targetSelector: '[data-tour="start-creating"]',
      title: "Step 1 - Start Creating",
      content: "Start by clicking 'Create Content' to share your first post and earn FPT tokens. This is your creative hub where everything begins.",
    },
    {
      id: 2,
      targetSelector: '[data-tour="earnings-tracker"]',
      title: "Step 2 - Your Earnings",
      content: "Here's where your real-time earnings show up. Watch your tokens grow as people engage with your content.",
    },
    {
      id: 3,
      targetSelector: '[data-tour="feed-content"]',
      title: "Step 3 - Your Feed",
      content: "This is your feed. Discover, engage, and tip the best content. And to get you started, we've already added 1.0 FPT to your wallet for being one of our earliest adopters.",
    },
  ];

  useEffect(() => {
    if (isActive) {
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
      // Scroll to top when tour starts
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Add tour class to body
      document.body.classList.add('onboarding-active');
    } else {
      // Restore scroll
      document.body.style.overflow = '';
      document.body.classList.remove('onboarding-active');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('onboarding-active');
    };
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

  useEffect(() => {
    if (isActive && currentStep <= tourSteps.length) {
      const currentStepData = tourSteps[currentStep - 1];
      const targetElement = document.querySelector(currentStepData.targetSelector);
      
      if (targetElement) {
        // Scroll target into view
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
      }
    }
  }, [currentStep, isActive]);

  if (!isActive) return null;

  const handleNext = () => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = tourSteps[currentStep - 1];
  if (!currentStepData) return null;

  return (
    <>
      {/* Full Screen Overlay with Cut-out Effect */}
      <div className="fixed inset-0 z-[9998]">
        {/* Dark overlay background */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>
      
      {/* Tour Modal - Centered on Screen */}
      <Dialog open={isActive} onOpenChange={() => {}}>
        <DialogContent 
          className={`
            ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} 
            max-w-md mx-auto shadow-2xl border-2 z-[9999]
          `}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto'
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {currentStepData.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {currentStepData.content}
            </p>
            
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onSkip}
                className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
              >
                Skip Tour
              </Button>
              
              <div className="flex items-center space-x-4">
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {currentStep} of {tourSteps.length}
                </span>
                <Button 
                  size="sm"
                  onClick={handleNext}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  {currentStep === tourSteps.length ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Highlight Effect for Target Elements */}
      <style>
        {`
          .onboarding-active ${currentStepData.targetSelector} {
            position: relative;
            z-index: 9997;
            filter: none !important;
            backdrop-filter: none !important;
            box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.6), 0 0 20px rgba(234, 179, 8, 0.3);
            border-radius: 8px;
          }
          
          .onboarding-active * {
            filter: blur(1px);
            opacity: 0.6;
          }
          
          .onboarding-active ${currentStepData.targetSelector},
          .onboarding-active ${currentStepData.targetSelector} * {
            filter: none !important;
            opacity: 1 !important;
          }
          
          /* Ensure dialog content is not affected */
          .onboarding-active [role="dialog"],
          .onboarding-active [role="dialog"] * {
            filter: none !important;
            opacity: 1 !important;
          }
        `}
      </style>
    </>
  );
};

export default OnboardingTour;
