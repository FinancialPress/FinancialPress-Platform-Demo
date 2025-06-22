
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Heart, Share, MessageCircle, DollarSign } from 'lucide-react';
import { Post } from '@/hooks/usePosts';
import { getPlaceholderImage } from '@/utils/imageUpload';

interface PostItemProps {
  post: Post;
  isDarkMode: boolean;
  onShare?: () => void;
  onTip?: () => void;
}

const PostItem = ({ post, isDarkMode, onShare, onTip }: PostItemProps) => {
  // Early return with error boundary if post is invalid
  if (!post) {
    console.error('PostItem: post is null or undefined');
    return (
      <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
        <CardContent className="p-6">
          <p className="text-red-500">Error: Invalid post data</p>
        </CardContent>
      </Card>
    );
  }

  console.log('PostItem rendering:', {
    id: post.id,
    title: post.title,
    type: post.type,
    hasImage: !!post.image_url,
    hasExternalUrl: !!post.external_url,
    hasBody: !!post.body,
    tags: post.tags
  });

  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
    : 'bg-white border-gray-200 hover:border-gray-300';
  
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Safe fallback for image with null guard
  const getImageUrl = () => {
    if (post.image_url) return post.image_url;
    return getPlaceholderImage(post.section);
  };

  // Safe array access for tags
  const safeTags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <Card className={`${cardClasses} transition-colors`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                className={`text-xs ${
                  post.type === 'create_earn' 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-blue-600 text-white'
                }`}
              >
                {post.type === 'create_earn' ? 'Create & Earn' : 'Share Insight'}
              </Badge>
              {post.section && (
                <Badge variant="outline" className="text-xs">
                  {post.section.toUpperCase()}
                </Badge>
              )}
            </div>
            <h3 className={`${textClasses} font-semibold text-lg mb-2`}>
              {post.title || 'Untitled Post'}
            </h3>
            {post.body && (
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 line-clamp-3`}>
                {post.body}
              </p>
            )}
            {post.external_url && (
              <Button
                variant="outline"
                size="sm"
                className="mb-3"
                onClick={() => {
                  try {
                    window.open(post.external_url, '_blank');
                  } catch (error) {
                    console.error('Error opening external URL:', error);
                  }
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read More
              </Button>
            )}
            {safeTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {safeTags.map((tag, index) => (
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
            src={getImageUrl()} 
            alt={post.title || 'Post image'} 
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              console.log('Image load error, using fallback');
              // Fallback to a generic placeholder if image fails to load
              e.currentTarget.src = getPlaceholderImage();
            }}
          />
        </div>

        {/* Engagement Section */}
        <div className="space-y-3">
          {/* Engagement stats */}
          <div className={`flex items-center justify-between ${mutedText} text-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-3`}>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {Math.floor(Math.random() * 1000) + 100}
              </span>
              <span className="flex items-center">
                <Share className="w-4 h-4 mr-1" />
                {Math.floor(Math.random() * 100) + 10}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {Math.floor(Math.random() * 50) + 5}
              </span>
            </div>
            <span className="text-yellow-400 font-medium">
              +{post.type === 'create_earn' ? '5' : '3'} FPT
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${mutedText} hover:text-red-500`}
              >
                <Heart className="w-4 h-4 mr-1" />
                Like
              </Button>
              {onShare && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${mutedText} hover:text-blue-500`}
                  onClick={onShare}
                >
                  <Share className="w-4 h-4 mr-1" />
                  Share
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${mutedText} hover:text-green-500`}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Comment
              </Button>
            </div>
            {onTip && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black"
                onClick={onTip}
              >
                <DollarSign className="w-4 h-4 mr-1" />
                Tip
              </Button>
            )}
          </div>

          {/* Date */}
          <div className={`flex items-center ${mutedText} text-sm pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(post.created_at)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostItem;
