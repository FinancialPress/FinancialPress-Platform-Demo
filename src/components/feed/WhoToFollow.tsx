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
    { name: "QuantumInvestor", followers: "21.1K", earnings: "890 FPT", badge: "Gold" },
    { name: "YieldFarmer", followers: "19.8K", earnings: "760 FPT", badge: "Platinum" },
    { name: "NFTVisionary", followers: "16.4K", earnings: "650 FPT", badge: "Silver" },
    { name: "AltcoinExpert", followers: "12.7K", earnings: "580 FPT", badge: "Gold" },
    { name: "Web3Wizard", followers: "11.2K", earnings: "520 FPT", badge: "Silver" }
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
          Who to follow
        </h3>
        <div className="space-y-2">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg](#)

