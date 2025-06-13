
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface SocialChannelConnectionProps {
  onContinue: () => void;
}

const SocialChannelConnection = ({ onContinue }: SocialChannelConnectionProps) => {
  const platforms = [
    { name: 'X (Twitter)', icon: '𝕏', connected: false },
    { name: 'YouTube', icon: '📺', connected: false },
    { name: 'LinkedIn', icon: '💼', connected: false },
    { name: 'Instagram', icon: '📷', connected: false },
    { name: 'TikTok', icon: '🎵', connected: false },
    { name: 'Telegram', icon: '✈️', connected: false },
    { name: 'Discord', icon: '🎮', connected: false },
    { name: 'Reddit', icon: '🤖', connected: false }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-white">Connect Your Platforms</CardTitle>
        <p className="text-center text-gray-300 text-lg">
          Link your social media accounts to share content and earn FPT tokens
        </p>
        <div className="text-center text-sm text-gray-400">
          Step 1 of 3
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500"
            >
              <span className="text-2xl mb-2">{platform.icon}</span>
              <span className="text-sm">{platform.name}</span>
            </Button>
          ))}
        </div>
        <div className="text-center space-y-4">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
            onClick={onContinue}
          >
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <div>
            <Button 
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-2"
              onClick={onContinue}
            >
              Do this later
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialChannelConnection;
