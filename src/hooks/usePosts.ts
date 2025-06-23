
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import type { RealtimeChannel } from '@supabase/supabase-js';

/* ------------------------------------------------------------------ */
/*  Singleton channel management                                      */
/* ------------------------------------------------------------------ */

let postsChannel: RealtimeChannel | null = null;
let listeners = 0;
let cachedPosts: Post[] = [];

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface Post {
  id: string;
  author_id: string;
  type: 'create_earn' | 'share_insight';
  title: string;
  body?: string;
  image_url?: string;
  external_url?: string;
  tags: string[];
  section?: 'stock' | 'crypto';
  created_at: string;
  updated_at: string;
}

export interface CreateEarnPostData {
  title: string;
  body: string;
  image_url?: string;
  tags?: string[];
  section?: 'stock' | 'crypto';
  [key: string]: any;
}

export interface ShareInsightPostData {
  title: string;
  external_url: string;
  commentary?: string;
  image_url?: string;
  tags?: string[];
  [key: string]: any;
}

/* ------------------------------------------------------------------ */
/*  Helper: normalize raw DB row to Post                             */
/* ------------------------------------------------------------------ */

const normalizePost = (rawPost: any): Post => ({
  ...rawPost,
  type: rawPost.type as 'create_earn' | 'share_insight',
  tags: Array.isArray(rawPost.tags) ? rawPost.tags : [],
  body: rawPost.body || '',
  image_url: rawPost.image_url || null,
  external_url: rawPost.external_url || null,
  section: rawPost.section || null
});

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */

export const usePosts = () => {
  /* ---------------- state ---------------- */
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  /* ------------- helpers / context -------- */
  const { user } = useAuth();
  const { toast } = useToast();
  const { addTokens } = useFPTTokens();

  /* ---------------------------------------------------------------- */
  /*  CRUD helpers                                                    */
  /* ---------------------------------------------------------------- */

  const fetchPosts = async (section?: 'stock' | 'crypto') => {
    try {
      setLoading(true);

      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (section) query = query.eq('section', section);

      const { data, error } = await query;
      if (error) throw error;

      const typedPosts: Post[] = (data ?? []).map(normalizePost);

      // Update both local state and shared cache
      cachedPosts = typedPosts;
      setPosts(typedPosts);
      return typedPosts;
    } catch (err) {
      console.error('Error fetching posts:', err);
      toast({
        title: 'Error',
        description: 'Failed to fetch posts',
        variant: 'destructive'
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createEarnPost = async (postData: CreateEarnPostData) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to create posts',
        variant: 'destructive'
      });
      return null;
    }

    try {
      console.log('Creating earn post with data:', postData);
      
      const { data, error } = await supabase.rpc('create_earn_post', {
        payload: {
          title: postData.title,
          body: postData.body,
          image_url: postData.image_url ?? null,
          tags: postData.tags ?? [],
          section: postData.section ?? 'stock'
        }
      });
      
      if (error) {
        console.error('Error creating earn post:', error);
        throw error;
      }

      console.log('Post created successfully:', data);

      // Award FPT tokens for publishing content
      const tokenSuccess = await addTokens(
        5,
        'earn_share',
        'Content creation reward',
        {
          post_id: data.id,
          post_type: 'create_earn',
          title: postData.title
        }
      );

      if (!tokenSuccess) {
        console.warn('Token award failed but post was created successfully');
      } else {
        console.log('FPT tokens awarded successfully');
      }

      toast({
        title: 'Success',
        description: 'Your Create & Earn post has been published!'
      });
      
      return normalizePost(data);
    } catch (err) {
      console.error('Error creating earn post:', err);
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive'
      });
      return null;
    }
  };

  const shareInsightPost = async (postData: ShareInsightPostData) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to share insights',
        variant: 'destructive'
      });
      return null;
    }

    try {
      console.log('Creating insight post with data:', postData);
      
      const { data, error } = await supabase.rpc('share_insight_post', {
        payload: {
          title: postData.title,
          external_url: postData.external_url,
          commentary: postData.commentary ?? null,
          image_url: postData.image_url ?? null,
          tags: postData.tags ?? []
        }
      });
      
      if (error) {
        console.error('Error sharing insight post:', error);
        throw error;
      }

      console.log('Insight post created successfully:', data);

      // Award FPT tokens for sharing insight
      const tokenSuccess = await addTokens(
        5,
        'earn_share',
        'Insight sharing reward',
        {
          post_id: data.id,
          post_type: 'share_insight',
          title: postData.title,
          external_url: postData.external_url
        }
      );

      if (!tokenSuccess) {
        console.warn('Token award failed but insight was shared successfully');
      } else {
        console.log('FPT tokens awarded successfully');
      }

      toast({
        title: 'Success',
        description: 'Your insight has been shared!'
      });
      
      return normalizePost(data);
    } catch (err) {
      console.error('Error sharing insight:', err);
      toast({
        title: 'Error',
        description: 'Failed to share insight',
        variant: 'destructive'
      });
      return null;
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Effect: singleton channel + reference counting                  */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    // Increment listener count
    listeners += 1;

    // Create singleton channel if it doesn't exist
    if (!postsChannel) {
      postsChannel = supabase
        .channel('posts_changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'posts' },
          (payload) => {
            if (!payload?.new) return;

            const newPost = normalizePost(payload.new);
            
            // Update shared cache
            cachedPosts = [newPost, ...cachedPosts];
            
            // Update all active components via setPosts callback
            setPosts([...cachedPosts]);
          }
        )
        .subscribe();
    }

    // Initial fetch if cache is empty
    if (cachedPosts.length === 0) {
      fetchPosts();
    } else {
      // Use cached data
      setPosts([...cachedPosts]);
    }

    // Cleanup on unmount
    return () => {
      listeners -= 1;
      
      // Remove channel when no more listeners
      if (listeners === 0 && postsChannel) {
        supabase.removeChannel(postsChannel);
        postsChannel = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Public API                                                      */
  /* ---------------------------------------------------------------- */

  return {
    posts,
    loading,
    createEarnPost,
    shareInsightPost,
    fetchPosts,
    refetch: fetchPosts
  };
};
