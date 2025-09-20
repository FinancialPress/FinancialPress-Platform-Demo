
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Chrome, Facebook, Twitter, Instagram, Linkedin, Youtube, Calendar } from 'lucide-react';
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
        {/* Creator Identity - Top Right */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Badges and Category */}
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-blue-600 text-white text-xs">{post.category}</Badge>
              {post.isFollowing && <Badge className="bg-blue-600 text-white text-xs">Following</Badge>}
              {post.isRecommended && <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>}
            </div>
          </div>
          
          {/* Creator Identity & Reputation */}
          <div className="flex items-center space-x-3">
            {/* Originator Icon */}
            {isFinancialPressPost ? (
              <img 
                src="/lovable-uploads/36c32632-76d5-49c6-bb65-079fe61ba5f0.png" 
                alt="Financial Press" 
                className="w-4 h-4 opacity-60"
              />
            ) : (
              <originatorIcon.icon className={`w-4 h-4 ${mutedText}`} />
            )}
            
            {/* Creator Info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <span className="text-black font-semibold text-sm">{post.creator.charAt(0)}</span>
              </div>
              <div className="text-right">
                <div className={`${textClasses} font-medium text-sm leading-tight`}>{post.creator}</div>
                <div className={`${mutedText} text-xs`}>{post.handle}</div>
              </div>
              
              {/* Reputation Score Shield */}
              <div className="relative">
                <div className="bg-blue-600 rounded-lg px-2 py-1 shadow-sm border border-blue-500">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-bold text-xs">{Math.floor(Math.random() * 10) + 1}</span>
                  </div>
                </div>
              </div>
            </div>
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
        <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <Calendar className={`w-4 h-4 ${mutedText}`} />
            <span className={`text-sm ${mutedText}`}>{dateString} at {timeString}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedPost;
