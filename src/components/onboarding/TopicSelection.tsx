
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';

interface TopicSelectionProps {
  userRole: 'creator' | 'distributor';
  selectedTopics: string[];
  onTopicToggle: (topic: string) => void;
  onContinue: () => void;
}

const TopicSelection = ({ userRole, selectedTopics, onTopicToggle, onContinue }: TopicSelectionProps) => {
  const topics = [
    'Crypto', 'Stocks', 'Tech', 'NFTs', 'AI', 'Pharma', 
    'Macroeconomics', 'Trading', 'DeFi', 'Web3', 'Blockchain', 'Fintech'
  ];

  return (
    <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-white">Set Your Topics & Interests</CardTitle>
        <p className="text-center text-gray-300 text-lg">
          Choose what content you're interested in for better discovery and earnings opportunities
        </p>
        <div className="text-center text-sm text-gray-400">
          Step 3 of 4
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Content Categories</h3>
          <p className="text-sm text-gray-400">
            We'll suggest content based on your interests and connect you with relevant audiences
          </p>
        </div>
        
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
              onClick={() => onTopicToggle(topic)}
            >
              {selectedTopics.includes(topic) && <Check className="w-4 h-4 mr-2" />}
              {topic}
            </Button>
          ))}
        </div>
        <div className="text-center">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
            onClick={onContinue}
            disabled={selectedTopics.length === 0}
          >
            Continue <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicSelection;
