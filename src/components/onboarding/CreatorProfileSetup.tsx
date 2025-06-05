
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PenTool } from 'lucide-react';

interface CreatorProfileSetupProps {
  onContinue: () => void;
}

const CreatorProfileSetup = ({ onContinue }: CreatorProfileSetupProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
            <PenTool className="w-8 h-8 text-black" />
          </div>
        </div>
        <CardTitle className="text-3xl text-center text-white">Complete Your Creator Profile</CardTitle>
        <p className="text-center text-gray-300">Set up your profile to start earning from your content</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-gray-300">Creator Display Name</Label>
          <Input 
            placeholder="Your creator name"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Bio & Expertise</Label>
          <Textarea 
            placeholder="Tell your audience about your expertise and background..."
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Hedera Wallet Address</Label>
          <Input 
            placeholder="0x... (for receiving FPT tokens)"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div>
          <Label className="text-gray-300">Social Links</Label>
          <div className="space-y-2">
            <Input 
              placeholder="Twitter/X URL"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input 
              placeholder="YouTube URL (optional)"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <Button 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
          onClick={onContinue}
        >
          Complete Creator Setup
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatorProfileSetup;
