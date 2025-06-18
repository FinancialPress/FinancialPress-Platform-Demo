// SupportCreatorModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportCreatorModalProps {
  creatorHandle: string;
  creatorName?: string;
  followerCount?: string;
  isVerified?: boolean;
  postTitle: string;
  postId?: string;
  isOpen: boolean;
  onClose: () => void;
  onTip: (amount: number, message?: string, postId?: string) => void;
  onSubscribe: (postId?: string) => void;
}

const SupportCreatorModal = ({
  creatorHandle,
  creatorName = 'Creator',
  followerCount = '1.2K',
  isVerified = false,
  postTitle,
  postId,
  isOpen,
  onClose,
  onTip,
  onSubscribe
}: SupportCreatorModalProps) => {
  const [activeTab, setActiveTab] = useState<'tip' | 'subscribe'>('tip');
  const [tipAmount, setTipAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTipAmount('');
      setMessage('');
      setIsSuccess(false);
      setActiveTab('tip');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const handleSubmit = () => {
    if (activeTab === 'tip') {
      const amount = parseFloat(tipAmount);
      if (!amount || amount <= 0) {
        toast({
          title: 'Invalid Amount',
          description: 'Please enter a valid tip amount greater than 0',
          variant: 'destructive'
        });
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      if (activeTab === 'tip') {
        const amount = parseFloat(tipAmount);
        onTip(amount, message || undefined, postId);
        toast({
          title: 'Tip Sent!',
          description: `${amount} FPT sent to ${creatorHandle}`
        });
      } else {
        onSubscribe(postId);
        toast({
          title: 'Subscribed!',
          description: `You're now following ${creatorHandle}`
        });
      }
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Support Creator</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Creator Info */}
        <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-yellow-500 text-black font-bold">
              {creatorHandle.charAt(1)?.toUpperCase() || 'C'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white">{creatorHandle}</span>
              {isVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Users className="w-3 h-3" />
              <span>{followerCount} followers</span>
            </div>
          </div>
        </div>

        {/* Post Title */}
        <div className="text-sm">
          <span className="text-gray-400">Supporting post:</span>
          <span className="ml-1 font-medium text-white">
            {postTitle.length > 50 ? `${postTitle.slice(0, 50)}...` : postTitle}
          </span>
        </div>

        {/* Tab Switch */}
        <div className="flex space-x-2">
          <Button
            className={`flex-1 ${activeTab === 'tip' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('tip')}
          >
            Tip
          </Button>
          <Button
            className={`flex-1 ${activeTab === 'subscribe' ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('subscribe')}
          >
            Subscribe
          </Button>
        </div>

        {/* Tip Amount */}
        {activeTab === 'tip' && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Tip Amount (FPT)</label>
            <Input
              type="number"
              placeholder="Enter amount..."
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              min="0"
              step="0.1"
            />
          </div>
        )}

        {/* Subscribe Info */}
        {activeTab === 'subscribe' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-2">
            <h4 className="font-medium">Monthly Subscription</h4>
            <p className="text-sm text-gray-300">
              Get exclusive content and early access to {creatorHandle}'s posts
            </p>
            <div>
              <span className="text-lg font-bold text-yellow-500">5.0 FPT</span>
              <span className="text-sm text-gray-400 ml-1">/month</span>
            </div>
          </div>
        )}

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Direct Message (Optional)</label>
          <Textarea
            placeholder="Send a message to the creator..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white h-24 resize-none"
            maxLength={500}
          />
          <div className="text-xs text-right text-gray-400">{message.length}/500</div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            onClick={handleSubmit}
            disabled={isLoading || (activeTab === 'tip' && (!tipAmount || parseFloat(tipAmount) <= 0))}
          >
            {isLoading ? 'Processing...' : activeTab === 'tip' ? 'Send Tip' : 'Subscribe'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportCreatorModal;
