
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Activity {
  id: string;
  user_id: string;
  activity_type: string;
  post_id?: string;
  metadata: any;
  created_at: string;
}

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchActivities = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchActivities();

      // Subscribe to realtime changes for user's activities
      const channel = supabase
        .channel('user_activities')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'activities',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            if (payload.new) {
              setActivities(prev => {
                if (prev.find(a => a.id === payload.new.id)) return prev; // dedupe
                return [payload.new as Activity, ...prev];
              });
            } else {
              fetchActivities();
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    activities,
    loading,
    refetch: fetchActivities
  };
};
