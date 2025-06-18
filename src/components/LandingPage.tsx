import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign, Star, MessageCircle, Share2, Eye, Clock, ArrowUp, Heart, Repeat2, HandCoins, MoreHorizontal } from 'lucide-react';
import TrendingTopics from '@/components/feed/TrendingTopics';
import TopCreators from '@/components/feed/TopCreators';
import TopSharers from '@/components/feed/TopSharers';
import TopComments from '@/components/feed/TopComments';
import UserStats from '@/components/feed/UserStats';
import QuickActions from '@/components/feed/QuickActions';
import LiveFeedSection from '@/components/feed/LiveFeedSection';
import SupportCreatorModal from '@/components/modals/SupportCreatorModal';
import ShareEarnFlow from '@/components/ShareEarnFlow';

interface LandingPageProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const LandingPage = ({ onNavigate, isDarkMode = true }: LandingPageProps) => {
  const [newsFilter, setNewsFilter] = useState<'latest' | 'trending'>('latest');
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-black text-white"
    : "min-h-screen bg-gray-50 text-black";

  const heroTextClasses = isDarkMode
    ? "text-lg text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
    : "text-lg text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed";

  return (
    <div className={themeClasses}>
      <section className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
            Join FinancialPress
          </h1>
          <p className="text-lg font-semibold text-gray-300 mb-4">
            Create. Stream. Share. Earn.
          </p>
          <p className={heroTextClasses}>
            Real-time insights. Verified contributors. Tokenized rewards.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3"
              onClick={() => onNavigate?.(1)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
      <LiveFeedSection isDarkMode={isDarkMode} />
    </div>
  );
};

export default LandingPage;
