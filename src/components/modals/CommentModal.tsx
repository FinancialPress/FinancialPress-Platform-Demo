
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useComments } from '@/hooks/useComments';
import { Loader2, Send, Smile } from 'lucide-react';

// Graceful emoji picker imports with fallback
let Picker: any = null;
let data: any = null;

try {
  const emojiMart = require('@emoji-mart/react');
  const emojiData = require('@emoji-mart/data');
  Picker = emojiMart.default || emojiMart;
  data = emojiData.default || emojiData;
} catch (error) {
  console.warn('Emoji picker not available:', error);
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
  isDarkMode: boolean;
}

const CommentModal = ({ isOpen, onClose, postId, postTitle, isDarkMode }: CommentModalProps) => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { comments, loading, submitting, addComment } = useComments(postId);
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const maxLength = 1000;
  const remainingChars = maxLength - commentText.length;
  const emojiPickerAvailable = !!(Picker && data);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const success = await addComment(commentText);
    if (success) {
      setCommentText('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    if (!emojiPickerAvailable) return;
    
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = commentText.slice(0, start) + emoji.native + commentText.slice(end);
      setCommentText(newText);
      
      // Set cursor position after emoji
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.native.length;
        textarea.focus();
      }, 0);
    }
    setShowEmojiPicker(false);
  };

  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[80vh] ${cardClasses} ${textClasses}`}>
        <DialogHeader>
          <DialogTitle className={`${textClasses} text-xl font-semibold`}>
            Comments on "{postTitle}"
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full max-h-[60vh]">
          {/* Comments List */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8">
                <p className={mutedTextClasses}>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.profiles?.image_url} />
                    <AvatarFallback>
                      {(comment.profiles?.display_name || comment.profiles?.username || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`${textClasses} font-medium text-sm`}>
                        {comment.profiles?.display_name || comment.profiles?.username || 'Anonymous'}
                      </span>
                      <span className={`${mutedTextClasses} text-xs`}>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`${textClasses} text-sm leading-relaxed break-words`}>
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment Input */}
          <div className="border-t pt-4 space-y-4" style={{ borderColor: isDarkMode ? '#374151' : '#e5e7eb' }}>
            <div className="flex space-x-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={profile?.image_url} />
                <AvatarFallback>
                  {(profile?.display_name || profile?.username || user?.email || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`min-h-[80px] resize-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    maxLength={maxLength}
                  />
                  <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                    {emojiPickerAvailable && (
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`p-1 rounded hover:bg-gray-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        title="Add emoji"
                      >
                        <Smile className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {emojiPickerAvailable && showEmojiPicker && (
                    <div className="absolute bottom-full right-0 mb-2 z-50">
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme={isDarkMode ? 'dark' : 'light'}
                        previewPosition="none"
                        skinTonePosition="none"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${remainingChars < 100 ? 'text-red-500' : mutedTextClasses}`}>
                    {remainingChars} characters remaining
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${mutedTextClasses}`}>
                      Ctrl+Enter to send
                    </span>
                    <Button
                      onClick={handleSubmit}
                      disabled={!commentText.trim() || submitting || remainingChars < 0}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                      size="sm"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-1" />
                          Comment & Earn 0.05 FPT
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
