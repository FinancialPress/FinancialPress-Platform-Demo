
import React from 'react';

interface PostEngagementProps {
  engagement: {
    views: number;
    comments: number;
    shares: number;
  };
  earnings: string;
  mutedText: string;
}

const PostEngagement = ({ engagement, earnings, mutedText }: PostEngagementProps) => {
  return (
    <div className={`flex items-center justify-between ${mutedText} text-sm mb-4`}>
      <div className="flex items-center space-x-4">
        <span>{engagement.views.toLocaleString()} views</span>
        <span>{engagement.comments} comments</span>
        <span>{engagement.shares} shares</span>
      </div>
      <span className="text-green-400 font-semibold">Earned: {earnings}</span>
    </div>
  );
};

export default PostEngagement;
