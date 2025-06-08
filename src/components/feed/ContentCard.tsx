
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle, Share2 } from 'lucide-react';

interface ContentCardProps {
  content: {
    title: string;
    creator: string;
    badge?: string;
    engagement: string;
    earnings: string;
    views: string;
    comments: number;
    shares: number;
    timeAgo: string;
    category: string;
    hasImage?: boolean;
    thumbnail?: string;
    isRecommended?: boolean;
    isFollowing?: boolean;
  };
}

const ContentCard = ({ content }: ContentCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-yellow-500 transition-colors">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2 gap-2">
          <div className="flex items-center flex-wrap gap-1 min-w-0 flex-1">
            <Badge className="bg-blue-600 text-white text-xs whitespace-nowrap">{content.category}</Badge>
            {content.isRecommended && (
              <Badge className="bg-green-600 text-white text-xs whitespace-nowrap">Recommended</Badge>
            )}
            {content.isFollowing && (
              <Badge className="bg-purple-600 text-white text-xs whitespace-nowrap">Following</Badge>
            )}
          </div>
          <span className="text-gray-400 text-xs whitespace-nowrap flex-shrink-0">{content.timeAgo}</span>
        </div>
        
        {content.hasImage && content.thumbnail && (
          <div className="mb-2">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-20 rounded object-cover"
            />
          </div>
        )}
        
        <h3 className="text-sm font-semibold mb-2 text-white line-clamp-2">{content.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 min-w-0">
            <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <span className="text-gray-300 text-xs truncate">{content.creator}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{content.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{content.comments}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share2 className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{content.shares}</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400 truncate">{content.engagement}</span>
          <span className="text-green-400 font-semibold whitespace-nowrap">{content.earnings}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
