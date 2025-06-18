
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Share2, Check, DollarSign, Users } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <Card className="bg-gray-900 border-gray-800 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Title Section - Made more prominent */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">Share & Earn</h1>
              <p className="text-black/80 text-sm mt-1">Distribute content and earn FPT tokens</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-black hover:text-black/80">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <CardContent className="space-y-4 p-4">
          {/* Creator Profile Section - More compact */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {post.creator.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-white font-semibold truncate">{post.creator}</h3>
                  <Badge className="bg-yellow-500 text-black text-xs">Gold</Badge>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1 text-gray-300">
                    <Users className="w-3 h-3" />
                    <span>24.5K</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-400">
                    <DollarSign className="w-3 h-3" />
                    <span>2,340 FPT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Post Preview */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <h3 className="text-white font-semibold mb-1 text-sm">{post.title}</h3>
            <Badge className="bg-green-500 text-black text-xs">
              <DollarSign className="w-3 h-3 mr-1" />
              Est. {post.estimatedEarnings} per platform
            </Badge>
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-gray-300 mb-1 font-medium text-sm">Customize your message</label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white min-h-[80px] text-sm"
              placeholder="Write your share message..."
            />
            <div className="text-right text-gray-400 text-xs mt-1">
              {customMessage.length}/280 characters
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-gray-300 font-medium text-sm">Select platforms to share</label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={distributeToAll}
                  onCheckedChange={handleDistributeAll}
                  className="border-gray-600"
                />
                <span className="text-gray-300 text-xs">Distribute to all</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center space-x-3 p-2 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <div className={`w-6 h-6 rounded ${platform.color} flex items-center justify-center text-white text-xs`}>
                    {platform.icon}
                  </div>
                  <span className="text-white font-medium text-sm">{platform.name}</span>
                  {selectedPlatforms.includes(platform.id) && (
                    <Check className="w-4 h-4 text-yellow-500 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Preview */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-400 font-semibold text-sm">Total Estimated Earnings</div>
                <div className="text-gray-300 text-xs">
                  {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
                </div>
              </div>
              <div className="text-xl font-bold text-green-400">
                {calculateTotalEarnings()} FPT
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
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
