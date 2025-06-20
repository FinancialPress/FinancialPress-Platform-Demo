import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface TopicSelectionProps {
  userRole: 'creator' | 'distributor';
  selectedTopics: string[];
  onTopicToggle: (topic: string) => void;
  onContinue: () => void;
}

const TopicSelection = ({
  userRole,
  selectedTopics,
  onTopicToggle,
  onContinue,
}: TopicSelectionProps) => {
  const { isDarkMode } = useTheme();

  const topics = [
    'Crypto', 'Stocks', 'Tech', 'NFTs', 'AI', 'Pharma',
    'Macroeconomics', 'Trading', 'DeFi', 'Web3', 'Blockchain', 'Fintech',
  ];

  const bg = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const title = isDarkMode ? 'text-white' : 'text-black';
  const subtext = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const stepText = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const heading = isDarkMode ? 'text-white' : 'text-black';
  const description = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const noteText = 'text-gray-500';

  return (
    <Card className={`${bg} max-w-4xl mx-auto`}>
      <CardHeader>
        <CardTitle className={`text-3xl text-center ${title}`}>
          Set Your Topics & Interests
        </CardTitle>
        <p className={`text-center ${subtext} text-lg`}>
          Choose what content you're interested in for better discovery and earnings opportunities
        </p>
        <div className={`text-center text-sm ${stepText}`}>Step 2 of 3</div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${heading}`}>Content Categories</h3>
          <p className={`text-sm ${description}`}>
            We'll suggest content based on your interests and connect you with relevant audiences
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {topics.map((topic) => {
            const isSelected = selectedTopics.includes(topic);

            const base = 'p-4 h-auto font-medium border transition-all';
            const selectedStyle =
              'bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-500 hover:text-black';
            const lightUnselected =
              'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black';
            const darkUnselected =
              'bg-gray-900 border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-500';

            const buttonClass = `${base} ${
              isSelected ? selectedStyle : isDarkMode ? darkUnselected : lightUnselected
            }`;

            return (
              <Button key={topic} className={buttonClass} onClick={() => onTopicToggle(topic)}>
                {isSelected && <Check className="w-4 h-4 mr-2" />}
                {topic}
              </Button>
            );
          })}
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6">
            <Button
              variant="outline"
              className={`px-8 py-2 text-sm sm:text-base ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black'
              }`}
              onClick={onContinue}
            >
              Do this later
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3"
              onClick={onContinue}
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className={`text-xs ${noteText}`}>
            You can connect more platforms later from your settings
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicSelection;
