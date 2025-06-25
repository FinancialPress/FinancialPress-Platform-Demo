
import React, { useState } from 'react';
import { Share2, Repeat2, HandCoins } from 'lucide-react';
import { useEngagement } from '@/hooks/useEngagement';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

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
  postTitle?: string;
}

const PostActions = ({ 
  engagement, 
  mutedText, 
  isDarkMode, 
  onShare, 
  onTip, 
  postId,
  postTitle = "Sample Post Title"
}: PostActionsProps) => {
  const { trackEngagement, triggerReward, showDemoToast, isLiveUser } = useEngagement();
  const { spendTokens } = useFPTTokens();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showShareEarnModal, setShowShareEarnModal] = useState(false);

  const handleShareAndEarn = async () => {
    console.log('handleShareAndEarn called', { postId, isLiveUser });
    
    if (isLiveUser) {
      // Generate a valid UUID for tracking
      const validPostId = crypto.randomUUID();
      
      console.log('Generated valid postId:', validPostId);
      
      try {
        // Track engagement and trigger reward for live users
        await trackEngagement('share', validPostId);
        await triggerReward('share', validPostId);
      } catch (error) {
        console.error('Error in engagement tracking:', error);
        // Continue with the flow even if engagement tracking fails
      }
    } else {
      // Show demo toast for non-authenticated users
      showDemoToast('Sign up to earn FPT for sharing content!');
    }
    
    // Show the ShareEarnFlow modal
    setShowShareEarnModal(true);
  };

  const handleTipClick = () => {
    console.log('Tip button clicked - opening modal');
    // Just open the modal - don't spend tokens yet
    setShowSupportModal(true);
  };

  const handleConfirmedTip = async (amount: number, message?: string, postId?: string) => {
    console.log('handleConfirmedTip called', { amount, message, postId, isLiveUser });
    
    // The actual spending is handled inside SupportCreatorModal
    // This callback is called after successful spending
    onTip();
  };

  const handleConfirmedSubscribe = async (postId?: string) => {
    console.log('handleConfirmedSubscribe called', { postId, isLiveUser });
    
    // The actual spending is handled inside SupportCreatorModal
    // This callback is called after successful spending
  };

  // Convert postId to string for database operations
  const stringPostId = postId?.toString() || crypto.randomUUID();

  return (
    <>
      <div
        className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <div className="flex items-center space-x-8">
          <LikeButton 
            postId={stringPostId}
            mutedText={mutedText}
          />
          <CommentButton
            postId={stringPostId}
            postTitle={postTitle}
            mutedText={mutedText}
            isDarkMode={isDarkMode}
          />
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
        postTitle={postTitle}
        postId={stringPostId}
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
            title: postTitle,
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
