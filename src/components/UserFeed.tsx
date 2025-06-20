import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, Repeat2, Eye, MoreHorizontal, HandCoins } from 'lucide-react';
import ShareEarnFlow from './ShareEarnFlow';
import EarningsTracker from './EarningsTracker';
import TrendingTopics from '@/components/feed/TrendingTopics';
import TopCreators from '@/components/feed/TopCreators';
import TopSharers from '@/components/feed/TopSharers';
import TopComments from '@/components/feed/TopComments';
import UserInterests from '@/components/feed/UserInterests';
import UserStats from '@/components/feed/UserStats';
import WhoToFollow from '@/components/feed/WhoToFollow';
import FeedSidebar from '@/components/feed/FeedSidebar';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import WelcomeModal from '@/components/modals/WelcomeModal';
import OnboardingTour from '@/components/modals/OnboardingTour';

interface UserFeedProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
  showOnboarding?: boolean;
}

const UserFeed = ({ onNavigate, isDarkMode, showOnboarding = false }: UserFeedProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(showOnboarding);
  const [showTour, setShowTour] = useState(false);
  const [earningsAmount, setEarningsAmount] = useState('0.0');

  useEffect(() => {
    // Show welcome modal if this is first time from onboarding
    if (showOnboarding) {
      setShowWelcomeModal(true);
    }
  }, [showOnboarding]);

  useEffect(() => {
    // Add/remove body class for onboarding
    if (showTour) {
      document.body.classList.add('onboarding-active');
    } else {
      document.body.classList.remove('onboarding-active');
    }

    return () => {
      document.body.classList.remove('onboarding-active');
    };
  }, [showTour]);

  const handleStartTour = () => {
    setShowWelcomeModal(false);
    setShowTour(true);
  };

  const handleTourComplete = () => {
    setShowTour(false);
  };

  const handleSkipTour = () => {
    setShowTour(false);
  };

  const handleEarningsUpdate = () => {
    // Animate earnings from 0.0 to 1.0
    setEarningsAmount('1.0');
  };

  // Theme-aware classes
  const bgClasses = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const buttonClasses = isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100';

  // Single column feed content
  const feedPosts = [
    {
      id: 1,
      creator: 'CryptoAnalyst',
      handle: '@cryptoanalyst',
      badge: 'Gold Creator',
      timeAgo: '2h',
      content: "Bitcoin Bull Run: What's Driving the $94K Rally?",
      description:
        'The recent surge past $94K represents a significant psychological barrier. Key factors include increased institutional adoption, favorable regulatory news, and strong on-chain metrics. The momentum appears sustainable with support levels holding firm.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop',
      engagement: {
        likes: 2400,
        shares: 156,
        comments: 89,
        views: 12500,
      },
      earnings: '45.8 FPT',
      category: 'Crypto Analysis',
      isRecommended: true,
      isFollowing: false,
    },
    {
      id: 2,
      creator: 'DeFiGuru',
      handle: '@defiguru',
      badge: 'Platinum Creator',
      timeAgo: '4h',
      content: 'DeFi Renaissance: Top 5 Protocols to Watch in 2024',
      description:
        "The DeFi landscape is evolving rapidly. Here are the protocols showing the most promise: 1) Uniswap V4 with hooks, 2) Aave's GHO stablecoin expansion, 3) Compound III growth, 4) Curve's new tokenomics, 5) Lido's staking dominance. Each represents a unique opportunity in the evolving ecosystem.",
      engagement: {
        likes: 1800,
        shares: 134,
        comments: 67,
        views: 8900,
      },
      earnings: '38.2 FPT',
      category: 'DeFi',
      isFollowing: true,
    },
    {
      id: 3,
      creator: 'NFTTracker',
      handle: '@nfttracker',
      badge: 'Silver Creator',
      timeAgo: '6h',
      content: 'NFT Market Recovery: Blue Chips Lead the Way',
      description:
        'Floor prices for top collections are showing signs of recovery. BAYC, CryptoPunks, and Azuki are leading the charge with increased trading volume and whale accumulation patterns. The market sentiment is shifting positive.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop',
      engagement: {
        likes: 1200,
        shares: 89,
        comments: 45,
        views: 6700,
      },
      earnings: '28.5 FPT',
      category: 'NFTs',
    },
    {
      id: 4,
      creator: 'TechAnalyst',
      handle: '@techanalyst',
      badge: 'Gold Creator',
      timeAgo: '8h',
      content: 'AI Revolution in Finance: Which Stocks Will Soar?',
      description:
        'AI integration in financial services is accelerating. Companies like NVDA, MSFT, and emerging fintech players are positioning themselves for massive growth. The convergence of AI and finance presents unprecedented opportunities for investors.',
      engagement: {
        likes: 2100,
        shares: 167,
        comments: 78,
        views: 11200,
      },
      earnings: '42.3 FPT',
      category: 'AI & Tech',
      isRecommended: true,
    },
    {
      id: 5,
      creator: 'MacroMind',
      handle: '@macromind',
      badge: 'Platinum Creator',
      timeAgo: '1d',
      content: 'Macro Outlook: Fed Policy Impact on Crypto Markets',
      description:
        "The Federal Reserve's monetary policy decisions continue to significantly impact cryptocurrency markets. Current signals suggest a dovish stance may benefit risk assets including crypto. Key levels to watch and timing considerations for the next quarter.",
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=300&fit=crop',
      engagement: {
        likes: 3200,
        shares: 289,
        comments: 123,
        views: 15800,
      },
      earnings: '58.7 FPT',
      category: 'Macroeconomics',
      isFollowing: true,
    },
  ];

  const handleShare = (content: any) => {
    setSelectedContent({
      title: content.content,
      creator: content.creator,
      estimatedEarnings: '2.4 FPT',
    });
    setShowShareModal(true);
  };

  const handleShareComplete = () => {
    setShowShareModal(false);
  };

  const handleTip = (post: any) => {
    setSelectedCreator({
      handle: post.handle,
      name: post.creator,
      postTitle: post.content,
      postId: `post-${post.id}`,
      isVerified: post.badge === 'Platinum Creator',
    });
    setShowSupportModal(true);
  };

  const handleTipSubmit = (amount: number, message?: string, postId?: string) => {
    console.log(`Tip: ${amount} FPT to ${selectedCreator?.handle}`, { message, postId });
  };

  const handleSubscribe = (postId?: string) => {
    console.log(`Subscribed to ${selectedCreator?.handle}`, { postId });
  };

  const renderFeedPost = (post: any) => (
    <Card key={post.id} className={`${cardClasses} transition-colors`}>
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold">{post.creator.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`${textClasses} font-semibold`}>{post.creator}</span>
                <Badge
                  className={`text-xs ${
                    post.badge === 'Platinum Creator'
                      ? 'bg-purple-500 text-white'
                      : post.badge === 'Gold Creator'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-500 text-white'
                  }`}
                >
                  {post.badge}
                </Badge>
                {post.isFollowing && <Badge className="bg-blue-600 text-white text-xs">Following</Badge>}
                {post.isRecommended && <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>}
              </div>
              <div className={`flex items-center space-x-2 ${mutedText} text-sm`}>
                <span>{post.handle}</span>
                <span>•</span>
                <span>{post.timeAgo}</span>
                <span>•</span>
                <Badge className="bg-blue-600 text-white text-xs">{post.category}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className={`${mutedText} hover:${textClasses}`}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className={`${textClasses} font-semibold text-xl mb-3`}>{post.content}</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{post.description}</p>
        </div>

        {/* Image */}
        {post.image && (
          <div className="mb-4">
            <img src={post.image} alt={post.content} className="w-full h-80 rounded-lg object-cover" />
          </div>
        )}

        {/* Engagement Stats */}
        <div className={`flex items-center justify-between ${mutedText} text-sm mb-4`}>
          <div className="flex items-center space-x-4">
            <span>{post.engagement.views.toLocaleString()} views</span>
            <span>{post.engagement.comments} comments</span>
            <span>{post.engagement.shares} shares</span>
          </div>
          <span className="text-green-400 font-semibold">Earned: {post.earnings}</span>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-8">
            <button className={`flex items-center space-x-2 ${mutedText} hover:text-red-400 transition-colors`}>
              <Heart className="w-5 h-5" />
              <span>{post.engagement.likes}</span>
            </button>
            <button className={`flex items-center space-x-2 ${mutedText} hover:text-blue-400 transition-colors`}>
              <MessageCircle className="w-5 h-5" />
              <span>{post.engagement.comments}</span>
            </button>
            <button className={`flex items-center space-x-2 ${mutedText} hover:text-green-400 transition-colors`}>
              <Repeat2 className="w-5 h-5" />
              <span>{post.engagement.shares}</span>
            </button>
            <button
              className={`flex items-center space-x-2 ${mutedText} hover:text-yellow-400 transition-colors`}
              onClick={() => handleShare(post)}
            >
              <Share2 className="w-5 h-5" />
              <span>Share & Earn</span>
            </button>
          </div>
          <button
            className={`${mutedText} hover:text-yellow-400 transition-colors flex items-center space-x-2`}
            title="Tip"
            aria-label="Tip"
            onClick={() => handleTip(post)}
          >
            <HandCoins className="w-5 h-5" />
            <span className="text-base">Tip</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`min-h-screen ${bgClasses}`}>
      <section className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Main grid with sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - 1/4 width */}
          <div className="lg:col-span-1" data-tour="start-creating">
            <FeedSidebar isDarkMode={isDarkMode} onNavigate={onNavigate} />
          </div>

          {/* Main Content Area - 2/4 width */}
          <div className="lg:col-span-2 space-y-8" data-tour="feed-content">
            {/* Feed Header - Simplified */}
            <div className="flex items-center space-x-4">
              <h2 className={`text-2xl font-bold ${textClasses}`}>Your Feed</h2>
              <Badge className="bg-yellow-600 text-black text-sm">Personalized</Badge>
            </div>

            {/* Feed Posts */}
            <div className="space-y-6">{feedPosts.map(renderFeedPost)}</div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className={buttonClasses}>
                Load More Posts
              </Button>
            </div>
          </div>

          {/* Right Sidebar - 1/4 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Embedded Earnings Tracker */}
            <div data-tour="earnings-tracker">
              <EarningsTracker
                isVisible={true}
                onClose={() => {}}
                onNavigate={onNavigate}
                isEmbedded={true}
                isDarkMode={isDarkMode}
                customEarnings={earningsAmount}
              />
            </div>

            <UserInterests isDarkMode={isDarkMode} />

            {/* New Who to Follow panel */}
            <WhoToFollow isDarkMode={isDarkMode} />

            <TopCreators isDarkMode={isDarkMode} />
            <TopSharers isDarkMode={isDarkMode} />
            <TopComments isDarkMode={isDarkMode} />
            <TrendingTopics isDarkMode={isDarkMode} />

            {/* UserStats moved to bottom */}
            <UserStats
              isDarkMode={isDarkMode}
              showStats={['Following', 'Content Shared', 'Tips Received']}
            />
          </div>
        </div>
      </section>

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onStartTour={handleStartTour}
        isDarkMode={isDarkMode}
      />

      {/* Onboarding Tour */}
      <OnboardingTour 
        isActive={showTour}
        onComplete={handleTourComplete}
        onSkip={handleSkipTour}
        isDarkMode={isDarkMode}
        onEarningsUpdate={handleEarningsUpdate}
      />

      {/* Share Modal */}
      {showShareModal && selectedContent && (
        <ShareEarnFlow post={selectedContent} onClose={() => setShowShareModal(false)} onShare={handleShareComplete} />
      )}

      {/* Support Modal */}
      {showSupportModal && selectedCreator && (
        <SupportCreatorModal
          isOpen={showSupportModal}
          onClose={() => setShowSupportModal(false)}
          creatorHandle={selectedCreator.handle}
          creatorName={selectedCreator.name}
          postTitle={selectedCreator.postTitle}
          postId={selectedCreator.postId}
          onTip={handleTipSubmit}
          onSubscribe={handleSubscribe}
          isDarkMode={isDarkMode}
          isVerified={selectedCreator.isVerified}
          followerCount="1.2K"
        />
      )}
    </div>
  );
};

export default UserFeed;
