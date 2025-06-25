import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEngagement } from '@/hooks/useEngagement';
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
  const { trackEngagement, isLiveUser } = useEngagement();
  const { addTokens } = useFPTTokens();
  const realtimeManager = useRealtimeManager();

  // Generate a valid UUID for mock post IDs - more robust conversion
  const getValidPostId = useCallback((id: string): string => {
    if (!id) return '';
    
    // If it's already a valid UUID, return it
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return id;
    }
    
    // Convert feed- or post- prefixed IDs to deterministic UUIDs
    if (id.includes('feed-') || id.includes('post-')) {
      const hash = id.split('-')[1] || '1';
      const paddedHash = hash.padStart(8, '0');
      return `${paddedHash}-0000-4000-8000-000000000000`;
    }
    
    // For any other string, create a deterministic UUID
    const hash = id.replace(/[^a-zA-Z0-9]/g, '').padStart(8, '0').substring(0, 8);
    return `${hash}-0000-4000-8000-000000000000`;
  }, []);

  const validPostId = getValidPostId(postId);

  // Fetch initial likes
  const fetchLikes = useCallback(async () => {
    if (!validPostId) return;

    try {
      console.log('Fetching likes for post:', validPostId);
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', validPostId);

      if (error) {
        console.error('Error fetching likes:', error);
        return;
      }

      console.log('Likes fetched:', data);
      setLikes(data || []);
      setLikesCount(data?.length || 0);
      
      if (user) {
        setIsLiked(data?.some(like => like.user_id === user.id) || false);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [validPostId, user]);

  // Toggle like with optimistic UI and proper error handling
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
      console.log('Toggling like for post:', validPostId, 'wasLiked:', wasLiked);
      
      if (wasLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', validPostId)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error unliking post:', error);
          throw error;
        }
        
        console.log('Post unliked successfully');
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: validPostId,
            user_id: user.id
          });

        if (error) {
          console.error('Error liking post:', error);
          throw error;
        }

        console.log('Post liked successfully');

        // Award FPT tokens for liking - use direct addTokens function
        if (isLiveUser) {
          try {
            console.log('Tracking like engagement and adding 0.01 FPT reward...');
            await trackEngagement('like', validPostId);
            
            // Directly add tokens using the addTokens function
            const success = await addTokens(0.01, 'like', 'Earned for liking a post', { postId: validPostId });
            
            if (success) {
              toast.success('+0.01 FPT earned!', {
                description: 'For liking content'
              });
              console.log('0.01 FPT added successfully for like');
            } else {
              console.warn('Failed to add FPT tokens for like');
            }
          } catch (tokenError) {
            console.warn('Token reward failed:', tokenError);
          }
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      
      // Revert optimistic update on error
      setIsLiked(wasLiked);
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
      
      toast.error('Failed to update like. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user, isLiked, loading, validPostId, trackEngagement, isLiveUser, addTokens]);

  // Set up realtime subscription
  useEffect(() => {
    if (!validPostId) return;

    fetchLikes();

    const unsubscribe = realtimeManager.subscribe(
      'likes',
      'likes',
      (payload) => {
        console.log('Realtime likes update:', payload);
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
