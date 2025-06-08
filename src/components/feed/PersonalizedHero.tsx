
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const PersonalizedHero = () => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        Your Personalized Financial Feed
      </h1>
      <p className="text-base text-gray-300 mb-4 max-w-2xl mx-auto">
        Content curated based on your interests in Crypto, DeFi, and AI Trading.
      </p>
      <div className="flex gap-3 justify-center mb-6">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-5 py-2">
          Create Content
        </Button>
        <Button variant="outline" className="font-bold px-5 py-2">
          <Settings className="w-4 h-4 mr-2" />
          Customize Feed
        </Button>
      </div>
    </div>
  );
};

export default PersonalizedHero;
