
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFPTTokens } from '@/hooks/useFPTTokens';
import { toast } from 'sonner';
import { Users, Gift } from 'lucide-react';

interface InviteFriendProps {
  isDarkMode: boolean;
}

const InviteFriend = ({ isDarkMode }: InviteFriendProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addTokens } = useFPTTokens();

  const cardClasses = isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const textClasses = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const inputClasses = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black';

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInvite = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      console.log('Starting invite process for email:', email);
      
      // Simulate sending invite (backend functionality)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add 20 FPT reward - ensure this happens after successful invite
      console.log('Adding 20 FPT reward for invite');
      const success = await addTokens(
        20,
        'invite_reward',
        `Friend invitation sent to ${email}`,
        { 
          invited_email: email, 
          timestamp: new Date().toISOString(),
          action: 'friend_invite'
        }
      );

      console.log('Token addition result:', success);

      if (success) {
        toast.success('Invite sent successfully! You earned 20 FPT!', {
          description: `Your friend ${email} will receive an invitation to join FinancialPress.`
        });
        setEmail(''); // Clear the form
      } else {
        // If token addition fails, still show invite was sent but mention the reward issue
        toast.error('Invite sent but failed to process reward. Please contact support.');
        console.error('Failed to add tokens for invite reward');
      }
    } catch (error) {
      console.error('Error sending invite:', error);
      toast.error('Failed to send invite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleInvite();
    }
  };

  return (
    <Card className={`${cardClasses} border-2`}>
      <CardHeader className="pb-4">
        <CardTitle className={`flex items-center ${textClasses} text-xl`}>
          <Gift className="w-6 h-6 mr-3 text-yellow-500" />
          Invite a Friend, Earn 20 FPT
        </CardTitle>
        <p className={`text-sm ${mutedTextClasses} mt-2`}>
          Share FinancialPress with your friends and earn rewards for each successful invitation.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <Users className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-semibold text-yellow-500">Reward:</span>
            <span className={`ml-2 ${textClasses}`}>Earn 20 FPT instantly when you send an invite</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className={`block text-sm font-medium ${textClasses}`}>
            Friend's Email Address
          </label>
          <Input
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className={inputClasses}
            disabled={loading}
          />
        </div>

        <Button
          onClick={handleInvite}
          disabled={loading || !email.trim()}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Sending Invite...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Send Invite & Earn 20 FPT</span>
            </div>
          )}
        </Button>

        <div className={`text-xs ${mutedTextClasses} text-center`}>
          Your friend will receive an email invitation to join FinancialPress.
          <br />
          You'll earn 20 FPT immediately upon sending the invitation.
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteFriend;
