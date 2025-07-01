import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import OriginatorIcon from '@/components/ui/originator-icon';

interface LandingPageProps {
  onNavigate?: (screen: number) => void;
  isDarkMode?: boolean;
}

const LandingPage = ({ onNavigate, isDarkMode = false }: LandingPageProps) => {
  const [showDemo, setShowDemo] = useState(false);

  const handleNavigate = (screen: number) => {
    onNavigate?.(screen);
  };

  const handleToggleDemo = () => {
    setShowDemo(!showDemo);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const featuredContent = [
    {
      id: 1,
      title: "Bitcoin Breaks $94K: What's Driving This Historic Rally?",
      description: "Institutional adoption and regulatory clarity push Bitcoin to new heights. Here's what investors need to know about this unprecedented surge.",
      category: "Crypto Analysis",
      author: "Sarah Chen",
      engagement: "2.4K shares",
      earnings: "45.8 FPT",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
      originator: 'financial-press',
      createdAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 2,
      title: "DeFi Renaissance: 5 Protocols Reshaping Finance",
      description: "From Uniswap V4 to Aave's GHO expansion, discover the innovations driving the next wave of decentralized finance growth.",
      category: "DeFi",
      author: "Marcus Rodriguez",
      engagement: "1.8K shares",
      earnings: "38.2 FPT",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      originator: 'twitter',
      createdAt: '2024-01-15T12:15:00Z'
    },
    {
      id: 3,
      title: "AI Stocks Surge: NVIDIA Leads Tech Revolution",
      description: "Artificial intelligence integration accelerates across industries. Which stocks are positioned for explosive growth in 2024?",
      category: "AI & Tech",
      author: "Jennifer Liu",
      engagement: "3.1K shares",
      earnings: "52.6 FPT",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      originator: 'linkedin',
      createdAt: '2024-01-15T10:45:00Z'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      {/* Hero Section */}
      <section className="bg-fpYellow py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-black mb-8">
            Unlock the Power of Financial Content
          </h1>
          <p className="text-xl text-black mb-12">
            Join a community of creators and investors sharing real-time market insights.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              className="bg-black hover:bg-gray-800 text-white px-8 py-3"
              onClick={() => onNavigate?.(1)}
            >
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-black text-black px-8 py-3 hover:bg-gray-100"
              onClick={handleToggleDemo}
            >
              Watch Demo <Play className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      {showDemo && (
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">How FlowPost Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-fpYellow mb-4" />
                  <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Real-Time Insights
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Stay ahead with instant updates on market trends and investment opportunities.
                  </p>
                </CardContent>
              </Card>
              <Card className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-fpYellow mb-4" />
                  <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Community Driven
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Connect with top creators and investors, sharing knowledge and strategies.
                  </p>
                </CardContent>
              </Card>
              <Card className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6">
                  <DollarSign className="w-8 h-8 text-fpYellow mb-4" />
                  <h3 className={`font-semibold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Monetize Your Content
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Earn FPT tokens for your valuable insights and contributions to the community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
      
      {/* Featured Content Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest Market Insights</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time analysis from top financial creators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((content) => (
              <Card key={content.id} className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={content.image} 
                      alt={content.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3">
                      <OriginatorIcon source={content.originator as any} isDarkMode={isDarkMode} />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-blue-600 text-white">
                        {content.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {content.title}
                    </h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {content.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        by {content.author}
                      </span>
                      <span className="text-green-400 font-semibold text-sm">
                        +{content.earnings}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {content.engagement}
                      </span>
                      <Button 
                        size="sm" 
                        className="bg-fpYellow hover:bg-fpYellowDark text-black"
                        onClick={() => onNavigate?.(5)}
                      >
                        Share & Earn <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>

                    {/* Time and date strip */}
                    <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm pt-3 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} mt-3`}>
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(content.createdAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 dark:text-gray-400">
            Join FlowPost today and start sharing your financial insights with the world.
          </p>
          <Button
            className="bg-fpYellow hover:bg-fpYellowDark text-black px-8 py-3"
            onClick={() => onNavigate?.(1)}
          >
            Sign Up Now <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
