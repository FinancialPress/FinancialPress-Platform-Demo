
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface WhoToFollowProps {
  isDarkMode?: boolean;
}

const WhoToFollow = ({ isDarkMode = true }: WhoToFollowProps) => {
  // Updated usernames and added earnings
  const suggestedUsers = [
    { name: "QuantumInvestor", followers: "21.1K", earnings: "890 FPT", rp: "250 RP", badge: "Gold" },
    { name: "YieldFarmer", followers: "19.8K", earnings: "760 FPT", rp: "210 RP", badge: "Platinum" },
    { name: "NFTVisionary", followers: "16.4K", earnings: "650 FPT", rp: "180 RP", badge: "Silver" },
    { name: "AltcoinExpert", followers: "12.7K", earnings: "580 FPT", rp: "165 RP", badge: "Gold" },
    { name: "Web3Wizard", followers: "11.2K", earnings: "520 FPT", rp: "140 RP", badge: "Silver" }
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

  const followersClasses = isDarkMode
    ? "text-gray-400"
    : "text-gray-600";

  const earningsClasses = isDarkMode
    ? "text-green-400"
    : "text-green-600";

  return (
    <Card className={cardClasses}>
      <CardContent className="p-4">
        <h3 className={`text-lg font-semibold ${titleClasses} mb-3 flex items-center`}>
          <Users className="w-4 h-4 mr-2 text-blue-500" />
          Who to Follow
        </h3>
        <div className="space-y-2">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <div>
                  <div className={`font-semibold ${nameClasses} text-xs`}>{user.name}</div>
                  <div className={`${followersClasses} text-xs`}>{user.followers}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`${earningsClasses} font-bold text-xs`}>{user.earnings} | {user.rp}</div>
                <Badge className={`${user.badge === 'Platinum' ? 'bg-purple-500' : user.badge === 'Gold' ? 'bg-yellow-500' : 'bg-gray-500'} text-black text-xs`}>
                  {user.badge}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;
