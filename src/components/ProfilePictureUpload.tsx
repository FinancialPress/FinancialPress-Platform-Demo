
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import ImageCropUpload from './ImageCropUpload';

interface ProfilePictureUploadProps {
  currentImageUrl?: string | null;
  displayName?: string;
  onImageChange: (imageUrl: string | null) => void;
  userType?: 'demo' | 'live' | null;
  disabled?: boolean;
}

const ProfilePictureUpload = ({ 
  currentImageUrl, 
  displayName, 
  onImageChange, 
  userType,
  disabled = false 
}: ProfilePictureUploadProps) => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);

  const handleImageCropped = async (croppedImageUrl: string) => {
    // For demo users, just use the cropped image URL directly
    if (userType === 'demo') {
      setPreviewUrl(croppedImageUrl);
      onImageChange(croppedImageUrl);
      return;
    }

    // For live users, upload to Supabase
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload images",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Convert data URL to blob for upload
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      
      // Create unique filename
      const fileName = `${user.id}/profile-${Date.now()}.jpg`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      setPreviewUrl(publicUrl);
      onImageChange(publicUrl);

      toast({
        title: "Success",
        description: "Profile picture uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Theme-aware styling
  const labelClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="space-y-4">
      <Label className={labelClass}>Profile Picture</Label>
      
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={previewUrl || undefined} alt="Profile" />
          <AvatarFallback className="bg-yellow-500 text-black font-semibold text-lg">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col space-y-2">
          <ImageCropUpload
            onImageCropped={handleImageCropped}
            aspectRatio={1} // Square aspect ratio for profile pictures
            currentImageUrl={previewUrl}
            disabled={disabled || uploading}
            userType={userType}
            buttonText={previewUrl ? 'Change Photo' : 'Upload Photo'}
            showRemove={!!previewUrl}
            onRemove={handleRemoveImage}
          />

          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            JPG, PNG or GIF. Max 5MB. Image will be cropped to square.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
