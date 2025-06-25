
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Heart, Share, MessageCircle, Share2, HandCoins } from 'lucide-react';
import { Post } from '@/hooks/usePosts';
import { getPlaceholderImage } from '@/utils/imageUpload';
import { useLikes } from '@/hooks/useLikes';
import { useComments } from '@/hooks/useComments';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import CommentModal from '@/components/modals/CommentModal';
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
  const [showCommentModal, setShowCommentModal] = useState(false);
  
  // Use real like and comment data
  const { likesCount, isLiked, toggleLike } = useLikes(post.id);
  const { commentsCount } = useComments(post.id);
  
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

  // Generate mock engagement metrics for display
  const generateEngagement = () => ({
    shares: Math.floor(Math.random() * 100) + 10,
    views: Math.floor(Math.random() * 5000) + 500,
  });

  const engagement = generateEngagement();

  // Safe data extraction with proper fallbacks
  const title = post?.title || '(untitled)';
  const body = post?.body || '';
  const imageUrl = post?.image_url || getPlaceholderImage(post?.section || 'default');
  const tags = Array.isArray(post?.tags) ? post.tags : [];
  const externalUrl = post?.external_url || null;
  const section = post?.section || 'general';
  const type = post?.type || 'create_earn';
  const createdAt = post?.created_at || new Date().toISOString();
  const postId = post?.id || 'unknown';

  const handleShareAndEarn = async () => {
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
                e.currentTarget.src = getPlaceholderImage(section);
              }}
            />
          </div>

          {/* Engagement stats */}
          <div className={`flex items-center justify-between ${mutedText} text-sm mb-4`}>
            <div className="flex items-center space-x-4">
              <span>{engagement.views.toLocaleString()} views</span>
              <span>{commentsCount} comments</span>
              <span>{engagement.shares} shares</span>
            </div>
            <span className="text-green-400 font-semibold">
              Earned: +{type === 'create_earn' ? '5' : '3'} FPT
            </span>
          </div>

          {/* Action buttons */}
          <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-8">
              <button 
                className={`flex items-center space-x-2 transition-colors ${
                  isLiked 
                    ? 'text-red-500 hover:text-red-600' 
                    : `${mutedText} hover:text-red-400`
                }`}
                onClick={toggleLike}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>
              <button 
                className={`flex items-center space-x-2 ${mutedText} hover:text-blue-400 transition-colors`}
                onClick={() => setShowCommentModal(true)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{commentsCount}</span>
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

      {/* Comment Modal */}
      <CommentModal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        postId={postId}
        postTitle={title}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default PostItem;
