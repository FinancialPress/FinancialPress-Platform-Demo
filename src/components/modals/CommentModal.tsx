
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useComments } from '@/hooks/useComments';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
  isDarkMode: boolean;
}

const CommentModal = ({ isOpen, onClose, postId, postTitle, isDarkMode }: CommentModalProps) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { user } = useAuth();
  const { profile } = useProfile();
  const { comments, submitting, addComment } = useComments(postId);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  // Focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const success = await addComment(content);
    if (success) {
      setContent('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${bgColor} ${textColor} max-w-2xl max-h-[80vh] overflow-hidden`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Comment
          </DialogTitle>
          <p className={`${mutedColor} text-sm truncate`}>
            {postTitle}
          </p>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          {/* Comment input */}
          <div className="flex space-x-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={profile?.image_url} />
              <AvatarFallback className="bg-yellow-500 text-black font-semibold">
                {profile?.display_name?.[0] || profile?.username?.[0] || user?.email?.[0]?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a comment..."
                className={`min-h-[100px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 ${textColor} placeholder:${mutedColor}`}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${mutedColor}`}>
                  {content.length}/1000 • Ctrl+Enter to submit
                </span>
                <Button
                  onClick={handleSubmit}
                  disabled={!content.trim() || submitting}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitting ? 'Posting...' : 'Comment'}
                </Button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          <div className="max-h-96 overflow-y-auto space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={comment.profile?.image_url} />
                  <AvatarFallback className="bg-gray-500 text-white text-xs">
                    {comment.profile?.display_name?.[0] || comment.profile?.username?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">
                      {comment.profile?.display_name || comment.profile?.username || 'Anonymous'}
                    </span>
                    <span className={`text-xs ${mutedColor}`}>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${textColor}`}>
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
