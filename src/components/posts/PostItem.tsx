
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Heart, Share, MessageCircle, DollarSign, Share2, HandCoins } from 'lucide-react';
import { Post } from '@/hooks/usePosts';
import { getPlaceholderImage } from '@/utils/imageUpload';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import { toast } from 'sonner';

interface PostItemProps {
  post: Post;
  isDarkMode: boolean;
  onShare?: () => void;
  onTip?: () => void;
}

const PostItem = ({ post, isDarkMode }: PostItemProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  
  // Simple mock engagement functionality to prevent crashes
  const mockEngagement = {
    trackEngagement: async (eventType: string, postId: string) => {
      console.log(`Mock tracking: ${eventType} for post ${postId}`);
    },
    triggerReward: async (eventType: string, postId: string) => {
      console.log(`Mock reward: ${eventType} for post ${postId}`);
      toast.success(`+0.5 FPT earned!`, {
        description: `For ${eventType}ing content`
      });
    },
    showDemoToast: (message: string) => {
      toast.info(message, {
        description: "Join FinancialPress to start earning!",
      });
    },
    isLiveUser: true // Assume live user for now
  };
  
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
    : 'bg-white border-gray-200 hover:border-gray-300';
  
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Generate mock engagement metrics
  const generateEngagement = () => ({
    likes: Math.floor(Math.random() * 1000) + 100,
    shares: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 50) + 5,
    views: Math.floor(Math.random() * 5000) + 500,
  });

  const engagement = generateEngagement();

  // Safe data access with proper Post interface properties
  const getPostTitle = () => {
    return post?.title || 'Untitled Post';
  };

  const getPostBody = () => {
    return post?.body || '';
  };

  const getPostImageUrl = () => {
    const imageUrl = post?.image_url;
    if (imageUrl) return imageUrl;
    return getPlaceholderImage(post?.section || 'default');
  };

  const getPostTags = () => {
    const tags = post?.tags;
    if (!tags || !Array.isArray(tags)) return [];
    return tags;
  };

  const getPostExternalUrl = () => {
    return post?.external_url || null;
  };

  const getPostSection = () => {
    return post?.section || 'general';
  };

  const getPostType = () => {
    return post?.type || 'create_earn';
  };

  const getPostCreatedAt = () => {
    return post?.created_at || new Date().toISOString();
  };

  const getPostId = () => {
    return post?.id || 'unknown';
  };

  const handleShareAndEarn = async () => {
    if (mockEngagement.isLiveUser) {
      try {
        await mockEngagement.trackEngagement('share', getPostId());
        await mockEngagement.triggerReward('share', getPostId());
      } catch (error) {
        console.error('Error in engagement tracking:', error);
      }
    } else {
      mockEngagement.showDemoToast('Sign up to earn FPT for sharing content!');
    }
    
    setShowShareModal(true);
  };

  const handleTip = () => {
    setShowSupportModal(true);
  };

  const handleShareComplete = () => {
    setShowShareModal(false);
  };

  const handleTipComplete = (amount: number, message?: string, postId?: string) => {
    console.log(`Tip: ${amount} FPT`, { message, postId });
    setShowSupportModal(false);
  };

  const handleSubscribe = (postId?: string) => {
    console.log(`Subscribed`, { postId });
    setShowSupportModal(false);
  };

  // Safe variables with proper Post interface properties
  const title = getPostTitle();
  const body = getPostBody();
  const imageUrl = getPostImageUrl();
  const tags = getPostTags();
  const externalUrl = getPostExternalUrl();
  const section = getPostSection();
  const type = getPostType();
  const createdAt = getPostCreatedAt();
  const postId = getPostId();

  return (
    <>
      <Card className={`${cardClasses} transition-colors`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  className={`text-xs ${
                    type === 'create_earn' 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {type === 'create_earn' ? 'Create & Earn' : 'Share Insight'}
                </Badge>
                {section && (
                  <Badge variant="outline" className="text-xs">
                    {section.toUpperCase()}
                  </Badge>
                )}
              </div>
              <h3 className={`${textClasses} font-semibold text-lg mb-2`}>
                {title}
              </h3>
              {body && (
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 line-clamp-3`}>
                  {body}
                </p>
              )}
              {externalUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-3"
                  onClick={() => window.open(externalUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read More
                </Button>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Image with safe fallback */}
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = getPlaceholderImage();
              }}
            />
          </div>

          {/* Engagement stats */}
          <div className={`flex items-center justify-between ${mutedText} text-sm mb-4`}>
            <div className="flex items-center space-x-4">
              <span>{engagement.views.toLocaleString()} views</span>
              <span>{engagement.comments} comments</span>
              <span>{engagement.shares} shares</span>
            </div>
            <span className="text-green-400 font-semibold">
              Earned: +{type === 'create_earn' ? '5' : '3'} FPT
            </span>
          </div>

          {/* Action buttons */}
          <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
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
                <Share className="w-5 h-5" />
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
              onClick={handleTip}
            >
              <HandCoins className="w-5 h-5" />
              <span>Tip</span>
            </button>
          </div>

          {/* Date */}
          <div className={`flex items-center ${mutedText} text-sm pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mt-2`}>
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(createdAt)}
          </div>
        </CardContent>
      </Card>

      {/* Share & Earn Modal */}
      {showShareModal && (
        <ShareEarnFlow
          post={{
            title: title,
            creator: 'creator',
            estimatedEarnings: type === 'create_earn' ? '5.0 FPT' : '3.0 FPT'
          }}
          onClose={() => setShowShareModal(false)}
          onShare={handleShareComplete}
        />
      )}

      {/* Support Creator Modal */}
      <SupportCreatorModal
        creatorHandle="@creator"
        creatorName="Creator"
        followerCount="1.2K"
        isVerified={false}
        postTitle={title}
        postId={postId}
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        onTip={handleTipComplete}
        onSubscribe={handleSubscribe}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default PostItem;
