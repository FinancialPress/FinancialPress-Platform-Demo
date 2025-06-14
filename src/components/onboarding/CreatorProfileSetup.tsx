import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PenTool, Upload, Camera, CheckCircle, XCircle, Plus, Trash2, Share2 } from 'lucide-react';

interface CreatorProfileSetupProps {
  onContinue: () => void;
}

const [wantsToCreate, setWantsToCreate] = useState(false);
const [wantsToShare, setWantsToShare] = useState(false);

const CreatorProfileSetup = ({ onContinue }: CreatorProfileSetupProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newPlatformUrl, setNewPlatformUrl] = useState('');
  const [platforms, setPlatforms] = useState([
    { id: 'twitter', name: 'X (Twitter)', icon: '𝕏', connected: true },
    { id: 'facebook', name: 'Facebook', icon: '📘', connected: false },
    { id: 'youtube', name: 'YouTube', icon: '📺', connected: true },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', connected: false },
    { id: 'telegram', name: 'Telegram', icon: '✈️', connected: true },
    { id: 'instagram', name: 'Instagram', icon: '📷', connected: false }
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

  const togglePlatformConnection = (platformId: string) => {
    setPlatforms(prev => prev.map(p => 
      p.id === platformId ? { ...p, connected: !p.connected } : p
    ));
  };

  const addNewPlatform = () => {
    if (newPlatformUrl.trim()) {
      const newPlatform = {
        id: `custom-${Date.now()}`,
        name: 'Custom Platform',
        icon: '🔗',
        connected: true
      };
      setPlatforms(prev => [...prev, newPlatform]);
      setNewPlatformUrl('');
    }
  };

  const removePlatform = (platformId: string) => {
    setPlatforms(prev => prev.filter(p => p.id !== platformId));
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

        {/* Enhanced Social Links Section */}
        <div>
          <Label className="text-gray-300 mb-3 block">Social Links</Label>
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div key={platform.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{platform.icon}</span>
                  <span className="text-white font-medium">{platform.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    platform.connected 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {platform.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-gray-600 ${
                      platform.connected 
                        ? 'text-red-400 hover:bg-red-400 hover:text-white' 
                        : 'text-green-400 hover:bg-green-400 hover:text-white'
                    }`}
                    onClick={() => togglePlatformConnection(platform.id)}
                  >
                    {platform.connected ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </Button>
                  {platform.id.startsWith('custom-') && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-red-400 hover:bg-red-400 hover:text-white"
                      onClick={() => removePlatform(platform.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {/* Add new platform */}
            <div className="flex space-x-2">
              <Input
                placeholder="Paste platform URL"
                value={newPlatformUrl}
                onChange={(e) => setNewPlatformUrl(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button
                onClick={addNewPlatform}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                disabled={!newPlatformUrl.trim()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Platform
              </Button>
            </div>
          </div>
        </div>

        {/* What do you want to do section */}
<div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
  <input
    type="checkbox"
    checked={wantsToCreate}
    onChange={() => setWantsToCreate(v => !v)}
    className="form-checkbox h-5 w-5 text-yellow-500"
    id="create"
  />
  <label htmlFor="create" className="flex items-center space-x-2 cursor-pointer">
    <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center">
      <PenTool className="w-4 h-4 text-black" />
    </div>
    <span className="text-white">Create my own editorial content and analysis</span>
  </label>
</div>
<div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
  <input
    type="checkbox"
    checked={wantsToShare}
    onChange={() => setWantsToShare(v => !v)}
    className="form-checkbox h-5 w-5 text-blue-500"
    id="share"
  />
  <label htmlFor="share" className="flex items-center space-x-2 cursor-pointer">
    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
      <Share2 className="w-4 h-4 text-white" />
    </div>
    <span className="text-white">Share and distribute other people's content</span>
  </label>
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
