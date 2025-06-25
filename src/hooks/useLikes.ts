
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

  // Generate a valid UUID for mock post IDs
  const getValidPostId = useCallback((id: string): string => {
    if (id.includes('feed-') || id.includes('post-')) {
      // Convert mock IDs to deterministic UUIDs
      const hash = id.split('-')[1] || '1';
      const paddedHash = hash.padStart(8, '0');
      return `${paddedHash}-0000-4000-8000-000000000000`;
    }
    return id;
  }, []);

  const validPostId = getValidPostId(postId);

  // Fetch initial likes
  const fetchLikes = useCallback(async () => {
    if (!validPostId) return;

    try {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', validPostId);

      if (error) throw error;

      setLikes(data || []);
      setLikesCount(data?.length || 0);
      
      if (user) {
        setIsLiked(data?.some(like => like.user_id === user.id) || false);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [validPostId, user]);

  // Toggle like with optimistic UI
  const toggleLike = useCallback(async () => {
    if (!user) {
      toast.info('Please sign in to like posts');
      return;
    }

    if (loading || !validPostId) return;
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
          .eq('post_id', validPostId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: validPostId,
            user_id: user.id
          });

        if (error) throw error;

        // Award FPT tokens for liking - only for new likes
        try {
          const success = await addTokens(
            0.01,
            'engagement',
            'Like reward',
            { post_id: validPostId, action: 'like' }
          );
          
          if (success) {
            toast.success('You earned 0.01 FPT for liking this post!');
          }
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
  }, [user, isLiked, loading, validPostId, addTokens]);

  // Set up realtime subscription
  useEffect(() => {
    fetchLikes();

    const unsubscribe = realtimeManager.subscribe(
      'likes',
      'likes',
      (payload) => {
        if (payload.new?.post_id === validPostId || payload.old?.post_id === validPostId) {
          fetchLikes();
        }
      }
    );

    return unsubscribe;
  }, [fetchLikes, validPostId, realtimeManager]);

  return {
    likes,
    likesCount,
    isLiked,
    loading,
    toggleLike
  };
};
