
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserMode } from './useUserMode';
import { toast } from 'sonner';

export const useEngagement = () => {
  const { user } = useAuth();
  const { isLiveUser } = useUserMode();

  const trackEngagement = async (eventType: string, postId: string, metadata?: any) => {
    if (!isLiveUser || !user) {
      console.log('Demo user - engagement not tracked');
      return;
    }

    try {
      const { error } = await supabase
        .from('engagement_events')
        .insert({
          user_id: user.id,
          post_id: postId,
          event_type: eventType,
          metadata: metadata || {}
        });

      if (error) {
        console.error('Error tracking engagement:', error);
      } else {
        console.log(`Engagement tracked: ${eventType} for post ${postId}`);
      }
    } catch (error) {
      console.error('Error tracking engagement:', error);
    }
  };

  const triggerReward = async (eventType: string, postId: string, sourcePostId?: string) => {
    if (!isLiveUser || !user) {
      console.log('Demo user - reward not triggered');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('calculate-engagement-reward', {
        body: {
          user_id: user.id,
          event_type: eventType,
          post_id: postId,
          source_post_id: sourcePostId || postId,
          metadata: {
            timestamp: new Date().toISOString(),
            source: 'web_app'
          }
        }
      });

      if (error) {
        console.error('Error triggering reward:', error);
      } else {
        console.log('Reward triggered successfully:', data);
        // Show success toast for live users
        toast.success(`+${data?.reward_amount || '0.5'} FPT earned!`, {
          description: `For ${eventType}ing content`
        });
      }
    } catch (error) {
      console.error('Error triggering reward:', error);
    }
  };

  const showDemoToast = (message: string) => {
    toast.info(message, {
      description: "Join FinancialPress to start earning!",
      action: {
        label: "Sign Up",
        onClick: () => {
          // This could trigger navigation to signup
          console.log("Navigate to signup");
        }
      }
    });
  };

  return {
    trackEngagement,
    triggerReward,
    showDemoToast,
    isLiveUser
  };
};
