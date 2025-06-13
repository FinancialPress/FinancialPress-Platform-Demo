
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PenTool, Upload, Camera, Check, X, Plus, Share2 } from 'lucide-react';

interface CreatorProfileSetupProps {
  onContinue: () => void;
}

const CreatorProfileSetup = ({ onContinue }: CreatorProfileSetupProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'creator' | 'distributor' | null>(null);
  const [newPlatformUrl, setNewPlatformUrl] = useState('');

  const [connectedPlatforms, setConnectedPlatforms] = useState([
    { name: 'X (Twitter)', icon: '𝕏', connected: true },
    { name: 'YouTube', icon: '📺', connected: false },
    { name: 'LinkedIn', icon: '💼', connected: true },
    { name: 'Instagram', icon: '📷', connected: false },
    { name: 'TikTok', icon: '🎵', connected: false },
    { name: 'Telegram', icon: '✈️', connected: true },
    { name: 'Discord', icon: '🎮', connected: false },
    { name: 'Reddit', icon: '🤖', connected: false }
  ]);

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

  const togglePlatformConnection = (platformName: string) => {
    setConnectedPlatforms(prev => 
      prev.map(platform => 
        platform.name === platformName 
          ? { ...platform, connected: !platform.connected }
          : platform
      )
    );
  };

  const addCustomPlatform = () => {
    if (newPlatformUrl.trim()) {
      setConnectedPlatforms(prev => [
        ...prev,
        { name: 'Custom Platform', icon: '🔗', connected: true }
      ]);
      setNewPlatformUrl('');
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

        {/* What do you want to do on FinancialPress */}
        <div>
          <Label className="text-gray-300 block mb-4">What do you want to do on FinancialPress?</Label>
          <div className="space-y-3">
            <Card 
              className={`cursor-pointer transition-colors p-4 ${
                selectedRole === 'creator'
                  ? 'bg-yellow-500/20 border-yellow-500'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedRole('creator')}
            >
              <div className="flex items-center space-x-3">
                <PenTool className="w-6 h-6 text-yellow-500" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Create my own editorial content and analysis</h3>
                  <p className="text-gray-400 text-sm">Build your audience with original insights and earn from your expertise</p>
                </div>
                {selectedRole === 'creator' && <Check className="w-6 h-6 text-yellow-500" />}
              </div>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-colors p-4 ${
                selectedRole === 'distributor'
                  ? 'bg-blue-500/20 border-blue-500'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedRole('distributor')}
            >
              <div className="flex items-center space-x-3">
                <Share2 className="w-6 h-6 text-blue-500" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Share and distribute other people's content</h3>
                  <p className="text-gray-400 text-sm">Curate and share the best content to earn tokens and grow your network</p>
                </div>
                {selectedRole === 'distributor' && <Check className="w-6 h-6 text-blue-500" />}
              </div>
            </Card>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <Label className="text-gray-300 block mb-4">Social Links</Label>
          <div className="space-y-3">
            {connectedPlatforms.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{platform.icon}</span>
                  <span className="text-white">{platform.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm px-2 py-1 rounded ${
                    platform.connected 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {platform.connected ? 'Connected' : 'Disconnected'}
                  </span>
                  <Button
                    size="sm"
                    variant={platform.connected ? "destructive" : "default"}
                    onClick={() => togglePlatformConnection(platform.name)}
                    className={platform.connected ? '' : 'bg-yellow-500 hover:bg-yellow-600 text-black'}
                  >
                    {platform.connected ? <X className="w-4 h-4" /> : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex space-x-2">
              <Input 
                placeholder="Paste platform URL here"
                value={newPlatformUrl}
                onChange={(e) => setNewPlatformUrl(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button 
                onClick={addCustomPlatform}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Platform
              </Button>
            </div>
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
