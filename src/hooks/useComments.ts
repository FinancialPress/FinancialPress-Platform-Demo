
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEngagement } from '@/hooks/useEngagement';
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
  const { trackEngagement, triggerReward, isLiveUser } = useEngagement();
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

  // Fetch comments with profile data
  const fetchComments = useCallback(async () => {
    if (!validPostId) return;

    try {
      setLoading(true);
      console.log('Fetching comments for post:', validPostId);
      
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', validPostId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
        return;
      }

      console.log('Comments fetched:', commentsData);

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
      console.log('Adding comment to post:', validPostId, 'content:', content.trim());
      
      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: validPostId,
          user_id: user.id,
          content: content.trim()
        });

      if (error) {
        console.error('Error adding comment:', error);
        throw error;
      }

      console.log('Comment added successfully');

      // Award FPT tokens for commenting - using same pattern as Share & Earn
      if (isLiveUser) {
        try {
          console.log('Tracking comment engagement and triggering reward...');
          await trackEngagement('comment', validPostId);
          
          // Use triggerReward but pass correct parameters - it handles success internally
          triggerReward('comment', validPostId);
          
          console.log('Comment reward triggered successfully');
        } catch (tokenError) {
          console.warn('Token reward failed:', tokenError);
        }
      }

      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment. Please try again.');
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [user, validPostId, trackEngagement, triggerReward, isLiveUser]);

  // Set up realtime subscription
  useEffect(() => {
    if (!validPostId) return;

    fetchComments();

    const unsubscribe = realtimeManager.subscribe(
      'comments',
      'comments',
      (payload) => {
        console.log('Realtime comments update:', payload);
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
