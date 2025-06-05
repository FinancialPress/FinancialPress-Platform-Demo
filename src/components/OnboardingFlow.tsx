
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronRight, Award, PenTool, Share2 } from 'lucide-react';

interface OnboardingFlowProps {
  userRole?: 'creator' | 'distributor';
}

const OnboardingFlow = ({ userRole = 'creator' }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  const topics = [
    'Crypto', 'Stocks', 'Tech', 'NFTs', 'AI', 'Pharma', 
    'Macroeconomics', 'Trading', 'DeFi', 'Web3', 'Blockchain', 'Fintech'
  ];

  const creators = [
    { name: 'CryptoWhale', followers: '250K', topic: 'Bitcoin Analysis', badge: 'Platinum' },
    { name: 'DeFiGuru', followers: '180K', topic: 'DeFi Protocols', badge: 'Gold' },
    { name: 'NFTTracker', followers: '120K', topic: 'NFT Markets', badge: 'Silver' },
    { name: 'TechAnalyst', followers: '300K', topic: 'Tech Trends', badge: 'Platinum' },
    { name: 'StockSage', followers: '400K', topic: 'Stock Market', badge: 'Platinum' },
    { name: 'AIResearcher', followers: '150K', topic: 'AI Development', badge: 'Gold' }
  ];

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const toggleCreator = (creator: string) => {
    setSelectedCreators(prev => 
      prev.includes(creator) 
        ? prev.filter(c => c !== creator)
        : [...prev, creator]
    );
  };

  const renderStep1 = () => (
    <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-white">What interests you?</CardTitle>
        <p className="text-center text-gray-300 text-lg">
          {userRole === 'creator' 
            ? 'Select topics you want to create content about'
            : 'Select topics you want to share and discover content about'
          }
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant={selectedTopics.includes(topic) ? "default" : "outline"}
              className={`p-4 h-auto ${
                selectedTopics.includes(topic) 
                  ? 'bg-yellow-500 text-black border-yellow-500' 
                  : 'border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500'
              }`}
              onClick={() => toggleTopic(topic)}
            >
              {selectedTopics.includes(topic) && <Check className="w-4 h-4 mr-2" />}
              {topic}
            </Button>
          ))}
        </div>
        <div className="text-center">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
            onClick={() => setCurrentStep(2)}
            disabled={selectedTopics.length === 0}
          >
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-white">Follow Top Creators</CardTitle>
        <p className="text-center text-gray-300 text-lg">
          {userRole === 'creator' 
            ? 'Connect with other creators in your space'
            : 'Start following creators to find great content to share'
          }
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          {creators.map((creator) => (
            <Card 
              key={creator.name}
              className={`cursor-pointer transition-colors ${
                selectedCreators.includes(creator.name)
                  ? 'bg-yellow-500/20 border-yellow-500'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => toggleCreator(creator.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full"></div>
                    <div>
                      <h3 className="text-white font-semibold">{creator.name}</h3>
                      <p className="text-gray-400">{creator.followers} followers</p>
                    </div>
                  </div>
                  {selectedCreators.includes(creator.name) && (
                    <Check className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <p className="text-gray-300 mb-2">{creator.topic}</p>
                <Badge className={`${
                  creator.badge === 'Platinum' ? 'bg-purple-500' : 
                  creator.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'
                } text-black`}>
                  {creator.badge} Creator
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
            onClick={() => setCurrentStep(3)}
          >
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCreatorProfile = () => (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
            <PenTool className="w-8 h-8 text-black" />
          </div>
        </div>
        <CardTitle className="text-3xl text-center text-white">Complete Your Creator Profile</CardTitle>
        <p className="text-center text-gray-300">Set up your profile to start earning from your content</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-gray-300">Creator Display Name</Label>
          <Input 
            placeholder="Your creator name"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Bio & Expertise</Label>
          <Textarea 
            placeholder="Tell your audience about your expertise and background..."
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Hedera Wallet Address</Label>
          <Input 
            placeholder="0x... (for receiving FPT tokens)"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Social Links</Label>
          <div className="space-y-2">
            <Input 
              placeholder="Twitter/X URL"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input 
              placeholder="YouTube URL (optional)"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <Button 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
          onClick={() => setCurrentStep(4)}
        >
          Complete Creator Setup
        </Button>
      </CardContent>
    </Card>
  );

  const renderDistributorProfile = () => (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <Share2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl text-center text-white">Complete Your Distributor Profile</CardTitle>
        <p className="text-center text-gray-300">Set up your profile to start earning from sharing content</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-gray-300">Distributor Display Name</Label>
          <Input 
            placeholder="Your distributor name"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Bio (Optional)</Label>
          <Textarea 
            placeholder="Tell us about your interests and sharing style..."
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">FPT Wallet Address</Label>
          <Input 
            placeholder="0x... (for receiving FPT tokens)"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Social Accounts for Sharing</Label>
          <div className="space-y-2">
            <Input 
              placeholder="Twitter/X Account"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input 
              placeholder="Telegram Channel (optional)"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input 
              placeholder="Reddit Username (optional)"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
          onClick={() => setCurrentStep(4)}
        >
          Complete Distributor Setup
        </Button>
      </CardContent>
    </Card>
  );

  const renderWelcome = () => (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto text-center">
      <CardContent className="p-12">
        <div className={`w-20 h-20 ${userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full mx-auto mb-6 flex items-center justify-center`}>
          <Award className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Welcome to FinancialPress!</h2>
        <p className="text-xl text-gray-300 mb-6">
          You've earned your first badge: <Badge className={`${userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
            {userRole === 'creator' ? 'Creator' : 'Distributor'} Newcomer
          </Badge>
        </p>
        <p className="text-gray-400 mb-8">
          You're now ready to start {userRole === 'creator' ? 'creating content and' : 'sharing content and'} earning FPT tokens!
        </p>
        <Button className={`${userRole === 'creator' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-blue-500 hover:bg-blue-600 text-white'} font-bold px-8 py-3`}>
          Enter FinancialPress
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        {/* Role Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${userRole === 'creator' ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-blue-500/20 border border-blue-500'} mb-4`}>
            {userRole === 'creator' ? (
              <PenTool className="w-5 h-5 text-yellow-500 mr-2" />
            ) : (
              <Share2 className="w-5 h-5 text-blue-500 mr-2" />
            )}
            <span className={`font-semibold ${userRole === 'creator' ? 'text-yellow-500' : 'text-blue-500'}`}>
              {userRole === 'creator' ? 'Content Creator' : 'Content Distributor'} Onboarding
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? `${userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'} text-black` 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {currentStep > step ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step 
                      ? userRole === 'creator' ? 'bg-yellow-500' : 'bg-blue-500'
                      : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && (userRole === 'creator' ? renderCreatorProfile() : renderDistributorProfile())}
        {currentStep === 4 && renderWelcome()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
