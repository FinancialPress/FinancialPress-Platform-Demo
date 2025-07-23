import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import { useBalance } from '../contexts/BalanceContext';
import ShareEarnFlow from './ShareEarnFlow';
import TrendingTopics from '@/components/feed/TrendingTopics';
import TopCreators from '@/components/feed/TopCreators';
import TopSharers from '@/components/feed/TopSharers';
import TopComments from '@/components/feed/TopComments';
import UserInterests from '@/components/feed/UserInterests';
import UserStats from '@/components/feed/UserStats';
import WhoToFollow from '@/components/feed/WhoToFollow';
import LeftNavigation from '@/components/feed/LeftNavigation';
import FeedPost from '@/components/feed/FeedPost';
import FeedLoadingSkeleton from '@/components/feed/FeedLoadingSkeleton';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import WelcomeModal from '@/components/modals/WelcomeModal';
import OnboardingTour from '@/components/modals/OnboardingTour';
import PostsList from '@/components/posts/PostsList';
import { generateMockFeedItem } from '@/utils/mockFeedData';
import { usePosts } from '@/hooks/usePosts';
import { useProfile } from '@/hooks/useProfile';

interface UserFeedProps {
  onNavigate?: (screen: number) => void;
  isDarkMode: boolean;
  showOnboarding?: boolean;
  onTourStateChange?: (isActive: boolean) => void;
}

const UserFeed = ({ onNavigate, isDarkMode, showOnboarding = false, onTourStateChange }: UserFeedProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(showOnboarding);
  const [showTour, setShowTour] = useState(false);
  const [isFromOnboarding, setIsFromOnboarding] = useState(showOnboarding);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Always call hooks at top level - no conditional calls
  const balanceContext = useBalance();
  const postsHook = usePosts();
  const { profile } = useProfile();
  
  // Safe access with fallbacks
  const balance = balanceContext?.balance || 0;
  const posts = postsHook?.posts || [];
  
  // Infinite scroll states
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // Initialize feed with initial posts - only run once, filtering out 'Testing Add Tokens'
  useEffect(() => {
    const initializeFeed = () => {
      const initialPosts = [
        {
          id: 1,
          creator: 'CryptoAnalyst',
          handle: '@cryptoanalyst',
          badge: 'Gold Creator',
          timeAgo: '2h',
          content: "Bitcoin Bull Run: What's Driving the $94K Rally?",
          description: 'The recent surge past $94K represents a significant psychological barrier. Key factors include increased institutional adoption, favorable regulatory news, and strong on-chain metrics. The momentum appears sustainable with support levels holding firm.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop',
          engagement: { likes: 2400, shares: 156, comments: 89, views: 12500 },
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
          description: "The DeFi landscape is evolving rapidly. Here are the protocols showing the most promise: 1) Uniswap V4 with hooks, 2) Aave's GHO stablecoin expansion, 3) Compound III growth, 4) Curve's new tokenomics, 5) Lido's staking dominance. Each represents a unique opportunity in the evolving ecosystem.",
          engagement: { likes: 1800, shares: 134, comments: 67, views: 8900 },
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
          description: 'Floor prices for top collections are showing signs of recovery. BAYC, CryptoPunks, and Azuki are leading the charge with increased trading volume and whale accumulation patterns. The market sentiment is shifting positive.',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop',
          engagement: { likes: 1200, shares: 89, comments: 45, views: 6700 },
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
          description: 'AI integration in financial services is accelerating. Companies like NVDA, MSFT, and emerging fintech players are positioning themselves for massive growth. The convergence of AI and finance presents unprecedented opportunities for investors.',
          engagement: { likes: 2100, shares: 167, comments: 78, views: 11200 },
          earnings: '42.3 FPT',
          category: 'AI and Tech',
          isRecommended: true,
        },
        {
          id: 5,
          creator: 'MacroMind',
          handle: '@macromind',
          badge: 'Platinum Creator',
          timeAgo: '1d',
          content: 'Macro Outlook: Fed Policy Impact on Crypto Markets',
          description: "The Federal Reserve's monetary policy decisions continue to significantly impact cryptocurrency markets. Current signals suggest a dovish stance may benefit risk assets including crypto. Key levels to watch and timing considerations for the next quarter.",
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=300&fit=crop',
          engagement: { likes: 3200, shares: 289, comments: 123, views: 15800 },
          earnings: '58.7 FPT',
          category: 'Macroeconomics',
          isFollowing: true,
        },
        {
          id: 8,
          creator: 'CryptoWatcher',
          handle: '@cryptowatcher',
          badge: 'Gold Creator',
          timeAgo: '2h',
          content: 'XRP Reaches All New Highs',
          description: 'XRP has surged to unprecedented levels following positive regulatory developments and increased institutional adoption. Technical analysis suggests further upside potential with strong support levels established.',
          image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=300&fit=crop',
          engagement: { likes: 4100, shares: 298, comments: 156, views: 18200 },
          earnings: '67.4 FPT',
          category: 'Crypto',
          isRecommended: true,
        },
        {
          id: 12,
          creator: 'StockAnalyst',
          handle: '@stockanalyst',
          badge: 'Platinum Creator',
          timeAgo: '4h',
          content: 'Tesla Earnings Skyrocket Q3 2025',
          description: 'Tesla has reported exceptional Q3 2025 earnings, beating analyst expectations by a significant margin. Strong vehicle delivery numbers and energy business growth driving the outstanding performance.',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop',
          engagement: { likes: 5200, shares: 387, comments: 201, views: 22500 },
          earnings: '78.9 FPT',
          category: 'Stocks',
          isFollowing: true,
        },
      ];
      setFeedItems(initialPosts);
      setPage(1);
      setIsInitialized(true);
    };

    initializeFeed();
  }, []);

  // Stable loadMore function using useCallback
  const loadMore = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, i) => 
        generateMockFeedItem(feedItems.length + i + 1)
      );
      setFeedItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setLoading(false);
      
      if (feedItems.length > 45) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, feedItems.length]);

  // Stable scroll handler using useCallback
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 1000 && hasMore && !loading) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  // Fixed scroll event listener with stable dependencies
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Show welcome modal if this is first time from onboarding
    if (showOnboarding) {
      setShowWelcomeModal(true);
      setIsFromOnboarding(true);
    } else {
      setIsFromOnboarding(false);
    }
  }, [showOnboarding]);

  useEffect(() => {
    // Add/remove body class for onboarding
    if (showTour) {
      document.body.classList.add('onboarding-active');
    } else {
      document.body.classList.remove('onboarding-active');
    }

    // Notify parent component about tour state
    onTourStateChange?.(showTour);

    return () => {
      document.body.classList.remove('onboarding-active');
    };
  }, [showTour, onTourStateChange]);

  // Show loading state until initialized
  if (!isInitialized) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
        <section className="max-w-[1440px] mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-4 rounded-lg`}>
                <div className="animate-pulse space-y-4">
                  <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
                  <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4`}></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <FeedLoadingSkeleton isDarkMode={isDarkMode} count={3} />
            </div>
            <div className="lg:col-span-1">
              <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-4 rounded-lg`}>
                <div className="animate-pulse space-y-4">
                  <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
                  <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
    // This will trigger the earnings animation in the header
    console.log('Earnings update triggered for onboarding');
  };

  const handleCreateClick = () => {
    onNavigate?.(5); // Navigate to content creator
  };

  // Detect demo mode
  const isDemoUser = profile?.username?.toLowerCase() === 'johndoe';

  // Get user avatar and display name
  const getUserAvatar = () => {
    if (!isDemoUser && profile?.image_url) {
      return profile.image_url;
    }
    return null;
  };

  const getUserInitial = () => {
    if (isDemoUser) return 'J';
    if (profile?.display_name) {
      return profile.display_name.charAt(0).toUpperCase();
    }
    if (profile?.username) {
      return profile.username.charAt(0).toUpperCase();
    }
    return 'U'; // Default fallback
  };

  const getUserDisplayName = () => {
    if (isDemoUser) return 'JD';
    return profile?.display_name || profile?.username || 'User';
  };

  // Theme-aware classes
  const bgClasses = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';

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

  return (
    <div className={`min-h-screen ${bgClasses}`} data-onboarding-active={showTour}>
      <section className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-8">
        {/* Main layout with responsive structure */}
        <div className="flex gap-4 lg:gap-8">
          {/* Left Navigation - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <LeftNavigation isDarkMode={isDarkMode} onNavigate={onNavigate} />
          </div>

          {/* Main Content Area - Full width on mobile, constrained on desktop */}
          <div className="flex-1 w-full lg:max-w-2xl space-y-6 lg:space-y-8" data-tour="feed-content">
            {/* What's on your mind textbox */}
            <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-lg p-4 sm:p-6 shadow-sm`} data-tour="whats-on-mind">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {getUserAvatar() ? (
                    <img 
                      src={getUserAvatar()!} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm sm:text-lg">{getUserInitial()}</span>
                  )}
                </div>
                <div className="flex-1 cursor-pointer" onClick={() => onNavigate?.(5)}>
                  <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'} border rounded-full px-3 py-2 sm:px-4 sm:py-3 transition-colors cursor-pointer`}>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg`}>
                      What's on your mind, {getUserDisplayName()}?
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate?.(5)}
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full p-1 sm:p-2"
                >
                  <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>
            </div>

            {/* Real Posts Section */}
            {posts.length > 0 && (
              <div className="space-y-6">
                <PostsList isDarkMode={isDarkMode} />
              </div>
            )}

            {/* Mock Feed Posts */}
            <div className="space-y-6">
              {feedItems.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  isDarkMode={isDarkMode}
                  onShare={() => handleShare(post)}
                  onTip={() => handleTip(post)}
                />
              ))}
              
              {/* Loading Skeletons */}
              {loading && (
                <FeedLoadingSkeleton isDarkMode={isDarkMode} count={3} />
              )}
              
              {/* End of feed message */}
              {!hasMore && (
                <div className="text-center py-8">
                  <p className={`${isDarkMode ? 'text-white' : 'text-black'} text-lg font-medium`}>
                    You've reached the end of your feed
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mt-2`}>
                    Check back later for more content!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile/tablet, visible on large screens */}
          <div className="hidden xl:block xl:w-80 flex-shrink-0 space-y-6" data-tour="start-creating">
            <UserInterests isDarkMode={isDarkMode} />
            <WhoToFollow isDarkMode={isDarkMode} />
            <TopCreators isDarkMode={isDarkMode} />
            <TopSharers isDarkMode={isDarkMode} />
            <TopComments isDarkMode={isDarkMode} />
            <TrendingTopics isDarkMode={isDarkMode} />
            <UserStats showStats={['Following', 'Content Shared', 'Tips Received']} isDarkMode={isDarkMode} />
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
        <ShareEarnFlow post={selectedContent} onClose={() => setShowShareModal(false)} onShare={handleShareComplete} isDarkMode={isDarkMode} />
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
