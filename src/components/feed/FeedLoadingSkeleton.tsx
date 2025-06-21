
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface FeedLoadingSkeletonProps {
  isDarkMode: boolean;
  count?: number;
}

const FeedLoadingSkeleton = ({ isDarkMode, count = 3 }: FeedLoadingSkeletonProps) => {
  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className={cardClasses}>
          <CardContent className="p-6">
            {/* User Header Skeleton */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              </div>
              <Skeleton className="w-6 h-6" />
            </div>

            {/* Content Skeleton */}
            <div className="mb-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Image Skeleton (sometimes) */}
            {Math.random() > 0.4 && (
              <Skeleton className="w-full h-80 rounded-lg mb-4" />
            )}

            {/* Engagement Stats Skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-6">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default FeedLoadingSkeleton;
