
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Share2, Check, DollarSign } from 'lucide-react';

interface ShareEarnFlowProps {
  post: {
    title: string;
    creator: string;
    estimatedEarnings: string;
  };
  onClose: () => void;
  onShare: () => void;
}

const ShareEarnFlow: React.FC<ShareEarnFlowProps> = ({ post, onClose, onShare }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState(
    `🚀 Just discovered this insightful analysis: "${post.title}" by @${post.creator}. Worth a read! #Crypto #Finance`
  );
  const [distributeToAll, setDistributeToAll] = useState(false);

  const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏', color: 'bg-gray-800' },
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'bg-blue-600' },
    { id: 'reddit', name: 'Reddit', icon: '🤖', color: 'bg-orange-600' },
    { id: 'discord', name: 'Discord', icon: '💬', color: 'bg-indigo-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleDistributeAll = () => {
    if (distributeToAll) {
      setSelectedPlatforms([]);
      setDistributeToAll(false);
    } else {
      setSelectedPlatforms(platforms.map(p => p.id));
      setDistributeToAll(true);
    }
  };

  const calculateTotalEarnings = () => {
    const baseEarnings = parseFloat(post.estimatedEarnings.replace(' FPT', ''));
    const multiplier = selectedPlatforms.length || 1;
    return (baseEarnings * multiplier).toFixed(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-gray-900 border-gray-800 w-full max-w-2xl mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-white">Share & Earn</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Post Preview */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">{post.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">by {post.creator}</span>
              <Badge className="bg-green-500 text-black">
                <DollarSign className="w-3 h-3 mr-1" />
                Est. {post.estimatedEarnings} per platform
              </Badge>
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Customize your message</label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              placeholder="Write your share message..."
            />
            <div className="text-right text-gray-400 text-sm mt-1">
              {customMessage.length}/280 characters
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-300 font-medium">Select platforms to share</label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={distributeToAll}
                  onCheckedChange={handleDistributeAll}
                  className="border-gray-600"
                />
                <span className="text-gray-300 text-sm">Distribute to all</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <div className={`w-8 h-8 rounded ${platform.color} flex items-center justify-center text-white text-sm`}>
                    {platform.icon}
                  </div>
                  <span className="text-white font-medium">{platform.name}</span>
                  {selectedPlatforms.includes(platform.id) && (
                    <Check className="w-5 h-5 text-yellow-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Preview */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-400 font-semibold">Total Estimated Earnings</div>
                <div className="text-gray-300 text-sm">
                  {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
                </div>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {calculateTotalEarnings()} FPT
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-gray-600 text-gray-300">
              Cancel
            </Button>
            <Button 
              onClick={onShare}
              disabled={selectedPlatforms.length === 0}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Distribute Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareEarnFlow;
