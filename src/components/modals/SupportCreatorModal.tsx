import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  isDarkMode?: boolean;
}

const SupportCreatorModal = ({
  creatorHandle,
  creatorName = "Creator",
  followerCount = "1.2K",
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

  const handleSubmit = async () => {
    if (activeTab === 'tip') {
      const amount = parseFloat(tipAmount);
      if (!amount || amount <= 0) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid tip amount greater than 0",
          variant: "destructive"
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
          title: "Tip Sent Successfully!",
          description: `${amount} FPT sent to ${creatorHandle}`,
        });
      } else {
        onSubscribe(postId);
        toast({
          title: "Subscription Activated!",
          description: `You're now subscribed to ${creatorHandle}`,
        });
      }

      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  const modalClasses = isDarkMode 
    ? "bg-[#0A0A0A] border-gray-800 text-white"
    : "bg-white border-gray-300 text-black";

  const inputClasses = isDarkMode
    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400"
    : "bg-gray-50 border-gray-300 text-black placeholder-gray-500";

  const tabButtonClasses = (isActive: boolean) => {
    if (isDarkMode) {
      return isActive 
        ? "bg-yellow-500 text-black hover:bg-yellow-600"
        : "bg-gray-800 text-gray-300 hover:bg-gray-700";
    } else {
      return isActive 
        ? "bg-yellow-500 text-black hover:bg-yellow-600"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }
  };

  const shortTitle = postTitle.length > 50 ? `${postTitle.substring(0, 50)}...` : postTitle;

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`${modalClasses} max-w-md`}>
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {activeTab === 'tip' ? 'Tip Sent!' : 'Subscribed!'}
            </h3>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              {activeTab === 'tip' 
                ? `${tipAmount} FPT sent to ${creatorHandle}`
                : `You're now following ${creatorHandle}`
              }
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${modalClasses} max-w-md`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Support Creator</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-opacity-50" 
               style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-yellow-500 text-black font-bold">
                {creatorHandle.charAt(1)?.toUpperCase() || 'C'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{creatorHandle}</span>
                {isVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <Users className="w-3 h-3" />
                <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  {followerCount} followers
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Supporting post:</span>
            <span className="ml-1 font-medium">{shortTitle}</span>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              className={`flex-1 ${tabButtonClasses(activeTab === 'tip')}`}
              onClick={() => setActiveTab('tip')}
            >
              Tip
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 ${tabButtonClasses(activeTab === 'subscribe')}`}
              onClick={() => setActiveTab('subscribe')}
            >
              Subscribe
            </Button>
          </div>

          {activeTab === 'tip' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Tip Amount (FPT)</label>
              <Input
                type="number"
                placeholder="Enter amount..."
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                className={inputClasses}
                min="0"
                step="0.1"
              />
            </div>
          )}

          {activeTab === 'subscribe' && (
            <div className="space-y-2">
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className="font-medium mb-2">Monthly Subscription</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Get exclusive content and early access to {creatorHandle}'s posts
                </p>
                <div className="mt-2">
                  <span className="text-lg font-bold text-yellow-500">5.0 FPT</span>
                  <span className={`text-sm ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    /month
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Direct Message (Optional)</label>
            <Textarea
              placeholder="Send a message to the creator..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClasses} h-24 resize-none`}
              maxLength={500}
            />
            <div className={`text-xs text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {message.length}/500
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={handleSubmit}
              disabled={isLoading || (activeTab === 'tip' && (!tipAmount || parseFloat(tipAmount) <= 0))}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </span>
              ) : (
                activeTab === 'tip' ? 'Send Tip' : 'Subscribe'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportCreatorModal;
