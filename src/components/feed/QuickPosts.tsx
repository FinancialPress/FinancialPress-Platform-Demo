
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const QuickPosts = () => {
  const quickPosts = [
    { title: "BTC Technical Analysis: Key Levels", creator: "ChartMaster", tips: "1.2K", timeAgo: "30m" },
    { title: "Altseason Indicators Flashing Green", creator: "AltTrader", tips: "980", timeAgo: "45m" },
    { title: "DeFi TVL Surpasses $200B Milestone", creator: "DeFiData", tips: "2.1K", timeAgo: "1h" },
    { title: "NFT Volume Spikes 340% This Week", creator: "NFTStats", tips: "1.5K", timeAgo: "1h" },
    { title: "Institutional Adoption Report Q4", creator: "InstitutionalPro", tips: "3.2K", timeAgo: "2h" },
    { title: "Yield Farming Strategies Updated", creator: "YieldGuru", tips: "890", timeAgo: "2h" }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quick Posts</h2>
      <div className="grid grid-cols-3 gap-3">
        {quickPosts.map((post, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">{post.title}</h3>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">@{post.creator}</span>
                <span className="text-yellow-400">{post.tips} tips</span>
              </div>
              <span className="text-gray-500 text-xs">{post.timeAgo}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickPosts;
