import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { RealtimeChannel } from '@supabase/supabase-js';

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
/*  Hook                                                              */
/* ------------------------------------------------------------------ */

export const usePosts = () => {
  /* ---------------- state ---------------- */
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  /* ------------- helpers / context -------- */
  const { user } = useAuth();
  const { toast } = useToast();

  /* ------------- singleton channel -------- */
  const postsChannelRef = useRef<RealtimeChannel | null>(null);

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

      const typedPosts: Post[] = (data ?? []).map((p) => ({
        ...p,
        type: p.type as 'create_earn' | 'share_insight',
        tags: Array.isArray(p.tags) ? p.tags : [],
        body: p.body || '',
        image_url: p.image_url || null,
        external_url: p.external_url || null,
        section: p.section || null
      }));

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
      const { data, error } = await supabase.rpc('create_earn_post', {
        payload: {
          title: postData.title,
          body: postData.body,
          image_url: postData.image_url ?? null,
          tags: postData.tags ?? [],
          section: postData.section ?? 'stock'
        }
      });
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your Create & Earn post has been published!'
      });
      return data;
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
      const { data, error } = await supabase.rpc('share_insight_post', {
        payload: {
          title: postData.title,
          external_url: postData.external_url,
          commentary: postData.commentary ?? null,
          image_url: postData.image_url ?? null,
          tags: postData.tags ?? []
        }
      });
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your insight has been shared!'
      });
      return data;
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
  /*  Effect: initial fetch + realtime subscription                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    /* 1️⃣ initial fetch */
    fetchPosts();

    /* 2️⃣ set up realtime channel once */
    if (!postsChannelRef.current) {
      postsChannelRef.current = supabase
        .channel('posts_changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'posts' },
          (payload) => {
            if (!payload?.new) return;

            const newPost: Post = {
              ...payload.new,
              type: payload.new.type as 'create_earn' | 'share_insight',
              tags: Array.isArray(payload.new.tags) ? payload.new.tags : [],
              body: payload.new.body || '',
              image_url: payload.new.image_url || null,
              external_url: payload.new.external_url || null,
              section: payload.new.section || null
            };

            setPosts((prev) => [newPost, ...prev]);
          }
        );

      postsChannelRef.current
        .subscribe()
        .catch((err) => console.error('Realtime subscribe error:', err));
    }

    /* 3️⃣ cleanup */
    return () => {
      if (postsChannelRef.current) {
        supabase.removeChannel(postsChannelRef.current);
        postsChannelRef.current = null;
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
