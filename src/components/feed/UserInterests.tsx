
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const UserInterests = () => {
  const interests = ["Crypto", "DeFi", "AI Trading", "NFTs", "Blockchain"];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Star className="w-4 h-4 mr-2 text-yellow-500" />
          Your Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <Badge key={index} className="bg-yellow-600 text-black text-xs">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInterests;
