
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { useRealtimeManager } from './useRealtimeManager';
import { toast } from 'sonner';

interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface CommentWithProfile extends Comment {
  profile?: {
    display_name: string;
    username: string;
    image_url: string;
  };
}

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
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

  // Fetch comments with profile data
  const fetchComments = useCallback(async () => {
    if (!validPostId) return;

    try {
      setLoading(true);
      
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', validPostId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (commentsData && commentsData.length > 0) {
        // Fetch profiles for comment authors
        const userIds = [...new Set(commentsData.map(c => c.user_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, display_name, username, image_url')
          .in('id', userIds);

        // Map profiles to comments
        const commentsWithProfiles = commentsData.map(comment => ({
          ...comment,
          profile: profiles?.find(p => p.id === comment.user_id)
        }));

        setComments(commentsWithProfiles);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [validPostId]);

  // Add new comment
  const addComment = useCallback(async (content: string) => {
    if (!user) {
      toast.info('Please sign in to comment');
      return false;
    }

    if (!content.trim()) {
      toast.error('Comment cannot be empty');
      return false;
    }

    if (!validPostId) {
      toast.error('Invalid post');
      return false;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: validPostId,
          user_id: user.id,
          content: content.trim()
        });

      if (error) throw error;

      // Award FPT tokens for commenting - only after successful comment submission
      try {
        const success = await addTokens(
          0.05,
          'engagement',
          'Comment reward',
          { post_id: validPostId, action: 'comment' }
        );
        
        if (success) {
          toast.success('You earned 0.05 FPT for commenting on this post!');
        }
      } catch (tokenError) {
        console.warn('Token reward failed:', tokenError);
      }

      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [user, validPostId, addTokens]);

  // Set up realtime subscription
  useEffect(() => {
    fetchComments();

    const unsubscribe = realtimeManager.subscribe(
      'comments',
      'comments',
      (payload) => {
        if (payload.new?.post_id === validPostId || payload.old?.post_id === validPostId) {
          fetchComments();
        }
      }
    );

    return unsubscribe;
  }, [fetchComments, validPostId, realtimeManager]);

  return {
    comments,
    loading,
    submitting,
    addComment,
    commentsCount: comments.length
  };
};
