import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import PostEngagement from './PostEngagement';
import PostActions from './PostActions';

interface FeedPostProps {
  post: {
    id: number;
    creator: string;
    handle: string;
    badge: string;
    timeAgo: string;
    content: string;
    description: string;
    image?: string;
    engagement: {
      likes: number;
      shares: number;
      comments: number;
      views: number;
    };
    earnings: string;
    category: string;
    isRecommended?: boolean;
    isFollowing?: boolean;
  };
  isDarkMode: boolean;
  onShare: () => void;
  onTip: () => void;
}

const FeedPost = ({ post, isDarkMode, onShare, onTip }: FeedPostProps) => {
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <Card className={`${cardClasses} transition-colors`}>
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">{post.creator.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`${textClasses} font-semibold`}>{post.creator}</span>
                <Badge
                  className={`text-xs ${
                    post.badge === 'Platinum Creator'
                      ? 'bg-purple-500 text-white'
                      : post.badge === 'Gold Creator'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-500 text-white'
                  }`}
                >
                  {post.badge}
                </Badge>
                {post.isFollowing && <Badge className="bg-blue-600 text-white text-xs">Following</Badge>}
                {post.isRecommended && <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>}
              </div>
              <div className={`flex items-center space-x-2 ${mutedText} text-sm`}>
                <span>{post.handle}</span>
                <span>•</span>
                <span>{post.timeAgo}</span>
                <span>•</span>
                <Badge className="bg-blue-600 text-white text-xs">{post.category}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className={`${mutedText}`}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className={`${textClasses} font-semibold text-xl mb-3`}>{post.content}</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{post.description}</p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="mb-4">
            <img src={post.image} alt={post.content} className="w-full h-80 rounded-lg object-cover" />
          </div>
        )}

        {/* Engagement Stats */}
        <PostEngagement 
          engagement={post.engagement}
          earnings={post.earnings}
          mutedText={mutedText}
        />

        {/* Action Buttons */}
        <PostActions
          engagement={post.engagement}
          mutedText={mutedText}
          isDarkMode={isDarkMode}
          onShare={onShare}
          onTip={onTip}
        />
      </CardContent>
    </Card>
  );
};

export default FeedPost;
