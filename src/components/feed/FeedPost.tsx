
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Chrome, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
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

  // Generate random originator icon
  const getOriginatorIcon = () => {
    const icons = [
      { icon: Chrome, name: 'Web' },
      { icon: Facebook, name: 'Facebook' },
      { icon: Twitter, name: 'Twitter' },
      { icon: Instagram, name: 'Instagram' },
      { icon: Linkedin, name: 'LinkedIn' },
      { icon: Youtube, name: 'YouTube' },
    ];
    
    // Use post ID to consistently pick the same icon for the same post
    const iconIndex = post.id % icons.length;
    return icons[iconIndex];
  };

  // Add Financial Press logo for some posts
  const isFinancialPressPost = post.id % 4 === 0; // Every 4th post
  const originatorIcon = getOriginatorIcon();

  // Generate current date/time for demo
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeString = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

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
                <span>{dateString}</span>
                <span>•</span>
                <Badge className="bg-blue-600 text-white text-xs">{post.category}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Originator Icon */}
            {isFinancialPressPost ? (
              <img 
                src="/lovable-uploads/36c32632-76d5-49c6-bb65-079fe61ba5f0.png" 
                alt="Financial Press" 
                className="w-5 h-5"
              />
            ) : (
              <originatorIcon.icon className={`w-5 h-5 ${mutedText}`} title={`From ${originatorIcon.name}`} />
            )}
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
          postId={`feed-${post.id}`}
          postTitle={post.content}
        />

        {/* Date and Time Strip */}
        <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} text-xs ${mutedText}`}>
          <div className="flex items-center justify-between">
            <span>Published: {dateString} at {timeString}</span>
            <span>Updated: {timeString}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedPost;
