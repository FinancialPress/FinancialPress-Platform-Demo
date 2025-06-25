
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Repeat2, HandCoins } from 'lucide-react';
import { useEngagement } from '@/hooks/useEngagement';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { useLikes } from '@/hooks/useLikes';
import { useComments } from '@/hooks/useComments';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import CommentModal from '@/components/modals/CommentModal';

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
  postTitle = "Post"
}: PostActionsProps) => {
  const { trackEngagement, triggerReward, showDemoToast, isLiveUser } = useEngagement();
  const { spendTokens } = useFPTTokens();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showShareEarnModal, setShowShareEarnModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  // Use actual like/comment data if postId is provided
  const { likesCount, isLiked, toggleLike } = useLikes(postId?.toString() || '');
  const { commentsCount } = useComments(postId?.toString() || '');

  // Use real data if available, otherwise fall back to mock engagement data
  const displayLikesCount = postId ? likesCount : engagement.likes;
  const displayCommentsCount = postId ? commentsCount : engagement.comments;

  const handleShareAndEarn = async () => {
    console.log('handleShareAndEarn called', { postId, isLiveUser });
    
    if (isLiveUser) {
      const validPostId = crypto.randomUUID();
      
      console.log('Generated valid postId:', validPostId);
      
      try {
        await trackEngagement('share', validPostId);
        await triggerReward('share', validPostId);
      } catch (error) {
        console.error('Error in engagement tracking:', error);
      }
    } else {
      showDemoToast('Sign up to earn FPT for sharing content!');
    }
    
    setShowShareEarnModal(true);
  };

  const handleTipClick = () => {
    console.log('Tip button clicked - opening modal');
    setShowSupportModal(true);
  };

  const handleConfirmedTip = async (amount: number, message?: string, postId?: string) => {
    console.log('handleConfirmedTip called', { amount, message, postId, isLiveUser });
    onTip();
  };

  const handleConfirmedSubscribe = async (postId?: string) => {
    console.log('handleConfirmedSubscribe called', { postId, isLiveUser });
  };

  const handleLikeClick = () => {
    if (postId) {
      toggleLike();
    }
  };

  const handleCommentClick = () => {
    if (postId) {
      setShowCommentModal(true);
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        <div className="flex items-center space-x-8">
          <button 
            className={`flex items-center space-x-2 transition-colors ${
              postId && isLiked 
                ? 'text-red-500 hover:text-red-600' 
                : `${mutedText} hover:text-red-400`
            }`}
            onClick={handleLikeClick}
            disabled={!postId}
          >
            <Heart className={`w-5 h-5 ${postId && isLiked ? 'fill-current' : ''}`} />
            <span>{displayLikesCount}</span>
          </button>
          <button 
            className={`flex items-center space-x-2 ${mutedText} hover:text-blue-400 transition-colors`}
            onClick={handleCommentClick}
            disabled={!postId}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{displayCommentsCount}</span>
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
        postTitle={postTitle}
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

      {/* Comment Modal */}
      {postId && (
        <CommentModal
          isOpen={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          postId={postId.toString()}
          postTitle={postTitle}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

export default PostActions;
