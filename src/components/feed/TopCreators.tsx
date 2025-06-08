
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

const TopCreators = () => {
  const topCreators = [
    { name: "CryptoWhale", earnings: "1,250 FPT", badge: "Platinum", followers: "45.2K", posts: 127 },
    { name: "BlockchainBull", earnings: "1,150 FPT", badge: "Gold", followers: "38.9K", posts: 89 },
    { name: "DeFiDegen", earnings: "980 FPT", badge: "Gold", followers: "32.1K", posts: 156 },
    { name: "MacroMind", earnings: "890 FPT", badge: "Silver", followers: "28.7K", posts: 78 },
    { name: "TechAnalyst", earnings: "750 FPT", badge: "Silver", followers: "25.3K", posts: 94 }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Award className="w-4 h-4 mr-2 text-yellow-500" />
          Top Creators
        </h3>
        <div className="space-y-2">
          {topCreators.map((creator, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-bold text-yellow-500">#{index + 1}</div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-white text-xs">{creator.name}</div>
                  <div className="text-gray-400 text-xs">{creator.followers}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-xs">{creator.earnings}</div>
                <Badge className={`${creator.badge === 'Platinum' ? 'bg-purple-500' : creator.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'} text-black text-xs`}>
                  {creator.badge}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCreators;
