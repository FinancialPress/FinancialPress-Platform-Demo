
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import PersonalizedHero from './feed/PersonalizedHero';
import UserStats from './feed/UserStats';
import ContentCard from './feed/ContentCard';
import TrendingStories from './feed/TrendingStories';
import QuickPosts from './feed/QuickPosts';
import UserInterests from './feed/UserInterests';
import TrendingTopics from './feed/TrendingTopics';
import TopCreators from './feed/TopCreators';
import QuickActions from './feed/QuickActions';
import ShareEarnFlow from './ShareEarnFlow';
import EarningsTracker from './EarningsTracker';

interface UserFeedProps {
  onNavigate?: (screen: number) => void;
}

const UserFeed = ({ onNavigate }: UserFeedProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEarningsTracker, setShowEarningsTracker] = useState(true); // Show by default
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // Personalized featured content based on user interests
  const personalizedContent = [
    {
      title: "Bitcoin Bull Run: What's Driving the $94K Rally?",
      creator: "CryptoAnalyst",
      badge: "Gold Creator",
      engagement: "2.4K tips",
      earnings: "45.8 FPT",
      views: "12.5K",
      comments: 89,
      shares: 156,
      timeAgo: "2h ago",
      category: "Crypto Analysis",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop",
      isRecommended: true
    },
    {
      title: "DeFi Renaissance: Top 5 Protocols to Watch in 2024",
      creator: "DeFiGuru",
      badge: "Platinum Creator",
      engagement: "1.8K tips",
      earnings: "38.2 FPT",
      views: "8.9K",
      comments: 67,
      shares: 134,
      timeAgo: "4h ago",
      category: "DeFi",
      hasImage: false,
      isFollowing: true
    },
    {
      title: "NFT Market Recovery: Blue Chips Lead the Way",
      creator: "NFTTracker",
      badge: "Silver Creator",
      engagement: "1.2K tips",
      earnings: "28.5 FPT",
      views: "6.7K",
      comments: 45,
      shares: 89,
      timeAgo: "6h ago",
      category: "NFTs",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=150&fit=crop"
    },
    {
      title: "AI Revolution in Finance: Which Stocks Will Soar?",
      creator: "TechAnalyst",
      badge: "Gold Creator",
      engagement: "2.1K tips",
      earnings: "42.3 FPT",
      views: "11.2K",
      comments: 78,
      shares: 167,
      timeAgo: "8h ago",
      category: "AI & Tech",
      hasImage: false,
      isRecommended: true
    },
    {
      title: "Macro Outlook: Fed Policy Impact on Crypto Markets",
      creator: "MacroMind",
      badge: "Platinum Creator",
      engagement: "3.2K tips",
      earnings: "58.7 FPT",
      views: "15.8K",
      comments: 123,
      shares: 289,
      timeAgo: "1d ago",
      category: "Macroeconomics",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=150&fit=crop",
      isFollowing: true
    },
    {
      title: "Solana vs Ethereum: The L1 Battle Intensifies",
      creator: "BlockchainBull",
      badge: "Gold Creator",
      engagement: "1.9K tips",
      earnings: "36.4 FPT",
      views: "9.3K",
      comments: 92,
      shares: 178,
      timeAgo: "1d ago",
      category: "Blockchain",
      hasImage: false
    },
    {
      title: "Altcoin Season Alert: Top 10 Gems Under $1",
      creator: "AltcoinHunter",
      badge: "Silver Creator",
      engagement: "1.5K tips",
      earnings: "31.2 FPT",
      views: "7.8K",
      comments: 56,
      shares: 98,
      timeAgo: "2d ago",
      category: "Altcoins",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop",
      isRecommended: true
    },
    {
      title: "Stablecoin Market Analysis: USDT vs USDC",
      creator: "StableMaster",
      badge: "Gold Creator",
      engagement: "1.1K tips",
      earnings: "24.6 FPT",
      views: "5.2K",
      comments: 34,
      shares: 67,
      timeAgo: "2d ago",
      category: "Stablecoins",
      hasImage: false
    },
    {
      title: "Layer 2 Solutions: Arbitrum's Latest Upgrade",
      creator: "L2Expert",
      badge: "Platinum Creator",
      engagement: "2.8K tips",
      earnings: "52.3 FPT",
      views: "13.6K",
      comments: 101,
      shares: 203,
      timeAgo: "3d ago",
      category: "Layer 2",
      hasImage: true,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=150&fit=crop"
    }
  ];

  const handleShare = (content: any) => {
    setSelectedContent({
      title: content.title,
      creator: content.creator,
      estimatedEarnings: "2.4 FPT"
    });
    setShowShareModal(true);
  };

  const handleShareComplete = () => {
    setShowShareModal(false);
    setShowEarningsTracker(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        <PersonalizedHero onNavigate={onNavigate} />
        <UserStats />

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-8">
            {/* Filter Options */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold">For You</h2>
                <Badge className="bg-yellow-600 text-black text-xs">Personalized</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="text-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="text-sm">
                  View All
                </Button>
              </div>
            </div>

            {/* Personalized Featured Content */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4">
                {personalizedContent.map((content, index) => (
                  <ContentCard 
                    key={index} 
                    content={content} 
                    onShare={handleShare}
                  />
                ))}
              </div>
            </div>

            <TrendingStories />
            <QuickPosts />
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-4">
            <UserInterests />
            <TrendingTopics />
            <TopCreators />
            <QuickActions />
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && selectedContent && (
        <ShareEarnFlow 
          post={selectedContent}
          onClose={() => setShowShareModal(false)}
          onShare={handleShareComplete}
        />
      )}

      {/* Earnings Tracker Panel */}
      <EarningsTracker 
        isVisible={showEarningsTracker}
        onClose={() => setShowEarningsTracker(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default UserFeed;
