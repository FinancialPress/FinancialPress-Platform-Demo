import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PenTool, Upload, Camera, CheckCircle, XCircle, Plus, Trash2, Share2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CreatorProfileSetupProps {
  onContinue: () => void;
}

const CreatorProfileSetup = ({ onContinue }: CreatorProfileSetupProps) => {
  const { isDarkMode } = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newPlatformUrl, setNewPlatformUrl] = useState('');
  const [wantsToCreate, setWantsToCreate] = useState(false);
  const [wantsToShare, setWantsToShare] = useState(false);
  const [platforms, setPlatforms] = useState([
    { id: 'twitter', name: 'X/Twitter', icon: '𝕏', connected: true },
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

  const handleCreateCheckedChange = (checked: boolean | "indeterminate") => {
    setWantsToCreate(checked === true);
  };

  const handleShareCheckedChange = (checked: boolean | "indeterminate") => {
    setWantsToShare(checked === true);
  };

  const cardBg = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const subText = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const labelColor = isDarkMode ? 'text-gray-300' : 'text-gray-800';
  const inputClass = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-black';
  const iconButtonBg = isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300';

  return (
    <Card className={`${cardBg} max-w-2xl mx-auto`}>
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
            <PenTool className="w-8 h-8 text-black" />
          </div>
        </div>
        <CardTitle className={`text-3xl text-center ${textColor}`}>Complete Your Profile</CardTitle>
        <p className={`text-center ${subText}`}>Set up your profile to start earning from your content</p>
        <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Step 3 of 3
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Label className={`${labelColor} block mb-2`}>Profile Picture</Label>
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
          <Label className={labelColor}>Creator Display Name</Label>
          <Input placeholder="Your creator name" className={inputClass} />
        </div>

        <div>
          <Label className={labelColor}>Your Organisation</Label>
          <Input placeholder="Company or organisation name (optional)" className={inputClass} />
        </div>

        <div>
          <Label className={labelColor}>Bio & Expertise</Label>
          <Textarea
            placeholder="Tell your audience about your expertise and background..."
            className={inputClass}
          />
        </div>

        <div>
          <Label className={`${labelColor} mb-3 block`}>Social Links</Label>
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div key={platform.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-3 rounded-lg flex justify-between items-center`}>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{platform.icon}</span>
                  <span className={`${textColor} font-medium`}>{platform.name}</span>
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
                    className={`${iconButtonBg} border-none text-white`}
                    onClick={() => togglePlatformConnection(platform.id)}
                  >
                    {platform.connected ? (
                      <XCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </Button>
                  {platform.id.startsWith('custom-') && (
                    <Button
                      size="sm"
                      className={`${iconButtonBg} border-none`}
                      onClick={() => removePlatform(platform.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex space-x-2">
              <Input
                placeholder="Paste platform URL"
                value={newPlatformUrl}
                onChange={(e) => setNewPlatformUrl(e.target.value)}
                className={inputClass + ' flex-1'}
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

        <div className="space-y-3">
          <Label className={labelColor}>What do you want to do?</Label>

          <div
            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              wantsToCreate
                ? 'bg-yellow-500/10 border-yellow-500'
                : isDarkMode
                ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                : 'bg-gray-100 border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setWantsToCreate(!wantsToCreate)}
          >
            <Checkbox
              id="create"
              checked={wantsToCreate}
              onCheckedChange={handleCreateCheckedChange}
              className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
            />
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded flex items-center justify-center ${
                wantsToCreate ? 'bg-yellow-500' : 'bg-gray-600'
              }`}>
                <PenTool className={`w-5 h-5 ${wantsToCreate ? 'text-black' : 'text-gray-400'}`} />
              </div>
              <span className={`font-medium ${textColor}`}>
                Create my own editorial content and analysis
              </span>
            </div>
          </div>

          <div
            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              wantsToShare
                ? 'bg-blue-500/10 border-blue-500'
                : isDarkMode
                ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                : 'bg-gray-100 border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setWantsToShare(!wantsToShare)}
          >
            <Checkbox
              id="share"
              checked={wantsToShare}
              onCheckedChange={handleShareCheckedChange}
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded flex items-center justify-center ${
                wantsToShare ? 'bg-blue-500' : 'bg-gray-600'
              }`}>
                <Share2 className={`w-5 h-5 ${wantsToShare ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <span className={`font-medium ${textColor}`}>
                Share and distribute other people's content
              </span>
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
