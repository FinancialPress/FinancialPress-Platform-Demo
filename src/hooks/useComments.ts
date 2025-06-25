
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { useUserMode } from '@/hooks/useUserMode';
import { toast } from 'sonner';

interface CommentWithProfile {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  post_id: string;
  profile?: {
    display_name: string | null;
    username: string | null;
    image_url: string | null;
  };
}

export const useComments = (postId: string) => {
  const { user } = useAuth();
  const { addTokens } = useFPTTokens();
  const { isLiveUser } = useUserMode();
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    if (!postId) return;
    
    try {
      setLoading(true);
      
      // Step 1: Fetch comments for the post
      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        setComments([]);
        return;
      }

      if (!commentsData || commentsData.length === 0) {
        setComments([]);
        return;
      }

      // Step 2: Extract unique user IDs and batch fetch profiles
      const uniqueUserIds = [...new Set(commentsData.map(comment => comment.user_id))];
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, display_name, username, image_url')
        .in('id', uniqueUserIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        // Continue with comments but without profile data
        setComments(commentsData.map(comment => ({ ...comment, profile: undefined })));
        return;
      }

      // Step 3: Map profile data to comments
      const profileMap = new Map(
        (profilesData || []).map(profile => [profile.id, profile])
      );

      const commentsWithProfiles: CommentWithProfile[] = commentsData.map(comment => ({
        ...comment,
        profile: profileMap.get(comment.user_id) || {
          display_name: null,
          username: null,
          image_url: null
        }
      }));

      setComments(commentsWithProfiles);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
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

  // Subscribe to realtime changes with proper cleanup and unique channel naming
  useEffect(() => {
    if (!postId) return;

    // Create a unique channel name to avoid conflicts
    const channelName = `comments-realtime-${postId}-${Date.now()}`;
    
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'comments',
        filter: `post_id=eq.${postId}`
      }, () => {
        console.log('Comment change detected, refetching...');
        fetchComments();
      })
      .subscribe((status) => {
        console.log(`Comments subscription status for ${postId}:`, status);
      });

    return () => {
      console.log(`Cleaning up comments subscription for ${postId}`);
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
