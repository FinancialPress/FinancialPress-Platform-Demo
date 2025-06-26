
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FeedHeaderProps {
  textClasses: string;
}

const FeedHeader = ({ textClasses }: FeedHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <h2 className={`text-2xl font-bold ${textClasses}`}>Your Feed</h2>
      <Badge className="bg-yellow-600 text-black text-sm">Personalized</Badge>
    </div>
  );
};

export default FeedHeader;
