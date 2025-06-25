
import React from 'react';
import { Heart } from 'lucide-react';
import { useLikes } from '@/hooks/useLikes';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  postId: string;
  mutedText: string;
  className?: string;
}

const LikeButton = ({ postId, mutedText, className }: LikeButtonProps) => {
  const { likesCount, isLiked, loading, toggleLike } = useLikes(postId);

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className={cn(
        `flex items-center space-x-2 transition-colors ${mutedText}`,
        isLiked ? 'text-red-500 hover:text-red-400' : 'hover:text-red-400',
        loading && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <Heart 
        className={cn(
          "w-5 h-5 transition-transform",
          isLiked && "fill-current scale-110",
          loading && "animate-pulse"
        )} 
      />
      <span className="font-medium">{likesCount}</span>
    </button>
  );
};

export default LikeButton;
