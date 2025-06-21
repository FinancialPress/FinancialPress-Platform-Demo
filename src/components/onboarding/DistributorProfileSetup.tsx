
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Share2 } from 'lucide-react';

interface DistributorProfileSetupProps {
  onContinue: () => void;
}

const DistributorProfileSetup = ({ onContinue }: DistributorProfileSetupProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <Share2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl text-center text-white">Complete Your Profile</CardTitle>
        <p className="text-center text-gray-300">Set up your profile to start earning from sharing content</p>
        <div className="text-center text-sm text-gray-400">
          Step 4 of 4
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-gray-300">Distributor Display Name</Label>
          <Input 
            placeholder="Your distributor name"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Bio (Optional)</Label>
          <Textarea 
            placeholder="Tell us about your interests and sharing style..."
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">FPT Wallet Address</Label>
          <Input 
            placeholder="0x... (for receiving FPT tokens)"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Social Accounts for Sharing</Label>
          <div className="space-y-2">
            <Input 
              placeholder="X/Twitter Account"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input 
              placeholder="Telegram Channel (optional)"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input 
              placeholder="Reddit Username (optional)"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
          onClick={onContinue}
        >
          Complete Setup
        </Button>
      </CardContent>
    </Card>
  );
};

export default DistributorProfileSetup;
