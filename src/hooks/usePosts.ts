
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
}

export interface ShareInsightPostData {
  title: string;
  external_url: string;
  commentary?: string;
  image_url?: string;
  tags?: string[];
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPosts = async (section?: 'stock' | 'crypto') => {
    try {
      setLoading(true);
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (section) {
        query = query.eq('section', section);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Type cast the data to ensure proper typing
      const typedPosts = (data || []).map(post => ({
        ...post,
        type: post.type as 'create_earn' | 'share_insight',
        tags: post.tags || []
      })) as Post[];
      
      setPosts(typedPosts);
      return typedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createEarnPost = async (postData: CreateEarnPostData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create posts",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase.rpc('create_earn_post', {
        payload: {
          title: postData.title,
          body: postData.body,
          image_url: postData.image_url || null,
          tags: postData.tags || [],
          section: postData.section || 'stock'
        }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Your Create & Earn post has been published!",
      });

      // Refresh posts
      await fetchPosts();
      return data;
    } catch (error) {
      console.error('Error creating earn post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
      return null;
    }
  };

  const shareInsightPost = async (postData: ShareInsightPostData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to share insights",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase.rpc('share_insight_post', {
        payload: {
          title: postData.title,
          external_url: postData.external_url,
          commentary: postData.commentary || null,
          image_url: postData.image_url || null,
          tags: postData.tags || []
        }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Your insight has been shared!",
      });

      // Refresh posts
      await fetchPosts();
      return data;
    } catch (error) {
      console.error('Error sharing insight:', error);
      toast({
        title: "Error",
        description: "Failed to share insight",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    posts,
    loading,
    createEarnPost,
    shareInsightPost,
    fetchPosts,
    refetch: fetchPosts
  };
};
