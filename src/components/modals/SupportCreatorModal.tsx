
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFPTTokens } from '@/hooks/useFPTTokens';

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
  isDarkMode?: boolean;
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
  onSubscribe,
  isDarkMode = true
}: SupportCreatorModalProps) => {
  const [activeTab, setActiveTab] = useState<'tip' | 'subscribe'>('tip');
  const [tipAmount, setTipAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { balance } = useFPTTokens();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTipAmount('');
      setMessage('');
      setActiveTab('tip');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
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

      if (amount > balance) {
        toast({
          title: 'Insufficient Balance',
          description: `You have ${balance} FPT but need ${amount} FPT`,
          variant: 'destructive'
        });
        return;
      }
    }

    setIsLoading(true);
    
    try {
      if (activeTab === 'tip') {
        const amount = parseFloat(tipAmount);
        await onTip(amount, message || undefined, postId);
      } else {
        await onSubscribe(postId);
      }
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden">
        {/* Title Section */}
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Support Creator</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Post Title */}
          <div className="bg-gradient-to-r from-fpYellow/10 to-orange-500/10 border border-fpYellow/20 rounded-lg p-4">
            <h3 className="text-white font-bold text-xl leading-tight mb-3">{postTitle}</h3>
            
            {/* Creator Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {creatorHandle.charAt(1)?.toUpperCase() || 'C'}
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <h4 className="text-gray-300 font-medium text-sm">{creatorHandle}</h4>
                <Badge className="bg-fpYellow text-black text-xs">Gold</Badge>
                <span className="text-xs text-gray-400">{followerCount} followers</span>
                <span className="text-xs text-green-400">2,340 FPT earned</span>
              </div>
            </div>
          </div>

          {/* Current Balance Display */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Your FPT Balance</span>
              <span className="text-fpYellow font-bold text-lg">{balance.toLocaleString()} FPT</span>
            </div>
          </div>

          {/* Tab Switch */}
          <div className="flex space-x-2">
            <Button
              className={`flex-1 ${activeTab === 'tip' ? 'bg-fpYellow text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('tip')}
            >
              Tip
            </Button>
            <Button
              className={`flex-1 ${activeTab === 'subscribe' ? 'bg-fpYellow text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
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
              {tipAmount && parseFloat(tipAmount) > balance && (
                <p className="text-red-400 text-xs">Insufficient balance</p>
              )}
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
                <span className="text-lg font-bold text-fpYellow">5.0 FPT</span>
                <span className="text-sm text-gray-400 ml-1">/month</span>
              </div>
              {balance < 5 && (
                <p className="text-red-400 text-xs">Insufficient balance for subscription</p>
              )}
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
              className="flex-1 bg-fpYellow hover:bg-fpYellowDark text-black font-bold"
              onClick={handleSubmit}
              disabled={
                isLoading || 
                (activeTab === 'tip' && (!tipAmount || parseFloat(tipAmount) <= 0 || parseFloat(tipAmount) > balance)) ||
                (activeTab === 'subscribe' && balance < 5)
              }
            >
              {isLoading ? 'Processing...' : activeTab === 'tip' ? 'Send Tip' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportCreatorModal;
