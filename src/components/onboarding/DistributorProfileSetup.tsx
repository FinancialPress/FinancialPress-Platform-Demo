
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

interface DistributorProfileSetupProps {
  onContinue: () => void;
  userType?: 'demo' | 'live' | null;
  selectedTopics?: string[];
}

// Username validation function to match database constraints
const validateUsername = (username: string): { isValid: boolean; error?: string } => {
  if (!username || username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters long' };
  }
  if (username.length > 20) {
    return { isValid: false, error: 'Username must be 20 characters or less' };
  }
  if (!/^[a-z0-9_]+$/.test(username)) {
    return { isValid: false, error: 'Username can only contain lowercase letters, numbers, and underscores' };
  }
  if (username.startsWith('_') || username.endsWith('_')) {
    return { isValid: false, error: 'Username cannot start or end with underscore' };
  }
  return { isValid: true };
};

const DistributorProfileSetup = ({ onContinue, userType, selectedTopics = [] }: DistributorProfileSetupProps) => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { createProfile, updateProfile, checkUsernameAvailability } = useProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameChecking, setUsernameChecking] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(newUsername);
    setUsernameError(null);
    
    // Validate format immediately
    const validation = validateUsername(newUsername);
    if (!validation.isValid && newUsername.length > 0) {
      setUsernameError(validation.error || 'Invalid username format');
    }
  };

  const handleUsernameBlur = async () => {
    if (!username.trim()) return;

    const validation = validateUsername(username);
    if (!validation.isValid) {
      setUsernameError(validation.error || 'Invalid username format');
      return;
    }

    setUsernameChecking(true);
    try {
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        setUsernameError('Username is already taken');
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameError('Error checking username availability');
    } finally {
      setUsernameChecking(false);
    }
  };

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

    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    // Final username validation
    const validation = validateUsername(username);
    if (!validation.isValid) {
      setUsernameError(validation.error || 'Invalid username format');
      toast({
        title: "Error",
        description: validation.error || 'Invalid username format',
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Check username availability before saving
      const isUsernameAvailable = await checkUsernameAvailability(username);
      
      if (!isUsernameAvailable) {
        setUsernameError('Username is already taken');
        toast({
          title: "Error",
          description: "Username is already taken",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const profileData = {
        display_name: displayName.trim(),
        username: username.trim(),
        bio: bio.trim() || null,
        topics: selectedTopics,
        role: 'distributor',
        image_url: profileImageUrl
      };

      const { error } = await updateProfile(profileData);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to save profile. Please check your username format.",
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

  const isUsernameValid = username.length > 0 && validateUsername(username).isValid && !usernameError;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${textClass}`}>Complete Your Profile</h2>
        <p className={`text-lg ${labelClass}`}>
          {userType === 'live' ? 'Set up your distributor profile to start earning' : 'Tell us about yourself'}
        </p>
      </div>

      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`text-xl ${textClass}`}>Distributor Profile</CardTitle>
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
                onChange={handleUsernameChange}
                onBlur={handleUsernameBlur}
                className={`pl-8 ${inputClass} ${
                  usernameError 
                    ? 'border-red-500' 
                    : isUsernameValid 
                      ? 'border-green-500' 
                      : ''
                }`}
                disabled={loading}
              />
              {username && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {usernameChecking ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  ) : isUsernameValid ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : username.length > 0 ? (
                    <X className="w-4 h-4 text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
            <p className={`text-xs ${labelClass} mt-1`}>
              Username must be 3-20 characters, lowercase letters, numbers, and underscores only
            </p>
          </div>

          <div>
            <Label htmlFor="bio" className={labelClass}>Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about your audience and distribution channels..."
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
                <li>• Earn rewards for sharing quality content</li>
                <li>• Real-time earnings tracking</li>
              </ul>
            </div>
          )}

          <Button 
            onClick={handleContinue} 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
            disabled={loading || !displayName.trim() || !username.trim() || !!usernameError || usernameChecking}
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

export default DistributorProfileSetup;
