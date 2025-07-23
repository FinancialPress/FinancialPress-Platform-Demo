import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign, Star, MessageCircle, Share2, Eye, Clock, ArrowUp, Heart, Repeat2, HandCoins, Play, Chrome, Facebook, Twitter, Instagram, Linkedin, Youtube, Calendar } from 'lucide-react';
import TrendingTopics from '@/components/feed/TrendingTopics';
import TopCreators from '@/components/feed/TopCreators';
import TopSharers from '@/components/feed/TopSharers';
import TopComments from '@/components/feed/TopComments';
import UserStats from '@/components/feed/UserStats';
import LiveFeedSection from '@/components/feed/LiveFeedSection';
import MarketOverview from '@/components/MarketOverview';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import ShareEarnFlow from '@/components/ShareEarnFlow';
import { useAuth } from '@/contexts/AuthContext';
import { useUserMode } from '@/hooks/useUserMode';
import { useTheme } from '@/contexts/ThemeContext';

interface LandingPageProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const LandingPage = ({ onNavigate, isDarkMode = true }: LandingPageProps) => {
  const { user } = useAuth();
  const { isLiveUser } = useUserMode();
  const { isDarkMode: themeIsDarkMode } = useTheme();
  const [newsFilter, setNewsFilter] = useState<'latest' | 'trending'>('latest');
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  // Determine if hero section should be shown
  // Show hero section only for unauthenticated users or demo users (not real logged-in users)
  const showHeroSection = !user || !isLiveUser;

  // Get originator icon for articles
  const getOriginatorIcon = (itemId: number) => {
    const icons = [
      { icon: Chrome, name: 'Web' },
      { icon: Facebook, name: 'Facebook' },
      { icon: Twitter, name: 'Twitter' },
      { icon: Instagram, name: 'Instagram' },
      { icon: Linkedin, name: 'LinkedIn' },
      { icon: Youtube, name: 'YouTube' },
    ];
    
    const iconIndex = itemId % icons.length;
    return icons[iconIndex];
  };

  // Generate static date/time for articles in the format "Jun 28, 2025, 03:55 PM"
  const getStaticDateTime = (itemId: number) => {
    // Generate different dates for variety
    const dates = [
      "Jun 28, 2025, 03:55 PM",
      "Jun 28, 2025, 02:30 PM", 
      "Jun 28, 2025, 01:15 PM",
      "Jun 28, 2025, 12:45 PM",
      "Jun 28, 2025, 11:20 PM",
      "Jun 27, 2025, 10:30 PM"
    ];
    
    return dates[itemId % dates.length];
  };

  // Latest News Content by Sector
  const latestNewsBySector = {
    stockMarket: [
      {
        id: 1,
        title: "S and P 500 Hits New Record High as Tech Stocks Rally",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop",
        category: "STOCKS",
        author: "Sarah Chen",
        handle: "@sarahchen",
        badge: "Gold Creator",
        timeAgo: "2h",
        views: "24.5K",
        comments: 67,
        shares: 134,
        likes: 2100,
        earnings: "42.8",
        type: "news",
        isVideo: false
      },
      {
        id: 2,
        title: "Apple Stock Analysis: Q4 Earnings Preview",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop",
        category: "EARNINGS",
        author: "Mike Rodriguez",
        handle: "@mikerodriguez",
        badge: "Platinum Creator",
        timeAgo: "2h",
        views: "18.2K",
        comments: 89,
        shares: 167,
        likes: 1890,
        earnings: "38.5",
        type: "analysis",
        isVideo: true
      },
      {
        id: 3,
        title: "Banking Sector Shows Strong Recovery Signals",
        image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=300&h=200&fit=crop",
        category: "BANKING",
        author: "Lisa Park",
        handle: "@lisapark",
        badge: "Silver Creator",
        timeAgo: "3h",
        views: "15.7K",
        comments: 45,
        shares: 98,
        likes: 1560,
        earnings: "31.2",
        type: "news",
        isVideo: false
      }
    ],
    cryptoMarket: [
      {
        id: 4,
        title: "Bitcoin Traders Now See $107K Retest Before New All-Time Highs",
        image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=300&h=200&fit=crop",
        category: "BITCOIN",
        author: "William Suberg",
        handle: "@williamsuberg",
        badge: "Gold Creator",
        timeAgo: "1h",
        views: "28.3K",
        comments: 78,
        shares: 189,
        likes: 2450,
        earnings: "48.2",
        type: "market",
        isVideo: false
      },
      {
        id: 5,
        title: "Ethereum Layer 2 Solutions Drive Record TVL Growth",
        image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=300&h=200&fit=crop",
        category: "ETHEREUM",
        author: "L2 Analytics",
        handle: "@l2analytics",
        badge: "Platinum Creator",
        timeAgo: "2h",
        views: "19.4K",
        comments: 56,
        shares: 134,
        likes: 1980,
        earnings: "41.3",
        type: "defi",
        isVideo: true
      },
      {
        id: 6,
        title: "DeFi Protocol Launches Revolutionary Staking Mechanism",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop",
        category: "DEFI",
        author: "DeFi Weekly",
        handle: "@defiweekly",
        badge: "Gold Creator",
        timeAgo: "4h",
        views: "14.2K",
        comments: 43,
        shares: 87,
        likes: 1650,
        earnings: "34.8",
        type: "defi",
        isVideo: false
      }
    ],
    globalMarkets: [
      {
        id: 7,
        title: "Swift Legislation Turns Kyrgyzstan into Central Asia's Primary Crypto Hub",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=200&fit=crop",
        category: "REGULATION",
        author: "Regulatory Desk",
        handle: "@regulatorydesk",
        badge: "Gold Creator",
        timeAgo: "2h",
        views: "12.8K",
        comments: 34,
        shares: 67,
        likes: 1280,
        earnings: "28.7",
        type: "regulation",
        isVideo: false
      },
      {
        id: 8,
        title: "European Markets Rally on ECB Policy Decision",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=200&fit=crop",
        category: "EUROPE",
        author: "Euro Markets",
        handle: "@euromarkets",
        badge: "Silver Creator",
        timeAgo: "3h",
        views: "16.5K",
        comments: 52,
        shares: 103,
        likes: 1450,
        earnings: "32.1",
        type: "markets",
        isVideo: true
      },
      {
        id: 9,
        title: "Asian Stock Markets Open Higher on Trade Optimism",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=200&fit=crop",
        category: "ASIA",
        author: "Asia Pacific",
        handle: "@asiapacific",
        badge: "Gold Creator",
        timeAgo: "5h",
        views: "11.3K",
        comments: 38,
        shares: 74,
        likes: 1120,
        earnings: "25.4",
        type: "markets",
        isVideo: false
      }
    ],
    aiTech: [
      {
        id: 10,
        title: "AI-Powered Trading Bots Show 67% Success Rate",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
        category: "AI TRADING",
        author: "AI Finance",
        handle: "@aifinance",
        badge: "Platinum Creator",
        timeAgo: "1h",
        views: "22.1K",
        comments: 89,
        shares: 178,
        likes: 2340,
        earnings: "47.8",
        type: "ai",
        isVideo: true
      },
      {
        id: 11,
        title: "Blockchain Adoption in Healthcare Reaches New Milestone",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
        category: "BLOCKCHAIN",
        author: "MedTech News",
        handle: "@medtechnews",
        badge: "Silver Creator",
        timeAgo: "3h",
        views: "13.7K",
        comments: 41,
        shares: 89,
        likes: 1370,
        earnings: "29.4",
        type: "healthcare",
        isVideo: false
      },
      {
        id: 12,
        title: "Web3 Gaming Tokens See Massive Surge in Trading Volume",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
        category: "GAMING",
        author: "GameFi Report",
        handle: "@gamefireport",
        badge: "Gold Creator",
        timeAgo: "4h",
        views: "18.9K",
        comments: 67,
        shares: 145,
        likes: 1890,
        earnings: "39.2",
        type: "gaming",
        isVideo: false
      }
    ],
    economy: [
      {
        id: 13,
        title: "Central Bank Digital Currencies: The Race Heats Up",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
        category: "CBDC",
        author: "Policy Watch",
        handle: "@policywatch",
        badge: "Silver Creator",
        timeAgo: "2h",
        views: "14.7K",
        comments: 56,
        shares: 112,
        likes: 1470,
        earnings: "31.6",
        type: "policy",
        isVideo: false
      },
      {
        id: 14,
        title: "Federal Reserve Signals Potential Rate Changes",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
        category: "FED POLICY",
        author: "Fed Tracker",
        handle: "@fedtracker",
        badge: "Platinum Creator",
        timeAgo: "3h",
        views: "20.5K",
        comments: 78,
        shares: 156,
        likes: 2050,
        earnings: "43.2",
        type: "policy",
        isVideo: true
      },
      {
        id: 15,
        title: "Inflation Data Shows Continued Moderation",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=200&fit=crop",
        category: "INFLATION",
        author: "Economic Data",
        handle: "@economicdata",
        badge: "Gold Creator",
        timeAgo: "4h",
        views: "16.8K",
        comments: 45,
        shares: 89,
        likes: 1680,
        earnings: "35.7",
        type: "economics",
        isVideo: false
      }
    ]
  };

  // Trending News Content by Sector (Higher engagement metrics)
  const trendingNewsBySector = {
    stockMarket: [
      {
        id: 101,
        title: "Tesla Stock Surges 15% on Autonomous Vehicle Breakthrough",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
        category: "TESLA",
        author: "Tech Analyst",
        handle: "@techanalyst",
        badge: "Platinum Creator",
        timeAgo: "30m",
        views: "45.2K",
        comments: 234,
        shares: 567,
        likes: 4520,
        earnings: "89.4",
        type: "breaking",
        isVideo: true
      },
      {
        id: 102,
        title: "NVIDIA Earnings Beat Expectations by 25%",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
        category: "EARNINGS",
        author: "Chip Watcher",
        handle: "@chipwatcher",
        badge: "Gold Creator",
        timeAgo: "45m",
        views: "38.7K",
        comments: 189,
        shares: 423,
        likes: 3870,
        earnings: "76.8",
        type: "earnings",
        isVideo: false
      },
      {
        id: 103,
        title: "Market Volatility Creates Buying Opportunities",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=200&fit=crop",
        category: "ANALYSIS",
        author: "Market Pro",
        handle: "@marketpro",
        badge: "Platinum Creator",
        timeAgo: "1h",
        views: "32.1K",
        comments: 145,
        shares: 298,
        likes: 3210,
        earnings: "64.2",
        type: "analysis",
        isVideo: false
      }
    ],
    cryptoMarket: [
      {
        id: 104,
        title: "Elon Musk Dogecoin Pump Incoming? SOL Tipped to Hit $300 in 2025",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=300&h=200&fit=crop",
        category: "ALTCOINS",
        author: "Crypto Insider",
        handle: "@cryptoinsider",
        badge: "Platinum Creator",
        timeAgo: "20m",
        views: "52.3K",
        comments: 312,
        shares: 689,
        likes: 5230,
        earnings: "98.7",
        type: "analysis",
        isVideo: false
      },
      {
        id: 105,
        title: "Institutional Bitcoin Holdings Reach All-Time High",
        image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=300&h=200&fit=crop",
        category: "BITCOIN",
        author: "Whale Watch",
        handle: "@whalewatch",
        badge: "Gold Creator",
        timeAgo: "1h",
        views: "41.6K",
        comments: 203,
        shares: 456,
        likes: 4160,
        earnings: "82.3",
        type: "institutional",
        isVideo: true
      },
      {
        id: 106,
        title: "Cross-Chain Bridge Security Gets Major Upgrade",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
        category: "SECURITY",
        author: "Security Pro",
        handle: "@securitypro",
        badge: "Silver Creator",
        timeAgo: "2h",
        views: "28.9K",
        comments: 134,
        shares: 267,
        likes: 2890,
        earnings: "57.8",
        type: "security",
        isVideo: false
      }
    ],
    globalMarkets: [
      {
        id: 107,
        title: "China Markets Rally on Stimulus Package Announcement",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=200&fit=crop",
        category: "CHINA",
        author: "Asia Markets",
        handle: "@asiamarkets",
        badge: "Platinum Creator",
        timeAgo: "40m",
        views: "34.8K",
        comments: 167,
        shares: 345,
        likes: 3480,
        earnings: "69.6",
        type: "breaking",
        isVideo: true
      },
      {
        id: 108,
        title: "European Union Approves New Digital Asset Framework",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=200&fit=crop",
        category: "REGULATION",
        author: "EU Observer",
        handle: "@euobserver",
        badge: "Gold Creator",
        timeAgo: "2h",
        views: "26.3K",
        comments: 123,
        shares: 234,
        likes: 2630,
        earnings: "52.6",
        type: "regulation",
        isVideo: false
      },
      {
        id: 109,
        title: "Emerging Markets Show Strong Recovery Signals",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=200&fit=crop",
        category: "EMERGING",
        author: "EM Tracker",
        handle: "@emtracker",
        badge: "Silver Creator",
        timeAgo: "3h",
        views: "19.7K",
        comments: 89,
        shares: 167,
        likes: 1970,
        earnings: "39.4",
        type: "markets",
        isVideo: false
      }
    ],
    aiTech: [
      {
        id: 110,
        title: "ChatGPT Integration Transforms Financial Analytics",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
        category: "AI FINANCE",
        author: "AI Revolution",
        handle: "@airevolution",
        badge: "Platinum Creator",
        timeAgo: "25m",
        views: "48.5K",
        comments: 289,
        shares: 578,
        likes: 4850,
        earnings: "97.0",
        type: "ai",
        isVideo: true
      },
      {
        id: 111,
        title: "Metaverse Land Sales Hit Record High This Month",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop",
        category: "METAVERSE",
        author: "Virtual World",
        handle: "@virtualworld",
        badge: "Gold Creator",
        timeAgo: "1h",
        views: "35.2K",
        comments: 178,
        shares: 356,
        likes: 3520,
        earnings: "70.4",
        type: "metaverse",
        isVideo: false
      },
      {
        id: 112,
        title: "Quantum Computing Breakthrough Impacts Crypto Security",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop",
        category: "QUANTUM",
        author: "Quantum Tech",
        handle: "@quantumtech",
        badge: "Silver Creator",
        timeAgo: "2h",
        views: "27.6K",
        comments: 134,
        shares: 245,
        likes: 2760,
        earnings: "55.2",
        type: "technology",
        isVideo: false
      }
    ],
    economy: [
      {
        id: 113,
        title: "Fed Chair Signals Aggressive Rate Cut Strategy",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
        category: "BREAKING",
        author: "Fed Insider",
        handle: "@fedinsider",
        badge: "Platinum Creator",
        timeAgo: "15m",
        views: "56.8K",
        comments: 345,
        shares: 712,
        likes: 5680,
        earnings: "113.6",
        type: "breaking",
        isVideo: false
      },
      {
        id: 114,
        title: "Employment Data Exceeds All Expectations",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        category: "EMPLOYMENT",
        author: "Labor Watch",
        handle: "@laborwatch",
        badge: "Gold Creator",
        timeAgo: "1h",
        views: "42.3K",
        comments: 234,
        shares: 467,
        likes: 4230,
        earnings: "84.6",
        type: "economics",
        isVideo: true
      },
      {
        id: 115,
        title: "Global Supply Chain Disruptions Create New Opportunities",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop",
        category: "SUPPLY CHAIN",
        author: "Trade Analysis",
        handle: "@tradeanalysis",
        badge: "Silver Creator",
        timeAgo: "2h",
        views: "31.4K",
        comments: 156,
        shares: 289,
        likes: 3140,
        earnings: "62.8",
        type: "trade",
        isVideo: false
      }
    ]
  };

  const liveStats = [
    { label: "Active Creators", value: "2,847", icon: Users, color: "text-green-400" },
    { label: "Total Rewards Paid", value: "$2.5M", icon: DollarSign, color: "text-yellow-400" },
    { label: "Content Pieces", value: "500K+", icon: Star, color: "text-purple-400" },
    { label: "Success Rate", value: "89%", icon: Award, color: "text-blue-400" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'stocks': case 'tesla': case 'earnings': case 'banking': case 'analysis': return 'bg-blue-600';
      case 'bitcoin': case 'ethereum': case 'defi': case 'altcoins': return 'bg-orange-600';
      case 'regulation': case 'europe': case 'asia': case 'china': case 'emerging': return 'bg-red-600';
      case 'ai trading': case 'ai finance': case 'blockchain': case 'gaming': case 'metaverse': case 'quantum': return 'bg-purple-600';
      case 'cbdc': case 'fed policy': case 'inflation': case 'breaking': case 'employment': case 'supply chain': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Platinum Creator': return 'bg-purple-500 text-white';
      case 'Gold Creator': return 'bg-yellow-500 text-black';
      case 'Silver Creator': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleShare = (content: any) => {
    setSelectedContent({
      title: content.title,
      creator: content.author,
      estimatedEarnings: "2.4 FPT"
    });
    setShowShareModal(true);
  };

  const handleShareComplete = () => {
    setShowShareModal(false);
  };

  const handleTip = (creatorData: any, postTitle: string) => {
    setSelectedCreator({
      handle: creatorData.handle,
      name: creatorData.author,
      postTitle: postTitle,
      postId: `post-${Date.now()}`,
      isVerified: creatorData.badge === 'Platinum Creator'
    });
    setShowSupportModal(true);
  };

  const handleTipSubmit = (amount: number, message?: string, postId?: string) => {
    console.log(`Tip: ${amount} FPT to ${selectedCreator?.handle}`, { message, postId });
  };

  const handleSubscribe = (postId?: string) => {
    console.log(`Subscribed to ${selectedCreator?.handle}`, { postId });
  };

  // Get current content based on filter
  const currentContent = newsFilter === 'latest' ? latestNewsBySector : trendingNewsBySector;

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-black text-white"
    : "min-h-screen bg-gray-50 text-black";

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const textClasses = isDarkMode 
    ? "text-gray-300"
    : "text-gray-600";

  const heroTextClasses = isDarkMode
    ? "text-base sm:text-lg text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed px-4"
    : "text-base sm:text-lg text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed px-4";

  const newsHeaderClasses = isDarkMode
    ? "text-xl sm:text-2xl font-bold text-white"
    : "text-xl sm:text-2xl font-bold text-black";

  const newsButtonClasses = (isActive: boolean) => {
    if (isActive) {
      return "bg-yellow-500 text-black hover:bg-yellow-600 text-xs sm:text-sm px-3 sm:px-4";
    }
    return isDarkMode 
      ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white text-xs sm:text-sm px-3 sm:px-4"
      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 font-semibold text-xs sm:text-sm px-3 sm:px-4";
  };

  const loadMoreButtonClasses = isDarkMode
    ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-white";

  const sidebarHeaderClasses = isDarkMode
    ? "text-base sm:text-lg font-semibold text-white"
    : "text-base sm:text-lg font-semibold text-black";

  const statCardTextClasses = isDarkMode
    ? "text-lg sm:text-xl font-bold text-white"
    : "text-lg sm:text-xl font-bold text-black";

  const renderContentCard = (item: any) => {
    const staticDateTime = getStaticDateTime(item.id);
    const originatorIcon = getOriginatorIcon(item.id);
    const isFinancialPressPost = item.id % 4 === 0; // Every 4th post uses Financial Press logo

    return (
      <Card key={item.id} className={`${cardClasses} hover:border-gray-700 transition-colors w-full`}>
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={item.image}
              alt={item.title}
              className="w-full h-24 sm:h-32 object-cover"
            />
            <Badge className={`absolute top-1 sm:top-2 left-1 sm:left-2 ${getCategoryColor(item.category)} text-white text-xs`}>
              {item.category}
            </Badge>
            {item.isVideo && (
              <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-black bg-opacity-60 rounded-full p-1">
                <Play className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="white" />
              </div>
            )}
            {/* Originator Icon */}
            <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2">
              {isFinancialPressPost ? (
                <img 
                  src="/lovable-uploads/36c32632-76d5-49c6-bb65-079fe61ba5f0.png" 
                  alt="Financial Press" 
                  className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full p-1"
                />
              ) : (
                <div className="bg-white rounded-full p-1">
                  <originatorIcon.icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                </div>
              )}
            </div>
          </div>
          <div className="p-2 sm:p-3">
            {/* Author Header - Compact */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1 min-w-0 flex-1">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-xs">{item.author.charAt(0)}</span>
                </div>
                <span className={`font-medium text-xs truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.author}</span>
                <Badge className={`text-xs hidden sm:inline-block ${getBadgeColor(item.badge)}`}>
                  {item.badge.split(' ')[0]}
                </Badge>
              </div>
              <span className={`text-xs ${textClasses} flex-shrink-0`}>{item.timeAgo}</span>
            </div>

            <h3 className={`font-semibold text-xs sm:text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.title}</h3>
            
            {/* Engagement Stats */}
            <div className={`flex items-center justify-between text-xs mb-2 ${textClasses}`}>
              <div className="flex items-center space-x-2">
                <span className="truncate">{item.views} views</span>
              </div>
              <div className="text-green-400 font-semibold text-center flex-shrink-0">
                <span className="text-xs sm:text-sm">{item.earnings} FPT Earned</span>
              </div>
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto">
                <button className={`flex items-center space-x-1 ${textClasses} hover:text-red-400 transition-colors flex-shrink-0`}>
                  <Heart className="w-3 h-3" />
                  <span className="text-xs hidden sm:inline">{item.likes}</span>
                </button>
                <button className={`flex items-center space-x-1 ${textClasses} hover:text-blue-400 transition-colors flex-shrink-0`}>
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-xs hidden sm:inline">{item.comments}</span>
                </button>
                <button className={`flex items-center space-x-1 ${textClasses} hover:text-green-400 transition-colors flex-shrink-0`}>
                  <Repeat2 className="w-3 h-3" />
                  <span className="text-xs hidden sm:inline">{item.shares}</span>
                </button>
                <button 
                  className={`flex items-center space-x-1 ${textClasses} hover:text-yellow-400 transition-colors flex-shrink-0`}
                  onClick={() => handleShare(item)}
                >
                  <Share2 className="w-3 h-3" />
                  <span className="text-xs hidden sm:inline">Share</span>
                </button>
              </div>
              <button 
                className={`flex items-center space-x-1 ${textClasses} hover:text-yellow-400 transition-colors flex-shrink-0`}
                title="Tip"
                aria-label="Tip"
                onClick={() => handleTip(item, item.title)}
              >
                <HandCoins className="w-3 h-3" />
                <span className="text-xs hidden sm:inline">Tip</span>
              </button>
            </div>

            {/* Date and Time Strip - Updated format with calendar icon and left-aligned */}
            <div className={`mt-3 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-xs ${textClasses}`}>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{staticDateTime}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSection = (title: string, posts: any[]) => (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-0">
        <h2 className={newsHeaderClasses}>{title}</h2>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm font-semibold rounded px-2 sm:px-3 py-1 h-auto">
          See All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-4 sm:px-0">
        {posts.map(renderContentCard)}
      </div>
    </div>
  );

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden`}>
      {/* Hero Section - Only show for unauthenticated users or demo users */}
      {showHeroSection && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-4">
          <div className="text-center mb-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 px-4">
              Join FinancialPress
            </h1>
            <p className={heroTextClasses}>
              Real-time insights. Verified contributors. Tokenized rewards.
            </p>
            <div className="flex justify-center mb-4 px-4">
              <Button 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                onClick={() => onNavigate?.(1)}
              >
                Get Started
              </Button>
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-400 mt-2 mb-2 px-4">
              Post. Stream. Share. Earn.
            </p>
          </div>
        </section>
      )}

      {/* Content Layout */}
      <div className="max-w-[1440px] mx-auto px-0 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Main Content Area - 3/4 width on desktop, full width on mobile */}
          <div className="lg:col-span-3 w-full">
            {/* Live Feed Section - Direct display without tabs */}
            <div className="mb-6 sm:mb-8">
              <LiveFeedSection isDarkMode={isDarkMode} />
            </div>

            {/* Markets Overview Section */}
            <div className="mb-6 sm:mb-8">
              <MarketOverview isDarkMode={isDarkMode} />
            </div>

            {/* News Section with Filters */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-0">
                <h2 className="text-lg sm:text-2xl font-bold text-yellow-400">Featured News & Analysis</h2>
                <div className="flex space-x-1 sm:space-x-2">
                  <Button
                    variant={newsFilter === 'latest' ? 'default' : 'outline'}
                    size="sm"
                    className={newsButtonClasses(newsFilter === 'latest')}
                    onClick={() => setNewsFilter('latest')}
                  >
                    Latest
                  </Button>
                  <Button
                    variant={newsFilter === 'trending' ? 'default' : 'outline'}
                    size="sm"
                    className={newsButtonClasses(newsFilter === 'trending')}
                    onClick={() => setNewsFilter('trending')}
                  >
                    Trending
                  </Button>
                </div>
              </div>

              {/* Categorized News Sections - showing just a few for mobile */}
              <div className="space-y-6 sm:space-y-8">
                {/* Show all sections but fewer items on mobile */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Stock Market Section - Show 2 items on mobile, 3 on desktop */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-0">
                      <h2 className={newsHeaderClasses}>Stock Market</h2>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm font-semibold rounded px-2 sm:px-3 py-1 h-auto">
                        See All
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-4 sm:px-0">
                      {(newsFilter === 'latest' ? latestNewsBySector.stockMarket : trendingNewsBySector.stockMarket)
                        .slice(0, window.innerWidth < 640 ? 2 : 3)
                        .map(renderContentCard)}
                    </div>
                  </div>

                  {/* Crypto Market Section */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-0">
                      <h2 className={newsHeaderClasses}>Crypto Market</h2>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm font-semibold rounded px-2 sm:px-3 py-1 h-auto">
                        See All
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-4 sm:px-0">
                      {(newsFilter === 'latest' ? latestNewsBySector.cryptoMarket : trendingNewsBySector.cryptoMarket)
                        .slice(0, window.innerWidth < 640 ? 2 : 3)
                        .map(renderContentCard)}
                    </div>
                  </div>

                  {/* Show fewer sections on mobile */}
                  <div className="hidden sm:block space-y-6 sm:space-y-8">
                    {renderSection("Global Markets", newsFilter === 'latest' ? latestNewsBySector.globalMarkets : trendingNewsBySector.globalMarkets)}
                    {renderSection("AI and Tech", newsFilter === 'latest' ? latestNewsBySector.aiTech : trendingNewsBySector.aiTech)}
                    {renderSection("Economy", newsFilter === 'latest' ? latestNewsBySector.economy : trendingNewsBySector.economy)}
                  </div>
                </div>
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
              <Button 
                variant="outline" 
                className={`${loadMoreButtonClasses} text-sm sm:text-base px-4 sm:px-6`}
                onClick={() => onNavigate?.(1)}
              >
                Load More Content
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block space-y-2">
            {/* Top Performers Section - Consolidated */}
            <div className="space-y-2">
              <TopCreators isDarkMode={isDarkMode} />
              <TopSharers isDarkMode={isDarkMode} />
            </div>
            
            {/* Trending & Stats Combined Section */}
            <div className="space-y-2">
              <TrendingTopics isDarkMode={isDarkMode} />
              
              {/* Inline Stats - Single row */}
              <Card className={cardClasses}>
                <CardContent className="p-3">
                  <h3 className={`${sidebarHeaderClasses} text-sm mb-2`}>Platform Stats</h3>
                  <div className="grid grid-cols-2 gap-1 text-center">
                    {liveStats.slice(0, 4).map((stat, index) => (
                      <div key={index} className="py-1">
                        <div className={`${stat.color} text-xs font-bold`}>{stat.value}</div>
                        <div className={`text-xs ${textClasses}`}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && selectedContent && (
        <ShareEarnFlow 
          post={selectedContent}
          onClose={() => setShowShareModal(false)}
          onShare={handleShareComplete}
          isDarkMode={themeIsDarkMode}
        />
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

export default LandingPage;
