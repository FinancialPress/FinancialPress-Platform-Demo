
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Repeat2, HandCoins } from 'lucide-react';
import { useEngagement } from '@/hooks/useEngagement';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import ShareEarnFlow from '@/components/ShareEarnFlow';

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
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showShareEarnModal, setShowShareEarnModal] = useState(false);

  const handleShareAndEarn = async () => {
    if (isLiveUser) {
      const postIdString = postId?.toString() || 'demo-post';
      
      // Track engagement and trigger reward for live users
      await trackEngagement('share', postIdString);
      await triggerReward('share', postIdString);
    } else {
      // Show demo toast for non-authenticated users
      showDemoToast('Sign up to earn FPT for sharing content!');
    }
    
    // Show the ShareEarnFlow modal
    setShowShareEarnModal(true);
  };

  const handleTipClick = () => {
    // Just open the modal - don't spend tokens yet
    setShowSupportModal(true);
  };

  const handleConfirmedTip = async (amount: number, message?: string, postId?: string) => {
    if (isLiveUser) {
      // Spend tokens for the tip
      const success = await spendTokens(
        amount,
        'spend_tip',
        `Tipped ${amount} FPT for content`,
        { post_id: postId, message }
      );

      if (success) {
        // Call the original tip handler
        onTip();
        setShowSupportModal(false);
      }
    } else {
      // Show demo toast for non-authenticated users
      showDemoToast('Sign up to tip creators with FPT!');
      onTip();
      setShowSupportModal(false);
    }
  };

  const handleConfirmedSubscribe = async (postId?: string) => {
    const subscriptionAmount = 5; // Default subscription amount

    if (isLiveUser) {
      // Spend tokens for the subscription
      const success = await spendTokens(
        subscriptionAmount,
        'spend_subscription',
        `Subscribed for ${subscriptionAmount} FPT`,
        { post_id: postId }
      );

      if (success) {
        setShowSupportModal(false);
      }
    } else {
      // Show demo toast for non-authenticated users
      showDemoToast('Sign up to subscribe with FPT!');
      setShowSupportModal(false);
    }
  };

  return (
    <>
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
          onClick={handleTipClick}
        >
          <HandCoins className="w-5 h-5" />
          <span className="text-base">Tip</span>
        </button>
      </div>

      {/* Support Creator Modal */}
      <SupportCreatorModal
        creatorHandle="@creator"
        creatorName="Creator"
        followerCount="1.2K"
        isVerified={false}
        postTitle="Sample Post Title"
        postId={postId?.toString()}
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        onTip={handleConfirmedTip}
        onSubscribe={handleConfirmedSubscribe}
        isDarkMode={isDarkMode}
      />

      {/* Share Earn Flow Modal */}
      {showShareEarnModal && (
        <ShareEarnFlow
          post={{
            title: "Sample Post Title",
            creator: "creator",
            estimatedEarnings: "5.0 FPT"
          }}
          onClose={() => setShowShareEarnModal(false)}
          onShare={() => {
            onShare();
            setShowShareEarnModal(false);
          }}
        />
      )}
    </>
  );
};

export default PostActions;
