
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface UserInterestsProps {
  isDarkMode?: boolean;
}

const UserInterests = ({ isDarkMode = false }: UserInterestsProps) => {
  const interests = ['Crypto', 'DeFi', 'AI Trading', 'NFTs', 'Blockchain'];

  const cardClasses = isDarkMode
    ? 'bg-gray-900 border-gray-800 text-white'
    : 'bg-white border-gray-200 text-black';

  const badgeClasses = 'bg-yellow-500 text-black text-xs';

  return (
    <Card className={`${cardClasses} rounded-lg`}>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Star className="w-4 h-4 mr-2 text-yellow-500" />
          Your Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <Badge key={index} className={badgeClasses}>
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInterests;
