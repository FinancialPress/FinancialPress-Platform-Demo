
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye } from 'lucide-react';

const TrendingStories = () => {
  const trendingStories = [
    { title: "SEC Approves Bitcoin ETF Options Trading", views: "45.2K", timeAgo: "1h" },
    { title: "Ethereum Merge Anniversary: 1 Year Later", views: "38.9K", timeAgo: "2h" },
    { title: "Binance Launches New DeFi Product Suite", views: "32.1K", timeAgo: "3h" },
    { title: "Tesla Adds Dogecoin Payment Option", views: "28.7K", timeAgo: "4h" },
    { title: "Cardano Smart Contracts Hit New Milestone", views: "25.3K", timeAgo: "5h" },
    { title: "Polygon zkEVM Goes Live on Mainnet", views: "22.8K", timeAgo: "6h" },
    { title: "Chainlink Oracle Network Expansion", views: "19.4K", timeAgo: "7h" },
    { title: "Uniswap V4 Beta Testing Begins", views: "17.2K", timeAgo: "8h" }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Trending Stories</h2>
      <div className="grid grid-cols-2 gap-3">
        {trendingStories.map((story, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 hover:border-yellow-500 transition-colors">
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-white mb-1 line-clamp-1">{story.title}</h3>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3" />
                  <span>{story.views} views</span>
                </div>
                <span>{story.timeAgo}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingStories;
