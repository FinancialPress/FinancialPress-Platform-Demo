
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ChevronRight } from 'lucide-react';

interface SocialChannelConnectionProps {
  onContinue: () => void;
}

const SocialChannelConnection = ({ onContinue }: SocialChannelConnectionProps) => {
  const [channels, setChannels] = useState({
    twitter: false,
    youtube: false,
    linkedin: false,
    telegram: false,
    reddit: false,
    instagram: false,
    tiktok: false
  });

  const toggleChannel = (channel: string) => {
    setChannels(prev => ({
      ...prev,
      [channel]: !prev[channel as keyof typeof prev]
    }));
  };

  const socialChannels = [
    { id: 'twitter', name: 'X (Formerly Twitter)', icon: '𝕏' },
    { id: 'youtube', name: 'YouTube', icon: '📺' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'telegram', name: 'Telegram', icon: '✈️' },
    { id: 'reddit', name: 'Reddit', icon: '🤖' },
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-white">Connect Your Social Channels</CardTitle>
        <p className="text-center text-gray-300">
          Connect the social platforms you want to share your content on
        </p>
        <div className="text-center text-sm text-gray-400">
          Step 2 of 4
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Social Channels</h3>
          <p className="text-sm text-gray-400">
            Select the channels you want to enable for content sharing and monetization.
          </p>
          
          <div className="space-y-3">
            {socialChannels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{channel.icon}</span>
                  <span className="text-white font-medium">{channel.name}</span>
                </div>
                <Switch
                  checked={channels[channel.id as keyof typeof channels]}
                  onCheckedChange={() => toggleChannel(channel.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Benefits of connected channels</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Seamless content sharing</li>
            <li>• Track performance across platforms</li>
            <li>• Automated content optimization</li>
            <li>• Enhanced earnings potential</li>
          </ul>
        </div>

        <div className="text-center">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
            onClick={onContinue}
          >
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            You can always add more channels later
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialChannelConnection;
