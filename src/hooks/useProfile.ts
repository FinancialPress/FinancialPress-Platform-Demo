
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  email: string | null;
  display_name: string | null;
  bio: string | null;
  topics: string[];
  role: string | null;
  wallet_identifier: string | null;
  referral_code: string | null;
  referred_by: string | null;
  fpt_balance: number;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    const { error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
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
        ...profileData,
        updated_at: new Date().toISOString()
      });

    if (!error) {
      await fetchProfile();
    }

    return { error };
  };

  return {
    profile,
    loading,
    updateProfile,
    createProfile,
    refetch: fetchProfile
  };
};
