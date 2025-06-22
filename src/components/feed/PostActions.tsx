
import React from 'react';
import { Heart, MessageCircle, Share2, Repeat2, HandCoins } from 'lucide-react';
import { useEngagement } from '@/hooks/useEngagement';
import { useFPTTokens } from '@/hooks/useFPTTokens';

interface PostActionsProps {
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  mutedText: string;
  isDarkMode: boolean;
  onShare: () => void;
  onTip: () => void;
  postId?: string | number;
}

const PostActions = ({ engagement, mutedText, isDarkMode, onShare, onTip, postId }: PostActionsProps) => {
  const { trackEngagement, triggerReward, showDemoToast, isLiveUser } = useEngagement();
  const { spendTokens } = useFPTTokens();

  const handleShareAndEarn = async () => {
    const postIdString = postId?.toString() || 'demo-post';
    
    if (isLiveUser) {
      // Track engagement and trigger reward for live users
      await trackEngagement('share', postIdString);
      await triggerReward('share', postIdString);
    } else {
      // Show demo toast for non-authenticated users
      showDemoToast('Sign up to earn FPT for sharing content!');
    }
    
    // Call the original share handler
    onShare();
  };

  const handleTip = async () => {
    const tipAmount = 5; // Default tip amount

    if (isLiveUser) {
      // Spend tokens for the tip
      const success = await spendTokens(
        tipAmount,
        'spend_tip',
        `Tipped ${tipAmount} FPT for content`,
        { post_id: postId }
      );

      if (success) {
        // Call the original tip handler
        onTip();
      }
    } else {
      // Show demo toast for non-authenticated users
      showDemoToast('Sign up to tip creators with FPT!');
      onTip();
    }
  };

  return (
    <div
      className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="flex items-center space-x-8">
        <button className={`flex items-center space-x-2 ${mutedText} hover:text-red-400 transition-colors`}>
          <Heart className="w-5 h-5" />
          <span>{engagement.likes}</span>
        </button>
        <button className={`flex items-center space-x-2 ${mutedText} hover:text-blue-400 transition-colors`}>
          <MessageCircle className="w-5 h-5" />
          <span>{engagement.comments}</span>
        </button>
        <button className={`flex items-center space-x-2 ${mutedText} hover:text-green-400 transition-colors`}>
          <Repeat2 className="w-5 h-5" />
          <span>{engagement.shares}</span>
        </button>
        <button
          className={`flex items-center space-x-2 ${mutedText} hover:text-fpYellow transition-colors`}
          onClick={handleShareAndEarn}
        >
          <Share2 className="w-5 h-5" />
          <span>Share & Earn</span>
        </button>
      </div>
      <button
        className={`${mutedText} hover:text-fpYellow transition-colors flex items-center space-x-2`}
        title="Tip"
        aria-label="Tip"
        onClick={handleTip}
      >
        <HandCoins className="w-5 h-5" />
        <span className="text-base">Tip</span>
      </button>
    </div>
  );
};

export default PostActions;
