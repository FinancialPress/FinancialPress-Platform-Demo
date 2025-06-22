
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useUsernameValidation } from '@/hooks/useUsernameValidation';
import { Loader2, Check, X } from 'lucide-react';
import ProfilePictureUpload from '../ProfilePictureUpload';

interface CreatorProfileSetupProps {
  onContinue: () => void;
  userType?: 'demo' | 'live' | null;
  selectedTopics?: string[];
}

const CreatorProfileSetup = ({ onContinue, userType, selectedTopics = [] }: CreatorProfileSetupProps) => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { createProfile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const usernameValidation = useUsernameValidation(username, displayName);

  const handleContinue = async () => {
    if (userType === 'demo') {
      onContinue();
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to continue",
        variant: "destructive",
      });
      return;
    }

    if (!displayName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a display name",
        variant: "destructive",
      });
      return;
    }

    if (!username.trim() || !usernameValidation.isValid) {
      toast({
        title: "Error",
        description: "Please enter a valid username",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const profileData = {
        display_name: displayName.trim(),
        username: username.trim(),
        bio: bio.trim() || null,
        topics: selectedTopics,
        role: 'creator',
        image_url: profileImageUrl
      };

      const { error } = await updateProfile(profileData);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to save profile. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile Created!",
          description: "Welcome to FinancialPress! Your account is ready.",
        });
        onContinue();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Theme-aware styling
  const cardClass = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const labelClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const inputClass = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${textClass}`}>Complete Your Profile</h2>
        <p className={`text-lg ${labelClass}`}>
          {userType === 'live' ? 'Set up your creator profile to start earning' : 'Tell us about yourself'}
        </p>
      </div>

      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`text-xl ${textClass}`}>Creator Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ProfilePictureUpload
            currentImageUrl={profileImageUrl}
            displayName={displayName}
            onImageChange={setProfileImageUrl}
            userType={userType}
            disabled={loading}
          />

          <div>
            <Label htmlFor="display-name" className={labelClass}>Display Name *</Label>
            <Input
              id="display-name"
              placeholder="Your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={inputClass}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="username" className={labelClass}>Username *</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</div>
              <Input
                id="username"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className={`pl-8 ${inputClass} ${
                  username && !usernameValidation.isValid 
                    ? 'border-red-500' 
                    : username && usernameValidation.isValid 
                      ? 'border-green-500' 
                      : ''
                }`}
                disabled={loading}
              />
              {username && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {usernameValidation.isChecking ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  ) : usernameValidation.isValid ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {usernameValidation.error && (
              <p className="text-red-500 text-sm mt-1">{usernameValidation.error}</p>
            )}
            {usernameValidation.suggestions.length > 0 && (
              <div className="mt-2">
                <p className={`text-xs ${labelClass} mb-1`}>Suggestions:</p>
                <div className="flex gap-2 flex-wrap">
                  {usernameValidation.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setUsername(suggestion)}
                      className="text-xs bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
                      disabled={loading}
                    >
                      @{suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="bio" className={labelClass}>Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about your expertise and interests..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={inputClass}
              rows={4}
              disabled={loading}
            />
          </div>

          {selectedTopics.length > 0 && (
            <div>
              <Label className={labelClass}>Selected Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTopics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="bg-yellow-500 text-black">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {userType === 'live' && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${textClass}`}>Account Benefits</h4>
              <ul className={`text-sm ${labelClass} space-y-1`}>
                <li>• 100 FPT welcome bonus</li>
                <li>• Unique referral code for earning bonuses</li>
                <li>• Secure wallet for crypto earnings</li>
                <li>• Real-time earnings tracking</li>
              </ul>
            </div>
          )}

          <Button 
            onClick={handleContinue} 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
            disabled={loading || (username && !usernameValidation.isValid)}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {userType === 'live' ? 'Creating Profile...' : 'Continuing...'}
              </>
            ) : (
              userType === 'live' ? 'Complete Setup' : 'Continue to Feed'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorProfileSetup;
