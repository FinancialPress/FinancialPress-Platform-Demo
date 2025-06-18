
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhoToFollowProps {
  isDarkMode?: boolean;
}

const WhoToFollow = ({ isDarkMode = true }: WhoToFollowProps) => {
  const suggestedUsers = [
    { name: "AITrader", specialty: "AI Trading", followers: "12.3K", badge: "Gold", isVerified: true },
    { name: "MarketMaven", specialty: "Market Analysis", followers: "8.9K", badge: "Silver", isVerified: true },
    { name: "CryptoInsider", specialty: "Crypto News", followers: "15.7K", badge: "Platinum", isVerified: true },
    { name: "TechFuturist", specialty: "Tech Trends", followers: "6.2K", badge: "Silver", isVerified: false },
    { name: "FinanceGuru", specialty: "Personal Finance", followers: "9.8K", badge: "Gold", isVerified: true }
  ];

  const cardClasses = isDarkMode 
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";

  const titleClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const nameClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const specialtyClasses = isDarkMode
    ? "text-gray-400"
    : "text-gray-600";

  const followersClasses = isDarkMode
    ? "text-gray-500"
    : "text-gray-500";

  return (
    <Card className={cardClasses}>
      <CardContent className="p-4">
        <h3 className={`text-lg font-semibold ${titleClasses} mb-3 flex items-center`}>
          <Users className="w-4 h-4 mr-2 text-blue-500" />
          Who to follow
        </h3>
        <div className="space-y-3">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">{user.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className={`font-semibold ${nameClasses} text-sm`}>{user.name}</div>
                    {user.isVerified && (
                      <Badge className={`${user.badge === 'Platinum' ? 'bg-purple-500' : user.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'} text-black text-xs`}>
                        {user.badge}
                      </Badge>
                    )}
                  </div>
                  <div className={`${specialtyClasses} text-xs`}>{user.specialty}</div>
                  <div className={`${followersClasses} text-xs`}>{user.followers} followers</div>
                </div>
              </div>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-7"
              >
                <UserPlus className="w-3 h-3 mr-1" />
                Follow
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-800">
          <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 text-sm">
            Show more suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;
