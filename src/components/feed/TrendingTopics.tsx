
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, ArrowUp } from 'lucide-react';

const TrendingTopics = () => {
  const trendingTopics = [
    { name: "Bitcoin ETF", posts: 234, growth: "+15%" },
    { name: "AI Stocks", posts: 189, growth: "+23%" },
    { name: "DeFi Yield", posts: 156, growth: "+8%" },
    { name: "NFT Markets", posts: 134, growth: "+12%" },
    { name: "Fed Policy", posts: 98, growth: "+34%" }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-yellow-500" />
          Trending Topics
        </h3>
        <div className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between py-1 border-b border-gray-800 last:border-b-0">
              <div>
                <div className="font-medium text-white text-sm">#{topic.name}</div>
                <div className="text-gray-400 text-xs">{topic.posts} posts</div>
              </div>
              <div className="flex items-center text-green-400 text-xs">
                <ArrowUp className="w-3 h-3 mr-1" />
                {topic.growth}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
