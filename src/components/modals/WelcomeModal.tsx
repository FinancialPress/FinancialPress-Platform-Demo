
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WelcomeModalProps {
  isOpen: boolean;
  onStartTour: () => void;
  isDarkMode?: boolean;
}

const WelcomeModal = ({ isOpen, onStartTour, isDarkMode = true }: WelcomeModalProps) => {
  const modalClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800 text-white"
    : "bg-white border-gray-200 text-black";

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className={`${modalClasses} max-w-md mx-auto text-center`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            🎉 Welcome to FinancialPress!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            You're officially part of something new and exciting. As an early adopter, you've got exclusive access to a brand-new way to share your voice and earn as you grow.
          </p>
          
          <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            You've already unlocked your very first badge!
          </p>
          
          <div className="flex justify-center">
            <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">
              🏅 Creator Newcomer
            </Badge>
          </div>
          
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            You're now ready to start creating content and earning FPT tokens.
          </p>
          
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 w-full"
            onClick={onStartTour}
          >
            Start Sharing and Earning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
