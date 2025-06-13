
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PenTool, Upload, Camera } from 'lucide-react';

interface CreatorProfileSetupProps {
  onContinue: () => void;
}

const CreatorProfileSetup = ({ onContinue }: CreatorProfileSetupProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
            <PenTool className="w-8 h-8 text-black" />
          </div>
        </div>
        <CardTitle className="text-3xl text-center text-white">Complete Your Profile</CardTitle>
        <p className="text-center text-gray-300">Set up your profile to start earning from your content</p>
        <div className="text-center text-sm text-gray-400">
          Step 3 of 3
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="text-center">
          <Label className="text-gray-300 block mb-2">Profile Picture</Label>
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-2 cursor-pointer hover:bg-yellow-600 transition-colors">
              <Upload className="w-4 h-4 text-black" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <Label className="text-gray-300">Creator Display Name</Label>
          <Input 
            placeholder="Your creator name"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div>
          <Label className="text-gray-300">Your Organisation</Label>
          <Input 
            placeholder="Company or organisation name (optional)"
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
          Complete Setup
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatorProfileSetup;
