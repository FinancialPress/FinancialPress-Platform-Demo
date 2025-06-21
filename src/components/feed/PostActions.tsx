
import React from 'react';
import { Heart, MessageCircle, Share2, Repeat2, HandCoins } from 'lucide-react';

interface PostActionsProps {
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  mutedText: string;
  isDarkMode: boolean;
  onShare: () => void;
  onTip: () => void;
}

const PostActions = ({ engagement, mutedText, isDarkMode, onShare, onTip }: PostActionsProps) => {
  return (
    <div
      className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
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
          <Repeat2 className="w-5 h-5" />
          <span>{engagement.shares}</span>
        </button>
        <button
          className={`flex items-center space-x-2 ${mutedText} hover:text-yellow-400 transition-colors`}
          onClick={onShare}
        >
          <Share2 className="w-5 h-5" />
          <span>Share & Earn</span>
        </button>
      </div>
      <button
        className={`${mutedText} hover:text-yellow-400 transition-colors flex items-center space-x-2`}
        title="Tip"
        aria-label="Tip"
        onClick={onTip}
      >
        <HandCoins className="w-5 h-5" />
        <span className="text-base">Tip</span>
      </button>
    </div>
  );
};

export default PostActions;
