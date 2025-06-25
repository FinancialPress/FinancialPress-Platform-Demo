
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { useUserMode } from '@/hooks/useUserMode';
import { toast } from 'sonner';

export const useLikes = (postId: string) => {
  const { user } = useAuth();
  const { addTokens } = useFPTTokens();
  const { isLiveUser } = useUserMode();
  const [likes, setLikes] = useState<any[]>([]);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLikes = async () => {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId);

      if (error) throw error;

      setLikes(data || []);
      setLikesCount(data?.length || 0);
      
      if (user) {
        const userLike = data?.find(like => like.user_id === user.id);
        setIsLiked(!!userLike);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const toggleLike = async () => {
    if (!user || !isLiveUser) {
      toast.error('Please sign up to like posts!');
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;

        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });

        if (error) throw error;

        setIsLiked(true);
        setLikesCount(prev => prev + 1);

        // Award 0.01 FPT for liking
        await addTokens(
          0.01,
          'earn_share', // Using existing transaction type
          `Liked post`,
          {
            post_id: postId,
            action: 'like',
            timestamp: new Date().toISOString()
          }
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchLikes();
    }
  }, [postId, user]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!postId) return;

    const channel = supabase
      .channel(`likes-${postId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'likes',
        filter: `post_id=eq.${postId}`
      }, () => {
        fetchLikes();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  return {
    likes,
    likesCount,
    isLiked,
    loading,
    toggleLike
  };
};
