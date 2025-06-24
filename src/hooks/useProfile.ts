
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  email: string | null;
  display_name: string | null;
  username: string | null;
  bio: string | null;
  topics: string[];
  role: string | null;
  wallet_identifier: string | null;
  referral_code: string | null;
  referred_by: string | null;
  fpt_balance: number;
  image_url: string | null;
  instance_id: string | null;
}

// Global profile state for immediate updates across all components
let globalProfile: UserProfile | null = null;
let profileListeners: Set<(profile: UserProfile | null) => void> = new Set();

const notifyProfileListeners = (profile: UserProfile | null) => {
  globalProfile = profile;
  profileListeners.forEach(listener => {
    try {
      listener(profile);
    } catch (error) {
      console.error('Error in profile update listener:', error);
    }
  });
};

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(globalProfile);
  const [loading, setLoading] = useState(false);

  // Register listener for global profile updates
  useEffect(() => {
    const updateListener = (newProfile: UserProfile | null) => {
      setProfile(newProfile);
    };

    profileListeners.add(updateListener);

    return () => {
      profileListeners.delete(updateListener);
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      notifyProfileListeners(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, user may need to complete signup process');
        }
      } else if (data) {
        setProfile(data);
        notifyProfileListeners(data);
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      await fetchProfile();
    }

    return { error };
  };

  const createProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: user.id,
        email: user.email,
        ...profileData
      });

    if (!error) {
      await fetchProfile();
    }

    return { error };
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    if (!username) return false;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    // If there's an actual error (not just "no rows found"), return false
    if (error) {
      console.error('Error checking username availability:', error);
      return false;
    }

    // If no data is returned, the username is available
    // If data is returned, the username is taken
    return !data;
  };

  // Force immediate update of global profile state
  const forceProfileUpdate = async () => {
    await fetchProfile();
  };

  return {
    profile,
    loading,
    updateProfile,
    createProfile,
    checkUsernameAvailability,
    refetch: fetchProfile,
    forceUpdate: forceProfileUpdate
  };
};
