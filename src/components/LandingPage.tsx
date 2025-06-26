import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, DollarSign, Star, ChevronDown, Play, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import MarketOverview from './MarketOverview';
import FinalCTA from './FinalCTA';

interface LandingPageProps {
  onNavigate?: (screen: number, symbol?: string) => void;
  isDarkMode?: boolean;
}

const LandingPage = ({ onNavigate, isDarkMode: propIsDarkMode }: LandingPageProps) => {
  const navigate = useNavigate();
  const themeContext = useTheme();
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : themeContext.isDarkMode;

  const [isDemo, setIsDemo] = useState(false);
  const [isTickerVisible, setIsTickerVisible] = useState(true);

  useEffect(() => {
    // Simulate demo mode
    if (window.location.search.includes('demo=true')) {
      setIsDemo(true);
    }

    // Hide ticker bar on small screens
    const handleResize = () => {
      setIsTickerVisible(window.innerWidth >= 640);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const background = isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black';
  const card = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const outlineButtonClasses = isDarkMode
    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900';

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleJoinNow = () => {
    navigate('/signup');
  };

  const handleExploreMarkets = () => {
    navigate('/stockchartdata');
  };

  const handleViewFeed = () => {
    navigate('/feed');
  };

  return (
    <div className={`min-h-screen ${background}`}>
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Unlock Financial Freedom
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            Join FinancialPress and revolutionize the way you invest and earn in the crypto world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-fpYellow hover:bg-fpYellowDark text-black font-bold px-8 py-4 text-lg"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`${outlineButtonClasses} font-bold px-8 py-4 text-lg`}
              onClick={handleExploreMarkets}
            >
              Explore Markets
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Empowering Your Financial Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <Card className={card}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">AI-Driven Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500">
                  Leverage cutting-edge AI to make smarter investment decisions.
                </CardDescription>
                <TrendingUp className="w-10 h-10 mx-auto mt-4 text-yellow-500" />
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className={card}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Connect & Collaborate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500">
                  Join a vibrant community of investors and creators.
                </CardDescription>
                <Users className="w-10 h-10 mx-auto mt-4 text-blue-500" />
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className={card}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Monetize Your Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500">
                  Earn crypto by sharing your financial insights and analysis.
                </CardDescription>
                <DollarSign className="w-10 h-10 mx-auto mt-4 text-green-500" />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-fpYellow hover:bg-fpYellowDark text-black font-bold px-8 py-4"
            onClick={handleJoinNow}
          >
            Join FinancialPress Today
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className={card}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">1. Sign Up</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500">
                  Create your free account and set up your profile.
                </CardDescription>
                <Star className="w-10 h-10 mx-auto mt-4 text-yellow-500" />
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className={card}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">2. Create Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500">
                  Share your insights, analysis, and market predictions.
                </CardDescription>
                <TrendingUp className="w-10 h-10 mx-auto mt-4 text-blue-500" />
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className={card}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">3. Earn Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500">
                  Get rewarded with crypto for your valuable contributions.
                </CardDescription>
                <DollarSign className="w-10 h-10 mx-auto mt-4 text-green-500" />
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className={card}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">4. Grow Your Network</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500">
                  Connect with fellow investors and expand your reach.
                </CardDescription>
                <Users className="w-10 h-10 mx-auto mt-4 text-purple-500" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MarketOverview isDarkMode={isDarkMode} onNavigate={(screen, symbol) => {
        if (screen === 6) navigate(`/stockchartdata?symbol=${symbol || ''}`);
      }} />
      
      <FinalCTA isDarkMode={isDarkMode} onNavigate={handleGetStarted} />
    </div>
  );
};

export default LandingPage;
