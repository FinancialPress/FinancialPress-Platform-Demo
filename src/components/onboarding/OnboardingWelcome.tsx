
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

interface OnboardingWelcomeProps {
  userRole: 'creator' | 'distributor';
  onComplete: () => void;
}

const OnboardingWelcome = ({ userRole, onComplete }: OnboardingWelcomeProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto text-center">
      <CardContent className="p-12">
        <div className={`w-20 h-20 ${userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full mx-auto mb-6 flex items-center justify-center`}>
          <Award className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Welcome to FinancialPress!</h2>
        <p className="text-xl text-gray-300 mb-6">
          You've earned your first badge: <Badge className={`${userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
            {userRole === 'creator' ? 'Creator' : 'Distributor'} Newcomer
          </Badge>
        </p>
        <p className="text-gray-400 mb-8">
          You're now ready to start {userRole === 'creator' ? 'creating content and' : 'sharing content and'} earning FPT tokens!
        </p>
        <Button 
          className={`${userRole === 'creator' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-blue-500 hover:bg-blue-600 text-white'} font-bold px-8 py-3`}
          onClick={onComplete}
        >
          Enter FinancialPress
        </Button>
      </CardContent>
    </Card>
  );
};

export default OnboardingWelcome;
