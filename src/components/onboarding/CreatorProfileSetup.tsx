import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/components/ui/use-toast';
import { PenTool } from 'lucide-react';
import ProfilePictureUpload from '../ProfilePictureUpload';

interface CreatorProfileSetupProps {
  onContinue?: () => void;
  userType?: 'demo' | 'live' | null;
  selectedTopics: string[];
}

const CreatorProfileSetup = ({ onContinue, userType, selectedTopics }: CreatorProfileSetupProps) => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile, updateProfile, checkUsernameAvailability } = useProfile();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setUsername(profile.username || '');
      setBio(profile.bio || '');
      setProfileImageUrl(profile.image_url || null);
    }
  }, [profile]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setUsernameError(null); // Clear any previous errors
  };

  const handleUsernameBlur = async () => {
    if (!username.trim()) return;

    setUsernameChecking(true);
    try {
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        setUsernameError('Username is already taken');
      }
    } finally {
      setUsernameChecking(false);
    }
  };

  const handleSave = async () => {
    console.log('Saving creator profile...', { 
      displayName, 
      username, 
      bio, 
      profileImageUrl,
      userType,
      selectedTopics 
    });

    if (!displayName.trim()) {
      toast.error('Display name is required');
      return;
    }

    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }

    setSaving(true);

    try {
      if (userType === 'live') {
        if (!user) {
          toast.error('You must be logged in to save your profile');
          setSaving(false);
          return;
        }

        // Check username availability before saving
        console.log('Checking username availability for:', username);
        const isUsernameAvailable = await checkUsernameAvailability(username);
        
        if (!isUsernameAvailable) {
          setUsernameError('Username is already taken');
          setSaving(false);
          return;
        }

        // Update profile for live users
        console.log('Updating live user profile...');
        const { error } = await updateProfile({
          display_name: displayName,
          username: username,
          bio: bio,
          image_url: profileImageUrl,
          topics: selectedTopics || [],
          role: 'creator'
        });

        if (error) {
          console.error('Profile update error:', error);
          toast.error('Failed to save profile');
          setSaving(false);
          return;
        }

        console.log('Profile updated successfully');
        toast.success('Profile saved successfully!');
      } else {
        // For demo users, just store locally or simulate
        console.log('Demo user profile saved locally');
        toast.success('Demo profile saved!');
      }

      // Small delay to show success message, then continue
      setTimeout(() => {
        console.log('Continuing onboarding flow...');
        onContinue?.();
      }, 1000);

    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // Theme-aware styling
  const backgroundClass = isDarkMode ? 'bg-black' : 'bg-gray-50';
  const textClass = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardClass = isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300';
  const inputClass = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';

  return (
    <div className={`max-w-4xl mx-auto ${textClass}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <PenTool className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Set Up Your Creator Profile</h1>
        <p className={`text-xl ${mutedTextClass}`}>
          Tell your audience who you are and what you bring to the financial community.
        </p>
      </div>

      {/* Profile Setup Form */}
      <div className={`${cardClass} p-8 rounded-2xl border shadow-xl max-w-2xl mx-auto`}>
        <div className="space-y-8">
          {/* Profile Picture */}
          <div className="text-center">
            <ProfilePictureUpload
              currentImageUrl={profileImageUrl}
              displayName={displayName}
              onImageChange={setProfileImageUrl}
              userType={userType}
              disabled={saving}
            />
          </div>

          {/* Display Name */}
          <div>
            <Label className={`block text-sm font-medium ${textClass} mb-2`}>
              Display Name *
            </Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your full name"
              className={inputClass}
              disabled={saving}
            />
          </div>

          {/* Username */}
          <div>
            <Label className={`block text-sm font-medium ${textClass} mb-2`}>
              Username *
            </Label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${mutedTextClass}`}>
                @
              </span>
              <Input
                value={username}
                onChange={handleUsernameChange}
                onBlur={handleUsernameBlur}
                placeholder="username"
                className={`${inputClass} pl-8 ${usernameError ? 'border-red-500' : ''}`}
                disabled={saving}
              />
            </div>
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
            {usernameChecking && (
              <p className={`${mutedTextClass} text-sm mt-1`}>Checking availability...</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <Label className={`block text-sm font-medium ${textClass} mb-2`}>
              Bio
            </Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell your audience about your expertise, background, and what makes your financial insights valuable..."
              className={`${inputClass} min-h-[100px]`}
              disabled={saving}
            />
            <p className={`text-sm ${mutedTextClass} mt-1`}>
              {bio.length}/500 characters
            </p>
          </div>

          {/* Topics Preview */}
          {selectedTopics && selectedTopics.length > 0 && (
            <div>
              <Label className={`block text-sm font-medium ${textClass} mb-2`}>
                Your Topics
              </Label>
              <div className="flex flex-wrap gap-2">
                {selectedTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving || !displayName.trim() || !username.trim() || !!usernameError}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 text-lg"
          >
            {saving ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Saving Profile...</span>
              </div>
            ) : (
              'Save Profile & Continue'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfileSetup;
