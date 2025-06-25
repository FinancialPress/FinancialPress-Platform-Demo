
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { useRealtimeManager } from './useRealtimeManager';
import { toast } from 'sonner';

interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export const useLikes = (postId: string) => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { addTokens } = useFPTTokens();
  const realtimeManager = useRealtimeManager();

  // Fetch initial likes
  const fetchLikes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId);

      if (error) throw error;

      setLikes(data || []);
      setLikesCount(data?.length || 0);
      
      if (user) {
        setIsLiked(data?.some(like => like.user_id === user.id) || false);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [postId, user]);

  // Toggle like with optimistic UI
  const toggleLike = useCallback(async () => {
    if (!user) {
      toast.info('Please sign in to like posts');
      return;
    }

    if (loading) return;
    setLoading(true);

    // Optimistic UI update
    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      if (wasLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });

        if (error) throw error;

        // Award FPT tokens for liking
        try {
          await addTokens(
            0.01,
            'engagement',
            'Like reward',
            { post_id: postId, action: 'like' }
          );
        } catch (tokenError) {
          console.warn('Token reward failed:', tokenError);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      
      // Revert optimistic update on error
      setIsLiked(wasLiked);
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
      
      toast.error('Failed to update like');
    } finally {
      setLoading(false);
    }
  }, [user, isLiked, loading, postId, addTokens]);

  // Set up realtime subscription
  useEffect(() => {
    fetchLikes();

    const unsubscribe = realtimeManager.subscribe(
      'likes',
      'likes',
      (payload) => {
        if (payload.new?.post_id === postId || payload.old?.post_id === postId) {
          fetchLikes();
        }
      }
    );

    return unsubscribe;
  }, [fetchLikes, postId, realtimeManager]);

  return {
    likes,
    likesCount,
    isLiked,
    loading,
    toggleLike
  };
};
