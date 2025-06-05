
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronRight } from 'lucide-react';

interface CreatorSelectionProps {
  userRole: 'creator' | 'distributor';
  selectedCreators: string[];
  onCreatorToggle: (creator: string) => void;
  onContinue: () => void;
}

const CreatorSelection = ({ userRole, selectedCreators, onCreatorToggle, onContinue }: CreatorSelectionProps) => {
  const creators = [
    { name: 'CryptoWhale', followers: '250K', topic: 'Bitcoin Analysis', badge: 'Platinum' },
    { name: 'DeFiGuru', followers: '180K', topic: 'DeFi Protocols', badge: 'Gold' },
    { name: 'NFTTracker', followers: '120K', topic: 'NFT Markets', badge: 'Silver' },
    { name: 'TechAnalyst', followers: '300K', topic: 'Tech Trends', badge: 'Platinum' },
    { name: 'StockSage', followers: '400K', topic: 'Stock Market', badge: 'Platinum' },
    { name: 'AIResearcher', followers: '150K', topic: 'AI Development', badge: 'Gold' }
  ];

  return (
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
              onClick={() => onCreatorToggle(creator.name)}
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
            onClick={onContinue}
          >
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorSelection;
