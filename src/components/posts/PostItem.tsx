
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar } from 'lucide-react';
import { Post } from '@/hooks/usePosts';

interface PostItemProps {
  post: Post;
  isDarkMode: boolean;
}

const PostItem = ({ post, isDarkMode }: PostItemProps) => {
  const cardClasses = isDarkMode 
    ? 'bg-gray-900 border-gray-800 hover:border-gray-700' 
    : 'bg-white border-gray-200 hover:border-gray-300';
  
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              {post.title}
            </h3>
            {post.body && (
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {post.body}
              </p>
            )}
            {post.external_url && (
              <Button
                variant="outline"
                size="sm"
                className="mb-3"
                onClick={() => window.open(post.external_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Link
              </Button>
            )}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {post.image_url && (
          <div className="mb-4">
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className={`flex items-center ${mutedText} text-sm`}>
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(post.created_at)}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostItem;
