import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, CheckCircle, ArrowLeft, Facebook } from 'lucide-react';

interface SocialChannelConnectionProps {
  onContinue: () => void;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  connected: boolean;
}

const SocialChannelConnection = ({ onContinue }: SocialChannelConnectionProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [connectionStep, setConnectionStep] = useState<'select' | 'connect' | 'authorize'>('select');
  const [platforms, setPlatforms] = useState<Platform[]>([
    { 
      id: 'twitter', 
      name: 'X (Twitter)', 
      icon: '𝕏', 
      color: 'bg-black',
      description: 'Share tweets and engage with your audience',
      connected: false 
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: '📘', 
      color: 'bg-blue-600',
      description: 'Post updates and share with your network',
      connected: false 
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: '📺', 
      color: 'bg-red-600',
      description: 'Upload videos and grow your channel',
      connected: false 
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: '💼', 
      color: 'bg-blue-700',
      description: 'Connect with professionals and share insights',
      connected: false 
    },
    { 
      id: 'telegram', 
      name: 'Telegram', 
      icon: '✈️', 
      color: 'bg-blue-500',
      description: 'Send messages to channels and groups',
      connected: false 
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: '📷', 
      color: 'bg-pink-600',
      description: 'Share photos and stories with followers',
      connected: false 
    }
  ]);

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setConnectionStep('connect');
  };

  const handleConnect = () => {
    setConnectionStep('authorize');
    // Simulate connection process
    setTimeout(() => {
      if (selectedPlatform) {
        setPlatforms(prev => prev.map(p => 
          p.id === selectedPlatform.id ? { ...p, connected: true } : p
        ));
        setConnectionStep('select');
        setSelectedPlatform(null);
      }
    }, 2000);
  };

  const handleBack = () => {
    if (connectionStep === 'authorize') {
      setConnectionStep('connect');
    } else if (connectionStep === 'connect') {
      setConnectionStep('select');
      setSelectedPlatform(null);
    }
  };

  const connectedCount = platforms.filter(p => p.connected).length;

  if (connectionStep === 'connect' && selectedPlatform) {
    return (
      <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${selectedPlatform.color} rounded-lg flex items-center justify-center`}>
                <span className="text-2xl">{selectedPlatform.icon}</span>
              </div>
              <div>
                <CardTitle className="text-2xl text-white">{selectedPlatform.name} Integration</CardTitle>
                <p className="text-gray-300">{selectedPlatform.description}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">What you'll get:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Automatic content posting to {selectedPlatform.name}</li>
              <li>• Real-time engagement tracking</li>
              <li>• Performance analytics and insights</li>
              <li>• Streamlined content management</li>
            </ul>
          </div>

          <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
            <p className="text-blue-200 text-sm">
              <strong>Note:</strong> When connecting your {selectedPlatform.name} account, FinancialPress requests specific access to enable functionality that you control. We only access data necessary for the features you enable.
            </p>
          </div>

          <div className="text-center">
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
              onClick={handleConnect}
            >
              Connect {selectedPlatform.name}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (connectionStep === 'authorize' && selectedPlatform) {
    return (
      <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className={`w-20 h-20 ${selectedPlatform.color} rounded-full mx-auto mb-6 flex items-center justify-center`}>
            <span className="text-3xl">{selectedPlatform.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Connecting to {selectedPlatform.name}...</h2>
          <p className="text-gray-300 mb-6">
            Please complete the authorization process in the popup window.
          </p>
          <div className="animate-pulse">
            <div className="w-64 h-2 bg-yellow-500 rounded-full mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-white">Connect Your Platforms</CardTitle>
        <p className="text-center text-gray-300">
          Connect your social media accounts to start sharing content and earning FPT tokens
        </p>
        <div className="text-center">
          {connectedCount > 0 && (
            <Badge className="bg-green-600 text-white">
              {connectedCount} platform{connectedCount !== 1 ? 's' : ''} connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <Card 
              key={platform.id} 
              className={`bg-gray-800 border-gray-700 cursor-pointer transition-all hover:bg-gray-750 ${
                platform.connected ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => !platform.connected && handlePlatformSelect(platform)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-2xl">{platform.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-semibold">{platform.name}</h3>
                      {platform.connected && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                    <p className="text-gray-400 text-sm">{platform.description}</p>
                  </div>
                  {!platform.connected && <ChevronRight className="w-5 h-5 text-gray-400" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Why connect platforms?</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Seamless content distribution across multiple channels</li>
            <li>• Unified analytics and performance tracking</li>
            <li>• Automated posting and scheduling capabilities</li>
            <li>• Maximize your earning potential with wider reach</li>
          </ul>
        </div>

        <div className="text-center space-y-4">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
            onClick={onContinue}
          >
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white px-8 py-2"
            onClick={onContinue}
          >
            Do this later
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            You can connect more platforms later from your settings
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialChannelConnection;
