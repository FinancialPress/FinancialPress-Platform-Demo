
import React from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostItem from './PostItem';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PostsListProps {
  isDarkMode: boolean;
}

const PostsList = ({ isDarkMode }: PostsListProps) => {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
        <CardContent className="p-6 text-center">
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            No posts yet. Be the first to create content!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
};

export default PostsList;
