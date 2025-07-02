
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
  const { balance, spendTokens, loading: tokenLoading } = useFPTTokens();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTipAmount('');
      setMessage('');
      setActiveTab('tip');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    console.log('SupportCreatorModal handleSubmit called', { activeTab, tipAmount, balance, tokenLoading });
    
    if (isLoading || tokenLoading) {
      console.log('Already processing, skipping...');
      return;
    }
    
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

      setIsLoading(true);
      
      try {
        console.log('Attempting to spend tokens for tip:', amount);
        const success = await spendTokens(
          amount,
          'spend_tip',
          `Tipped ${amount} FPT to ${creatorHandle}`,
          { 
            post_id: postId, 
            message: message || undefined,
            creator_handle: creatorHandle,
            post_title: postTitle
          }
        );

        if (success) {
          console.log('Tip successful, calling onTip callback');
          onTip(amount, message || undefined, postId);
          onClose();
        }
      } catch (error) {
        console.error('Tip transaction failed:', error);
        toast({
          title: 'Transaction Failed',
          description: 'Failed to process tip. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Subscribe flow
      const subscriptionAmount = 5;
      
      if (subscriptionAmount > balance) {
        toast({
          title: 'Insufficient Balance',
          description: `You have ${balance} FPT but need ${subscriptionAmount} FPT for subscription`,
          variant: 'destructive'
        });
        return;
      }

      setIsLoading(true);
      
      try {
        console.log('Attempting to spend tokens for subscription:', subscriptionAmount);
        const success = await spendTokens(
          subscriptionAmount,
          'spend_subscription',
          `Subscribed to ${creatorHandle} for ${subscriptionAmount} FPT`,
          { 
            post_id: postId,
            creator_handle: creatorHandle,
            subscription_type: 'monthly'
          }
        );

        if (success) {
          console.log('Subscription successful, calling onSubscribe callback');
          onSubscribe(postId);
          onClose();
        }
      } catch (error) {
        console.error('Subscription transaction failed:', error);
        toast({
          title: 'Transaction Failed',
          description: 'Failed to process subscription. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isSubmitDisabled = () => {
    if (isLoading || tokenLoading) return true;
    
    if (activeTab === 'tip') {
      const amount = parseFloat(tipAmount);
      return !amount || amount <= 0 || amount > balance;
    } else {
      return balance < 5;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'} max-w-xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden`}>
        <DialogTitle className="sr-only">Support Creator</DialogTitle>
        
        {/* Title Section */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'} p-4`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Support Creator</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} disabled={isLoading}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Post Title */}
          <div className="bg-gradient-to-r from-fpYellow/10 to-orange-500/10 border border-fpYellow/20 rounded-lg p-4">
            <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold text-xl leading-tight mb-3`}>{postTitle}</h3>
            
            {/* Creator Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {creatorHandle.charAt(1)?.toUpperCase() || 'C'}
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <h4 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium text-sm`}>{creatorHandle}</h4>
                <Badge className="bg-fpYellow text-black text-xs">Gold</Badge>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{followerCount} followers</span>
                <span className="text-xs text-green-400">2,340 FPT earned</span>
              </div>
            </div>
          </div>

          {/* Current Balance Display */}
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} border rounded-lg p-3`}>
            <div className="flex items-center justify-between">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Your FPT Balance</span>
              <span className="text-fpYellow font-bold text-lg">{balance.toLocaleString()} FPT</span>
            </div>
          </div>

          {/* Tab Switch */}
          <div className="flex space-x-2">
            <Button
              className={`flex-1 ${activeTab === 'tip' ? 'bg-fpYellow text-black' : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('tip')}
              disabled={isLoading}
            >
              Tip
            </Button>
            <Button
              className={`flex-1 ${activeTab === 'subscribe' ? 'bg-fpYellow text-black' : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setActiveTab('subscribe')}
              disabled={isLoading}
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
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                min="0"
                step="0.1"
                disabled={isLoading}
              />
              {tipAmount && parseFloat(tipAmount) > balance && (
                <p className="text-red-400 text-xs">Insufficient balance</p>
              )}
            </div>
          )}

          {/* Subscribe Info */}
          {activeTab === 'subscribe' && (
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} border rounded-lg p-4 space-y-2`}>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Subscription</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Get exclusive content and early access to {creatorHandle}'s posts
              </p>
              <div>
                <span className="text-lg font-bold text-fpYellow">5.0 FPT</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} ml-1`}>/month</span>
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
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} h-24 resize-none`}
              maxLength={500}
              disabled={isLoading}
            />
            <div className={`text-xs text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{message.length}/500</div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className={`flex-1 ${isDarkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-fpYellow hover:bg-fpYellowDark text-black font-bold disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isSubmitDisabled()}
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
