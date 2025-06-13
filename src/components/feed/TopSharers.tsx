
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2 } from 'lucide-react';

interface TopSharersProps {
  isDarkMode?: boolean;
}

const TopSharers = ({ isDarkMode = true }: TopSharersProps) => {
  const topSharers = [
    { name: "ShareMaster", shares: "2,340", badge: "Platinum", followers: "89.2K", earnings: "1,150 FPT" },
    { name: "ViralTrader", shares: "1,890", badge: "Gold", followers: "67.5K", earnings: "890 FPT" },
    { name: "ContentCurator", shares: "1,560", badge: "Gold", followers: "54.3K", earnings: "720 FPT" },
    { name: "NewsHawk", shares: "1,340", badge: "Silver", followers: "45.7K", earnings: "650 FPT" },
    { name: "InfoStream", shares: "1,120", badge: "Silver", followers: "38.9K", earnings: "580 FPT" }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Platinum': return 'bg-purple-500 text-white';
      case 'Gold': return 'bg-yellow-500 text-black';
      case 'Silver': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const titleClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const nameClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const sharesClasses = isDarkMode
    ? "text-gray-400"
    : "text-gray-600";

  const rankClasses = isDarkMode
    ? "text-yellow-500"
    : "text-yellow-600";

  const earningsClasses = isDarkMode
    ? "text-green-400"
    : "text-green-600";

  return (
    <Card className={cardClasses}>
      <CardContent className="p-4">
        <h3 className={`text-lg font-semibold ${titleClasses} mb-3 flex items-center`}>
          <Share2 className="w-4 h-4 mr-2 text-yellow-500" />
          Top Sharers
        </h3>
        <div className="space-y-2">
          {topSharers.map((sharer, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                <div className={`text-sm font-bold ${rankClasses}`}>#{index + 1}</div>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div>
                  <div className={`font-semibold ${nameClasses} text-xs`}>{sharer.name}</div>
                  <div className={`${sharesClasses} text-xs`}>{sharer.shares} shares</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`${earningsClasses} font-bold text-xs`}>{sharer.earnings}</div>
                <Badge className={`${getBadgeColor(sharer.badge)} text-xs`}>
                  {sharer.badge}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSharers;
