import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Moon, Sun, ArrowRight, TrendingUp, Users, DollarSign, Shield, Zap, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';

const LandingPage = () => {
  const { theme, setTheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Unlock Financial Freedom",
      description: "Empowering you with the insights and tools to make informed financial decisions.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Stay Ahead of the Curve",
      description: "Real-time financial news and expert analysis to keep you informed and prepared.",
      image: "https://images.unsplash.com/photo-1554475901-45ef4c444a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
    },
    {
      title: "Monetize Your Influence",
      description: "Turn your financial expertise into income by sharing content and engaging with your audience.",
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff6bb7770?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const newsArticles = [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High",
      excerpt: "Bitcoin surged past $70,000 for the first time in history as institutional adoption continues to grow.",
      author: "CryptoAnalyst",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop&crop=center",
      category: "Crypto"
    },
    {
      id: 2,
      title: "Federal Reserve Hints at Rate Cuts",
      excerpt: "The Fed signals potential interest rate reductions in the coming months amid economic uncertainty.",
      author: "EconExpert",
      time: "4 hours ago",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop&crop=center",
      category: "Economics"
    },
    {
      id: 3,
      title: "AI Stocks Rally on Breakthrough News",
      excerpt: "Major AI companies see significant gains following breakthrough in machine learning technology.",
      author: "TechGuru",
      time: "6 hours ago",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
      category: "Tech"
    },
    {
      id: 4,
      title: "DeFi Protocol Launches New Yield Farming",
      excerpt: "A major DeFi protocol introduces innovative yield farming opportunities with enhanced security features.",
      author: "DeFiAnalyst",
      time: "8 hours ago",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&crop=center",
      category: "DeFi"
    },
    {
      id: 5,
      title: "Green Energy Stocks Surge",
      excerpt: "Renewable energy companies see massive gains as government announces new clean energy initiatives.",
      author: "GreenInvestor",
      time: "12 hours ago",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop&crop=center",
      category: "Energy"
    },
    {
      id: 6,
      title: "NFT Market Shows Signs of Recovery",
      excerpt: "Digital art and collectibles market rebounds with new utility-focused projects gaining traction.",
      author: "NFTTracker",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop&crop=center",
      category: "NFT"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Hero Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Financial<span className="text-yellow-500">Press</span>
          </h1>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className={`text-xl leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get credible, tailored updates with low noise and high impact and turn your influence into income as you grow your audience.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <Button className={`px-8 py-3 text-lg font-semibold ${
              theme === 'dark' 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                : 'bg-yellow-500 hover:bg-yellow-600 text-black'
            }`}>
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              className={`px-8 py-3 text-lg font-semibold ${
                theme === 'dark' 
                  ? 'border-gray-600 text-white hover:bg-gray-800' 
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              Learn More
            </Button>
          </div>

          {/* Feature cards with proper theme handling */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, title: "Real-time Market Insights", desc: "Get instant updates on market movements and trends" },
              { icon: Users, title: "Expert Community", desc: "Connect with verified financial experts and analysts" },
              { icon: DollarSign, title: "Monetize Your Expertise", desc: "Earn FPT tokens by sharing valuable content and insights" }
            ].map((feature, index) => (
              <Card key={index} className={`${
                theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
              } p-6 text-center`}>
                <CardContent className="p-0">
                  <feature.icon className={`w-12 h-12 mx-auto mb-4 ${
                    theme === 'dark' ? 'text-yellow-500' : 'text-yellow-600'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>{feature.title}</h3>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Feed Section */}
      <section className={`px-8 py-16 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Latest Financial News
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {newsArticles.slice(0, 6).map((article) => (
              <Card key={article.id} className={`overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className={`mb-3 ${
                    theme === 'dark' ? 'bg-yellow-500 text-black' : 'bg-yellow-500 text-black'
                  }`}>
                    {article.category}
                  </Badge>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {article.title}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {article.excerpt}
                  </p>
                  <div className={`flex items-center justify-between text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    <span>{article.author}</span>
                    <span>{article.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className={`px-8 py-3 text-lg ${
                theme === 'dark' 
                  ? 'border-gray-600 text-white hover:bg-gray-800' 
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`px-8 py-16 text-center ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Ready to Get Started?
          </h2>
          <p className={`text-xl mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join FinancialPress today and start exploring the world of decentralized finance.
          </p>
          <Button className={`px-8 py-3 text-lg font-semibold ${
            theme === 'dark' 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
              : 'bg-yellow-500 hover:bg-yellow-600 text-black'
          }`}>
            Sign Up Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
