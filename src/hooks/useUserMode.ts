
import { useAuth } from '@/contexts/AuthContext';

export const useUserMode = () => {
  const { user } = useAuth();
  
  return {
    isLiveUser: !!user,
    isDemoUser: !user,
    userId: user?.id || null
  };
};
