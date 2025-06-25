
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import CommentModal from '@/components/modals/CommentModal';
import { cn } from '@/lib/utils';

interface CommentButtonProps {
  postId: string;
  postTitle: string;
  mutedText: string;
  isDarkMode: boolean;
  className?: string;
}

const CommentButton = ({ postId, postTitle, mutedText, isDarkMode, className }: CommentButtonProps) => {
  const { comments } = useComments(postId);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={cn(
          `flex items-center space-x-2 ${mutedText} hover:text-blue-400 transition-colors`,
          className
        )}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">{comments.length}</span>
      </button>

      <CommentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        postId={postId}
        postTitle={postTitle}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default CommentButton;
