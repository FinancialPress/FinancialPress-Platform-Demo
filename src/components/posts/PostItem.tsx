
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ExternalLink, Calendar, Heart, Share, MessageCircle, Share2, HandCoins } from 'lucide-react';
import { Post } from '@/hooks/usePosts';
import { getPlaceholderImage } from '@/utils/imageUpload';
import { useLikes } from '@/hooks/useLikes';
import { useComments } from '@/hooks/useComments';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import CommentModal from '@/components/modals/CommentModal';
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';

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
  const [authorProfile, setAuthorProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  
  // Use real like and comment data
  const { likesCount, isLiked, toggleLike } = useLikes(post.id);
  const { commentsCount } = useComments(post.id);

  // Fetch author profile
  useEffect(() => {
    const fetchAuthorProfile = async () => {
      if (post.author_id) {
        setLoadingProfile(true);
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('display_name, username, image_url')
            .eq('id', post.author_id)
            .single();
          
          if (!error && data) {
            setAuthorProfile(data);
          }
        } catch (err) {
          console.error('Error fetching author profile:', err);
        } finally {
          setLoadingProfile(false);
        }
      }
    };

    fetchAuthorProfile();
  }, [post.author_id]);
  
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
  
  // Get display values for author
  const displayName = authorProfile?.display_name || authorProfile?.username || 'User';
  const displayHandle = authorProfile?.username ? `@${authorProfile.username}` : '@user';
  
  // Generate reputation score (1-10)
  const reputationScore = Math.floor(Math.random() * 10) + 1;

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
            </div>
            
            {/* Creator Identity & Reputation - Top Right */}
            <div className="flex items-center space-x-2">
              {/* Avatar */}
              <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                {authorProfile?.image_url ? (
                  <AvatarImage src={authorProfile.image_url} alt={displayName} />
                ) : null}
                <AvatarFallback className="bg-yellow-500 text-black font-semibold text-sm">
                  {displayName?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-right">
                <div className={`${textClasses} font-medium text-sm leading-tight`}>
                  {loadingProfile ? 'Loading...' : displayName}
                </div>
                <div className={`${mutedText} text-xs`}>
                  {loadingProfile ? '' : displayHandle}
                </div>
              </div>
              
              {/* Reputation Score Shield */}
              <div className="relative">
                <div className="bg-blue-600 rounded-lg px-2 py-1 shadow-sm border border-blue-500">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-bold text-xs">{reputationScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-4">
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
                <span>Share and Earn</span>
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

      {/* Share and Earn Modal */}
      {showShareModal && (
        <ShareEarnFlow
          post={{
            title: title,
            creator: 'creator',
            estimatedEarnings: type === 'create_earn' ? '5.0 FPT' : '3.0 FPT'
          }}
          onClose={() => setShowShareModal(false)}
          onShare={handleShareComplete}
          isDarkMode={isDarkMode}
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
