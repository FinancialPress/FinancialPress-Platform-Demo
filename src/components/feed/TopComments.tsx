
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

interface TopCommentsProps {
  isDarkMode?: boolean;
}

const TopComments = ({ isDarkMode = true }: TopCommentsProps) => {
  const topCommenters = [
    { name: "InsightfulMind", comments: "3,240", badge: "Platinum", followers: "76.3K", earnings: "980 FPT", rp: "270 RP" },
    { name: "DeepThoughts", comments: "2,890", badge: "Gold", followers: "62.1K", earnings: "820 FPT", rp: "225 RP" },
    { name: "WiseWords", comments: "2,450", badge: "Gold", followers: "55.8K", earnings: "740 FPT", rp: "200 RP" },
    { name: "SmartTake", comments: "2,120", badge: "Silver", followers: "48.2K", earnings: "680 FPT", rp: "185 RP" },
    { name: "QuickWit", comments: "1,890", badge: "Silver", followers: "41.7K", earnings: "590 FPT", rp: "160 RP" }
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

  const commentsClasses = isDarkMode
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
          <MessageCircle className="w-4 h-4 mr-2 text-yellow-500" />
          Top Comments
        </h3>
        <div className="space-y-2">
          {topCommenters.map((commenter, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                <div className={`text-sm font-bold ${rankClasses}`}>#{index + 1}</div>
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <div>
                  <div className={`font-semibold ${nameClasses} text-xs`}>{commenter.name}</div>
                  <div className={`${commentsClasses} text-xs`}>{commenter.comments} comments</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`${earningsClasses} font-bold text-xs`}>{commenter.rp}</div>
                <Badge className={`${getBadgeColor(commenter.badge)} text-xs`}>
                  {commenter.badge}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopComments;
