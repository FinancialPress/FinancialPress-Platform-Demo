
import { supabase } from '@/integrations/supabase/client';

export const uploadContentImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `content/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('content_uploads')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('content_uploads')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};

export const getPlaceholderImage = (section?: string): string => {
  const placeholders = {
    stock: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop',
    crypto: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop',
    default: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop'
  };
  
  return placeholders[section as keyof typeof placeholders] || placeholders.default;
};
