
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { useUserMode } from '@/hooks/useUserMode';
import { toast } from 'sonner';

export const useComments = (postId: string) => {
  const { user } = useAuth();
  const { addTokens } = useFPTTokens();
  const { isLiveUser } = useUserMode();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles!comments_user_id_fkey (
            display_name,
            username,
            image_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content: string) => {
    if (!user || !isLiveUser) {
      toast.error('Please sign up to comment!');
      return false;
    }

    if (!content.trim()) {
      toast.error('Comment cannot be empty');
      return false;
    }

    if (content.length > 1000) {
      toast.error('Comment is too long (max 1000 characters)');
      return false;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: content.trim()
        });

      if (error) throw error;

      // Award 0.05 FPT for commenting
      await addTokens(
        0.05,
        'earn_share', // Using existing transaction type
        `Commented on post`,
        {
          post_id: postId,
          action: 'comment',
          timestamp: new Date().toISOString()
        }
      );

      toast.success('Comment added! You earned 0.05 FPT!');
      await fetchComments();
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Subscribe to realtime changes
  useEffect(() => {
    if (!postId) return;

    const channel = supabase
      .channel(`comments-${postId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'comments',
        filter: `post_id=eq.${postId}`
      }, () => {
        fetchComments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  return {
    comments,
    loading,
    submitting,
    addComment,
    refreshComments: fetchComments
  };
};
