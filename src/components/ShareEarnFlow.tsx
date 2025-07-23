
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Share2, Check, DollarSign, Users } from 'lucide-react';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { useUserMode } from '@/hooks/useUserMode';
import { toast } from 'sonner';

interface ShareEarnFlowProps {
  post: {
    title: string;
    creator: string;
    estimatedEarnings: string;
  };
  onClose: () => void;
  onShare: () => void;
  isDarkMode?: boolean;
}

const ShareEarnFlow: React.FC<ShareEarnFlowProps> = ({ post, onClose, onShare, isDarkMode = true }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState(
    `🚀 Just discovered this insightful analysis: "${post.title}" by @${post.creator}. Worth a read! #Crypto #Finance`
  );
  const [distributeToAll, setDistributeToAll] = useState(false);
  const { addTokens, loading } = useFPTTokens();
  const { isLiveUser } = useUserMode();

  const platforms = [
    { id: 'twitter', name: 'X/Twitter', icon: '𝕏', color: 'bg-gray-800' },
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'bg-blue-600' },
    { id: 'reddit', name: 'Reddit', icon: '🤖', color: 'bg-orange-600' },
    { id: 'discord', name: 'Discord', icon: '💬', color: 'bg-indigo-600' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    { id: 'financialpress', name: 'FinancialPress', icon: '📰', color: 'bg-fpYellow' },
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

  const handleShareAndEarn = async () => {
    console.log('handleShareAndEarn called', { isLiveUser, selectedPlatforms, loading });
    
    if (loading) {
      console.log('Already processing, skipping...');
      return;
    }
    
    if (!isLiveUser) {
      toast.error('Please sign up to earn FPT for sharing content!');
      onShare();
      onClose();
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform to share on');
      return;
    }

    const earningsAmount = parseFloat(calculateTotalEarnings());
    
    if (earningsAmount <= 0) {
      toast.error('Invalid earnings amount');
      return;
    }

    console.log('Attempting to add tokens:', earningsAmount);
    
    try {
      // Generate a valid post ID for tracking
      const postId = crypto.randomUUID();
      
      // Add tokens to user's account
      const success = await addTokens(
        earningsAmount,
        'earn_share',
        `Shared "${post.title}" on ${selectedPlatforms.length} platform${selectedPlatforms.length !== 1 ? 's' : ''}`,
        {
          post_title: post.title,
          creator: post.creator,
          platforms: selectedPlatforms,
          message: customMessage,
          post_id: postId
        }
      );

      console.log('Add tokens result:', success);

      if (success) {
        // Call the original share handler
        onShare();
        // Close the modal
        onClose();
      }
    } catch (error) {
      console.error('Share and earn error:', error);
      toast.error('Failed to process share earnings');
    }
  };

  return (
    <div className={`fixed inset-0 ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-gray-900 bg-opacity-50'} flex items-center justify-center z-[60] p-4`}>
      <div className="modal-centered w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <Card className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} w-full`}>
          {/* Title Section */}
          <div className={`${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'} p-4`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Share and Earn</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <CardContent className="space-y-4 p-4">
            {/* Post Title */}
            <div className="bg-gradient-to-r from-fpYellow/10 to-orange-500/10 border border-fpYellow/20 rounded-lg p-4">
              <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold text-xl leading-tight mb-3`}>{post.title}</h3>
              
              {/* Creator Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {post.creator.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <h4 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium text-sm`}>{post.creator}</h4>
                  <Badge className="bg-fpYellow text-black text-xs">Gold</Badge>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>24.5K followers</span>
                  <span className="text-xs text-green-400">240 RP</span>
                </div>
              </div>
            </div>
            
            {/* Custom Message */}
            <div>
              <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1 font-medium text-sm`}>Customize your message</label>
              <Textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} min-h-[80px] text-sm`}
                placeholder="Write your share message..."
              />
              <div className={`text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mt-1`}>
                {customMessage.length}/280 characters
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium text-sm`}>Select platforms to share</label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={distributeToAll}
                    onCheckedChange={handleDistributeAll}
                    className="border-gray-600"
                  />
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-xs`}>Distribute to all</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-fpYellow bg-fpYellow/10'
                        : isDarkMode 
                          ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    }`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <div className={`w-6 h-6 rounded ${platform.color} flex items-center justify-center text-white text-xs`}>
                      {platform.icon}
                    </div>
                    <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium text-sm`}>{platform.name}</span>
                    {selectedPlatforms.includes(platform.id) && (
                      <Check className="w-4 h-4 text-fpYellow ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Selection Summary */}
            <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-3 mb-3">
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm text-center`}>
                {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
              </div>
            </div>

            {/* Earnings Preview */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="text-blue-400 font-semibold text-sm mb-1">Reputation Gain</div>
                  <div className="text-lg font-bold text-blue-400">
                    {selectedPlatforms.length || 1} RP
                  </div>
                </div>
                <div className="flex-2">
                  <div className="text-green-400 font-semibold text-sm mb-1">Estimated Earnings</div>
                  <div className="text-xl font-bold text-green-400">
                    {calculateTotalEarnings()} FPT
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={onClose} className={`flex-1 ${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`} disabled={loading}>
                Cancel
              </Button>
              <Button 
                onClick={handleShareAndEarn}
                disabled={selectedPlatforms.length === 0 || loading}
                className="flex-1 bg-fpYellow hover:bg-fpYellowDark text-black font-bold disabled:opacity-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {loading ? 'Processing...' : 'Distribute Now'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareEarnFlow;
