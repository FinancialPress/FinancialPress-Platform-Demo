
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface OriginatorIconProps {
  source: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'financial-press' | 'original';
  isDarkMode?: boolean;
}

const OriginatorIcon = ({ source, isDarkMode = true }: OriginatorIconProps) => {
  const getIcon = () => {
    switch (source) {
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'twitter':
        return <Twitter className="w-4 h-4 text-blue-400" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-700" />;
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-600" />;
      case 'financial-press':
        return <img src="/lovable-uploads/2b7e8aa6-713f-47ff-ae55-2171a9e67aba.png" alt="Financial Press" className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 bg-fpYellow rounded-full" />;
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center space-x-1 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
    >
      {getIcon()}
      <span className="text-xs capitalize">{source === 'financial-press' ? 'Press' : source}</span>
    </Badge>
  );
};

export default OriginatorIcon;
