
import React, { useState } from 'react';
import { X, Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useComments } from '@/hooks/useComments';
import { formatDistanceToNow } from 'date-fns';

// Emoji picker with fallback
let EmojiPicker: any = null;
try {
  EmojiPicker = require('@emoji-mart/react').default;
} catch (error) {
  console.log('Emoji picker not available');
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
  isDarkMode: boolean;
}

const CommentModal = ({ isOpen, onClose, postId, postTitle, isDarkMode }: CommentModalProps) => {
  const { comments, loading, submitting, addComment } = useComments(postId);
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const success = await addComment(commentText);
    if (success) {
      setCommentText('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setCommentText(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const bgClasses = isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${bgClasses} rounded-lg border max-w-2xl w-full max-h-[80vh] flex flex-col`}>
        {/* Header */}
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
          <div>
            <h3 className={`${textClasses} font-semibold text-lg`}>Comments</h3>
            <p className={`${mutedText} text-sm truncate max-w-md`}>{postTitle}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex space-x-3">
                  <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div className="flex-1 space-y-2">
                    <div className={`h-4 rounded w-1/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`h-3 rounded w-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  {comment.profile?.image_url ? (
                    <img 
                      src={comment.profile.image_url} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-black font-bold text-sm">
                      {comment.profile?.display_name?.charAt(0) || 
                       comment.profile?.username?.charAt(0) || 
                       'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`${textClasses} font-medium text-sm`}>
                      {comment.profile?.display_name || 
                       comment.profile?.username || 
                       'Anonymous User'}
                    </span>
                    <span className={`${mutedText} text-xs`}>
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className={`${textClasses} text-sm break-words`}>{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className={`${mutedText} text-sm`}>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className={`min-h-[80px] resize-none ${bgClasses} ${textClasses} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                maxLength={1000}
                disabled={submitting}
              />
              <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                {EmojiPicker && (
                  <div className="relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      disabled={submitting}
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-8 right-0 z-10">
                        <EmojiPicker
                          onEmojiSelect={handleEmojiSelect}
                          theme={isDarkMode ? 'dark' : 'light'}
                          data={require('@emoji-mart/data')}
                        />
                      </div>
                    )}
                  </div>
                )}
                <span className={`text-xs ${mutedText}`}>
                  {commentText.length}/1000
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className={`text-xs ${mutedText}`}>
                You'll earn 0.05 FPT for commenting!
              </p>
              <Button
                type="submit"
                disabled={!commentText.trim() || submitting}
                className="bg-fpYellow hover:bg-fpYellowDark text-black font-semibold"
              >
                {submitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Post Comment</span>
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default CommentModal;
