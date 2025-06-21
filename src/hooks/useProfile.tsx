
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  bio: string | null;
  image_url: string | null;
  topics: string[] | null;
  role: string | null;
  referral_code: string | null;
  referred_by: string | null;
  wallet_identifier: string | null;
  instance_id: string | null;
  fpt_balance: number | null;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        setError(error.message);
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updates
        }, { onConflict: 'id' });

      if (!error) {
        await fetchProfile(); // Refresh profile data
      }

      return { error };
    } catch (err) {
      return { error: err };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  };
};
